import React from 'react';
import { Link } from 'react-router-dom';

const Nav = (props) => {
    return (
        <div>
            <Link to="/">
                <h3 id="main-heading"><i className="fa fa-briefcase" aria-hidden="true"></i>||Reddity</h3>
            </Link>
        </div>
    );
}

export default Nav;