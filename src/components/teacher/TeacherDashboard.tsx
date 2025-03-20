import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Calendar, Users, BookOpen, AlertCircle, Settings } from 'lucide-react';

const TeacherDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800">Teacher Portal</h2>
        </div>
        <nav className="mt-6">
          <div className="px-4 space-y-2">
            <Link
              to="/teacher/profile"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <Settings className="w-5 h-5 mr-3" />
              Profile
            </Link>
            <Link
              to="/teacher/classes"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <BookOpen className="w-5 h-5 mr-3" />
              Classes
            </Link>
            <Link
              to="/teacher/calendar"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <Calendar className="w-5 h-5 mr-3" />
              1:1 Session
            </Link>
            { /* <Link
              to="/teacher/students"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <Users className="w-5 h-5 mr-3" />
              Students
            </Link>
            */ }
            <Link
              to="/teacher/issues"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <AlertCircle className="w-5 h-5 mr-3" />
              Issues
            </Link>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;