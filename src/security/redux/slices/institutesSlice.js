import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    //DATA
	institutesDataArr: [],
   
   //SELECCIONES
   //instituteDataObj: {},
    //BOOLEANS/VARIABLES
}
const institutesSlice = createSlice({
	name: 'INSTITUTES',
	initialState,
	reducers: {
		SET_DATA_INSTITUTES: (state, action) => { 			
                        console.log('<<REDUX-REDUCER>>:<<SET_DATA_INSTITUTES>>', action.payload);
			//state.institutesDataArr = action.payload.institutesDataArr;
			state.institutesDataArr = action.payload
		}
    }
}
);
export const {
	SET_DATA_INSTITUTES,
    //ADD_PRODUCT_SELECTED,
    //SWITCH_STATE,
} = institutesSlice.actions;
export default institutesSlice.reducer;