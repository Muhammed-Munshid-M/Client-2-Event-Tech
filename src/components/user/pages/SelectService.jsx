import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import axios from 'axios';
import { userUrl } from '../../../API/Api';
import { useDispatch, useSelector } from 'react-redux';
import { setService } from '../../redux/services';
import { useNavigate } from 'react-router-dom';

function SelectService() {
    const [loading, setLoading] = useState(true)
    const [foodChecked, setFoodChecked] = useState(false);
    const [stageChecked, setStageChecked] = useState(false);
    const [decorateChecked, setDecorateChecked] = useState(false);
    const [photographyChecked, setPhotographyChecked] = useState(false);
    const [vehicleChecked, setVehicleChecked] = useState(false);
    const [services, setServices] = useState()
    const managerDetails = useSelector((state) => state.company);
    const managerId = managerDetails.company.managerDetails._id
    const dispatch = useDispatch(setService)
    const navigate = useNavigate()
    const serviceData = { foodChecked, stageChecked, decorateChecked, photographyChecked,vehicleChecked }

    useEffect(()=>{
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    })
    
    const submitService = async() => {
        try {
            const token = localStorage.getItem('token')
            await axios.post(`${userUrl}select-services/${managerId}`, serviceData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((response) => {
                    if (response.data.success) {
                        navigate('/select-menu-list')
                    } else {
                        toast.error('Something error')
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        const Services = async () => {
            try {
                const token = localStorage.getItem('token')
                await axios.post(`${userUrl}services/${managerId}`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then((response) => {
                        if (response.data.success) {
                            const serviceData = response.data.data
                            setServices(serviceData)
                            dispatch(setService({serviceData}))
                        } else {
                            toast.error('Something error')
                        }
                    })
            } catch (error) {
                console.log(error);
            }
        }
        Services()
    },[])
    return (
        <div>
            <Navbar />
            {loading ? (
                <p>Loading...</p>
            ):(
            <div className='mt-16' style={{ backgroundColor: 'rgb(210, 240, 275)' }}>
                <div className="max-w-7xl mx-auto  py-12 sm:px-6 lg:px-8">
                    <div className="max-w-full mx-auto sm:mx-32">
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                            <div className="px-4 py-5 sm:px-6">
                                <h1 className='text-center text-4xl font-serif font-medium'>Select Service</h1>
                            </div>
                            {services.catering_status == true && 
                            <div className="bg-slate-200 hover:bg-slate-300 px-4 rounded-2xl sm:p-0 xl:mx-72 sm:mx-5">
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
                            }
                            {services.stage_status == true && 
                            <div className="bg-slate-200 hover:bg-slate-300 px-4 my-5 xl:mx-72 rounded-2xl sm:p-0 sm:mx-5">
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
                            }
                            {services.decoration_status == true && 
                            <div className="bg-slate-200 hover:bg-slate-300 px-4 my-5 rounded-2xl sm:p-0 xl:mx-72 sm:mx-5 ">
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
                            }
                            {services.photography_status == true && 
                            <div className="bg-slate-200 hover:bg-slate-300 px-4 my-5 rounded-2xl sm:p-0 xl:mx-72 sm:mx-5 ">
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
                            }
                            {services.vehicle_status == true && 
                            <div className="bg-slate-200 hover:bg-slate-300 px-4 my-5 rounded-2xl sm:p-0 xl:mx-72 sm:mx-5 ">
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
                            }
                            <div className='flex items-center'>
                                <button onClick={submitService} className="inline-flex items-center px-5 mt-4 my-10 mx-auto py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-cyan-300 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </div>
    )
}

export default SelectService
