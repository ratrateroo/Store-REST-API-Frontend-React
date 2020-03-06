import React from "react";

import "./Footer.css";

const footer = props => (
  <footer className="footer">
    <div className="footer__navigation">
      <ul className="footer__links">
        <li className="footer__link">
          <a href="#">Terms and Conditions</a>
        </li>
        <li className="footer__link">
          <a href="#">Help</a>
        </li>
        <li className="footer__link">
          <a href="signup.html">Signup</a>
        </li>
      </ul>
    </div>
  </footer>
);

export default footer;
