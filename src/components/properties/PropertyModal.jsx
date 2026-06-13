import PropertyForm from './PropertyForm'

function PropertyModal({ isOpen, onClose, onSubmit, initialData }) {

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50
                    flex items-center justify-center">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50
                   backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL BOX */}
      <div className="relative bg-white rounded-2xl
                      w-full max-w-md mx-4
                      shadow-2xl z-10">

        {/* HEADER */}
        <div className="flex items-center justify-between
                        p-6 border-b border-slate-200">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              {initialData ? 'Property Edit చేయి' : 'కొత్త Property Add చేయి'}
            </h2>
            <p className="text-slate-400 text-xs mt-0.5">
              {initialData ? 'Details update చేయి' : 'కింద details fill చేయి'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-100
                       flex items-center justify-center
                       text-slate-500 hover:bg-slate-200
                       transition-colors text-lg"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="p-6">
          <PropertyForm
            initialData={initialData}
            onSubmit={onSubmit}
            onCancel={onClose}
          />
        </div>

      </div>
    </div>
  )
}

export default PropertyModal