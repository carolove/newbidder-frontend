import React, {useContext} from "react";
import ViewContext from "./ViewContext";

// reactstrap components
import {Alert, Button, Col, FormGroup, Input, Row} from "reactstrap";
import {blackStyle, customerIds, getRole, whiteStyle} from "./Utils"


const ESUser = (props) => {

    const vx = useContext(ViewContext);

    const showUsers = () => {
        var items  =[];
        props.users.map((row, index) => {
            items.push(
            <Alert color="info" key={"alert-users-"+index}>
              <Row>
                <Col className="pr-md-1" md="2">
                <FormGroup>
                        <label>Customer ID</label>
                    <Input 
                        style={(document.body.classList.contains("white-content")) 
                            ? blackStyle : whiteStyle}
                        disabled={vx.user.customer_id != 'rtb4free'}
                        onChange={(e) =>props.changeUserField(e,index,'customer_id')}
                        type="select">
                        { customerIds(props.affiliates,row.customer_id) }
                      </Input>
                </FormGroup>
                </Col>
              </Row>
              <Row>
                  <Col className="pr-md-1" md="2">
                      <FormGroup>
                        <label>Username</label>
                          <Input 
                            defaultValue={row.username}
                            onChange={(e) => props.changeUserField(e,index,'username')}/>
                      </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="2">
                      <FormGroup>
                        <label>Role</label>
                          <Input type="select" id="role"
                              onChange={(e) => props.changeUserField(e,index,'sub_id')}>
                                {getRole(row.sub_id)}
                          </Input> 
                        </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="2">
                      <FormGroup>
                        <label>Password</label>
                          <Input 
                            defaultValue={row.password}
                            onChange={(e) => props.changeUserField(e,index,'password')}/>
                      </FormGroup>
                    </Col>
                    </Row>
                    <Row>
                      <Button color="success" size="sm" onClick={()=>props.editUser(row.id)}>Save</Button>
                      &nbsp;
                      <Button color="warning" size="sm" onClick={()=>props.deleteUser(row.id)}>Delete</Button>
                    </Row>
            </Alert>
            )
        });
        return items;
    }

    return (
        <>
        { 
          showUsers() 
        }
        </>
    );
}

export default ESUser;
