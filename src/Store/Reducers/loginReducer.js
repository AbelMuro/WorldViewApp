import { createAction, createReducer } from '@reduxjs/toolkit'

const updateLogin = createAction('UPDATE_LOGIN')
const initialState = {isLoggedIn: false};

const loginReducer = createReducer(initialState, (builder) => {       
  builder
    .addCase(updateLogin, (state, action) => {                           
      state.isLoggedIn = action.isLoggedIn;
    })
})

export default loginReducer;
