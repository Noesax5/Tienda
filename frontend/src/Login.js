import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Login.css'; // Archivo CSS personalizado

export default function Login() {
  const [dni, setDNI] = useState("");
  const [correo, setCorreo] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8081/login", {
        dni,
        correo,
      });

      navigate("/inicio");
    } catch (err) {
      setError("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
    }
  };

  const redirectToRegistro = () => {
    navigate("/registro");
  };

  return (
    <div className="container supermarket-login">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mt-4"><strong>BIENVENIDOS!</strong></h2>
          <h2 className="mt-4">Iniciar Sesión</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="dni">DNI:</label>
              <input
                type="text"
                className="form-control"
                id="dni"
                value={dni}
                onChange={(e) => setDNI(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="correo">Correo Electrónico:</label>
              <input
                type="email"
                className="form-control"
                id="correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3">Iniciar Sesión</button>
            <button type="button" className="btn btn-primary ml-6 mt-3" onClick={redirectToRegistro}>Crear cuenta</button>
            {error && <p className="text-danger mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
