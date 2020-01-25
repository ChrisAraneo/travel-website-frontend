import React from 'react';
import '../styles/index.css';

const Button = (props) => (
    <button className="button is-primary">{props.children}</button>
);

export default Button;