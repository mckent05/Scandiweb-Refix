import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { BsCart } from "react-icons/bs";
import { togglePopUp } from "../../../Redux/PLP/listingPage";
import { getProductDetails } from "../../../Redux/PDP/descriptionPage";

const mapStateToProps = (state) => ({
  myState: state.productList,
  headerState: state.category,
});

const mapDispatchToProps = () => ({
  togglePopUp,
  getProductDetails,
});

class ProductCard extends Component {
  static priceDisplay(selectedPrice) {
    return (
      <article>
        <p>
          <span>{selectedPrice[0].currency.symbol}</span>
          <span>{selectedPrice[0].amount}</span>
        </p>
      </article>
    );
  }

  popUpToggle(productId) {
    const { togglePopUp } = this.props;
    togglePopUp(productId);
  }

  displayCartButton(stock, id) {
    if (!stock) {
      return (
        <div className="attr-container d-flex a-center">
          <button type="button" disabled className="add">
            <BsCart />
          </button>
        </div>
      );
    }
    return (
      <div className="attr-container d-flex a-center">
        <button
          type="button"
          className="add"
          onClick={() => this.popUpToggle(id)}
        >
          <BsCart className="cart-add-img" />
        </button>
      </div>
    );
  }

  viewProduct(id) {
    localStorage.setItem("id", JSON.stringify(id));
  }

  render() {
    const {
      prices,
      productName,
      gallery,
      stock,
      id,
      headerState: { currencyDetails },
    } = this.props;

    let selectedPrice

    const selectedCurrency = currencyDetails.filter(
      (currency) => currency.selected === true
    );

    if (selectedCurrency.length > 0){
       selectedPrice = prices.filter(
        (price) => price.currency.symbol === selectedCurrency[0].symbol
      );
    } else {
      selectedPrice = prices
    }
    return (
      <div
        className="products d-flex f-col a-center j-center"
        onMouseEnter={(e) => e.currentTarget.classList.add("display-add")}
        onMouseLeave={(e) => e.currentTarget.classList.remove("display-add")}
      >
        <Link to={`/product/${id}`} onClick={() => this.viewProduct(id)}>
          <div className="img-link-cont d-flex a-center j-center">
            <img className="product-img" src={gallery[0]} alt="img" />
            {stock || <h2 className="out-of-stock">Out of Stock</h2>}
          </div>
        </Link>
        <div className="product-details d-flex f-col">
          <h3 className="product-name">{productName}</h3>
          <div className="product-price">
            {ProductCard.priceDisplay(selectedPrice)}
            {this.displayCartButton(stock, id)}
          </div>
        </div>
      </div>
    );
  }
}

ProductCard.propTypes = {
  prices: PropTypes.arrayOf(Object).isRequired,
  productName: PropTypes.string.isRequired,
  gallery: PropTypes.arrayOf(String).isRequired,
  stock: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps())(ProductCard);
