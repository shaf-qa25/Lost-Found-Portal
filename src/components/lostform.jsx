import React, { useState } from 'react';

const LostItemForm = ({ onFormSubmit }) => {
    const [formDetails, setFormDetails] = useState({ itemName: '', description: '', location: '', imageFile: null });

    const handleChange = (e) => setFormDetails(p => ({ ...p, [e.target.name]: e.target.value }));
    const handleFileChange = (e) => setFormDetails(p => ({ ...p, imageFile: e.target.files[0] }));

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formDetails.itemName || !formDetails.description || !formDetails.location) {
            alert("Please fill all details.");
            return;
        }
        onFormSubmit(formDetails);
        setFormDetails({ itemName: '', description: '', location: '', imageFile: null });
    };

    return (
        <div className="p-8 bg-white shadow-xl rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Report Lost Item</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="itemName" className="block text-sm font-medium text-gray-700 mb-1">Item Name <span className="text-red-500">*</span></label>
                    <input type="text" id="itemName" name="itemName" value={formDetails.itemName} onChange={handleChange} required placeholder="eg: Black Wallet, Airpods" className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description <span className="text-red-500">*</span></label>
                    <textarea id="description" name="description" rows="3" value={formDetails.description} onChange={handleChange} required placeholder="Colour, Brand, Stickers, etc" className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Last Seen Location <span className="text-red-500">*</span></label>
                    <input type="text" id="location" name="location" value={formDetails.location} onChange={handleChange} required placeholder="eg: College-Gate 3, Library 2nd floor" className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div className="mb-6">
                    <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700 mb-1">Upload Photo (Optional)</label>
                    <input type="file" id="imageFile" name="imageFile" accept="image/*" onChange={handleFileChange} className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                    {formDetails.imageFile && (<p className="mt-2 text-sm text-gray-500">Selected: <strong>{formDetails.imageFile.name}</strong></p>)}
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150">Submit Report</button>
            </form>
        </div>
    );
};
export default LostItemForm;