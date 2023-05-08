import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { adminUrl } from '../../../API/Api'
import LayoutAdmin from '../LayoutAdmin'
import { CircularProgress } from '@mui/material'

function Users() {
  const [user, setUser] = useState()
  const [block, setBlock] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [])

  const Block = async (id) => {
    const response = await axios.post(`${adminUrl}block-users?userId=${id}`, { block })
    if (response.data.block) {
      toast.success(response.data.message)
      setBlock(true)
    } else if (response.data.unBlock) {
      toast.success(response.data.message)
      setBlock(false)
    } else {
      console.log('error');
    }
  }

  useEffect(() => {
    const users = async () => {
      try {
        await axios.get(`${adminUrl}users`).then((response) => {
          const user = response.data
          setUser(user)
        })
      } catch (error) {
        console.log(error);
      }
    }
    users()
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
                    <h1 className='font-bold text-xl mb-5'>Users List</h1>
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
                            Mobile
                          </th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Access
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-slate-400 divide-y divide-gray-200">
                        {user.map((data) => (
                          <tr class="hover:bg-slate-200 transition duration-300">
                            <td class="px-6 py-4 whitespace-nowrap">
                              <div class="flex items-center">
                                <div class="flex-shrink-0 h-10 w-10">
                                  <img class="h-10 w-10 rounded-full" src="https://via.placeholder.com/150" alt="" />
                                </div>
                                <div class="ml-4">
                                  <div class="text-sm font-medium text-gray-900">
                                    {data.name}
                                  </div>
                                  <div class="text-sm text-gray-500">
                                    {data.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                              <div class="text-sm text-gray-900">{data.email}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                              <div class="text-sm text-gray-900">{data.mobile}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                              {block == false ? (
                                <button onClick={() => Block(data._id)} value={block} class="custom-select font-weight-bold bg-transparent text-info border-0" name="orderStatus">
                                  Block
                                </button>
                              ) : (
                                <button onClick={() => Block(data._id)} value={block} class="custom-select font-weight-bold bg-transparent text-info border-0" name="orderStatus">
                                  Un Block
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
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

export default Users
