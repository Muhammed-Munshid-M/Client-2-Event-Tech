import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { adminUrl } from '../../../API/Api'
import LayoutAdmin from '../LayoutAdmin'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { CircularProgress } from '@mui/material'

function Managers() {
  const [manager, setManager] = useState()
  const [loading, setLoading] = useState(true)
  const [showDetails, setShowDetails] = useState(false)
  const [managerDetails, setManagerDetails] = useState()
  const [approvalStatus, setApprovalStatus] = useState({});
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [])

  const Approval = async (id) => {
    const response = await axios.post(`${adminUrl}approval?managerId=${id}`)
    if (response.data.success) {
      setApprovalStatus({ ...approvalStatus, [id]: true })
      Swal.fire(
        'Approved',
        'Your selecting manager approved',
        'success'
      ).then(() => {
        navigate('/admin/managers')
      })
    } else {
      console.log('error');
    }
  }

  const viewDetails = async (id) => {
    setShowDetails(true)
    await axios.post(`${adminUrl}managers/${id}`).then((response) => {
      console.log(response.data.data);
      setManagerDetails(response.data.data)
    })
  }

  useEffect(() => {
    const managers = async () => {
      try {
        await axios.get(`${adminUrl}managers`).then((response) => {
          const manager = response.data
          setManager(manager)
        })
      } catch (error) {
        console.log(error);
      }
    }
    managers()
  }, [])
  return (
    <div>
      <LayoutAdmin>
        <div className='me-5' style={{backgroundColor:'#F2F6FF'}}>
        {
          loading ? (
            <div>
              <CircularProgress variant="soft" color="info" />
            </div>
          ) : (
            <>
              {showDetails ? (
                <div className="mt-[6rem]">
                <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
                <div className='text-center w-full department-head mb-4'><h1>Your Details</h1></div>
                  <div className="max-w-3xl mx-auto">
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                      <div className="px-4 py-5 sm:px-6">
                        <h1 className="text-2xl font-medium text-gray-900">
                          {managerDetails?.name}
                        </h1>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                          {managerDetails?.email}
                        </p>
                      </div>
                      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <dl className="sm:divide-y sm:divide-gray-200">
                          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Mobile</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              {managerDetails?.mobile}
                            </dd>
                          </div>
                          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Company Name</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              {managerDetails?.company_name}
                            </dd>
                          </div>
                          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Address</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              {managerDetails?.address}
                            </dd>
                          </div>
                          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Aadhar</dt>
                            <img src="/driving-licence.jpeg" alt="" />
                          </div>
                          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">License or VoterId</dt>
                            <img src="/driving-licence.jpeg" alt="" />
                          </div>
                        </dl>
                      </div>
                      <div className="bg-gray-50 px-4 py-4 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-cyan-200 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={()=>setShowDetails(false)}
                   >
                        Go Back
                    </button>
                   
                  </div>
                </div>
              </div>
            </div>
            </div>
              ) : (
                <body className='mt-[7rem]'>
                  <div class="overflow-x-auto ">
                    <div class="inline-block min-w-full ">
                      <div class="shadow overflow-hidden border-gray-200 sm:rounded-lg">
                        <h1 className='font-bold text-xl mb-5'>Managers List</h1>
                        <table class="min-w-full divide-y divide-gray-200">
                          <thead class="bg-slate-300">
                            <tr>
                              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                              </th>
                              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                              </th>
                              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Company Name
                              </th>
                              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Mobile
                              </th>
                              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Details
                              </th>
                              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Access
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y bg-slate-400 divide-gray-200">
                            {manager.map((data, index) => (
                              <Fragment key={index}>
                                {!approvalStatus[data._id] && (
                                  <tr className="hover:bg-slate-200 transition duration-300">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                          <img className="h-10 w-10 rounded-full" src={data.upload_photo} alt="can't get image image" hidden />
                                        </div>
                                        <div className="ml-4">
                                          <div key={index} className="text-sm font-medium text-gray-900">
                                            {data.name}
                                          </div>
                                          <div key={index} className="text-sm text-gray-500">
                                            {data.email}
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div key={index} className="text-sm text-gray-900">{data.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div key={index} className="text-sm text-gray-900">{data.company_name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div key={index} className="text-sm text-gray-900">{data.mobile}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                      <a onClick={() => viewDetails(data._id)} className="text-indigo-600 hover:text-indigo-900">View</a>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <button onClick={() => Approval(data._id)} className="custom-select font-weight-bold bg-transparent text-info border-0" name="orderStatus">
                                        Approval
                                      </button>
                                    </td>
                                  </tr>
                                )}
                              </Fragment>
                            ))}
                          </tbody>
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
      </LayoutAdmin>
    </div>
  )
}

export default Managers
