import { StrictMode } from 'react'
// ↑ React development mode - extra warnings చూపిస్తుంది
// bugs early గా catch చేయడానికి

import { createRoot } from 'react-dom/client'
// ↑ React app ని HTML లో inject చేయడానికి

import { Provider } from 'react-redux'
// ↑ Redux store ని అన్ని components కి
//   అందుబాటులో ఉంచడానికి

import { store } from './store/store.js'
// ↑ మన Redux store import చేస్తున్నాం

import './index.css'
// ↑ Tailwind CSS load అవుతుంది

import App from './App.jsx'
// ↑ మన main App component

createRoot(document.getElementById('root'))
// ↑ index.html లో <div id="root"> కి
//   React app attach చేస్తున్నాం
.render(
  <StrictMode>
    {/* ↑ Development warnings కోసం */}
    <Provider store={store}>
      {/* ↑ Redux store అన్ని components కి
            available అవుతుంది */}
      <App />
      {/* ↑ మన entire app ఇక్కడ render అవుతుంది */}
    </Provider>
  </StrictMode>
)