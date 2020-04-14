import React from "react";
import '../assets/scss/main.scss';
import Timer from "./Timer";
import {Navbar, Nav} from "react-bootstrap";

export default class NavBar extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
      let imagePath = this.props.imagePath;
      let title = this.props.title;
      let onClick = this.props.onClick;

      let icon = (
        <Nav.Item style={{marginRight:"30%"}}>
        <img width="50"
          height="50"
          className="d-inline-block align-top icon"
          src={imagePath}
          title={title}
          style={{cursor:"pointer"}}
          onClick={onClick}

        />
      </Nav.Item>
      );
    
    return (
      <>
        {icon}
      </>

    );
  }


}