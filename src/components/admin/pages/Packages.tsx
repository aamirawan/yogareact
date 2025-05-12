import React, { useState, useEffect } from 'react';
import { Plus, Edit, Power, Users, User, Info } from 'lucide-react';
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
    type: 'group',
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
    
    // Special handling for oneOnOneSessions to fix the issue with 0 not being removed
    if (name === 'oneOnOneSessions') {
      // If the field is cleared, set to empty string temporarily to allow typing a new value
      if (value === '') {
        setCurrentPackage((prev: Partial<SubscriptionPackage>) => ({
          ...prev,
          oneOnOneSessions: value as any, // Use 'as any' to allow empty string temporarily
        }));
        return;
      }
      // Convert back to number for valid inputs
      const numValue = Number(value);
      if (!isNaN(numValue)) {
        setCurrentPackage((prev: Partial<SubscriptionPackage>) => ({
          ...prev,
          oneOnOneSessions: numValue,
        }));
      }
      return;
    }
    
    // Handle other numeric fields
    setCurrentPackage((prev: Partial<SubscriptionPackage>) => ({
      ...prev,
      [name]: name === 'price' || name === 'durationDays' || name === 'freeTrialClasses' || name === 'groupClasses'
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
        type: 'group',
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
                  <span className="ml-2 font-medium">{pkg.groupClasses === 0 ? 'Unlimited' : pkg.groupClasses}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">1-on-1 Sessions:</span>
                  <span className="ml-2 font-medium">{pkg.oneOnOneSessions}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Type:</span>
                  <span className="ml-2 font-medium capitalize">{pkg.type}</span>
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
          <div className="bg-white rounded-lg max-w-4xl w-full p-8 overflow-y-auto max-h-[90vh]">
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

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Package Type</label>
                <div className="grid grid-cols-2 gap-6">
                  <div 
                    onClick={() => setCurrentPackage(prev => ({ ...prev, type: 'group', groupClasses: 0, oneOnOneSessions: 0 }))}
                    className={`cursor-pointer border rounded-lg p-6 flex flex-col items-center ${currentPackage.type === 'group' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'}`}
                  >
                    <Users className={`w-12 h-12 mb-3 ${currentPackage.type === 'group' ? 'text-indigo-500' : 'text-gray-400'}`} />
                    <span className="font-medium text-lg">Group Classes</span>
                    <span className="text-sm text-gray-500 mt-2">Unlimited access to group classes</span>
                  </div>
                  <div 
                    onClick={() => setCurrentPackage(prev => ({ ...prev, type: 'one-on-one', groupClasses: 0, oneOnOneSessions: 1 }))}
                    className={`cursor-pointer border rounded-lg p-6 flex flex-col items-center ${currentPackage.type === 'one-on-one' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'}`}
                  >
                    <User className={`w-12 h-12 mb-3 ${currentPackage.type === 'one-on-one' ? 'text-indigo-500' : 'text-gray-400'}`} />
                    <span className="font-medium text-lg">1-on-1 Sessions</span>
                    <span className="text-sm text-gray-500 mt-2">Limited number of private sessions</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <span>Group Classes</span>
                    {currentPackage.type === 'group' && (
                      <div className="ml-2 relative group">
                        <Info className="w-4 h-4 text-gray-400" />
                        <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 w-48">
                          Enter 0 for unlimited group classes
                        </div>
                      </div>
                    )}
                  </label>
                  <input
                    type="number"
                    name="groupClasses"
                    value={currentPackage.groupClasses}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder={currentPackage.type === 'group' ? "0 for unlimited" : ""}
                    readOnly={currentPackage.type === 'group'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">1-on-1 Sessions</label>
                  <input
                    type="number"
                    name="oneOnOneSessions"
                    value={currentPackage.oneOnOneSessions === 0 && currentPackage.type === 'one-on-one' ? '' : currentPackage.oneOnOneSessions}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    min="1"
                    required={currentPackage.type === 'one-on-one'}
                    readOnly={currentPackage.type === 'group'}
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