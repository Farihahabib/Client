import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSequire';
import { toast } from 'react-toastify';
import { FaCheck, FaTimes, FaEye, FaClock } from 'react-icons/fa';

const ManageApplications = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState('');

  // Fetch all applications
  const { data: applications = [], isLoading, refetch } = useQuery({
    queryKey: ['applications'],
    queryFn: async () => {
      const result = await axiosSecure.get('/moderator/applications');
      return result.data;
    }
  });

  // Approve application mutation
  const approveApplicationMutation = useMutation({
    mutationFn: async (applicationId) => {
      const result = await axiosSecure.patch(`/moderator/applications/${applicationId}/approve`);
      return result.data;
    },
    onSuccess: () => {
      toast.success('Application approved successfully!');
      queryClient.invalidateQueries(['applications']);
    },
    onError: (error) => {
      toast.error('Failed to approve application');
      console.error(error);
    }
  });

  // Reject application mutation
  const rejectApplicationMutation = useMutation({
    mutationFn: async ({ applicationId, reason }) => {
      const result = await axiosSecure.patch(`/moderator/applications/${applicationId}/reject`, { reason });
      return result.data;
    },
    onSuccess: () => {
      toast.success('Application rejected successfully!');
      queryClient.invalidateQueries(['applications']);
    },
    onError: (error) => {
      toast.error('Failed to reject application');
      console.error(error);
    }
  });

  const handleApprove = (applicationId) => {
    if (window.confirm('Are you sure you want to approve this application?')) {
      approveApplicationMutation.mutate(applicationId);
    }
  };

  const handleReject = (applicationId) => {
    const reason = prompt('Enter reason for rejection:');
    if (reason) {
      rejectApplicationMutation.mutate({ applicationId, reason });
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <span className="badge badge-success">Approved</span>;
      case 'rejected':
        return <span className="badge badge-error">Rejected</span>;
      default:
        return <span className="badge badge-warning">Pending</span>;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <FaCheck className="text-green-500" />;
      case 'rejected':
        return <FaTimes className="text-red-500" />;
      default:
        return <FaClock className="text-yellow-500" />;
    }
  };

  const filteredApplications = selectedStatus 
    ? applications.filter(app => app.status === selectedStatus)
    : applications;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Applications</h1>
        <div className="flex gap-4">
          <select 
            className="select select-bordered"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">All Applications</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-50">
              <tr>
                <th>Applicant</th>
                <th>Type</th>
                <th>Business Name</th>
                <th>Description</th>
                <th>Applied Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((application) => (
                <tr key={application._id} className="hover:bg-gray-50">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img 
                            src={application.applicant?.photoURL || '/default-avatar.png'} 
                            alt={application.applicant?.name || 'User'} 
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{application.applicant?.name}</div>
                        <div className="text-sm text-gray-600">{application.applicant?.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-outline">
                      {application.applicationType}
                    </span>
                  </td>
                  <td className="font-semibold">{application.businessName}</td>
                  <td>
                    <div className="max-w-xs">
                      <p className="text-sm text-gray-700 truncate">
                        {application.description}
                      </p>
                    </div>
                  </td>
                  <td>{new Date(application.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(application.status)}
                      {getStatusBadge(application.status)}
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button 
                        className="btn btn-sm btn-info"
                        onClick={() => {
                          // Open modal or navigate to detailed view
                          alert(`Application Details:\n\nBusiness: ${application.businessName}\nType: ${application.applicationType}\nDescription: ${application.description}\nLocation: ${application.location || 'Not specified'}`);
                        }}
                      >
                        <FaEye />
                      </button>
                      {application.status === 'pending' && (
                        <>
                          <button 
                            className="btn btn-sm btn-success"
                            onClick={() => handleApprove(application._id)}
                            disabled={approveApplicationMutation.isLoading}
                          >
                            <FaCheck />
                          </button>
                          <button 
                            className="btn btn-sm btn-error"
                            onClick={() => handleReject(application._id)}
                            disabled={rejectApplicationMutation.isLoading}
                          >
                            <FaTimes />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredApplications.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No applications found</p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {applications.filter(app => app.status === 'pending').length}
              </p>
            </div>
            <FaClock className="text-yellow-500 text-2xl" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-green-600">
                {applications.filter(app => app.status === 'approved').length}
              </p>
            </div>
            <FaCheck className="text-green-500 text-2xl" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-red-600">
                {applications.filter(app => app.status === 'rejected').length}
              </p>
            </div>
            <FaTimes className="text-red-500 text-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageApplications;