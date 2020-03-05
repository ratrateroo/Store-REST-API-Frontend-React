import React, { Component, Fragment } from "react";
import openSocket from "socket.io-client";

import Post from "../../components/Feed/Post/Post";
import Button from "../../components/Button/Button";
import FeedEdit from "../../components/Feed/FeedEdit/FeedEdit";
import Input from "../../components/Form/Input/Input";
import Paginator from "../../components/Paginator/Paginator";
import Loader from "../../components/Loader/Loader";
import ErrorHandler from "../../components/ErrorHandler/ErrorHandler";
import "./Products.css";

class Products extends Component {
  state = {
    //isEditing: false,
    products: [
      {
        _id: 123,
        title: "product1",
        price: 100,
        description: "good condition",
        imageUrl:
          "https://media.cntraveler.com/photos/5c6429aa9189f70d8058705c/master/w_820,c_limit/Laucala%2520Island-2.jpg",
        seller: "Mark",
        postedOn: "2020-03-05T11:23:42.748+00:00"
      }
    ],
    totalProducts: 0,
    editProduct: null,
    status: "",
    productPage: 1,
    productsLoading: true,
    editLoading: false
  };

  render() {
    return (
      <Fragment>
        <ErrorHandler error={this.state.error} onHandle={this.errorHandler} />

        {/* <FeedEdit
          editing={this.state.isEditing}
          selectedPost={this.state.editPost}
          loading={this.state.editLoading}
          onCancelEdit={this.cancelEditHandler}
          onFinishEdit={this.finishEditHandler}
        /> */}

        <section className="feed__status">
          <form onSubmit={this.statusUpdateHandler}>
            <Input
              type="text"
              placeholder="Search Products"
              control="input"
              onChange={this.statusInputChangeHandler}
              value={this.state.status}
            />
            <Button mode="flat" type="submit">
              Search
            </Button>
          </form>
        </section>

        <section className="feed__control">
          <Button mode="raised" design="accent" onClick={this.newPostHandler}>
            Add New Product
          </Button>
        </section>

        <section className="feed">
          {this.state.productsLoading && (
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <Loader />
            </div>
          )}

          {this.state.products.length <= 0 && !this.state.productsLoading ? (
            <p style={{ textAlign: "center" }}>No products found.</p>
          ) : null}
          {!this.state.productsLoading && (
            <Paginator
            //onPrevious={this.loadPosts.bind(this, "previous")}
            //onNext={this.loadPosts.bind(this, "next")}
            //lastPage={Math.ceil(this.state.totalPosts / 2)}
            //currentPage={this.state.postPage}
            >
              {this.state.products.map(product => (
                <Post
                  key={product._id}
                  id={product._id}
                  seller={product.seller}
                  postedOn={new Date(product.postedOn).toLocaleDateString(
                    "en-US"
                  )}
                  title={product.title}
                  image={product.imageUrl}
                  description={product.description}
                  price={product.price}
                  // onStartEdit={this.startEditPostHandler.bind(this, post._id)}
                  // onDelete={this.deletePostHandler.bind(this, post._id)}
                />
              ))}
            </Paginator>
          )}
        </section>
      </Fragment>
    );
  }
}

export default Products;
