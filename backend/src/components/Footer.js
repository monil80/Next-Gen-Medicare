import React from "react";
import {NavLink} from "react-router-dom";
import "../styles/Footer.css"

function Footer() {
  return (
<div className="footer-dark">
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-md-3 item">
                        <h3>Services</h3>
                        <ul>
                            <li className="opacity-50"><NavLink exact to="#"/>Medicines</li>
                            <li  className="opacity-50"><NavLink exact to="#"/>Orders</li>
                            <li  className="opacity-50"><NavLink exact to="#"/>Hosting</li>
                        </ul>
                    </div>
                    <div className="col-sm-6 col-md-3 item">
                        <h3>About</h3>
                        <ul>
                            <li  className="opacity-50"><NavLink exact to="#"/>Company</li>
                            <li  className="opacity-50"><NavLink exact to="#"/>Team</li>
                            <li  className="opacity-50"><NavLink exact to="#"/>Careers</li>
                        </ul>
                    </div>
                    <div className="col-md-6 item text">
                        <h3>Next Gen Medicare</h3>
                        <p>This site can be useful for the user to buy different types of medicines with safe and secure platform. Here all the medicine are approved from WHO will be available with long lifespan. You can buy and send medicines from any corner of the country - with just a few clicks of the mouse..</p>
                    </div>
                   
                </div>
                <p className="copyright opacity-100 ">Next Gen Medicare © 2022</p>
            </div>
        </footer>
    </div>
  );
}

export default Footer;
