import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;

function App() {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  async function load() {
    try {
      const res = await fetch(`${API}/customers`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setCustomers(await res.json());
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }

  async function create(e) {
    e.preventDefault();
    const res = await fetch(`${API}/customers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(`HTTP ${res.status}: ${body.error ?? "okänt fel"}`);
      return;
    }
    setName("");
    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <main style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>Kunder</h1>
      {error && <p style={{ color: "crimson" }}>Fel: {error}</p>}
      <form onSubmit={create}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Namn"
        />
        <button type="submit">Skapa</button>
      </form>
      <ul>
        {customers.map((c) => (
          <li key={c.id}>
            {c.name} <small>{c.id.slice(0, 8)}</small>
          </li>
        ))}
      </ul>
      <p>Molnutveckling med AWS, vecka 42. API: {API}</p>
    </main>
  );
}

export default App;