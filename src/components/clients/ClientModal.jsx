import ClientForm from './ClientForm'
// ↑ Modal లో ClientForm చూపిస్తుంది

function ClientModal({ isOpen, onClose, onSubmit, initialData }) {
  // ↑ isOpen = Modal చూపించాలా లేదా (true/false)
  // ↑ onClose = Modal close చేయడానికి
  // ↑ onSubmit = Form save చేసినప్పుడు
  // ↑ initialData = Edit అయితే existing data
  //                 Add అయితే null

  if (!isOpen) return null
  // ↑ isOpen = false అయితే
  //   Modal render చేయదు — screen లో కనిపించదు

  return (
    <div
      className="fixed inset-0 z-50
                 flex items-center justify-center"
      // ↑ fixed = screen మీద fixed గా ఉంటుంది
      //   inset-0 = అన్ని sides 0 (full screen)
      //   z-50 = అన్నిటి మీద కనిపిస్తుంది
      //   flex items-center justify-center = middle లో
    >

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50
                   backdrop-blur-sm"
        // ↑ bg-black bg-opacity-50 = dark transparent background
        //   backdrop-blur-sm = background blur అవుతుంది
        onClick={onClose}
        // ↑ Backdrop click చేస్తే modal close అవుతుంది
      />

      {/* MODAL BOX */}
      <div className="relative bg-white rounded-2xl
                      w-full max-w-md mx-4
                      shadow-2xl z-10">
        {/* ↑ relative = backdrop మీద కనిపించడానికి
            max-w-md = maximum width
            mx-4 = mobile లో sides కి space
            shadow-2xl = deep shadow
            z-10 = backdrop మీద కనిపిస్తుంది */}

        {/* MODAL HEADER */}
        <div className="flex items-center justify-between
                        p-6 border-b border-slate-200">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              {initialData ? 'Client Edit చేయి' : 'కొత్త Client Add చేయి'}
              {/* ↑ Edit అయితే "Client Edit చేయి"
                  Add అయితే "కొత్త Client Add చేయి" */}
            </h2>
            <p className="text-slate-400 text-xs mt-0.5">
              {initialData
                ? 'Details update చేయి'
                : 'కింద details fill చేయి'}
            </p>
          </div>

          {/* CLOSE BUTTON */}
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

        {/* MODAL BODY — ClientForm ఇక్కడ */}
        <div className="p-6">
          <ClientForm
            initialData={initialData}
            // ↑ Edit data form కి పంపుతున్నాం
            onSubmit={onSubmit}
            // ↑ Save చేసినప్పుడు Clients.jsx కి పంపుతున్నాం
            onCancel={onClose}
            // ↑ Cancel = Modal close అవుతుంది
          />
        </div>

      </div>
    </div>
  )
}

export default ClientModal