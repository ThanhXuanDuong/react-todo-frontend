import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Root from "./Root";
import TodoPage from "./TodoPage";

function App() {

console.log(App);
  return (
      <BrowserRouter>
          <Routes>
              <Route path={"/"} element={<Root/>}/>
              <Route path={"todo/:id"} element={<TodoPage/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
