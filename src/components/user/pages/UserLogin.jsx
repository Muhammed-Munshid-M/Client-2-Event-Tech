/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
// import { LoginSocialGoogle } from 'reactjs-social-login';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import { userUrl } from '../../../API/Api';
import Navbar from '../Navbar';

function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const userData = { email, password };

  const verifyLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${userUrl}login`, userData);
      console.log('res:', response);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/');
        localStorage.setItem('token', response.data.data);
      } else if (response.data.noUser) {
        toast.error(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const responseGoogle = (response) => {
    console.log('Hello');
    console.log(response);
    // Handle the response, e.g., send it to the backend for verification
  };

  // const handleGoogleResolve = async (data) => {
  //   console.log('data: ', data);
  //   try {
  //     const googleTokenId = data.access_token;
  //     console.log('id: ', googleTokenId);
  //     const response = await axios.post(`${userUrl}google-login/${googleTokenId}`);
  //     if (response.data.success) {
  //       toast.success(response.data.message);
  //       navigate('/');
  //       localStorage.setItem('token', response.data.data);
  //     } else if (response.data.noAcc) {
  //       toast.error(response.data.message);
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     toast.error('Something went wrong');
  //   }
  // };

  return (
    <div>
      <Navbar />
      <body className="h-screen overflow-hidden flex items-center justify-center my-20">
        <section className=" flex items-stretch text-white w-3/4">
          <div className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center bg-[url('/evnt3.jpeg')]">
            <div className="absolute bg-black opacity-20 inset-0 z-0" />
          </div>
          <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0  bg-slate-950">
            <div className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center">
              <div className="absolute bg-black opacity-60 inset-0 z-0" />
            </div>
            <div className="w-full py-6 z-20">
              <h1 className="my-6 w-auto h-7 sm:h-8 inline-flex font-semibold text-3xl">
                Login
              </h1>
              <form onSubmit={verifyLogin} className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
                <div className="pb-2 pt-4">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    className="block w-full p-4 text-lg rounded-sm bg-black"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="pb-2 pt-4">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    className="block w-full p-4 text-lg rounded-sm bg-black"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="text-left text-gray-400 hover:underline hover:text-gray-100">
                  <Link to="/forgot">Forgot your password?</Link>
                </div>
                <div className="px-4 pb-2 pt-4">
                  <button type="submit" className="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none">sign in</button>
                </div>
                <hr className="my-3" />
                <p className="text-gray-100">
                  or use your google account
                </p>
                <div className="pt-4 relative flex items-center space-x-4 justify-center">
                  <GoogleLogin
                    clientId="138699309110-kimct2ltr42rdg4h704vhi851vp4pa3q.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    uxMode="popup"
                    // eslint-disable-next-line react/jsx-curly-brace-presence
                    cookiePolicy={'single_host_origin'}
                  />
                  {/* <button type="button" className="block w-full
                   p-4 text-lg rounded-full bg-slate-300 hover:bg-slate-200 focus:outline-none
                   text-black cursor-pointer">
                      <img className="absolute w-6" src="https://tailus.io/sources/blocks/social/preview/images/google.svg" alt="Google Logo" />
                      <span className="ps-5">
                        Continue With Google
                      </span>

                    </button>
                  </GoogleLogin> */}
                </div>
                <script src="https://apis.google.com/js/platform.js" async defer />

                <div className="mt-7 flex flex-row text-gray-400 ">
                  <p className="inset-y-0 left-0 ">No register in account?</p>
                  <Link to="/signUp" className="ps-3 text-lg text-right hover:underline hover:text-gray-100">Sign Up</Link>
                </div>
              </form>
            </div>
          </div>
        </section>
      </body>
    </div>
  );
}

export default UserLogin;
