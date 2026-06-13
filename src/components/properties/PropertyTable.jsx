import { useDispatch } from 'react-redux'
import { removeProperty } from '../../store/slices/propertySlice'

function PropertyTable({ properties, onEdit }) {

  const dispatch = useDispatch()

  const handleDelete = async (id) => {
    if (window.confirm('Delete చేయాలా?')) {
      await dispatch(removeProperty(id))
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">

      <table className="w-full">

        {/* HEADER */}
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            {['Title', 'Price', 'Location', 'Type', 'Status', 'Actions'].map(h => (
              <th key={h} className="text-left px-6 py-4 text-xs
                                     font-semibold text-slate-500
                                     uppercase tracking-wider">
                {h}
              </th>
            ))}
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {properties.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-12 text-slate-400">
                ఇంకా properties లేవు — Add చేయి!
              </td>
            </tr>
          ) : (
            properties.map((property) => (
              <tr
                key={property.id}
                className="border-b border-slate-100
                           hover:bg-slate-50 transition-colors"
              >
                {/* TITLE */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full
                                    bg-amber-100 text-amber-600
                                    flex items-center justify-center
                                    font-bold text-sm flex-shrink-0">
                      🏠
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700">
                        {property.title}
                      </p>
                      <p className="text-xs text-slate-400">
                        Added: {property.createdAt}
                      </p>
                    </div>
                  </div>
                </td>

                {/* PRICE */}
                <td className="px-6 py-4 text-sm text-slate-600">
                  ₹{Number(property.price).toLocaleString()}
                </td>

                {/* LOCATION */}
                <td className="px-6 py-4 text-sm text-slate-600">
                  📍 {property.location}
                </td>

                {/* TYPE */}
                <td className="px-6 py-4">
                  <span className="text-xs font-semibold
                                   px-3 py-1 rounded-full
                                   bg-indigo-100 text-indigo-700">
                    {property.type}
                  </span>
                </td>

                {/* STATUS */}
                <td className="px-6 py-4">
                  <span className={`text-xs font-semibold
                                   px-3 py-1 rounded-full
                    ${property.status === 'Available'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-red-100 text-red-700'
                    }`}>
                    {property.status}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(property)}
                      className="px-3 py-1.5 text-xs font-semibold
                                 text-indigo-600 bg-indigo-50
                                 rounded-lg hover:bg-indigo-100
                                 transition-colors"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(property.id)}
                      className="px-3 py-1.5 text-xs font-semibold
                                 text-red-600 bg-red-50
                                 rounded-lg hover:bg-red-100
                                 transition-colors"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </td>

              </tr>
            ))
          )}
        </tbody>

      </table>

      {/* FOOTER */}
      <div className="px-6 py-3 bg-slate-50 border-t border-slate-200">
        <p className="text-xs text-slate-400">
          {properties.length} properties చూపిస్తున్నాం
        </p>
      </div>

    </div>
  )
}

export default PropertyTable