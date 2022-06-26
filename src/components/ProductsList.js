import { useSelector, useDispatch } from "react-redux";
import {
  selectAllProducts,
  selectProductsLoadingStatus,
  getProductsError,
  fetchProducts,
} from "redux/productsSlice";
import { useEffect } from "react";
import React from "react";
import SingleProduct from "./SingleProduct";

const ProductsList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const loadingStatus = useSelector(selectProductsLoadingStatus);
  const error = useSelector(getProductsError);

  useEffect(() => {
    debugger;
    if (loadingStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [loadingStatus, dispatch]);

  let content;

  if (loadingStatus === "loading") {
    content = <p>"Loading products..."</p>;
  } else if (loadingStatus === "success") {
    content = products.map((product) => (
      <SingleProduct key={product.id} product={product} />
    ));
  } else if (loadingStatus === "failed") {
    content = <p>{error}</p>;
  }
  return <div>{content}</div>;
};

export default ProductsList;
