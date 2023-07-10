import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Card.css';

export default function Card(props) {
  const classes = 'card ' + props.className;
  return (
    <div className={classes} onClick={props.onClick}>
      {props.children}
    </div>
  );
}