
const LOST_KEY = "lostItems";
const FOUND_KEY = "foundItems";


export const getLostItems = () => {
  return JSON.parse(localStorage.getItem(LOST_KEY)) || [];
};

export const saveLostItems = (items) => {
  localStorage.setItem(LOST_KEY, JSON.stringify(items));
  return items;
};


export const addLostItem = (item) => {
  const lostItems = getLostItems();
  const updated = [item, ...lostItems];
  saveLostItems(updated);
  return item;
};


export const removeLostItem = (id) => {
  const lostItems = getLostItems();
  const updated = lostItems.filter((item) => item.id !== id);
  saveLostItems(updated);
  return true;
};


export const handleFoundItem = (formDetails) => {
  const lostItems = getLostItems();
  const matchedItem = lostItems.find(
    (item) =>
      item.itemName.toLowerCase() === formDetails.itemName.toLowerCase()
  );

  if (matchedItem) {
    const updated = lostItems.filter((item) => item.id !== matchedItem.id);
    saveLostItems(updated);
    return { status: "removed", matchedItem };
  }
  return { status: "not_found" };
};
