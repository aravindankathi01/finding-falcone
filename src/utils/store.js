import { configureStore } from "@reduxjs/toolkit";
import SaveResult from "./SaveResult";

const store=configureStore(
    {
         reducer:{
            result:SaveResult
         }
    }
)
export default store