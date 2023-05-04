import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import axios from 'axios'
import { managerUrl } from '../../../API/Api'

function MenuList() {
  const [modal, setModal] = useState(false)
  const [stage, setStage] = useState(false)
  const [decoration, setDecoration] = useState(false)
  const [audio, setAudio] = useState(false)
  const [video, setVideo] = useState(false)
  const [starterName, setStarterName] = useState('')
  const [starterPrice, setStarterPrice] = useState('')
  const [starterImage, setStarterImage] = useState()
  const [mainName, setMainName] = useState('')
  const [mainPrice, setMainPrice] = useState('')
  const [mainImage, setMainImage] = useState()
  const [dessertsName, setDessertsName] = useState('')
  const [dessertsPrice, setDessertsPrice] = useState('')
  const [dessertsImage, setDessertImage] = useState()
  const [saladsName, setSaladsName] = useState('')
  const [saladsPrice, setSaladsPrice] = useState('')
  const [saladsImage, setSaladImage] = useState()
  const [catering, setCatering] = useState([])
  const [cateringMenu, setCateringMenu] = useState([])

  const cateringData = { starterName, starterPrice, mainName, mainPrice, dessertsName, dessertsPrice, saladsName, saladsPrice }

  const openModal = async () => {
    setModal(true)
  }

  const closeModal = async () => {
    setModal(false)
  }

  const openStage = async () => {
    setStage(true)
  }

  const closeStage = async () => {
    setStage(false)
  }

  const openDecoration = async () => {
    setDecoration(true)
  }

  const closeDecoration = async () => {
    setDecoration(false)
  }

    const openAudio = async () => {
    setAudio(true)
  }

  const closeAudio = async () => {
    setAudio(false)
  }

    const openVideo = async () => {
      setVideo(true)
  }

  const closeVideo = async () => {
    setVideo(false)
  }

  const submitCatering = async () => {
    try {
      setModal(false)
      // window.location.reload()
      console.log('Hiiiiii');

      const uploadImage = async (image, name) => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "Event_Tech");
        const response = await axios.post("https://api.cloudinary.com/v1_1/dnrcd8rxl/image/upload", data);
        return response.data.url
      };


      await Promise.all([uploadImage(starterImage, "starterImage"), uploadImage(mainImage, "mainImage"),
       uploadImage(dessertsImage, "dessertsImage"),uploadImage(saladsImage, "saladsImage")]).then(async(response) => {
        console.log('response image',response)
        const imageUpload1 = response[0]
        const imageUpload2 = response[1]
        const imageUpload3 = response[2]
        const imageUpload4 = response[3]
        const managerData = {cateringData, imageUpload1, imageUpload2, imageUpload3, imageUpload4 }
        console.log('managerdaaarttaaaaaa:'+imageUpload1);
        const token = localStorage.getItem('manager-token')
        await axios.post(`${managerUrl}add-catering`, managerData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            console.log('Hi');
            if (response.data.success) {
              const serviceData = response.data.data
              console.log(serviceData)
              const services = serviceData.cateringMenu[0]
              const cateringName = services.category_name
              const menu = serviceData.cateringMenu
              setCatering(cateringName)
              setCateringMenu(menu)
            } else {
              toast.error('something error')
              navigate('/add-event')
            }
          })
          .catch((err) => {
            console.log(err);
          })
        })
    } catch (error) {
      console.log(error)
      toast.error('something error')
    }
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
              const serviceData = response.data.data
              console.log(serviceData);
              const services = serviceData.cateringMenu[0]
              const cateringName = services.category_name
              const menu = serviceData.cateringMenu
              setCatering(cateringName)
              setCateringMenu(menu)
              // window.location.reload()
            } else {
              toast.error('Something Error')
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
                  <div className="py-4 sm:py-5 sm:grid lg:grid-cols-4 sm:grid-cols-4 sm:gap-4 sm:px-6">
                    {catering.map((data) => (
                      <dt className="text-sm font-medium text-gray-500">{data}</dt>
                    ))}
                  </div>
                  {cateringMenu.map((data) => (
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{data.starter_name}</dd>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{data.main_name}</dd>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{data.dessert_name}</dd>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{data.salad_name}</dd>
                    </div>
                  ))}
                  {/* {cateringMenu.map((data) => (
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{data.dessert_name}</dd>
                  ))}
                  {cateringMenu.map((data) => (
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{data.salad_name}</dd>
                  ))} */}
                </dl>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6 sm:text-center">
                {modal ? (
                  <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-10">
                    <div class="max-w-5xl ml-56 p-6 bg-white">
                      <div class="flex items-center justify-between">
                        <h3 class="text-2xl">Catering Menu Details</h3>
                        <svg onClick={closeModal} xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className='flex items-center justify-between'>
                        <div class="mt-4">
                          <form class="w-full max-w-xl">
                            <div class="md:flex md:items-center mb-6 mt-5">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                                  Starter Name
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='text'
                                  placeholder='starter Name'
                                  value={starterName}
                                  onChange={(e) => setStarterName(e.target.value)} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center mb-6 mt-5">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                  Main Name
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='text'
                                  placeholder='Main Name'
                                  value={mainName}
                                  onChange={(e) => setMainName(e.target.value)} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center mb-6">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                                  Dessert Name
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='text'
                                  placeholder='Dessert Name'
                                  value={dessertsName}
                                  onChange={(e) => setDessertsName(e.target.value)} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center mb-6">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                  Salad Name
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='text'
                                  placeholder='Salad Name'
                                  value={saladsName}
                                  onChange={(e) => setSaladsName(e.target.value)} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center">
                              <div class="md:w-1/3"></div>
                              <div class="md:w-2/3">
                              </div>
                            </div>
                          </form>
                        </div>
                        <div class="mt-4">
                          <form class="w-full max-w-xl">
                            <div class="md:flex md:items-center mb-6 mt-5">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                                  Starter Price
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='number'
                                  placeholder='Price/Head'
                                  value={starterPrice}
                                  onChange={(e) => setStarterPrice(e.target.value)} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center mb-6 mt-5">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                  Main Price
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='number'
                                  placeholder='Price/Head'
                                  value={mainPrice}
                                  onChange={(e) => setMainPrice(e.target.value)} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center mb-6">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                                  Dessert Price
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='number'
                                  placeholder='Price/Head'
                                  value={dessertsPrice}
                                  onChange={(e) => setDessertsPrice(e.target.value)} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center mb-6">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                  Salad Price
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='number'
                                  placeholder='Price/Head'
                                  value={saladsPrice}
                                  onChange={(e) => setSaladsPrice(e.target.value)} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center">
                              <div class="md:w-1/3"></div>
                              <div class="md:w-2/3">
                              </div>
                            </div>
                          </form>
                        </div>
                        <div class="mt-4">
                          <form class="w-full max-w-xl">
                            <div class="md:flex md:items-center mb-6 mt-5">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                                  Starter Image
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='file'
                                  onChange={(e) => setStarterImage(e.target.files[0])} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center mb-6 mt-5">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                  Main Image
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='file'
                                  onChange={(e) => setMainImage(e.target.files[0])} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center mb-6">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                                  Dessert Image
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='file'
                                  onChange={(e) => setDessertImage(e.target.files[0])} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center mb-6">
                              <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                  Salad Image
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  type='file'
                                  onChange={(e) => setSaladImage(e.target.files[0])} />
                              </div>
                            </div>
                            <div class="md:flex md:items-center">
                              <div class="md:w-1/3"></div>
                              <div class="md:w-2/3">
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div class="md:flex md:items-center justify-center">
                        <div class="">
                          <button onClick={submitCatering} class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-cyan-200 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={openModal}
                  >
                    Add Menu
                  </button>
                )}
              </div>
            </div>
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
              <div className="bg-gray-50 px-4 py-4 sm:px-6 sm:text-center">
                {stage ? (
                  <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-10">
                    <div class="max-w-xl p-6 bg-white divide-y divide-gray-500">
                      <div class="flex items-center justify-between">
                        <h3 class="text-2xl">Stage Menu Details</h3>
                        <svg onClick={closeStage} xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div class="mt-4">
                        <form class="w-full max-w-xl">
                          <div class="md:flex md:items-center mb-6 mt-5">
                            <div class="md:w-1/3">
                              <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                Stage Photo
                              </label>
                            </div>
                            <div class="md:w-2/3">
                              <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="file" accept='image/*'
                              />
                            </div>
                          </div>
                          <div class="md:flex md:items-center mb-6">
                            <div class="md:w-1/3">
                              <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                                Stage Budget
                              </label>
                            </div>
                            <div class="md:w-2/3">
                              <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="number" placeholder='Price' value={price}
                                // onChange={(e) => setPrice(e.target.value)}
                                 />
                            </div>
                          </div>
                          <div class="md:flex md:items-center mb-6">
                            <div class="md:w-1/3">
                              <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                Included Things
                              </label>
                            </div>
                            <div class="md:w-2/3">
                              <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder='Add Item' />
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
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-cyan-200 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={openStage}
                  >
                    Add Menu
                  </button>
                )}
              </div>
            </div>
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
              <div className="bg-gray-50 px-4 py-4 sm:px-6 sm:text-center">
                {decoration ? (
                  <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-10">
                    <div class="max-w-xl p-6 bg-white divide-y divide-gray-500">
                      <div class="flex items-center justify-between">
                        <h3 class="text-2xl">Stage Menu Details</h3>
                        <svg onClick={closeDecoration} xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div class="mt-4">
                        <form class="w-full max-w-xl">
                          <div class="md:flex md:items-center mb-6 mt-5">
                            <div class="md:w-1/3">
                              <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                Stage Photo
                              </label>
                            </div>
                            <div class="md:w-2/3">
                              <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="file" accept='image/*'
                              />
                            </div>
                          </div>
                          <div class="md:flex md:items-center mb-6">
                            <div class="md:w-1/3">
                              <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                                Stage Budget
                              </label>
                            </div>
                            <div class="md:w-2/3">
                              <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="number" placeholder='Price' value={price}
                                onChange={(e) => setPrice(e.target.value)} />
                            </div>
                          </div>
                          <div class="md:flex md:items-center mb-6">
                            <div class="md:w-1/3">
                              <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                Included Things
                              </label>
                            </div>
                            <div class="md:w-2/3">
                              <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder='Add Item' />
                            </div>
                          </div>
                          {/* <div>
                            {[...Array(inputCount)].map((value, index) => (
                              <input
                                key={index}
                                type="text"
                                className="form-control mt-3"
                                name="image"
                              />
                            ))}
                            <button onClick={addMore}>Add more</button>
                          </div> */}
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
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-cyan-200 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={openDecoration}
                  >
                    Add Menu
                  </button>
                )}

              </div>
            </div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-8">
              <div className="px-4 py-5 sm:px-6">
                <h1 className="text-2xl font-medium text-gray-900">
                  {/* {managerDetails?.name} */}
                  Photography Menu
                </h1>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {/* {managerDetails?.email} */}
                </p>
              </div>
              <div className="border-b border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid lg:grid-cols-5 sm:grid-cols-5 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Recent Photography Photos</dt>
                    <dt className="text-sm font-medium text-gray-500">Shop Name</dt>
                    <dt className="text-sm font-medium text-gray-500">Mobile Number</dt>
                    <dt className="text-sm font-medium text-gray-500">Address</dt>
                    <dt className="text-sm font-medium text-gray-500">Budget</dt>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6">
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">fdkh
                    </dd>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
                      {/* {managerDetails?.company_name} */}hgd
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6 sm:text-center">
                {audio ? (
                  <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-10">
                    <div class="max-w-xl p-6 bg-white divide-y divide-gray-500">
                      <div class="flex items-center justify-between">
                        <h3 class="text-2xl">Stage Menu Details</h3>
                        <svg onClick={closeAudio} xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div class="mt-4">
                        <form class="w-full max-w-xl">
                          <div class="md:flex md:items-center mb-6 mt-5">
                            <div class="md:w-1/3">
                              <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                Stage Photo
                              </label>
                            </div>
                            <div class="md:w-2/3">
                              <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="file" accept='image/*'
                              />
                            </div>
                          </div>
                          <div class="md:flex md:items-center mb-6">
                            <div class="md:w-1/3">
                              <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                                Stage Budget
                              </label>
                            </div>
                            <div class="md:w-2/3">
                              <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="number" placeholder='Price' value={price}
                                onChange={(e) => setPrice(e.target.value)} />
                            </div>
                          </div>
                          <div class="md:flex md:items-center mb-6">
                            <div class="md:w-1/3">
                              <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                Included Things
                              </label>
                            </div>
                            <div class="md:w-2/3">
                              <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder='Add Item' />
                            </div>
                          </div>
                          {/* <div>
                            {[...Array(inputCount)].map((value, index) => (
                              <input
                                key={index}
                                type="text"
                                className="form-control mt-3"
                                name="image"
                              />
                            ))}
                            <button onClick={addMore}>Add more</button>
                          </div> */}
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
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-cyan-200 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={openAudio}
                  >
                    Add Menu
                  </button>
                )}

              </div>
            </div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-8">
              <div className="px-4 py-5 sm:px-6">
                <h1 className="text-2xl font-medium text-gray-900">
                  {/* {managerDetails?.name} */}
                  Luxury Vehicles Menu
                </h1>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {/* {managerDetails?.email} */}
                </p>
              </div>
              <div className="border-b border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid lg:grid-cols-4 sm:grid-cols-4 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Vehicle</dt>
                    <dt className="text-sm font-medium text-gray-500">Owner Name</dt>
                    <dt className="text-sm font-medium text-gray-500">Mobile Number</dt>
                    <dt className="text-sm font-medium text-gray-500">Rent Price</dt>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">fdkh
                    </dd>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
                      {/* {managerDetails?.company_name} */}hgd
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6 sm:text-center">
                {video ? (
                  <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-10">
                    <div class="max-w-xl p-6 bg-white divide-y divide-gray-500">
                      <div class="flex items-center justify-between">
                        <h3 class="text-2xl">Stage Menu Details</h3>
                        <svg onClick={closeVideo} xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div class="mt-4">
                        <form class="w-full max-w-xl">
                          <div class="md:flex md:items-center mb-6 mt-5">
                            <div class="md:w-1/3">
                              <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                Stage Photo
                              </label>
                            </div>
                            <div class="md:w-2/3">
                              <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="file" accept='image/*'
                              />
                            </div>
                          </div>
                          <div class="md:flex md:items-center mb-6">
                            <div class="md:w-1/3">
                              <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                                Stage Budget
                              </label>
                            </div>
                            <div class="md:w-2/3">
                              <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="number" placeholder='Price' value={price}
                                onChange={(e) => setPrice(e.target.value)} />
                            </div>
                          </div>
                          <div class="md:flex md:items-center mb-6">
                            <div class="md:w-1/3">
                              <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                Included Things
                              </label>
                            </div>
                            <div class="md:w-2/3">
                              <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder='Add Item' />
                            </div>
                          </div>
                          {/* <div>
                            {[...Array(inputCount)].map((value, index) => (
                              <input
                                key={index}
                                type="text"
                                className="form-control mt-3"
                                name="image"
                              />
                            ))}
                            <button onClick={addMore}>Add more</button>
                          </div> */}
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
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-cyan-200 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={openVideo}
                  >
                    Add Menu
                  </button>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuList
