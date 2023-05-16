import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { adminUrl } from '../../../API/Api';
import axios from 'axios';
import Layout from '../Layout';

function SalesManager() {
    const [loading, setLoading] = useState(true)
    const [order, setOrder] = useState([])


    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, [])

    useEffect(() => {
        const sales = async () => {
            console.log('Hi');
            // try {
                await axios.post(`${adminUrl}sales-report`).then((response) => {
                    console.log(response);
                    const orderDetails = response.data
                    console.log('orders',orderDetails);
                    setOrder(orderDetails)
                    // const userId = bookings.user_id
                    // const id = bookings._id
                    // console.log('userId', id);
                    // setUser(userId)
                    // setBookingId(id)
                    // const details = bookings.orderDetails
                    // setOrderDetails(details)
                })
            // } catch (error) {
            //     console.log(error);
            // }
        }
        sales()
    }, [])

    return (
        <div>
            <Layout>
                {
                    loading ? (
                        <div className='mt-[18rem] ms-64' ><CircularProgress variant="soft" color="info" /></div>
                    ) : (
                        <>
                            <body className='mt-[7rem]'>
                                <div class="overflow-x-auto">
                                    <div class="inline-block min-w-full">
                                        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                            <h1 className='font-bold text-xl mb-5'>Sales Report</h1>
                                            <table class="min-w-full divide-y divide-gray-200">
                                                <thead class="bg-slate-300">
                                                    <tr>
                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Order Id
                                                        </th>
                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Customer Name
                                                        </th>
                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Place
                                                        </th>
                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Mobile
                                                        </th>
                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Status
                                                        </th>
                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Date
                                                        </th>
                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Amount
                                                        </th>
                                                    </tr>
                                                </thead>
                                                {order.map((eachOrder) => (
                                                    <tbody class="bg-slate-400 divide-y divide-gray-200">
                                                        {eachOrder.form.map((data) => (
                                                            <tr class="hover:bg-slate-200 transition duration-300">
                                                                <td class="px-6 py-4 whitespace-nowrap">
                                                                    <div class="flex items-center">
                                                                        <div class="ml-4">
                                                                            <div class="text-sm font-medium text-gray-900">
                                                                                {data._id}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td class="px-6 py-4 whitespace-nowrap">
                                                                    <div class="text-sm text-gray-900">{data.formName}</div>
                                                                </td>
                                                                <td class="px-6 py-4 whitespace-nowrap">
                                                                    <div class="text-sm text-gray-900">{data.place}</div>
                                                                </td>
                                                                <td class="px-6 py-4 whitespace-nowrap">
                                                                    <div class="text-sm text-gray-900">{data.formMobile}</div>
                                                                </td>
                                                                <td class="px-6 py-4 whitespace-nowrap">
                                                                    <div class="text-sm text-gray-900">Success</div>
                                                                </td>
                                                                <td class="px-6 py-4 whitespace-nowrap">
                                                                    <div class="text-sm text-gray-900">{data.date}</div>
                                                                </td>
                                                                <td class="px-6 py-4 whitespace-nowrap">
                                                                    <div class="text-sm text-gray-900">{data.totalPrice}</div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                ))}
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </body>
                        </>
                    )
                }
            </Layout>
        </div>
    )
}

export default SalesManager
