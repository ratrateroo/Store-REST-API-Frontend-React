import React, { Component, Fragment } from "react";
import openSocket from "socket.io-client";

import Product from "../../../components/Products/Product/Product";
import Paginator from "../../../components/Paginator/Paginator";
import Loader from "../../../components/Loader/Loader";
import ErrorHandler from "../../../components/ErrorHandler/ErrorHandler";
import "./MyProducts.css";

class MyProducts extends Component {
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

  componentDidMount() {
    fetch("http://localhost:8080/shop/myproducts", {
      // headers: {
      //   Authorization: "Bearer " + this.props.token
      // }
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
    fetch("http://localhost:8080/shop/products?page=" + page, {
      // headers: {
      //   Authorization: "Bearer " + this.props.token
      // }
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
                <Product
                  key={product._id}
                  id={product._id}
                  seller={product.seller}
                  postedOn={new Date(product.postedOn).toLocaleDateString(
                    "en-US"
                  )}
                  title={product.title}
                  image={"http://localhost:8080/" + product.imageUrl}
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

export default MyProducts;
