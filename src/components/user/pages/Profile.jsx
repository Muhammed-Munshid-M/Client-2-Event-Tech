import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { useNavigate } from 'react-router-dom'
import { userUrl } from '../../../API/Api'
import axios from 'axios'
import { toast } from 'react-hot-toast'

function Profile() {
    const [modal, setModal] = useState(false)
    const [userDetails, setUserDetails] = useState()
    const [profile,setProfile] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const navigate = useNavigate()


    const updateProfile = async () => {
        setModal(false)
        try {
            const uploadImage = async (image, name) => {
                const data = new FormData();
                data.append("file", image);
                data.append("upload_preset", "Event_Tech");
                const response = await axios.post("https://api.cloudinary.com/v1_1/dnrcd8rxl/image/upload", data);
                return response.data.url
            };

            await uploadImage(profile, "profile").then((response) => {
                const imageUpload = response
                console.log(imageUpload);
                const imageData = { imageUpload }
                const otherData = { name, email, mobile }
                const profileData = { otherData, imageData }
                const token = localStorage.getItem('token')
                axios.post(`${userUrl}add-profile`, profileData,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response)=>{
                    if (response.data.success) {
                        toast.success(response.data.message)
                        window.location.reload()
                    } else {
                        toast.error('Something error')
                    }
                })
            })
        } catch (error) {
            console.log(error)
            toast.error('something error')
        }
    }

    useEffect(() => {
        try {
                const token = localStorage.getItem('token')
                axios.post(`${userUrl}profile-details`, {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }).then((response) => {
                        console.log(response.data.data);
                        setUserDetails(response.data.data)
                    })
                    .catch((err) => {
                        console.log(err);
                    })
        } catch (err) {
            console.log(err);
        }
    }, [])

    // useEffect(() => {
    //     setTimeout(() => {
    //       setLoading(false)
    //     }, 1000);
    //   }, [])

    const openModal = async () => {
        setModal(true)
    }

    const closeModal = async () => {
        setModal(false)
    }

    const goBack = async () => {
        navigate('/manager/dashboard')
    }

    return (
        <div className='mt-16 pb-16' style={{ backgroundColor: 'rgb(210, 240, 275)' }}>
            <Navbar />
            <div className="max-w-full mx-auto py-12 sm:px-6 lg:px-8">
                <div className=' sm:py-5 sm:grid sm:grid-cols-2 sm:gap-20 sm:px-96'>
                    {modal ? (
                        <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-10">
                            <div class="max-w-xl p-6 bg-white divide-y divide-gray-500">
                                <div class="flex items-center justify-between">
                                    <h3 class="text-2xl">Add Details</h3>
                                    <svg onClick={closeModal} xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div class="mt-4">
                                    <form onSubmit={updateProfile} class="w-full max-w-xl">
                                        <div class="md:flex md:items-center mb-6 mt-5">
                                            <div class="md:w-1/3">
                                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                                                    Change Profile
                                                </label>
                                            </div>
                                            <div class="md:w-2/3">
                                                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="file" accept='image/*'
                                                    onChange={(e) => setProfile(e.target.files[0])} />
                                            </div>
                                        </div>
                                        <div class="md:flex md:items-center mb-6 mt-5">
                                            <div class="md:w-1/3">
                                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                                    Name
                                                </label>
                                            </div>
                                            <div class="md:w-2/3">
                                                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="text" placeholder={userDetails?.name} value={name} required
                                                    onChange={(e) => setName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="md:flex md:items-center mb-6">
                                            <div class="md:w-1/3">
                                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                                                    Email
                                                </label>
                                            </div>
                                            <div class="md:w-2/3">
                                                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="email" placeholder={userDetails?.email} value={email} required
                                                    onChange={(e) => setEmail(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="md:flex md:items-center mb-6">
                                            <div class="md:w-1/3">
                                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                                    Mobile
                                                </label>
                                            </div>
                                            <div class="md:w-2/3">
                                                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="number" placeholder={userDetails?.mobile} value={mobile} required
                                                    onChange={(e) => setMobile(e.target.value)} />
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
                        <button onClick={openModal} className="inline-flex items-center px-16 mt-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-cyan-200 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                            Edit Profile
                        </button>
                    )}
                    <button onClick={openModal} className="inline-flex items-center px-16 mt-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-cyan-200 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                        Bookings
                    </button>
                </div>
                {/* <div className='text-center w-full department-head mb-4'><h1 className='text-2xl font-normal'>Profile</h1></div> */}
                <div className="max-w-sm mx-auto px-12">
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div className="px-4 pt-5 sm:px-6">
                            <img className='sm:mx-auto' width='150px' height='auto' src={userDetails?.profile_image} alt='' />
                            <h1 className="text-2xl pt-2 font-medium text-gray-900">
                                {userDetails?.name}
                            </h1>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                {userDetails?.email}
                            </p>
                        </div>
                        <div className="px-4 sm:p-0">
                            <dl className="sm:divide-y sm:divide-gray-200">
                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                                    {/* <dt className="text-sm font-medium text-gray-500">Mobile</dt> */}
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        +91 {userDetails?.mobile}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
