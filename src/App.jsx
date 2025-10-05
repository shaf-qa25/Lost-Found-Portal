
import React, { useState, useEffect } from "react";
import HomePage from "./components/HomePage";
import { getLostItems, addLostItem, handleFoundItem } from "./api";

function App() {
  const [lostItems, setLostItems] = useState([]);

  useEffect(() => {
    const lost = getLostItems();
    setLostItems(lost);
  }, []);

  const handleAddLostItem = (formDetails) => {
    const newItem = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      imageUrl: formDetails.imageFile
        ? URL.createObjectURL(formDetails.imageFile)
        : "Image not available",
      itemName: formDetails.itemName,
      description: formDetails.description,
      location: formDetails.location,
      isLost: true,
    };

    addLostItem(newItem);
    setLostItems((prevItems) => [newItem, ...prevItems]);
    alert(`Lost Item: "${formDetails.itemName}" Successfully Reported`);
  };

  const handleAddFoundItem = (formDetails) => {
    const result = handleFoundItem(formDetails);
    if (result.status === "removed") {
      setLostItems(getLostItems()); // update lostItems after removing matched
      alert(`Item "${formDetails.itemName}" successfully claimed!`);
    } else {
      alert(`No matching lost item found for "${formDetails.itemName}"`);
    }
  };

  const handleItemFound = (itemId) => {
    const updated = lostItems.filter((item) => item.id !== itemId);
    setLostItems(updated);
  };

  return (
    <HomePage
      lostItems={lostItems}
      handleAddLostItem={handleAddLostItem}
      handleAddFoundItem={handleAddFoundItem}
      handleItemFound={handleItemFound}
    />
  );
}

export default App;
