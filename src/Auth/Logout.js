import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';



class Login extends Component {

    render() {
       
        return ('');
    }

    componentDidMount(){
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        this.props.history.push('/')
        this.props.setUserHandle(null);
    }
}

Login.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }),
    setUserHandle:PropTypes.func.isRequired
};

export default withRouter(Login);