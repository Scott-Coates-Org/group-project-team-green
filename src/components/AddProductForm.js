import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addNewProduct, fetchProducts } from "redux/productsSlice";
import { savePhoto } from "redux/productsSlice";

const AddProductForm = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loadingStatus, setLoadingStatus] = useState("idle");

  const onSubmit = (formData) => {
    console.log("form data in onsubmit:", formData),
      setLoadingStatus("pending");
    dispatch(savePhoto({ file: formData.productPhoto[0] }))
      .then((action) => {
        const photoUrl = action.payload;
        if (photoUrl) {
          dispatch(
            addNewProduct({
              productName: formData.productName,
              productPrice: formData.productPrice,
              productPhoto: photoUrl,
            })
          );
        }
        console.log("Photourl in onsubmit//addnewproduct: ", photoUrl);
      })
      .then(reset(), setLoadingStatus("idle"));
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          id="productName"
          type="text"
          {...register("productName", { required: true })}
          placeholder="Product Name"
        />
        <input
          id="productPrice"
          type="number"
          {...register("productPrice", { required: true })}
          placeholder="Product Price"
        />
        <input
          id="productPhoto"
          type="file"
          accept="image/*"
          {...register("productPhoto", { required: true })}
        />
        <button type="submit">Add Product</button>
      </form>
    </section>
  );
};

export default AddProductForm;
