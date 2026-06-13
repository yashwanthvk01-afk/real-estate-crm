import { configureStore } from '@reduxjs/toolkit'
import clientReducer from './slices/clientSlice'
import propertyReducer from './slices/propertySlice'
// ↑ propertyReducer import చేస్తున్నాం

const store = configureStore({
  reducer: {
    clients: clientReducer,
    properties: propertyReducer,
    // ↑ properties add చేశాం
  }
})

export { store }