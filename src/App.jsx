import { use, useState } from "react";

function App() {
  const [items , setItems] = useState([]);
  function handleAddItems(item) {
    setItems((items) => [...items,item]);
  }
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id)); 
  }
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) => {
        if (item.id !== id) return item;
        return { ...item, packed: !item.packed };
      }
    ));
  }

  return (
    <>
      <div className="app">
        <Logo />
        <Form onAddItems={handleAddItems} />
        <PackingList items={items} onDeleteItem = {handleDeleteItem} onToggleItem={handleToggleItem} />
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

function PackingList({items , onDeleteItem , onToggleItem}) {
  return (
    <>
      <div className="list">
        <ul>
          {items.map((item) => (
            <Item item={item} key={item.id} onDeleteItem={onDeleteItem} onToggleItem ={onToggleItem} />
          ))}
        </ul>
      </div>
    </>
  );
}

function Item({ item , onDeleteItem , onToggleItem }) {
  
  return (
    <>
      <li>
        <input type="checkbox" value={item.packed} onChange={() => {onToggleItem(item.id)}} />
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
