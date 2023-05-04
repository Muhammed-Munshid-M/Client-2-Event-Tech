import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { managerUrl } from '../../../API/Api'
import Layout from '../Layout'
function Services() {
    const [loading, setLoading] = useState(true)
    const [openFoodModal, setOpenFoodModal] = useState(false)
    const [openStageModal, setOpenStageModal] = useState(false)
    const [openDecorateModal, setOpenDecorateModal] = useState(false)
    const [openAudioModal, setOpenAudioModal] = useState(false)
    const [openVideoModal, setOpenVideoModal] = useState(false)
    const [editFoodModal, setEditFoodModal] = useState(false)
    const [editStageModal, setEditStageModal] = useState(false)
    const [editDecorateModal, setEditDecorateModal] = useState(false)
    const [editAudioModal, setEditAudioModal] = useState(false)
    const [editVideoModal, setEditVideoModal] = useState(false)
    const [service, setService] = useState([])
    const [catering, setCatering] = useState([])
    const [stage, setStage] = useState([])
    const [decoration, setDecoration] = useState([])
    const [audio, setAudio] = useState([])
    const [video, setVideo] = useState([])


    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, [])

    const openFoodCategory = async () => {
        setOpenFoodModal(true)
        window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
    }

    const closeFoodModal = async () => {
        setOpenFoodModal(false)
    }

    const openStageCategory = async () => {
        setOpenStageModal(true)
        window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
    }

    const closeStageModal = async () => {
        setOpenStageModal(false)
    }

    const openDecorateCategory = async () => {
        setOpenDecorateModal(true)
        window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
    }

    const closeDecorateModal = async () => {
        setOpenDecorateModal(false)
    }

    const openAudioCategory = async () => {
        setOpenAudioModal(true)
        window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
    }

    const closeAudioModal = async () => {
        setOpenAudioModal(false)
    }

    const openVideoCategory = async () => {
        setOpenVideoModal(true)
        window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
    }

    const closeVideoModal = async () => {
        setOpenVideoModal(false)
    }



    const editFoodCategory = async () => {
        setEditFoodModal(true)
        window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
    }

    const closeEditFoodModal = async () => {
        setEditFoodModal(false)

    }

    const editStageCategory = async () => {
        setEditStageModal(true)
        window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
    }

    const closeEditStageModal = async () => {
        setEditStageModal(false)
    }

    const editDecorateCategory = async () => {
        setEditDecorateModal(true)
        window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
    }

    const closeEditDecorateModal = async () => {
        setEditDecorateModal(false)
    }

    const editAudioCategory = async () => {
        setEditAudioModal(true)
        window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
    }

    const closeEditAudioModal = async () => {
        setEditAudioModal(false)
    }

    const editVideoCategory = async () => {
        setEditVideoModal(true)
        window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
    }

    const closeEditVideoModal = async () => {
        setEditVideoModal(false)
    }

    const submitCategory = async () => {
            try {
            setModal(false)
            const token = localStorage.getItem('manager-token')
            await axios.post(`${managerUrl}add-services`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((response) => {
                    if (response.data.success) {
                        toast.success(response.data.message)
                    } else {
                        toast.error('Something error')
                    }
                })
            } catch (error) {
                console.log(error);
            }
    }

    const submitService = async () => {
        //     try {
        //     setModal(false)
        //     const token = localStorage.getItem('manager-token')
        //     await axios.post(`${managerUrl}add-services`, formData, {
        //         headers: {
        //             Authorization: `Bearer ${token}`
        //         }
        //     })
        //         .then((response) => {
        //             if (response.data.success) {
        //                 toast.success(response.data.message)
        //             } else {
        //                 toast.error('Something error')
        //             }
        //         })
        //     } catch (error) {
        //         console.log(error);
        //     }
    }

    useEffect(() => {
        const Services = async () => {
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
                            const catering = serviceData.cateringMenu
                            const stage = serviceData.stageMenu
                            const decoration = serviceData.decorationMenu
                            const audio = serviceData.audioMenu
                            const video = serviceData.videoMenu
                            setService(serviceData)
                            setCatering(catering)
                            setStage(stage)
                            setDecoration(decoration)
                            setAudio(audio)
                            setVideo(video)
                        }
                    })
            } catch (error) {
                console.log(error);
            }
        }
        Services()
    }, [])

    return (
        <div>
            <Layout>
                {
                    loading ? (
                        <div>Please wait...</div>
                    ) : (
                        <>
                            {/* {showDetails ? ( */}
                            <div className='mt-[7rem]'>
                                <body class="">
                                    {/* <header class="bg-gray-800 text-white py-4">
                                            <div class="container mx-auto px-4">
                                                <h1 class="text-2xl font-bold">Details Page</h1>
                                            </div>
                                        </header> */}
                                    <main class="container mx-auto mt-8 px-4">
                                        <section class="bg-cyan-300 shadow-lg rounded-lg p-8">
                                            <h2 class="text-xl font-normal mb-6 text-center font-serif">Your Selected Services</h2>
                                            <div className='bg-slate-200 rounded-2xl xl:mx-72 sm:mx-5'>
                                                <ul role="list" class="p-6 divide-y divide-slate-300">
                                                    <div className='py-4'>
                                                        <li class="flex py-6 first:pt-0 last:pb-0">
                                                            <img class="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                            <div class="ml-3 overflow-hidden">
                                                                <p class="text-sm font-medium text-slate-900 pt-2">{service.catering_name}</p>
                                                                {/* <p class="text-sm text-slate-500 truncate">kldhjg</p> */}
                                                            </div>
                                                            <div class="mx-auto">
                                                                {openFoodModal ? (
                                                                    <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-12">
                                                                        <div class="max-w-full p-6 bg-white divide-y divide-gray-500">
                                                                            <div class="flex items-center justify-between">
                                                                                <h3 class="text-2xl">Add Category</h3>
                                                                                <svg onClick={closeFoodModal} xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                                                                                    stroke="currentColor">
                                                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                                </svg>
                                                                            </div>
                                                                            <div class="mt-4">

                                                                                {catering.map((data) => (
                                                                                    <form onSubmit={submitCategory} class="">
                                                                                        <div class="md:flex md:items-center mt-3 ">
                                                                                            <ul role="list" class="p-6 divide-y divide-slate-800">
                                                                                                <li class="flex  first:pt-0 last:pb-0 sm:grid sm:grid-cols-3 sm:gap-[5rem]">
                                                                                                    <img class="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                                    <div class="ml-3 overflow-hidden">
                                                                                                        <p class="text-sm font-medium text-slate-900 pt-2">{data.category_name[0]}</p>
                                                                                                        {/* <p class="text-sm text-slate-900 truncate">hdbghgd</p> */}
                                                                                                    </div>
                                                                                                    <input type="checkbox" class="checked:bg-blue-500 mt-2 w-5 h-5"
                                                                                                    />
                                                                                                </li>
                                                                                            </ul>
                                                                                        </div>
                                                                                        <div class="md:flex md:items-center">
                                                                                            <ul role="list" class="p-6 divide-y divide-slate-800">
                                                                                                <li class="flex  first:pt-0 last:pb-0  sm:grid sm:grid-cols-3 sm:gap-[6rem]">
                                                                                                    <img class="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                                    <div class="ml-3 overflow-hidden">
                                                                                                        <p class="text-sm font-medium text-slate-900 pt-2">{data.category_name[1]}</p>
                                                                                                        {/* <p class="text-sm text-slate-900 truncate">hdbghgd</p> */}
                                                                                                    </div>
                                                                                                    <input type="checkbox" class="checked:bg-blue-500 sm:ml-2 mt-2 w-5  h-5"
                                                                                                    />
                                                                                                </li>
                                                                                            </ul>
                                                                                        </div>
                                                                                        <div class="md:flex md:items-center">
                                                                                            <ul role="list" class="p-6 divide-y divide-slate-800">
                                                                                                <li class="flex  first:pt-0 last:pb-0  sm:grid sm:grid-cols-3 sm:gap-[4rem]">
                                                                                                    <img class="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                                    <div class="ml-3 overflow-hidden">
                                                                                                        <p class="text-sm font-medium text-slate-900 pt-2">{data.category_name[2]}</p>
                                                                                                        {/* <p class="text-sm text-slate-900 truncate">hdbghgd</p> */}
                                                                                                    </div>
                                                                                                    <input type="checkbox" class="checked:bg-blue-500 sm:ml-5 mt-2 w-5 h-5"
                                                                                                    />
                                                                                                </li>
                                                                                            </ul>
                                                                                        </div>
                                                                                        <div class="md:flex md:items-center">
                                                                                            <ul role="list" class="p-6 divide-y divide-slate-800">
                                                                                                <li class="flex  first:pt-0 last:pb-0 sm:grid sm:grid-cols-3 sm:gap-[5rem]">
                                                                                                    <img class="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                                    <div class="ml-3 overflow-hidden">
                                                                                                        <p class="text-sm font-medium text-slate-900 pt-2">{data.category_name[3]}</p>
                                                                                                        {/* <p class="text-sm text-slate-900 truncate">hdbghgd</p> */}
                                                                                                    </div>
                                                                                                    <input type="checkbox" class="checked:bg-blue-500 mt-2 sm:ml-4 w-5 h-5"
                                                                                                    />
                                                                                                </li>
                                                                                            </ul>
                                                                                        </div>
                                                                                        <div class="md:flex md:items-center mb-6  sm:grid sm:grid-cols-2">
                                                                                            <div class="md:w-1/3"></div>
                                                                                        </div>
                                                                                        <div class="md:flex md:items-center  sm:grid sm:grid-cols-2">
                                                                                            <div class="md:w-1/3"></div>
                                                                                            <div class="md:w-2/3">
                                                                                                <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                                                                                    Add
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </form>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    // <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                    //     <button onClick={() => openAddCategory(data._id)} class="px-4 py-2 text-white bg-blue-600 rounded " type="button">Add Category</button>
                                                                    // </td>

                                                                    <button onClick={openFoodCategory} class="px-4 py-2 ml-28 text-sm font-medium text-white bg-blue-600 rounded " type="button">Add Category</button>
                                                                )}
                                                            </div>
                                                        </li>
                                                    </div>
                                                    <div className='py-4'>
                                                        <li class="flex py-4 first:pt-0 last:pb-0">
                                                            <img class="h-10 w-10 rounded-full" src="/pexels-edo.jpg" alt="" />
                                                            <div class="ml-3 overflow-hidden">
                                                                <p class="text-sm font-medium text-slate-900 pt-2">{service.stage_name}</p>
                                                                {/* <p class="text-sm text-slate-500 truncate">kldhjg</p> */}
                                                            </div>
                                                            <div class="mx-auto">
                                                                {openStageModal ? (
                                                                    <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-12">
                                                                        <div class="max-w-full p-6 bg-white divide-y divide-gray-500">
                                                                            <div class="flex items-center justify-between">
                                                                                <h3 class="text-2xl">Add Category</h3>
                                                                                <svg onClick={closeStageModal} xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                                                                                    stroke="currentColor">
                                                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                                </svg>
                                                                            </div>
                                                                            <div class="mt-4">
                                                                                {stage.map((data) => (
                                                                                    <form onSubmit={submitService} class="">
                                                                                        <div class="md:flex md:items-center mt-3 ">
                                                                                            <ul role="list" class="p-6 divide-y divide-slate-800">
                                                                                                <li class="flex  first:pt-0 last:pb-0 sm:grid sm:grid-cols-3 sm:gap-[6rem]">
                                                                                                    <img class="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                                    <div class="ml-3 overflow-hidden">
                                                                                                        <p class="text-sm font-medium text-slate-900 pt-2">{data.category_name[0]}</p>
                                                                                                        {/* <p class="text-sm text-slate-900 truncate">hdbghgd</p> */}
                                                                                                    </div>
                                                                                                    <input type="checkbox" class="checked:bg-blue-500 mt-2 w-5 h-5"
                                                                                                    />
                                                                                                </li>
                                                                                            </ul>
                                                                                        </div>
                                                                                        <div class="md:flex md:items-center">
                                                                                            <ul role="list" class="p-6 divide-y divide-slate-800">
                                                                                                <li class="flex  first:pt-0 last:pb-0  sm:grid sm:grid-cols-3 sm:gap-[5rem]">
                                                                                                    <img class="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                                    <div class="ml-3 overflow-hidden">
                                                                                                        <p class="text-sm font-medium text-slate-900 pt-2">{data.category_name[1]}</p>
                                                                                                        {/* <p class="text-sm text-slate-900 truncate">hdbghgd</p> */}
                                                                                                    </div>
                                                                                                    <input type="checkbox" class="checked:bg-blue-500 ml-4 mt-2 w-5  h-5"
                                                                                                    />
                                                                                                </li>
                                                                                            </ul>
                                                                                        </div>
                                                                                        <div class="md:flex md:items-center">
                                                                                            <ul role="list" class="p-6 divide-y divide-slate-800">
                                                                                                <li class="flex  first:pt-0 last:pb-0  sm:grid sm:grid-cols-3 sm:gap-[6rem]">
                                                                                                    <img class="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                                    <div class="ml-3 overflow-hidden">
                                                                                                        <p class="text-sm font-medium text-slate-900 pt-2">{data.category_name[2]}</p>
                                                                                                        {/* <p class="text-sm text-slate-900 truncate">hdbghgd</p> */}
                                                                                                    </div>
                                                                                                    <input type="checkbox" class="checked:bg-blue-500 sm:ml-5 mt-2 w-5 h-5"
                                                                                                    />
                                                                                                </li>
                                                                                            </ul>
                                                                                        </div>
                                                                                        <div class="md:flex md:items-center mb-6  sm:grid sm:grid-cols-2">
                                                                                            <div class="md:w-1/3"></div>
                                                                                        </div>
                                                                                        <div class="md:flex md:items-center  sm:grid sm:grid-cols-2">
                                                                                            <div class="md:w-1/3"></div>
                                                                                            <div class="md:w-2/3">
                                                                                                <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                                                                                    Add
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </form>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    // <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                    //     <button onClick={() => openAddCategory(data._id)} class="px-4 py-2 text-white bg-blue-600 rounded " type="button">Add Category</button>
                                                                    // </td>

                                                                    <button onClick={openStageCategory} class="px-4 py-2 ml-28 text-sm font-medium text-white bg-blue-600 rounded " type="button">Add Category</button>
                                                                )}
                                                            </div>
                                                        </li>
                                                    </div>
                                                    <div className='py-4'>
                                                        <li class="flex py-4 first:pt-0 last:pb-0">
                                                            <img class="h-10 w-10 rounded-full" src="/evnt3.jpeg" alt="" />
                                                            <div class="ml-3 overflow-hidden">
                                                                <p class="text-sm font-medium text-slate-900 pt-2">{service.decoration_name}</p>
                                                                {/* <p class="text-sm text-slate-500 truncate">kldhjg</p> */}
                                                            </div>
                                                            <div class="mx-auto">
                                                                {openDecorateModal ? (
                                                                    <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-12">
                                                                        <div class="max-w-full p-6 bg-white divide-y divide-gray-500">
                                                                            <div class="flex items-center justify-between">
                                                                                <h3 class="text-2xl">Add Category</h3>
                                                                                <svg onClick={closeDecorateModal} xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                                                                                    stroke="currentColor">
                                                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                                </svg>
                                                                            </div>
                                                                            <div class="mt-4">
                                                                                {decoration.map((data) => (
                                                                                    <form onSubmit={submitService} class="">
                                                                                        <div class="md:flex md:items-center mt-3 ">
                                                                                            <ul role="list" class="p-6 divide-y divide-slate-800">
                                                                                                <li class="flex  first:pt-0 last:pb-0 sm:grid sm:grid-cols-3 sm:gap-[6rem]">
                                                                                                    <img class="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                                    <div class="ml-3 overflow-hidden">
                                                                                                        <p class="text-sm font-medium text-slate-900 pt-2">{data.category_name[0]}</p>
                                                                                                        {/* <p class="text-sm text-slate-900 truncate">hdbghgd</p> */}
                                                                                                    </div>
                                                                                                    <input type="checkbox" class="checked:bg-blue-500 mt-2 w-5 h-5"
                                                                                                    />
                                                                                                </li>
                                                                                            </ul>
                                                                                        </div>
                                                                                        <div class="md:flex md:items-center">
                                                                                            <ul role="list" class="p-6 divide-y divide-slate-800">
                                                                                                <li class="flex  first:pt-0 last:pb-0  sm:grid sm:grid-cols-3 sm:gap-[6rem]">
                                                                                                    <img class="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                                    <div class="ml-3 overflow-hidden">
                                                                                                        <p class="text-sm font-medium text-slate-900 pt-2">{data.category_name[1]}</p>
                                                                                                        {/* <p class="text-sm text-slate-900 truncate">hdbghgd</p> */}
                                                                                                    </div>
                                                                                                    <input type="checkbox" class="checked:bg-blue-500 sm:ml-3 mt-2 w-5  h-5"
                                                                                                    />
                                                                                                </li>
                                                                                            </ul>
                                                                                        </div>
                                                                                        <div class="md:flex md:items-center">
                                                                                            <ul role="list" class="p-6 divide-y divide-slate-800">
                                                                                                <li class="flex  first:pt-0 last:pb-0  sm:grid sm:grid-cols-3 sm:gap-[5rem]">
                                                                                                    <img class="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                                    <div class="ml-3 overflow-hidden">
                                                                                                        <p class="text-sm font-medium text-slate-900 pt-2">{data.category_name[2]}</p>
                                                                                                        {/* <p class="text-sm text-slate-900 truncate">hdbghgd</p> */}
                                                                                                    </div>
                                                                                                    <input type="checkbox" class="checked:bg-blue-500 sm:ml-5 mt-2 w-5 h-5"
                                                                                                    />
                                                                                                </li>
                                                                                            </ul>
                                                                                        </div>
                                                                                        <div class="md:flex md:items-center mb-6  sm:grid sm:grid-cols-2">
                                                                                            <div class="md:w-1/3"></div>
                                                                                        </div>
                                                                                        <div class="md:flex md:items-center  sm:grid sm:grid-cols-2">
                                                                                            <div class="md:w-1/3"></div>
                                                                                            <div class="md:w-2/3">
                                                                                                <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                                                                                    Add
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </form>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    // <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                    //     <button onClick={() => openAddCategory(data._id)} class="px-4 py-2 text-white bg-blue-600 rounded " type="button">Add Category</button>
                                                                    // </td>

                                                                    <button onClick={openDecorateCategory} class="px-4 py-2 ml-32 text-sm font-medium text-white bg-blue-600 rounded " type="button">Add Category</button>
                                                                )}
                                                            </div>
                                                        </li>
                                                    </div>
                                                    <div className='py-4'>
                                                        <li class="flex py-4 first:pt-0 last:pb-0">
                                                            <img class="h-10 w-10 rounded-full" src="/stage1.png" alt="" />
                                                            <div class="ml-3 overflow-hidden">
                                                                <p class="text-sm font-medium text-slate-900 pt-2">{service.audio_name}</p>
                                                                {/* <p class="text-sm text-slate-500 truncate">kldhjg</p> */}
                                                            </div>
                                                            <div class="mx-auto">
                                                                {openAudioModal ? (
                                                                    <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-12">
                                                                        <div class="max-w-full p-6 bg-white divide-y divide-gray-500">
                                                                            <div class="flex items-center justify-between">
                                                                                <h3 class="text-2xl">Add Category</h3>
                                                                                <svg onClick={closeAudioModal} xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                                                                                    stroke="currentColor">
                                                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                                </svg>
                                                                            </div>
                                                                            <div class="mt-4">
                                                                                {audio.map((data) => (
                                                                                    <form onSubmit={submitService} class="">
                                                                                        <div class="md:flex md:items-center mt-3 ">
                                                                                            <ul role="list" class="p-6 divide-y divide-slate-800">
                                                                                                <li class="flex  first:pt-0 last:pb-0 sm:grid sm:grid-cols-3 sm:gap-[3rem]">
                                                                                                    <img class="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                                    <div class="ml-3 overflow-hidden">
                                                                                                        <p class="text-sm font-medium text-slate-900 pt-2">{data.category_name[0]}</p>
                                                                                                        {/* <p class="text-sm text-slate-900 truncate">hdbghgd</p> */}
                                                                                                    </div>
                                                                                                    <input type="checkbox" class="checked:bg-blue-500 mt-2 w-5 h-5"
                                                                                                    />
                                                                                                </li>
                                                                                            </ul>
                                                                                        </div>
                                                                                        <div class="md:flex md:items-center">
                                                                                            <ul role="list" class="p-6 divide-y divide-slate-800">
                                                                                                <li class="flex  first:pt-0 last:pb-0  sm:grid sm:grid-cols-3 sm:gap-[6rem]">
                                                                                                    <img class="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                                    <div class="ml-3 overflow-hidden">
                                                                                                        <p class="text-sm font-medium text-slate-900 pt-2">{data.category_name[1]}</p>
                                                                                                        {/* <p class="text-sm text-slate-900 truncate">hdbghgd</p> */}
                                                                                                    </div>
                                                                                                    <input type="checkbox" class="checked:bg-blue-500  mt-2 w-5  h-5"
                                                                                                    />
                                                                                                </li>
                                                                                            </ul>
                                                                                        </div>
                                                                                        <div class="md:flex md:items-center">
                                                                                            <ul role="list" class="p-6 divide-y divide-slate-800">
                                                                                                <li class="flex  first:pt-0 last:pb-0  sm:grid sm:grid-cols-3 sm:gap-[9rem]">
                                                                                                    <img class="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                                    <div class="ml-3 overflow-hidden">
                                                                                                        <p class="text-sm font-medium text-slate-900 pt-2">{data.category_name[2]}</p>
                                                                                                        {/* <p class="text-sm text-slate-900 truncate">hdbghgd</p> */}
                                                                                                    </div>
                                                                                                    <input type="checkbox" class="checked:bg-blue-500 sm:ml-1 mt-2 w-5 h-5"
                                                                                                    />
                                                                                                </li>
                                                                                            </ul>
                                                                                        </div>
                                                                                        <div class="md:flex md:items-center mb-6  sm:grid sm:grid-cols-2">
                                                                                            <div class="md:w-1/3"></div>
                                                                                        </div>
                                                                                        <div class="md:flex md:items-center  sm:grid sm:grid-cols-2">
                                                                                            <div class="md:w-1/3"></div>
                                                                                            <div class="md:w-2/3">
                                                                                                <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                                                                                    Add
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </form>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    // <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                    //     <button onClick={() => openAddCategory(data._id)} class="px-4 py-2 text-white bg-blue-600 rounded " type="button">Add Category</button>
                                                                    // </td>

                                                                    <button onClick={openAudioCategory} class="px-4 py-2 ml-40 text-sm font-medium text-white bg-blue-600 rounded " type="button">Add Category</button>
                                                                )}
                                                            </div>
                                                        </li>
                                                    </div>
                                                    <div className='py-4'>
                                                        <li class="flex py-4 first:pt-0 last:pb-0">
                                                            <img class="h-10 w-10 rounded-full" src="/stage2.png" alt="" />
                                                            <div class="ml-3 overflow-hidden">
                                                                <p class="text-sm font-medium text-slate-900 pt-2">{service.video_name}</p>
                                                                {/* <p class="text-sm text-slate-500 truncate">kldhjg</p> */}
                                                            </div>
                                                            <div class="mx-auto">
                                                                {openVideoModal ? (
                                                                    <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-12">
                                                                        <div class="max-w-full p-6 bg-white divide-y divide-gray-500">
                                                                            <div class="flex items-center justify-between">
                                                                                <h3 class="text-2xl">Add Category</h3>
                                                                                <svg onClick={closeVideoModal} xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                                                                                    stroke="currentColor">
                                                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                                </svg>
                                                                            </div>
                                                                            <div class="mt-4">
                                                                                {video.map((data) => (
                                                                                    <form onSubmit={submitService} class="">
                                                                                        <div class="md:flex md:items-center mt-3 ">
                                                                                            <ul role="list" class="p-6 divide-y divide-slate-800">
                                                                                                <li class="flex  first:pt-0 last:pb-0 sm:grid sm:grid-cols-3 sm:gap-[3rem]">
                                                                                                    <img class="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                                    <div class="ml-3 overflow-hidden">
                                                                                                        <p class="text-sm font-medium text-slate-900 pt-2">{data.category_name[0]}</p>
                                                                                                        {/* <p class="text-sm text-slate-900 truncate">hdbghgd</p> */}
                                                                                                    </div>
                                                                                                    <input type="checkbox" class="checked:bg-blue-500 mt-2 w-5 h-5"
                                                                                                    />
                                                                                                </li>
                                                                                            </ul>
                                                                                        </div>
                                                                                        <div class="md:flex md:items-center">
                                                                                            <ul role="list" class="p-6 divide-y divide-slate-800">
                                                                                                <li class="flex  first:pt-0 last:pb-0  sm:grid sm:grid-cols-3 sm:gap-[6rem]">
                                                                                                    <img class="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                                    <div class="ml-3 overflow-hidden">
                                                                                                        <p class="text-sm font-medium text-slate-900 pt-2">{data.category_name[1]}</p>
                                                                                                        {/* <p class="text-sm text-slate-900 truncate">hdbghgd</p> */}
                                                                                                    </div>
                                                                                                    <input type="checkbox" class="checked:bg-blue-500 mt-2 w-5  h-5"
                                                                                                    />
                                                                                                </li>
                                                                                            </ul>
                                                                                        </div>
                                                                                        <div class="md:flex md:items-center">
                                                                                            <ul role="list" class="p-6 divide-y divide-slate-800">
                                                                                                <li class="flex  first:pt-0 last:pb-0  sm:grid sm:grid-cols-3 sm:gap-[9rem]">
                                                                                                    <img class="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                                    <div class="ml-3 overflow-hidden">
                                                                                                        <p class="text-sm font-medium text-slate-900 pt-2">{data.category_name[2]}</p>
                                                                                                        {/* <p class="text-sm text-slate-900 truncate">hdbghgd</p> */}
                                                                                                    </div>
                                                                                                    <input type="checkbox" class="checked:bg-blue-500 sm:ml-1 mt-2 w-5 h-5"
                                                                                                    />
                                                                                                </li>
                                                                                            </ul>
                                                                                        </div>
                                                                                        <div class="md:flex md:items-center mb-6  sm:grid sm:grid-cols-2">
                                                                                            <div class="md:w-1/3"></div>
                                                                                        </div>
                                                                                        <div class="md:flex md:items-center  sm:grid sm:grid-cols-2">
                                                                                            <div class="md:w-1/3"></div>
                                                                                            <div class="md:w-2/3">
                                                                                                <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                                                                                    Add
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </form>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    // <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                    //     <button onClick={() => openAddCategory(data._id)} class="px-4 py-2 text-white bg-blue-600 rounded " type="button">Add Category</button>
                                                                    // </td>

                                                                    <button onClick={openVideoCategory} class="px-4 py-2 ml-40 text-sm font-medium text-white bg-blue-600 rounded " type="button">Add Category</button>
                                                                )}
                                                            </div>
                                                        </li>
                                                    </div>
                                                </ul>
                                            </div>
                                            <body className='mt-[6rem] bg-cyan-300'>
                                                <div class="overflow-x-auto">
                                                    <div class="inline-block min-w-full">
                                                        <div class="shadow overflow-hidden border-b sm:rounded-lg">
                                                            {/* <h1 className='font-bold text-xl mb-5'>Your Selected Services</h1> */}
                                                            <table class="min-w-full divide-y divide-gray-200">
                                                                <thead class="bg-slate-300">
                                                                    <tr>
                                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                            Services
                                                                        </th>
                                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                            Categories
                                                                        </th>
                                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                            Edit category
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody class="bg-slate-400 divide-y divide-gray-200">
                                                                    <tr class="hover:bg-slate-200 transition duration-300">
                                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                                            <div class="flex items-center">
                                                                                <div class="flex-shrink-0 h-10 w-10">
                                                                                    <img class="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                </div>
                                                                                <div class="ml-4">
                                                                                    <div class="text-sm font-medium text-gray-900">
                                                                                        {service.catering_name}
                                                                                    </div>
                                                                                    <div class="text-sm text-gray-500">
                                                                                        {/* {data.name} */}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                                            <div class="flex items-center">
                                                                                {catering.map((data) => (
                                                                                    <div class="">
                                                                                        <div class="text-sm font-medium text-gray-900 py-2">
                                                                                            {data.category_name[0]}
                                                                                        </div>
                                                                                        <div class="text-sm font-medium text-gray-900 py-2">
                                                                                            {data.category_name[1]}
                                                                                        </div>
                                                                                        <div class="text-sm font-medium text-gray-900 py-2">
                                                                                            {data.category_name[2]}
                                                                                        </div>
                                                                                        <div class="text-sm font-medium text-gray-900 py-2">
                                                                                            {data.category_name[3]}
                                                                                        </div>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </td>
                                                                        {editFoodModal ? (
                                                                            <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-12">
                                                                                <div class="max-w-full p-6 bg-white divide-y divide-gray-500">
                                                                                    <div class="flex items-center justify-between">
                                                                                        <h3 class="text-2xl">Add Category</h3>
                                                                                        <svg onClick={closeEditFoodModal} xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                                                                                            stroke="currentColor">
                                                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                                        </svg>
                                                                                    </div>
                                                                                    <div class="mt-4">

                                                                                        {catering.map((data) => (
                                                                                            <form onSubmit={submitService} class="">
                                                                                                <div class="md:flex md:items-center mt-3 ">
                                                                                                    <ul role="list" class="p-6 divide-y divide-slate-800">
                                                                                                        <li class="flex  first:pt-0 last:pb-0 sm:grid sm:grid-cols-3 sm:gap-[5rem]">
                                                                                                            <img class="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                                            <div class="ml-3 overflow-hidden">
                                                                                                                <p class="text-sm font-medium text-slate-900 pt-2">{data.category_name[0]}</p>
                                                                                                                {/* <p class="text-sm text-slate-900 truncate">hdbghgd</p> */}
                                                                                                            </div>
                                                                                                            <input type="checkbox" class="checked:bg-blue-500 mt-2 w-5 h-5"
                                                                                                            />
                                                                                                        </li>
                                                                                                    </ul>
                                                                                                </div>
                                                                                                <div class="md:flex md:items-center">
                                                                                                    <ul role="list" class="p-6 divide-y divide-slate-800">
                                                                                                        <li class="flex  first:pt-0 last:pb-0  sm:grid sm:grid-cols-3 sm:gap-[6rem]">
                                                                                                            <img class="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                                            <div class="ml-3 overflow-hidden">
                                                                                                                <p class="text-sm font-medium text-slate-900 pt-2">{data.category_name[1]}</p>
                                                                                                                {/* <p class="text-sm text-slate-900 truncate">hdbghgd</p> */}
                                                                                                            </div>
                                                                                                            <input type="checkbox" class="checked:bg-blue-500 sm:ml-2 mt-2 w-5  h-5"
                                                                                                            />
                                                                                                        </li>
                                                                                                    </ul>
                                                                                                </div>
                                                                                                <div class="md:flex md:items-center">
                                                                                                    <ul role="list" class="p-6 divide-y divide-slate-800">
                                                                                                        <li class="flex  first:pt-0 last:pb-0  sm:grid sm:grid-cols-3 sm:gap-[4rem]">
                                                                                                            <img class="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                                            <div class="ml-3 overflow-hidden">
                                                                                                                <p class="text-sm font-medium text-slate-900 pt-2">{data.category_name[2]}</p>
                                                                                                                {/* <p class="text-sm text-slate-900 truncate">hdbghgd</p> */}
                                                                                                            </div>
                                                                                                            <input type="checkbox" class="checked:bg-blue-500 sm:ml-5 mt-2 w-5 h-5"
                                                                                                            />
                                                                                                        </li>
                                                                                                    </ul>
                                                                                                </div>
                                                                                                <div class="md:flex md:items-center">
                                                                                                    <ul role="list" class="p-6 divide-y divide-slate-800">
                                                                                                        <li class="flex  first:pt-0 last:pb-0 sm:grid sm:grid-cols-3 sm:gap-[5rem]">
                                                                                                            <img class="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                                            <div class="ml-3 overflow-hidden">
                                                                                                                <p class="text-sm font-medium text-slate-900 pt-2">{data.category_name[3]}</p>
                                                                                                                {/* <p class="text-sm text-slate-900 truncate">hdbghgd</p> */}
                                                                                                            </div>
                                                                                                            <input type="checkbox" class="checked:bg-blue-500 mt-2 sm:ml-4 w-5 h-5"
                                                                                                            />
                                                                                                        </li>
                                                                                                    </ul>
                                                                                                </div>
                                                                                                <div class="md:flex md:items-center mb-6  sm:grid sm:grid-cols-2">
                                                                                                    <div class="md:w-1/3"></div>
                                                                                                </div>
                                                                                                <div class="md:flex md:items-center  sm:grid sm:grid-cols-2">
                                                                                                    <div class="md:w-1/3"></div>
                                                                                                    <div class="md:w-2/3">
                                                                                                        <button class="shadow bg-red-500 hover:bg-red-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                                                                                            Remove
                                                                                                        </button>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </form>
                                                                                        ))}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ) : (
                                                                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                                <button onClick={editFoodCategory} class="px-4 py-2 ml-5 text-white bg-blue-600 rounded " type="button">Edit</button>
                                                                            </td>
                                                                        )}
                                                                    </tr>


                                                                    <tr class="hover:bg-slate-200 transition duration-300">
                                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                                            <div class="flex items-center">
                                                                                <div class="flex-shrink-0 h-10 w-10">
                                                                                    <img class="h-10 w-10 rounded-full" src="/pexels-edo.jpg" alt="" />
                                                                                </div>
                                                                                <div class="ml-4">
                                                                                    <div class="text-sm font-medium text-gray-900">
                                                                                        {service.stage_name}
                                                                                    </div>
                                                                                    <div class="text-sm text-gray-500">
                                                                                        {/* {data.name} */}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                                            <div class="flex items-center">
                                                                                {stage.map((data) => (
                                                                                    <div class="">
                                                                                        <div class="text-sm font-medium text-gray-900 py-2">
                                                                                            {data.category_name[0]}
                                                                                        </div>
                                                                                        <div class="text-sm font-medium text-gray-900 py-2">
                                                                                            {data.category_name[1]}
                                                                                        </div>
                                                                                        <div class="text-sm font-medium text-gray-900 py-2">
                                                                                            {data.category_name[2]}
                                                                                        </div>
                                                                                        <div class="text-sm font-medium text-gray-900 py-2">
                                                                                            {data.category_name[3]}
                                                                                        </div>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </td>
                                                                        {editStageModal ? (

                                                                            <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-12">
                                                                                <div class="max-w-full p-6 bg-white divide-y divide-gray-500">
                                                                                    <div class="flex items-center justify-between">
                                                                                        <h3 class="text-2xl">Add Category</h3>
                                                                                        <svg onClick={closeEditStageModal} xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                                                                                            stroke="currentColor">
                                                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                                        </svg>
                                                                                    </div>
                                                                                    <div class="mt-4">
                                                                                        {stage.map((data) => (
                                                                                            <form onSubmit={submitService} class="">
                                                                                                <div class="md:flex md:items-center mt-3 ">
                                                                                                    <ul role="list" class="p-6 divide-y divide-slate-800">
                                                                                                        <li class="flex  first:pt-0 last:pb-0 sm:grid sm:grid-cols-3 sm:gap-[6rem]">
                                                                                                            <img class="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                                            <div class="ml-3 overflow-hidden">
                                                                                                                <p class="text-sm font-medium text-slate-900 pt-2">{data.category_name[0]}</p>
                                                                                                                {/* <p class="text-sm text-slate-900 truncate">hdbghgd</p> */}
                                                                                                            </div>
                                                                                                            <input type="checkbox" class="checked:bg-blue-500 mt-2 w-5 h-5"
                                                                                                            />
                                                                                                        </li>
                                                                                                    </ul>
                                                                                                </div>
                                                                                                <div class="md:flex md:items-center">
                                                                                                    <ul role="list" class="p-6 divide-y divide-slate-800">
                                                                                                        <li class="flex  first:pt-0 last:pb-0  sm:grid sm:grid-cols-3 sm:gap-[5rem]">
                                                                                                            <img class="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                                            <div class="ml-3 overflow-hidden">
                                                                                                                <p class="text-sm font-medium text-slate-900 pt-2">{data.category_name[1]}</p>
                                                                                                                {/* <p class="text-sm text-slate-900 truncate">hdbghgd</p> */}
                                                                                                            </div>
                                                                                                            <input type="checkbox" class="checked:bg-blue-500 ml-4 mt-2 w-5  h-5"
                                                                                                            />
                                                                                                        </li>
                                                                                                    </ul>
                                                                                                </div>
                                                                                                <div class="md:flex md:items-center">
                                                                                                    <ul role="list" class="p-6 divide-y divide-slate-800">
                                                                                                        <li class="flex  first:pt-0 last:pb-0  sm:grid sm:grid-cols-3 sm:gap-[6rem]">
                                                                                                            <img class="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                                            <div class="ml-3 overflow-hidden">
                                                                                                                <p class="text-sm font-medium text-slate-900 pt-2">{data.category_name[2]}</p>
                                                                                                                {/* <p class="text-sm text-slate-900 truncate">hdbghgd</p> */}
                                                                                                            </div>
                                                                                                            <input type="checkbox" class="checked:bg-blue-500 sm:ml-5 mt-2 w-5 h-5"
                                                                                                            />
                                                                                                        </li>
                                                                                                    </ul>
                                                                                                </div>
                                                                                                <div class="md:flex md:items-center mb-6  sm:grid sm:grid-cols-2">
                                                                                                    <div class="md:w-1/3"></div>
                                                                                                </div>
                                                                                                <div class="md:flex md:items-center  sm:grid sm:grid-cols-2">
                                                                                                    <div class="md:w-1/3"></div>
                                                                                                    <div class="md:w-2/3">
                                                                                                        <button class="shadow bg-red-500 hover:bg-red-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                                                                                            Remove
                                                                                                        </button>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </form>
                                                                                        ))}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ) : (
                                                                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                                <button onClick={editStageCategory} class="px-4 py-2 ml-5 text-white bg-blue-600 rounded " type="button">Edit</button>
                                                                            </td>
                                                                        )}
                                                                    </tr>
                                                                    <tr class="hover:bg-slate-200 transition duration-300">
                                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                                            <div class="flex items-center">
                                                                                <div class="flex-shrink-0 h-10 w-10">
                                                                                    <img class="h-10 w-10 rounded-full" src="/evnt3.jpeg" alt="" />
                                                                                </div>
                                                                                <div class="ml-4">
                                                                                    <div class="text-sm font-medium text-gray-900">
                                                                                        {service.decoration_name}
                                                                                    </div>
                                                                                    <div class="text-sm text-gray-500">
                                                                                        {/* {data.name} */}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                                            <div class="flex items-center">
                                                                                {decoration.map((data) => (
                                                                                    <div class="">
                                                                                        <div class="text-sm font-medium text-gray-900 py-2">
                                                                                            {data.category_name[0]}
                                                                                        </div>
                                                                                        <div class="text-sm font-medium text-gray-900 py-2">
                                                                                            {data.category_name[1]}
                                                                                        </div>
                                                                                        <div class="text-sm font-medium text-gray-900 py-2">
                                                                                            {data.category_name[2]}
                                                                                        </div>
                                                                                        <div class="text-sm font-medium text-gray-900 py-2">
                                                                                            {data.category_name[3]}
                                                                                        </div>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </td>
                                                                        {editDecorateModal ? (

                                                                            <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-12">
                                                                                <div class="max-w-full p-6 bg-white divide-y divide-gray-500">
                                                                                    <div class="flex items-center justify-between">
                                                                                        <h3 class="text-2xl">Add Category</h3>
                                                                                        <svg onClick={closeEditDecorateModal} xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                                                                                            stroke="currentColor">
                                                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                                        </svg>
                                                                                    </div>
                                                                                    <div class="mt-4">
                                                                                        {decoration.map((data) => (
                                                                                            <form onSubmit={submitService} class="">
                                                                                                <div class="md:flex md:items-center mt-3 ">
                                                                                                    <ul role="list" class="p-6 divide-y divide-slate-800">
                                                                                                        <li class="flex  first:pt-0 last:pb-0 sm:grid sm:grid-cols-3 sm:gap-[6rem]">
                                                                                                            <img class="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                                            <div class="ml-3 overflow-hidden">
                                                                                                                <p class="text-sm font-medium text-slate-900 pt-2">{data.category_name[0]}</p>
                                                                                                                {/* <p class="text-sm text-slate-900 truncate">hdbghgd</p> */}
                                                                                                            </div>
                                                                                                            <input type="checkbox" class="checked:bg-blue-500 mt-2 w-5 h-5"
                                                                                                            />
                                                                                                        </li>
                                                                                                    </ul>
                                                                                                </div>
                                                                                                <div class="md:flex md:items-center">
                                                                                                    <ul role="list" class="p-6 divide-y divide-slate-800">
                                                                                                        <li class="flex  first:pt-0 last:pb-0  sm:grid sm:grid-cols-3 sm:gap-[6rem]">
                                                                                                            <img class="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                                            <div class="ml-3 overflow-hidden">
                                                                                                                <p class="text-sm font-medium text-slate-900 pt-2">{data.category_name[1]}</p>
                                                                                                                {/* <p class="text-sm text-slate-900 truncate">hdbghgd</p> */}
                                                                                                            </div>
                                                                                                            <input type="checkbox" class="checked:bg-blue-500 sm:ml-3 mt-2 w-5  h-5"
                                                                                                            />
                                                                                                        </li>
                                                                                                    </ul>
                                                                                                </div>
                                                                                                <div class="md:flex md:items-center">
                                                                                                    <ul role="list" class="p-6 divide-y divide-slate-800">
                                                                                                        <li class="flex  first:pt-0 last:pb-0  sm:grid sm:grid-cols-3 sm:gap-[5rem]">
                                                                                                            <img class="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                                            <div class="ml-3 overflow-hidden">
                                                                                                                <p class="text-sm font-medium text-slate-900 pt-2">{data.category_name[2]}</p>
                                                                                                                {/* <p class="text-sm text-slate-900 truncate">hdbghgd</p> */}
                                                                                                            </div>
                                                                                                            <input type="checkbox" class="checked:bg-blue-500 sm:ml-5 mt-2 w-5 h-5"
                                                                                                            />
                                                                                                        </li>
                                                                                                    </ul>
                                                                                                </div>
                                                                                                <div class="md:flex md:items-center mb-6  sm:grid sm:grid-cols-2">
                                                                                                    <div class="md:w-1/3"></div>
                                                                                                </div>
                                                                                                <div class="md:flex md:items-center  sm:grid sm:grid-cols-2">
                                                                                                    <div class="md:w-1/3"></div>
                                                                                                    <div class="md:w-2/3">
                                                                                                        <button class="shadow  bg-red-500 hover:bg-red-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                                                                                            Remove
                                                                                                        </button>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </form>
                                                                                        ))}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ) : (
                                                                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                                <button onClick={editDecorateCategory} class="px-4 py-2 ml-5 text-white bg-blue-600 rounded " type="button">Edit</button>
                                                                            </td>
                                                                        )}
                                                                    </tr>
                                                                    <tr class="hover:bg-slate-200 transition duration-300">
                                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                                            <div class="flex items-center">
                                                                                <div class="flex-shrink-0 h-10 w-10">
                                                                                    <img class="h-10 w-10 rounded-full" src="/stage1.png" alt="" />
                                                                                </div>
                                                                                <div class="ml-4">
                                                                                    <div class="text-sm font-medium text-gray-900">
                                                                                        {service.audio_name}
                                                                                    </div>
                                                                                    <div class="text-sm text-gray-500">
                                                                                        {/* {data.name} */}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                                            <div class="flex items-center">
                                                                                {audio.map((data) => (
                                                                                    <div class="">
                                                                                        <div class="text-sm font-medium text-gray-900 py-2">
                                                                                            {data.category_name[0]}
                                                                                        </div>
                                                                                        <div class="text-sm font-medium text-gray-900 py-2">
                                                                                            {data.category_name[1]}
                                                                                        </div>
                                                                                        <div class="text-sm font-medium text-gray-900 py-2">
                                                                                            {data.category_name[2]}
                                                                                        </div>
                                                                                        <div class="text-sm font-medium text-gray-900 py-2">
                                                                                            {data.category_name[3]}
                                                                                        </div>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </td>
                                                                        {editAudioModal ? (

                                                                            <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-12">
                                                                                <div class="max-w-full p-6 bg-white divide-y divide-gray-500">
                                                                                    <div class="flex items-center justify-between">
                                                                                        <h3 class="text-2xl">Add Category</h3>
                                                                                        <svg onClick={closeEditAudioModal} xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                                                                                            stroke="currentColor">
                                                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                                        </svg>
                                                                                    </div>
                                                                                    <div class="mt-4">
                                                                                        {audio.map((data) => (
                                                                                            <form onSubmit={submitService} class="">
                                                                                                <div class="md:flex md:items-center mt-3 ">
                                                                                                    <ul role="list" class="p-6 divide-y divide-slate-800">
                                                                                                        <li class="flex  first:pt-0 last:pb-0 sm:grid sm:grid-cols-3 sm:gap-[3rem]">
                                                                                                            <img class="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                                            <div class="ml-3 overflow-hidden">
                                                                                                                <p class="text-sm font-medium text-slate-900 pt-2">{data.category_name[0]}</p>
                                                                                                                {/* <p class="text-sm text-slate-900 truncate">hdbghgd</p> */}
                                                                                                            </div>
                                                                                                            <input type="checkbox" class="checked:bg-blue-500 mt-2 w-5 h-5"
                                                                                                            />
                                                                                                        </li>
                                                                                                    </ul>
                                                                                                </div>
                                                                                                <div class="md:flex md:items-center">
                                                                                                    <ul role="list" class="p-6 divide-y divide-slate-800">
                                                                                                        <li class="flex  first:pt-0 last:pb-0  sm:grid sm:grid-cols-3 sm:gap-[6rem]">
                                                                                                            <img class="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                                            <div class="ml-3 overflow-hidden">
                                                                                                                <p class="text-sm font-medium text-slate-900 pt-2">{data.category_name[1]}</p>
                                                                                                                {/* <p class="text-sm text-slate-900 truncate">hdbghgd</p> */}
                                                                                                            </div>
                                                                                                            <input type="checkbox" class="checked:bg-blue-500  mt-2 w-5  h-5"
                                                                                                            />
                                                                                                        </li>
                                                                                                    </ul>
                                                                                                </div>
                                                                                                <div class="md:flex md:items-center">
                                                                                                    <ul role="list" class="p-6 divide-y divide-slate-800">
                                                                                                        <li class="flex  first:pt-0 last:pb-0  sm:grid sm:grid-cols-3 sm:gap-[9rem]">
                                                                                                            <img class="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                                            <div class="ml-3 overflow-hidden">
                                                                                                                <p class="text-sm font-medium text-slate-900 pt-2">{data.category_name[2]}</p>
                                                                                                                {/* <p class="text-sm text-slate-900 truncate">hdbghgd</p> */}
                                                                                                            </div>
                                                                                                            <input type="checkbox" class="checked:bg-blue-500 sm:ml-1 mt-2 w-5 h-5"
                                                                                                            />
                                                                                                        </li>
                                                                                                    </ul>
                                                                                                </div>
                                                                                                <div class="md:flex md:items-center mb-6  sm:grid sm:grid-cols-2">
                                                                                                    <div class="md:w-1/3"></div>
                                                                                                </div>
                                                                                                <div class="md:flex md:items-center  sm:grid sm:grid-cols-2">
                                                                                                    <div class="md:w-1/3"></div>
                                                                                                    <div class="md:w-2/3">
                                                                                                        <button class="shadow bg-red-500 hover:bg-red-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                                                                                            Remove
                                                                                                        </button>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </form>
                                                                                        ))}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ) : (
                                                                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                                <button onClick={editAudioCategory} class="px-4 py-2 ml-5 text-white bg-blue-600 rounded " type="button">Edit</button>
                                                                            </td>
                                                                        )}
                                                                    </tr>
                                                                    <tr class="hover:bg-slate-200 transition duration-300">
                                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                                            <div class="flex items-center">
                                                                                <div class="flex-shrink-0 h-10 w-10">
                                                                                    <img class="h-10 w-10 rounded-full" src="/stage2.png" alt="" />
                                                                                </div>
                                                                                <div class="ml-4">
                                                                                    <div class="text-sm font-medium text-gray-900">
                                                                                        {service.video_name}
                                                                                    </div>
                                                                                    <div class="text-sm text-gray-500">
                                                                                        {/* {data.name} */}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                                            <div class="flex items-center">
                                                                                {video.map((data) => (
                                                                                    <div class="">
                                                                                        <div class="text-sm font-medium text-gray-900 py-2">
                                                                                            {data.category_name[0]}
                                                                                        </div>
                                                                                        <div class="text-sm font-medium text-gray-900 py-2">
                                                                                            {data.category_name[1]}
                                                                                        </div>
                                                                                        <div class="text-sm font-medium text-gray-900 py-2">
                                                                                            {data.category_name[2]}
                                                                                        </div>
                                                                                        <div class="text-sm font-medium text-gray-900 py-2">
                                                                                            {data.category_name[3]}
                                                                                        </div>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </td>
                                                                        {editVideoModal ? (

                                                                            <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-12">
                                                                                <div class="max-w-full p-6 bg-white divide-y divide-gray-500">
                                                                                    <div class="flex items-center justify-between">
                                                                                        <h3 class="text-2xl">Add Category</h3>
                                                                                        <svg onClick={closeEditVideoModal} xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                                                                                            stroke="currentColor">
                                                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                                        </svg>
                                                                                    </div>
                                                                                    <div class="mt-4">
                                                                                        {video.map((data) => (
                                                                                            <form onSubmit={submitService} class="">
                                                                                                <div class="md:flex md:items-center mt-3 ">
                                                                                                    <ul role="list" class="p-6 divide-y divide-slate-800">
                                                                                                        <li class="flex  first:pt-0 last:pb-0 sm:grid sm:grid-cols-3 sm:gap-[3rem]">
                                                                                                            <img class="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                                            <div class="ml-3 overflow-hidden">
                                                                                                                <p class="text-sm font-medium text-slate-900 pt-2">{data.category_name[0]}</p>
                                                                                                                {/* <p class="text-sm text-slate-900 truncate">hdbghgd</p> */}
                                                                                                            </div>
                                                                                                            <input type="checkbox" class="checked:bg-blue-500 mt-2 w-5 h-5"
                                                                                                            />
                                                                                                        </li>
                                                                                                    </ul>
                                                                                                </div>
                                                                                                <div class="md:flex md:items-center">
                                                                                                    <ul role="list" class="p-6 divide-y divide-slate-800">
                                                                                                        <li class="flex  first:pt-0 last:pb-0  sm:grid sm:grid-cols-3 sm:gap-[6rem]">
                                                                                                            <img class="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                                            <div class="ml-3 overflow-hidden">
                                                                                                                <p class="text-sm font-medium text-slate-900 pt-2">{data.category_name[1]}</p>
                                                                                                                {/* <p class="text-sm text-slate-900 truncate">hdbghgd</p> */}
                                                                                                            </div>
                                                                                                            <input type="checkbox" class="checked:bg-blue-500 mt-2 w-5  h-5"
                                                                                                            />
                                                                                                        </li>
                                                                                                    </ul>
                                                                                                </div>
                                                                                                <div class="md:flex md:items-center">
                                                                                                    <ul role="list" class="p-6 divide-y divide-slate-800">
                                                                                                        <li class="flex  first:pt-0 last:pb-0  sm:grid sm:grid-cols-3 sm:gap-[9rem]">
                                                                                                            <img class="h-10 w-10 rounded-full" src="/pexels-kseniia.jpg" alt="" />
                                                                                                            <div class="ml-3 overflow-hidden">
                                                                                                                <p class="text-sm font-medium text-slate-900 pt-2">{data.category_name[2]}</p>
                                                                                                                {/* <p class="text-sm text-slate-900 truncate">hdbghgd</p> */}
                                                                                                            </div>
                                                                                                            <input type="checkbox" class="checked:bg-blue-500 sm:ml-1 mt-2 w-5 h-5"
                                                                                                            />
                                                                                                        </li>
                                                                                                    </ul>
                                                                                                </div>
                                                                                                <div class="md:flex md:items-center mb-6  sm:grid sm:grid-cols-2">
                                                                                                    <div class="md:w-1/3"></div>
                                                                                                </div>
                                                                                                <div class="md:flex md:items-center  sm:grid sm:grid-cols-2">
                                                                                                    <div class="md:w-1/3"></div>
                                                                                                    <div class="md:w-2/3">
                                                                                                        <button class="shadow bg-red-500 hover:bg-red-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                                                                                           Remove
                                                                                                        </button>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </form>
                                                                                        ))}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ) : (
                                                                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                                <button onClick={editVideoCategory} class="px-4 py-2 ml-5 text-white bg-blue-600 rounded " type="button">Edit</button>
                                                                            </td>
                                                                        )}
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </body>
                                        </section>
                                    </main>
                                </body>
                            </div>
                        </>
                    )
                }
            </Layout>
        </div>
    )
}

export default Services
