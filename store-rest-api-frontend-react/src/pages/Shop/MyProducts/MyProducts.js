import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import openSocket from "socket.io-client";

import Product from "../../../components/Products/Product/Product";
import Paginator from "../../../components/Paginator/Paginator";
import Loader from "../../../components/Loader/Loader";
import ErrorHandler from "../../../components/ErrorHandler/ErrorHandler";
import "./MyProducts.css";

class MyProducts extends Component {
  state = {
    //isEditing: false,
    products: [],
    totalProducts: 0,
    editProduct: null,
    status: "",
    productPage: 1,
    productsLoading: true,
    editLoading: false
  };

  componentDidMount() {
    fetch("http://localhost:8080/shop/myproducts", {
      headers: {
        Authorization: "Bearer " + this.props.token
      }
    })
      .then(res => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch user status.");
        }
        return res.json();
      })
      .then(resData => {
        // this.setState({ status: resData.status });
        console.log(resData);
      })
      .catch(this.catchError);

    this.loadProducts();
  }

  loadProducts = direction => {
    if (direction) {
      this.setState({ productsLoading: true, products: [] });
    }
    let page = this.state.productPage;
    if (direction === "next") {
      page++;
      this.setState({ productPage: page });
    }
    if (direction === "previous") {
      page--;
      this.setState({ productPage: page });
    }
    fetch("http://localhost:8080/shop/myproducts?page=" + page, {
      headers: {
        Authorization: "Bearer " + this.props.token
      }
    })
      .then(res => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch products.");
        }
        return res.json();
      })
      .then(resData => {
        this.setState({
          products: resData.products.map(product => {
            return {
              ...product,
              imagePath: product.imageUrl
            };
          }),
          totalProducts: resData.totalItems,
          productsLoading: false
        });

        console.log(this.state.products);
      })
      .catch(this.catchError);
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

        <section className="products">
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
                <Link to={"/my-products/" + product._id} key={product._id}>
                  <Product
                    key={product._id}
                    id={product._id}
                    seller={product.seller.firstname}
                    postedOn={new Date(product.createdAt).toLocaleDateString(
                      "en-US"
                    )}
                    title={product.title}
                    image={"http://localhost:8080/" + product.imageUrl}
                    description={product.description}
                    price={product.price}
                    // onStartEdit={this.startEditPostHandler.bind(this, post._id)}
                    // onDelete={this.deletePostHandler.bind(this, post._id)}
                  />
                </Link>
              ))}
            </Paginator>
          )}
        </section>
      </Fragment>
    );
  }
}

export default MyProducts;
