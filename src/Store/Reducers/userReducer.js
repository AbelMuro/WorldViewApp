import {createReducer, createAction} from '@reduxjs/toolkit';

const updateUser = createAction('UPDATE_USER')
const initialState = {user: null};

const userReducer = createReducer(initialState, (builder) => {       
  builder
    .addCase(updateUser, (state, action) => {                           
      state.user = action.user;
    })
})

export default userReducer;