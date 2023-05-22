/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import { managerUrl } from '../../../API/Api';
import Layout from '../Layout';

function Services() {
  const [loading, setLoading] = useState(true);
  const [service, setService] = useState([]);
  const [catering, setCatering] = useState([]);
  const [cateringCategory, setCateringCategory] = useState('');
  const [stage, setStage] = useState([]);
  const [decoration, setDecoration] = useState([]);
  const [photography, setPhotography] = useState([]);
  const [vehicles, setvehicles] = useState([]);
  const [editFoodModal, setEditFoodModal] = useState(false);
  const [editStageModal, setEditStageModal] = useState(false);
  const [editDecorateModal, setEditDecorateModal] = useState(false);
  const [editphotographyModal, setEditphotographyModal] = useState(false);
  const [editvehiclesModal, setEditvehiclesModal] = useState(false);
  const [starters, setStarters] = useState(false);
  const [main, setMain] = useState(false);
  const [desserts, setDesserts] = useState(false);
  const [salads, setSalads] = useState(false);
  const [stagePhoto, setStagePhoto] = useState(false);
  const [stageBudget, setStageBudget] = useState(false);
  const [stageSize, setStageSize] = useState(false);
  const [decoratePhoto, setDecoratePhoto] = useState(false);
  const [includePhotos, setIncludePhotos] = useState(false);
  const [decorationBudget, setDecorationBudget] = useState(false);
  const [recentPhotos, setRecentPhotos] = useState(false);
  const [shopName, setShopName] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [address, setAddress] = useState(false);
  const [budget, setBudget] = useState(false);
  const [vehicle, setVehicle] = useState(false);
  const [ownerName, setOwnerName] = useState(false);
  const [mobileNumber, setMobileNumber] = useState(false);
  const [rentPrice, setRentPrice] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const removeCategory = (name) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes,Remove it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem('manager-token');
          await axios.post(`${managerUrl}remove-service?name=${name}`, {}, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((response) => {
            if (response.data.success) {
              Swal.fire(
                'Removed!',
                'Your service has been removed.',
                'success',
              ).then(() => {
                window.location.reload();
              });
            } else {
              toast.error('Something error');
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const submitService = () => {

  };

  const editFoodCategory = async () => {
    setEditFoodModal(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const closeEditFoodModal = async () => {
    setEditFoodModal(false);
  };

  const editStageCategory = async () => {
    setEditStageModal(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const closeEditStageModal = async () => {
    setEditStageModal(false);
  };

  const editDecorateCategory = async () => {
    setEditDecorateModal(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const closeEditDecorateModal = async () => {
    setEditDecorateModal(false);
  };

  const editphotographyCategory = async () => {
    setEditphotographyModal(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const closeEditphotographyModal = async () => {
    setEditphotographyModal(false);
  };

  const editvehiclesCategory = async () => {
    setEditvehiclesModal(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const closeEditvehiclesModal = async () => {
    setEditvehiclesModal(false);
  };

  useEffect(() => {
    const Services = async () => {
      try {
        const token = localStorage.getItem('manager-token');
        await axios.post(
          `${managerUrl}view-services`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        ).then((response) => {
          if (response.data.success) {
            const serviceData = response.data.data;
            const catering = serviceData.cateringMenu;
            const cateringCategories = catering[0];
            const stage = serviceData.stageMenu;
            const decoration = serviceData.decorationMenu;
            const photography = serviceData.photographyMenu;
            const vehicles = serviceData.luxuryVehicleMenu;
            setService(serviceData);
            setCatering(catering);
            setCateringCategory(cateringCategories);
            setStage(stage);
            setDecoration(decoration);
            setPhotography(photography);
            setvehicles(vehicles);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    Services();
  }, []);

  return (
    <div>
      <Layout>
        {
                    loading ? (
                      <div className="spinner-container">
                        <div className="loading-spinner" />
                      </div>
                    ) : (
                      <div className="mt-[7rem]">
                        <body className="">
                          <main className="container mx-auto mt-8 px-4">
                            <section className="bg-cyan-300 shadow-lg rounded-lg p-8">
                              <h2 className="text-xl font-normal mb-6 text-center font-serif">Your Selected Services</h2>
                              <div className="bg-slate-200 rounded-2xl xl:mx-72 sm:mx-5">
                                <ul role="list" className="p-6 divide-y divide-slate-300">
                                  {service.catering_status === true
                                                    && (
                                                    <div className="py-4">
                                                      <li className="flex py-6 first:pt-0 last:pb-0 justify-between">
                                                        <img className="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                        <div className="ml-3 overflow-hidden">
                                                          <p className="text-sm font-medium text-slate-900 pt-2">{service.catering_name}</p>
                                                        </div>
                                                        <button onClick={() => removeCategory(service.catering_name)} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded " type="button">Remove</button>
                                                      </li>
                                                    </div>
                                                    )}
                                  {service.stage_status === true
                                                    && (
                                                    <div className="py-4">
                                                      <li className="flex py-4 first:pt-0 last:pb-0 justify-between">
                                                        <img className="h-10 w-10 rounded-full" src="/pexels-edo.jpg" alt="" />
                                                        <div className="ml-3 overflow-hidden">
                                                          <p className="text-sm font-medium text-slate-900 pt-2">{service.stage_name}</p>
                                                        </div>
                                                        <button onClick={() => removeCategory(service.stage_name)} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded " type="button">Remove</button>
                                                      </li>
                                                    </div>
                                                    )}
                                  {service.decoration_status === true
                                                    && (
                                                    <div className="py-4">
                                                      <li className="flex py-4 first:pt-0 last:pb-0 justify-between">
                                                        <img className="h-10 w-10 rounded-full" src="/evnt3.jpeg" alt="" />
                                                        <div className="ml-3 overflow-hidden">
                                                          <p className="text-sm font-medium text-slate-900 pt-2">{service.decoration_name}</p>
                                                        </div>
                                                        <button onClick={() => removeCategory(service.decoration_name)} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded " type="button">Remove</button>
                                                      </li>
                                                    </div>
                                                    )}
                                  {service.photography_status === true
                                                    && (
                                                    <div className="py-4">
                                                      <li className="flex py-4 first:pt-0 last:pb-0 justify-between">
                                                        <img className="h-10 w-10 rounded-full" src="/stage1.png" alt="" />
                                                        <div className="ml-3 overflow-hidden">
                                                          <p className="text-sm font-medium text-slate-900 pt-2">{service.photography_name}</p>
                                                        </div>
                                                        <button onClick={() => removeCategory(service.photography_name)} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded " type="button">Remove</button>
                                                      </li>
                                                    </div>
                                                    )}
                                  {service.vehicle_status === true
                                                    && (
                                                    <div className="py-4">
                                                      <li className="flex py-4 first:pt-0 last:pb-0 justify-between">
                                                        <img className="h-10 w-10 rounded-full" src="/stage2.png" alt="" />
                                                        <div className="ml-3 overflow-hidden">
                                                          <p className="text-sm font-medium text-slate-900 pt-2">{service.vehicle_name}</p>
                                                        </div>
                                                        <button onClick={() => removeCategory(service.vehicle_name)} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded " type="button">Remove</button>
                                                      </li>
                                                    </div>
                                                    )}
                                </ul>
                              </div>
                              <body className="mt-[6rem] bg-cyan-300">
                                <div className="overflow-x-auto">
                                  <div className="inline-block min-w-full">
                                    <div className="shadow overflow-hidden border-b sm:rounded-lg">
                                      <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-slate-300">
                                          <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                              Services
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                              Categories
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                              Edit category
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody className="bg-slate-400 divide-y divide-gray-200">
                                          {service.catering_status === true
                                                                    && (
                                                                    <tr className="hover:bg-slate-200 transition duration-300">
                                                                      <td className="px-6 py-4 whitespace-nowrap">
                                                                        <div className="flex items-center">
                                                                          <div className="flex-shrink-0 h-10 w-10">
                                                                            <img className="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                          </div>
                                                                          <div className="ml-4">
                                                                            <div className="text-sm font-medium text-gray-900">
                                                                              {service.catering_name}
                                                                            </div>
                                                                            <div className="text-sm text-gray-500">
                                                                              {/* {data.name} */}
                                                                            </div>
                                                                          </div>
                                                                        </div>
                                                                      </td>
                                                                      <td className="px-6 py-4 whitespace-nowrap">
                                                                        <div className="flex items-center">
                                                                          {catering.map((data) => (
                                                                            <div className="">
                                                                              <div className="text-sm font-medium text-gray-900 py-2">
                                                                                {data.category_name[0]}
                                                                              </div>
                                                                              <div className="text-sm font-medium text-gray-900 py-2">
                                                                                {data.category_name[1]}
                                                                              </div>
                                                                              <div className="text-sm font-medium text-gray-900 py-2">
                                                                                {data.category_name[2]}
                                                                              </div>
                                                                              <div className="text-sm font-medium text-gray-900 py-2">
                                                                                {data.category_name[3]}
                                                                              </div>
                                                                            </div>
                                                                          ))}
                                                                        </div>
                                                                      </td>
                                                                      {editFoodModal ? (
                                                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-12">
                                                                          <div className="max-w-full p-6 bg-white divide-y divide-gray-500">
                                                                            <div className="flex items-center justify-between">
                                                                              <h3 className="text-2xl">Add Category</h3>
                                                                              <svg
                                                                                onClick={closeEditFoodModal}
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

                                                                              <form onSubmit={submitService} className="">
                                                                                <div className="md:flex md:items-center mt-3 ">
                                                                                  <ul role="list" className="p-6 divide-y divide-slate-800">
                                                                                    <li className="flex  first:pt-0 last:pb-0 sm:grid sm:grid-cols-3 sm:gap-[5rem]">
                                                                                      <img className="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                      <div className="ml-3 overflow-hidden">
                                                                                        <p className="text-sm font-medium text-slate-900 pt-2">{cateringCategory.category_name[0]}</p>
                                                                                      </div>
                                                                                      <input
                                                                                        type="checkbox"
                                                                                        className="checked:bg-blue-500 mt-2 w-5 h-5"
                                                                                        checked={starters}
                                                                                        onChange={() => setStarters(!starters)}
                                                                                      />
                                                                                    </li>
                                                                                  </ul>
                                                                                </div>
                                                                                <div className="md:flex md:items-center">
                                                                                  <ul role="list" className="p-6 divide-y divide-slate-800">
                                                                                    <li className="flex  first:pt-0 last:pb-0  sm:grid sm:grid-cols-3 sm:gap-[6rem]">
                                                                                      <img className="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                      <div className="ml-3 overflow-hidden">
                                                                                        <p className="text-sm font-medium text-slate-900 pt-2">{cateringCategory.category_name[1]}</p>
                                                                                      </div>
                                                                                      <input
                                                                                        type="checkbox"
                                                                                        className="checked:bg-blue-500 sm:ml-2 mt-2 w-5  h-5"
                                                                                        checked={main}
                                                                                        onChange={() => setMain(!main)}
                                                                                      />
                                                                                    </li>
                                                                                  </ul>
                                                                                </div>
                                                                                <div className="md:flex md:items-center">
                                                                                  <ul role="list" className="p-6 divide-y divide-slate-800">
                                                                                    <li className="flex  first:pt-0 last:pb-0  sm:grid sm:grid-cols-3 sm:gap-[4rem]">
                                                                                      <img className="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                      <div className="ml-3 overflow-hidden">
                                                                                        <p className="text-sm font-medium text-slate-900 pt-2">{cateringCategory.category_name[2]}</p>
                                                                                      </div>
                                                                                      <input
                                                                                        type="checkbox"
                                                                                        className="checked:bg-blue-500 sm:ml-5 mt-2 w-5 h-5"
                                                                                        checked={desserts}
                                                                                        onChange={() => setDesserts(!desserts)}
                                                                                      />
                                                                                    </li>
                                                                                  </ul>
                                                                                </div>
                                                                                <div className="md:flex md:items-center">
                                                                                  <ul role="list" className="p-6 divide-y divide-slate-800">
                                                                                    <li className="flex  first:pt-0 last:pb-0 sm:grid sm:grid-cols-3 sm:gap-[5rem]">
                                                                                      <img className="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                      <div className="ml-3 overflow-hidden">
                                                                                        <p className="text-sm font-medium text-slate-900 pt-2">{cateringCategory.category_name[3]}</p>
                                                                                      </div>
                                                                                      <input
                                                                                        type="checkbox"
                                                                                        className="checked:bg-blue-500 mt-2 sm:ml-4 w-5 h-5"
                                                                                        checked={salads}
                                                                                        onChange={() => setSalads(!salads)}
                                                                                      />
                                                                                    </li>
                                                                                  </ul>
                                                                                </div>
                                                                                <div className="md:flex md:items-center mb-6  sm:grid sm:grid-cols-2">
                                                                                  <div className="md:w-1/3" />
                                                                                </div>
                                                                                <div className="md:flex md:items-center  sm:grid sm:grid-cols-2">
                                                                                  <div className="md:w-1/3" />
                                                                                  <div className="md:w-2/3">
                                                                                    <button onClick={() => removeCategory()} className="shadow bg-red-500 hover:bg-red-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                                                                      Remove
                                                                                    </button>
                                                                                  </div>
                                                                                </div>
                                                                              </form>
                                                                              {/* ))} */}
                                                                            </div>
                                                                          </div>
                                                                        </div>
                                                                      ) : (
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                          <button onClick={editFoodCategory} className="px-4 py-2 ml-5 text-white bg-blue-600 rounded " type="button">Edit</button>
                                                                        </td>
                                                                      )}
                                                                    </tr>
                                                                    )}
                                          {service.stage_status === true
                                                                    && (
                                                                    <tr className="hover:bg-slate-200 transition duration-300">
                                                                      <td className="px-6 py-4 whitespace-nowrap">
                                                                        <div className="flex items-center">
                                                                          <div className="flex-shrink-0 h-10 w-10">
                                                                            <img className="h-10 w-10 rounded-full" src="/pexels-edo.jpg" alt="" />
                                                                          </div>
                                                                          <div className="ml-4">
                                                                            <div className="text-sm font-medium text-gray-900">
                                                                              {service.stage_name}
                                                                            </div>
                                                                            <div className="text-sm text-gray-500">
                                                                              {/* {data.name} */}
                                                                            </div>
                                                                          </div>
                                                                        </div>
                                                                      </td>
                                                                      <td className="px-6 py-4 whitespace-nowrap">
                                                                        <div className="flex items-center">
                                                                          {stage.map((data) => (
                                                                            <div className="">
                                                                              <div className="text-sm font-medium text-gray-900 py-2">
                                                                                {data.category_name[0]}
                                                                              </div>
                                                                              <div className="text-sm font-medium text-gray-900 py-2">
                                                                                {data.category_name[1]}
                                                                              </div>
                                                                              <div className="text-sm font-medium text-gray-900 py-2">
                                                                                {data.category_name[2]}
                                                                              </div>
                                                                              <div className="text-sm font-medium text-gray-900 py-2">
                                                                                {data.category_name[3]}
                                                                              </div>
                                                                            </div>
                                                                          ))}
                                                                        </div>
                                                                      </td>
                                                                      {editStageModal ? (

                                                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-12">
                                                                          <div className="max-w-full p-6 bg-white divide-y divide-gray-500">
                                                                            <div className="flex items-center justify-between">
                                                                              <h3 className="text-2xl">Add Category</h3>
                                                                              <svg
                                                                                onClick={closeEditStageModal}
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
                                                                              {stage.map((data) => (
                                                                                <form onSubmit={submitService} className="">
                                                                                  <div className="md:flex md:items-center mt-3 ">
                                                                                    <ul role="list" className="p-6 divide-y divide-slate-800">
                                                                                      <li className="flex  first:pt-0 last:pb-0 sm:grid sm:grid-cols-3 sm:gap-[6rem]">
                                                                                        <img className="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                        <div className="ml-3 overflow-hidden">
                                                                                          <p className="text-sm font-medium text-slate-900 pt-2">{data.category_name[0]}</p>
                                                                                        </div>
                                                                                        <input
                                                                                          type="checkbox"
                                                                                          className="checked:bg-blue-500 mt-2 w-5 h-5"
                                                                                          checked={stagePhoto}
                                                                                          onChange={() => setStagePhoto(!stagePhoto)}
                                                                                        />
                                                                                      </li>
                                                                                    </ul>
                                                                                  </div>
                                                                                  <div className="md:flex md:items-center">
                                                                                    <ul role="list" className="p-6 divide-y divide-slate-800">
                                                                                      <li className="flex  first:pt-0 last:pb-0  sm:grid sm:grid-cols-3 sm:gap-[5rem]">
                                                                                        <img className="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                        <div className="ml-3 overflow-hidden">
                                                                                          <p className="text-sm font-medium text-slate-900 pt-2">{data.category_name[1]}</p>
                                                                                        </div>
                                                                                        <input
                                                                                          type="checkbox"
                                                                                          className="checked:bg-blue-500 ml-4 mt-2 w-5  h-5"
                                                                                          checked={stageBudget}
                                                                                          onChange={() => setStageBudget(!stageBudget)}
                                                                                        />
                                                                                      </li>
                                                                                    </ul>
                                                                                  </div>
                                                                                  <div className="md:flex md:items-center">
                                                                                    <ul role="list" className="p-6 divide-y divide-slate-800">
                                                                                      <li className="flex  first:pt-0 last:pb-0  sm:grid sm:grid-cols-3 sm:gap-[6rem]">
                                                                                        <img className="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                        <div className="ml-3 overflow-hidden">
                                                                                          <p className="text-sm font-medium text-slate-900 pt-2">{data.category_name[2]}</p>
                                                                                        </div>
                                                                                        <input
                                                                                          type="checkbox"
                                                                                          className="checked:bg-blue-500 sm:ml-5 mt-2 w-5 h-5"
                                                                                          checked={stageSize}
                                                                                          onChange={() => setStageSize(!stageSize)}
                                                                                        />
                                                                                      </li>
                                                                                    </ul>
                                                                                  </div>
                                                                                  <div className="md:flex md:items-center mb-6  sm:grid sm:grid-cols-2">
                                                                                    <div className="md:w-1/3" />
                                                                                  </div>
                                                                                  <div className="md:flex md:items-center  sm:grid sm:grid-cols-2">
                                                                                    <div className="md:w-1/3" />
                                                                                    <div className="md:w-2/3">
                                                                                      <button className="shadow bg-red-500 hover:bg-red-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                                                                        Remove
                                                                                      </button>
                                                                                    </div>
                                                                                  </div>
                                                                                </form>
                                                                              ))}
                                                                            </div>
                                                                          </div>
                                                                        </div>
                                                                      ) : (
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                          <button onClick={editStageCategory} className="px-4 py-2 ml-5 text-white bg-blue-600 rounded " type="button">Edit</button>
                                                                        </td>
                                                                      )}
                                                                    </tr>
                                                                    )}
                                          {service.decoration_status === true
                                                                    && (
                                                                    <tr className="hover:bg-slate-200 transition duration-300">
                                                                      <td className="px-6 py-4 whitespace-nowrap">
                                                                        <div className="flex items-center">
                                                                          <div className="flex-shrink-0 h-10 w-10">
                                                                            <img className="h-10 w-10 rounded-full" src="/evnt3.jpeg" alt="" />
                                                                          </div>
                                                                          <div className="ml-4">
                                                                            <div className="text-sm font-medium text-gray-900">
                                                                              {service.decoration_name}
                                                                            </div>
                                                                            <div className="text-sm text-gray-500">
                                                                              {/* {data.name} */}
                                                                            </div>
                                                                          </div>
                                                                        </div>
                                                                      </td>
                                                                      <td className="px-6 py-4 whitespace-nowrap">
                                                                        <div className="flex items-center">
                                                                          {decoration.map((data) => (
                                                                            <div className="">
                                                                              <div className="text-sm font-medium text-gray-900 py-2">
                                                                                {data.category_name[0]}
                                                                              </div>
                                                                              <div className="text-sm font-medium text-gray-900 py-2">
                                                                                {data.category_name[1]}
                                                                              </div>
                                                                              <div className="text-sm font-medium text-gray-900 py-2">
                                                                                {data.category_name[2]}
                                                                              </div>
                                                                              <div className="text-sm font-medium text-gray-900 py-2">
                                                                                {data.category_name[3]}
                                                                              </div>
                                                                            </div>
                                                                          ))}
                                                                        </div>
                                                                      </td>
                                                                      {editDecorateModal ? (

                                                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-12">
                                                                          <div className="max-w-full p-6 bg-white divide-y divide-gray-500">
                                                                            <div className="flex items-center justify-between">
                                                                              <h3 className="text-2xl">Add Category</h3>
                                                                              <svg
                                                                                onClick={closeEditDecorateModal}
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
                                                                              {decoration.map((data) => (
                                                                                <form onSubmit={submitService} className="">
                                                                                  <div className="md:flex md:items-center mt-3 ">
                                                                                    <ul role="list" className="p-6 divide-y divide-slate-800">
                                                                                      <li className="flex  first:pt-0 last:pb-0 sm:grid sm:grid-cols-3 sm:gap-[6rem]">
                                                                                        <img className="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                        <div className="ml-3 overflow-hidden">
                                                                                          <p className="text-sm font-medium text-slate-900 pt-2">{data.category_name[0]}</p>
                                                                                          {/* <p class="text-sm text-slate-900 truncate">hdbghgd</p> */}
                                                                                        </div>
                                                                                        <input
                                                                                          type="checkbox"
                                                                                          className="checked:bg-blue-500 mt-2 w-5 h-5"
                                                                                          checked={decoratePhoto}
                                                                                          onChange={() => setDecoratePhoto(!decoratePhoto)}
                                                                                        />
                                                                                      </li>
                                                                                    </ul>
                                                                                  </div>
                                                                                  <div className="md:flex md:items-center">
                                                                                    <ul role="list" className="p-6 divide-y divide-slate-800">
                                                                                      <li className="flex  first:pt-0 last:pb-0  sm:grid sm:grid-cols-3 sm:gap-[6rem]">
                                                                                        <img className="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                        <div className="ml-3 overflow-hidden">
                                                                                          <p className="text-sm font-medium text-slate-900 pt-2">{data.category_name[1]}</p>
                                                                                          {/* <p class="text-sm text-slate-900 truncate">hdbghgd</p> */}
                                                                                        </div>
                                                                                        <input
                                                                                          type="checkbox"
                                                                                          className="checked:bg-blue-500 sm:ml-3 mt-2 w-5  h-5"
                                                                                          checked={includePhotos}
                                                                                          onChange={() => setIncludePhotos(!includePhotos)}
                                                                                        />
                                                                                      </li>
                                                                                    </ul>
                                                                                  </div>
                                                                                  <div className="md:flex md:items-center">
                                                                                    <ul role="list" className="p-6 divide-y divide-slate-800">
                                                                                      <li className="flex  first:pt-0 last:pb-0  sm:grid sm:grid-cols-3 sm:gap-[5rem]">
                                                                                        <img className="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                        <div className="ml-3 overflow-hidden">
                                                                                          <p className="text-sm font-medium text-slate-900 pt-2">{data.category_name[2]}</p>
                                                                                          {/* <p class="text-sm text-slate-900 truncate">hdbghgd</p> */}
                                                                                        </div>
                                                                                        <input
                                                                                          type="checkbox"
                                                                                          className="checked:bg-blue-500 sm:ml-5 mt-2 w-5 h-5"
                                                                                          checked={decorationBudget}
                                                                                          onChange={() => setDecorationBudget(!decorationBudget)}
                                                                                        />
                                                                                      </li>
                                                                                    </ul>
                                                                                  </div>
                                                                                  <div className="md:flex md:items-center mb-6  sm:grid sm:grid-cols-2">
                                                                                    <div className="md:w-1/3" />
                                                                                  </div>
                                                                                  <div className="md:flex md:items-center  sm:grid sm:grid-cols-2">
                                                                                    <div className="md:w-1/3" />
                                                                                    <div className="md:w-2/3">
                                                                                      <button className="shadow  bg-red-500 hover:bg-red-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                                                                        Remove
                                                                                      </button>
                                                                                    </div>
                                                                                  </div>
                                                                                </form>
                                                                              ))}
                                                                            </div>
                                                                          </div>
                                                                        </div>
                                                                      ) : (
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                          <button onClick={editDecorateCategory} className="px-4 py-2 ml-5 text-white bg-blue-600 rounded " type="button">Edit</button>
                                                                        </td>
                                                                      )}
                                                                    </tr>
                                                                    )}
                                          {service.photography_status === true
                                                                    && (
                                                                    <tr className="hover:bg-slate-200 transition duration-300">
                                                                      <td className="px-6 py-4 whitespace-nowrap">
                                                                        <div className="flex items-center">
                                                                          <div className="flex-shrink-0 h-10 w-10">
                                                                            <img className="h-10 w-10 rounded-full" src="/stage1.png" alt="" />
                                                                          </div>
                                                                          <div className="ml-4">
                                                                            <div className="text-sm font-medium text-gray-900">
                                                                              {service.photography_name}
                                                                            </div>
                                                                            <div className="text-sm text-gray-500">
                                                                              {/* {data.name} */}
                                                                            </div>
                                                                          </div>
                                                                        </div>
                                                                      </td>
                                                                      <td className="px-6 py-4 whitespace-nowrap">
                                                                        <div className="flex items-center">
                                                                          {photography.map((data) => (
                                                                            <div className="">
                                                                              <div className="text-sm font-medium text-gray-900 py-2">
                                                                                {data.category_name[0]}
                                                                              </div>
                                                                              <div className="text-sm font-medium text-gray-900 py-2">
                                                                                {data.category_name[1]}
                                                                              </div>
                                                                              <div className="text-sm font-medium text-gray-900 py-2">
                                                                                {data.category_name[2]}
                                                                              </div>
                                                                              <div className="text-sm font-medium text-gray-900 py-2">
                                                                                {data.category_name[3]}
                                                                              </div>
                                                                              <div className="text-sm font-medium text-gray-900 py-2">
                                                                                {data.category_name[4]}
                                                                              </div>
                                                                            </div>
                                                                          ))}
                                                                        </div>
                                                                      </td>
                                                                      {editphotographyModal ? (

                                                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-12">
                                                                          <div className="max-w-full p-6 bg-white divide-y divide-gray-500 md:mt-16 mt-28">
                                                                            <div className="flex justify-between md:px-24">
                                                                              <h3 className="text-2xl">Add Category</h3>
                                                                              <svg
                                                                                onClick={closeEditphotographyModal}
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
                                                                              {photography.map((data) => (
                                                                                <form onSubmit={submitService} className="">
                                                                                  <div className="mt-3 ">
                                                                                    <ul role="list" className="p-6 divide-y divide-slate-800">
                                                                                      <li className="flex  first:pt-0 last:pb-0 justify-between">
                                                                                        <img className="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                        <div className="ml-3 overflow-hidden">
                                                                                          <p className="text-sm font-medium text-slate-900 pt-2">{data.category_name[0]}</p>
                                                                                          {/* <p class="text-sm text-slate-900 truncate">hdbghgd</p> */}
                                                                                        </div>
                                                                                        <input
                                                                                          type="checkbox"
                                                                                          className="checked:bg-blue-500 mt-2 w-5 h-5"
                                                                                          checked={recentPhotos}
                                                                                          onChange={() => setRecentPhotos(!recentPhotos)}
                                                                                        />
                                                                                      </li>
                                                                                    </ul>
                                                                                  </div>
                                                                                  <div className="">
                                                                                    <ul role="list" className="p-6 divide-y divide-slate-800">
                                                                                      <li className="flex  first:pt-0 last:pb-0  justify-between">
                                                                                        <img className="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                        <div className="ml-3 overflow-hidden">
                                                                                          <p className="text-sm font-medium text-slate-900 pt-2">{data.category_name[1]}</p>
                                                                                          {/* <p class="text-sm text-slate-900 truncate">hdbghgd</p> */}
                                                                                        </div>
                                                                                        <input
                                                                                          type="checkbox"
                                                                                          className="checked:bg-blue-500  mt-2 w-5  h-5"
                                                                                          checked={shopName}
                                                                                          onChange={() => setShopName(!shopName)}
                                                                                        />
                                                                                      </li>
                                                                                    </ul>
                                                                                  </div>
                                                                                  <div className="">
                                                                                    <ul role="list" className="p-6 divide-y divide-slate-800">
                                                                                      <li className="flex  first:pt-0 last:pb-0 justify-between">
                                                                                        <img className="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                        <div className="ml-3 overflow-hidden">
                                                                                          <p className="text-sm font-medium text-slate-900 pt-2">{data.category_name[2]}</p>
                                                                                        </div>
                                                                                        <input
                                                                                          type="checkbox"
                                                                                          className="checked:bg-blue-500 sm:ml-1 mt-2 w-5 h-5"
                                                                                          checked={mobile}
                                                                                          onChange={() => setMobile(!mobile)}
                                                                                        />
                                                                                      </li>
                                                                                    </ul>
                                                                                  </div>
                                                                                  <div className="">
                                                                                    <ul role="list" className="p-6 divide-y divide-slate-800">
                                                                                      <li className="flex  first:pt-0 last:pb-0 justify-between">
                                                                                        <img className="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                        <div className="ml-3 overflow-hidden">
                                                                                          <p className="text-sm font-medium text-slate-900 pt-2">{data.category_name[3]}</p>
                                                                                        </div>
                                                                                        <input
                                                                                          type="checkbox"
                                                                                          className="checked:bg-blue-500 sm:ml-1 mt-2 w-5 h-5"
                                                                                          checked={address}
                                                                                          onChange={() => setAddress(!address)}
                                                                                        />
                                                                                      </li>
                                                                                    </ul>
                                                                                  </div>
                                                                                  <div className="">
                                                                                    <ul role="list" className="p-6 divide-y divide-slate-800">
                                                                                      <li className="flex  first:pt-0 last:pb-0 justify-between">
                                                                                        <img className="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                        <div className="ml-3 overflow-hidden">
                                                                                          <p className="text-sm font-medium text-slate-900 pt-2">{data.category_name[4]}</p>
                                                                                        </div>
                                                                                        <input
                                                                                          type="checkbox"
                                                                                          className="checked:bg-blue-500 sm:ml-1 mt-2 w-5 h-5"
                                                                                          checked={budget}
                                                                                          onChange={() => setBudget(!budget)}
                                                                                        />
                                                                                      </li>
                                                                                    </ul>
                                                                                  </div>
                                                                                  <div className="md:flex md:items-center mb-6  sm:grid sm:grid-cols-2">
                                                                                    <div className="md:w-1/3" />
                                                                                  </div>
                                                                                  <div className="md:flex md:items-center  sm:grid sm:grid-cols-2">
                                                                                    <div className="md:w-1/3" />
                                                                                    <div className="md:w-2/3">
                                                                                      <button className="shadow bg-red-500 hover:bg-red-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                                                                        Remove
                                                                                      </button>
                                                                                    </div>
                                                                                  </div>
                                                                                </form>
                                                                              ))}
                                                                            </div>
                                                                          </div>
                                                                        </div>
                                                                      ) : (
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                          <button onClick={editphotographyCategory} className="px-4 py-2 ml-5 text-white bg-blue-600 rounded " type="button">Edit</button>
                                                                        </td>
                                                                      )}
                                                                    </tr>
                                                                    )}
                                          {service.vehicle_status === true
                                                                    && (
                                                                    <tr className="hover:bg-slate-200 transition duration-300">
                                                                      <td className="px-6 py-4 whitespace-nowrap">
                                                                        <div className="flex items-center">
                                                                          <div className="flex-shrink-0 h-10 w-10">
                                                                            <img className="h-10 w-10 rounded-full" src="/stage2.png" alt="" />
                                                                          </div>
                                                                          <div className="ml-4">
                                                                            <div className="text-sm font-medium text-gray-900">
                                                                              {service.vehicle_name}
                                                                            </div>
                                                                            <div className="text-sm text-gray-500">
                                                                              {/* {data.name} */}
                                                                            </div>
                                                                          </div>
                                                                        </div>
                                                                      </td>
                                                                      <td className="px-6 py-4 whitespace-nowrap">
                                                                        <div className="flex items-center">
                                                                          {vehicles.map((data) => (
                                                                            <div className="">
                                                                              <div className="text-sm font-medium text-gray-900 py-2">
                                                                                {data.category_name[0]}
                                                                              </div>
                                                                              <div className="text-sm font-medium text-gray-900 py-2">
                                                                                {data.category_name[1]}
                                                                              </div>
                                                                              <div className="text-sm font-medium text-gray-900 py-2">
                                                                                {data.category_name[2]}
                                                                              </div>
                                                                              <div className="text-sm font-medium text-gray-900 py-2">
                                                                                {data.category_name[3]}
                                                                              </div>
                                                                            </div>
                                                                          ))}
                                                                        </div>
                                                                      </td>
                                                                      {editvehiclesModal ? (

                                                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-12">
                                                                          <div className="max-w-full p-6 bg-white divide-y divide-gray-500">
                                                                            <div className="flex items-center justify-between">
                                                                              <h3 className="text-2xl">Add Category</h3>
                                                                              <svg
                                                                                onClick={closeEditvehiclesModal}
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
                                                                              {vehicles.map((data) => (
                                                                                <form onSubmit={submitService} className="">
                                                                                  <div className="md:flex md:items-center mt-3 ">
                                                                                    <ul role="list" className="p-6 divide-y divide-slate-800">
                                                                                      <li className="flex  first:pt-0 last:pb-0 sm:grid sm:grid-cols-3 sm:gap-[3rem]">
                                                                                        <img className="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                        <div className="ml-3 overflow-hidden">
                                                                                          <p className="text-sm font-medium text-slate-900 pt-2">{data.category_name[0]}</p>
                                                                                        </div>
                                                                                        <input
                                                                                          type="checkbox"
                                                                                          className="checked:bg-blue-500 mt-2 w-5 h-5"
                                                                                          checked={vehicle}
                                                                                          onChange={() => setVehicle(!vehicle)}
                                                                                        />
                                                                                      </li>
                                                                                    </ul>
                                                                                  </div>
                                                                                  <div className="md:flex md:items-center">
                                                                                    <ul role="list" className="p-6 divide-y divide-slate-800">
                                                                                      <li className="flex  first:pt-0 last:pb-0  sm:grid sm:grid-cols-3 sm:gap-[6rem]">
                                                                                        <img className="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                        <div className="ml-3 overflow-hidden">
                                                                                          <p className="text-sm font-medium text-slate-900 pt-2">{data.category_name[1]}</p>
                                                                                        </div>
                                                                                        <input
                                                                                          type="checkbox"
                                                                                          className="checked:bg-blue-500 mt-2 w-5  h-5"
                                                                                          checked={ownerName}
                                                                                          onChange={() => setOwnerName(!ownerName)}
                                                                                        />
                                                                                      </li>
                                                                                    </ul>
                                                                                  </div>
                                                                                  <div className="md:flex md:items-center">
                                                                                    <ul role="list" className="p-6 divide-y divide-slate-800">
                                                                                      <li className="flex  first:pt-0 last:pb-0  sm:grid sm:grid-cols-3 sm:gap-[9rem]">
                                                                                        <img className="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                        <div className="ml-3 overflow-hidden">
                                                                                          <p className="text-sm font-medium text-slate-900 pt-2">{data.category_name[2]}</p>
                                                                                        </div>
                                                                                        <input
                                                                                          type="checkbox"
                                                                                          className="checked:bg-blue-500 sm:ml-1 mt-2 w-5 h-5"
                                                                                          checked={mobileNumber}
                                                                                          onChange={() => setMobileNumber(!mobileNumber)}
                                                                                        />
                                                                                      </li>
                                                                                    </ul>
                                                                                  </div>
                                                                                  <div className="md:flex md:items-center">
                                                                                    <ul role="list" className="p-6 divide-y divide-slate-800">
                                                                                      <li className="flex  first:pt-0 last:pb-0  sm:grid sm:grid-cols-3 sm:gap-[9rem]">
                                                                                        <img className="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                        <div className="ml-3 overflow-hidden">
                                                                                          <p className="text-sm font-medium text-slate-900 pt-2">{data.category_name[3]}</p>
                                                                                        </div>
                                                                                        <input
                                                                                          type="checkbox"
                                                                                          className="checked:bg-blue-500 sm:ml-1 mt-2 w-5 h-5"
                                                                                          checked={rentPrice}
                                                                                          onChange={() => setRentPrice(!rentPrice)}
                                                                                        />
                                                                                      </li>
                                                                                    </ul>
                                                                                  </div>
                                                                                  <div className="md:flex md:items-center mb-6  sm:grid sm:grid-cols-2">
                                                                                    <div className="md:w-1/3" />
                                                                                  </div>
                                                                                  <div className="md:flex md:items-center  sm:grid sm:grid-cols-2">
                                                                                    <div className="md:w-1/3" />
                                                                                    <div className="md:w-2/3">
                                                                                      <button className="shadow bg-red-500 hover:bg-red-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                                                                        Remove
                                                                                      </button>
                                                                                    </div>
                                                                                  </div>
                                                                                </form>
                                                                              ))}
                                                                            </div>
                                                                          </div>
                                                                        </div>
                                                                      ) : (
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                          <button onClick={editvehiclesCategory} className="px-4 py-2 ml-5 text-white bg-blue-600 rounded " type="button">Edit</button>
                                                                        </td>
                                                                      )}
                                                                    </tr>
                                                                    )}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </body>
                            </section>
                          </main>
                        </body>
                      </div>
                    )
                }
      </Layout>
    </div>
  );
}

export default Services;
