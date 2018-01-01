import React from 'react';
import { Link } from 'react-router-dom';

import strings from 'json/strings.json';

class Login extends React.Component {
    render() {
        const { login, isLoggingIn } = this.props
        const contents = isLoggingIn === true ?
            <div>Attempting to log in...</div> :
            <div className="button" children={strings.Login.link} onClick={login} />;
        return <div id="Login">
            { contents }
        </div>
    }
}

export default Login;