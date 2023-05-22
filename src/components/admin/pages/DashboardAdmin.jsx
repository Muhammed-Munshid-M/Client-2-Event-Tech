/* eslint-disable linebreak-style */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
// import LayoutAdmin from '../LayoutAdmin'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import LayoutAdmin from '../LayoutAdmin';
import { adminUrl } from '../../../API/Api';
import { hideLoading, showLoading } from '../../redux/alertSlice';

function DashboardAdmin() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalApproved, setTotalApproved] = useState(0);
  const [totalmanagers, setTotalManagers] = useState(0);
  const [table, setTable] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(showLoading());
      axios.get(`${adminUrl}dashboard`)
        .then((response) => {
          dispatch(hideLoading());
          const total = response.data;
          setTotalUsers(total.userLength);
          setTotalApproved(total.approvedLength);
          setTotalManagers(total.managerLength);
          setTable(total.forms);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div>
      <LayoutAdmin>
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
              <img className=" ml-4 h-14" src="/approved-5-64.png" alt="logo" />
              <div>
                <h1 className="pl-3 text-black font-bold">Total Approved Managers</h1>
                <span className="flex justify-center text-black font-bold">
                  {totalApproved}
                </span>
              </div>
            </div>
            <div className="flex flex-col w-60 h-20 shadow-xl items-center bg-white opacity-60 border border-gray-200 rounded-lg  md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer">
              <img className=" ml-4 h-14" src="/manager-1-64.png" alt="logo" />
              <div>
                <h1 className="pl-4 pr-2 text-black font-bold">
                  Total Managers
                </h1>

                <span className="flex justify-center text-black font-bold">
                  {totalmanagers}
                </span>
              </div>
            </div>
          </div>

          <div className="overflow-auto rounded-lg shadow">
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
                        {data.date}
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
      </LayoutAdmin>
    </div>
  );
}

export default DashboardAdmin;
