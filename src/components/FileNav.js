import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

export default class FileNav extends Component {

  render() {
    return (      
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.props.mode === 'single' })}
              onClick={() => { this.props.toggle('single'); }}
            >
              Jeden plik
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.props.mode === 'multiple' })}
              onClick={() => { this.props.toggle('multiple'); }}
            >
             Wiele plików
            </NavLink>
          </NavItem>
        </Nav>
    );
  }
}
