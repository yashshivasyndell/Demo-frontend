import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isAdmin:false,
  loading: false,
  error: null,
  user: null,
};

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase("USER_LOGIN_REQ"),(state,action) => {
    state.user = null;
    state.isAuthenticated = null
    state.isAdmin = false;
    state.loading = true
  }
  builder.addCase("USER_LOGIN_SUCCESS"),(state,action) => {
    state.user = action.payload.user;
    state.isAuthenticated = null
    state.isAdmin = true;
    state.loading = false
  }
  builder.addCase("USER_LOGIN_FAIL"),(state,action) => {
    state.user = null;
    state.isAuthenticated = false
    state.isAdmin = false;
    state.loading = true;
    state.error = action.payload
  }
  builder.addCase("LOAD_REQ", (state, action) => {
    state.user = null;
    state.isAuthenticated = false;
    state.loading = true;
  });
  builder.addCase("LOAD_SUCCESS", (state, action) => {
    state.loading = false
    state.user = action.payload.userData;
    state.isAuthenticated = true;
  });
  builder.addCase("LOAD_FAIL", (state, action) => {
    state.user = null;
    state.isAuthenticated = false;
    state.loading = false;
  });

  builder.addCase("LOGIN_REQUEST", (state, action) => {
    state.loading = true;
    state.user = null;
    state.isAuthenticated = false;
  });

  builder.addCase("LOGIN_SUCCESS", (state, action) => {
    state.loading = false;
    state.user = action.payload.user;
    state.isAuthenticated = true;
  });

  builder.addCase("LOGIN_FAIL", (state, action) => {
    state.loading = false;
    state.user = null;
    state.isAuthenticated = false;
    state.error = action.payload;
  });
  builder.addCase("LOGOUT", (state) => {
    state.user = null;
    state.isAuthenticated = false;
    state.loading = false;
    state.error = null;
  });

});

export default userReducer;
