import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function CartList() {
    const [services, setService] = useState('')
    const [categories, setCategories] = useState('')
    const [categoryName, setCategoryName] = useState([])
    const navigate = useNavigate()

    const serviceDetails = useSelector((state) => state.services);
    console.log('serviceDetails:', serviceDetails.service.serviceData.cateringMenu)

    useEffect(() => {
        setService(serviceDetails.service.serviceData)
        setCategoryName(serviceDetails.service.serviceData.cateringMenu)
        setCategories(serviceDetails.service.serviceData.cateringMenu[0])
    }, [])

    const submitCheckout = () => {
        navigate('/checkout-page')
    }
    return (
        <div>
            <Navbar />
            <div className='mt-16' style={{ backgroundColor: 'rgb(210, 240, 275)' }}>
                <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
                    <div className="mx-auto ">
                        <div className="bg-white pl-20 shadow overflow-hidden sm:rounded-lg">
                            <div class="overflow-x-auto">
                                <div class="inline-block max-w-5xl my-10">
                                    <div class="shadow overflow-hidden border-gray-200 sm:rounded-lg px-36">
                                        <h1 className='text-3xl mb-5 font-medium text-gray-900'>Cart List</h1>
                                        <table class="max-w-7xl divide-y divide-gray-200">
                                            <thead class="bg-slate-200">
                                                <tr>
                                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Service Name
                                                    </th>
                                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Categories
                                                    </th>
                                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Category Name
                                                    </th>
                                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Category Price
                                                    </th>
                                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Cancel
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody class=" divide-y bg-slate-300 divide-gray-200">
                                                {categoryName.map((data, index) => (
                                                    <tr class="hover:bg-slate-300 transition duration-300">
                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                            <div class="flex items-center">
                                                                <div class="flex-shrink-0 h-10 w-10">
                                                                    <img class="h-10 w-10 rounded-full" src='/pexels-kseniia.jpg' alt="" />
                                                                </div>
                                                                <div class="ml-4">
                                                                    <div class="text-sm font-medium text-gray-900">
                                                                        {services.catering_name}
                                                                    </div>
                                                                    <div class="text-sm text-gray-500">
                                                                        sjhdbf
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td class="px-6 py-4 whitespace-nowrap">

                                                            <div class="text-sm text-gray-900">{categories.category_name[0]}</div>
                                                        </td>

                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                            <div key={index} class="text-sm text-gray-900">{data.starter_name}</div>
                                                        </td>
                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                            <div key={index} class="text-sm text-gray-900">{data.starter_price}</div>
                                                        </td>
                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                                                                stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            {/* <div key={index} class="text-sm text-gray-900">{data.email}</div> */}
                                                        </td>


                                                    </tr>
                                                ))}
                                                {categoryName.map((data, index) => (
                                                    <tr class="hover:bg-slate-300 transition duration-300">
                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                            <div class="flex items-center">
                                                                <div class="flex-shrink-0 h-10 w-10">
                                                                    <img class="h-10 w-10 rounded-full" src='/pexels-kseniia.jpg' alt="" />
                                                                </div>
                                                                <div class="ml-4">
                                                                    <div class="text-sm font-medium text-gray-900">
                                                                        {services.catering_name}
                                                                    </div>
                                                                </div>
                                                                {/* <div key={index} class="text-sm text-gray-500"> */}
                                                                {/* {data.email} */}
                                                                {/* </div> */}
                                                            </div>
                                                        </td>
                                                        <td class="px-6 py-4 whitespace-nowrap">

                                                            <div class="text-sm text-gray-900">{categories.category_name[1]}</div>
                                                        </td>

                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                            <div key={index} class="text-sm text-gray-900">{data.main_name}</div>
                                                        </td>
                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                            <div key={index} class="text-sm text-gray-900">{data.main_price}</div>
                                                        </td>
                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                                                                stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            {/* <div key={index} class="text-sm text-gray-900">{data.email}</div> */}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-4 sm:px-6 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-cyan-200 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:mt-5 sm:text-sm"
                                            onClick={submitCheckout}
                                        >
                                            Continue to Checkout
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartList
