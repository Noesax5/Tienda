import React, { useState } from "react";

export default function Compra() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [shippingOption, setShippingOption] = useState("standard");
  const [message, setMessage] = useState(null);

  const handlePayment = (e) => {
    e.preventDefault();

    if (!cardNumber || !expiryDate || !cvv || !billingAddress) {
      setMessage("Todos los campos son obligatorios");
    } else {
      // Aquí puedes agregar la lógica para procesar el pago y los datos de envío.
      console.log("Procesando el pago...");
      console.log("Dirección de Facturación:", billingAddress);
      console.log("Opción de Envío:", shippingOption);

      // Limpia los campos después de procesar el pago
      setCardNumber("");
      setExpiryDate("");
      setCvv("");
      setBillingAddress("");
      setMessage("Pago realizado con éxito");
    }
  };

  return (
    <div className="container">
      <h2>Detalles de Pago</h2>
      <form onSubmit={handlePayment}>
        <div className="form-group">
          <label>Número de Tarjeta:</label>
          <input
            type="text"
            className="form-control"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="1234 5678 9012 3456"
          />
        </div>
        <div className="form-group">
          <label>Fecha de Vencimiento:</label>
          <input
            type="text"
            className="form-control"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/YY"
          />
        </div>
        <div className="form-group">
          <label>Código de Seguridad (CVV):</label>
          <input
            type="text"
            className="form-control"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="123"
          />
        </div>
        <h3>Dirección de Facturación</h3>
        <div className="form-group">
          <textarea
            className="form-control"
            value={billingAddress}
            onChange={(e) => setBillingAddress(e.target.value)}
            placeholder="Ingrese su dirección de facturación"
          />
        </div>
        <h3>Opciones de Envío</h3>
        <div className="form-group">
          <select
            className="form-control"
            value={shippingOption}
            onChange={(e) => setShippingOption(e.target.value)}
          >
            <option value="standard">Envío Estándar (3-5 días)</option>
            <option value="express">Envío Express (1-2 días)</option>
          </select>
        </div>
        {message && <div className="error-message">{message}</div>}
        <button type="submit" className="btn btn-primary">
          Pagar
        </button>
      </form>
    </div>
  );
}
