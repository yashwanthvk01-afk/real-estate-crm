import { useDispatch } from 'react-redux'
// ↑ Redux actions dispatch చేయడానికి

import { removeClient } from '../../store/slices/clientSlice'
// ↑ Local గా delete చేయడానికి

function ClientTable({ clients, onEdit }) {

  const dispatch = useDispatch()

  const handleDelete = async (id) => {
  if (window.confirm('Delete చేయాలా?')) {
    await dispatch(removeClient(id))
    // ↑ Spring Boot DELETE /api/clients/{id} call అవుతుంది
  }
}


  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">

      <table className="w-full">

        {/* TABLE HEADER */}
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="text-left px-6 py-4 text-xs font-semibold
                           text-slate-500 uppercase tracking-wider">
              Client
            </th>
            <th className="text-left px-6 py-4 text-xs font-semibold
                           text-slate-500 uppercase tracking-wider">
              Phone
            </th>
            <th className="text-left px-6 py-4 text-xs font-semibold
                           text-slate-500 uppercase tracking-wider">
              Email
            </th>
            <th className="text-left px-6 py-4 text-xs font-semibold
                           text-slate-500 uppercase tracking-wider">
              Address
            </th>
            <th className="text-left px-6 py-4 text-xs font-semibold
                           text-slate-500 uppercase tracking-wider">
              Status
            </th>
            <th className="text-left px-6 py-4 text-xs font-semibold
                           text-slate-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>

        {/* TABLE BODY */}
        <tbody>
          {clients.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-12 text-slate-400">
                ఇంకా clients లేరు — Add చేయి!
              </td>
            </tr>
          ) : (
            clients.map((client) => (
              <tr
                key={client.id}
                className="border-b border-slate-100
                           hover:bg-slate-50 transition-colors"
              >
                {/* NAME + AVATAR */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full
                                    bg-indigo-100 text-indigo-600
                                    flex items-center justify-center
                                    font-bold text-sm flex-shrink-0">
                      {client.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700">
                        {client.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        Added: {client.createdAt}
                      </p>
                    </div>
                  </div>
                </td>

                {/* PHONE */}
                <td className="px-6 py-4 text-sm text-slate-600">
                  {client.phone}
                </td>

                {/* EMAIL */}
                <td className="px-6 py-4 text-sm text-slate-600">
                  {client.email}
                </td>

                {/* ADDRESS */}
                <td className="px-6 py-4 text-sm text-slate-600">
                  {client.address}
                </td>

                {/* STATUS */}
                <td className="px-6 py-4">
                  <span className={`text-xs font-semibold
                                   px-3 py-1 rounded-full
                    ${client.status === 'Active'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700'
                    }`}>
                    {client.status}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">

                    {/* EDIT */}
                    <button
                      onClick={() => onEdit(client)}
                      className="px-3 py-1.5 text-xs font-semibold
                                 text-indigo-600 bg-indigo-50
                                 rounded-lg hover:bg-indigo-100
                                 transition-colors"
                    >
                      ✏️ Edit
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() => handleDelete(client.id)}
                      // ↑ client.id పంపుతున్నాం
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
          {clients.length} clients చూపిస్తున్నాం
        </p>
      </div>

    </div>
  )
}

export default ClientTable