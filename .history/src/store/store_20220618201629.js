import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from './reducers';
import { setUser } from './actioncreator';

export default configureStore(combineReducers)