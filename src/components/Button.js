import React from 'react';
import 'bulma/css/bulma.min.css';

const Button = (props) => (
    <button className="button is-primary">{props.children}</button>
);

export default Button;