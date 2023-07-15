import { createSlice } from "@reduxjs/toolkit";

const SaveResult = createSlice(
    {
        name:"result",
        initialState:{
            isFound:{
                
            }
        },
        reducers:{
            saveResult:(state,action)=>{
             state.isFound=action.payload
            }
        }
    }
)

export const {saveResult} = SaveResult.actions;
export default SaveResult.reducer