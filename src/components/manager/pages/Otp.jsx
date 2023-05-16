import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Navbar'
import { managerUrl } from '../../../API/Api'
import toast, { Toaster } from 'react-hot-toast'
import OtpInput from 'otp-input-react'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { auth } from '../../../firebase/config'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

function Otp() {
    // console.log(aadhar);

    const [otp, setOtp] = useState('')
    const [countdown, setCountdown] = useState(0)
    const navigate = useNavigate()
    const submitOtp = async (e) => {
        e.preventDefault()
        // window.confirmationResult.confirm(otp).then(async(res) => {
        try {
            // if (res) {
            axios.post(`${managerUrl}otp`).then((response) => {
                if (response.data.success) {
                    navigate('/manager')
                    toast.success(response.data.message)
                } else {
                    navigate('/manager/otp')
                    toast.error('Something error')
                }
            })
            // } else {
            //     toast.error('Your otp is invalid,Please try again')
            // }
        } catch (error) {
            console.log(error)
        }
        // })
    }

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

    const resendOtp = async (e) => {
        e.preventDefault()
        setCountdown(30)
        try {
            await axios.post(`${managerUrl}resend-otp`).then((response) => {
                if (response.data.success) {
                    onCaptchVerify()
                    let mobile = response.data.data
                    const formatPhone = '+91' + mobile
                    const appVerifier = window.recaptchaVerifier;
                    signInWithPhoneNumber(auth, formatPhone, appVerifier)
                        .then((confirmationResult) => {
                            window.confirmationResult = confirmationResult;
                            toast(response.data.message)
                        }).catch((error) => {
                            console.log(error);
                        })
                } else {
                    toast.error(response.data.message)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (countdown > 0) {
            const timer = setInterval(() => {
                setCountdown(countdown - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [countdown]);

    return (
        <div>
            <Navbar />
            <body className="h-screen overflow-hidden flex items-center justify-center my-20">
                <div id='recaptcha-container'></div>
                <Toaster toastOptions={{ duration: 4000 }} />
                <section className="min-h-screen flex items-stretch text-white w-3/4">
                    <div className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat  relative items-center bg-[url('/dec2.png')]">
                        <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                    </div>
                    <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0 bg-color">
                        <div className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center">
                            <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                        </div>
                        <div className="w-full py-6 z-20">
                            <h1 className="my-6 w-auto h-7 sm:h-8 inline-flex font-semibold text-3xl">Otp
                            </h1>
                            <form action="" className="sm:w-2/3 w-full px-4 mx-auto lg:px-0">
                                <div className="pb-2 pt-4">
                                    <OtpInput value={otp} onChange={setOtp} OTPLength={6} otpType="number" disabled={false} autoFocus className="opt-container text-black"></OtpInput>
                                    {/* <input type="number" name="otp" id="otp" placeholder="Enter your Otp" value={otp} className="block w-full p-4 text-lg rounded-sm bg-black" 
                                    onChange={(e) => setOtp(e.target.value)}/> */}
                                </div>
                                <div className="px-4 pb-2 pt-4">
                                    <button onClick={submitOtp} className="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none" type="button">Verify OTP</button>
                                </div>
                                <div className="px-4 pb-2 pt-4">
                                    {countdown ? (
                                        <p disabled={countdown > 0} className="w-full p-4 text-lg">{`Resend OTP in ${countdown} seconds`}</p>
                                    ) : (
                                        <button onClick={resendOtp} disabled={countdown > 0} className="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none" type="button">Resend Otp</button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </body>
        </div>
    )
}

export default Otp
