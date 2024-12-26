import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isAdmin:false,
  role:null,
  loading: false,
  error: null,
  user: null,
};

const userReducer = createReducer(initialState, (builder) => {

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

  builder.addCase("LOGIN_REQUEST", (state) => {
    state.loading = true;
    state.user = null;
    state.isAuthenticated = false;
    state.role = null; 
  });

  builder.addCase("LOGIN_SUCCESS", (state, action) => {
    state.loading = false;
    state.user = action.payload.user;
    state.isAuthenticated = true;
    state.role = action.payload.user.role; // Set role from response
    state.isAdmin = action.payload.user.role === "admin"; // Derive admin status
  });

  builder.addCase("LOGIN_FAIL", (state, action) => {
    state.loading = false;
    state.user = null;
    state.isAuthenticated = false;
    state.role = null;
    state.error = action.payload;
  });

  builder.addCase("LOGOUT", (state) => {
    state.user = null;
    state.isAuthenticated = false;
    state.loading = false;
    state.error = null;
    state.role = null;
    state.isAdmin = false;
  });

});

export default userReducer;
