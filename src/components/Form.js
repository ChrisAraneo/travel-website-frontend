import React from 'react';
import '../styles/index.css';

import Title from './Title';
import Message from './Message';

/*
props.title
props.success
props.message
props.action
props.children
*/
class Form extends React.Component {

    state = {
        isLoading: false,
        success: false,
        messageVisible: false,
        message: ''
    }

    componentDidUpdate() {
        if (this.props.message !== this.state.message) {
            this.setState({
                messageVisible: true,
                message: this.props.message,
                success: this.props.success
            });
        } else if (this.state.isLoading === true) {
            this.setState({ isLoading: false });
        }
    }

    render() {
        return (
            <form className="box" style={{ maxWidth: '100%', marginLeft: 'auto', margtinRight: 'auto' }}>
                <Title>{this.props.title}</Title>
                <Message
                    header={this.state.success ? 'OK' : 'Błąd'}
                    type={this.state.success ? 'success' : 'danger'}
                    visible={this.state.messageVisible}
                    onClick={() => { this.setState({ messageVisible: false }) }}>
                    {this.state.message}
                </Message>
                {this.props.children}
                <div className="submit is-clearfix">
                    <input
                        className={`button is-primary is-pulled-right ${this.state.isLoading ? 'is-loading' : ''}`}
                        type="submit"
                        value={this.props.button}
                        onClick={(event) => {
                            event.preventDefault();
                            if (this.state.isLoading === false) {
                                this.setState({ isLoading: true },
                                    () => this.props.action(event))
                            }
                        }} />
                </div>
            </form>
        );
    }
}

export default Form;