import React, { Component } from 'react';
import { Input } from 'reactstrap';
import classnames from 'classnames';
import FileNav from './FileNav'
import FileForm from './FileForm'
import Options from './Options'
    

const singleOptions = [
   'podstawowe informacje',
   'często występujące słowa'
]

const multipleOptions = [
   'podstawowe ',
   'częste słowa'
]

export default class Layout extends Component {
   constructor(props) {
    super(props);

    this.state = {
      mode: 'single',
      options: singleOptions
    };
  }

  renderForm() {
    if (this.state.mode === 'single') {
      return <Input type="file" name="afile" /> 
    }
      else {
        return  <Input type="file" name="afile" multiple /> 
    }
  }

  toggle(tab) {
    if (this.state.mode === 'single' && tab === 'multiple' ) {
       this.setState({
        options: multipleOptions
      });
    }
    if (this.state.mode === 'multiple' && tab === 'single' ) {
       this.setState({
        options: singleOptions
      });
    }
    if (this.state.mode !== tab) {
      this.setState({
        mode: tab
      });
    }
  }



  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Analizator tekstów</h2>
        </div>
        <FileNav 
              mode={this.state.mode} 
              toggle={this.toggle.bind(this)} 
              />
        <FileForm renderForm={this.renderForm()} mode={this.state.mode}/>
        <Options options={this.state.options}/>
        {/*<OptionNav mode={this.state.activeOptionTab} handleOptionTabClick={this.handleOptionTabClick.bind(this)}/>*/}
        <div id="results">

        </div>
      </div>
    );
  }
}
