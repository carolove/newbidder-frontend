/*!

=========================================================
* Black Dashboard React v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useContext, useState} from "react";
import ViewContext from "../ViewContext";
import LoginModal from '../LoginModal'
import SuperUser from '../SuperUser';
import SuperAffiliate from '../SuperAffiliate'
import {blackStyle, getRole, whiteStyle} from "../Utils";


// reactstrap components
import {Button, Card, CardBody, CardFooter, CardHeader, CardText, Col, Form, FormGroup, Input, Row} from "reactstrap";

const UserProfile = () => {

  const vx = useContext(ViewContext);
  const [count, setCount] =useState(1);
  const [adminUser, setAdminUser] =useState(false);
  const [adminCompany, setAdminCompany] =useState(false);
  const [profile, setProfile] =useState(true);


  const setInstances = async() => {
    if (!vx.user.company)
      await vx.getUser();
  };

  const redraw = () => {
    setCount(count+1);
  }

  const doSave = () => {
    var u = vx.user;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var email = document.getElementById("email").value;
    var cid = vx.user.customer_id;
    var role = document.getElementById("role").value;
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var title = document.getElementById("title").value;
    var address = document.getElementById("address").value;
    var citystate = document.getElementById("citystate").value;
    var country = document.getElementById("country").value;
    var postalcode = document.getElementById("postalcode").value;
    var about = document.getElementById("about").value;
    var picture = document.getElementById("picture").value;
    var description = document.getElementById("description").value;
  
    u.username = username;
    u.password = password;
    u.email = email;
    u.sub_id = role;
    u.customer_id = cid;
    u.firstname = firstname;
    u.lastname = lastname;
    u.address = address;
    u.citystate = citystate;
    u.country = country;
    u.postalcode = postalcode;
    u.about = about;
    u.picture = picture;
    u.title = title;
    u.description = description;

   // alert(JSON.stringify(u,null,2));
    if (vx.setNewUser(u)) 
      alert("Saved...");
    setCount(count+1);
  }

  const refresh = () => {
    setCount(count+1);
  }

  const doProfile = () => {
    setAdminUser(false);
    setAdminCompany(false);
    setProfile(true);
  }

  const doAdminUser  = () => {
    setAdminUser(true);
    setAdminCompany(false);
    setProfile(false);
  }

  const doAdminCompany  = () => {
    setAdminCompany(true)
    setAdminUser(false);
    setProfile(false);
  }

  const CENTER = { 
      textAlign: "center"
  }

    return (
        <div key={"profile-"+count} className="content">
        { !vx.isLoggedIn && <LoginModal callback={setInstances} />}
        { vx.loggedIn && vx.user.sub_id === 'superuser' &&
          <Row>
            <Col className="pr-md-1" md="2">
              <Button className="btn-fill" 
                color="success" type="submit" 
                disabled={profile}
                onClick={doProfile}>User Profile</Button>
            </Col>
            <Col className="pr-md-1" md="2">
              <Button className="btn-fill" 
                color="success" type="submit" 
                disabled={adminUser}
                onClick={doAdminUser}>Admin Users</Button>
            </Col>
            <Col className="pr-md-1" md="2">
              <Button className="btn-fill" 
                color="success" type="submit" 
                disabled={adminCompany}
                style={(document.body.classList.contains("white-content")) 
                            ? blackStyle : whiteStyle}
                onClick={doAdminCompany}>Admin Companies</Button>
            </Col>
          </Row>
        }

        {vx.loggedIn && adminUser &&
          <SuperUser key={"superuser-" + count} redrawParent={redraw}/>
        }
        {vx.loggedIn && adminCompany &&
          <SuperAffiliate key={"superaffiliate-" + count} redrawParent={redraw}/>
        }
        { vx.loggedIn && profile &&
          <Row>
            <Col md="8">
              <Card>
                <CardHeader>
                  <h5 className="title">Edit Profile
                  &nbsp;
                  <Button color="warning" size="sm" onClick={()=>refresh()}>Revert</Button></h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <label>Company (disabled)</label>
                      
                            <Input style={(document.body.classList.contains("white-content")) 
                                  ? blackStyle : whiteStyle}
                            defaultValue={vx.user.company}
                            disabled
                            placeholder="Company"
                            type="text"
                            id="company"/>

                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="3">
                        <FormGroup>
                          <label>Username</label>
                          <Input
                            defaultValue={vx.user.username}
                            placeholder="Username"
                            type="text"
                            id="username"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <label htmlFor="password">
                            Password
                          </label>
                          <Input defaultValue={vx.user.password} placeholder="Password" type="password" id="password" />
                        </FormGroup>
                      </Col>
                      </Row>
                      <Row>

                      { (vx.user.sub_id === 'superuser' && vx.user.customer_id === 'rtb4free') &&
                        <Col className="pl-md-1" md="5">
                          <FormGroup>
                            <label htmlFor="cid">
                               Customer Id
                            </label>
                            <Input defaultValue={vx.user.customer_id} 
                              placeholder="cid" 
                              type="text" 
                              id="cid" />
                            </FormGroup>
                          </Col>
                      }

                      <Col className="pl-md-1" md="5">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Email address
                          </label>
                          <Input defaultValue={vx.user.email} placeholder="email" type="email" id="email" />
                        </FormGroup>
                      </Col>
                      </Row>
                    <Row>
                      <Col className="pl-md-1" md="3">
                        <FormGroup>
                          <label htmlFor="role">
                            Role
                          </label>
                          <Input type="select" id="role">
                                    {getRole(vx.user.sub_id)}
                                </Input>        
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <label>First Name</label>
                          <Input
                            defaultValue={vx.user.firstname}
                            placeholder="First Name"
                            type="text"
                            id="firstname"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <label>Last Name</label>
                          <Input
                            defaultValue={vx.user.lastname}
                            placeholder="Last Name"
                            type="text"
                            id="lastname"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Address</label>
                          <Input
                            defaultValue={vx.user.address}
                            placeholder="Work Address"
                            type="text"
                            id="address"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <label>City</label>
                          <Input
                            defaultValue={vx.user.citystate}
                            placeholder="City, State"
                            type="text"
                            id="citystate"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="4">
                        <FormGroup>
                          <label>Country</label>
                          <Input
                            defaultValue={vx.user.country}
                            placeholder="Country"
                            type="text"
                            id="country"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <label>Postal Code</label>
                          <Input defaultValue={vx.user.postalcode} placeholder="ZIP Code" type="text" id="postalcode" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="8">
                        <FormGroup>
                          <label>About Me</label>
                          <Input
                            cols="80"
                            defaultValue={vx.user.about}
                            placeholder="About the user"
                            rows="4"
                            type="textarea"
                            id="about"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="primary" type="submit" onClick={doSave}>
                    Save
                  </Button>
                </CardFooter>
              </Card>
            </Col>
            <Col md="4">
              <Card className="card-user">
                <CardBody>
                  <CardText />
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar"
                        src={vx.user.picture}
                      />
                      <h5 className="title">{vx.user.firstname} {vx.user.lastname}</h5>
                    </a>
                    <Input
                        defaultValue={vx.user.title}
                        placeholder="User title"
                        type="text"
                        id="title"
                        style={CENTER}
                    />
                  </div>
                  <Input
                      cols="20"
                      defaultValue={vx.user.description}
                      placeholder="Description..."
                      rows="4"
                      type="textarea"
                      id="description"
                    />
                    Picture url: <Input
                            defaultValue={vx.user.picture}
                            placeholder="Picture"
                            type="text"
                            id="picture"
                          />
                </CardBody>
                <CardFooter>
                  <div className="button-container">
                    <Button className="btn-icon btn-round" color="facebook">
                      <i className="fab fa-facebook" />
                    </Button>
                    <Button className="btn-icon btn-round" color="twitter">
                      <i className="fab fa-twitter" />
                    </Button>
                    <Button className="btn-icon btn-round" color="google">
                      <i className="fab fa-google-plus" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        }
        </div>
    );
}

export default UserProfile;
