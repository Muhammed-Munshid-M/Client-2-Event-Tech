// import React from 'react'

// function sample() {
//   return (
//     <div>
//       <nav class="bg-gray-800">
//   <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//     <div class="flex items-center justify-between h-16">
//       <div class="flex items-center">
//         <div class="hidden md:block">
//           <div class="flex items-baseline space-x-4">
//             <a href="#" class="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Home</a>

//             <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</a>

//             <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</a>
//           </div>
//         </div>
//       </div>

//       <div class="-mr-2 flex md:hidden">
//         <button type="button" class="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
//           <span class="sr-only">Open main menu</span>
//           <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
//             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
//           </svg>
//           <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
//             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>
//       </div>
//     </div>
//   </div>
//   <div class="hidden md:hidden" id="mobile-menu">
//     <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//       <a href="#" class="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Home</a>

//       <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</a>

//       <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</a>
//     </div>
//   </div>
// </nav>
// </div>
//   )
// }

// export default sample

const a = [3,8,10,2,4]
let largest = a[0]
let secondLargest = a[1]
let temp;
for (let i = 0; i < a.length; i++) {
    if (a[i]>largest) {
        temp=largest
        largest=secondLargest
        secondLargest=temp
    }
}
console.log(largest);
console.log(secondLargest);

import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import axios from 'axios'
import { managerUrl } from '../../../API/Api'

