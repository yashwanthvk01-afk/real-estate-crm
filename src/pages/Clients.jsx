import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchClients, addClient, editClient } from '../store/slices/clientSlice'
import ClientTable from '../components/clients/ClientTable'
import ClientModal from '../components/clients/ClientModal'

function Clients() {

  const dispatch = useDispatch()

  const { list, loading, error } = useSelector(state => state.clients)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingClient, setEditingClient] = useState(null)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    dispatch(fetchClients())
  }, [])

  const handleAddClick = () => {
    setEditingClient(null)
    setIsModalOpen(true)
  }

  const handleEditClick = (client) => {
    setEditingClient(client)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setEditingClient(null)
  }

 const handleSubmit = async (formData) => {
  if (editingClient) {
    await dispatch(editClient({ id: editingClient.id, data: formData }))
  } else {
    await dispatch(addClient(formData))
  }
  await dispatch(fetchClients())
  // ↑ await add చేశాం!
  handleModalClose()
}

  const filteredClients = list.filter(c => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)

    const matchFilter =
      filter === 'All' ||
      c.status === filter

    return matchSearch && matchFilter
  })

  return (
    <div className="p-8">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Clients & Contacts
          </h1>
          <p className="text-slate-500 mt-1">
            మన clients అందరూ ఇక్కడ ఉంటారు
          </p>
        </div>

        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 px-4 py-2.5
                     bg-amber-500 text-white rounded-lg
                     text-sm font-semibold
                     hover:bg-amber-600 transition-colors
                     shadow-sm"
        >
          ➕ Client Add చేయి
        </button>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <span className="absolute left-3 top-1/2
                           -translate-y-1/2 text-slate-400">
            🔍
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="పేరు, phone, email తో search చేయి..."
            className="w-full pl-9 pr-4 py-2.5 rounded-lg
                       border border-slate-200 text-sm
                       outline-none focus:border-indigo-400
                       transition-colors bg-white"
          />
        </div>

        {['All', 'Active', 'Inactive'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2.5 rounded-lg text-sm
                        font-semibold border transition-colors
              ${filter === f
                ? 'bg-amber-500 text-white border-amber-500'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center py-12 text-slate-400">
          Loading... Spring Boot నుండి data వస్తుంది
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="bg-red-50 border border-red-200
                        rounded-lg p-4 mb-4 text-red-600 text-sm">
          ⚠️ Error: {error} — Spring Boot running గా ఉందా?
        </div>
      )}

      {/* CLIENT TABLE */}
      {!loading && (
        <ClientTable
          clients={filteredClients}
          onEdit={handleEditClick}
        />
      )}

      {/* MODAL */}
      <ClientModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleSubmit}
        initialData={editingClient}
      />

    </div>
  )
}

export default Clients