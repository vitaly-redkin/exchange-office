/**
 * The Home component.
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Alert, Button } from 'reactstrap';

import { actionCreators } from '../../store/CurrencyHandler';
import { IApplicationState } from '../../store';
import { CurrencyInfo } from '../../model/CurrencyInfo';
import { Settings } from '../../model/Settings';
import * as CurrencyManager from '../../model/CurrencyManager';
import { formatRate, formatAmount } from '../../util/Util';
import TransactionModal from '../transaction-modal/TransactionModal';

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

// Interface for the component state
interface IHomeState {
  transactionCurrency: string;
  transactionDirection: number;
  inTransaction: boolean;
}  

class Home extends React.Component<HomeProps, IHomeState> {
  constructor(props: HomeProps) {
    super(props);

    this.state = {
      transactionCurrency: this.props.settings.baseCurrency,
      transactionDirection: 1,
      inTransaction: false
    };
  }

  /**
   * Renders component.
   */
  public render(): JSX.Element {
    const transactionCurrency: CurrencyInfo = 
      this.getCurrencyInfo(this.state.transactionCurrency);
      
    return (
      <Container className='home-container mt-1'>
        <Alert color={this.alertColor} className='text-center mb-4'>
          {this.alertText}
        </Alert>

        {this.renderTable()}

        <TransactionModal 
          currencyInfo={transactionCurrency} 
          settings={this.props.settings}
          direction={this.state.transactionDirection}
          isOpen={this.state.inTransaction}
          toggler={this.toggleTransaction}
          />
      </Container>
    );
  }

  /**
   * Renders table with currencies.
   */
  private renderTable(): JSX.Element {
    return (
      <Container className='home-table-container'>
        <Row className='home-table-header p-2'>
          <Col>Currency</Col>
          <Col className='text-center'>Buy</Col>
          <Col className='text-center'>Sell</Col>
          <Col className='text-right'>In Stock</Col>
        </Row>

        {this.props.currencies.map((c: CurrencyInfo, index: number) => {
          if (c.currency === this.props.settings.baseCurrency) {
            return null;
          }

          const rowClassName: string = 
            (index % 2 === 0 ? 'home-table-row-even' : 'home-table-row-odd');
          const amountClass: string = (
            c.amount < c.warningThresholdAmount ? 'home-currency-amount-warning' : ''
            );
        
          return (
            <Row className={`${rowClassName} p-2`} key={c.currency}>
              <Col className='home-table-currency'>{`100 ${c.currency}`}</Col>
              <Col className='text-center'>
                <Button 
                  className='home-table-button'
                  outline={true} 
                  color='secondary'
                  onClick={() => { this.startTransaction(c, 1); }}>
                  {formatRate(100 * c.buyRate)}
                </Button>
              </Col>
              <Col className='text-center'>
                <Button 
                  className='home-table-button'
                  outline={true} 
                  color='secondary'
                  onClick={() => { this.startTransaction(c, -1); }}>
                  {formatRate(100 * c.sellRate)}
                </Button>
              </Col>
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
      this.props.lastError !== '' ? 
        'danger' : 
      this.props.settings.rateRefreshInterval <= 0 || this.props.lastUpdatedAt === '' ? 
        'warning' :
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
        <span className={amountClass}>{`We have ${formatAmount(amount)} ${baseCurrency} left.`}</span>
      </div>
    );
  }

  /**
   * Toggles transaction modal.
   */
  private toggleTransaction = (): void => {
    this.setState((prevState: IHomeState) => { 
      this.setState({inTransaction: !prevState.inTransaction}); 
    });
  }

  /**
   * Starts transaction.
   * 
   * @param currencyInfo Currency to deal with
   * @param direction 1 to buy currency, -1 to sell it
   */
  private startTransaction = (
    currencyInfo: CurrencyInfo,
    direction: number
  ): void => {
    this.setState({
        inTransaction: true,
        transactionCurrency: currencyInfo.currency,
        transactionDirection: direction
      } 
    );
  }

  /**
   * Returns currebcy info object.
   * 
   * @param currency Currency code to find by
   */
  private getCurrencyInfo = (currency: string): CurrencyInfo => {
    return CurrencyManager.getCurrencyInfo(this.props.currencies, currency)!;
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
