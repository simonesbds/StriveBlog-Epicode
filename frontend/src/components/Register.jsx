
import { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({ nome: "", cognome: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3001/authors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    if (res.ok) {
      alert("Registrazione completata, ora effettua il login");
      window.location.href = "/login";
    } else {
      alert("Errore registrazione");
    }
  };

  return (
    <div>
      <h2>Registrati</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" onChange={(e) => setFormData({ ...formData, nome: e.target.value })} />
        <input type="text" placeholder="Cognome" onChange={(e) => setFormData({ ...formData, cognome: e.target.value })} />
        <input type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        <button type="submit">Registrati</button>
      </form>
    </div>
  );
}
