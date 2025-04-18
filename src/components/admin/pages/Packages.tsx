import React, { useState, useEffect } from 'react';
import { Plus, Edit, Power } from 'lucide-react';
import { SubscriptionPackage } from '../../../types/admin';

const Packages = () => {
  const [packages, setPackages] = useState<SubscriptionPackage[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPackage, setCurrentPackage] = useState<Partial<SubscriptionPackage>>({
    name: '',
    description: '',
    durationDays: 30,
    price: 0,
    freeTrialClasses: 0,
    groupClasses: 0,
    oneOnOneSessions: 0,
    features: [],
    isActive: true,
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL.replace(/\/api$/, '')}/api/admin/packages`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) throw new Error('Failed to fetch packages');
      const data = await response.json();
      setPackages(data);
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentPackage((prev: Partial<SubscriptionPackage>) => ({
      ...prev,
      [name]: name === 'price' || name === 'durationDays' || name === 'freeTrialClasses' || name === 'groupClasses' || name === 'oneOnOneSessions' 
        ? Number(value) 
        : value,
    }));
  };

  const handleFeaturesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const features = e.target.value.split('\n').filter(feature => feature.trim());
    setCurrentPackage((prev: Partial<SubscriptionPackage>) => ({ ...prev, features }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_API_URL.replace(/\/api$/, '');
      const response = await fetch(`${baseUrl}/api/admin/package`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentPackage),
      });
      
      if (!response.ok) throw new Error('Failed to save package');
      
      setShowModal(false);
      fetchPackages();
      setCurrentPackage({
        name: '',
        description: '',
        durationDays: 30,
        price: 0,
        freeTrialClasses: 0,
        groupClasses: 0,
        oneOnOneSessions: 0,
        features: [],
        isActive: true,
      });
    } catch (error) {
      console.error('Error saving package:', error);
    }
  };

  const handleDeactivate = async (id: string) => {
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_API_URL.replace(/\/api$/, '');
      const url = currentPackage._id ? `${baseUrl}/api/admin/package/${currentPackage._id}` : `${baseUrl}/api/admin/package`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) throw new Error('Failed to deactivate package');
      
      fetchPackages();
    } catch (error) {
      console.error('Error deactivating package:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Subscription Packages</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Package
        </button>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg._id}
            className={`bg-white rounded-lg shadow-lg overflow-hidden ${
              !pkg.isActive && 'opacity-60'
            }`}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{pkg.name}</h3>
                  <p className="text-gray-600">{pkg.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setCurrentPackage(pkg);
                      setShowModal(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => pkg._id && handleDeactivate(pkg._id)}
                    className={`${
                      pkg.isActive ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'
                    }`}
                  >
                    <Power className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold">${pkg.price}</span>
                <span className="text-gray-600">/{pkg.durationDays} days</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-sm text-gray-600">Free Trials:</span>
                  <span className="ml-2 font-medium">{pkg.freeTrialClasses}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Group Classes:</span>
                  <span className="ml-2 font-medium">{pkg.groupClasses}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">1-on-1 Sessions:</span>
                  <span className="ml-2 font-medium">{pkg.oneOnOneSessions}</span>
                </div>
              </div>
              <div className="space-y-2">
                {pkg.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <span className="w-5 h-5 mr-2 text-green-500">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    pkg.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {pkg.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <h3 className="text-xl font-semibold mb-4">
              {currentPackage._id ? 'Edit Package' : 'Add New Package'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={currentPackage.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={currentPackage.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Duration (days)</label>
                  <input
                    type="number"
                    name="durationDays"
                    value={currentPackage.durationDays}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={currentPackage.price}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Free Trial Classes</label>
                  <input
                    type="number"
                    name="freeTrialClasses"
                    value={currentPackage.freeTrialClasses}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Group Classes</label>
                  <input
                    type="number"
                    name="groupClasses"
                    value={currentPackage.groupClasses}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">1-on-1 Sessions</label>
                  <input
                    type="number"
                    name="oneOnOneSessions"
                    value={currentPackage.oneOnOneSessions}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Features (one per line)
                </label>
                <textarea
                  value={currentPackage.features?.join('\n')}
                  onChange={handleFeaturesChange}
                  rows={5}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={currentPackage.isActive}
                  onChange={(e) =>
                    setCurrentPackage(prev => ({ ...prev, isActive: e.target.checked }))
                  }
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                  Active
                </label>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  {currentPackage._id ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Packages;