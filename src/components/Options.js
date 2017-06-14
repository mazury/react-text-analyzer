import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input  } from 'reactstrap';
import classnames from 'classnames';




export default class Options extends Component {

  render() {
    const options = this.props.options  
    return (   
    <Form> 
      {options.map(function(option) {
        return (
          <FormGroup check>
                <Label check> 
                   <Input type="checkbox" /> {option}
                </Label>
          </FormGroup>
        )
       })}
    </Form>
    );
  }
}
