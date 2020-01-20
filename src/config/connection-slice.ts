import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ConnectionState {
  online: boolean
}

const initialState: ConnectionState = {
  online: false,
}

const connectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    changeOnline(state, { payload }: PayloadAction<boolean>) {
      state.online = payload
    },
  },
})

export const { changeOnline } = connectionSlice.actions

export default connectionSlice.reducer
