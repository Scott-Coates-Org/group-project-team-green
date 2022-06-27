import React from "react";

const SingleAddOn = ({ addOn }) => {
  return (
    <article>
      <h3>{addOn.addOnName}</h3>
      <p>$ {addOn.addOnPrice}</p>
    </article>
  );
};

export default SingleAddOn;
