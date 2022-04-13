import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FaShoppingCart } from "react-icons/fa";

class ProductCard extends Component {
  static priceDisplay(selectedPrice, prices) {
    return (
      <article>
        {selectedPrice.length > 0 ? (
          <p>
            <span>{selectedPrice[0].currency.symbol}</span>
            <span>{selectedPrice[0].amount}</span>
          </p>
        ) : (
          <p>
            <span>{prices[0].currency.symbol}</span>
            <span>{prices[0].amount}</span>
          </p>
        )}
      </article>
    );
  }

  static displayCartButton(stock) {
    if (!stock) {
      return (
        <div className="attr-container">
          <button type="button" disabled className="add">
            <FaShoppingCart />
          </button>
        </div>
      );
    }
    return (
      <div className="attr-container">
        <button type="button" className="add">
          <FaShoppingCart />
        </button>
      </div>
    );
  }

  render() {
    const { prices, productName, gallery, stock, id } = this.props;

    const selectedPrice = prices.filter((price) => price.selected === true);

    return (
      <div className="products d-flex f-col a-center j-center">
        <Link to={`/product/${id}`}>
          <div className="img-link-cont d-flex a-center j-center">
            <img className="product-img" src={gallery[0]} alt="img" />
            {stock || <h2 className="out-of-stock">Out of Stock</h2>}
          </div>
        </Link>
        <div className="product-details d-flex f-col">
          <h3 className="product-name">{productName}</h3>
          <div className="product-price">
            {ProductCard.priceDisplay(selectedPrice, prices)}
            {ProductCard.displayCartButton(stock)}
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

export default ProductCard;
