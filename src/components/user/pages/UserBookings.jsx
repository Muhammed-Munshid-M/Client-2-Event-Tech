import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import axios from 'axios'
import { userUrl } from '../../../API/Api'
import { Link } from 'react-router-dom'

function UserBookings() {
    const [booking, setBooking] = useState([])
    const [loading, setLoading] = useState(true)
    const [showDetails, setShowDetails] = useState(false)
    const [bookingDetails, setBookingDetails] = useState('')
    const [cartDetails, setCartDetails] = useState([])

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, [])

    const viewDetails = async (id, userId) => {
        setShowDetails(true)
        await axios.post(`${userUrl}bookings/${id}`, { userId }).then((response) => {
            const forms = response.data
            const form = forms.elements
            console.log('items', form.items);
            setBookingDetails(form)
            setCartDetails(form.items)
        })
    }

    useEffect(() => {
        const bookings = async () => {
            try {
                const token = localStorage.getItem('token')
                await axios.post(`${userUrl}bookings`, {},
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
    }, [])
    return (
        <div>
            <Navbar />
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
                                            <h2 class="text-xl font-bold mb-4">Your Personal Details</h2>
                                            <div>
                                                <p>Name : {bookingDetails?.formName}</p>
                                                <p>Email : {bookingDetails?.formEmail}</p>
                                                <p>Mobile : {bookingDetails?.formMobile}</p>
                                                <p>Address : {bookingDetails?.address}</p>
                                                <p>Pin code : {bookingDetails?.pin}</p>
                                                <p>State : {bookingDetails?.state}</p>
                                                <p>District : {bookingDetails?.district}</p>
                                                <p className='mb-4'>Place : {bookingDetails?.place}</p>
                                                <h2 className='text-xl font-semibold mt-4'>Selected Services</h2>
                                                {cartDetails.map((datas) => (
                                                    <div>
                                                        <h3 className='text-lg font-semibold mt-4'>1. Catering service</h3>
                                                        <h4 className='text-base font-semibold mt-4'>Starters</h4>
                                                        {datas.categories.map((data) => (
                                                            <div>
                                                                <p>{data.starter_name}</p>
                                                            </div>
                                                        ))}
                                                        <h4 className='text-base font-semibold mt-4'>Main</h4>
                                                        {datas.categories.map((data) => (
                                                            <div>
                                                                <p>{data.main_name}</p>
                                                            </div>
                                                        ))}
                                                        <h4 className='text-base font-semibold mt-4'>Desserts</h4>
                                                        {datas.categories.map((data) => (
                                                            <div>
                                                                <p>{data.dessert_name}</p>
                                                            </div>
                                                        ))}
                                                        <h4 className='text-base font-semibold mt-4'>Salads</h4>
                                                        {datas.categories.map((data) => (
                                                            <div>
                                                                <p>{data.salad_name}</p>
                                                            </div>
                                                        ))}
                                                        <h3 className='text-lg font-semibold mt-4'>2. Stage service</h3>
                                                        <h4 className='text-base font-semibold mt-4'>Stage size</h4>
                                                        {datas.categories.map((data) => (
                                                            <div>
                                                                <p>{data.stage_name}</p>
                                                            </div>
                                                        ))}
                                                        <h3 className='text-lg font-semibold mt-4'>3. Decoration service</h3>
                                                        <h4 className='text-base font-semibold mt-4'>decoration images</h4>
                                                        {datas.categories.map((data) => (
                                                            <div>
                                                                <p>{data.decorate_name}</p>
                                                            </div>
                                                        ))}
                                                        <h3 className='text-lg font-semibold mt-4'>4. Photography service</h3>
                                                        <h4 className='text-base font-semibold mt-4'>Photography shop Name</h4>
                                                        {datas.categories.map((data) => (
                                                            <div>
                                                                <p>{data.photo_name}</p>
                                                            </div>
                                                        ))}
                                                        <h3 className='text-lg font-semibold mt-4'>5.Vehicle service</h3>
                                                        <h4 className='text-base font-semibold mt-4'>Vehicle owner Name</h4>
                                                        {datas.categories.map((data) => (
                                                            <div>
                                                                <p>{data.vehicle_name}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    </main>
                                </body>
                            </div>
                        ) : (
                            <body className='mt-[7rem]'>
                                <div class="overflow-x-auto mx-52">
                                    <div class="inline-block min-w-7xl">
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
                                                                        <div class="ml-4">
                                                                            <div class="text-sm font-medium text-gray-900">
                                                                                {data.type}
                                                                            </div>
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
                                                                    <Link onClick={() => viewDetails(data._id, orderDatas.user_id)} class="text-indigo-600 hover:text-indigo-900">View</Link>
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
        </div>
    )
}

export default UserBookings
