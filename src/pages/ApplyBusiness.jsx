import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSequire';
import useAuth from '../Hooks/useAuth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ApplyBusiness = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const applicationMutation = useMutation({
    mutationFn: async (applicationData) => {
      const result = await axiosSecure.post('/applications', applicationData);
      return result.data;
    },
    onSuccess: () => {
      toast.success('Application submitted successfully! We will review it soon.');
      reset();
      navigate('/');
    },
    onError: (error) => {
      toast.error('Failed to submit application. Please try again.');
      console.error(error);
    }
  });

  const onSubmit = (data) => {
    const applicationData = {
      ...data,
      applicant: {
        name: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL
      },
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    applicationMutation.mutate(applicationData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Apply for Business Partnership
            </h1>
            <p className="text-gray-600">
              Join our network of food businesses and reach more customers
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Business Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Name *
              </label>
              <input
                type="text"
                {...register('businessName', { required: 'Business name is required' })}
                className="input input-bordered w-full"
                placeholder="Enter your business name"
              />
              {errors.businessName && (
                <p className="text-red-500 text-sm mt-1">{errors.businessName.message}</p>
              )}
            </div>

            {/* Application Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Application Type *
              </label>
              <select
                {...register('applicationType', { required: 'Please select application type' })}
                className="select select-bordered w-full"
              >
                <option value="">Select type</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Food Truck">Food Truck</option>
                <option value="Home Kitchen">Home Kitchen</option>
                <option value="Catering Service">Catering Service</option>
                <option value="Food Delivery">Food Delivery</option>
                <option value="Other">Other</option>
              </select>
              {errors.applicationType && (
                <p className="text-red-500 text-sm mt-1">{errors.applicationType.message}</p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Location *
              </label>
              <input
                type="text"
                {...register('location', { required: 'Location is required' })}
                className="input input-bordered w-full"
                placeholder="Enter your business location"
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                {...register('phone', { required: 'Phone number is required' })}
                className="input input-bordered w-full"
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Description *
              </label>
              <textarea
                {...register('description', { 
                  required: 'Description is required',
                  minLength: { value: 50, message: 'Description must be at least 50 characters' }
                })}
                className="textarea textarea-bordered w-full h-32"
                placeholder="Describe your business, cuisine type, specialties, etc."
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            {/* Website (Optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website (Optional)
              </label>
              <input
                type="url"
                {...register('website')}
                className="input input-bordered w-full"
                placeholder="https://your-website.com"
              />
            </div>

            {/* Social Media (Optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Social Media (Optional)
              </label>
              <input
                type="text"
                {...register('socialMedia')}
                className="input input-bordered w-full"
                placeholder="Instagram, Facebook, etc."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={applicationMutation.isLoading}
                className="btn btn-primary w-full"
              >
                {applicationMutation.isLoading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              By submitting this application, you agree to our{' '}
              <a href="/Terms_Conditions" className="text-blue-600 hover:underline">
                Terms & Conditions
              </a>{' '}
              and{' '}
              <a href="/PrivacyPolicy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyBusiness;