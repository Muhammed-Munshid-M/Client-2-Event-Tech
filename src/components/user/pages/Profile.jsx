/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { userUrl } from '../../../API/Api';
import Navbar from '../Navbar';
import { hideLoading, showLoading } from '../../redux/alertSlice';

function Profile() {
  const [modal, setModal] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [profile, setProfile] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(showLoading());
      const token = localStorage.getItem('token');
      axios.post(
        `${userUrl}profile-details`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ).then((response) => {
        dispatch(hideLoading());
        setUserDetails(response.data.data);
      })
        .catch((error) => {
          console.log(error);
          if (error.response.data.expired) {
            toast.error(error.response.data.message);
            localStorage.clear();
            navigate('/login');
          }
        });
    } catch (error) {
      if (error.response.data.expired) {
        toast.error(error.response.data.message);
        localStorage.clear();
        navigate('/login');
      }
      dispatch(hideLoading());
      console.log(error);
    }
  }, []);

  const updateProfile = async () => {
    setModal(false);
    try {
      const uploadImage = async (image) => {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'Event_Tech');
        const response = await axios.post('https://api.cloudinary.com/v1_1/dnrcd8rxl/image/upload', data);
        return response.data.url;
      };

      await uploadImage(profile, 'profile').then((response) => {
        const imageUpload = response;
        const imageData = { imageUpload };
        const otherData = { name, email, mobile };
        const profileData = { otherData, imageData };
        const token = localStorage.getItem('token');
        axios.post(`${userUrl}add-profile`, profileData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (response.data.success) {
              toast.success(response.data.message);
              window.location.reload();
            } else {
              toast.error('Something error');
            }
          });
      });
    } catch (error) {
      console.log(error);
      toast.error('something error');
    }
  };

  const openBookings = () => {
    navigate('/bookings');
  };

  const openModal = async () => {
    setModal(true);
  };

  const closeModal = async () => {
    setModal(false);
  };

  const goBack = () => {
    navigate('/');
  };

  return (
    <div className="mt-16 pb-16" style={{ backgroundColor: 'rgb(210, 240, 275)' }}>

      <Navbar profileImage={userDetails} />
      <div className="max-w-full mx-auto py-12 sm:px-6 lg:px-8">
        <div className=" sm:py-5 sm:grid sm:grid-cols-2 sm:gap-20 sm:px-96">
          {modal ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-10">
              <div className="max-w-xl p-6 bg-white divide-y divide-gray-500">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl">Add Details</h3>
                  <svg
                    onClick={closeModal}
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="mt-4">
                  <form onSubmit={updateProfile} className="w-full max-w-xl">
                    <div className="md:flex md:items-center mb-6 mt-5">
                      <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                          Change Profile
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-full-name"
                          type="file"
                          accept="image/*"
                          onChange={(e) => setProfile(e.target.files[0])}
                        />
                      </div>
                    </div>
                    <div className="md:flex md:items-center mb-6 mt-5">
                      <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                          Name
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-password"
                          type="text"
                          placeholder={userDetails.name}
                          value={name}
                          required
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                      <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                          Email
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-password"
                          type="email"
                          placeholder={userDetails.email}
                          value={email}
                          required
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                      <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                          Mobile
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-password"
                          type="number"
                          placeholder={userDetails.mobile}
                          value={mobile}
                          required
                          onChange={(e) => setMobile(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="md:flex md:items-center">
                      <div className="md:w-1/3" />
                      <div className="md:w-2/3">
                        <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                          Add
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <button type="button" onClick={openModal} className="inline-flex items-center px-16 mt-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-cyan-200 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
              Edit Profile
            </button>
          )}
          <button type="button" onClick={openBookings} className="inline-flex items-center px-16 mt-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-cyan-200 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
            Bookings
          </button>
        </div>
        <div className="max-w-sm mx-auto px-12">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 pt-5 sm:px-6">
              <img className="sm:mx-auto" width="150px" height="auto" src={userDetails.profile_image} alt="" />
              <h1 className="text-2xl pt-2 font-medium text-gray-900">
                {userDetails.name}
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {userDetails.email}
              </p>
            </div>
            <div className="px-4 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    +91
                    {' '}
                    {userDetails.mobile}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button type="button" onClick={goBack} className="inline-flex items-center px-10 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-cyan-200 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
