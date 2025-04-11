import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FileText, BookOpen, Package, Settings, LayoutDashboard, Users, GraduationCap, Calendar, ShoppingCart } from 'lucide-react';

const AdminDashboard = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    return currentPath.includes(path) ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100';
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <Link to="/admin" className="flex items-center space-x-2">
            <LayoutDashboard className="w-6 h-6 text-indigo-600" />
            <span className="text-xl font-semibold text-gray-900">Admin Portal</span>
          </Link>
        </div>
        <nav className="p-4">
          <div className="space-y-2">
            <Link
              to="/admin/pages"
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/pages')}`}
            >
              <FileText className="w-5 h-5 mr-3" />
              Static Pages
            </Link>
            <Link
              to="/admin/blog"
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/blog')}`}
            >
              <BookOpen className="w-5 h-5 mr-3" />
              Blog & Videos
            </Link>
            <Link
              to="/admin/packages"
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/packages')}`}
            >
              <Package className="w-5 h-5 mr-3" />
              Packages
            </Link>
            <Link
              to="/admin/classes"
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/classes')}`}
            >
              <Calendar className="w-5 h-5 mr-3" />
              Classes
            </Link>
            <Link
              to="/admin/orders"
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/orders')}`}
            >
              <ShoppingCart className="w-5 h-5 mr-3" />
              Orders & Bookings
            </Link>
            <Link
              to="/admin/teachers"
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/teachers')}`}
            >
              <Users className="w-5 h-5 mr-3" />
              Teachers
            </Link>
            <Link
              to="/admin/students"
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/students')}`}
            >
              <GraduationCap className="w-5 h-5 mr-3" />
              Students
            </Link>
            {/* <Link
              to="/admin/settings"
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/settings')}`}
            >
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </Link> */}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-50">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;