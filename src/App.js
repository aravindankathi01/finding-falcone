import "./App.css";
import React from "react";
// import Body from "./Components/Body"
import Header from "./Components/Header"
import Footer from "./Components/Footer" 
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./utils/store";
import { SnackbarProvider } from 'notistack';
function App() {
  return (
    <div className="bg-gradient-to-r from-slate-200 to-slate-700">
    <SnackbarProvider
     maxSnack={1}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          preventDuplicate>
    <Provider store = {store}>
      <Header/>
      <Outlet/>
      <Footer/>
    </Provider>
    </SnackbarProvider>
    </div>
  );
}


export default App;
