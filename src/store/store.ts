import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import cartData from "./slices/cart/reducer";
import favoriteData from "./slices/favorite/reducer";

const cartPersistConfig = {
  key: "cart",
  storage: AsyncStorage,
};

const favoritePersistConfig = {
  key: "favorite",
  storage: AsyncStorage,
};

// const persistedReducer =

// export const persistStore = createStore(persistedReducer)
// export const persistor = persistStore(store)

const rootReducers = combineReducers({
  cart: persistReducer(cartPersistConfig, cartData),
  favorite: persistReducer(favoritePersistConfig, favoriteData),
});

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
