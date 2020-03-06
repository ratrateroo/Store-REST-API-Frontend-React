import React, { Component, Fragment } from "react";

//import Backdrop from "../../Backdrop/Backdrop";
//import Modal from "../../Modal/Modal";

import Input from "../../../components/Form/Input/Input";
import Button from "../../../components/Button/Button";
import FilePicker from "../../../components/Form/Input/FilePicker";
import Image from "../../../components/Image/Image";
import { required, length, price } from "../../../util/validators";
import { generateBase64FromImage } from "../../../util/image";
import "./AddProduct.css";

const PRODUCT_FORM = {
  title: {
    value: "",
    valid: false,
    touched: false,
    validators: [required, length({ min: 5 })]
  },
  image: {
    value: "",
    valid: false,
    touched: false,
    validators: [required]
  },
  price: {
    value: "",
    valid: false,
    touched: false,
    validators: [required, price]
  },
  description: {
    value: "",
    valid: false,
    touched: false,
    validators: [required, length({ min: 5 })]
  }
};

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productForm: PRODUCT_FORM,
      formIsValid: false,
      imagePreview: null
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.editing &&
      prevProps.editing !== this.props.editing &&
      prevProps.selectedPost !== this.props.selectedPost
    ) {
      const productForm = {
        title: {
          ...prevState.productForm.title,
          value: this.props.selectedPost.title,
          valid: true
        },
        image: {
          ...prevState.productForm.image,
          value: this.props.selectedPost.imagePath,
          valid: true
        },
        content: {
          ...prevState.productForm.content,
          value: this.props.selectedPost.content,
          valid: true
        }
      };
      this.setState({ productForm: productForm, formIsValid: true });
    }
  }

  productInputChangeHandler = (input, value, files) => {
    if (files) {
      generateBase64FromImage(files[0])
        .then(b64 => {
          this.setState({ imagePreview: b64 });
        })
        .catch(e => {
          this.setState({ imagePreview: null });
        });
    }
    this.setState(prevState => {
      let isValid = true;
      for (const validator of prevState.productForm[input].validators) {
        isValid = isValid && validator(value);
      }
      const updatedForm = {
        ...prevState.productForm,
        [input]: {
          ...prevState.productForm[input],
          valid: isValid,
          value: files ? files[0] : value
        }
      };
      let formIsValid = true;
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid;
      }
      return {
        productForm: updatedForm,
        formIsValid: formIsValid
      };
    });
  };

  inputBlurHandler = input => {
    this.setState(prevState => {
      return {
        productForm: {
          ...prevState.productForm,
          [input]: {
            ...prevState.productForm[input],
            touched: true
          }
        }
      };
    });
  };

  cancelPostChangeHandler = () => {
    this.setState({
      productForm: PRODUCT_FORM,
      formIsValid: false
    });
    this.props.onCancelEdit();
  };

  acceptPostChangeHandler = () => {
    const product = {
      title: this.state.productForm.title.value,
      image: this.state.productForm.image.value,
      content: this.state.productForm.content.value
    };
    this.props.onFinishEdit(product);
    this.setState({
      productForm: PRODUCT_FORM,
      formIsValid: false,
      imagePreview: null
    });
  };

  acceptPostChangeHandler = () => {
    const post = {
      title: this.state.postForm.title.value,
      image: this.state.postForm.image.value,
      content: this.state.postForm.content.value
    };
    this.props.onFinishEdit(post);
    this.setState({
      postForm: POST_FORM,
      formIsValid: false,
      imagePreview: null
    });
  };

  onAddProduct = () => {
    const productData = {
      title: this.state.productForm.title.value,
      image: this.state.productForm.image.value,
      price: this.state.productForm.price.value,
      description: this.state.productForm.description.value
    };

    const formData = new FormData();
    formData.append("title", productData.title);
    formData.append("image", productData.image);
    formData.append("price", productData.price);
    formData.append("description", productData.description);

    let url = "http://localhost:8080/shop/addproduct";
    let method = "POST";

    fetch(url, {
      method: method,
      body: formData,
      headers: {
        Authorization: "Bearer " + this.props.token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Creating or editing a post failed!");
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);

        const productData = {
          _id: resData.post._id,
          title: resData.post.title,
          content: resData.post.content,
          creator: resData.post.creator.name,
          createdAt: resData.post.createdAt
        };
        this.setState(prevState => {
          return {
            isEditing: false,
            editPost: null,
            editLoading: false
          };
        });
      });
  };

  finishEditHandler = postData => {
    this.setState({
      editLoading: true
    });
    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("content", postData.content);
    formData.append("image", postData.image);
    let url = "http://localhost:8080/feed/post";
    let method = "POST";
    if (this.state.editPost) {
      url = "http://localhost:8080/feed/post/" + this.state.editPost._id;
      method = "PUT";
    }

    fetch(url, {
      method: method,
      body: formData,
      headers: {
        Authorization: "Bearer " + this.props.token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Creating or editing a post failed!");
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        console.log(resData.post.creator.firstname);
        const post = {
          _id: resData.post._id,
          title: resData.post.title,
          content: resData.post.content,
          creator: resData.post.creator.name,
          createdAt: resData.post.createdAt
        };
        this.setState(prevState => {
          return {
            isEditing: false,
            editPost: null,
            editLoading: false
          };
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isEditing: false,
          editPost: null,
          editLoading: false,
          error: err
        });
      });
  };

  render() {
    return (
      <Fragment>
        {/* <Backdrop onClick={this.cancelPostChangeHandler} />
        <Modal
          title="New Post"
          acceptEnabled={this.state.formIsValid}
          onCancelModal={this.cancelPostChangeHandler}
          onAcceptModal={this.acceptPostChangeHandler}
          isLoading={this.props.loading}
        > */}
        <section className="addproduct">
          <form>
            <Input
              id="title"
              label="Title"
              control="input"
              onChange={this.productInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, "title")}
              valid={this.state.productForm["title"].valid}
              touched={this.state.productForm["title"].touched}
              value={this.state.productForm["title"].value}
            />
            <FilePicker
              id="image"
              label="Image"
              control="input"
              onChange={this.productInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, "image")}
              valid={this.state.productForm["image"].valid}
              touched={this.state.productForm["image"].touched}
            />
            <div className="new-product__preview-image">
              {!this.state.imagePreview && <p>Please choose an image.</p>}
              {this.state.imagePreview && (
                <Image imageUrl={this.state.imagePreview} />
              )}
            </div>
            <Input
              id="price"
              label="Price"
              control="input"
              onChange={this.productInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, "price")}
              valid={this.state.productForm["price"].valid}
              touched={this.state.productForm["price"].touched}
              value={this.state.productForm["price"].value}
            />
            <Input
              id="description"
              label="Description"
              control="textarea"
              rows="5"
              onChange={this.productInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, "description")}
              valid={this.state.productForm["description"].valid}
              touched={this.state.productForm["description"].touched}
              value={this.state.productForm["description"].value}
            />

            <Button
              design="danger"
              mode="flat"
              onClick={this.onCancelAddingProduct}
            >
              Cancel
            </Button>
            <Button mode="raised" onClick={this.onAddProduct}>
              Add Product
            </Button>
          </form>
        </section>
        {/* </Modal> */}
      </Fragment>
    );
  }
}

export default AddProduct;
