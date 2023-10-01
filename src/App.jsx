import { useEffect, useState } from "react";
import AddItem from "./components/AddItem";
import DisplayItem from "./components/DisplayItem";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [showError, setShowError] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const getLocalStorageData = () => {
      const storedData = localStorage.getItem("data");
      if (storedData) {
        setItems(JSON.parse(storedData));
      }
    };

    const networkCall = async () => {
      try {
        const result = await fetch(
          "https://jsonplaceholder.typicode.com/albums"
        );
        const parsedData = await result.json();
        setItems(parsedData);
        localStorage.setItem("data", JSON.stringify(parsedData));
      } catch (error) {
        console.log("Error:", error);
        setShowError(true);
        getLocalStorageData();
      }
    };

    networkCall();
  }, []);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(items));
  }, [items]);

  const addItem = (title) => {
    const userId = items.length ? items[items.length - 1].userId + 1 : 1;
    const id = items.length ? items[items.length - 1].id + 1 : 1;

    const myNewItem = { userId, id, title };

    const listItems = [...items, myNewItem];
    setItems(listItems);
  };

  const handleSubmit = (e, title) => {
    e.preventDefault();
    if (!title) return;
    addItem(title);

    setNewItem("");
  };

  return (
    <div className="App">
      {console.log(items)}
      <AddItem
        title={newItem}
        setTitle={setNewItem}
        handleSubmit={handleSubmit}
      />
      <button type="button" onClick={() => setShowItems(true)}>
        Display Items
      </button>
      <DisplayItem items={items} showItems={showItems} setItems={setItems} />
    </div>
  );
}

export default App;
