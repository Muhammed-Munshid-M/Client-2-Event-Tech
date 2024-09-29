/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-useless-fragment */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { managerUrl } from '../../../API/Api';
import Layout from '../Layout';
import { hideLoading, showLoading } from '../../redux/alertSlice';

function Bookings() {
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [bookingDetails, setBookingDetails] = useState('');
  const [cartDetails, setCartDetails] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const viewDetails = async (id, userId) => {
    setShowDetails(true);
    await axios.post(`${managerUrl}bookings/${id}`, { userId }).then((response) => {
      const forms = response.data;
      const form = forms.elements;
      console.log('items', form.items);
      setBookingDetails(form);
      setCartDetails(form.items);
    });
  };

  useEffect(() => {
    const bookings = async () => {
      try {
        dispatch(showLoading());
        const token = localStorage.getItem('manager-token');
        await axios.post(
          `${managerUrl}bookings`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        ).then((response) => {
          dispatch(hideLoading());
          const allBookings = response.data.reverse();
          setBooking(allBookings);
        });
      } catch (error) {
        console.log(error);
      }
    };
    bookings();
  }, []);

  return (
    <div>
      <Layout>
        {
          loading ? (
            <div className="spinner-container">
              <div className="loading-spinner" />
            </div>
          ) : (
            <>
              {showDetails ? (
                <div className="mt-[7rem]">
                  <body className="bg-gray-100">
                    <header className="bg-gray-800 text-white py-4">
                      <div className="container mx-auto px-4">
                        <h1 className="text-2xl font-bold">Details Page</h1>
                      </div>
                    </header>
                    <main className="container mx-auto mt-8 px-4">
                      <section className="shadow-lg rounded-lg p-8">
                        <div className="flex justify-between">
                          <div className="w-96 h-max shadow-xl bg-white border border-gray-200 rounded-lg  md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <div className="px-8 mt-5">
                              <h2 className="text-xl font-bold mb-4">User Details</h2>
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
                              <h2 className="text-xl font-bold mb-4">User Booking Details</h2>
                              <div>
                                <p>
                                  Payment Status:
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
                                  Count People:
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
                          <div className="w-screen h-max shadow-xl bg-white border border-gray-200 rounded-lg  md:flex-row md:max-w-screen-lg hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700">
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
                  <div className="overflow-x-auto">
                    <div className="inline-block min-w-full">
                      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <h1 className="font-bold text-xl mb-5">Bookings</h1>
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
                                Count of people
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                User Details
                              </th>
                            </tr>
                          </thead>
                          {booking.map((orderDatas) => (
                            <tbody className="bg-slate-400 divide-y divide-gray-200">
                              {orderDatas.form.map((data) => (
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
      </Layout>
    </div>
  );
}

export default Bookings;
