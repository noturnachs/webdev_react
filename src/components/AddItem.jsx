import React from "react";

const AddItem = ({ title = "", setTitle, handleSubmit }) => {
  return (
    <form className="addForm" onSubmit={(e) => handleSubmit(e, title)}>
      <label htmlFor="addItem">Add Item</label>
      <input
        autoFocus
        id="addItem"
        type="text"
        placeholder="Add Item"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit" aria-label="Add Item">
        Add
      </button>
    </form>
  );
};

export default AddItem;
