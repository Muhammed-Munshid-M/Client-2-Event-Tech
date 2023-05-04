import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Navbar'
import axios from 'axios'
import { managerUrl } from '../../../API/Api'
import './Login.css'
import { Toaster, toast } from 'react-hot-toast'
import { auth } from '../../../firebase/config'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'

function SignUp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [aadhar, setAadhar] = useState([])
    const [licenseVoterId, setLicenseVoterId] = useState([])
    const [state, setState] = useState('')
    const [place, setPlace] = useState('')
    const [mobile, setMobile] = useState('')
    const [address, setAddress] = useState('')
    const [company, setCompany] = useState('')
    const [pincode, setPincode] = useState('')
    const [district, setDistrict] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const managerData = { name, email, state, place, mobile, address, company, pincode, district, password }
    console.log('managerData'+managerData.name);

    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
                'size': 'invisible',
                callback: (response) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                    // ...
                },
                'expired-callback': () => {
                    // Response expired. Ask user to solve reCAPTCHA again.
                    // ...
                }
            }, auth);
        }
    }

    const sendOtp = async (e) => {
        e.preventDefault()
        // try {
            const uploadImage = async (image, name) => {
                const data = new FormData();
                data.append("file", image);
                data.append("upload_preset", "Event_Tech");
                const response = await axios.post("https://api.cloudinary.com/v1_1/dnrcd8rxl/image/upload", data);
                return response.data.url
            };

            await Promise.all([uploadImage(aadhar, "aadhar"), uploadImage(licenseVoterId, "license")]).then((response) => {
                console.log(response)
                const imageUpload1 = response[0]
                const imageUpload2 = response[1]
                const imageData = { imageUpload1, imageUpload2 }
                console.log('imageData'+managerData);
                const allData = {managerData, imageData}
                axios.post(`${managerUrl}signUp`, allData)
                    .then(async (response) => {
                        if (response.data.success) {
                            // onCaptchVerify()
                            // const formatPhone = '+91' + mobile
                            // const appVerifier = window.recaptchaVerifier;
                            // signInWithPhoneNumber(auth, formatPhone, appVerifier)
                            //     .then((confirmationResult) => {
                            //         window.confirmationResult = confirmationResult;
                            //         toast(response.data.message)
                            navigate('/manager/otp')
                            // }).catch((error) => {
                            //     console.log(error);
                            // })
                        } else if (response.data.exist) {
                            toast(response.data.message)
                            navigate('/manager')

                        } else {
                            toast.error('something error')
                            navigate('/manager/signUp')
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
        // } catch (error) {
        //     console.log(error)
        //     toast.error('something error')
        // }
    }

    return (
        <>
            <Navbar />
            <body className="overflow-hidden md:flex items-center justify-center my-20">
                <div id='recaptcha-container'></div>
                <Toaster toastOptions={{ duration: 4000 }} />
                <section className="md:flex items-stretch bg-slate-950 text-white w-4/5 mx-auto">
                    <div className="lg:flex lg:w-1/3 hidden lg:bg-gray-500 relative items-center bg-[url('/dec4.png')]">
                        <div className="absolute md:bg-black md:opacity-60 inset-0 z-0"></div>
                    </div>
                    <div className="lg:w-3/4 sm:w-full md:flex items-center md:px-16 z-0 md:bg-slate-950 px-5">
                        <div className="md:absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center">
                            <div className="absolute md:bg-black opacity-60 inset-0 z-0"></div>
                        </div>
                        <div className="">
                            <h1 className="my-6 w-auto inline-flex font-semibold text-3xl">Hey, Event Manager
                            </h1>
                            <div className="text-left text-gray-300 text-lg">
                                <p>Just signup</p>
                            </div>
                            <div className="sm:w-2/3 w-full lg:px-0">
                                <div className="pb-1 pt-2">
                                    <label className='text-left text-gray-400 ps-2' htmlFor="">Name <span className='text-red-600'>*</span></label>
                                    <input type="text" name="name" id="name" placeholder="Name" value={name} className="mt-2 block w-full p-3 text-lg rounded-sm bg-black"
                                        onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="pb-1 pt-2">
                                    <label className='text-left text-gray-400 ps-2' htmlFor="">Email <span className='text-red-600'>*</span></label>
                                    <input type="email" name="email" id="email" placeholder="Email" value={email} className="mt-2 block w-full p-3 text-lg rounded-sm bg-black"
                                        onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="pb-1 pt-2">
                                    <label className='text-left text-gray-400 ps-2' htmlFor="image">Aadhar card <span className='text-red-600'>*</span></label>
                                    <input className="block w-full mt-2 p-3 text-lg rounded-sm bg-black" type="file" accept='image/*' name="aadhar" id="aadhar" placeholder="Adhar"
                                        onChange={(e) => setAadhar(e.target.files[0])} />
                                </div>
                                <div className="pb-1 pt-2">
                                    <label className='text-left text-gray-400 ps-2' htmlFor="">License or Voter Id card</label>
                                    <input className="block w-full p-3 text-lg rounded-sm bg-black mt-2" type="file" accept='image/*' name="mobile" id="mobile" placeholder="Mobile"
                                        onChange={(e) => setLicenseVoterId(e.target.files[0])} />
                                </div>
                                <div className="pb-1 pt-2">
                                    <label className='text-left text-gray-400 ps-2' htmlFor="">State <span className='text-red-600'>*</span></label>
                                    <select value={state} onChange={(e) => setState(e.target.value)} className="mt-2 block w-full p-3 text-lg rounded-sm bg-black">
                                        <option value="Kerala">Kerala</option>
                                        <option value="Tamilnadu">Tamilnadu</option>
                                        <option value="Tamilnadu">Karnataka</option>
                                    </select>
                                </div>
                                <div className="pb-1 pt-2">
                                    <label className='text-left text-gray-400 ps-2' htmlFor="">Place <span className='text-red-600'>*</span></label>
                                    <input type="text" id="place" placeholder="Place" value={place} className="mt-2 block w-full p-3 text-lg rounded-sm bg-black"
                                        onChange={(e) => setPlace(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="z-20">
                            <div className="w-full lg:px-0 mt-8 pt-8">
                                <div className="pb-1 pt-4">
                                    <label className='text-left text-gray-400 ps-2' htmlFor="">Mobile <span className='text-red-600'>*</span></label>
                                    <input className="mt-2 block w-full p-3 text-lg rounded-sm bg-black" value={mobile} type="number" name="mobile" id="mobile" placeholder="Mobile"
                                        onChange={(e) => setMobile(e.target.value)} />
                                </div>
                                <div className="pb-1 pt-2">
                                    <label className='text-left text-gray-400 ps-2' htmlFor="">Address <span className='text-red-600'>*</span></label>
                                    <input className="mt-2 block w-full p-3 text-lg rounded-sm bg-black" value={address} type="text" name="address" id="address" placeholder="Address"
                                        onChange={(e) => setAddress(e.target.value)} />
                                </div>
                                <div className="pb-1 pt-2">
                                    <label className='text-left text-gray-400 ps-2' htmlFor="">Company Name <span className='text-red-600'>*</span></label>
                                    <input className="block w-full p-3 text-lg rounded-sm bg-black mt-2" value={company} type="text" name="company" id="company" placeholder="Company Name"
                                        onChange={(e) => setCompany(e.target.value)} />
                                </div>
                                <div className="pb-1 pt-2">
                                    <label className='text-left text-gray-400 ps-2' htmlFor="">Pin Code <span className='text-red-600'>*</span></label>
                                    <input type="number" placeholder="Pincode" value={pincode} className="mt-2 block w-full p-3 text-lg rounded-sm bg-black"
                                        onChange={(e) => setPincode(e.target.value)} />
                                </div>
                                <div className="pb-1 pt-2">
                                    <label className='text-left text-gray-400 ps-2' htmlFor="">District <span className='text-red-600'>*</span></label>
                                    <select name="" id="" value={district} onChange={(e) => setDistrict(e.target.value)} className="mt-2 block w-full p-3 text-lg rounded-sm bg-black">
                                        <option value="Kasargod">Kasargod</option>
                                        <option value="Kannur">Kannur</option>
                                        <option value="Wayanad">Wayanad</option>
                                        <option value="Kozhikode">Kozhikode</option>
                                        <option value="Malappuram">Malappuram</option>
                                        <option value="Palakkad">Palakkad</option>
                                        <option value="Thrissur">Thrissur</option>
                                        <option value="Ernakulam">Ernakulam</option>
                                        <option value="Idukki">Idukki</option>
                                        <option value="Kottayam">Kottayam</option>
                                        <option value="Alappuzha">Alappuzha</option>
                                        <option value="Pathanamthitta">Pathanamthitta</option>
                                        <option value="Kollam">Kollam</option>
                                        <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                                    </select>
                                </div>
                                <div className="pb-1 pt-2">
                                    <label className='text-left text-gray-400 ps-2' htmlFor="">Password <span className='text-red-600'>*</span></label>
                                    <input className="block w-full p-3 text-lg rounded-sm bg-black mt-2" value={password} type="password" name="password" id="password" placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="px-4 py-4 mx-auto">
                                    <button onClick={sendOtp} className="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none" type='button'>sign up</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </body>
        </>
    )
}

export default SignUp
