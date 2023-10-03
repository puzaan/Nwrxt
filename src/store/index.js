// third-party
import { configureStore } from '@reduxjs/toolkit';

// project import
// import reducers from './reducers';
import menu from './reducers/menu';
import { roomServiceApi } from './reducers/room';
import { houseServiceApi } from './reducers/house';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

export const store = configureStore({
  reducer: {
    menu,
    [roomServiceApi.reducerPath]: roomServiceApi.reducer,
    [houseServiceApi.reducerPath]: houseServiceApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([roomServiceApi.middleware, houseServiceApi.middleware])
});

// const { dispatch } = store;

// export { store, dispatch };
