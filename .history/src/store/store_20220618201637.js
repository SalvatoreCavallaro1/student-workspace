import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from './reducer';
import { setUser } from './actioncreator';

export default configureStore(combineReducers)