/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import { userUrl } from '../../../API/Api';

function UserBookings() {
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [bookingDetails, setBookingDetails] = useState('');
  const [cartDetails, setCartDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const viewDetails = async (id) => {
    setShowDetails(true);
    const token = localStorage.getItem('token');
    await axios.post(
      `${userUrl}bookings/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ).then((response) => {
      const form = response.data;
      setBookingDetails(form);
      setCartDetails(form.items);
    });
  };

  useEffect(() => {
    const bookings = async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.post(
          `${userUrl}bookings`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        ).then((response) => {
          const allBookings = response.data.reverse();
          setBooking(allBookings);
        });
      } catch (error) {
        console.log(error);
      }
    };
    bookings();
  }, []);

  const goBack = () => {
    navigate('/profile');
  };

  const goBackDetails = () => {
    setShowDetails(false);
  };

  return (
    <div>
      <Navbar />
      {
        loading ? (
          <div>Please wait...</div>
        ) : (
          <>
            {showDetails ? (
              <div className="mt-[7rem]">
                <body className="bg-gray-100 mx-16">
                  <header className="bg-gray-800 text-white py-4">
                    <div className="container mx-auto px-4">
                      <div className="flex justify-between">
                        <h1 className="text-2xl font-bold">Details Page</h1>
                        <button type="button" onClick={goBackDetails} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          Go Back
                        </button>
                      </div>
                    </div>
                  </header>
                  <main className="container mx-auto mt-8 px-4">
                    <section className="shadow-lg rounded-lg p-8">
                      <div className="flex justify-between">
                        <div className="w-96 h-max shadow-xl bg-white border border-gray-200 rounded-lg  md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700">
                          <div className="px-8 mt-5">
                            <h2 className="text-xl font-bold mb-4">Your Personal Details</h2>
                            <div>
                              <p>
                                Name :
                                {' '}
                                {bookingDetails.formName}
                              </p>
                              <p>
                                Email :
                                {' '}
                                {bookingDetails.formEmail}
                              </p>
                              <p>
                                Mobile :
                                {' '}
                                {bookingDetails.formMobile}
                              </p>
                              <p>
                                Address :
                                {' '}
                                {bookingDetails.address}
                              </p>
                              <p>
                                Pin code :
                                {' '}
                                {bookingDetails.pin}
                              </p>
                              <p>
                                State :
                                {' '}
                                {bookingDetails.state}
                              </p>
                              <p>
                                District :
                                {' '}
                                {bookingDetails.district}
                              </p>
                              <p className="mb-4">
                                Place :
                                {' '}
                                {bookingDetails.place}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="w-96 h-max shadow-xl bg-white border border-gray-200 rounded-lg  md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700">
                          <div className="px-8 mt-5">
                            <h2 className="text-xl font-bold mb-4">Your Booking Details</h2>
                            <div>
                              <p>
                                Event Type:
                                {' '}
                                {bookingDetails.status}
                              </p>
                              <p>
                                Event Type:
                                {' '}
                                {bookingDetails.type}
                              </p>
                              <p>
                                Event Date:
                                {' '}
                                {new Date(bookingDetails.event_date).toLocaleDateString('en-GB')}
                              </p>
                              <p>
                                Event Time:
                                {' '}
                                {bookingDetails.time}
                              </p>
                              <p>
                                Payment Type:
                                {' '}
                                {bookingDetails.count}
                              </p>
                              <p className="mb-4">
                                Booking Date:
                                {' '}
                                {new Date(bookingDetails.date).toLocaleDateString('en-GB')}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h2 className="text-3xl text-center font-medium my-16">Selected Services</h2>
                        <div className="w-screen h-max shadow-xl mx-14 bg-white border border-gray-200 rounded-lg  md:flex-row md:max-w-screen-lg hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700">
                          <div className="px-8 my-5">
                            <h3 className="text-lg font-semibold mt-4">1. Catering service</h3>
                            <div>
                              {cartDetails.map((datas) => (
                                <div className="flex justify-between">
                                  <div>
                                    <h4 className="text-base font-semibold mt-4">Starters</h4>
                                    {datas.categories.map((data) => (
                                      <div>
                                        <p>{data.starter_name}</p>
                                      </div>
                                    ))}
                                  </div>
                                  <div>
                                    <h4 className="text-base font-semibold mt-4">Main</h4>
                                    {datas.categories.map((data) => (
                                      <div>
                                        <p>{data.main_name}</p>
                                      </div>
                                    ))}
                                  </div>
                                  <div>
                                    <h4 className="text-base font-semibold mt-4">Desserts</h4>
                                    {datas.categories.map((data) => (
                                      <div>
                                        <p>{data.dessert_name}</p>
                                      </div>
                                    ))}
                                  </div>
                                  <div>
                                    <h4 className="text-base font-semibold mt-4">Salads</h4>
                                    {datas.categories.map((data) => (
                                      <div>
                                        <p>{data.salad_name}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between mx-14">
                          <div className="w-96 h-max shadow-xl my-10 bg-white border border-gray-200 rounded-lg  md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <div className="px-8 my-5">
                              <h3 className="text-lg font-semibold mt-4">2. Stage service</h3>
                              <div>
                                {cartDetails.map((datas) => (
                                  <div>
                                    <h4 className="text-base font-semibold mt-4">Stage size</h4>
                                    {datas.categories.map((data) => (
                                      <div>
                                        <p>{data.stage_name}</p>
                                      </div>
                                    ))}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="w-96 h-max shadow-xl my-10 bg-white border border-gray-200 rounded-lg  md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <div className="px-8 my-5">
                              <h3 className="text-lg font-semibold mt-4">3. Decoration service</h3>
                              <div>
                                {cartDetails.map((datas) => (
                                  <div>
                                    <h4 className="text-base font-semibold mt-4">decoration images</h4>
                                    {datas.categories.map((data) => (
                                      <div>
                                        <p>{data.decorate_name}</p>
                                      </div>
                                    ))}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between mx-14">
                          <div className="w-96 h-max shadow-xl my-10 bg-white border border-gray-200 rounded-lg  md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <div className="px-8 my-5">
                              <h3 className="text-lg font-semibold mt-4">4. Photography service</h3>
                              <div>
                                {cartDetails.map((datas) => (
                                  <div>
                                    <h4 className="text-base font-semibold mt-4">Photography shop Name</h4>
                                    {datas.categories.map((data) => (
                                      <div>
                                        <p>{data.photo_name}</p>
                                      </div>
                                    ))}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="w-96 h-max shadow-xl my-10 bg-white border border-gray-200 rounded-lg  md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <div className="px-8 my-5">
                              <h3 className="text-lg font-semibold mt-4">5.Vehicle service</h3>
                              <div>
                                {cartDetails.map((datas) => (
                                  <div>
                                    <h4 className="text-base font-semibold mt-4">Vehicle owner Name</h4>
                                    {datas.categories.map((data) => (
                                      <div>
                                        <p>{data.vehicle_name}</p>
                                      </div>
                                    ))}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </main>
                </body>
              </div>
            ) : (
              <body className="mt-[7rem]">
                <div className="overflow-x-auto mx-52">
                  <div className="inline-block min-w-7xl">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <div className="flex justify-between mb-6">
                        <h1 className="font-bold text-xl mt-2">Bookings</h1>
                        <button type="button" onClick={goBack} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-cyan-200 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          Go Back
                        </button>
                      </div>
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-slate-300">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Event Type
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Event Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Event Time
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Payment Type
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              User Details
                            </th>
                          </tr>
                        </thead>
                        {booking.map((data) => (
                          <tbody className="bg-slate-400 divide-y divide-gray-200">
                            <tr className="hover:bg-slate-200 transition duration-300">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                      {data.type}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {new Date(data.event_date).toLocaleDateString('en-GB')}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{data.time}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{data.count}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <Link onClick={() => viewDetails(data._id)} class="text-indigo-600 hover:text-indigo-900">View</Link>
                              </td>
                            </tr>
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
  );
}

export default UserBookings;
