import { SearchRequest } from '../features/search/searchSlice';
import { configureStore } from '@reduxjs/toolkit';
import React from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import initReducer from '../features/init/initSlice';
import searchReducer from '../features/search/searchSlice';
import { Search } from '@mui/icons-material';

export const store = configureStore({
    reducer: {
        initReducer: initReducer,
        searchReducer: searchReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


