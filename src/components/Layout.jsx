import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button, Form, FormGroup, Input, FormText, Table, Card, CardTitle} from 'reactstrap';
import classnames from 'classnames';

export default class AppRoutes extends Component {
   constructor(props) {
    super(props);

    this.state = {
       activeTab: '1',
      mode: '',
      action: '/single'
    };
  }

  // renderForm() {
  //     if (this.state.mode === 'single-file') {
  //       return 
  //     }
  // }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Analizator tekstów</h2>
        </div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >Tab1
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >Moar Tabs
            </NavLink>
          </NavItem>
        </Nav>
          

        <Form action={this.state.action} method="POST" encType="multipart/form-data" id="fileform">
          <FormGroup>
            <Input type="file" name="afile" multiple={this.state.mode}/>
            <Button type="submit" id="submit" name="submit">wyślij</Button>
          </FormGroup>
        </Form>
        <div id="results">

        </div>
      </div>
    );
  }
}
