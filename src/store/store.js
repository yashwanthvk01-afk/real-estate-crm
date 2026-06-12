import { configureStore } from '@reduxjs/toolkit'
// ↑ Redux store create చేయడానికి function

import clientReducer from './slices/clientSlice'
// ↑ మన client slice import చేస్తున్నాం
// తర్వాత properties, auth slices కూడా ఇలాగే add చేస్తాం

const store = configureStore({
  // ↑ మన app యొక్క global store create చేస్తున్నాం

  reducer: {
    // ↑ store లో ఏమేమి data ఉంటుందో చెప్తున్నాం

    clients: clientReducer,
    // ↑ store.clients = client data అన్నీ ఇక్కడ ఉంటాయి
    // తర్వాత ఇలా add చేస్తాం:
    // properties: propertyReducer
    // auth: authReducer
  }
})

export { store }
// ↑ main.jsx లో import చేసుకోవడానికి export చేస్తున్నాం