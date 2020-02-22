import React from 'react';
import '../styles/index.css';

const Button = (props) => {
    if (props.onClick) {
        return <button className="button is-primary" onClick={(e) => props.onClick(e)}>{props.children}</button>
    } else {
        return <button className="button is-primary">{props.children}</button>
    }
}

export default Button;