import { React, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { createNewProduct } from "redux/productsSlice"
import { savePhoto } from "redux/productsSlice"
import { Button} from "reactstrap"
import "../css/form.css"

const CreateProductForm = () => {
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const [loadingStatus, setLoadingStatus] = useState("idle")

  const onSubmit = (formData) => {
    setLoadingStatus("pending")
    dispatch(savePhoto({ file: formData.productPhoto[0] }))
      .then((action) => {
        const photoUrl = action.payload
        if (photoUrl) {
          dispatch(
            createNewProduct({
              productName: formData.productName,
              productPrice: formData.productPrice,
              productPhoto: photoUrl,
              productRoom: formData.productRoom,
              productDuration: formData.productDuration,
            })
          )
        }
      })
      .then(reset(), setLoadingStatus("idle"))
  }

  return (
    <section>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h3>Create a New Product</h3>
        <input
          id="productName"
          type="text"
          {...register("productName", { required: true })}
          placeholder="product Name"
        />
        <br />
        <input
          id="productPrice"
          type="number"
          {...register("productPrice", { required: true })}
          placeholder="product Price"
        />
        <br />
        <label htmlFor="productRoom">Select a Room: </label>
        <select id="productRoom" {...register("productRoom", { required: true })}>
          <option value="Room1"> Room 1</option>
          <option value="Room2">Room 2</option>
        </select>
        <br />
        <label htmlFor="productDuration">Duration: </label>
        <select
          id="productDuration"
          {...register("productDuration", { required: true })}
        >
          <option value="60">60 Minutes</option>
          <option value="90">90 Minutes</option>
          <option value="120">120 Minutes</option>
          <option value="600">All Day Jump</option>
        </select>
        <br />
        <input
          id="productPhoto"
          type="file"
          accept="image/*"
          {...register("productPhoto", { required: true })}
        />
        <br />
        <Button type="submit">Create Product</Button>
      </form>
    </section>
  )
}

export default CreateProductForm
