import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;

function App() {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API}/customers`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setCustomers)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <main style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>Kunder</h1>
      {error && <p style={{ color: "crimson" }}>Fel: {error}</p>}
      <ul>
        {customers.map((c) => (
          <li key={c.id}>
            {c.id}. {c.name}
          </li>
        ))}
      </ul>
      <p>Molnutveckling med AWS, vecka 41. API: {API}</p>
    </main>
  );
}

export default App;