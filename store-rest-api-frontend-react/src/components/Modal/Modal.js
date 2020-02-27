import React from "react";
import ReactDOM from "react-dom";

import "./Modal.css";

const Modal = props => (
  <div class="modal">
    <header class="modal__header">
      <h1>Modal Title</h1>
    </header>
    <div class="modal__content">Modal Content</div>
    <div class="modal__actions">
      <button class="button">Cancel</button>
      <button class="button">Accept</button>
    </div>
  </div>
);

export default Modal;
