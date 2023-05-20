/* eslint-disable linebreak-style */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { adminUrl } from '../../../API/Api';
import Layout from '../Layout';

function SalesManager() {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const filteredOrders = order.filter((order) => {
    const orderDate = new Date(order.date).getTime();
    const start = startDate ? new Date(startDate).getTime() : 0;
    const end = endDate ? new Date(endDate).getTime() : new Date().getTime();
    return orderDate >= start && orderDate <= end;
  });

  useEffect(() => {
    const sales = async () => {
      // try {
      await axios.post(`${adminUrl}sales-report`).then((response) => {
        const orderDetails = response.data;
        setOrder(orderDetails);
        // const userId = bookings.user_id
        // const id = bookings._id
        // console.log('userId', id);
        // setUser(userId)
        // setBookingId(id)
        // const details = bookings.orderDetails
        // setOrderDetails(details)
      });
      // } catch (error) {
      //     console.log(error);
      // }
    };
    sales();
  }, []);

  return (
    <div>
      <Layout>
        {
                    loading ? (
                      <div className="mt-[18rem] ms-64"><CircularProgress variant="soft" color="info" /></div>
                    ) : (
                      <body className="mt-[7rem]">
                        <div className="overflow-x-auto">
                          <div className="inline-block min-w-full">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                              <h1 className="font-bold text-xl mb-5">Sales Report</h1>
                              <div className="flex justify-end mr-5 mb-4">
                                <input
                                  type="date"
                                  value={startDate}
                                  onChange={(e) => setStartDate(e.target.value)}
                                />
                                <input
                                  type="date"
                                  value={endDate}
                                  onChange={(e) => setEndDate(e.target.value)}
                                />
                                <button type="button" onClick={() => (filteredOrders)}>Apply</button>
                              </div>
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-slate-300">
                                  <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Order Id
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Customer Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Place
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Mobile
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Date
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Amount
                                    </th>
                                  </tr>
                                </thead>
                                {order.map((eachOrder) => (
                                  <tbody className="bg-slate-400 divide-y divide-gray-200">
                                    {eachOrder.form.map((data) => (
                                      <tr className="hover:bg-slate-200 transition duration-300">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                          <div className="flex items-center">
                                            <div className="ml-4">
                                              <div className="text-sm font-medium text-gray-900">
                                                {data._id}
                                              </div>
                                            </div>
                                          </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                          <div className="text-sm text-gray-900">{data.formName}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                          <div className="text-sm text-gray-900">{data.place}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                          <div className="text-sm text-gray-900">{data.formMobile}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                          <div className="text-sm text-gray-900">Success</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                          <div className="text-sm text-gray-900">{data.date}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                          <div className="text-sm text-gray-900">{data.totalPrice}</div>
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
                    )
                }
      </Layout>
    </div>
  );
}

export default SalesManager;
