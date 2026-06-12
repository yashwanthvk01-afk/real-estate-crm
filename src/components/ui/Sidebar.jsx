import { NavLink } from 'react-router-dom'
// ↑ NavLink = Link లాంటిదే కానీ
//   active page కి automatically
//   different style apply చేస్తుంది

function Sidebar() {
  return (
    <aside className="w-56 h-screen bg-slate-900 flex flex-col">
      {/* ↑ w-56 = width 224px
          h-screen = full screen height
          bg-slate-900 = dark background
          flex flex-col = items vertical గా */}

      {/* LOGO */}
      <div className="p-6 border-b border-slate-700">
        {/* ↑ p-6 = padding
            border-b = bottom border
            border-slate-700 = border color */}

        <h1 className="text-white text-xl font-bold">
          {/* ↑ text-white = white color
              text-xl = font size
              font-bold = bold */}
          🏠 EstateFlow
        </h1>
        <p className="text-slate-400 text-xs mt-1">
          {/* ↑ text-slate-400 = gray color
              text-xs = small font
              mt-1 = margin top */}
          Real Estate CRM
        </p>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 p-4">
        {/* ↑ flex-1 = మిగతా space అంతా nav కి */}

        <p className="text-slate-500 text-xs font-semibold
                      uppercase tracking-wider mb-3">
          {/* ↑ uppercase = CAPITAL LETTERS
              tracking-wider = letter spacing
              mb-3 = margin bottom */}
          Menu
        </p>

        {/* DASHBOARD LINK */}
        <NavLink
          to="/"
          // ↑ ఈ link click చేస్తే / కి వెళ్తుంది
          end
          // ↑ exact match కోసం
          //   లేకపోతే అన్ని pages లో active అవుతుంది
          className={({ isActive }) =>
            // ↑ isActive = ఈ page లో ఉన్నావా లేదా
            `flex items-center gap-3 px-3 py-2.5
             rounded-lg text-sm font-medium mb-1
             transition-all duration-150
             ${isActive
               ? 'bg-amber-500 text-white'
               // ↑ active page = amber/orange color
               : 'text-slate-400 hover:text-white hover:bg-slate-800'
               // ↑ inactive = gray, hover చేస్తే white
             }`
          }
        >
          🏠 Dashboard
        </NavLink>

        {/* CLIENTS LINK */}
        <NavLink
          to="/clients"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5
             rounded-lg text-sm font-medium mb-1
             transition-all duration-150
             ${isActive
               ? 'bg-amber-500 text-white'
               : 'text-slate-400 hover:text-white hover:bg-slate-800'
             }`
          }
        >
          👥 Clients
        </NavLink>

        {/* PROPERTIES LINK */}
        <NavLink
          to="/properties"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5
             rounded-lg text-sm font-medium mb-1
             transition-all duration-150
             ${isActive
               ? 'bg-amber-500 text-white'
               : 'text-slate-400 hover:text-white hover:bg-slate-800'
             }`
          }
        >
          🏢 Properties
        </NavLink>

      </nav>

      {/* BOTTOM - User Info */}
      <div className="p-4 border-t border-slate-700">
        {/* ↑ border-t = top border */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-500
                          flex items-center justify-center
                          text-white text-sm font-bold">
            {/* ↑ w-8 h-8 = size
                rounded-full = circle
                bg-indigo-500 = purple background */}
            A
          </div>
          <div>
            <p className="text-white text-sm font-medium">Admin</p>
            <p className="text-slate-400 text-xs">Manager</p>
          </div>
        </div>
      </div>

    </aside>
  )
}

export default Sidebar