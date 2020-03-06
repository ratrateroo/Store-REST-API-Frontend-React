import React from "react";

import Image from "../../Image/Image";
import "./Product.css";

const product = props => (
  <article className="card product-item">
    <header className="card__header">
      <h1 className="product__title">{props.title}</h1>
    </header>
    <div className="card__image">
      <Image imageUrl={props.image} contain />
    </div>
    <div className="card__content">
      <h2 className="product__price">${props.price}</h2>
      <p>
        Posted by {props.seller} on <span>{props.postedOn}</span>
      </p>
      <p className="product__description">{props.description}</p>
    </div>
  </article>
);

export default product;
