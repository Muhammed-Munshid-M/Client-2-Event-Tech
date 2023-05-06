import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import axios from 'axios'
import { userUrl } from '../../../API/Api'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setService } from '../../redux/services';

function UserMenuList() {
    const [loading, setLoading] = useState(true)
    const [catering, setCatering] = useState([])
    const [stage, setStage] = useState([])
    const [decoration, setDecoration] = useState([])
    const [audio, setAudio] = useState([])
    const [video, setVideo] = useState([])
    const [cateringMenu, setCateringMenu] = useState('')
    const managerDetails = useSelector((state) => state.company);
    const managerId = managerDetails.company.managerDetails._id
    const dispatch = useDispatch(setService)
    const navigate = useNavigate()

    useEffect(()=>{
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    })

    useEffect(() => {
        const Services = async () => {
            try {
                const token = localStorage.getItem('token')
                await axios.post(`${userUrl}view-menu-list/${managerId}`, {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }).then((response) => {
                        if (response.data.success) {
                            const serviceData = response.data.data
                            dispatch(setService({serviceData}))
                            const catering = serviceData.cateringMenu
                            const cateringSubMenu = serviceData.cateringMenu[0]
                            console.log(cateringSubMenu,'menuuuu')
                            const stage = serviceData.stageMenu
                            const decoration = serviceData.decorationMenu
                            const audio = serviceData.audioMenu
                            const video = serviceData.videoMenu
                            console.log('cateringgggg:' + catering);
                            setCatering(catering)
                            setCateringMenu(cateringSubMenu)
                        }
                    })
            } catch (error) {
                console.log(error);
            }
        }
        Services()
    }, [])

    const openCart = () => {
        navigate('/cart-list')
    }
    return (
        <div>
            <Navbar />
            {loading ? (
                <p>Loading...</p>
            ):(
            <div className='mt-16' style={{ backgroundColor: 'rgb(210, 240, 275)' }}>
                <div className="max-w-7xl mx-auto  py-12 sm:px-6 lg:px-8">
                    <div className="max-w-full mx-auto">
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                            <div className="px-4 py-5 sm:px-6">
                                <h1 className='text-center text-4xl font-serif font-medium'>Select Menu List</h1>
                                <h1 className="p-6 pt-10 text-3xl font-medium text-gray-900">
                                    {/* {managerDetails?.name} */}
                                    Food Menu
                                </h1>
                            </div>
                            <div className="lg:max-w-7xl sm:max-w-sm mx-auto pb-12 sm:px-6 lg:px-8">
                                <div className="mx-auto">
                                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                                        <div className="border-b border-gray-200 px-4 py-5 sm:p-0">
                                            <dl className="sm:divide-y sm:divide-gray-200">
                                                <div className="py-4 sm:py-5 sm:grid lg:grid-cols-6 sm:grid-cols-3 lg:gap-4 sm:px-6">
                                                    <dt className="text-sm font-medium text-gray-500">{cateringMenu.category_name[0]}</dt>
                                                    <dt className="text-sm font-medium text-gray-500">Price</dt>
                                                    <dt className="text-sm font-medium text-gray-500">Select</dt>
                                                    <dt className="text-sm font-medium text-gray-500 ml-5">{cateringMenu.category_name[1]}</dt>
                                                    <dt className="text-sm font-medium text-gray-500 ml-5">Price</dt>
                                                    <dt className="text-sm font-medium text-gray-500 ml-5">Select</dt>
                                                </div>
                                                      
                                                {catering.map((data) => (
                                                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{data.starter_name}</dd>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{data.starter_price}</dd>
                                                        <input type="checkbox" class="checked:bg-blue-500 sm:ml-2 mt-2 w-5 h-5" />
                                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ml-5">{data.main_name}</dd>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ml-5">{data.main_price}</dd>
                                                        <input type="checkbox" class="checked:bg-blue-500 sm:ml-2 lg:ml-7 mt-2 w-5 h-5" />
                                                    </div>
                                                ))}

                                                <div className="py-4 sm:py-5 sm:grid lg:grid-cols-6 mt-10 sm:grid-cols-6 sm:gap-4 sm:px-6">
                                                    {/* {catering.map((data) => ( */}
                                                    <dt className="text-sm font-medium text-gray-500">{cateringMenu.category_name[2]}</dt>
                                                    <dt className="text-sm font-medium text-gray-500">Price</dt>
                                                    <dt className="text-sm font-medium text-gray-500">Select</dt>
                                                    <dt className="text-sm font-medium text-gray-500 ml-5">{cateringMenu.category_name[3]}</dt>
                                                    <dt className="text-sm font-medium text-gray-500 ml-5">Price</dt>
                                                    <dt className="text-sm font-medium text-gray-500 ml-5">Select</dt>
                                                    {/* ))} */}
                                                </div>
                                                {/* ))} */}
                                                {catering.map((data) => (
                                                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{data.dessert_name}</dd>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{data.dessert_price}</dd>
                                                        <input type="checkbox" class="checked:bg-blue-500 sm:ml-2 mt-2 w-5 h-5" />
                                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ml-5">{data.salad_name}</dd>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ml-5">{data.salad_price}</dd>
                                                        <input type="checkbox" class="checked:bg-blue-500 sm:ml-2 lg:ml-7 mt-2 w-5 h-5" />
                                                    </div>
                                                ))}

                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-1 sm:px-6">
                                <h1 className="p-6 pt-10 text-3xl font-medium text-gray-900">
                                    {/* {managerDetails?.name} */}
                                    Stage Menu
                                </h1>
                            </div>
                            <div className="lg:max-w-7xl sm:max-w-sm mx-auto pb-12 sm:px-6 lg:px-8">
                                <h1 className='p-6 text-2xl font-medium text-gray-800'>High Level Budget</h1>
                                <div className="mx-auto">
                                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                                        <div className="border-b border-gray-200 px-4 py-5 sm:p-0">
                                            <dl className="sm:divide-y sm:divide-gray-200">
                                                <div className="py-4 sm:py-5 sm:grid lg:grid-cols-4 sm:grid-cols-3 lg:gap-4 sm:px-6">
                                                    {/* {catering.map((data) => ( */}
                                                    <dt className="text-sm font-medium text-gray-500">Stage Image</dt>
                                                    <dt className="text-sm font-medium text-gray-500">Price</dt>
                                                    <dt className="text-sm font-medium text-gray-500">Stage Size</dt>
                                                    <dt className="text-sm font-medium text-gray-500">Select</dt>
                                                    {/* ))} */}
                                                </div>
                                                {/* {cateringMenu.map((data) => ( */}
                                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
                                                    <img width='200px' height='auto' src="/stage1.png" alt="" />
                                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">20</dd>
                                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">50 sq.km</dd>
                                                    <input type="checkbox" class="checked:bg-blue-500 sm:ml-2 mt-2 w-5 h-5" />
                                                </div>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:max-w-7xl sm:max-w-sm mx-auto pb-12 sm:px-6 lg:px-8">
                                <h1 className='p-6 text-2xl font-medium text-gray-800'>Low Level Budget</h1>
                                <div className="mx-auto">
                                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                                        <div className="border-b border-gray-200 px-4 py-5 sm:p-0">
                                            <dl className="sm:divide-y sm:divide-gray-200">
                                                <div className="py-4 sm:py-5 sm:grid lg:grid-cols-4 sm:grid-cols-3 lg:gap-4 sm:px-6">
                                                    {/* {catering.map((data) => ( */}
                                                    <dt className="text-sm font-medium text-gray-500">Stage Image</dt>
                                                    <dt className="text-sm font-medium text-gray-500">Price</dt>
                                                    <dt className="text-sm font-medium text-gray-500">Stage Size</dt>
                                                    <dt className="text-sm font-medium text-gray-500">Select</dt>
                                                    {/* ))} */}
                                                </div>
                                                {/* {cateringMenu.map((data) => ( */}
                                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
                                                    <img width='200px' height='auto' src="/stage1.png" alt="" />
                                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">20</dd>
                                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">50 sq.km</dd>
                                                    <input type="checkbox" class="checked:bg-blue-500 sm:ml-2 mt-2 w-5 h-5" />
                                                </div>
                                            </dl>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-4 sm:px-6 sm:flex sm:flex-row-reverse">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-cyan-200 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={openCart}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </div>
    )
}

export default UserMenuList
