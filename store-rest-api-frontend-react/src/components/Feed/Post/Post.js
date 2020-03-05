import React from "react";
import { Link } from "react-router-dom";
import Button from "../../Button/Button";
import "./Post.css";

const post = props => (
  <div>
    <article className="post">
      <header className="post__header">
        <h3 className="post__meta">
          Posted by {props.author} on {props.date}
        </h3>
        <h1 className="post__title">{props.title}</h1>
      </header>
      {/* <div className="post__image">
      <Image imageUrl={props.image} contain />
    </div>
    <div className="post__content">{props.content}</div> */}
      <div className="post__actions">
        <Button mode="flat" link={props.id}>
          View
        </Button>
        <Button mode="flat" onClick={props.onStartEdit}>
          Edit
        </Button>
        <Button mode="flat" design="danger" onClick={props.onDelete}>
          Delete
        </Button>
      </div>
    </article>

    <article className="product">
      <Link to={props.id}>
        <header className="product__header">
          <h3 className="product__meta">
            Posted by {props.author} on {props.date}
          </h3>
          <h1 className="product_title">{props.title}</h1>
        </header>
      </Link>
    </article>
  </div>
);

export default post;
