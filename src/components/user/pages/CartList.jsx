/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-indent */
/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-indent-props */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { userUrl } from '../../../API/Api';
import Navbar from '../Navbar';
import { removeItemFromChecked1, removeItemFromChecked2 } from '../../redux/services';

function CartList() {
    const [services, setService] = useState('');
    const [categories, setCategories] = useState('');
    const [datas1, setDatas1] = useState([]);
    const [datas2, setDatas2] = useState([]);
    const [datas3, setDatas3] = useState([]);
    const [datas4, setDatas4] = useState([]);
    const [datas5, setDatas5] = useState([]);
    const [datas6, setDatas6] = useState([]);
    const [datas7, setDatas7] = useState([]);
    const [datas8, setDatas8] = useState([]);
    const [count, setCount] = useState(0);
    const [categoryName, setCategoryName] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const managerDetails = useSelector((state) => state.company);
    const serviceDetails = useSelector((state) => state.services);
    const managerId = managerDetails.company.managerDetails._id;

    useEffect(() => {
        setDatas1(serviceDetails.checked1);
        setDatas2(serviceDetails.checked2);
        setDatas3(serviceDetails.checked3);
        setDatas4(serviceDetails.checked4);
        setDatas5(serviceDetails.checked5);
        setDatas6(serviceDetails.checked6);
        setDatas7(serviceDetails.checked7);
        setDatas8(serviceDetails.checked8);
        setCount(serviceDetails.count);
        setService(serviceDetails.service.serviceData);
        setCategoryName(serviceDetails.service.serviceData.cateringMenu);
        setCategories(serviceDetails.service.serviceData.cateringMenu[0]);
        const datas = {
            datas1, datas2, datas3, datas4, datas5, datas6, datas7, datas8,
        };
        const details = () => {
            try {
                const token = localStorage.getItem('token');
                axios.post(`${userUrl}cart-list/${managerId}`, datas, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }).then((response) => {

                });
            } catch (error) {
                // eslint-disable-next-line no-console
                console.log(error);
            }
        };
        details();
    }, [datas1, datas2, datas3, datas4, datas5, datas6, datas7, datas8]);
    const total1 = datas1.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.starter_price * count), 0);
    const total2 = datas2.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.main_price * count), 0);
    const total3 = datas3.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.dessert_price * count), 0);
    const total4 = datas4.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.salad_price * count), 0);
    const total5 = datas5.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.stage_price), 0);
    const total6 = datas6.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.decorate_price), 0);
    const total7 = datas7.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.photo_price), 0);
    const total8 = datas8.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.vehicle_price), 0);
    const totalFloat = (total1 + total2 + total3 + total4 + total5 + total6 + total7 + total8);
    const total = Math.round(totalFloat);
    const submitCheckout = () => {
        navigate('/checkout-page', { state: { totalPrice: total } });
    };

    const removeItem = (index) => {
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
                    if (datas1) {
                        dispatch(removeItemFromChecked1(index));
                    } else if (datas2) {
                        dispatch(removeItemFromChecked2(index));
                    }
                    Swal.fire(
                        'Removed!',
                        'Your service has been removed.',
                        'success',
                    );
                } catch (error) {
                    // eslint-disable-next-line no-console
                    console.log(error);
                }
            }
        });
    };

    return (
        <div>
            <Navbar />
            <div className="mt-16" style={{ backgroundColor: 'rgb(210, 240, 275)' }}>
                <div className="max-w-5xl mx-auto py-12 sm:px-6 lg:px-8">
                    <div className="mx-auto ">
                        <div className="bg-white pl-20 shadow overflow-hidden sm:rounded-lg">
                            <div className="overflow-x-auto">
                                <div className="inline-block max-w-full my-10">
                                    <h1 className="text-3xl mb-5 font-medium text-gray-900">Cart List</h1>
                                    <div className="shadow overflow-hidden border-gray-200 sm:rounded-lg">
                                        <table className="max-w-7xl divide-y divide-gray-200">
                                            <thead className="bg-slate-200">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Category Name / Other Name
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Category Price
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Cancel
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className=" divide-y bg-slate-300 divide-gray-200">
                                                {datas1.map((data, index) => (
                                                    <tr className="hover:bg-slate-300 transition duration-300">
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 h-10 w-10">
                                                                    <img className="h-10 w-10 rounded-full" src={data.starter_image} alt="" />
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-medium text-gray-900">
                                                                        {data.starter_name}
                                                                    </div>
                                                                    <div className="text-sm text-gray-500">
                                                                        {services.catering_name}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div key={index} className="text-sm text-gray-900">
                                                                {data.starter_price}
                                                                {' '}
                                                                *
                                                                {' '}
                                                                {count}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <svg
                                                                onClick={() => removeItem(index)}
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
                                                        </td>
                                                    </tr>
                                                ))}
                                                {datas2.map((data, index) => (
                                                    <tr className="hover:bg-slate-300 transition duration-300">
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 h-10 w-10">
                                                                    <img className="h-10 w-10 rounded-full" src={data.main_image} alt="" />
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-medium text-gray-900">
                                                                        {data.main_name}
                                                                    </div>
                                                                    <div className="text-sm text-gray-500">
                                                                        {services.catering_name}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div key={index} className="text-sm text-gray-900">
                                                                {data.main_price}
                                                                {' '}
                                                                *
                                                                {' '}
                                                                {count}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <svg
                                                                onClick={() => removeItem(index)}
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
                                                        </td>
                                                    </tr>
                                                ))}
                                                {datas3.map((data, index) => (
                                                    <tr className="hover:bg-slate-300 transition duration-300">
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 h-10 w-10">
                                                                    <img className="h-10 w-10 rounded-full" src={data.dessert_image} alt="" />
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-medium text-gray-900">
                                                                        {data.dessert_name}
                                                                    </div>
                                                                    <div className="text-sm text-gray-500">
                                                                        {services.catering_name}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div key={index} className="text-sm text-gray-900">
                                                                {data.dessert_price}
                                                                {' '}
                                                                *
                                                                {' '}
                                                                {count}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <svg
                                                                onClick={() => removeItem(index)}
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
                                                        </td>
                                                    </tr>
                                                ))}
                                                {datas4.map((data, index) => (
                                                    <tr className="hover:bg-slate-300 transition duration-300">
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 h-10 w-10">
                                                                    <img className="h-10 w-10 rounded-full" src={data.salad_image} alt="" />
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-medium text-gray-900">
                                                                        {data.salad_name}
                                                                    </div>
                                                                    <div className="text-sm text-gray-500">
                                                                        {services.catering_name}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div key={index} className="text-sm text-gray-900">
                                                                {data.salad_price}
                                                                {' '}
                                                                *
                                                                {' '}
                                                                {count}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <svg
                                                                onClick={() => removeItem(index)}
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
                                                        </td>
                                                    </tr>
                                                ))}
                                                {datas5.map((data, index) => (
                                                    <tr className="hover:bg-slate-300 transition duration-300">
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 h-10 w-10">
                                                                    <img className="h-10 w-10 rounded-full" src={data.stage_image} alt="" />
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-medium text-gray-900">
                                                                        {data.stage_name}
                                                                    </div>
                                                                    <div className="text-sm text-gray-500">
                                                                        {services.stage_name}
                                                                        ,
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div key={index} className="text-sm text-gray-900">{data.stage_price}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <svg
                                                                onClick={() => removeItem(index)}
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
                                                        </td>
                                                    </tr>
                                                ))}
                                                {datas6.map((data, index) => (
                                                    <tr className="hover:bg-slate-300 transition duration-300">
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 h-10 w-10">
                                                                    <img className="h-10 w-10 rounded-full" src={data.decorate_image} alt="" />
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-medium text-gray-900">
                                                                        {data.decorate_name}
                                                                    </div>
                                                                    <div className="text-sm text-gray-500">
                                                                        {services.decoration_name}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div key={index} className="text-sm text-gray-900">{data.decorate_price}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <svg
                                                                onClick={() => removeItem(index)}
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
                                                        </td>
                                                    </tr>
                                                ))}
                                                {datas7.map((data, index) => (
                                                    <tr className="hover:bg-slate-300 transition duration-300">
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 h-10 w-10">
                                                                    <img className="h-10 w-10 rounded-full" src={data.photo_image} alt="" />
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-medium text-gray-900">
                                                                        {data.photo_name}
                                                                    </div>
                                                                    <div className="text-sm text-gray-500">
                                                                        {services.photography_name}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div key={index} className="text-sm text-gray-900">{data.photo_price}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <svg
                                                                onClick={() => removeItem(index)}
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
                                                        </td>
                                                    </tr>
                                                ))}
                                                {datas8.map((data, index) => (
                                                    <tr className="hover:bg-slate-300 transition duration-300">
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 h-10 w-10">
                                                                    <img className="h-10 w-10 rounded-full" src={data.vehicle_image} alt="" />
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-medium text-gray-900">
                                                                        {data.vehicle_name}
                                                                    </div>
                                                                    <div className="text-sm text-gray-500">
                                                                        {services.vehicle_name}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div key={index} className="text-sm text-gray-900">{data.vehicle_price}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <svg
                                                                onClick={() => removeItem(index)}
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
    );
}

export default CartList;
