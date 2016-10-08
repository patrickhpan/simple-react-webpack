import React from 'react';
import Strings from '../json/strings.json';

class HelloWorld extends React.Component {
    render() {
        return <div className="hello-world">{Strings.HelloWorld}</div>
    }
}

export default HelloWorld;