import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Products = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isDeletingId, setIsDeletingId] = useState(null)

  const handleReadAll = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const res = await axios.get('http://localhost:8000/api/products')
      setProducts(res.data.products || [])
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Error'
      setError(msg)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!id) return
    const confirmDelete = window.confirm('Are you sure you want to delete this product?')
    if (!confirmDelete) return

    try {
      setIsDeletingId(id)
      setError(null)
      await axios.delete(`http://localhost:8000/api/products/${id}`)
      // remove from local state
      setProducts((prev) => prev.filter((p) => p._id !== id))
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Error'
      setError(msg)
    } finally {
      setIsDeletingId(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Link to="/admin/add-product" className="btn btn-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-plus-icon lucide-plus"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          Add New Product
        </Link>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleReadAll}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Read all products'}
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {products.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, idx) => (
                <tr key={p._id || idx}>
                  <td>{idx + 1}</td>
                  <td>{p.name}</td>
                  <td>{p.price}</td>
                  <td>{p.quantity ?? '-'}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-error btn-xs"
                      onClick={() => handleDelete(p._id)}
                      disabled={isDeletingId === p._id}
                    >
                      {isDeletingId === p._id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Products
