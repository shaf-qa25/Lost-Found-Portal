const NavItem = ({ title, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-2 rounded-md text-sm font-medium transition duration-150 ${active 
        ? 'bg-blue-600 text-white shadow-lg' 
        : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
      }`}
  >
    {title}
  </button>
);

export default NavItem;