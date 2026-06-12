import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// ↑ createSlice = state + reducers create చేయడానికి
// ↑ createAsyncThunk = API calls చేయడానికి

import { getAllClients, createClient, updateClient, deleteClient } from '../../services/clientService'
// ↑ Spring Boot API calls చేసే functions

// ============================================
// ASYNC THUNKS — Spring Boot API Calls
// ============================================

export const fetchClients = createAsyncThunk(
  'clients/fetchAll',
  async () => {
    const response = await getAllClients()
    return response.data
  }
)

export const addClient = createAsyncThunk(
  'clients/add',
  async (clientData) => {
    const response = await createClient(clientData)
    return response.data.data
    // ↑ .data.data add చేశాం!
    //   response.data = ApiResponse
    //   response.data.data = actual client object
  }
)

export const editClient = createAsyncThunk(
  'clients/edit',
  async ({ id, data }) => {
    const response = await updateClient(id, data)
    return response.data.data
    // ↑ same fix
  }
)

export const removeClient = createAsyncThunk(
  'clients/remove',
  async (id) => {
    await deleteClient(id)
    return id
  }
)

// ============================================
// SLICE
// ============================================

const clientSlice = createSlice({
  name: 'clients',

initialState: {
    list: [],
    // ↑ dummy data తీసేశాం
    // Spring Boot నుండి real data వస్తుంది
    loading: false,
    error: null,
},

  reducers: {
    // ↑ Spring Boot లేకుండా locally పని చేయడానికి

    addClientLocal: (state, action) => {
      state.list.push({
        ...action.payload,
        // ↑ form data అన్నీ copy చేస్తుంది
        id: Date.now(),
        // ↑ unique id generate చేస్తుంది
        createdAt: new Date().toISOString().split('T')[0]
        // ↑ today's date add చేస్తుంది
      })
    },

    editClientLocal: (state, action) => {
      const index = state.list.findIndex(c => c.id === action.payload.id)
      // ↑ edit చేయాల్సిన client వెతుకుతుంది
      if (index !== -1) {
        state.list[index] = action.payload
        // ↑ పాత data తీసేసి కొత్త data పెడుతుంది
      }
    },

    removeClientLocal: (state, action) => {
      state.list = state.list.filter(c => c.id !== action.payload)
      // ↑ delete అయిన client తీసేస్తుంది
    }
  },

  extraReducers: (builder) => {
    // ↑ Spring Boot connect చేసినప్పుడు వాడతాం

    builder.addCase(fetchClients.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchClients.fulfilled, (state, action) => {
      state.loading = false
      state.list = action.payload.data
    })
    builder.addCase(fetchClients.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })

    builder.addCase(addClient.fulfilled, (state, action) => {
      state.list.push(action.payload)
    })

    builder.addCase(editClient.fulfilled, (state, action) => {
      const index = state.list.findIndex(c => c.id === action.payload.id)
      if (index !== -1) {
        state.list[index] = action.payload
      }
    })

    builder.addCase(removeClient.fulfilled, (state, action) => {
      state.list = state.list.filter(c => c.id !== action.payload)
    })
  }
})

// ↑ createSlice తర్వాత — actions export చేస్తున్నాం
export const { addClientLocal, editClientLocal, removeClientLocal } = clientSlice.actions

export default clientSlice.reducer
// ↑ store.js లో import చేసుకోవడానికి