import React from "react";

const SingleProduct = ({ product }) => {
  return (
    <article>
      <h3>{product.productName}</h3>
      <p>$ {product.productPrice}</p>
    </article>
  );
};

export default SingleProduct;
