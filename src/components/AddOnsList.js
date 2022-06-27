import { useSelector, useDispatch } from "react-redux";
import {
  selectAllAddOns,
  selectAddOnsLoadingStatus,
  getAddOnsError,
  fetchAddOns,
} from "redux/addOnsSlice";
import { useEffect } from "react";
import React from "react";
import SingleAddOn from "./SingleAddOn";

const AddOnsList = () => {
  const dispatch = useDispatch();
  const addOns = useSelector(selectAllAddOns);
  const loadingStatus = useSelector(selectAddOnsLoadingStatus);
  const error = useSelector(getAddOnsError);

  useEffect(() => {
    debugger;
    if (loadingStatus === "idle") {
      dispatch(fetchAddOns());
    }
  }, [loadingStatus, dispatch]);

  let content;

  if (loadingStatus === "loading") {
    content = <p>"Loading addOns..."</p>;
  } else if (loadingStatus === "success") {
    content = addOns.map((addOn) => (
      <SingleAddOn key={addOn.id} addOn={addOn} />
    ));
  } else if (loadingStatus === "failed") {
    content = <p>{error}</p>;
  }
  return <div>{content}</div>;
};

export default AddOnsList;
