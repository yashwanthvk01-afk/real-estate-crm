import { BrowserRouter, Routes, Route } from 'react-router-dom'
// ↑ BrowserRouter = Routing enable చేయడానికి
// ↑ Routes = అన్ని routes wrap చేయడానికి
// ↑ Route = ఒక్కో page కి ఒక్కో route define చేయడానికి

import Sidebar from './components/ui/Sidebar'
// ↑ అన్ని pages లో కనిపించే navigation

import Dashboard from './pages/Dashboard'
// ↑ Home page

import Clients from './pages/Clients'
// ↑ Clients list page

import Properties from './pages/Properties'
// ↑ Properties page (తర్వాత చేస్తాం)

function App() {
  return (
    <BrowserRouter>
      {/* ↑ Routing ఇక్కడ నుండి start అవుతుంది */}

      <div className="flex h-screen bg-gray-100">
        {/* ↑ flex = Sidebar + Main content పక్క పక్కన ఉండాలి
            h-screen = full screen height
            bg-gray-100 = light gray background */}

        <Sidebar />
        {/* ↑ Left side లో navigation */}

        <main className="flex-1 overflow-auto">
          {/* ↑ flex-1 = మిగతా space అంతా main కి
              overflow-auto = content ఎక్కువైతే scroll అవుతుంది */}

          <Routes>
            {/* ↑ అన్ని routes ఇక్కడ define చేస్తున్నాం */}

            <Route path="/" element={<Dashboard />} />
            {/* ↑ localhost:3000/ → Dashboard చూపిస్తుంది */}

            <Route path="/clients" element={<Clients />} />
            {/* ↑ localhost:3000/clients → Clients చూపిస్తుంది */}

            <Route path="/properties" element={<Properties />} />
            {/* ↑ localhost:3000/properties → Properties చూపిస్తుంది */}

          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
// ↑ main.jsx లో import చేసుకోవడానికి