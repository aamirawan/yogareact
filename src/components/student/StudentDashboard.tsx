import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Calendar, Users, CreditCard, Star, BookOpen, UserPlus } from 'lucide-react';

const StudentDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800">Student Portal</h2>
        </div>
        <nav className="mt-6">
          <div className="px-4 space-y-2">
            <Link
              to="/student/classes"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <BookOpen className="w-5 h-5 mr-3" />
              Group Classes
            </Link>
            <Link
              to="/student/one-on-one"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <UserPlus className="w-5 h-5 mr-3" />
              Book 1:1 Session
            </Link>
            {/* <Link
              to="/student/bookings"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <Calendar className="w-5 h-5 mr-3" />
              My Bookings
            </Link> */}
            <Link
              to="/student/subscription"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <CreditCard className="w-5 h-5 mr-3" />
              Subscription
            </Link>
            {/* <Link
              to="/student/teachers"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <Users className="w-5 h-5 mr-3" />
              Teachers
            </Link> */}
            <Link
              to="/student/reviews"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <Star className="w-5 h-5 mr-3" />
              My Reviews
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

export default StudentDashboard;