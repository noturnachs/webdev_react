import { useState, useEffect } from "react";

function DisplayItem({ items, showItems, setItems }) {
  const [userIdToUpdate, setUserIdToUpdate] = useState("");
  const [updatedTitles, setUpdatedTitles] = useState(items.map(() => ""));

  useEffect(() => {
    setUpdatedTitles(items.map(() => ""));
  }, [items]);

  function DeleteItem(itemId) {
    localStorage.removeItem(itemId);
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  }

  function UpdateItem(itemId, updatedTitle, index) {
    if (!itemId || !updatedTitle) return;

    const updatedItems = items.map((item, i) => {
      if (i === index) {
        return { ...item, title: updatedTitle };
      }
      return item;
    });

    setItems(updatedItems);

    setUpdatedTitles((prevTitles) => {
      const newTitles = [...prevTitles];
      newTitles[index] = updatedTitle;
      return newTitles;
    });

    localStorage.setItem(itemId, JSON.stringify(updatedItems));
  }

  const retItems = items.map((item, index) => {
    return (
      <tr key={index}>
        <td>{item.userId}</td>
        <td>{item.id}</td>
        <td>{item.title}</td>
        <td>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              DeleteItem(item.id);
            }}
          >
            Delete
          </button>
        </td>
        <td>
          <input
            type="text"
            placeholder="New Title"
            value={updatedTitles[index]}
            onChange={(e) => {
              const newTitle = e.target.value;
              setUpdatedTitles((prevTitles) => {
                const newTitles = [...prevTitles];
                newTitles[index] = newTitle;
                return newTitles;
              });
            }}
          />
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              UpdateItem(item.id, updatedTitles[index], index);
            }}
          >
            Update
          </button>
        </td>
      </tr>
    );
  });

  if (showItems && items.length > 0) {
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>IsChecked?</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>{retItems}</tbody>
        </table>
      </div>
    );
  } else if (showItems && items.length <= 0) {
    return (
      <div>
        <h3>No Items in LocalStorage</h3>
      </div>
    );
  } else {
    return null;
  }
}

export default DisplayItem;
