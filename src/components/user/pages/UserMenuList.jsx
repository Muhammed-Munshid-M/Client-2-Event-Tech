import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import axios from 'axios'
import { userUrl } from '../../../API/Api'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCheckedArray1, setCheckedArray2 } from '../../redux/services';

function UserMenuList() {
    const [loading, setLoading] = useState(true)
    const [service, setService] = useState('')
    const [starter, setStarter] = useState([])
    const [main, setMain] = useState([])
    const [catering, setCatering] = useState([])
    const [stage, setStage] = useState([])
    const [decoration, setDecoration] = useState([])
    const [photography, setPhotography] = useState([])
    const [vehicle, setVehicle] = useState([])
    const [cateringMenu, setCateringMenu] = useState('')
    const managerDetails = useSelector((state) => state.company)
    const Services = useSelector((state) => state.services || {});
    const managerId = managerDetails.company.managerDetails._id
    console.log('serviceDetails:', Services);
    const serviceDetails = Services.service.serviceData || {}
    const navigate = useNavigate()
    const dispatch = useDispatch()

    if (Object.keys(Services, serviceDetails).length === 0) {
        return <p>Loading..</p>
    }

    const starterChecked = async (image,name,price, event) => {
        if (event == true) {
            // check
            setStarter([...starter, {starter_image:image,starter_name:name,starter_price:price}])
            console.log(starter, 'arr');
        } else {
            // uncheck
            for (let i = 0; i < starter.length; i++) {
                console.log(i);
                if (starter[i] == name) {
                    starter.splice(i)
                }
            }
        }
    }

    const mainChecked = async (image,name,price, event) => {
        if (event == true) {
            console.log('Hiiiiiiiiiiii');
            // check
            setMain([...main,{main_image:image,main_name:name,main_price:price}])
            console.log(main, 'arr');
        } else {
            // uncheck
            for (let i = 0; i < main.length; i++) {
                console.log(i);
                if (main[i] == name) {
                    main.splice(i)
                }
            }
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    })

    useEffect(() => {
        try {
            setService(serviceDetails)
            setCatering(serviceDetails.cateringMenu)
            setCateringMenu(serviceDetails.cateringMenu[0])
            setStage(serviceDetails.stageMenu)
            setDecoration(serviceDetails.decorationMenu)
            setPhotography(serviceDetails.photographyMenu)
            setVehicle(serviceDetails.luxuryVehicleMenu)
        } catch (error) {
            console.log('err', error);
        }
    }, [])

    const openCart = () => {
        try {
            dispatch(setCheckedArray1(starter))
            dispatch(setCheckedArray2(main))
            navigate('/cart-list')
            // const token = localStorage.getItem('token')
            // axios.post(`${userUrl}cart-list/${managerId}`, arr, {
            //     headers: {
            //         Authorization: `Bearer ${token}`
            //     }
            // })
            // .then((response) => {
            //     console.log('response',response.data);
            // })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <Navbar />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className='mt-16' style={{ backgroundColor: 'rgb(210, 240, 275)' }}>
                    <div className="max-w-7xl mx-auto  py-12 sm:px-6 lg:px-8">
                        <div className="max-w-full mx-auto">
                            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                                {serviceDetails.user_catering_status == true &&
                                    <div className="px-4 py-5 sm:px-6">
                                        <h1 className='text-center text-4xl font-serif font-medium'>Select Menu List</h1>
                                        <h1 className="p-6 pt-10 text-3xl font-medium text-gray-900">
                                            {serviceDetails.catering_name}
                                        </h1>
                                    </div>
                                }
                                {serviceDetails.user_catering_status == true &&
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

                                                        {catering.map((data, index) => (
                                                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{data.starter_name}</dd>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{data.starter_price}</dd>
                                                                <input type="checkbox" class="checked:bg-blue-500 sm:ml-2 mt-2 w-5 h-5" checked={data.checked}
                                                                    onChange={(event) => starterChecked(data.starter_image,data.starter_name,data.starter_price, event.target.checked)} />
                                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ml-5">{data.main_name}</dd>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ml-5">{data.main_price}</dd>
                                                                <input type="checkbox" class="checked:bg-blue-500 sm:ml-2 lg:ml-7 mt-2 w-5 h-5"
                                                                    onChange={(event) => mainChecked(data.main_image,data.main_name,data.main_price, event.target.checked)} />
                                                            </div>
                                                        ))}

                                                        <div className="py-4 sm:py-5 sm:grid lg:grid-cols-6 mt-10 sm:grid-cols-6 sm:gap-4 sm:px-6">
                                                            <dt className="text-sm font-medium text-gray-500">{cateringMenu.category_name[2]}</dt>
                                                            <dt className="text-sm font-medium text-gray-500">Price</dt>
                                                            <dt className="text-sm font-medium text-gray-500">Select</dt>
                                                            <dt className="text-sm font-medium text-gray-500 ml-5">{cateringMenu.category_name[3]}</dt>
                                                            <dt className="text-sm font-medium text-gray-500 ml-5">Price</dt>
                                                            <dt className="text-sm font-medium text-gray-500 ml-5">Select</dt>
                                                        </div>
                                                        {catering.map((data) => (
                                                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{data.dessert_name}</dd>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{data.dessert_price}</dd>
                                                                <input type="checkbox" class="checked:bg-blue-500 sm:ml-2 mt-2 w-5 h-5" checked={data.checked}
                                                                    onChange={(event) => dessertChecked(data.dessert_name,data.dessert_price, event.target.checked)} />
                                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ml-5">{data.salad_name}</dd>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ml-5">{data.salad_price}</dd>
                                                                <input type="checkbox" class="checked:bg-blue-500 sm:ml-2 lg:ml-7 mt-2 w-5 h-5"
                                                                    onChange={(event) => saladChecked(data.salad_name,data.salad_price, event.target.checked)} />
                                                            </div>
                                                        ))}
                                                    </dl>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {serviceDetails.user_stage_status == true &&
                                    <div className="px-4 py-1 sm:px-6">
                                        <h1 className="p-6 pt-10 text-3xl font-medium text-gray-900">
                                            {serviceDetails.stage_name}
                                        </h1>
                                    </div>
                                }
                                {serviceDetails.user_stage_status == true &&
                                    <div className="lg:max-w-7xl sm:max-w-sm mx-auto pb-12 sm:px-6 lg:px-8">
                                        <h1 className='p-6 text-2xl font-medium text-gray-800'>High Level Budget</h1>
                                        <div className="mx-auto">
                                            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                                                <div className="border-b border-gray-200 px-4 py-5 sm:p-0">
                                                    <dl className="sm:divide-y sm:divide-gray-200">
                                                        <div className="py-4 sm:py-5 sm:grid lg:grid-cols-4 sm:grid-cols-3 lg:gap-4 sm:px-6">
                                                            <dt className="text-sm font-medium text-gray-500">Stage Image</dt>
                                                            <dt className="text-sm font-medium text-gray-500">Price</dt>
                                                            <dt className="text-sm font-medium text-gray-500">Stage Size</dt>
                                                            <dt className="text-sm font-medium text-gray-500">Select</dt>
                                                        </div>
                                                        {stage.filter(data => data.stage_budget > 15000).map((data) => (
                                                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
                                                                <img width='200px' height='auto' src={data.stage_photo} alt="" />
                                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{data.stage_budget}</dd>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{data.stage_size}</dd>
                                                                <input type="checkbox" class="checked:bg-blue-500 sm:ml-2 mt-2 w-5 h-5" />
                                                            </div>
                                                        ))}
                                                    </dl>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {serviceDetails.user_stage_status == true &&
                                    <div className="lg:max-w-7xl sm:max-w-sm mx-auto pb-12 sm:px-6 lg:px-8">
                                        <h1 className='p-6 text-2xl font-medium text-gray-800'>Low Level Budget</h1>
                                        <div className="mx-auto">
                                            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                                                <div className="border-b border-gray-200 px-4 py-5 sm:p-0">
                                                    <dl className="sm:divide-y sm:divide-gray-200">
                                                        <div className="py-4 sm:py-5 sm:grid lg:grid-cols-4 sm:grid-cols-3 lg:gap-4 sm:px-6">
                                                            <dt className="text-sm font-medium text-gray-500">Stage Image</dt>
                                                            <dt className="text-sm font-medium text-gray-500">Price</dt>
                                                            <dt className="text-sm font-medium text-gray-500">Stage Size</dt>
                                                            <dt className="text-sm font-medium text-gray-500">Select</dt>
                                                        </div>
                                                        {stage.filter(data => data.stage_budget < 15000).map((data) => (
                                                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
                                                                <img width='200px' height='auto' src={data.stage_photo} alt="" />
                                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{data.stage_budget}</dd>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{data.stage_size}</dd>
                                                                <input type="checkbox" class="checked:bg-blue-500 sm:ml-2 mt-2 w-5 h-5" />
                                                            </div>
                                                        ))}
                                                    </dl>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {serviceDetails.user_decoration_status == true &&
                                    <div className="px-4 py-1 sm:px-6">
                                        <h1 className="p-6 pt-10 text-3xl font-medium text-gray-900">
                                            {serviceDetails.decoration_name}
                                        </h1>
                                    </div>
                                }
                                {serviceDetails.user_decoration_status == true &&
                                    <div className="lg:max-w-7xl sm:max-w-sm mx-auto pb-12 sm:px-6 lg:px-8">
                                        <div className="mx-auto">
                                            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                                                <div className="border-b border-gray-200 px-4 py-5 sm:p-0">
                                                    <dl className="sm:divide-y sm:divide-gray-200">
                                                        <div className="py-4 sm:py-5 sm:grid lg:grid-cols-3 sm:grid-cols-3 lg:gap-4 sm:px-6">
                                                            <dt className="text-sm font-medium text-gray-500">Decoration Photo</dt>
                                                            <dt className="text-sm font-medium text-gray-500">Decoration Budget</dt>
                                                            <dt className="text-sm font-medium text-gray-500">Select</dt>
                                                        </div>
                                                        {decoration.map((data) => (
                                                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                                <img width='200px' height='auto' src={data.decoration_photo} alt="" />
                                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{data.decoration_budget}</dd>
                                                                <input type="checkbox" class="checked:bg-blue-500 sm:ml-2 mt-2 w-5 h-5" />
                                                            </div>
                                                        ))}
                                                    </dl>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {serviceDetails.user_photography_status == true &&
                                    <div className="px-4 py-1 sm:px-6">
                                        <h1 className="p-6 pt-10 text-3xl font-medium text-gray-900">
                                            {serviceDetails.photography_name}
                                        </h1>
                                    </div>
                                }
                                {serviceDetails.user_photography_status == true &&
                                    <div className="lg:max-w-7xl sm:max-w-sm mx-auto pb-12 sm:px-6 lg:px-8">
                                        <div className="mx-auto">
                                            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                                                <div className="border-b border-gray-200 px-4 py-5 sm:p-0">
                                                    <dl className="sm:divide-y sm:divide-gray-200">
                                                        <div className="py-4 sm:py-5 sm:grid lg:grid-cols-5 sm:grid-cols-5 lg:gap-4 sm:px-6">
                                                            <dt className="text-sm font-medium text-gray-500">Recent Photo</dt>
                                                            <dt className="text-sm font-medium text-gray-500">Shop Name</dt>
                                                            <dt className="text-sm font-medium text-gray-500">Address</dt>
                                                            <dt className="text-sm font-medium text-gray-500">Budget</dt>
                                                            <dt className="text-sm font-medium text-gray-500">Select</dt>
                                                        </div>
                                                        {photography.map((data) => (
                                                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6">
                                                                <img width='200px' height='auto' src={data.recent_photos} alt="" />
                                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{data.shop_name}</dd>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{data.address}</dd>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{data.budget}</dd>
                                                                <input type="checkbox" class="checked:bg-blue-500 sm:ml-2 mt-2 w-5 h-5" />
                                                            </div>
                                                        ))}
                                                    </dl>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {serviceDetails.user_vehicle_status == true &&
                                    <div className="px-4 py-1 sm:px-6">
                                        <h1 className="p-6 pt-10 text-3xl font-medium text-gray-900">
                                            {serviceDetails.vehicle_name}
                                        </h1>
                                    </div>
                                }
                                {serviceDetails.user_vehicle_status == true &&
                                    <div className="lg:max-w-7xl sm:max-w-sm mx-auto pb-12 sm:px-6 lg:px-8">
                                        <div className="mx-auto">
                                            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                                                <div className="border-b border-gray-200 px-4 py-5 sm:p-0">
                                                    <dl className="sm:divide-y sm:divide-gray-200">
                                                        <div className="py-4 sm:py-5 sm:grid lg:grid-cols-4 sm:grid-cols-4 lg:gap-4 sm:px-6">
                                                            <dt className="text-sm font-medium text-gray-500">Vehicle</dt>
                                                            <dt className="text-sm font-medium text-gray-500">Owner Name</dt>
                                                            <dt className="text-sm font-medium text-gray-500">Rent Price</dt>
                                                            <dt className="text-sm font-medium text-gray-500">Select</dt>
                                                        </div>
                                                        {vehicle.map((data) => (
                                                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
                                                                <img width='200px' height='auto' src={data.vehicle_image} alt="" />
                                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{data.owner_name}</dd>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{data.rent_price}</dd>
                                                                <input type="checkbox" class="checked:bg-blue-500 sm:ml-2 mt-2 w-5 h-5" />
                                                            </div>
                                                        ))}
                                                    </dl>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
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
            )}
        </div>
    )
}

export default UserMenuList