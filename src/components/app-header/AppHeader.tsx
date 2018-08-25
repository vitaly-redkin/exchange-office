/**
 * Application header component.
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter, NavLink } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse  } from 'reactstrap';

import { actionCreators } from '../../store/CurrencyHandler';
import { IApplicationState } from '../../store';
import { AppRoutes } from '../../util/AppRoutes';
import { Settings } from '../../model/Settings';
import { CurrencyInfo } from '../../model/CurrencyInfo';
import * as CurrencyManager from '../../model/CurrencyManager';
import { RateFetchService } from '../../service/RateFetchService';

import './AppHeader.css';
import logo from '../../img/logo.svg';

// Component own properties interface
interface IAppHeaderOwnProps {
  currencies: CurrencyInfo[];
  settings: Settings;
}

// Component properties type
type AppHeaderProps = 
  IAppHeaderOwnProps & 
  RouteComponentProps<{}> & 
  typeof actionCreators;

/**
 * Interface fot the component state.
 */
interface IAppHeaderState {
  isOpen: boolean;
}

class AppHeader extends React.Component<AppHeaderProps, IAppHeaderState> {
  private refreshRatesInterval: number | undefined;

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
   * Called when component is mounted. 
   * Sets an initial state and loads the data.
   */
  public componentDidMount(): void {
    this.refreshRates();

    this.refreshRatesInterval = window.setInterval(
      this.refreshRates, this.props.settings.rateRefreshInterval * 1000);
  }

  /**
   * Called when components is about to be unmounted.
   */
  public componentWillUnmount() {
    this.clearInterval();
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
   * Reftesh exchange rates.
   */
  private refreshRates = () => {
    new RateFetchService().fetchRates(
      this.props.settings.baseCurrency,
      this.setRates,
      this.handlerRareRefreshError
    );
  }

  /**
   * Sets exchange rates fetched from the service.
   */
  private setRates = (rates: CurrencyManager.IFetchedRates) => {
//    console.log(JSON.stringify(rates));
    CurrencyManager.importFetchedExchangeRates(
      rates, this.props.currencies, this.props.settings, this.props.updateExchangeRates);
  }

  /**
   * Sets exchange rates fetched from the service.
   */
  private handlerRareRefreshError = (error: string) => {
    console.log(error);
    this.props.setError(error);
  }

  /**
   * Clears timer interval.
   */
  private clearInterval = () => {
    if (this.refreshRatesInterval !== undefined) {
      window.clearInterval(this.refreshRatesInterval);
      this.refreshRatesInterval = undefined;
    }
  }

  /**
   * Page subtitle.
   */
  private get pageSubtitle(): string {
    return (this.props.location.pathname === AppRoutes.Admin ? ' - Admin' : '');
  }
}

// Redux mapStateToProps function
function mapStateToProps(state: IApplicationState): IAppHeaderOwnProps {
  return {
    currencies: state.currencies.currencies,
    settings: state.settings.settings
  };
}

// Redux-and-Router Wrapped component
export default connect(mapStateToProps, actionCreators)(withRouter(AppHeader));
