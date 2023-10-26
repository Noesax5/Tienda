import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Inicio.css"; // Archivo CSS personalizado para estilos
import { Link } from "react-router-dom";

export default function Inicio() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [cantidad, setCantidad] = useState(1);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const eliminarDelCarrito = (producto) => {
    const nuevoCarrito = carrito.filter((item) => item.codigo !== producto.codigo);
    setCarrito(nuevoCarrito);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8081/productos")
      .then((response) => {
        setProductos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los productos:", error);
      });
  }, []);

  const toggleCarrito = () => {
    setCarritoAbierto(!carritoAbierto);
  };

  const agregarAlCarrito = (producto) => {
    const productoEnCarrito = carrito.find((item) => item.codigo === producto.codigo);

    if (productoEnCarrito) {
      const nuevoCarrito = carrito.map((item) =>
        item.codigo === producto.codigo ? { ...item, cantidad: item.cantidad + 1 } : item
      );
      setCarrito(nuevoCarrito);
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const mostrarDescripcionProducto = (producto) => {
    setProductoSeleccionado(producto);
  };

  const cerrarDescripcionProducto = () => {
    setProductoSeleccionado(null);
  };

  return (
    <div className="container" style={{ paddingTop: "20px" }}>
      <h1 className="text-center title">SCRIPT MARKET</h1>
      <div className="row">
        <div className="col-md-8">
          {productos.map((producto) => (
            <div key={producto.codigo} className="col-md-6 mb-4">
              <div className="producto-mosaico">
                <img src={producto.imagen} alt={producto.nombre} className="producto-imagen" />
                <h3 className="producto-nombre">{producto.nombre}</h3>
                <p className="producto-precio price">Precio: ${producto.precio}</p>
                <p className="producto-stock stock">Stock: {producto.stock}</p>
                <div className="quantity-control">
                  <button className="quantity-button" onClick={() => setCantidad(Math.max(1, cantidad - 1))}>-</button>
                  <span className="quantity-display">{cantidad}</span>
                  <button className="quantity-button" onClick={() => setCantidad(Math.min(producto.stock, cantidad + 1))}>+</button>
                </div>
                <button className="btn btn-orange" onClick={() => agregarAlCarrito(producto)}>
                  Agregar
                </button>
                <button className="btn btn-black" onClick={() => mostrarDescripcionProducto(producto)}>
                  Información
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-4">
          <h2 className="cart-title">Carrito de Compras:</h2>
          <div className="carrito-dropdown">
            <Link to={{
              pathname: "/Compra",
              state: { carrito } 
            }} style={{ display: "block", marginTop: "10px" }}>
              <button className="btn btn-green">Comprar</button>
            </Link>
            <button className="btn btn-orange" onClick={toggleCarrito} style={{ width: "100%" }}>
              Desplegar Carrito
            </button>
            {carritoAbierto && (
              <div className="carrito-contenedor">
                <div className="carrito-contenido">
                  <h3 className="cart-title">Carrito de Compras</h3>
                  {carrito.map((producto) => (
                    <div key={producto.codigo} className="carrito-item">
                      <div className="carrito-info">
                        <p className="cart-product-name">{producto.nombre}</p>
                        <p className="price">Precio: ${producto.precio}</p>
                        <p className="cart-quantity">Cantidad: {producto.cantidad}</p>
                      </div>
                      <button className="btn btn-black" onClick={() => eliminarDelCarrito(producto)}>
                        Eliminar
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          {productoSeleccionado && (
            <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Descripción del Producto</h5>
                    <button type="button" className="close" onClick={cerrarDescripcionProducto}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <p className="cart-product-name">Nombre: {productoSeleccionado.nombre}</p>
                    <p className="price">Precio: ${productoSeleccionado.precio}</p>
                    <p className="cart-quantity">Stock: {productoSeleccionado.stock}</p>
                    <p className="product-description">Descripción: {productoSeleccionado.descripcion}</p>
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-black" type="button" onClick={cerrarDescripcionProducto}>
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="col-md-6">
        </div>
      </div>
    </div>
  );
}