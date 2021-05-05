import React from "react";
import './Default.css';
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";



class DefaultLayout extends React.Component {
  constructor(props) {
    super(props);

  }



  render() {
    let { children } = this.props;

    return (
      <Container fluid>
        <Row>
          <Col md="3"></Col>
          <Col
            md="6"
            tag="main"
          >
            {children}
          </Col>
          <Col md="3"></Col>
        </Row>
      </Container>
    );
  }
}

DefaultLayout.propTypes = {
  noNavbar: PropTypes.bool,
  noFooter: PropTypes.bool
};

DefaultLayout.defaultProps = {
  noNavbar: false,
  noFooter: false
};

export default DefaultLayout;