function MenuList() {
  const [starterModal, setStarterModal] = useState(false)
  const [mainModal, setMainModal] = useState(false)
  const [dessertsModal, setDessertsModal] = useState(false)
  const [saladsModal, setSaladsModal] = useState(false)
  const [starterName, setStarterName] = useState('')
  const [starterPrice, setStarterPrice] = useState('')
  const [mainName, setMainName] = useState('')
  const [mainPrice, setMainPrice] = useState('')
  const [dessertsName, setDessertsName] = useState('')
  const [dessertsPrice, setDessertsPrice] = useState('')
  const [saladsName, setSaladsName] = useState('')
  const [saladsPrice, setSaladsPrice] = useState('')
  const [catering, setCatering] = useState([])

  const openModal = async () => {
    setStarterModal(true)
  }

  const closeModal = async () => {
    setStarterModal(false)
  }

  const openMainModal = async () => {
    setMainModal(true)
  }

  const closeMainModal = async () => {
    setMainModal(false)
  }

  const openDessertsModal = async () => {
    setDessertsModal(true)
  }

  const closeDessertsModal = async () => {
    setDessertsModal(false)
  }

  const openSaladsModal = async () => {
    setSaladsModal(true)
  }

  const closeSaladsModal = async () => {
    setSaladsModal(false)
  }

  useEffect(() => {
    const MenuList = async () => {
      try {
        const token = localStorage.getItem('manager-token')
        await axios.post(`${managerUrl}view-services`, {},
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }).then((response) => {
            if (response.data.success) {
              console.log(response.data.data);
              const serviceData = response.data.data
              const services = serviceData.cateringMenu
              setCatering(services)
            }
          })
      } catch (error) {
        console.log(error);
      }
    }
    MenuList()
  }, [])

  return (
    <div>
      <Layout />
      <div className='mt-12' style={{ backgroundColor: 'rgb(210, 240, 275)' }}>
        <div className="max-w-7xl mx-auto  py-12 sm:px-6 lg:px-8">
          <div className="max-w-full mx-auto sm:ml-60">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h1 className="text-2xl font-medium text-gray-900">
                  {/* {managerDetails?.name} */}
                  Catering or Food Menu
                </h1>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {/* {managerDetails?.email} */}
                </p>
              </div>
              <div className="border-b border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  {catering.map((data) => (
                    <div className="py-4 sm:py-5 sm:ml-2 sm:grid lg:grid-cols-4 sm:grid-cols-4 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">{data.category_name[0]}</dt>
                      <dt className="text-sm font-medium text-gray-500">{data.category_name[1]}</dt>
                      <dt className="text-sm font-medium text-gray-500">{data.category_name[2]}</dt>
                      <dt className="text-sm font-medium text-gray-500">{data.category_name[3]}</dt>
                    </div>
                  ))}
                  <div className="py-4 sm:py-5 sm:grid sm:ml-2 sm:grid-cols-4 sm:gap-4 sm:px-6">
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">fdkh</dd>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
                      {/* {managerDetails?.company_name} */}hgd
                    </dd>
                  </div>
                </dl>
              </div>
              <div className='py-4 sm:py-5 sm:grid lg:grid-cols-4 sm:grid-cols-4 sm:gap-4 sm:px-6'>
                <div className="bg-gray-50 py-4">
                  {starterModal ? (
                    <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-10">
                      <div class="max-w-full p-6 bg-white divide-y divide-gray-500">
                        <div class="flex items-center justify-between">
                          <h3 class="text-2xl">Starter Details</h3>
                          <svg onClick={closeModal} xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div class="mt-4">
                          <form class="w-full max-w-xl">
                            <div class="md:flex md:items-center mb-6 mt-5">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-2" for="inline-password">
                                  Starter Name
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='text'
                                  value={starterName}
                                  onChange={(e) => setStarterName(e.target.value)} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center mb-6 mt-5">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0" for="inline-full-name">
                                  Price per head
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='number'
                                  value={starterPrice}
                                  onChange={(e) => setStarterPrice(e.target.value)} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center">
                              <div class="md:w-1/3"></div>
                              <div class="md:w-2/3">
                                <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                  Add
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-cyan-200 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm"
                      onClick={openModal}
                    >
                      Add
                    </button>
                  )}
                </div>
                <div className="bg-gray-50 py-4">
                  {mainModal ? (
                    <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-10">
                      <div class="max-w-xl p-6 bg-white divide-y divide-gray-500">
                        <div class="flex items-center justify-between">
                          <h3 class="text-2xl">Main Details</h3>
                          <svg onClick={closeMainModal} xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div class="mt-4">
                          <form class="w-full max-w-xl">
                            <div class="md:flex md:items-center mb-6 mt-5">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-2" for="inline-password">
                                  Main Name
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='text'
                                  value={mainName}
                                  onChange={(e) => setMainName(e.target.value)} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center mb-6 mt-5">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0" for="inline-full-name">
                                  Price per head
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='number'
                                  value={mainPrice}
                                  onChange={(e) => setMainPrice(e.target.value)} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center">
                              <div class="md:w-1/3"></div>
                              <div class="md:w-2/3">
                                <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                  Add
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-cyan-200 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm"
                      onClick={openMainModal}
                    >
                      Add
                    </button>
                  )}
                </div>
                <div className="bg-gray-50 py-4">
                  {dessertsModal ? (
                    <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-10">
                      <div class="max-w-xl p-6 bg-white divide-y divide-gray-500">
                        <div class="flex items-center justify-between">
                          <h3 class="text-2xl">Dessert Details</h3>
                          <svg onClick={closeDessertsModal} xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div class="mt-4">
                          <form class="w-full max-w-xl">
                            <div class="md:flex md:items-center mb-6 mt-5">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-2" for="inline-password">
                                  Dessert Name
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='text'
                                  value={dessertsName}
                                  onChange={(e) => setDessertsName(e.target.value)} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center mb-6 mt-5">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0" for="inline-full-name">
                                  Price per head
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='number'
                                  value={dessertsPrice}
                                  onChange={(e) => setDessertsPrice(e.target.value)} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center">
                              <div class="md:w-1/3"></div>
                              <div class="md:w-2/3">
                                <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                  Add
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-cyan-200 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm"
                      onClick={openDessertsModal}
                    >
                      Add
                    </button>
                  )}
                </div>
                <div className="bg-gray-50 py-4">
                  {saladsModal ? (
                    <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-10">
                      <div class="max-w-xl p-6 bg-white divide-y divide-gray-500">
                        <div class="flex items-center justify-between">
                          <h3 class="text-2xl">Salad Details</h3>
                          <svg onClick={closeSaladsModal} xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div class="mt-4">
                          <form class="w-full max-w-xl">
                            <div class="md:flex md:items-center mb-6 mt-5">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-2" for="inline-password">
                                  Salad Name
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='text'
                                  value={saladsName}
                                  onChange={(e) => setSaladsName(e.target.value)} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center mb-6 mt-5">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0" for="inline-full-name">
                                  Price per head
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='number'
                                  value={saladsPrice}
                                  onChange={(e) => setSaladsPrice(e.target.value)} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center">
                              <div class="md:w-1/3"></div>
                              <div class="md:w-2/3">
                                <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                  Add
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-cyan-200 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm"
                      onClick={openSaladsModal}
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Stage list */}


            <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-8">
              <div className="px-4 py-5 sm:px-6">
                <h1 className="text-2xl font-medium text-gray-900">
                  {/* {managerDetails?.name} */}
                  Stage Menu
                </h1>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {/* {managerDetails?.email} */}
                </p>
              </div>
              <div className="border-b border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid lg:grid-cols-3 sm:grid-cols-4 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Stage Photo</dt>
                    <dt className="text-sm font-medium text-gray-500">Stage Budget</dt>
                    <dt className="text-sm font-medium text-gray-500">Stage Size</dt>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">fdkh
                    </dd>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
                      {/* {managerDetails?.company_name} */}hgd
                    </dd>
                  </div>
                </dl>
              </div>
              <div className='py-4 sm:py-5 sm:grid lg:grid-cols-3 sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <div className="bg-gray-50 py-4">
                  {starterModal ? (
                    <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-10">
                      <div class="max-w-full p-6 bg-white divide-y divide-gray-500">
                        <div class="flex items-center justify-between">
                          <h3 class="text-2xl">Starter Details</h3>
                          <svg onClick={closeModal} xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div class="mt-4">
                          <form class="w-full max-w-xl">
                            <div class="md:flex md:items-center mb-6 mt-5">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-2" for="inline-password">
                                  Starter Name
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='text'
                                  value={starterName}
                                  onChange={(e) => setStarterName(e.target.value)} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center mb-6 mt-5">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0" for="inline-full-name">
                                  Price per head
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='number'
                                  value={starterPrice}
                                  onChange={(e) => setStarterPrice(e.target.value)} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center">
                              <div class="md:w-1/3"></div>
                              <div class="md:w-2/3">
                                <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                  Add
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-cyan-200 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm"
                      onClick={openModal}
                    >
                      Add
                    </button>
                  )}
                </div>
                <div className="bg-gray-50 py-4">
                  {mainModal ? (
                    <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-10">
                      <div class="max-w-xl p-6 bg-white divide-y divide-gray-500">
                        <div class="flex items-center justify-between">
                          <h3 class="text-2xl">Main Details</h3>
                          <svg onClick={closeMainModal} xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div class="mt-4">
                          <form class="w-full max-w-xl">
                            <div class="md:flex md:items-center mb-6 mt-5">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-2" for="inline-password">
                                  Main Name
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='text'
                                  value={mainName}
                                  onChange={(e) => setMainName(e.target.value)} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center mb-6 mt-5">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0" for="inline-full-name">
                                  Price per head
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='number'
                                  value={mainPrice}
                                  onChange={(e) => setMainPrice(e.target.value)} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center">
                              <div class="md:w-1/3"></div>
                              <div class="md:w-2/3">
                                <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                  Add
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-cyan-200 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm"
                      onClick={openMainModal}
                    >
                      Add
                    </button>
                  )}
                </div>
                <div className="bg-gray-50 py-4">
                  {dessertsModal ? (
                    <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-10">
                      <div class="max-w-xl p-6 bg-white divide-y divide-gray-500">
                        <div class="flex items-center justify-between">
                          <h3 class="text-2xl">Dessert Details</h3>
                          <svg onClick={closeDessertsModal} xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div class="mt-4">
                          <form class="w-full max-w-xl">
                            <div class="md:flex md:items-center mb-6 mt-5">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-2" for="inline-password">
                                  Dessert Name
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='text'
                                  value={dessertsName}
                                  onChange={(e) => setDessertsName(e.target.value)} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center mb-6 mt-5">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0" for="inline-full-name">
                                  Price per head
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='number'
                                  value={dessertsPrice}
                                  onChange={(e) => setDessertsPrice(e.target.value)} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center">
                              <div class="md:w-1/3"></div>
                              <div class="md:w-2/3">
                                <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                  Add
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-cyan-200 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm"
                      onClick={openDessertsModal}
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Decoration Menu */}


            <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-8">
              <div className="px-4 py-5 sm:px-6">
                <h1 className="text-2xl font-medium text-gray-900">
                  {/* {managerDetails?.name} */}
                  Decoration Menu
                </h1>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {/* {managerDetails?.email} */}
                </p>
              </div>
              <div className="border-b border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid lg:grid-cols-3 sm:grid-cols-4 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Decoration Photo</dt>
                    <dt className="text-sm font-medium text-gray-500">Including Photos</dt>
                    <dt className="text-sm font-medium text-gray-500">Decoration Budget</dt>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">fdkh
                    </dd>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
                      {/* {managerDetails?.company_name} */}hgd
                    </dd>
                  </div>
                </dl>
              </div>
              <div className='py-4 sm:py-5 sm:grid lg:grid-cols-3 sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <div className="bg-gray-50 py-4">
                  {starterModal ? (
                    <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-10">
                      <div class="max-w-full p-6 bg-white divide-y divide-gray-500">
                        <div class="flex items-center justify-between">
                          <h3 class="text-2xl">Starter Details</h3>
                          <svg onClick={closeModal} xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div class="mt-4">
                          <form class="w-full max-w-xl">
                            <div class="md:flex md:items-center mb-6 mt-5">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-2" for="inline-password">
                                  Starter Name
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='text'
                                  value={starterName}
                                  onChange={(e) => setStarterName(e.target.value)} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center mb-6 mt-5">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0" for="inline-full-name">
                                  Price per head
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='number'
                                  value={starterPrice}
                                  onChange={(e) => setStarterPrice(e.target.value)} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center">
                              <div class="md:w-1/3"></div>
                              <div class="md:w-2/3">
                                <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                  Add
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-cyan-200 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm"
                      onClick={openModal}
                    >
                      Add
                    </button>
                  )}
                </div>
                <div className="bg-gray-50 py-4">
                  {mainModal ? (
                    <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-10">
                      <div class="max-w-xl p-6 bg-white divide-y divide-gray-500">
                        <div class="flex items-center justify-between">
                          <h3 class="text-2xl">Main Details</h3>
                          <svg onClick={closeMainModal} xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div class="mt-4">
                          <form class="w-full max-w-xl">
                            <div class="md:flex md:items-center mb-6 mt-5">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-2" for="inline-password">
                                  Main Name
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='text'
                                  value={mainName}
                                  onChange={(e) => setMainName(e.target.value)} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center mb-6 mt-5">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0" for="inline-full-name">
                                  Price per head
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='number'
                                  value={mainPrice}
                                  onChange={(e) => setMainPrice(e.target.value)} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center">
                              <div class="md:w-1/3"></div>
                              <div class="md:w-2/3">
                                <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                  Add
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-cyan-200 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm"
                      onClick={openMainModal}
                    >
                      Add
                    </button>
                  )}
                </div>
                <div className="bg-gray-50 py-4">
                  {dessertsModal ? (
                    <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-10">
                      <div class="max-w-xl p-6 bg-white divide-y divide-gray-500">
                        <div class="flex items-center justify-between">
                          <h3 class="text-2xl">Dessert Details</h3>
                          <svg onClick={closeDessertsModal} xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div class="mt-4">
                          <form class="w-full max-w-xl">
                            <div class="md:flex md:items-center mb-6 mt-5">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-2" for="inline-password">
                                  Dessert Name
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='text'
                                  value={dessertsName}
                                  onChange={(e) => setDessertsName(e.target.value)} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center mb-6 mt-5">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0" for="inline-full-name">
                                  Price per head
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='number'
                                  value={dessertsPrice}
                                  onChange={(e) => setDessertsPrice(e.target.value)} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center">
                              <div class="md:w-1/3"></div>
                              <div class="md:w-2/3">
                                <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                  Add
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-cyan-200 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm"
                      onClick={openDessertsModal}
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
            </div>


            {/* Stage Menu */}



            <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-8">
              <div className="px-4 py-5 sm:px-6">
                <h1 className="text-2xl font-medium text-gray-900">
                  {/* {managerDetails?.name} */}
                  Audio Menu
                </h1>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {/* {managerDetails?.email} */}
                </p>
              </div>
              <div className="border-b border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid lg:grid-cols-3 sm:grid-cols-4 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Audio Things Photos</dt>
                    <dt className="text-sm font-medium text-gray-500">Audio Things</dt>
                    <dt className="text-sm font-medium text-gray-500">Price</dt>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">fdkh
                    </dd>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
                      {/* {managerDetails?.company_name} */}hgd
                    </dd>
                  </div>
                </dl>
              </div>
              <div className='py-4 sm:py-5 sm:grid lg:grid-cols-3 sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <div className="bg-gray-50 py-4">
                  {starterModal ? (
                    <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-10">
                      <div class="max-w-full p-6 bg-white divide-y divide-gray-500">
                        <div class="flex items-center justify-between">
                          <h3 class="text-2xl">Starter Details</h3>
                          <svg onClick={closeModal} xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div class="mt-4">
                          <form class="w-full max-w-xl">
                            <div class="md:flex md:items-center mb-6 mt-5">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-2" for="inline-password">
                                  Starter Name
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='text'
                                  value={starterName}
                                  onChange={(e) => setStarterName(e.target.value)} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center mb-6 mt-5">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0" for="inline-full-name">
                                  Price per head
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='number'
                                  value={starterPrice}
                                  onChange={(e) => setStarterPrice(e.target.value)} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center">
                              <div class="md:w-1/3"></div>
                              <div class="md:w-2/3">
                                <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                  Add
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-cyan-200 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm"
                      onClick={openModal}
                    >
                      Add
                    </button>
                  )}
                </div>
                <div className="bg-gray-50 py-4">
                  {mainModal ? (
                    <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-10">
                      <div class="max-w-xl p-6 bg-white divide-y divide-gray-500">
                        <div class="flex items-center justify-between">
                          <h3 class="text-2xl">Main Details</h3>
                          <svg onClick={closeMainModal} xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div class="mt-4">
                          <form class="w-full max-w-xl">
                            <div class="md:flex md:items-center mb-6 mt-5">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-2" for="inline-password">
                                  Main Name
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='text'
                                  value={mainName}
                                  onChange={(e) => setMainName(e.target.value)} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center mb-6 mt-5">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0" for="inline-full-name">
                                  Price per head
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='number'
                                  value={mainPrice}
                                  onChange={(e) => setMainPrice(e.target.value)} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center">
                              <div class="md:w-1/3"></div>
                              <div class="md:w-2/3">
                                <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                  Add
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-cyan-200 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm"
                      onClick={openMainModal}
                    >
                      Add
                    </button>
                  )}
                </div>
                <div className="bg-gray-50 py-4">
                  {dessertsModal ? (
                    <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-10">
                      <div class="max-w-xl p-6 bg-white divide-y divide-gray-500">
                        <div class="flex items-center justify-between">
                          <h3 class="text-2xl">Dessert Details</h3>
                          <svg onClick={closeDessertsModal} xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div class="mt-4">
                          <form class="w-full max-w-xl">
                            <div class="md:flex md:items-center mb-6 mt-5">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-2" for="inline-password">
                                  Dessert Name
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='text'
                                  value={dessertsName}
                                  onChange={(e) => setDessertsName(e.target.value)} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center mb-6 mt-5">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0" for="inline-full-name">
                                  Price per head
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='number'
                                  value={dessertsPrice}
                                  onChange={(e) => setDessertsPrice(e.target.value)} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center">
                              <div class="md:w-1/3"></div>
                              <div class="md:w-2/3">
                                <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                  Add
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-cyan-200 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm"
                      onClick={openDessertsModal}
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
            </div>


            {/* Video Menu */}


            
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-8">
              <div className="px-4 py-5 sm:px-6">
                <h1 className="text-2xl font-medium text-gray-900">
                  {/* {managerDetails?.name} */}
                  Video Menu
                </h1>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {/* {managerDetails?.email} */}
                </p>
              </div>
              <div className="border-b border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid lg:grid-cols-3 sm:grid-cols-4 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Video Things Photos</dt>
                    <dt className="text-sm font-medium text-gray-500">Video Things</dt>
                    <dt className="text-sm font-medium text-gray-500">Price</dt>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">fdkh
                    </dd>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
                      {/* {managerDetails?.company_name} */}hgd
                    </dd>
                  </div>
                </dl>
              </div>
              <div className='py-4 sm:py-5 sm:grid lg:grid-cols-3 sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <div className="bg-gray-50 py-4">
                  {starterModal ? (
                    <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-10">
                      <div class="max-w-full p-6 bg-white divide-y divide-gray-500">
                        <div class="flex items-center justify-between">
                          <h3 class="text-2xl">Starter Details</h3>
                          <svg onClick={closeModal} xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div class="mt-4">
                          <form class="w-full max-w-xl">
                            <div class="md:flex md:items-center mb-6 mt-5">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-2" for="inline-password">
                                  Starter Name
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='text'
                                  value={starterName}
                                  onChange={(e) => setStarterName(e.target.value)} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center mb-6 mt-5">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0" for="inline-full-name">
                                  Price per head
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='number'
                                  value={starterPrice}
                                  onChange={(e) => setStarterPrice(e.target.value)} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center">
                              <div class="md:w-1/3"></div>
                              <div class="md:w-2/3">
                                <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                  Add
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-cyan-200 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm"
                      onClick={openModal}
                    >
                      Add
                    </button>
                  )}
                </div>
                <div className="bg-gray-50 py-4">
                  {mainModal ? (
                    <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-10">
                      <div class="max-w-xl p-6 bg-white divide-y divide-gray-500">
                        <div class="flex items-center justify-between">
                          <h3 class="text-2xl">Main Details</h3>
                          <svg onClick={closeMainModal} xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div class="mt-4">
                          <form class="w-full max-w-xl">
                            <div class="md:flex md:items-center mb-6 mt-5">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-2" for="inline-password">
                                  Main Name
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='text'
                                  value={mainName}
                                  onChange={(e) => setMainName(e.target.value)} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center mb-6 mt-5">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0" for="inline-full-name">
                                  Price per head
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='number'
                                  value={mainPrice}
                                  onChange={(e) => setMainPrice(e.target.value)} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center">
                              <div class="md:w-1/3"></div>
                              <div class="md:w-2/3">
                                <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                  Add
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-cyan-200 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm"
                      onClick={openMainModal}
                    >
                      Add
                    </button>
                  )}
                </div>
                <div className="bg-gray-50 py-4">
                  {dessertsModal ? (
                    <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-10">
                      <div class="max-w-xl p-6 bg-white divide-y divide-gray-500">
                        <div class="flex items-center justify-between">
                          <h3 class="text-2xl">Dessert Details</h3>
                          <svg onClick={closeDessertsModal} xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div class="mt-4">
                          <form class="w-full max-w-xl">
                            <div class="md:flex md:items-center mb-6 mt-5">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-2" for="inline-password">
                                  Dessert Name
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='text'
                                  value={dessertsName}
                                  onChange={(e) => setDessertsName(e.target.value)} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center mb-6 mt-5">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0" for="inline-full-name">
                                  Price per head
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='number'
                                  value={dessertsPrice}
                                  onChange={(e) => setDessertsPrice(e.target.value)} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center">
                              <div class="md:w-1/3"></div>
                              <div class="md:w-2/3">
                                <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                  Add
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-cyan-200 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm"
                      onClick={openDessertsModal}
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuList
