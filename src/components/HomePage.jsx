import React, { useState } from "react";
import NavItem from "./navbar";
import LostItemForm from "./lostform";
import FoundItemForm from "./Founditemform";
import LostItemsList from "../../LostItemList";
import Contact from "./contact/Contact";


const HomePage = ({
  lostItems,
  foundItems,
  handleAddLostItem,
  handleAddFoundItem,
  handleItemFound
}) => {
  const [activeSection, setActiveSection] = useState("home");

  

  const combinedList = lostItems?.map((item) => ({
    ...item,
    isLost: true,
    isFound: false
  })) || [];


  const renderContent = () => {
    switch (activeSection) {
      case "report_lost":
        return (
          <div className="max-w-xl mx-auto">
            <LostItemForm onFormSubmit={handleAddLostItem} />
          </div>
        );

      case "report_found":
        return (
          <div className="max-w-xl mx-auto">
            <FoundItemForm onFormSubmit={handleAddFoundItem} />
          </div>
        );
        case "contact":
          return (
            <Contact/>
          )


      case "view_all":
     
        return (
          <LostItemsList
            items={combinedList}
            onClaim={(itemId) => {
              const item = combinedList.find((i) => i.id === itemId);
              if (item && item.isLost) {
                handleItemFound(itemId);
              } else {
                alert("You can only claim lost items!");
              }
            }}
          />
        );

      case "home":
      default:
        return (
          <div className="p-10 text-center bg-white shadow-lg rounded-lg max-w-2xl mx-auto mt-10">
            <h3 className="text-4xl font-extrabold overflow-hidden text-blue-600 mb-4">
              Lost it? Find it here.
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              "To report a lost item or inquire about found articles."
            </p>

            
            <button
              onClick={() => setActiveSection("report_lost")}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-150 shadow-md mr-4"
            >
              Lost Item
            </button>
            <button
              onClick={() => setActiveSection("report_found")}
              className="bg-green-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-green-700 transition duration-150 shadow-md"
            >
              Found Item
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <span
              className="text-2xl font-bold text-blue-600 cursor-pointer"
              onClick={() => setActiveSection("home")}
            >
              Lost & Found App
            </span>

            <div className="flex items-center space-x-4">
              <NavItem
                title="Home"
                active={activeSection === "home"}
                onClick={() => setActiveSection("home")}
              />
              <NavItem
                title="Lost Item Form"
                active={activeSection === "report_lost"}
                onClick={() => setActiveSection("report_lost")}
              />
              <NavItem
                title="Found Item Form"
                active={activeSection === "report_found"}
                onClick={() => setActiveSection("report_found")}
              />
              <NavItem
                title="View All Items"
                active={activeSection === "view_all"}
                onClick={() => setActiveSection("view_all")}
              />
              <NavItem
                title="Contact"
                active={activeSection === "contact"}
                onClick={() => setActiveSection("contact")}
              />

            </div>
          </div>
        </div>
      </nav>

     
      <main className="p-4 sm:p-6 lg:p-8">{renderContent()}</main>
    </div>
  );
};

export default HomePage;



