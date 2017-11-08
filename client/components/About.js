import React from 'react';
import { Link } from 'react-router-dom';

import Strings from '../json/strings.json';

class About extends React.Component {
    render() {
        return <div className="About">
            {Strings.About.body}
            <br />
            <Link to="/">{Strings.About.link}</Link>
        </div>            
    }
}

export default About