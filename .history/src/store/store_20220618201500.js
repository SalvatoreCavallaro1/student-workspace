import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from './store/reducer';
import { setUser } from './store/actioncreator';

export default configureStore(combineReducers)