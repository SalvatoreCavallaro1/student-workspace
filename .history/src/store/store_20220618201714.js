import { configureStore } from '@reduxjs/toolkit'
import { combinedReducers } from './reducer';
import { setUser } from './actioncreator';

export default configureStore(combinedReducers)