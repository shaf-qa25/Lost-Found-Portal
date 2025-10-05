import React, { useState } from 'react';

const FoundItemForm = ({ onFormSubmit }) => {
  const [formDetails, setFormDetails] = useState({ itemName: '', description: '', foundLocation: '', finderName: '', finderContact: '', imageFile: null });

  const handleChange = (e) => setFormDetails(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleFileChange = (e) => setFormDetails(p => ({ ...p, imageFile: e.target.files[0] }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formDetails.itemName || !formDetails.finderContact) {
      alert("Kripya sabhi zaroori fields bharein.");
      return;
    }
    onFormSubmit(formDetails);
    setFormDetails({ itemName: '', description: '', foundLocation: '', finderName: '', finderContact: '', imageFile: null });
  };

  return (
    <div className="p-8 bg-white shadow-xl rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2 text-green-800">Report Found Item 🟢</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Item Name *</label>
          <input type="text" name="itemName" value={formDetails.itemName} onChange={handleChange} required placeholder="eg: Key, Laptop" className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
          <textarea name="description" rows="3" value={formDetails.description} onChange={handleChange} required placeholder="Colour, Brand,Stickers, etc." className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"></textarea>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Location Found *</label>
          <input type="text" name="foundLocation" value={formDetails.foundLocation} onChange={handleChange} required placeholder="eg: College Gate-2" className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image (Optional)</label>
          <input
            type="file"
            name="imageFile"
            onChange={handleFileChange}
            accept="image/*"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <h3 className="text-lg font-semibold text-gray-700 mb-3 border-t pt-3">Contact Details</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
          <input type="text" name="finderName" value={formDetails.finderName} onChange={handleChange} required placeholder="Your Name" className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone No. or Email *</label>
          <input type="text" name="finderContact" value={formDetails.finderContact} onChange={handleChange} required placeholder="eg: 9876543210" className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
        </div>

        <button type="submit" className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150">Submit Found Item Report</button>
      </form>
    </div>
  );
};
export default FoundItemForm; 