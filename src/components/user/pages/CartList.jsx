import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userUrl } from '../../../API/Api';
import axios from 'axios';
import Swal from 'sweetalert2'

function CartList() {
    const [services, setService] = useState('')
    const [categories, setCategories] = useState('')
    const [datas1, setDatas1] = useState([])
    const [datas2, setDatas2] = useState([])
    const [datas3, setDatas3] = useState([])
    const [datas4, setDatas4] = useState([])
    const [categoryName, setCategoryName] = useState([])
    const navigate = useNavigate()

    const managerDetails = useSelector((state) => state.company)
    const serviceDetails = useSelector((state) => state.services);
    const managerId = managerDetails.company.managerDetails._id

    useEffect(() => {
        setDatas1(serviceDetails.checked1)
        setDatas2(serviceDetails.checked2)
        setDatas3(serviceDetails.checked3)
        setDatas4(serviceDetails.checked4)
        setService(serviceDetails.service.serviceData)
        setCategoryName(serviceDetails.service.serviceData.cateringMenu)
        setCategories(serviceDetails.service.serviceData.cateringMenu[0])
        const datas = { datas1, datas2, datas3, datas4 }
        const details = () => {
            try {
                const token = localStorage.getItem('token')
                axios.post(`${userUrl}cart-list/${managerId}`, datas, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then((response) => {

                })
            } catch (error) {
                console.log(error);
            }
        }
        details()
    }, [datas1, datas2])
    const total1 = datas1.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.starter_price), 0);
    const total2 = datas2.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.main_price), 0);
    const total3 = datas3.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.dessert_price), 0);
    const total4 = datas4.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.salad_price), 0);
    const total = total1 + total2 + total3 + total4
    const submitCheckout = () => {
        navigate('/checkout-page', { state: { totalPrice: total } })
    }

    const removeItem = (index) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes,Remove it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    if (datas1) {
                        const newData = datas1.filter((data, i) => i !== index);
                        console.log(newData);
                        setDatas1(newData);
                    } else if (datas2) {
                        const newData = datas2.filter((data, i) => i !== index);
                        console.log(newData);
                        setDatas2(newData);
                    }
                    Swal.fire(
                        'Removed!',
                        'Your service has been removed.',
                        'success'
                    )
                } catch (error) {
                    console.log(error);
                }
            }
        })
    }


    return (
        <div>
            <Navbar />
            <div className='mt-16' style={{ backgroundColor: 'rgb(210, 240, 275)' }}>
                <div className="max-w-5xl mx-auto py-12 sm:px-6 lg:px-8">
                    <div className="mx-auto ">
                        <div className="bg-white pl-20 shadow overflow-hidden sm:rounded-lg">
                            <div class="overflow-x-auto">
                                <div class="inline-block max-w-full my-10">
                                    <h1 className='text-3xl mb-5 font-medium text-gray-900'>Cart List</h1>
                                    <div class="shadow overflow-hidden border-gray-200 sm:rounded-lg">
                                        <table class="max-w-7xl divide-y divide-gray-200">
                                            <thead class="bg-slate-200">
                                                <tr>
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
                                                {datas1.map((data, index) => (
                                                    <tr class="hover:bg-slate-300 transition duration-300">
                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                            <div class="flex items-center">
                                                                <div class="flex-shrink-0 h-10 w-10">
                                                                    <img class="h-10 w-10 rounded-full" src={data.starter_image} alt="" />
                                                                </div>
                                                                <div class="ml-4">
                                                                    <div class="text-sm font-medium text-gray-900">
                                                                        {data.starter_name}
                                                                    </div>
                                                                    <div class="text-sm text-gray-500">
                                                                        {/* {services.catering_name}, */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                            <div key={index} class="text-sm text-gray-900">{data.starter_price}</div>
                                                        </td>
                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                            <svg onClick={() => removeItem(index)} xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                                                                stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {datas2.map((data, index) => (
                                                    <tr class="hover:bg-slate-300 transition duration-300">
                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                            <div class="flex items-center">
                                                                <div class="flex-shrink-0 h-10 w-10">
                                                                    <img class="h-10 w-10 rounded-full" src={data.main_image} alt="" />
                                                                </div>
                                                                <div class="ml-4">
                                                                    <div class="text-sm font-medium text-gray-900">
                                                                        {data.main_name}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                            <div key={index} class="text-sm text-gray-900">{data.main_price}</div>
                                                        </td>
                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                            <svg onClick={() => removeItem(index)} xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                                                                stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {datas3.map((data, index) => (
                                                    <tr class="hover:bg-slate-300 transition duration-300">
                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                            <div class="flex items-center">
                                                                <div class="flex-shrink-0 h-10 w-10">
                                                                    <img class="h-10 w-10 rounded-full" src={data.dessert_image} alt="" />
                                                                </div>
                                                                <div class="ml-4">
                                                                    <div class="text-sm font-medium text-gray-900">
                                                                        {data.dessert_name}
                                                                    </div>
                                                                    <div class="text-sm text-gray-500">
                                                                        {/* {services.catering_name}, */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                            <div key={index} class="text-sm text-gray-900">{data.dessert_price}</div>
                                                        </td>
                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                            <svg onClick={() => removeItem(index)} xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                                                                stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {datas4.map((data, index) => (
                                                    <tr class="hover:bg-slate-300 transition duration-300">
                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                            <div class="flex items-center">
                                                                <div class="flex-shrink-0 h-10 w-10">
                                                                    <img class="h-10 w-10 rounded-full" src={data.salad_image} alt="" />
                                                                </div>
                                                                <div class="ml-4">
                                                                    <div class="text-sm font-medium text-gray-900">
                                                                        {data.salad_name}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                            <div key={index} class="text-sm text-gray-900">{data.salad_price}</div>
                                                        </td>
                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                            <svg onClick={() => removeItem(index)} xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                                                                stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
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
                                {/* <p>total:{total}</p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartList
