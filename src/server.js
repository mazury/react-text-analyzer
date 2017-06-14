import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { match, RouterContext } from 'react-router';
import AppRoutes from './components/AppRoutes';

const server = require('express');
const app = new server();
const fs = require('fs');
const path = require('path');
const multer  = require('multer');
const upload = multer();
const functionWords = require('./functionWords')

const port = process.env.PORT || 3000;


// Access control headers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(server.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  let markup = '';
  let status = 200;

// if (process.env.UNIVERSAL) {
  const context = {};
  markup = renderToString(
    <StaticRouter location={req.url} context={context}>
    <AppRoutes />
    </StaticRouter>,
    );

    // context.url will contain the URL to redirect to if a <Redirect> was used
    if (context.url) {
      return res.redirect(302, context.url);
    }

    if (context.is404) {
      status = 404;
    }
  // }

  return res.status(status).render('index', { markup });
});

// Handle single file upload
app.post('/single', upload.single('afile'), function (req, res) {
  if(req.file) {
    const data = req.file.buffer
    const convBuffer = data.toString()

    const sentencesArray = convBuffer.split(/\.{3}|[?.!]/)

    const wordArray = convBuffer
    .toLowerCase()
    .replace(/\r\n/g, ' ')
    .replace(/[,.)(?!:";]/g, '')
    .replace(/rozdział/gi, '')
    .split(' ')
    .filter((w) => { return /[a-zA-Z]/g.test(w) })

    // Lexical words only
    const lexicalWordsArray = wordArray.filter((w) => {
     if (functionWords.functionWords.indexOf(w) === -1) { return w }
   })

    const lexicalWordsCount = lexicalWordsArray.length
    
    const lexicalOccurences = {}
    for (let i = 0; i < lexicalWordsCount; i++) {
      lexicalOccurences.hasOwnProperty(lexicalWordsArray[i]) ?  lexicalOccurences[lexicalWordsArray[i]] += 1  : lexicalOccurences[wordArray[i]] = 1
    }
    
    const sortedLexicalOccurences = [];
    for (var word in lexicalOccurences) {
      sortedLexicalOccurences.push([word, lexicalOccurences[word]]);
    }
    sortedLexicalOccurences.sort(function(a, b) {
      return b[1] - a[1];
    });

    const topTenLexical = {}
    for (let i = 0; i < 10; i++) {
      topTenLexical[sortedLexicalOccurences[i][0]] = sortedLexicalOccurences[i][1]
    }

    // Lexical and function words    
    const wordCount = wordArray.length

    const occurences = {}
    for (let i = 0; i < wordCount; i++) {
      occurences.hasOwnProperty(wordArray[i]) ?  occurences[wordArray[i]] += 1  : occurences[wordArray[i]] = 1
    }
    
    const sortedOccurences = [];
    for (var word in occurences) {
      sortedOccurences.push([word, occurences[word]]);
    }
    sortedOccurences.sort(function(a, b) {
      return b[1] - a[1];
    });

    const topTen = {}
    for (let i = 0; i < 10; i++) {
      topTen[sortedOccurences[i][0]] = sortedOccurences[i][1]
    }



    res.json({
      // 'słowa': wordArray,
      zdania: sentencesArray.length - 1,
      'liczba słów': wordCount,
      'unikalne słowa': Object.keys(occurences).length,
      'najczęstsze słowa': topTen,
      'słowa znaczące': lexicalWordsCount,
      'unikalne słowa znaczące': Object.keys(lexicalOccurences).length,
      'najczęstsze słowa znaczące': topTenLexical,
      'gęstość leksykalna': (lexicalWordsCount / wordCount).toFixed(3),
    // Lexical density is defined as the number of lexical words (or content words) divided by the total number of words
    'znaki zapytania': /\?/.test(convBuffer) ? convBuffer.match(/\?/g).length : 0,
    wykrzykniki: /!/.test(convBuffer) ? convBuffer.match(/!/g).length : 0,
    przecinki: /,/.test(convBuffer) ? convBuffer.match(/,/g).length : 0,
    średniki: /;/.test(convBuffer) ? convBuffer.match(/;/g).length : 0,
    dwukropki: /:/.test(convBuffer) ? convBuffer.match(/:/g).length : 0,
    cudzysłowy: /”/.test(convBuffer) ? convBuffer.match(/”/g).length : 0,
    nawiasy: /\(/.test(convBuffer) ? convBuffer.match(/\(/g).length : 0,
    wielokropki: /\.{3}/.test(convBuffer) ? convBuffer.match(/\.{3}/g).length : 0,
      // 'wystąpienia': occurences
      // 'zdania': functionWords.functionWords,
      // 'liczba zdań': 
    });

  } else {
    res.status(400).end();
  }
});

app.post('/multiple', upload.array('afile'), function (req, res) {
  if(req.files) {
    console.log(data);
    // const data = req.file.buffer
    // const convBuffer = data.toString()
  }
})



// Server Start
app.listen(port, function(){
  console.log("Listening on port: " + port);
});


