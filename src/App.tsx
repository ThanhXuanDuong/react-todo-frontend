import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import TodoDetails from "./components/TodoDetails";

function App() {

console.log(App);
  return (
      <BrowserRouter>
          <Routes>
              <Route path={"/"} element={<Home/>}/>
              <Route path={"todo/:id"} element={<TodoDetails/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
