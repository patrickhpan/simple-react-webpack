import React from 'react';

class App extends React.Component {
    render() {
        const { children } = this.props;

        return <div id="App">
            <h1>App</h1>
            { children }
        </div>
    }
}

export default App;