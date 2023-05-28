import React, {useContext, useEffect, useState} from "react";

// reactstrap components
import {Row} from "reactstrap";
import ViewContext from "../ViewContext";
import LoginModal from '../LoginModal';

var undef;

const Reasons = (props) => {

    const [count, setCount] =useState(0);
    const [reasons, setReasons] =useState([]);
    const vx = useContext(ViewContext);

    useEffect(() => {
        if (vx.loggedIn)
         refresh();
      }, []);
  
    const redraw = () => {
        setCount(count+1);
    }

    const refresh = async () => {
        setReasons(await vx.getReasons());
    }

  const ReasonsView = (props) => {
      alert("ReasonsView: " + props.view);
     return (reasons.map((row, index) => (
        <Row>
            {row}
        </Row>))
    ); 
  }

  const setInstances = () => {
    refresh();
  };


  return (
    <div className="content">
    { vx.loggedIn ?
        <ReasonsView view={reasons}/>
        :
        <LoginModal callback={setInstances} />
    }
    </div>
  );
 }

 export default Reasons;