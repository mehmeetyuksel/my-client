import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  isLoggedIn: boolean
  loading: boolean
  user: any
  accessToken: string
}

const initialState: AuthState = {
  isLoggedIn: false,
  loading: false,
  user: {} as any,
  accessToken: ''
}

export const authSlice = createSlice({
  name: 'contentManager',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.isLoggedIn = true
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
    },
  },
  extraReducers: {},
})

export const { setUser } = authSlice.actions

export default authSlice.reducer
