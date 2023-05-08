import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import LayoutAdmin from '../LayoutAdmin'

function SalesReport() {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
          setLoading(false)
        }, 1000);
      }, [])

    return (
        <div>
            <LayoutAdmin>
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
                                                <tbody class="bg-slate-400 divide-y divide-gray-200">
                                                    {/* {user.map((data) => ( */}
                                                        <tr class="hover:bg-slate-200 transition duration-300">
                                                            <td class="px-6 py-4 whitespace-nowrap">
                                                                <div class="flex items-center">
                                                                    <div class="ml-4">
                                                                        <div class="text-sm font-medium text-gray-900">
                                                                            437612834542
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td class="px-6 py-4 whitespace-nowrap">
                                                                {/* <div class="text-sm text-gray-900">{data.email}</div> */}
                                                            </td>
                                                            <td class="px-6 py-4 whitespace-nowrap">
                                                                {/* <div class="text-sm text-gray-900">{data.mobile}</div> */}
                                                            </td>
                                                        </tr>
                                                    {/* // ))} */}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </body>
                        </>
                    )
                }
            </LayoutAdmin>
        </div>
    )
}

export default SalesReport
