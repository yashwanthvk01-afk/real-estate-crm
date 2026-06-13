import { useState } from 'react'

function PropertyForm({ initialData, onSubmit, onCancel }) {

  const [form, setForm] = useState(
    initialData || {
      title: '',
      price: '',
      location: '',
      type: 'Apartment',
      status: 'Available'
    }
  )

  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!form.title.trim()) newErrors.title = 'Title అవసరం'
    if (!form.price) newErrors.price = 'Price అవసరం'
    if (!form.location.trim()) newErrors.location = 'Location అవసరం'
    return newErrors
  }

  const handleSubmit = () => {
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    onSubmit(form)
  }

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value })
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' })
    }
  }

  return (
    <div>

      {/* TITLE */}
      <div className="mb-4">
        <label className="block text-xs font-semibold
                          text-slate-500 uppercase tracking-wider mb-2">
          Title
        </label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Property title రాయి"
          className={`w-full px-4 py-2.5 rounded-lg border
                      text-sm outline-none transition-colors
                      ${errors.title
                        ? 'border-red-400 bg-red-50'
                        : 'border-slate-200 focus:border-indigo-400'
                      }`}
        />
        {errors.title && (
          <p className="text-red-500 text-xs mt-1">{errors.title}</p>
        )}
      </div>

      {/* PRICE */}
      <div className="mb-4">
        <label className="block text-xs font-semibold
                          text-slate-500 uppercase tracking-wider mb-2">
          Price (₹)
        </label>
        <input
          type="number"
          value={form.price}
          onChange={(e) => handleChange('price', e.target.value)}
          placeholder="Price enter చేయి"
          className={`w-full px-4 py-2.5 rounded-lg border
                      text-sm outline-none transition-colors
                      ${errors.price
                        ? 'border-red-400 bg-red-50'
                        : 'border-slate-200 focus:border-indigo-400'
                      }`}
        />
        {errors.price && (
          <p className="text-red-500 text-xs mt-1">{errors.price}</p>
        )}
      </div>

      {/* LOCATION */}
      <div className="mb-4">
        <label className="block text-xs font-semibold
                          text-slate-500 uppercase tracking-wider mb-2">
          Location
        </label>
        <input
          type="text"
          value={form.location}
          onChange={(e) => handleChange('location', e.target.value)}
          placeholder="Location enter చేయి"
          className={`w-full px-4 py-2.5 rounded-lg border
                      text-sm outline-none transition-colors
                      ${errors.location
                        ? 'border-red-400 bg-red-50'
                        : 'border-slate-200 focus:border-indigo-400'
                      }`}
        />
        {errors.location && (
          <p className="text-red-500 text-xs mt-1">{errors.location}</p>
        )}
      </div>

      {/* TYPE */}
      <div className="mb-4">
        <label className="block text-xs font-semibold
                          text-slate-500 uppercase tracking-wider mb-2">
          Type
        </label>
        <select
          value={form.type}
          onChange={(e) => handleChange('type', e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border
                     border-slate-200 text-sm outline-none
                     focus:border-indigo-400 transition-colors"
        >
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa</option>
          <option value="Plot">Plot</option>
          <option value="Commercial">Commercial</option>
        </select>
      </div>

      {/* STATUS */}
      <div className="mb-6">
        <label className="block text-xs font-semibold
                          text-slate-500 uppercase tracking-wider mb-2">
          Status
        </label>
        <select
          value={form.status}
          onChange={(e) => handleChange('status', e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border
                     border-slate-200 text-sm outline-none
                     focus:border-indigo-400 transition-colors"
        >
          <option value="Available">Available</option>
          <option value="Sold">Sold</option>
        </select>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-2.5 rounded-lg border
                     border-slate-200 text-slate-600
                     text-sm font-semibold
                     hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="flex-1 px-4 py-2.5 rounded-lg
                     bg-amber-500 text-white
                     text-sm font-semibold
                     hover:bg-amber-600 transition-colors"
        >
          {initialData ? 'Update చేయి' : 'Save చేయి'}
        </button>
      </div>

    </div>
  )
}

export default PropertyForm 