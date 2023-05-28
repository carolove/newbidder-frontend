import React, {useContext} from "react";

// reactstrap components
import {Card, CardHeader, CardTitle, Col, Row} from "reactstrap";
import ViewContext from "../ViewContext";
import LoginModal from '../LoginModal'

var undef;

const Native = (props) => {

    const vx = useContext(ViewContext);

    const setInstances = () => {

    };

  return (
    <div className="content">
    { !vx.isLoggedIn && <LoginModal callback={setInstances} />}
        <Row>
            <Col xs="12">
                <Card className="card-chart">
                    <CardHeader>
                        <Row>
                            <CardTitle tag="h2">Native</CardTitle>
                        </Row>
                    </CardHeader>
                </Card>
            </Col>
        </Row>
    </div>
  );
 }

 export default Native;