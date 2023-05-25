/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useDispatch } from 'react-redux';
import LayoutAdmin from '../LayoutAdmin';
import { adminUrl } from '../../../API/Api';
import { hideLoading, showLoading } from '../../redux/alertSlice';

function SalesReport() {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const sales = async () => {
      try {
        dispatch(showLoading());
        await axios.post(`${adminUrl}sales-report`).then((response) => {
          dispatch(hideLoading());
          const orderDetails = response.data;
          setOrder(orderDetails);
        });
      } catch (error) {
        dispatch(hideLoading());
        console.log(error);
      }
    };
    sales();
  }, []);

  const filterOrders = () => {
    let filteredData = order;

    if (startDate && endDate) {
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);

      filteredData = filteredData.filter((eachOrder) => eachOrder.form.some((data) => {
        const orderDate = new Date(data.date).toISOString();
        return orderDate >= startDateObj.toISOString() && orderDate <= endDateObj.toISOString();
      }));
      console.log('filtered', filteredData);
    }

    setOrder(filteredData);
  };

  const generatePDF = () => {
    // Create a new jsPDF instance
    // eslint-disable-next-line new-cap
    const doc = new jsPDF();

    // Define table column headers
    const headers = [
      { title: 'Order ID', dataKey: 'orderId' },
      { title: 'Customer Name', dataKey: 'customerName' },
      { title: 'Place', dataKey: 'place' },
      { title: 'Mobile', dataKey: 'mobile' },
      { title: 'Status', dataKey: 'status' },
      { title: 'Date', dataKey: 'date' },
      { title: 'Amount', dataKey: 'amount' },
    ];

    // Extract data from the filteredOrders array
    const data = order.map((eachOrder) => eachOrder.form.map((data) => ({
      orderId: data._id,
      customerName: data.formName,
      place: data.place,
      mobile: data.formMobile,
      status: 'Success',
      date: data.date,
      amount: data.totalPrice,
    }))).flat();

    // Set table styling
    const tableConfig = {
      margin: {
        top: 20, right: 20, bottom: 20, left: 20,
      },
      headStyles: { fillColor: [49, 112, 143], textColor: [255] },
      columnStyles: { 0: { cellWidth: 25 }, 6: { cellWidth: 25 } },
    };

    // Generate table in the PDF
    doc.autoTable(headers, data, tableConfig);

    // Save the PDF with a specific filename
    doc.save('sales_report.pdf');
  };

  return (
    <div>
      <LayoutAdmin>
        {
          loading ? (
            <div className="spinner-container">
            <div className="loading-spinner" />
          </div>
          ) : (
            <body className="mt-[7rem]">
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <h1 className="font-bold text-xl mb-5">Sales Report</h1>
                    <div className="flex justify-end mr-5 mb-4">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded me-auto" onClick={generatePDF}>
                      Download PDF
                    </button>
                    <p className="py-2 px-2">From:</p>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border border-gray-300 bg-green-400 hover:bg-green-500 px-2 py-1 rounded"
                      />
                      <p className="py-2 px-2">To:</p>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border border-gray-300 bg-green-400 hover:bg-green-500 px-2 py-1 rounded mr-6"
                      />
                      <button className="mr-3 px-3 bg-blue-500" onClick={filterOrders}>Apply</button>
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
                                <div className="text-sm text-gray-900">{data.status}</div>
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
      </LayoutAdmin>
    </div>
  );
}

export default SalesReport;
