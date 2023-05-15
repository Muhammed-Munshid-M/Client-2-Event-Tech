import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import axios from 'axios'
import Swal from 'sweetalert2'
import { managerUrl } from '../../../API/Api'
import { toast } from 'react-hot-toast';

function MenuList() {
  const [modal, setModal] = useState(false)
  const [stage, setStage] = useState(false)
  const [decoration, setDecoration] = useState(false)
  const [photography, setPhotography] = useState(false)
  const [vehicles, setVehicles] = useState(false)
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
  const [stageData, setStageData] = useState([])
  const [stageDataMenu, setStageDataMenu] = useState([])
  const [decorateData, setDecorateData] = useState([])
  const [decorateDataMenu, setDecorateDataMenu] = useState([])
  const [photographyData, setPhotographyData] = useState([])
  const [photographyDataMenu, setPhotographyDataMenu] = useState([])
  const [vehicleData, setVehicleData] = useState([])
  const [vehicleDataMenu, setVehicleDataMenu] = useState([])
  const [stagePhoto, setStagePhoto] = useState()
  const [stageBudget, setStageBudget] = useState('')
  const [stageSize, setStageSize] = useState('')
  const [budget, setBudget] = useState('')
  const [decoratePhoto, setDecoratePhoto] = useState()
  const [includingPhotos, setIncludingPhotos] = useState()
  const [recentPhotos, setRecentPhotos] = useState()
  const [shopName, setShopName] = useState('')
  const [mobile, setMobile] = useState('')
  const [address, setAddress] = useState('')
  const [budgetPhoto, setBudgetPhoto] = useState('')
  const [vehicle, setVehicle] = useState()
  const [owner, setOwner] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [rent, setRent] = useState('')

  const cateringData = { starterName, starterPrice, mainName, mainPrice, dessertsName, dessertsPrice, saladsName, saladsPrice }
  const stageDatas = { stageBudget, stageSize }
  const photographyDatas = { shopName, mobile, address, budgetPhoto }
  const vehicleDatas = { owner, mobileNumber, rent }

  const openModal = async () => {
    setModal(true)
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  const closeModal = async () => {
    setModal(false)
  }

  const openStage = async () => {
    setStage(true)
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  const closeStage = async () => {
    setStage(false)
  }

  const openDecoration = async () => {
    setDecoration(true)
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  const closeDecoration = async () => {
    setDecoration(false)
  }

  const openPhotography = async () => {
    setPhotography(true)
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  const closePhotography = async () => {
    setPhotography(false)
  }

  const openVehicles = async () => {
    setVehicles(true)
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  const closeVehicles = async () => {
    setVehicles(false)
  }

  // Submit Catering

  const submitCatering = async () => {
    try {
      setModal(false)
      const uploadImage = async (image, name) => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "Event_Tech");
        const response = await axios.post("https://api.cloudinary.com/v1_1/dnrcd8rxl/image/upload", data);
        return response.data.url
      };


      await Promise.all([uploadImage(starterImage, "starterImage"), uploadImage(mainImage, "mainImage"),
      uploadImage(dessertsImage, "dessertsImage"), uploadImage(saladsImage, "saladsImage")]).then(async (response) => {
        console.log('response image', response)
        const imageUpload1 = response[0]
        const imageUpload2 = response[1]
        const imageUpload3 = response[2]
        const imageUpload4 = response[3]
        const managerData = { cateringData, imageUpload1, imageUpload2, imageUpload3, imageUpload4 }
        console.log('managerdaaarttaaaaaa:' + imageUpload1);
        const token = localStorage.getItem('manager-token')
        await axios.post(`${managerUrl}add-catering`, managerData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            console.log('Hi');
            if (response.data.success) {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Catering Menu Added',
                showConfirmButton: true
              }).then(() => {
                window.location.reload()
              })
            } else {
              toast.error('something error')
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

  // Submit Stage

  const submitStage = async () => {
    try {
      setStage(false)
      // window.location.reload()

      const uploadImage = async (image, name) => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "Event_Tech");
        const response = await axios.post("https://api.cloudinary.com/v1_1/dnrcd8rxl/image/upload", data);
        return response.data.url
      };


      await Promise.all([uploadImage(stagePhoto, "stagePhoto")]).then(async (response) => {
        console.log('response image', response)
        const imageUpload1 = response[0]
        const managerData = { stageDatas, imageUpload1 }
        console.log('managerdaaarttaaaaaa:' + managerData.stageDatas.stageBudget);
        const token = localStorage.getItem('manager-token')
        await axios.post(`${managerUrl}add-stage`, managerData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            console.log('Hi');
            if (response.data.success) {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Stage Menu Added',
                showConfirmButton: true
              }).then(() => {
                window.location.reload()
              })
            } else {
              toast.error('something error')
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

  // Submit Decorate

  const submitDecorate = async () => {
    try {
      setDecoration(false)
      // window.location.reload()

      const uploadImage = async (image, name) => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "Event_Tech");
        const response = await axios.post("https://api.cloudinary.com/v1_1/dnrcd8rxl/image/upload", data);
        return response.data.url
      };


      await Promise.all([uploadImage(decoratePhoto, "decoratePhoto"), uploadImage(includingPhotos, "includingPhotos")]).then(async (response) => {
        console.log('response image', response)
        const imageUpload1 = response[0]
        const imageUpload2 = response[1]
        const managerData = { imageUpload1, imageUpload2, budget }
        const token = localStorage.getItem('manager-token')
        await axios.post(`${managerUrl}add-decorate`, managerData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            console.log('Hi');
            if (response.data.success) {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Decorate Menu Added',
                showConfirmButton: true
              }).then(() => {
                window.location.reload()
              })
            } else {
              toast.error('something error')
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


  // Submit Photography

  const submitPhotography = async () => {
    try {
      setPhotography(false)
      // window.location.reload()

      const uploadImage = async (image, name) => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "Event_Tech");
        const response = await axios.post("https://api.cloudinary.com/v1_1/dnrcd8rxl/image/upload", data);
        return response.data.url
      };


      await Promise.all([uploadImage(recentPhotos, "recentPhotos")]).then(async (response) => {
        console.log('response image', response)
        const imageUpload1 = response[0]
        const managerData = { imageUpload1, photographyDatas }
        const token = localStorage.getItem('manager-token')
        await axios.post(`${managerUrl}add-photography`, managerData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            console.log('Hi');
            if (response.data.success) {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'PhotographyMenu Added',
                showConfirmButton: true
              }).then(() => {
                window.location.reload()
              })
            } else {
              toast.error('something error')
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


  // Submit Vehicle

  const submitVehicle = async () => {
    try {
      setVehicles(false)
      // window.location.reload()

      const uploadImage = async (image, name) => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "Event_Tech");
        const response = await axios.post("https://api.cloudinary.com/v1_1/dnrcd8rxl/image/upload", data);
        return response.data.url
      };


      await Promise.all([uploadImage(vehicle, "vehicle")]).then(async (response) => {
        console.log('response image', response)
        const imageUpload1 = response[0]
        const managerData = { imageUpload1, vehicleDatas }
        const token = localStorage.getItem('manager-token')
        await axios.post(`${managerUrl}add-vehicle`, managerData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            console.log('Hi');
            if (response.data.success) {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'VehicleMenu Added',
                showConfirmButton: true
              }).then(() => {
                window.location.reload()
              })
            } else {
              toast.error('something error')
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
              const cateringMenu = serviceData.cateringMenu
              const stageService = serviceData.stageMenu[0]
              const stageName = stageService.category_name
              const stageMenu = serviceData.stageMenu
              const decorateService = serviceData.decorationMenu[0]
              const decorateName = decorateService.category_name
              const decorateMenu = serviceData.decorationMenu
              const photographyService = serviceData.photographyMenu[0]
              const photographyName = photographyService.category_name
              const photographyMenu = serviceData.photographyMenu
              const vehicleService = serviceData.luxuryVehicleMenu[0]
              const vehicleName = vehicleService.category_name
              const vehicleMenu = serviceData.luxuryVehicleMenu

              setCatering(cateringName)
              setCateringMenu(cateringMenu)
              setStageData(stageName)
              setStageDataMenu(stageMenu)
              setDecorateData(decorateName)
              setDecorateDataMenu(decorateMenu)
              setPhotographyData(photographyName)
              setPhotographyDataMenu(photographyMenu)
              setVehicleData(vehicleName)
              setVehicleDataMenu(vehicleMenu)
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
                          <button onClick={submitCatering} class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
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
                  Stage Menu
                </h1>
              </div>
              <div className="border-b border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid lg:grid-cols-3 sm:grid-cols-4 sm:gap-4 sm:px-6">
                    {stageData.map((data) => (
                      <dt className="text-sm font-medium text-gray-500">{data}</dt>
                    ))}
                  </div>
                  {stageDataMenu.map((data) => (
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <img width='230px' src={data.stage_photo} className="mt-1 text-sm text-gray-900 sm:mt-0 " />
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{data.stage_budget}</dd>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{data.stage_size}</dd>
                    </div>
                  ))}
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
                                onChange={(e) => setStagePhoto(e.target.files[0])} />
                            </div>
                          </div>
                          <div class="md:flex md:items-center mb-6">
                            <div class="md:w-1/3">
                              <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                                Stage Budget
                              </label>
                            </div>
                            <div class="md:w-2/3">
                              <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="number" placeholder='Price' value={stageBudget}
                                onChange={(e) => setStageBudget(e.target.value)} />
                            </div>
                          </div>
                          <div class="md:flex md:items-center mb-6">
                            <div class="md:w-1/3">
                              <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                Stage Size
                              </label>
                            </div>
                            <div class="md:w-2/3">
                              <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder='Stage Size' value={stageSize}
                                onChange={(e) => setStageSize(e.target.value)} />
                            </div>
                          </div>
                          <div class="md:flex md:items-center">
                            <div class="md:w-1/3"></div>
                            <div class="md:w-2/3">
                              <button onClick={submitStage} class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
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
                    {decorateData.map((data) => (
                      <dt className="text-sm font-medium text-gray-500">{data}</dt>
                    ))}
                  </div>
                  {decorateDataMenu.map((data) => (
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <img width='230px' src={data.decoration_photo} className="mt-1 text-sm text-gray-900 sm:mt-0 " />
                      <img width='230px' src={data.including_photos} className="mt-1 text-sm text-gray-900 sm:mt-0 " />
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{data.decoration_budget}</dd>
                    </div>
                  ))}
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
                                Decoration  Photo
                              </label>
                            </div>
                            <div class="md:w-2/3">
                              <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="file" accept='image/*'
                                onChange={(e) => setDecoratePhoto(e.target.files[0])} />
                            </div>
                          </div>
                          <div class="md:flex md:items-center mb-6">
                            <div class="md:w-1/3">
                              <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                Including Photos
                              </label>
                            </div>
                            <div class="md:w-2/3">
                              <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="file" accept='image/*'
                                onChange={(e) => setIncludingPhotos(e.target.files[0])} />
                            </div>
                          </div>
                          <div class="md:flex md:items-center mb-6">
                            <div class="md:w-1/3">
                              <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                                Decoration Budget
                              </label>
                            </div>
                            <div class="md:w-2/3">
                              <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="number" placeholder='Price' value={budget}
                                onChange={(e) => setBudget(e.target.value)} />
                            </div>
                          </div>
                          <div class="md:flex md:items-center">
                            <div class="md:w-1/3"></div>
                            <div class="md:w-2/3">
                              <button onClick={submitDecorate} class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
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
                    {photographyData.map((data) => (
                      <dt className="text-sm font-medium text-gray-500">{data}</dt>
                    ))}
                  </div>
                  {photographyDataMenu.map((data) => (
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6">
                      <img width='230px' src={data.recent_photos} className="mt-1 text-sm text-gray-900 sm:mt-0 " />
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{data.shop_name}</dd>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{data.mobile_number}</dd>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{data.address}</dd>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{data.budget}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6 sm:text-center">
                {photography ? (
                  <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-10">
                    <div class="max-w-xl p-6 bg-white divide-y divide-gray-500">
                      <div class="flex items-center justify-between">
                        <h3 class="text-2xl">Photography Menu Details</h3>
                        <svg onClick={closePhotography} xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
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
                                Recent Photos
                              </label>
                            </div>
                            <div class="md:w-2/3">
                              <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="file" accept='image/*'
                                onChange={(e) => setRecentPhotos(e.target.files[0])} />
                            </div>
                          </div>
                          <div class="md:flex md:items-center mb-6">
                            <div class="md:w-1/3">
                              <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                                Shop Name
                              </label>
                            </div>
                            <div class="md:w-2/3">
                              <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="text" placeholder='Shop Name' value={shopName}
                                onChange={(e) => setShopName(e.target.value)} />
                            </div>
                          </div>
                          <div class="md:flex md:items-center mb-6">
                            <div class="md:w-1/3">
                              <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                Mobile Number
                              </label>
                            </div>
                            <div class="md:w-2/3">
                              <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="number" placeholder='Mobile Number' value={mobile}
                                onChange={(e) => setMobile(e.target.value)} />
                            </div>
                          </div>
                          <div class="md:flex md:items-center mb-6">
                            <div class="md:w-1/3">
                              <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                                Address
                              </label>
                            </div>
                            <div class="md:w-2/3">
                              <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="text" placeholder='Address' value={address}
                                onChange={(e) => setAddress(e.target.value)} />
                            </div>
                          </div>
                          <div class="md:flex md:items-center mb-6">
                            <div class="md:w-1/3">
                              <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                Budget
                              </label>
                            </div>
                            <div class="md:w-2/3">
                              <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="number" placeholder='Budget' value={budgetPhoto}
                                onChange={(e) => setBudgetPhoto(e.target.value)} />
                            </div>
                          </div>
                          <div class="md:flex md:items-center">
                            <div class="md:w-1/3"></div>
                            <div class="md:w-2/3">
                              <button onClick={submitPhotography} class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
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
                    onClick={openPhotography}
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
                    {vehicleData.map((data) => (
                      <dt className="text-sm font-medium text-gray-500">{data}</dt>
                    ))}
                  </div>
                  {vehicleDataMenu.map((data) => (
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
                      <img width='230px' src={data.vehicle_image} className="mt-1 text-sm text-gray-900 sm:mt-0 " />
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{data.owner_name}</dd>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{data.mobile_number}</dd>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{data.rent_price}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6 sm:text-center">
                {vehicles ? (
                  <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-10">
                    <div class="max-w-xl p-6 bg-white divide-y divide-gray-500">
                      <div class="flex items-center justify-between">
                        <h3 class="text-2xl">Vehicle Menu Details</h3>
                        <svg onClick={closeVehicles} xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
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
                                Vehicle
                              </label>
                            </div>
                            <div class="md:w-2/3">
                              <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="file" accept='image/*'
                                onChange={(e) => setVehicle(e.target.files[0])} />
                            </div>
                          </div>
                          <div class="md:flex md:items-center mb-6">
                            <div class="md:w-1/3">
                              <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                                Owner Name
                              </label>
                            </div>
                            <div class="md:w-2/3">
                              <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="text" placeholder='Owner Name' value={owner}
                                onChange={(e) => setOwner(e.target.value)} />
                            </div>
                          </div>
                          <div class="md:flex md:items-center mb-6">
                            <div class="md:w-1/3">
                              <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                Mobile Number
                              </label>
                            </div>
                            <div class="md:w-2/3">
                              <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="number" placeholder='Mobile Number' value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)} />
                            </div>
                          </div>
                          <div class="md:flex md:items-center mb-6">
                            <div class="md:w-1/3">
                              <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                Rent Price
                              </label>
                            </div>
                            <div class="md:w-2/3">
                              <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="number" placeholder='Rent Price' value={rent}
                                onChange={(e) => setRent(e.target.value)} />
                            </div>
                          </div>
                          <div class="md:flex md:items-center">
                            <div class="md:w-1/3"></div>
                            <div class="md:w-2/3">
                              <button onClick={submitVehicle} class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
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
                    onClick={openVehicles}
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
