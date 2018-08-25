/**
 * The Transaction modal component.
 */

import * as React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter,  Row, Col, Button } from 'reactstrap';

import { Settings } from '../../model/Settings';
import { CurrencyInfo } from '../../model/CurrencyInfo';
import { asFloat, formatAmount, formatRate } from '../../util/Util';

import './TransactionModal.css';

// Component own properties interface
interface ITransactionModalProps {
    currencyInfo: CurrencyInfo;
    settings: Settings;
    direction: number;
    isOpen: boolean;
    toggler: Function;
}

// Component own state interface
interface ITransactionModalState {
  amount: number;
}

class TransactionModal extends React.PureComponent<ITransactionModalProps, ITransactionModalState> {
  private formElement: HTMLFormElement;

  /**
   * Constructor.
   * 
   * @param props Component properties.
   */
  constructor(props: ITransactionModalProps) {
    super(props);
    this.state = {amount: 0};
  }

  /**
   * Rendering method.
   */
  public render(): JSX.Element {
    const amount: number = this.state.amount;
    const p: ITransactionModalProps = this.props;
    const c = p.currencyInfo;
    const s: Settings = p.settings;
    const rate: number = (p.direction === 1 ? c.buyRate : c.sellRate);
    const baseAmount = (p.direction === 1 ? amount * rate : amount);
    const subtotal: number = Math.round(amount * rate * 100) / 100;
    const baseCommission: number = Math.max(
      s.surcharge + baseAmount * s.commissionPct / 100,
      s.minCommission
     );
    const commission: number = Math.round(
      (p.direction === 1 ? baseCommission / rate : baseCommission) * 100) / 100;
    const total: number = subtotal + commission;

    return (
      <form ref={this.setFormRef} onSubmit={this.onSubmit}>
        <Modal 
          isOpen={p.isOpen} 
          fade={false} 
          toggle={this.toggler} 
          className='transaction-modal'
          centered={true}
          autoFocus={true}
        >
          <ModalHeader toggle={this.toggler}>
            {this.title}
          </ModalHeader>

          <ModalBody>
              <Row>
                <Col>
                  <label htmlFor='amountInput'>{this.amountLabel}:</label>
                </Col>
                <Col className='text-right'>
                  <input
                    id='surchargeInput'
                    className='mr-2'
                    type='number'
                    onChange={this.onAmountChange}
                    min={1}
                    max={this.maxAmount}
                    required={true}
                    />
                    {c.currency}
                </Col>
              </Row>

              <Row><Col colSpan={2}><hr/></Col></Row>

              <Row>
                <Col>Exchange Rate:</Col>
                <Col className='text-right'>
                  1.00&nbsp;{c.currency}
                  &nbsp;=&nbsp;
                  {formatRate(rate)}
                  &nbsp;
                  {s.baseCurrency}
                </Col>
              </Row>
              <Row>
                <Col>Subtotal:</Col>
                <Col className='text-right'>
                  {formatAmount(subtotal)}
                  &nbsp;
                  {s.baseCurrency}
                </Col>
              </Row>

              <Row>
                <Col>Commission:</Col>
                <Col className='text-right'>
                  {formatAmount(commission)}
                  &nbsp;
                  {s.baseCurrency}
                </Col>
              </Row>

              <Row><Col colSpan={2}><hr/></Col></Row>

              <Row className='transaction-total-row'>
                <Col>Total:</Col>
                <Col className='text-right'>
                  {formatAmount(total)}
                  &nbsp;
                  {s.baseCurrency}
                </Col>
              </Row>
          </ModalBody>

          <ModalFooter>
            <Button color='secondary' onClick={this.toggler} className='transaction-button'>
              Cancel
            </Button>
            <Button 
              color='primary' 
              className='transaction-button'
              onClick={this.onSubmit} 
              disabled={!this.isFormValid()}>
              {this.submitButtonCaption}
            </Button>
          </ModalFooter>
        </Modal>
      </form>
    );
  }

  /**
   * Modal title.
   */
  private get title(): string {
    return `${this.props.direction === 1 ? 'Buy' : 'Sell'} ${this.props.currencyInfo.currency}`;
  }

  /**
   * Label for the amount input.
   */
  private get amountLabel(): string {
    return `Amount to ${this.props.direction === 1 ? 'Buy' : 'Sell'}`;
  }

  /**
   * Caption for the submit button.
   */
  private get submitButtonCaption(): string {
    return (this.props.direction === 1 ? 'Buy' : 'Sell');
  }

  /**
   * Returns maximal currency amount to buy/sell.
   */
  private get maxAmount(): number {
    if (this.props.direction === 1) {
      return Math.floor(this.props.currencyInfo.amount * this.props.currencyInfo.buyRate * 100) / 100;
    } else {
      return this.props.currencyInfo.amount;
    }
  }

  /**
   * Handles amount change event,
   * 
   * @param e Event agruments
   */
  private onAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const amount: number = Math.floor(asFloat(e) * 100) / 100;
    if (amount >= 0) {
      this.setState({amount: amount});
    }
  }

  /**
   * Toggles modal.
   */
  private toggler = (): void => {
    this.setState({amount: 0});
    this.props.toggler();
  }

  /**
   * Submit updates settings.
   */
  private onSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
  }

  /**
   * Sets reference to the form element.
   */
  private setFormRef = (ref: HTMLFormElement): void => {
    this.formElement = ref;
  }

  /**
   * Returns true if the form is valid.
   */
  private isFormValid = (): boolean => {
    return (!this.formElement || this.formElement.checkValidity());
  }
}

// Redux-Wrapped component
export default TransactionModal;
