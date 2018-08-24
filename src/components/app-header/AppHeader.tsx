/**
 * Application header component.
 */
import * as React from 'react';
import { RouteComponentProps, withRouter, NavLink } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav } from 'reactstrap';

import { AppRoutes } from '../../util/AppRoutes';

import './AppHeader.css';

import logo from '../../img/logo.svg';

class AppHeader extends React.Component<RouteComponentProps<{}>> {
  public render() {
    return (
      <Navbar color='dark' dark={true} expand='md' fixed='top'>
        <NavbarBrand className='app-header-left'>
          <img alt='Company Logo' src={logo} className='app-header-logo' />
        </NavbarBrand>
        <Nav className='app-header-title'>
          <h2 className='app-header-title'>Airport Currency Exchange Office{this.pageSubtitle}</h2>
        </Nav>
        <Nav className='app-header-right'>
          <NavLink to={AppRoutes.Home} className='nav-link' activeClassName='app-header-active-link' exact={true}>
            Home
          </NavLink>
          <NavLink to={AppRoutes.Admin} className='nav-link' activeClassName='app-header-active-link' exact={true}>
            Admin
          </NavLink>
        </Nav>
      </Navbar>
    );
  }

  /**
   * Page subtitle.
   */
  private get pageSubtitle(): string {
    return (this.props.location.pathname === AppRoutes.Admin ? ' - Admin' : '');
  }
}

export default withRouter(AppHeader);
