import { clearImageBlob, clearImages } from '@/redux/imageSlice';
import { clearUserInfo } from '@/redux/userSlice';
import { Image, LayoutDashboard, LogOut, Menu, UserRound } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const logOut = () => {
    console.log('logging out');
    dispatch(clearUserInfo());
    dispatch(clearImages());
    dispatch(clearImageBlob());
    navigate('/login');
  }


  return (
    <div className="flex relative w-fit">
      {/* Hamburger Icon (only visible on mobile) */}
      <button
        className="text-2xl p-4 align-bottom  self-start md:hidden"
        onClick={toggleSidebar}
      >
        <Menu />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full border-r border-purple-200/50 bg-[#ECE7F1] p-6 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:min-w-[240px] md:h-screen z-30 flex flex-col`}
        style={{ backgroundColor: '#ECE7F1' }}
      >
        <h1 className="text-2xl font-bold mb-8 text-gray-800">PixSpectrum</h1>
        <nav className="space-y-1 flex-1">
        
        {/* Dashboard Button */}
          <Link
            to="/"
            className={`flex gap-3 items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
              location.pathname === '/' 
                ? 'bg-[#9959F5] text-white font-medium' 
                : 'text-gray-700 hover:bg-purple-100/50'
            }`}
            onClick={() => setIsSidebarOpen(false)}
          >
            <LayoutDashboard width={20} height={20} className={location.pathname === '/' ? 'text-white' : 'text-gray-600'} />
            <span className="font-medium">Dashboard</span>
          </Link>
        
        {/* Filter Page Button */}
          <Link
            to="/filter"
            className={`flex gap-3 items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
              location.pathname === '/filter' 
                ? 'bg-[#9959F5] text-white font-medium' 
                : 'text-gray-700 hover:bg-purple-100/50'
            }`}
            onClick={() => setIsSidebarOpen(false)}
          >
            <Image width={20} height={20} className={location.pathname === '/filter' ? 'text-white' : 'text-gray-600'} />
            <span className="font-medium">Filter Page</span>
          </Link>

          <Link
            to="/documentation"
            className={`flex gap-3 items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
              location.pathname === '/documentation' 
                ? 'bg-[#9959F5] text-white font-medium' 
                : 'text-gray-700 hover:bg-purple-100/50'
            }`}
            onClick={() => setIsSidebarOpen(false)}
          >
            <img src="https://cdn4.iconfinder.com/data/icons/big-data-133/100/document_office_file_information_computer_documentation-512.png" width={20} height={20} className={location.pathname === '/documentation' ? 'opacity-100' : 'opacity-70'} />
            <span className="font-medium">Documentation</span>
          </Link>

          <Link
            to="/about"
            className={`flex gap-3 items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
              location.pathname === '/about' 
                ? 'bg-[#9959F5] text-white font-medium' 
                : 'text-gray-700 hover:bg-purple-100/50'
            }`}
            onClick={() => setIsSidebarOpen(false)}
          >
            <img src="https://icon-library.com/images/about-us-icon/about-us-icon-3.jpg" width={20} height={20} />
            <span className="font-medium">About Us</span>
          </Link>

          <Link
            to="/profile"
            className={`flex gap-3 items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
              location.pathname === '/profile' 
                ? 'bg-[#9959F5] text-white font-medium' 
                : 'text-gray-700 hover:bg-purple-100/50'
            }`}
            onClick={() => setIsSidebarOpen(false)}
          >
            <UserRound width={20} height={20} className={location.pathname === '/profile' ? 'text-white' : 'text-gray-600'} />
            <span className="font-medium">Profile</span>
          </Link>
        </nav>
        
        <div className="border-t border-purple-200/50 pt-4 mt-auto">
          <button
            className="flex gap-3 items-center w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-purple-100/50 transition-colors duration-200"
            onClick={logOut}
          >
            <LogOut width={20} height={20} className="text-gray-600" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay (only visible on mobile when sidebar is open) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
          // style={{ left: '50%' }}
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
