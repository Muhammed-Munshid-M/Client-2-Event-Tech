import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { userUrl } from '../../../API/Api';
import { useSelector } from 'react-redux';

function CompanyDetails() {
    const [companyDetails, setCompanyDetails] = useState('')
    const [serviceDetails, setServiceDetails] = useState('')
    const [showServices, setShowServices] = useState(false)
    const [cateringMenu,setCateringMenu] = useState([])
    const managerDetails = useSelector((state) => state.company);
    console.log('managerDetails:', serviceDetails);
    const navigate = useNavigate()

    const selectService = () => {
        navigate('/select-service')
    }

    const openFoodService = () => {
        setShowServices(true)
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    const closeServiceModal = () => {
        setShowServices(false)
    }
    useEffect(() => {
        setCompanyDetails(managerDetails.company.managerDetails)
        const token = localStorage.getItem('token')
        axios.post(`${userUrl}service-details`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            const services = response.data.data
            setServiceDetails(services)
            const menu = services.cateringMenu
            setCateringMenu(menu)
        })
    }, [managerDetails])

    return (
        <div>
            <Navbar />
            <div className='mt-16' style={{ backgroundColor: 'rgb(210, 240, 275)' }}>
                <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
                    <div className='flex flex-row justify-between w-full department-head mb-8'>
                        <img width='50px' height='10px' src={companyDetails.company_logo} alt="" />
                        <h1 className='text-center font-normal font-serif pt-3 md:pl-14 text-2xl'>{companyDetails.company_name}</h1>
                        <button onClick={selectService} className='text-right inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-base'>Select</button>
                    </div>
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                            {/* <h2 className='ml-6 font-normal font-serif italic pt-3 text-2xl'>{companyDetails.company_name}</h2> */}
                            <div className="px-4 py-5 sm:px-6 text-center">
                                <div className='flex content-center items-center justify-center'>
                                    <img className='' src={companyDetails.manager_image} alt="Image not found" />
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
                                        <img width='450px' height='auto' src="/evnt3.jpeg" alt="Image not found" />
                                        <img width='450px' height='auto' src="/pexels-faruk.jpg" alt="Image not found" />
                                        <img width='450px' height='auto' src="/pexels-rachel.jpg" alt="Image not found" />
                                    </div>
                                </dl>
                            </div>
                            <div className='mt-5'>
                                <h1 className='font-semibold text-2xl text-center'>Our Providing Services</h1>
                                <div class="overflow-x-auto mt-10">
                                    <div class="inline-block min-w-full px-20">
                                        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                            <table class="min-w-full divide-y divide-gray-200">
                                                <thead class="bg-slate-300">
                                                    <tr>
                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Services
                                                        </th>
                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Details
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody class="bg-slate-400 divide-y divide-gray-200">
                                                    <tr class="hover:bg-slate-200 transition duration-300">
                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                            <div class="flex items-center">
                                                                1.
                                                                <div class="ml-4">
                                                                    <div class="text-sm font-medium text-gray-900">
                                                                        {serviceDetails?.catering_name}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                            {showServices ? (
                                                                <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-10">
                                                                    <div class="max-w-7xl p-6 bg-white divide-y divide-gray-500">
                                                                        <div class="flex items-center justify-between">
                                                                            <h3 class="text-2xl">Food Menu Details</h3>
                                                                            <svg onClick={closeServiceModal} xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                                                                                stroke="currentColor">
                                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                            </svg>
                                                                        </div>
                                                                        <div class="mt-4">
                                                                            <div className="border-b border-gray-200 px-4 py-5 sm:p-0">
                                                                                <dl className="sm:divide-y sm:divide-gray-200">
                                                                                    <div className="py-4 sm:py-5 sm:grid lg:grid-cols-4 sm:grid-cols-4 sm:gap-4 sm:px-6">
                                                                                        {/* {catering.map((data) => ( */}
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
                                                    <tr class="hover:bg-slate-200 transition duration-300">
                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                            <div class="flex items-center">
                                                                2.
                                                                <div class="ml-4">
                                                                    <div class="text-sm font-medium text-gray-900">
                                                                        {serviceDetails?.stage_name}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                            <button class="custom-select font-weight-bold bg-transparent text-lg text-blue-700 hover:text-blue-500 border-0" name="orderStatus">
                                                                View
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr class="hover:bg-slate-200 transition duration-300">
                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                            <div class="flex items-center">
                                                                3.
                                                                <div class="ml-4">
                                                                    <div class="text-sm font-medium text-gray-900">
                                                                        {serviceDetails?.decoration_name}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                            <button class="custom-select font-weight-bold bg-transparent text-lg text-blue-700 hover:text-blue-500 border-0" name="orderStatus">
                                                                View
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr class="hover:bg-slate-200 transition duration-300">
                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                            <div class="flex items-center">
                                                                4.
                                                                <div class="ml-4">
                                                                    <div class="text-sm font-medium text-gray-900">
                                                                        {serviceDetails?.photography_name}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                            <button class="custom-select font-weight-bold bg-transparent text-lg text-blue-700 hover:text-blue-500 border-0" name="orderStatus">
                                                                View
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr class="hover:bg-slate-200 transition duration-300">
                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                            <div class="flex items-center">
                                                                5.
                                                                <div class="ml-4">
                                                                    <div class="text-sm font-medium text-gray-900">
                                                                        {serviceDetails?.vehicle_name}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                            <button class="custom-select font-weight-bold bg-transparent text-lg text-blue-700 hover:text-blue-500 border-0" name="orderStatus">
                                                                View
                                                            </button>
                                                        </td>
                                                    </tr>
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
                                // onClick={()=>setShowDetails(false)}
                                >
                                    Go Back
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyDetails
