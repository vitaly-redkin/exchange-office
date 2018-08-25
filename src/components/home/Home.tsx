/**
 * The Home component.
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Alert } from 'reactstrap';

import { actionCreators } from '../../store/CurrencyHandler';
import { CurrencyInfo } from '../../model/CurrencyInfo';
import { Settings } from '../../model/Settings';
import * as CurrencyManager from '../../model/CurrencyManager';
import { IApplicationState } from '../../store';
import { formatRate, formatAmount } from '../../util/Util';

import './Home.css';

// Component own properties interface
interface IHomeOwnProps {
    currencies: CurrencyInfo[];
    lastUpdatedAt: string;
    lastError: string;
    settings: Settings;
}

// Component properties type
type HomeProps = 
  IHomeOwnProps & 
  typeof actionCreators;

class Home extends React.PureComponent<HomeProps> {
  /**
   * Renders component.
   */
  public render(): JSX.Element {
    return (
      <Container className='home-container mt-1'>
        <Alert color={this.alertColor} className='text-center mb-4'>
          {this.alertText}
        </Alert>

        {this.renderTable()}
      </Container>
    );
  }

  /**
   * Rencers table with currencies.
   */
  private renderTable(): JSX.Element {
    return (
      <Container className='home-table-container'>
        <Row className='home-table-header p-2'>
          <Col>Currency</Col>
          <Col className='text-right'>Buy</Col>
          <Col className='text-right'>Sell</Col>
          <Col className='text-right'>In Stock</Col>
        </Row>

        {this.props.currencies.map((c: CurrencyInfo, index: number) => {
          const rowClassName: string = 
            (index % 2 === 0 ? 'home-table-row-even' : 'home-table-row-odd');
          const amountClass: string = (
              c.amount < c.warningThresholdAmount ? 'home-currency-amount-warning' : ''
            );
        
          return (
            <Row className={`${rowClassName} p-2`} key={c.currency}>
              <Col className='home-table-currency'>{c.currency}</Col>
              <Col className='text-right'>{formatRate(c.buyRate)}</Col>
              <Col className='text-right'>{formatRate(c.sellRate)}</Col>
              <Col className={`text-right ${amountClass}`}>
                {formatAmount(c.amount)}
              </Col>
            </Row>
          );
        })}
    </Container>
);
  }

  /**
   * Color to show the alert with.
   */
  private get alertColor(): string {
    return (
      this.props.settings.rateRefreshInterval <= 0  ? 
        'warning' :
      this.props.lastError ? 
        'error' : 
        'success'
    );
  }

  /**
   * Alert text.
   */
  private get alertText(): JSX.Element {
    const baseCurrency: string = this.props.settings.baseCurrency;
    const baseCurrencyInfo: CurrencyInfo = CurrencyManager.getCurrencyInfo(
      this.props.currencies, baseCurrency)!;
    const amount: number = baseCurrencyInfo.amount;
    const amountClass: string = (
      amount < baseCurrencyInfo.warningThresholdAmount ? 'home-currency-amount-warning' : ''
    );

    return (
      <div>
        {
          this.props.lastUpdatedAt ?
          `Exchange rates shown as per ${this.props.lastUpdatedAt}.` :
          'Exchange rates has not been updated yet.'
        }
        &nbsp;
        <span className={amountClass}>{`We have ${amount} ${baseCurrency} left.`}</span>
      </div>
    );
  }
}

// Redux mapStateToProps function
function mapStateToProps(state: IApplicationState): IHomeOwnProps {
  return {
      currencies: state.currencies.currencies, 
      lastUpdatedAt: state.currencies.lastUpdatedAt,
      lastError: state.currencies.lastError,
      settings: state.settings.settings,
    };
}

// Redux-Wrapped component
export default connect(mapStateToProps, actionCreators)(Home);
