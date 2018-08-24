/**
 * The Admin component.
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/SettingsHandler';
import { Settings } from '../../model/Settings';
import { IApplicationState } from '../../store';

// Component own properties interface
interface IAdminOwnProps {
    settings: Settings;
}

// Component properties type
type AdminProps = 
  IAdminOwnProps & 
  typeof actionCreators;

class Admin extends React.PureComponent<AdminProps> {
  public render(): JSX.Element {
    return (
        <div>
            {JSON.stringify(this.props.settings)}
        </div>
    );
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
