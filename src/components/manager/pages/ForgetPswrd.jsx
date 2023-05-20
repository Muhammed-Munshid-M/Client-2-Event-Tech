/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import OtpInput from 'otp-input-react';
import { managerUrl } from '../../../API/Api';
import auth from '../../../firebase/config';
import Navbar from '../Navbar';

function ForgetPswrd() {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [showMobile, setShowMobile] = useState(true);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        size: 'invisible',
        callback: () => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
        'expired-callback': () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        },
      }, auth);
    }
  }

  const verifyNumber = async (e) => {
    e.preventDefault();
    setCountdown(30);
    try {
      await axios.post(`${managerUrl}forgot`, { mobile }).then((response) => {
        if (response.data.success) {
          onCaptchVerify();
          const formatPhone = `+91${mobile}`;
          const appVerifier = window.recaptchaVerifier;
          signInWithPhoneNumber(auth, formatPhone, appVerifier)
            .then((confirmationResult) => {
              window.confirmationResult = confirmationResult;
              toast(response.data.message);
              setShowMobile(false);
            }).catch((error) => {
              console.log(error);
            });
        } else {
          setShowMobile(true);
          toast.error(response.data.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const submitOtp = async () => {
    window.confirmationResult.confirm(otp).then((res) => {
      try {
        if (res) {
          navigate('/manager/reset-pswrd');
          toast.success('Your new password enter here...');
        } else {
          toast.error('Your otp is invalid,Please try again');
        }
      } catch (error) {
        console.log(error);
        toast.error('Something Error');
      }
    });
  };

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
      {showMobile ? (
        <div>
          <Navbar />
          <body className="h-screen overflow-hidden flex items-center justify-center my-20">
            <div id="recaptcha-container" />
            <Toaster toastOptions={{ duration: 4000 }} />
            <section className="min-h-screen flex items-stretch text-white w-3/4">
              <div className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat  relative items-center bg-[url('/dec2.png')]">
                <div className="absolute bg-black opacity-60 inset-0 z-0" />
              </div>
              <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0 bg-slate-950">
                <div className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center">
                  <div className="absolute bg-black opacity-60 inset-0 z-0" />
                </div>
                <div className="w-full py-6 z-20">
                  <h1 className="my-6 w-auto h-7 sm:h-8 inline-flex font-semibold text-3xl">
                    Forgot Password ?
                  </h1>
                  <form onSubmit={verifyNumber} className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
                    <div className="text-left text-gray-400">
                      <p>Just enter your mobile number</p>
                    </div>
                    <div className="pb-2 pt-4">
                      <input
                        type="number"
                        name="mobile"
                        id="mobile"
                        placeholder="Mobile"
                        className="block w-full p-4 text-lg rounded-sm bg-black"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                      />
                    </div>
                    <div className="px-4 pb-2 pt-4">
                      <button className="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none" type="submit">submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </body>
        </div>
      ) : (
        <div>
          <Navbar />
          <body className="h-screen overflow-hidden flex items-center justify-center my-20">
            <div id="recaptcha-container" />
            <Toaster toastOptions={{ duration: 4000 }} />
            <section className="min-h-screen flex items-stretch text-white w-3/4">
              <div className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat  relative items-center bg-[url('/dec2.png')]">
                <div className="absolute bg-black opacity-60 inset-0 z-0" />
              </div>
              <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0 bg-color">
                <div className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center">
                  <div className="absolute bg-black opacity-60 inset-0 z-0" />
                </div>
                <div className="w-full py-6 z-20">
                  <h1 className="my-6 w-auto h-7 sm:h-8 inline-flex font-semibold text-3xl">
                    Otp
                  </h1>
                  <form action="" className="sm:w-2/3 w-full px-4 mx-auto lg:px-0">
                    <div className="pb-2 pt-4">
                      <OtpInput value={otp} onChange={setOtp} OTPLength={6} otpType="number" disabled={false} autoFocus className="opt-container text-black" />
                    </div>
                    <div className="px-4 pb-2 pt-4">
                      <button onClick={submitOtp} className="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none" type="button">Verify OTP</button>
                    </div>
                    <div className="px-4 pb-2 pt-4">
                      {countdown ? (
                        <p disabled={countdown > 0} className="w-full p-4 text-lg">{`Resend OTP in ${countdown} seconds`}</p>
                      ) : (
                        <button onClick={verifyNumber} disabled={countdown > 0} className="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none" type="button">Resend Otp</button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </body>
        </div>
      )}
    </div>
  );
}

export default ForgetPswrd;
