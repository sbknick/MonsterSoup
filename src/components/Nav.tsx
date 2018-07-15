import * as React from "react";

export const Nav: React.StatelessComponent<{}> = () =>
(
    <div className="navigation pure-menu pure-menu-horizontal pure-menu-fixed">
        <span className="pure-menu-heading">Monster Soup</span>
        <ul className="pure-menu-list">
            <li className="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
                <a href="#" id="menuLink1" className="pure-menu-link">Load Monster</a>
                <ul className="pure-menu-children">
                    <li className="pure-menu-item"><a href="#" className="pure-menu-link">SRD</a></li>
                </ul>
            </li>
        </ul>
    </div>
);

export default Nav;
