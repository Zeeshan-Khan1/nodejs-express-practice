import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    imageUrl: ''
  })

  // optional image file (for future Cloudinary upload)
  const [imageFile, setImageFile] = useState(null)
  const [isError, setIsError] = useState(false)

  const navigate = useNavigate()

  const handleFormData = (e) => {
    setFormData((pre) => ({
      ...pre,
      [e.target.name]: e.target.value
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null
    setImageFile(file)
    if (file) {
      console.log('Selected image file:', file.name)
    }
  }

  const handleSubmit = async () => {
    try {
      console.log(formData)
      // send JSON body directly to backend (hardcoded URL to avoid .env issues)
      const res = await axios.post('http://localhost:8000/api/products', formData)
      console.log('Product created:', res.data)
      navigate('/admin/products')
    } catch (error) {
      const msg = error?.response?.data?.message || error.message || 'Error'
      console.error('Error creating product:', msg)
      setIsError(msg)
    }
  }

  return (
    <div className="flex justify-center">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  w-full max-w-xl border p-4">
        <legend className="fieldset-legend">Create New Product</legend>

        {isError && <p className="text-red-500">{isError}</p>}

        <label className="label">Product Name</label>
        <input
          name="name"
          type="text"
          className="input w-full"
          onChange={handleFormData}
        />

        <label className="label">Product Price</label>
        <input
          name="price"
          type="number"
          className="input w-full"
          onChange={handleFormData}
        />

        <label className="label">Product Quantity</label>
        <input
          name="quantity"
          type="number"
          className="input w-full"
          onChange={handleFormData}
        />

        <label className="label">Product Image (optional)</label>
        <input
          name="image"
          type="file"
          accept="image/*"
          className="file-input w-full"
          onChange={handleImageChange}
        />

        <button
          className="btn btn-neutral mt-4"
          onClick={handleSubmit}
        >
          Create Product
        </button>
      </fieldset>
    </div>
  )
}

export default AddProduct
