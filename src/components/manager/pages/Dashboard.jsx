/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-undef */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Card, Grid, useTheme } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import Layout from '../Layout';
import { managerUrl } from '../../../API/Api';
import { hideLoading, showLoading } from '../../redux/alertSlice';

function Dashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [table, setTable] = useState([]);
  const [amountTotal, setAmountTotal] = useState(0);
  const [monthly, setMonthly] = useState([]);

  const dispatch = useDispatch();
  const theme = useTheme();

  const managerData = async () => {
    try {
      dispatch(showLoading());
      const token = localStorage.getItem('manager-token');
      await axios.post(
        `${managerUrl}manager-data`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ).then((response) => {
        dispatch(hideLoading());
        if (response.data.success) {
          toast.success(response.data.message);
        } else if (response.data.noManager) {
          toast.error(response.data.message);
        } else {
          toast.error('Something error');
        }
      });
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    managerData();
  }, []);

  useEffect(() => {
    const dashboard = async () => {
      try {
        const token = localStorage.getItem('manager-token');
        await axios.post(
          `${managerUrl}dashboard`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
          .then((response) => {
            const totalData = response.data;
            const form = totalData.forms;
            const amount = totalData.totalAmount;
            setTotalUsers(totalData.userLength);
            const formLengths = form.map((obj) => obj.form.length);
            const totalFormLength = formLengths.reduce((total, length) => total + length, 0);
            setTotalBookings(totalFormLength);
            setAmountTotal(amount);
            setTable(form);
            setMonthly(totalData.userCount);
          });
      } catch (error) {
        console.log(error);
      }
    };
    dashboard();
  }, []);

  const options = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    title: {
      text: 'Users by Month',
      align: 'left',
    },
    grid: {
      row: {
        colors: ['light', 'transparent'],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
  };

  const serie = [{
    name: 'Sales',
    data: monthly,
  }];

  return (
    <div>
      <Layout>
        <div className=" p-6 sm:p-16 h-screen border-gray-200  pb-7 mt-10">
          <h1 className="font-semibold text-center sm:text-left mb-2 pb-3 sm:pb-9 font-serif text-2xl">
            {' '}
            Dashboard
          </h1>
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-2 lg:gap-4 p-4 mb-10">
            <div className="flex flex-col w-60 h-20 shadow-xl items-center bg-white opacity-60 border border-gray-200 rounded-lg  md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer">
              <img className=" ml-4 h-14" src="/client-7-64.png" alt="logo" />
              <div>
                <h1 className="pl-5 text-black font-bold">Total Users</h1>
                <span className="flex justify-center text-black font-bold">
                  {totalUsers}
                </span>
              </div>
            </div>
            <div className="flex flex-col w-60 h-20 shadow-xl items-center bg-white opacity-60 border border-gray-200 rounded-lg  md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer">
              <img className=" ml-4 h-14" src="/order-20-64.png" alt="logo" />
              <div>
                <h1 className="pl-3 text-black font-bold">Total Bookings</h1>
                <span className="flex justify-center text-black font-bold">
                  {totalBookings}
                </span>
              </div>
            </div>
            <div className="flex flex-col w-60 h-20 shadow-xl items-center bg-white opacity-60 border border-gray-200 rounded-lg  md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer">
              <img className=" ml-4 h-14" src="/payment-1-64.png" alt="logo" />
              <div>
                <h1 className="pl-4 pr-2 text-black font-bold">
                  Total Amount
                </h1>
                <span className="flex justify-center text-black font-bold">
                  {amountTotal}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  boxShadow: theme.shadows[4],
                  borderRadius: theme.shape.borderRadius,
                  padding: theme.spacing(5),
                }}
              >
                <ReactApexChart
                  options={options}
                  series={serie}
                  type="line"
                  height={350}
                />
              </Card>
            </Grid>
          </div>

          <div className="overflow-auto rounded-lg shadow mt-16">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    User Name
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    Mobile
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    Booking Date
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    Status
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    Amount
                  </th>
                </tr>
              </thead>
              {table.map((datas) => (
                <tbody className=" bg-white divide-y divide-gray-200">
                  {datas.form.map((data) => (
                    <tr className="">
                      <td className=" p-3 text-sm text-gray-700 text-center">
                        {data.formName}
                      </td>
                      <td className=" p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                        {data.formMobile}
                      </td>
                      <td className=" p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                        {new Date(data.date).toLocaleDateString('en-GB')}
                      </td>
                      <td className=" p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                        {data.status}
                      </td>
                      <td className=" p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                        {data.totalPrice}
                      </td>
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Dashboard;
