import React, { useState } from 'react'
import Layout from '../Layout'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { managerUrl } from '../../../API/Api';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

function ServiceList() {
    const [foodChecked, setFoodChecked] = useState(false);
    const [stageChecked, setStageChecked] = useState(false);
    const [decorateChecked, setDecorateChecked] = useState(false);
    const [photographyChecked, setPhotographyChecked] = useState(false);
    const [vehicleChecked, setVehicleChecked] = useState(false);

    const navigate = useNavigate()
    const serviceData = { foodChecked, stageChecked, decorateChecked, photographyChecked,vehicleChecked }
    const selectService = async () => {
        try {
            const token = localStorage.getItem('manager-token')
            await axios.post(`${managerUrl}services`, serviceData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((response) => {
                    if (response.data.success) {
                        navigate('/manager/add-services')
                    } else if(response.data.exist) {
                        navigate('/manager/add-services')
                        toast.success(response.data.message)
                    } else {
                        toast.error('Something error')
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <Layout />
            <div className='mt-12' style={{ backgroundColor: 'rgb(210, 240, 275)' }}>
                <div className="max-w-7xl mx-auto  py-12 sm:px-6 lg:px-8">
                    <div className="max-w-full mx-auto sm:ml-60">
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                            <div className="px-4 py-5 sm:px-6">
                                <h1 className="text-2xl text-center font-medium text-gray-900 font-serif">
                                    Select Your Service
                                </h1>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                    {/* {managerDetails?.email} */}
                                </p>
                            </div>
                            <div className="bg-cyan-400 hover:bg-cyan-500 px-4 rounded-2xl sm:p-0 xl:mx-72 sm:mx-5">
                                <ul role="list" class="p-6 divide-y divide-slate-800">
                                    <li class="flex py-4 first:pt-0 last:pb-0">
                                        <img class="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                        <div class="ml-3 overflow-hidden">
                                            <p class="text-sm font-medium text-slate-900 pt-2">Food Service</p>
                                            {/* <p class="text-sm text-slate-900 truncate">hdbghgd</p> */}
                                        </div>  
                                        <input type="checkbox" class="checked:bg-blue-500 mt-2 w-5 ml-44 h-5" 
                                        checked={foodChecked} onChange={() => setFoodChecked(!foodChecked)} />
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-cyan-400 hover:bg-cyan-500 px-4 my-5 xl:mx-72 rounded-2xl sm:p-0 sm:mx-5">
                                <ul role="list" class="p-6 divide-y divide-slate-800">
                                    <li class="flex py-4 first:pt-0 last:pb-0">
                                        <img class="h-10 w-10 rounded-full" src="/pexels-edo.jpg" alt="" />
                                        <div class="ml-3 overflow-hidden">
                                            <p class="text-sm font-medium text-slate-900 pt-2">Stage Service</p>
                                            {/* <p class="text-sm text-slate-900 truncate">hdbghgd</p> */}
                                        </div>
                                        <input type="checkbox" class="checked:bg-blue-400 mt-2 w-5 ml-44 h-5"
                                           checked={stageChecked} onChange={() => setStageChecked(!stageChecked)}  />
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-cyan-400 hover:bg-cyan-500 px-4 my-5 rounded-2xl sm:p-0 xl:mx-72 sm:mx-5 ">
                                <ul role="list" class="p-6 divide-y divide-slate-800">
                                    <li class="flex py-4 first:pt-0 last:pb-0">
                                        <img class="h-10 w-10 rounded-full" src="/evnt3.jpeg" alt="" />
                                        <div class="ml-3 overflow-hidden">
                                            <p class="text-sm font-medium text-slate-900 pt-2">Decoration</p>
                                            {/* <p class="text-sm text-slate-900 truncate">hdbghgd</p> */}
                                        </div>
                                        <input type="checkbox" class="checked:bg-blue-400 mt-2 w-5 ml-48 h-5"
                                           checked={decorateChecked} onChange={() => setDecorateChecked(!decorateChecked)}  />
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-cyan-400 hover:bg-cyan-500 px-4 my-5 rounded-2xl sm:p-0 xl:mx-72 sm:mx-5 ">
                                <ul role="list" class="p-6 divide-y divide-slate-800">
                                    <li class="flex py-4 first:pt-0 last:pb-0">
                                        <img class="h-10 w-10 rounded-full" src="/stage1.png" alt="" />
                                        <div class="ml-3 overflow-hidden">
                                            <p class="text-sm font-medium text-slate-900 pt-2">Photography</p>
                                            {/* <p class="text-sm text-slate-900 truncate">hdbghgd</p> */}
                                        </div>
                                        <input type="checkbox" class="checked:bg-blue-400 mt-2 w-5 ml-44 h-5"
                                          checked={photographyChecked} onChange={() => setPhotographyChecked(!photographyChecked)} />
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-cyan-400 hover:bg-cyan-500 px-4 my-5 rounded-2xl sm:p-0 xl:mx-72 sm:mx-5 ">
                                <ul role="list" class="p-6 divide-y divide-slate-800">
                                    <li class="flex py-4 first:pt-0 last:pb-0">
                                        <img class="h-10 w-10 rounded-full" src="/stage2.png" alt="" />
                                        <div class="ml-3 overflow-hidden">
                                            <p class="text-sm font-medium text-slate-900 pt-2">Luxury Vehicles</p>
                                            {/* <p class="text-sm text-slate-900 truncate">hdbghgd</p> */}
                                        </div>
                                        <input type="checkbox" class="checked:bg-blue-400 mt-2 w-5 ml-40 h-5"
                                        checked={vehicleChecked} onChange={() => setVehicleChecked(!vehicleChecked)} />
                                    </li>
                                </ul>
                            </div>
                            <div className='flex items-center'>
                                <button onClick={selectService} className="inline-flex items-center px-5 mt-4 my-10 mx-auto py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-cyan-300 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm">
                                    Select
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceList
