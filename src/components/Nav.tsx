import * as React from "react";
import { Link, NavLink } from "react-router-dom";

export const Nav: React.StatelessComponent<{}> = () =>
(
    <div className="navigation pure-menu pure-menu-horizontal pure-menu-fixed">
        <span className="pure-menu-heading">Monster Soup</span>
        <ul className="pure-menu-list">
            <li className="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
                <Link to="/" className="pure-menu-link" id="menuLink1">Load Monster</Link>
                <ul className="pure-menu-children">
                    <li className="pure-menu-item">
                        <NavLink to="/load/srd" className="pure-menu-link">SRD</NavLink>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
);

export default Nav;
