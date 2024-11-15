import { configureStore } from "@reduxjs/toolkit";
import institutesSlice from "../slices/institutesSlice";
//import productosSlice from "../slices/usuarios/productosSlice";
const store = configureStore({
    reducer: {
      institutesReducer: institutesSlice,
      //productosSliceReducer: productosSlice,
    },
  });
  
  export default store;