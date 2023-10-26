import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from 'react';
import Registro from "./Registro";
import Login from "./Login";
import Inicio from "./Inicio";
import Compra from "./Compra";

function App(){
  return (
    <div className="App">
      <BrowserRouter>
        <div className="App-container">          
          <div className="App-content">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/Registro" element={<Registro />} />
              <Route path="/Inicio" element={<Inicio />}/> 
              <Route path="/Compra" element={<Compra />}/>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;