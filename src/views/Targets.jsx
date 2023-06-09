import React, {useContext, useEffect, useState} from "react";

// reactstrap components
import {Button, Card, CardBody, Col, Row, Table} from "reactstrap";
import ViewContext from "../ViewContext";
import LoginModal from '../LoginModal'
import TargetEditor from './editors/TargetEditor.jsx'
import DecisionModal from "../DecisionModal";

var undef;

const Targets = (props) => {

  const vx = useContext(ViewContext);
  // This should be called when the page first loads
  const loadDataOnce = async() => {
    await vx.listTargets();
  }

  const [target, setTarget] =useState(null);
  const [count, setCount] =useState(0);
  useEffect(() => {
    if (vx.loggedIn)
      loadDataOnce();
  }, []);

  const redraw = () => {
      setCount(count+1);
  }

  const makeNew = async() => {
    if (target !== null)
    return;

    var targ = await vx.getNewTarget("My New Target");
    setTarget(targ);
  }

  const deleteTarget = async(id) => {
    await vx.deleteTarget(id);
    await vx.listTargets();
    redraw();
  }

  const editTarget = async(id) => {
    var t = await vx.getTarget(id);
    if (t) {
      setTarget(t);
    }
  }

  const update = async (x) => {
    if (x !== null) {
      await vx.addNewTarget(x);
    }

    setTarget(null)
    await vx.listTargets();
    redraw();
  }

  const setInstances = () => {

  };

  const getTargetsView = () => {
    console.log("GetTargetsView, rows = " + vx.targets.length);

    var targets = vx.targets;
    targets.sort(function(a, b) {
     a = a.customer_id + a.name;
     b = b.customer_id + b.name;
     return (a > b) - (a < b);
    });
    return(
       targets.map((row, index) => (
         <tr key={'targetsview-' + row}>
           <td>{index}</td>
           <td key={'targets-name-' + index} className="text-left">{row.name}</td>
           <td key={'targets-camp' + index} className="text-left">{vx.getCampaignNameByTargetId(row.id)}</td>
           {vx.user.sub_id === 'superuser' &&
              <td key={'targets-cust-' + index} className="text-left">{row.customer_id}</td>
           }
           <td key={'targets-id-' + index} className="text-right">{row.id}</td>
           <td className="text-center"><Button color="success" size="sm" onClick={()=>editTarget(row.id)}>Edit</Button>
           &nbsp;
           <Button color="danger" size="sm" onClick={(e)=>showModal(e,row.id)}>Delete</Button></td>
         </tr>))
     ); 
  }

    ////////////////////////////// DELETE CAMPAIGN ///////////////////////////////////
    const [modal, setModal] =useState(false);
    const [id, setId] =useState(0);
    const modalCallback = (doit) => {
      if (doit) {
        deleteTarget(id)
      }
      setModal(!modal);
  
    }
    const showModal = (e,x) => {
      if (e.ctrlKey) {
        deleteTarget(x);
        return;
      }
      setId(x);
      setModal(true);
    }
    /////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="content">
    { !vx.isLoggedIn && <LoginModal callback={setInstances} />}
    { modal &&
      <DecisionModal title="Really delete target?" 
                     message="Only the db admin can undo this if you delete it!!!" 
                     name="DELETE"
                     callback={modalCallback} />}
        <Row>
            <Col xs="12">
            { target == null && <>
                <div className="row mb-3">
                    <div className="col-xl-12 col-lg-12" >
                        <strong className="h3">
                            Targets
                        </strong>
                        <Button size="sm" style={{float: 'right'}} className="btn-fill" color="error" onClick={redraw}>Refresh</Button>
                        <Button size="sm" style={{float: 'right'}} className="btn-fill" color="success" onClick={makeNew}>New</Button>
                    </div>
                </div>
                <Card className="card-chart">
                    <CardBody>
                      <Table key={"bidders-table-"+count} size="sm">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th className="text-center">Name</th>
                            <th className="text-center">Campaign</th>
                            {vx.user.sub_id === 'superuser' &&
                                <th className="text-center">Customer</th>
                            }
                            <th className="text-right">SQL-ID</th>
                            <th className="text-center">Actions</th>
                          </tr>
                      </thead>
                      <tbody>
                        { getTargetsView() }
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
                </>
                }
                { target !== null &&
                    <TargetEditor key={"targ-"+count} target={target} callback={update} />
                }
            </Col>
        </Row>
    </div>
  );
 }

 export default Targets;