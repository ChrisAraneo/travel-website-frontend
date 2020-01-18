import React from 'react';
import 'bulma/css/bulma.min.css';

const Message = (props) => {
    if (props.visible) {
        return (
            <article className={`message is-${props.type}`}>
                <div className="message-header">
                    <p>{props.header}</p>
                    <button className="delete" aria-label="delete" onClick={(event) => { event.preventDefault(); props.onClick(); }}></button>
                </div>
                <div className="message-body">
                    {String(props.children)}
                </div>
            </article>
        )
    } else {
        return null;
    }
}

export default Message;