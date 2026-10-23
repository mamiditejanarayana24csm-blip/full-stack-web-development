import { useEffect, useState } from "react";

const API = "http://localhost:5000/api/todos";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const load = async () => setTodos(await (await fetch(API)).json());

  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!title.trim()) return;
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    setTitle("");
    load();
  };

  const remove = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div style={{ maxWidth: 420, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>MERN Todo</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New todo" />
      <button onClick={add}>Add</button>
      <ul>
        {todos.map((t) => (
          <li key={t._id}>
            {t.title} <button onClick={() => remove(t._id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
