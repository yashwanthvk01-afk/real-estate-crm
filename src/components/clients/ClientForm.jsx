import { useState } from 'react'
// ↑ Form data store చేయడానికి

function ClientForm({ initialData, onSubmit, onCancel }) {
  // ↑ initialData = Edit చేసేటప్పుడు existing data వస్తుంది
  //                 Add చేసేటప్పుడు null వస్తుంది
  // ↑ onSubmit = Save నొక్కినప్పుడు Clients.jsx లో function call అవుతుంది
  // ↑ onCancel = Cancel నొక్కినప్పుడు modal close అవుతుంది

  const [form, setForm] = useState(
    initialData || {
      // ↑ Edit అయితే existing data వాడు
      //   Add అయితే empty fields వాడు
      name: '',
      phone: '',
      email: '',
      address: '',
      status: 'Active'
    }
  )

  const [errors, setErrors] = useState({})
  // ↑ Validation errors store చేయడానికి
  // Example: { name: 'పేరు అవసరం', phone: 'Valid phone కావాలి' }

  const validate = () => {
    // ↑ Form submit చేయడానికి ముందు validation చేస్తుంది
    const newErrors = {}

    if (!form.name.trim()) {
      // ↑ trim() = spaces తీసేస్తుంది
      //   "   " అని పెట్టినా empty గా consider చేస్తుంది
      newErrors.name = 'పేరు అవసరం'
    }

    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone)) {
      // ↑ /^\d{10}$/ = exactly 10 digits ఉండాలి
      //   \d = digit (0-9)
      //   {10} = exactly 10 times
      newErrors.phone = 'Valid 10-digit phone కావాలి'
    }

    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
      // ↑ /\S+@\S+\.\S+/ = basic email format check
      //   example@domain.com
      newErrors.email = 'Valid email కావాలి'
    }

    if (!form.address.trim()) {
      newErrors.address = 'Address అవసరం'
    }

    return newErrors
    // ↑ errors object return చేస్తుంది
    //   empty అయితే = validation passed ✅
  }

  const handleSubmit = () => {
    const newErrors = validate()
    // ↑ Validation run చేస్తుంది

    if (Object.keys(newErrors).length > 0) {
      // ↑ Errors ఉంటే
      setErrors(newErrors)
      // ↑ Errors చూపిస్తుంది
      return
      // ↑ Submit చేయదు
    }

    onSubmit(form)
    // ↑ Validation passed అయితే
    //   Clients.jsx కి form data పంపుతుంది
  }

  const handleChange = (field, value) => {
    // ↑ field = 'name' లేదా 'phone' లేదా 'email'...
    // ↑ value = user type చేసిన value
    setForm({ ...form, [field]: value })
    // ↑ ...form = existing data అన్నీ ఉంచు
    //   [field]: value = ఆ field మాత్రమే update చేయి

    if (errors[field]) {
      setErrors({ ...errors, [field]: '' })
      // ↑ User type చేస్తే ఆ field error తీసేయి
    }
  }

  return (
    <div>

      {/* NAME FIELD */}
      <div className="mb-4">
        <label className="block text-xs font-semibold
                          text-slate-500 uppercase
                          tracking-wider mb-2">
          పేరు
        </label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
          // ↑ e.target.value = user type చేసిన value
          placeholder="Client పేరు రాయి"
          className={`w-full px-4 py-2.5 rounded-lg border
                      text-sm outline-none transition-colors
                      ${errors.name
                        ? 'border-red-400 bg-red-50'
                        // ↑ Error ఉంటే red border
                        : 'border-slate-200 focus:border-indigo-400'
                        // ↑ Normal = gray, Focus = blue
                      }`}
        />
        {errors.name && (
          // ↑ Error ఉంటే మాత్రమే చూపిస్తుంది
          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
        )}
      </div>

      {/* PHONE FIELD */}
      <div className="mb-4">
        <label className="block text-xs font-semibold
                          text-slate-500 uppercase
                          tracking-wider mb-2">
          Phone
        </label>
        <input
          type="text"
          value={form.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="10-digit phone number"
          className={`w-full px-4 py-2.5 rounded-lg border
                      text-sm outline-none transition-colors
                      ${errors.phone
                        ? 'border-red-400 bg-red-50'
                        : 'border-slate-200 focus:border-indigo-400'
                      }`}
        />
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
        )}
      </div>

      {/* EMAIL FIELD */}
      <div className="mb-4">
        <label className="block text-xs font-semibold
                          text-slate-500 uppercase
                          tracking-wider mb-2">
          Email
        </label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="email@example.com"
          className={`w-full px-4 py-2.5 rounded-lg border
                      text-sm outline-none transition-colors
                      ${errors.email
                        ? 'border-red-400 bg-red-50'
                        : 'border-slate-200 focus:border-indigo-400'
                      }`}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      {/* ADDRESS FIELD */}
      <div className="mb-4">
        <label className="block text-xs font-semibold
                          text-slate-500 uppercase
                          tracking-wider mb-2">
          Address
        </label>
        <input
          type="text"
          value={form.address}
          onChange={(e) => handleChange('address', e.target.value)}
          placeholder="City, State"
          className={`w-full px-4 py-2.5 rounded-lg border
                      text-sm outline-none transition-colors
                      ${errors.address
                        ? 'border-red-400 bg-red-50'
                        : 'border-slate-200 focus:border-indigo-400'
                      }`}
        />
        {errors.address && (
          <p className="text-red-500 text-xs mt-1">{errors.address}</p>
        )}
      </div>

      {/* STATUS FIELD */}
      <div className="mb-6">
        <label className="block text-xs font-semibold
                          text-slate-500 uppercase
                          tracking-wider mb-2">
          Status
        </label>
        <select
          value={form.status}
          onChange={(e) => handleChange('status', e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border
                     border-slate-200 text-sm outline-none
                     focus:border-indigo-400 transition-colors"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-3">

        {/* CANCEL */}
        <button
          onClick={onCancel}
          // ↑ Cancel నొక్కితే modal close అవుతుంది
          className="flex-1 px-4 py-2.5 rounded-lg border
                     border-slate-200 text-slate-600
                     text-sm font-semibold
                     hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>

        {/* SAVE */}
        <button
          onClick={handleSubmit}
          // ↑ Save నొక్కితే validation + submit చేస్తుంది
          className="flex-1 px-4 py-2.5 rounded-lg
                     bg-amber-500 text-white
                     text-sm font-semibold
                     hover:bg-amber-600 transition-colors"
        >
          {initialData ? 'Update చేయి' : 'Save చేయి'}
          {/* ↑ Edit అయితే "Update చేయి"
              Add అయితే "Save చేయి" */}
        </button>

      </div>

    </div>
  )
}

export default ClientForm