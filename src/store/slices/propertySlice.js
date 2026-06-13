import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllProperties, createProperty, updateProperty, deleteProperty } from '../../services/propertyService'

// ASYNC THUNKS
export const fetchProperties = createAsyncThunk(
  'properties/fetchAll',
  async () => {
    const response = await getAllProperties()
    return response.data.data
  }
)

export const addProperty = createAsyncThunk(
  'properties/add',
  async (propertyData) => {
    const response = await createProperty(propertyData)
    return response.data.data
  }
)

export const editProperty = createAsyncThunk(
  'properties/edit',
  async ({ id, data }) => {
    const response = await updateProperty(id, data)
    return response.data.data
  }
)

export const removeProperty = createAsyncThunk(
  'properties/remove',
  async (id) => {
    await deleteProperty(id)
    return id
  }
)

// SLICE
const propertySlice = createSlice({
  name: 'properties',

  initialState: {
    list: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchProperties.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchProperties.fulfilled, (state, action) => {
      state.loading = false
      state.list = action.payload
    })
    builder.addCase(fetchProperties.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })

    builder.addCase(addProperty.fulfilled, (state, action) => {
      state.list.push(action.payload)
    })

    builder.addCase(editProperty.fulfilled, (state, action) => {
      const index = state.list.findIndex(p => p.id === action.payload.id)
      if (index !== -1) {
        state.list[index] = action.payload
      }
    })

    builder.addCase(removeProperty.fulfilled, (state, action) => {
      state.list = state.list.filter(p => p.id !== action.payload)
    })
  }
})

export default propertySlice.reducer