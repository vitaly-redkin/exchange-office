/**
 * The main component (to contain everything else).
 */

import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import AppHeader from '../app-header/AppHeader';
import Routes from '../routes/Routes';

import './Main.css';

// Required to make the component "withRouter-enabled".
interface IDummyProps {
}

export class Main extends React.PureComponent<RouteComponentProps<IDummyProps>>  {
  public render(): JSX.Element {
    return (
      <div>
        <div className='app-header-contaner'>
          <AppHeader />
        </div>
        <div>
          <Routes />
        </div>
      </div>
    );
  }
}

export default withRouter(Main);
