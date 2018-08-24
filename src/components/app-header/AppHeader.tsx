/**
 * Application header component.
 */
import * as React from 'react';
import { RouteComponentProps, withRouter, NavLink } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse  } from 'reactstrap';

import { AppRoutes } from '../../util/AppRoutes';

import './AppHeader.css';
import logo from '../../img/logo.svg';

/**
 * Interface fot the component state.
 */
interface IAppHeaderState {
  isOpen: boolean;
}

type AppHeaderProps = RouteComponentProps<{}>;

class AppHeader extends React.Component<AppHeaderProps, IAppHeaderState> {
  /**
   * Constructor.
   * 
   * @param props Component properties.
   */
  constructor(props: AppHeaderProps) {
    super(props);
    this.state = {isOpen: false};
  }

  /**
   * Rendering method.
   */
  public render() {
    return (
      <Navbar color='dark' dark={true} expand='md'>
        <NavbarBrand>
          <img alt='Company Logo' src={logo} className='app-header-logo' />
        </NavbarBrand>
        <Nav className='app-header-title'>
          <h2 className='app-header-title'>Currency Exchange Office{this.pageSubtitle}</h2>
        </Nav>
        <Nav className='app-header-right'>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar={true}>
            <NavLink to={AppRoutes.Home} className='nav-link' activeClassName='app-header-active-link' exact={true}>
              Home
            </NavLink>
            <NavLink to={AppRoutes.Admin} className='nav-link' activeClassName='app-header-active-link' exact={true}>
              Admin
            </NavLink>
          </Collapse>
        </Nav>
      </Navbar>
    );
  }

  /**
   * Toggles NavBar meni collapser.
   */
  private toggle = (): void => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }    

  /**
   * Page subtitle.
   */
  private get pageSubtitle(): string {
    return (this.props.location.pathname === AppRoutes.Admin ? ' - Admin' : '');
  }
}

export default withRouter(AppHeader);
