import { useState } from "react";
import FoundItemForm from "./src/components/Founditemform";

const LostItemsList = ({ items = [], onClaim }) => {
  const lostItems = items.filter((item) => item.isLost);

  
  const [openFormId, setOpenFormId] = useState(null);

  const handleToggleForm = (itemId) => {
    setOpenFormId(openFormId === itemId ? null : itemId);
  };

  return (
    <div className="p-4 sm:p-0">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-2">
        Reported Lost Items ({lostItems.length})
      </h2>

      {lostItems.length === 0 ? (
        <div className="p-10 text-center bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-lg font-medium text-yellow-800">
            No lost items have been reported yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-rows-2 md:grid-cols-2 gap-3">
          {lostItems.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-[1.01] transition duration-300 border border-gray-100"
            >
              {item.imageUrl && (
                <div className="relative h-40 bg-gray-200">
                  <img
                    src={item.imageUrl}
                    alt={item.itemName || "Lost Item"}
                    className="w-10 h-10 m-10 p-12"
                  />
                  <span className="   absolute top-4 right-2 font-serif font-bold bg-red-600 text-black text-2xl rounded-full shadow-md">
                    LOST
                  </span>
                </div>
              )}

              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.itemName}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  <strong>Description:</strong> {item.description}
                </p>

                <div className="space-y-1 text-sm">
                  <p className="text-gray-700">
                    📍 <strong>Location:</strong>{" "}
                    <span className="font-medium">{item.location}</span>
                  </p>
                  <p className="text-gray-500">
                    🗓 <strong>Date:</strong> {item.date}
                  </p>
                </div>



              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LostItemsList;