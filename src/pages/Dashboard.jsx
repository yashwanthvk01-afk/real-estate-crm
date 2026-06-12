import { useSelector } from 'react-redux'
// ↑ Redux store నుండి data తీసుకోవడానికి

function Dashboard() {

  const clients = useSelector((state) => state.clients.list)
  // ↑ Redux store లో clients.list నుండి data తీసుకుంటున్నాం
  //   clients add/delete అయినప్పుడు
  //   ఈ number automatically update అవుతుంది

  const activeClients = clients.filter(c => c.status === 'Active')
  // ↑ Active clients మాత్రమే filter చేస్తున్నాం

  const inactiveClients = clients.filter(c => c.status === 'Inactive')
  // ↑ Inactive clients మాత్రమే filter చేస్తున్నాం

  return (
    <div className="p-8">
      {/* ↑ p-8 = padding అన్ని sides కి */}

      {/* HEADER */}
      <div className="mb-8">
        {/* ↑ mb-8 = margin bottom */}
        <h1 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h1>
        <p className="text-slate-500 mt-1">
          EstateFlow CRM Overview
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* ↑ grid = cards side by side
            grid-cols-3 = 3 columns
            gap-6 = space between cards */}

        {/* Total Clients Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm
                        border-l-4 border-indigo-500">
          {/* ↑ bg-white = white background
              rounded-xl = rounded corners
              shadow-sm = light shadow
              border-l-4 = left border thick
              border-indigo-500 = purple color */}
          <p className="text-3xl font-bold text-indigo-500">
            {clients.length}
            {/* ↑ Total clients count
                Redux store నుండి automatically వస్తుంది */}
          </p>
          <p className="text-slate-500 text-sm mt-1">
            Total Clients
          </p>
        </div>

        {/* Active Clients Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm
                        border-l-4 border-emerald-500">
          <p className="text-3xl font-bold text-emerald-500">
            {activeClients.length}
            {/* ↑ Active clients count */}
          </p>
          <p className="text-slate-500 text-sm mt-1">
            Active Clients
          </p>
        </div>

        {/* Inactive Clients Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm
                        border-l-4 border-amber-500">
          <p className="text-3xl font-bold text-amber-500">
            {inactiveClients.length}
            {/* ↑ Inactive clients count */}
          </p>
          <p className="text-slate-500 text-sm mt-1">
            Inactive Clients
          </p>
        </div>

      </div>

      {/* RECENT CLIENTS */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Recent Clients
        </h2>

        {clients.length === 0 ? (
          // ↑ clients లేకపోతే ఈ message చూపిస్తుంది
          <p className="text-slate-400 text-center py-8">
            ఇంకా clients లేరు — Clients page లో add చేయి!
          </p>
        ) : (
          clients.slice(0, 5).map((client) => (
            // ↑ slice(0, 5) = మొదటి 5 clients మాత్రమే చూపిస్తుంది
            <div
              key={client.id}
              // ↑ React కి ప్రతి item unique గా identify చేయడానికి
              className="flex items-center justify-between
                         py-3 border-b border-slate-100 last:border-0"
              // ↑ last:border-0 = చివరి item కి border లేదు
            >
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-9 h-9 rounded-full
                                bg-indigo-100 text-indigo-600
                                flex items-center justify-center
                                font-bold text-sm">
                  {client.name.charAt(0)}
                  {/* ↑ Client పేరు మొదటి అక్షరం చూపిస్తుంది
                      Example: "Ravi" → "R" */}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    {client.name}
                  </p>
                  <p className="text-xs text-slate-400">
                    {client.email}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <span className={`text-xs font-semibold px-3 py-1 rounded-full
                ${client.status === 'Active'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-amber-100 text-amber-700'
                }`}>
                {client.status}
              </span>

            </div>
          ))
        )}
      </div>

    </div>
  )
}

export default Dashboard