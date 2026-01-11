import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSequire';
import { toast } from 'react-toastify';
import { FaUserShield, FaUserTie, FaUser, FaTrash, FaSearch, FaCalendarAlt, FaClock } from 'react-icons/fa';
import ProfileImage from '../../../Components/ProfileImage';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedRole, setSelectedRole] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [modalData, setModalData] = useState(null); // For role change modal
  const [deleteModalData, setDeleteModalData] = useState(null); // For delete modal

  // Fetch all users
  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const result = await axiosSecure.get('/users');
      return result.data;
    }
  });

  // Update user role mutation
  const updateRoleMutation = useMutation({
    mutationFn: async ({ userId, role }) => {
      const result = await axiosSecure.patch(`/users/${userId}/role`, { role });
      return result.data;
    },
    onSuccess: () => {
      toast.success('User role updated successfully!');
      queryClient.invalidateQueries(['users']);
    },
    onError: (error) => {
      toast.error('Failed to update user role');
      console.error(error);
    }
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: async (userId) => {
      const result = await axiosSecure.delete(`/users/${userId}`);
      return result.data;
    },
    onSuccess: () => {
      toast.success('User deleted successfully!');
      queryClient.invalidateQueries(['users']);
    },
    onError: (error) => {
      toast.error('Failed to delete user');
      console.error(error);
    }
  });

  const handleRoleUpdate = (userId, newRole, currentRole, userName) => {
    setModalData({
      userId,
      newRole,
      currentRole,
      userName
    });
  };

  const confirmRoleUpdate = () => {
    if (modalData) {
      updateRoleMutation.mutate({ 
        userId: modalData.userId, 
        role: modalData.newRole 
      });
      setModalData(null);
    }
  };

  const handleDeleteUser = (userId, userName) => {
    setDeleteModalData({
      userId,
      userName
    });
  };

  const confirmDeleteUser = () => {
    if (deleteModalData) {
      deleteUserMutation.mutate(deleteModalData.userId);
      setDeleteModalData(null);
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'Admin': return <FaUserShield className="text-red-500" />;
      case 'Moderator': return <FaUserTie className="text-blue-500" />;
      default: return <FaUser className="text-green-500" />;
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'Admin': return 'bg-red-100 text-red-800 border-red-200';
      case 'Moderator': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  // Filter users based on search and role
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === '' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-800 min-h-screen transition-colors duration-200">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">Manage Users</h1>
        <p className="text-gray-600 dark:text-gray-300">Manage user roles and permissions across your platform</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 border-l-4 border-gray-500 transition-colors duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">Total Users</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">{users.length}</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-600 p-3 rounded-full">
              <FaUser className="text-gray-600 dark:text-gray-300 text-xl" />
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 border-l-4 border-red-500 transition-colors duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">Admins</p>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-1">
                {users.filter(user => user.role === 'Admin').length}
              </p>
            </div>
            <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full">
              <FaUserShield className="text-red-600 dark:text-red-400 text-xl" />
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 border-l-4 border-blue-500 transition-colors duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">Moderators</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                {users.filter(user => user.role === 'Moderator').length}
              </p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
              <FaUserTie className="text-blue-600 dark:text-blue-400 text-xl" />
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 border-l-4 border-green-500 transition-colors duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">Regular Users</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">
                {users.filter(user => user.role === 'User').length}
              </p>
            </div>
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
              <FaUser className="text-green-600 dark:text-green-400 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 mb-8 transition-colors duration-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search by name or email..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="md:w-48">
            <select 
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Moderator">Moderator</option>
              <option value="User">User</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div key={user._id} className="bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            {/* User Header */}
            <div className="bg-linear-to-r from-blue-500 to-purple-600 p-6 text-white">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <ProfileImage
                    src={user.photoURL || user.image}
                    alt={user.displayName || user.name || 'User'}
                    size="w-16 h-16"
                    className="border-4 border-white shadow-lg"
                    name={user.displayName || user.name}
                  />
                  <div className="absolute -bottom-1 -right-1">
                    {getRoleIcon(user.role)}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold truncate">
                    {user.displayName || user.name || 'No Name'}
                  </h3>
                  <p className="text-blue-100 text-sm truncate">{user.email}</p>
                </div>
              </div>
            </div>

            {/* User Details */}
            <div className="p-6">
              {/* Role Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getRoleBadgeColor(user.role)}`}>
                  {user.role}
                </span>
                <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                  ID: {user._id.slice(-6)}
                </div>
              </div>

              {/* User Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <FaCalendarAlt className="mr-2 text-gray-400 dark:text-gray-500" />
                  <span>Joined: {new Date(user.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <FaClock className="mr-2 text-gray-400 dark:text-gray-500" />
                  <span>Last Login: {new Date(user.last_loggedIn).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                {/* Role Selection */}
                <div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">User Role</div>
                  <div className="grid grid-cols-3 gap-2">
                    <button 
                      className={`relative p-3 rounded-lg border-2 transition-all duration-200 ${
                        user.role === 'User' 
                          ? 'border-green-500 bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 shadow-md' 
                          : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:border-green-300 hover:bg-green-50 dark:hover:bg-green-900'
                      }`}
                      onClick={() => handleRoleUpdate(user._id, 'User', user.role, user.displayName || user.name)}
                      disabled={updateRoleMutation.isLoading || user.role === 'User'}
                    >
                      {user.role === 'User' && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
                      )}
                      <FaUser className="w-4 h-4 mx-auto mb-1" />
                      <div className="text-xs font-medium">User</div>
                    </button>
                    
                    <button 
                      className={`relative p-3 rounded-lg border-2 transition-all duration-200 ${
                        user.role === 'Moderator' 
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow-md' 
                          : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900'
                      }`}
                      onClick={() => handleRoleUpdate(user._id, 'Moderator', user.role, user.displayName || user.name)}
                      disabled={updateRoleMutation.isLoading || user.role === 'Moderator'}
                    >
                      {user.role === 'Moderator' && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                      )}
                      <FaUserTie className="w-4 h-4 mx-auto mb-1" />
                      <div className="text-xs font-medium">Moderator</div>
                    </button>
                    
                    <button 
                      className={`relative p-3 rounded-lg border-2 transition-all duration-200 ${
                        user.role === 'Admin' 
                          ? 'border-red-500 bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-300 shadow-md' 
                          : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:border-red-300 hover:bg-red-50 dark:hover:bg-red-900'
                      }`}
                      onClick={() => handleRoleUpdate(user._id, 'Admin', user.role, user.displayName || user.name)}
                      disabled={updateRoleMutation.isLoading || user.role === 'Admin'}
                    >
                      {user.role === 'Admin' && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                      )}
                      <FaUserShield className="w-4 h-4 mx-auto mb-1" />
                      <div className="text-xs font-medium">Admin</div>
                    </button>
                  </div>
                </div>
                
                {/* Danger Zone */}
                <div className="pt-4 border-t border-gray-100 dark:border-gray-600">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Danger Zone</div>
                  <button 
                    className="w-full p-3 bg-red-50 dark:bg-red-900 border-2 border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-100 dark:hover:bg-red-800 hover:border-red-300 dark:hover:border-red-600 transition-all duration-200 flex items-center justify-center space-x-2 group"
                    onClick={() => handleDeleteUser(user._id, user.displayName || user.name)}
                    disabled={deleteUserMutation.isLoading}
                  >
                    <FaTrash className="w-4 h-4 group-hover:animate-pulse" />
                    <span className="font-medium">
                      {deleteUserMutation.isLoading ? 'Deleting...' : 'Delete User'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Users Found */}
      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-8 transition-colors duration-200">
            <FaUser className="mx-auto text-6xl text-gray-300 dark:text-gray-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">No Users Found</h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm || selectedRole 
                ? 'Try adjusting your search or filter criteria' 
                : 'No users have been registered yet'}
            </p>
          </div>
        </div>
      )}

      {/* Role Change Modal */}
      {modalData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <FaUserShield className="text-blue-600 dark:text-blue-400 text-2xl" />
                </div>
              </div>
              
              {/* Modal Content */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                  Change User Role
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Are you sure you want to change <span className="font-semibold text-gray-800 dark:text-gray-100">{modalData.userName}</span>'s role?
                </p>
              </div>

              {/* Role Change Visual */}
              <div className="flex items-center justify-center space-x-4 mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                    modalData.currentRole === 'Admin' ? 'bg-red-100 dark:bg-red-900' :
                    modalData.currentRole === 'Moderator' ? 'bg-blue-100 dark:bg-blue-900' : 'bg-green-100 dark:bg-green-900'
                  }`}>
                    {getRoleIcon(modalData.currentRole)}
                  </div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{modalData.currentRole}</span>
                </div>
                
                <div className="text-gray-400 dark:text-gray-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                
                <div className="text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                    modalData.newRole === 'Admin' ? 'bg-red-100 dark:bg-red-900' :
                    modalData.newRole === 'Moderator' ? 'bg-blue-100 dark:bg-blue-900' : 'bg-green-100 dark:bg-green-900'
                  }`}>
                    {getRoleIcon(modalData.newRole)}
                  </div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{modalData.newRole}</span>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setModalData(null)}
                  className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
                  disabled={updateRoleMutation.isLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmRoleUpdate}
                  className="flex-1 px-4 py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium"
                  disabled={updateRoleMutation.isLoading}
                >
                  {updateRoleMutation.isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Updating...
                    </div>
                  ) : (
                    'Confirm Change'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete User Modal */}
      {deleteModalData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                  <FaTrash className="text-red-600 dark:text-red-400 text-2xl" />
                </div>
              </div>
              
              {/* Modal Content */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                  Delete User Account
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Are you sure you want to delete <span className="font-semibold text-gray-800 dark:text-gray-100">{deleteModalData.userName}</span>'s account?
                </p>
                <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-3">
                  <p className="text-red-700 dark:text-red-300 text-sm font-medium">
                    ⚠️ This action cannot be undone. All user data will be permanently removed.
                  </p>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setDeleteModalData(null)}
                  className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
                  disabled={deleteUserMutation.isLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteUser}
                  className="flex-1 px-4 py-3 bg-red-600 dark:bg-red-700 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition-colors font-medium"
                  disabled={deleteUserMutation.isLoading}
                >
                  {deleteUserMutation.isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Deleting...
                    </div>
                  ) : (
                    'Delete User'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;