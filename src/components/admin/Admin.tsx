/**
 * The Admin component.
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button, Form, Alert } from 'reactstrap';

import { actionCreators } from '../../store/SettingsHandler';
import { IApplicationState } from '../../store';
import { Settings } from '../../model/Settings';
import { asInt, asFloat } from '../../util/Util';

import './Admin.css';

// Component own properties interface
interface IAdminOwnProps {
    settings: Settings;
}

// Component own state interface
interface IAdminOwnState {
  settings: Settings;
  settingsSaved: boolean;
}

// Component properties type
type AdminProps = 
  IAdminOwnProps & 
  typeof actionCreators;

class Admin extends React.PureComponent<AdminProps, IAdminOwnState> {
  /**
   * Constructor.
   * 
   * @param props Component properties.
   */
  constructor(props: AdminProps) {
    super(props);
    this.state = {settings: {...this.props.settings}, settingsSaved: false};
  }

  /**
   * Rendering method.
   */
  public render(): JSX.Element {
    const s: Settings = this.state.settings;

    return (
        <Container className='admin-container mt-4'>
          <Form>
            <Row>
              <Col>
                <h4>Change settings below and click Update</h4>
                <hr/>
              </Col>
            </Row>
            <Row>
              <Col>
                <label htmlFor='rateRefreshIntervalInput'>Refresh currency exchange rates every</label>
              </Col>
              <Col>
                <input
                  id='rateRefreshIntervalInput'
                  type='number'
                  className='mr-2'
                  defaultValue={s.rateRefreshInterval.toString()}
                  onChange={this.onRateRefreshIntervalChange}
                  min={0}
                  max={999999}
                />
                seconds
              </Col>
            </Row>
            <Row className='pt-3'>
              <Col>
                <label htmlFor='commissionPctInput'>Commission:</label>
              </Col>
              <Col>
                <input
                    id='commissionPctInput'
                    className='mr-2'
                    type='number'
                    defaultValue={s.commissionPct.toString()}
                    onChange={this.onCommissionPctChange}
                    min={0}
                    max={100}
                  />
                  %
              </Col>
            </Row>
            <Row>
              <Col>
                <label htmlFor='surchargeInput'>Surcharge:</label>
              </Col>
              <Col>
                <input
                    id='surchargeInput'
                    className='mr-2'
                    type='number'
                    defaultValue={s.surcharge.toPrecision(3)}
                    onChange={this.onSurchargeChange}
                    min={0}
                    max={999}
                  />
                  {s.baseCurrency}
              </Col>
            </Row>
            <Row>
              <Col>
                <label htmlFor='minCommissionInput'>Minimal commission:</label>
              </Col>
              <Col>
                <input
                    id='minCommissionInput'
                    className='mr-2'
                    type='number'
                    defaultValue={s.minCommission.toPrecision(3)}
                    onChange={this.onMinCommissionChange}
                    min={0}
                    max={999}
                  />
                  {s.baseCurrency}
              </Col>
            </Row>
            <Row className='pt-3'>
              <Col>
                <label htmlFor='marginPctInput'>Buy/Sell rate margin:</label>
              </Col>
              <Col>
                <input
                    id='marginPctInput'
                    className='mr-2'
                    type='number'
                    defaultValue={s.marginPct.toString()}
                    onChange={this.onMarginPctChange}
                    min={0}
                    max={999}
                  />
                  %
              </Col>
            </Row>
            <Row>
              <Col>
                <hr/>
                <Button color='primary' onClick={this.onUpdate}>Update</Button>
                {this.state.settingsSaved && 
                 <Alert color='success' className='mt-4'>Settings saved</Alert>
                }
              </Col>
            </Row>
          </Form>
        </Container>
    );
  }

  /**
   * Handles rateRefreshInterval change event,
   * 
   * @param e Event agruments
   */
  private onRateRefreshIntervalChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: number = asInt(e);
    if (value >= 0) {
      this.setState({settings: {...this.state.settings, rateRefreshInterval: value}, settingsSaved: false});
    }
  }

  /**
   * Handles commissionPct change event,
   * 
   * @param e Event agruments
   */
  private onCommissionPctChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: number = asFloat(e);
    if (value >= 0) {
      this.setState({settings: {...this.state.settings, commissionPct: value}, settingsSaved: false});
    }
  }

  /**
   * Handles surcharge change event,
   * 
   * @param e Event agruments
   */
  private onSurchargeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: number = asFloat(e);
    if (value >= 0) {
      this.setState({settings: {...this.state.settings, surcharge: value}, settingsSaved: false});
    }
  }

  /**
   * Handles minCommission change event,
   * 
   * @param e Event agruments
   */
  private onMinCommissionChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: number = asFloat(e);
    if (value >= 0) {
      this.setState({settings: {...this.state.settings, minCommission: value}, settingsSaved: false});
    }
  }

  /**
   * Handles marginPct change event,
   * 
   * @param e Event agruments
   */
  private onMarginPctChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: number = asFloat(e);
    if (value >= 0) {
      this.setState({settings: {...this.state.settings, marginPct: value}, settingsSaved: false});
    }
  }

  /**
   * Updates settings.
   */
  private onUpdate = (): void => {
    this.props.updateSettings(this.state.settings);
    this.setState({settingsSaved: true});
  }
}

// Redux mapStateToProps function
function mapStateToProps(state: IApplicationState): IAdminOwnProps {
  return {
      settings: state.settings.settings,
    };
}

// Redux-Wrapped component
export default connect(mapStateToProps, actionCreators)(Admin);
