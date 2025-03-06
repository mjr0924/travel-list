import { use, useState } from "react";
import  Stats  from "./components/Stats";
import  Logo  from "./components/Logo";
import  Form  from "./components/Form";
import  PackingList  from "./components/PackingList";

function App() {
  const [items, setItems] = useState([]);
  console.log(items);
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) => {
        if (item.id !== id) return item;
        return { ...item, packed: !item.packed };
      })
    );
  }
  function handleClearList() {
    const confirm = window.confirm("Are you sure you want to clear the list?");
    if (confirm) setItems([]);
  }

  return (
    <>
      <div className="app">
        <Logo />
        <Form onAddItems={handleAddItems} />
        <PackingList
          onClearList={handleClearList}
          items={items}
          onDeleteItem={handleDeleteItem}
          onToggleItem={handleToggleItem}
        />
        <Stats items={items} />
      </div>
    </>
  );
}

export default App;
