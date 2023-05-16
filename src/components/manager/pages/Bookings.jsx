import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { managerUrl } from '../../../API/Api'
import Layout from '../Layout'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
function Bookings() {
    const [booking, setBooking] = useState([])
    const [loading, setLoading] = useState(true)
    const [showDetails, setShowDetails] = useState(false)
    const [bookingDetails, setBookingDetails] = useState([])

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, [])

    const viewDetails = async (id) => {
        setShowDetails(true)
        await axios.post(`${managerUrl}bookings/${id}`).then((response) => {
            const forms = response.data.data
            const form = forms.form
            setBookingDetails(form)
        })
    }

    useEffect(() => {
        const bookings = async () => {
            try {
                const token = localStorage.getItem('manager-token')
                await axios.post(`${managerUrl}bookings`, {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    }).then((response) => {
                        const bookings = response.data
                        setBooking(bookings)
                    })
            } catch (error) {
                console.log(error);
            }
        }
        bookings()
    },[])
    return (
        <div>
            <Layout>
                {
                    loading ? (
                        <div>Please wait...</div>
                    ) : (
                        <>
                            {showDetails ? (
                                <div className='mt-[7rem]'>
                                    <body class="bg-gray-100">
                                        <header class="bg-gray-800 text-white py-4">
                                            <div class="container mx-auto px-4">
                                                <h1 class="text-2xl font-bold">Details Page</h1>
                                            </div>
                                        </header>
                                        <main class="container mx-auto mt-8 px-4">
                                            <section class="bg-white shadow-lg rounded-lg p-8">
                                                <h2 class="text-xl font-bold mb-4">User Details</h2>
                                                {bookingDetails.map((data) => (
                                                    <div>
                                                        <p>Name : {data?.formName}</p>
                                                        <p>Email : {data?.formEmail}</p>
                                                        <p>Mobile : {data?.formMobile}</p>
                                                        <p>Address : {data?.address}</p>
                                                        <p>Pin code : {data?.pin}</p>
                                                        <p>State : {data?.state}</p>
                                                        <p>District : {data?.district}</p>
                                                        <p className='mb-4'>Place : {data?.place}</p>
                                                        <h2 className='text-xl font-semibold mt-4'>Services</h2>
                                                        <h3 className='text-lg font-semibold mt-4'>1. Catering service</h3>
                                                        <h4 className='text-base font-semibold mt-4'>Starters</h4>
                                                        <p>Spicy lemon</p>
                                                        <p>got in soup</p>
                                                        <h3 className='text-lg font-semibold mt-4'>2. Stage service</h3>
                                                    </div>
                                                ))}
                                            </section>
                                        </main>
                                    </body>
                                </div>
                            ) : (
                                <body className='mt-[7rem]'>
                                    <div class="overflow-x-auto">
                                        <div class="inline-block min-w-full">
                                            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                                <h1 className='font-bold text-xl mb-5'>Bookings</h1>
                                                <table class="min-w-full divide-y divide-gray-200">
                                                    <thead class="bg-slate-300">
                                                        <tr>
                                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Event Type
                                                            </th>
                                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Event Date
                                                            </th>
                                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Event Time
                                                            </th>
                                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Count of people
                                                            </th>
                                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                User Details
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    {booking.map((orderDatas) => (
                                                    <tbody class="bg-slate-400 divide-y divide-gray-200">
                                                        {orderDatas.form.map((data) => (
                                                            <tr class="hover:bg-slate-200 transition duration-300">
                                                                <td class="px-6 py-4 whitespace-nowrap">
                                                                    <div class="flex items-center">
                                                                        {/* <div class="flex-shrink-0 h-10 w-10">
                                                                            <img class="h-10 w-10 rounded-full" src="https://via.placeholder.com/150" alt="" />
                                                                        </div> */}
                                                                        <div class="ml-4">
                                                                            <div class="text-sm font-medium text-gray-900">
                                                                                {data.type}
                                                                            </div>
                                                                            {/* <div class="text-sm text-gray-500">
                                                                                {data.company}
                                                                            </div> */}
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td class="px-6 py-4 whitespace-nowrap">
                                                                    <div class="text-sm text-gray-900">{data.event_date}</div>
                                                                </td>
                                                                <td class="px-6 py-4 whitespace-nowrap">
                                                                    <div class="text-sm text-gray-900">{data.time}</div>
                                                                </td>
                                                                <td class="px-6 py-4 whitespace-nowrap">
                                                                    <div class="text-sm text-gray-900">{data.count}</div>
                                                                </td>
                                                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                    <Link onClick={() => viewDetails(orderDatas.user_id)} class="text-indigo-600 hover:text-indigo-900">View</Link>
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
                            )}
                        </>
                    )
                }
            </Layout>
        </div>
    )
}

export default Bookings
