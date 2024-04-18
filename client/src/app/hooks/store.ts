import { configureStore } from '@reduxjs/toolkit'
import loadingReducer from './features/loading.slice'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import popupReducer from './features/popup.slice';
import { userInfoApi } from './services/user_info.service';
import { setupListeners } from '@reduxjs/toolkit/query';



export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    popup: popupReducer,
    [userInfoApi.reducerPath]: userInfoApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userInfoApi.middleware)
})

setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;