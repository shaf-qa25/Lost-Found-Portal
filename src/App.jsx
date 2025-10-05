// import React, { useState, useEffect } from 'react';
// import HomePage from './components/HomePage';


// const loadFromLocalStorage = (key) => {
//   try {
//     const stored = localStorage.getItem(key);
//     return stored ? JSON.parse(stored) : [];
//   } catch (error) {
//     console.error(`Error loading ${key} from localStorage:`, error);
//     return [];
//   }
// };

// const saveToLocalStorage = (key, data) => {
//   try {
//     localStorage.setItem(key, JSON.stringify(data));
//   } catch (error) {
//     console.error(`Error saving ${key} to localStorage:`, error);
//   }
// };

// function App() {
  
//   const [lostItems, setLostItems] = useState(loadFromLocalStorage('lostItems'));
//   const [foundItems, setFoundItems] = useState(loadFromLocalStorage('foundItems'));

  
//   useEffect(() => {
//     saveToLocalStorage('lostItems', lostItems);
//     saveToLocalStorage('foundItems', foundItems);
//   }, [lostItems, foundItems]);

  
//   const handleAddLostItem = (formDetails) => {
//     const newItem = {
//       id: Date.now(),
//       date: new Date().toLocaleDateString(),
//       imageUrl: formDetails.imageFile
//         ? URL.createObjectURL(formDetails.imageFile)
//         : 'Image Not Available',
//       itemName: formDetails.itemName,
//       description: formDetails.description,
//       location: formDetails.location,
//       isLost: true,
//     };

//     setLostItems((prevItems) => [newItem, ...prevItems]);
//     alert(`Lost Item: "${formDetails.itemName}" Successfully Reported`);
//   };

  
  
//   const handleAddFoundItem = (formDetails) => {
//     const matchedItem = lostItems.find(
//       (item) =>
//         item.itemName.toLowerCase() === formDetails.itemName.toLowerCase()
//     );
  
//     if (matchedItem) {
//       const updatedLostItems = lostItems.filter(
//         (item) => item.id !== matchedItem.id
//       );
//       setLostItems(updatedLostItems);
  
//       alert(`Lost Item "${formDetails.itemName}" successfully found and removed!`);
//     } else {
//       alert(`No matching lost item found for "${formDetails.itemName}".`);
//     }
//   };
  
  

//   return (
//     <HomePage  lostItems={lostItems}
//       foundItems={foundItems}
//       handleAddLostItem={handleAddLostItem}
//       handleAddFoundItem={handleAddFoundItem}
//     />
//   );
// }

// export default App;




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
