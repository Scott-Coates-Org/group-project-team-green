import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createNewProduct} from "redux/productsSlice";
import { savePhoto } from "redux/productsSlice";

const CreateProductForm = () => {
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
            createNewProduct({
              productName: formData.productName,
              productPrice: formData.productPrice,
              productPhoto: photoUrl,
            })
          );
        }
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
          placeholder="product Name"
        />
        <input
          id="productPrice"
          type="number"
          {...register("productPrice", { required: true })}
          placeholder="product Price"
        />
        <input
          id="productPhoto"
          type="file"
          accept="image/*"
          {...register("productPhoto", { required: true })}
        />
        <button type="submit">Create Product</button>
      </form>
    </section>
  );
};

export default CreateProductForm;
