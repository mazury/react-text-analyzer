import React, { Component } from 'react';
import { Button, Form, FormGroup } from 'reactstrap';
import classnames from 'classnames';

export default class FileForm extends Component {

  render() {
    return (      
        <Form  encType="multipart/form-data" id={this.props.mode + 'form'}>
          <FormGroup>
            {this.props.renderForm}
            <Button type="submit" id="submit" name="submit">wyślij</Button>
          </FormGroup>
        </Form>
    );
  }
}
