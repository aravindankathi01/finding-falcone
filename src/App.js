import "./App.css";
import React from "react";
// import Body from "./Components/Body"
import Header from "./Components/Header"
import Footer from "./Components/Footer" 
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./utils/store";
function App() {
  return (
    
    <Provider store = {store}>
      <Header/>
      <Outlet/>
      <Footer/>
    </Provider>
    
  );
}


export default App;
