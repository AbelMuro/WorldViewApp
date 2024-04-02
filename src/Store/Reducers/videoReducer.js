import { createAction, createReducer } from '@reduxjs/toolkit'

const updateVideo = createAction('UPDATE_VIDEO')
const initialState = {video: {}};

const videoReducer = createReducer(initialState, (builder) => {       
  builder
    .addCase(updateVideo, (state, action) => {                           
      state.video = action.video;
    })
})

export default videoReducer;
