function Properties() {
  return (
    <div className="p-8">
      {/* ↑ p-8 = padding అన్ని sides కి */}

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">
          Properties
        </h1>
        <p className="text-slate-500 mt-1">
          Properties module తర్వాత చేద్దాం!
        </p>
      </div>

      {/* Placeholder */}
      <div className="bg-white rounded-xl shadow-sm p-16
                      text-center">
        {/* ↑ text-center = text middle లో */}

        <p className="text-6xl mb-4">🏗️</p>
        {/* ↑ Construction emoji */}

        <h2 className="text-xl font-bold text-slate-700 mb-2">
          Coming Soon!
        </h2>

        <p className="text-slate-400">
          Clients module complete అయిన తర్వాత
          ఈ module build చేద్దాం!
        </p>
      </div>

    </div>
  )
}

export default Properties