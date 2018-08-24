/**
 * The Home component.
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/CurrencyHandler';
import { CurrencyInfo } from '../../model/CurrencyInfo';
import { Settings } from '../../model/Settings';
import { IApplicationState } from '../../store';

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
  public render(): JSX.Element {
    return (
        <div>
            {JSON.stringify(this.props.currencies)}
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
