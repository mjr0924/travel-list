import { use, useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Charger", quantity: 5, packed: true },
// ];

function App() {
  const [items , setItems] = useState([]);
  function handleAddItems(item) {
    setItems((items) => [...items,item]);
  }
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id)); 
  }
  return (
    <>
      <div className="app">
        <Logo />
        <Form onAddItems={handleAddItems} />
        <PackingList items={items} onDeleteItem = {handleDeleteItem} />
        <Stats />
      </div>
    </>
  );
}



function Form({onAddItems}) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  
  function handleSubmit(e) {
    e.preventDefault();
    if(!description) return;
    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };
    // console.log(newItem);
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }
  function handleChange(e) {
    setDescription(e.target.value);
  }
  return (
    <>
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>What do you need for your 😍 trip?</h3>
        <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Item..."
          value={description}
          onChange={handleChange}
        />
        <button>add</button>
      </form>
    </>
  );
}

function PackingList({items , onDeleteItem}) {
  return (
    <>
      <div className="list">
        <ul>
          {items.map((item) => (
            <Item item={item} key={item.id} onDeleteItem={onDeleteItem} />
          ))}
        </ul>
      </div>
    </>
  );
}

function Item({ item , onDeleteItem }) {
  
  return (
    <>
      <li>
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          {item.quantity} {item.description}
        </span>
        <button onClick={() => onDeleteItem(item.id)}>❌</button>
      </li>
    </>
  );
}
function Logo() {
  return (
    <>
      <h1>🏝️ Far Away 🧳</h1>
    </>
  );
}
function Stats() {
  return (
    <>
      <footer className="stats">
        <em>💼 You have 1 items on your list, and you already packed 0 (0%)</em>
      </footer>
    </>
  );
}

export default App;
