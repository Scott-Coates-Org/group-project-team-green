import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { addNewAddOn, fetchAddOns } from "redux/addOnsSlice"
import { savePhoto } from "redux/addOnsSlice"

const CreateProducts = () => {
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const [loadingStatus, setLoadingStatus] = useState("idle")

  const onSubmit = (formData) => {
    console.log("form data in onsubmit:", formData), setLoadingStatus("pending")
    dispatch(savePhoto({ file: formData.addOnPhoto[0] }))
      .then((action) => {
        const photoUrl = action.payload
        if (photoUrl) {
          dispatch(
            addNewAddOn({
              addOnName: formData.addOnName,
              addOnPrice: formData.addOnPrice,
              addOnPhoto: photoUrl,
            })
          )
        }
      })
      .then(reset(), setLoadingStatus("idle"))
  }

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          id="addOnName"
          type="text"
          {...register("addOnName", { required: true })}
          placeholder="addOn Name"
        />
        <input
          id="addOnPrice"
          type="number"
          {...register("addOnPrice", { required: true })}
          placeholder="addOn Price"
        />
        <input
          id="addOnPhoto"
          type="file"
          accept="image/*"
          {...register("addOnPhoto", { required: true })}
        />
        <button type="submit">Add AddOn</button>
      </form>
    </section>
  )
}

export default CreateProducts
