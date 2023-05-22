/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { userUrl } from '../../../API/Api';
import Navbar from '../Navbar';

function CompanyDetails() {
  const [companyDetails, setCompanyDetails] = useState('');
  const [serviceDetails, setServiceDetails] = useState('');
  const [showServices, setShowServices] = useState(false);
  const [stage, setStage] = useState(false);
  const [decorate, setDecorate] = useState(false);
  const [photography, setPhotography] = useState(false);
  const [vehicle, setVehicle] = useState(false);
  const [cateringMenu, setCateringMenu] = useState([]);
  const [stageMenu, setStageMenu] = useState([]);
  const [decorateMenu, setDecorateMenu] = useState([]);
  const [photographyMenu, setphotographyMenu] = useState([]);
  const [vehicleMenu, setVehicleMenu] = useState([]);
  const managerDetails = useSelector((state) => state.company);
  const managerId = managerDetails.company.managerDetails._id;
  const navigate = useNavigate();

  const selectService = () => {
    navigate('/select-service');
  };

  const openFoodService = () => {
    setShowServices(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const closeServiceModal = () => {
    setShowServices(false);
  };

  const openStageService = () => {
    setStage(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const closeStageModal = () => {
    setStage(false);
  };

  const openDecorateService = () => {
    setDecorate(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const closeDecorateModal = () => {
    setDecorate(false);
  };

  const openPhotographyService = () => {
    setPhotography(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const closePhotographyModal = () => {
    setPhotography(false);
  };

  const openVehicleService = () => {
    setVehicle(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const closeVehicleModal = () => {
    setVehicle(false);
  };

  useEffect(() => {
    setCompanyDetails(managerDetails.company.managerDetails);
    const token = localStorage.getItem('token');
    axios.post(`${userUrl}service-details/${managerId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      const services = response.data.data;
      setServiceDetails(services);
      const menu = services.cateringMenu;
      const stageMenuData = services.stageMenu;
      const decoratedMenu = services.decorationMenu;
      const photographMenu = services.photographyMenu;
      const vehiclesMenu = services.luxuryVehicleMenu;
      setCateringMenu(menu);
      setStageMenu(stageMenuData);
      setDecorateMenu(decoratedMenu);
      setphotographyMenu(photographMenu);
      setVehicleMenu(vehiclesMenu);
    });
  }, [managerDetails]);

  return (
    <div>
      <Navbar />
      <div className="mt-16" style={{ backgroundColor: 'rgb(210, 240, 275)' }}>
        <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
          <div className="flex flex-row justify-between w-full department-head mb-8">
            <img width="50px" height="10px" src={companyDetails.company_logo} alt="" />
            <h1 className="text-center font-normal font-serif pt-3 md:pl-14 text-2xl">{companyDetails.company_name}</h1>
            <button type="button" onClick={selectService} className="text-right inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-base">Select</button>
          </div>
          <div className="max-w-7xl mx-auto">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 text-center">
                <div className="flex content-center items-center justify-center">
                  <img width="150px" src={companyDetails.manager_image} alt="" />
                </div>
                <h1 className="text-2xl font-medium text-gray-900">
                  {companyDetails.name}
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Manager Name
                </p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="">
                  <div className="py-4 sm:py-5 sm:grid sm:px-6">
                    <dt className="text-lg font-medium text-gray-900 mb-4">About Us</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {companyDetails.description}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:px-6">
                    <dt className="text-lg font-medium text-gray-900 mb-4">Our Recent Works</dt>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-8 sm:px-6">
                    <img width="450px" height="auto" src="/evnt3.jpeg" alt="" />
                    <img width="450px" height="auto" src="/pexels-faruk.jpg" alt="" />
                    <img width="450px" height="auto" src="/pexels-rachel.jpg" alt="" />
                  </div>
                </dl>
              </div>
              <div className="mt-5">
                <h1 className="font-semibold text-2xl text-center">Our Providing Services</h1>
                <div className="overflow-x-auto mt-10">
                  <div className="inline-block min-w-full px-20">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-slate-300">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Services
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Details
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-slate-400 divide-y divide-gray-200">
                          {serviceDetails.catering_status == true
                                                    && (
                                                    <tr className="hover:bg-slate-200 transition duration-300">
                                                      <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                          1.
                                                          <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                              {serviceDetails.catering_name}
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </td>
                                                      <td className="px-6 py-4 whitespace-nowrap">
                                                        {showServices ? (
                                                          <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-10">
                                                            <div className="max-w-7xl p-6 bg-white divide-y divide-gray-500">
                                                              <div className="flex items-center justify-between">
                                                                <h3 className="text-2xl">Food Menu Details</h3>
                                                                <svg
                                                                  onClick={closeServiceModal}
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
                                                                <div className="border-b border-gray-200 px-4 py-5 sm:p-0">
                                                                  <dl className="sm:divide-y sm:divide-gray-200">
                                                                    <div className="py-4 sm:py-5 sm:grid lg:grid-cols-4 sm:grid-cols-4 sm:gap-4 sm:px-6">
                                                                      <dt className="text-sm font-medium text-gray-500">Startes</dt>
                                                                      <dt className="text-sm font-medium text-gray-500">Main</dt>
                                                                      <dt className="text-sm font-medium text-gray-500">Desserts</dt>
                                                                      <dt className="text-sm font-medium text-gray-500">Salads</dt>

                                                                    </div>
                                                                    {cateringMenu.map((data) => (
                                                                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-8 sm:gap-8 sm:px-6">
                                                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{data.starter_name}</dd>
                                                                        <img src={data.starter_image} alt="" />
                                                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{data.main_name}</dd>
                                                                        <img src={data.main_image} alt="" />
                                                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{data.dessert_name}</dd>
                                                                        <img src={data.dessert_image} alt="" />
                                                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{data.salad_name}</dd>
                                                                        <img src={data.salad_image} alt="" />
                                                                      </div>
                                                                    ))}
                                                                  </dl>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        ) : (
                                                          <button
                                                            type="button"
                                                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-cyan-200 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                                            onClick={openFoodService}
                                                          >
                                                            View
                                                          </button>
                                                        )}
                                                      </td>
                                                    </tr>
                                                    )}
                          {serviceDetails.stage_status == true
                                                    && (
                                                    <tr className="hover:bg-slate-200 transition duration-300">
                                                      <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                          2.
                                                          <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                              {serviceDetails.stage_name}
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </td>
                                                      <td className="px-6 py-4 whitespace-nowrap">
                                                        {stage ? (
                                                          <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-10">
                                                            <div className="max-w-sm p-6 bg-white divide-y divide-gray-500">
                                                              <div className="flex items-center justify-between">
                                                                <h3 className="text-2xl">Stage Menu Details</h3>
                                                                <svg
                                                                  onClick={closeStageModal}
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
                                                                <div className="border-b border-gray-200 py-5 sm:p-0">
                                                                  <dl className="sm:divide-y sm:divide-gray-200">
                                                                    <div className="py-4 sm:py-5 sm:grid lg:grid-cols-4 sm:grid-cols-4 sm:gap-4 sm:px-6">
                                                                      <dt className="text-sm font-medium text-gray-500">Stages</dt>
                                                                    </div>
                                                                    {stageMenu.map((data) => (
                                                                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-1 sm:px-6">
                                                                        <img src={data.stage_photo} alt="" />
                                                                      </div>
                                                                    ))}
                                                                  </dl>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        ) : (
                                                          <button
                                                            type="button"
                                                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-cyan-200 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                                            onClick={openStageService}
                                                          >
                                                            View
                                                          </button>
                                                        )}
                                                      </td>
                                                    </tr>
                                                    )}
                          {serviceDetails.decoration_status == true
                                                    && (
                                                    <tr className="hover:bg-slate-200 transition duration-300">
                                                      <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                          3.
                                                          <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                              {serviceDetails.decoration_name}
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </td>
                                                      <td className="px-6 py-4 whitespace-nowrap">
                                                        {decorate ? (
                                                          <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-10">
                                                            <div className="max-w-sm p-6 bg-white divide-y divide-gray-500">
                                                              <div className="flex items-center justify-between">
                                                                <h3 className="text-2xl">Decoration Menu Details</h3>
                                                                <svg
                                                                  onClick={closeDecorateModal}
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
                                                                <div className="border-b border-gray-200 py-5 sm:p-0">
                                                                  <dl className="sm:divide-y sm:divide-gray-200">
                                                                    <div className="py-4 sm:py-5 sm:grid lg:grid-cols-4 sm:grid-cols-4 sm:gap-4 sm:px-6">
                                                                      <dt className="text-sm font-medium text-gray-500">Stages</dt>
                                                                    </div>
                                                                    {decorateMenu.map((data) => (
                                                                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-1 sm:px-6">
                                                                        <img src={data.decoration_photo} alt="" />
                                                                      </div>
                                                                    ))}
                                                                  </dl>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        ) : (
                                                          <button
                                                            type="button"
                                                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-cyan-200 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                                            onClick={openDecorateService}
                                                          >
                                                            View
                                                          </button>
                                                        )}
                                                      </td>
                                                    </tr>
                                                    )}
                          {serviceDetails.photography_status == true
                                                    && (
                                                    <tr className="hover:bg-slate-200 transition duration-300">
                                                      <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                          4.
                                                          <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                              {serviceDetails.photography_name}
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </td>
                                                      <td className="px-6 py-4 whitespace-nowrap">
                                                        {photography ? (
                                                          <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-10">
                                                            <div className="max-w-sm p-6 bg-white divide-y divide-gray-500">
                                                              <div className="flex items-center justify-between">
                                                                <h3 className="text-2xl">Photography Menu Details</h3>
                                                                <svg
                                                                  onClick={closePhotographyModal}
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
                                                                <div className="border-b border-gray-200 py-5 sm:p-0">
                                                                  <dl className="sm:divide-y sm:divide-gray-200">
                                                                    <div className="py-4 sm:py-5 sm:grid lg:grid-cols-4 sm:grid-cols-4 sm:gap-4 sm:px-6">
                                                                      <dt className="text-sm font-medium text-gray-500">Stages</dt>
                                                                    </div>
                                                                    {photographyMenu.map((data) => (
                                                                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-1 sm:px-6">
                                                                        <img src={data.recent_photos} alt="" />
                                                                      </div>
                                                                    ))}
                                                                  </dl>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        ) : (
                                                          <button
                                                            type="button"
                                                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-cyan-200 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                                            onClick={openPhotographyService}
                                                          >
                                                            View
                                                          </button>
                                                        )}
                                                      </td>
                                                    </tr>
                                                    )}
                          {serviceDetails.vehicle_status == true
                                                    && (
                                                    <tr className="hover:bg-slate-200 transition duration-300">
                                                      <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                          5.
                                                          <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                              {serviceDetails.vehicle_name}
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </td>
                                                      <td className="px-6 py-4 whitespace-nowrap">
                                                        {vehicle ? (
                                                          <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-10">
                                                            <div className="max-w-sm p-6 bg-white divide-y divide-gray-500">
                                                              <div className="flex items-center justify-between">
                                                                <h3 className="text-2xl">Luxury Vehicle Menu Details</h3>
                                                                <svg
                                                                  onClick={closeVehicleModal}
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
                                                                <div className="border-b border-gray-200 py-5 sm:p-0">
                                                                  <dl className="sm:divide-y sm:divide-gray-200">
                                                                    <div className="py-4 sm:py-5 sm:grid lg:grid-cols-4 sm:grid-cols-4 sm:gap-4 sm:px-6">
                                                                      <dt className="text-sm font-medium text-gray-500">Stages</dt>
                                                                    </div>
                                                                    {vehicleMenu.map((data) => (
                                                                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-1 sm:px-6">
                                                                        <img src={data.vehicle_image} alt="" />
                                                                      </div>
                                                                    ))}
                                                                  </dl>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        ) : (
                                                          <button
                                                            type="button"
                                                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-cyan-200 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                                            onClick={openVehicleService}
                                                          >
                                                            View
                                                          </button>
                                                        )}
                                                      </td>
                                                    </tr>
                                                    )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-cyan-200 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Go Back
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetails;
