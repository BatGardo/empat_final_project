import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { tokenStorage } from '../../token/tokenStorage';

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: tokenStorage.get(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      tokenStorage.set(action.payload);
    },
    clearToken(state) {
      state.token = null;
      tokenStorage.remove();
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
