import React from "react";
let GLOBAL_CONFIG = require('../config/config.js');
import {Modal, Button, CardGroup, Card, Tab, Tabs, Sonnet} from 'react-bootstrap';

export default class CardInstructions extends React.Component
{
  constructor(props){
    super(props);
  }

  render()
  {
    let pathImage = this.props.pathImage;
    let title = this.props.title;
    let text = this.props.text;

    let card = "";
    card = (
      <Card>
        <Card.Img className="cards" src={pathImage}/>
        <Card.Body>
          <Card.Title><b>{title}</b></Card.Title>
          <Card.Text >
            {text}
          </Card.Text>
        </Card.Body>

      </Card>
    );

    return (
      <>
        {card}
      </>
    );
  }
}