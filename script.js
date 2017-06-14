// Button Handler
document.getElementById('singleform').addEventListener('submit', function(e) {
  e.preventDefault();
  var form = document.getElementById('singleform');

  var data = new FormData(form);

  var req = new XMLHttpRequest();
  req.open("POST", '/single');
  req.onload = function(event) {
    if(req.status >= 200 && req.status < 400) {
      var myData = JSON.parse(event.target.responseText);
      
      document.getElementById('results').innerHTML = 
      "<div class='card card-block container'>" +
      "<h3>Różne właściwości</h3>" + 
      "<table class='table table-sm'><tbody>" +
      "<tr><td>liczba słów</td><td>" + myData['liczba słów'] + "</td></tr>" +
      "<tr><td>unikalne słowa</td><td>" + myData['unikalne słowa'] + "</td></tr>" + 
      "<tr><td>unikalne słowa znaczące</td><td>" + myData['unikalne słowa znaczące'] + "</td></tr>" + 
      "<tr><td>gęstość leksykalna</td><td>" + myData['gęstość leksykalna'] + "</td></tr>" +
      "<tr><td>ydania</td><td>" + myData.zdania + "</td></tr>" +
      "<tr><td>przecinki</td><td>" + myData.przecinki + "</td></tr>" +
      "<tr><td>znaki zapytania</td><td>" + myData['znaki zapytania'] + "</td></tr>" +
      "<tr><td>wykrzykniki</td><td>" + myData.wykrzykniki + "</td></tr>" +
      "<tr><td>średniki</td><td>" + myData.średniki + "</td></tr>" +
      "<tr><td>dwukropki</td><td>" + myData.dwukropki + "</td></tr>" +
      "<tr><td>cudzysłowy</td><td>" + myData.cudzysłowy + "</td></tr>" +
      "<tr><td>nawiasy</td><td>" + myData.nawiasy + "</td></tr>" +
      "<tr><td>wielokropki</td><td>" + myData.wielokropki + "</td></tr></tbody></table>" +
      "<h3>Najczęstsze słowa</h3>" +
      "<table class='table table-sm' id='word-count-table'><tbody></tbody></table>" +
      "<h3>Najczęstsze słowa znaczące</h3>" +
      "<table class='table table-sm' id='lexical-word-count-table'><tbody></tbody></table>" +
      "</div>"

      for (const word in myData['najczęstsze słowa']) {
        const row = document.createElement('tr')
        row.innerHTML = "<td>" + word + "</td><td>" + myData['najczęstsze słowa'][word] + "</td>"
        document.getElementById('word-count-table').appendChild(row)
      }

      for (const word in myData['najczęstsze słowa znaczące']) {
        const row = document.createElement('tr')
        row.innerHTML = "<td>" + word + "</td><td>" + myData['najczęstsze słowa znaczące'][word] + "</td>"
        document.getElementById('lexical-word-count-table').appendChild(row)
      }


    } else {
      var content = document.createElement('tr');
      content.innerHTML = '<td colspan="2" class="text-center">Error Reading File</td>';
      document.getElementById('results').appendChild(content);
    }
  };
  req.send(data);


});

document.getElementById('multipleform').addEventListener('submit', function(e) {
  e.preventDefault();
  var form = document.getElementById('multipleform');

  var data = new FormData(form);

  var req = new XMLHttpRequest();
  req.open("POST", '/multiple');
  req.onload = function(event) {
    if(req.status >= 200 && req.status < 400) {
      var myData = JSON.parse(event.target.responseText);

      req.send(data);


    };
  }
})


