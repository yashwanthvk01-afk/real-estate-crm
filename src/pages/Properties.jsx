import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProperties, addProperty, editProperty } from '../store/slices/propertySlice'
import PropertyTable from '../components/properties/PropertyTable'
import PropertyModal from '../components/properties/PropertyModal'

function Properties() {

  const dispatch = useDispatch()
  const { list, loading, error } = useSelector(state => state.properties)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProperty, setEditingProperty] = useState(null)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    dispatch(fetchProperties())
  }, [])

  const handleAddClick = () => {
    setEditingProperty(null)
    setIsModalOpen(true)
  }

  const handleEditClick = (property) => {
    setEditingProperty(property)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setEditingProperty(null)
  }

  const handleSubmit = async (formData) => {
    if (editingProperty) {
      await dispatch(editProperty({ id: editingProperty.id, data: formData }))
    } else {
      await dispatch(addProperty(formData))
    }
    await dispatch(fetchProperties())
    handleModalClose()
  }

  const filteredProperties = list.filter(p => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase())

    const matchFilter =
      filter === 'All' ||
      p.status === filter ||
      p.type === filter

    return matchSearch && matchFilter
  })

  return (
    <div className="p-8">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Properties
          </h1>
          <p className="text-slate-500 mt-1">
            మన properties అన్నీ ఇక్కడ ఉంటాయి
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
          ➕ Property Add చేయి
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
            placeholder="Title, location తో search చేయి..."
            className="w-full pl-9 pr-4 py-2.5 rounded-lg
                       border border-slate-200 text-sm
                       outline-none focus:border-indigo-400
                       transition-colors bg-white"
          />
        </div>

        {['All', 'Available', 'Sold', 'Apartment', 'Villa', 'Plot'].map(f => (
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

      {/* PROPERTY TABLE */}
      {!loading && (
        <PropertyTable
          properties={filteredProperties}
          onEdit={handleEditClick}
        />
      )}

      {/* MODAL */}
      <PropertyModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleSubmit}
        initialData={editingProperty}
      />

    </div>
  )
}

export default Properties