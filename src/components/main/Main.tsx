/**
 * The main component (to contain everything else).
 */

import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import Routes from '../routes/Routes';
import './Main.css';

// Required to make the component "withRouter-enabled".
interface IDummyProps {
}

export class Main extends React.PureComponent<RouteComponentProps<IDummyProps>>  {
  public render(): JSX.Element {
    return (
      <Container>
        <Row>
          <Col>
            <Routes />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Main);
