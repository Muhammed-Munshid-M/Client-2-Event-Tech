import React, { useState } from 'react'
import Navbar from '../Navbar'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import { managerUrl } from '../../../API/Api'
import axios from 'axios'
import { toast } from 'react-hot-toast'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const managerData = { email, password }
    
    const verifyLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${managerUrl}`, managerData)
            if (response.data.block) {
                toast.error(response.data.message)
            } else {
                if (response.data.success) {
                    toast.success(response.data.message)
                    navigate('/manager/dashboard')
                    localStorage.setItem('manager-token', response.data.data)
                } else if (response.data.noUser) {
                    toast.error(response.data.message)
                } else if (response.data.pendApproval) {
                    toast.error(response.data.message)
                } else {
                    toast.error(response.data.message)
                }
            }
        } catch (error) {
            toast.error("Something went wrong")
        }
    }
    return (
        <div>
            <Navbar />
            <body className="h-screen overflow-hidden flex items-center justify-center my-20">
                <section className="min-h-screen flex items-stretch text-white w-3/4">
                    <div className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat  relative items-center bg-[url('/dec2.png')]">
                        <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                    </div>
                    <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0 bg-slate-950">
                        <div className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center">
                            <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                        </div>
                        <div className="w-full py-6 z-20">
                            <h1 className="my-6 w-auto h-7 sm:h-8 inline-flex font-semibold text-3xl">Login
                            </h1>
                            <form onSubmit={verifyLogin} className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
                                <div className="pb-2 pt-4">
                                    <input type="email" name="email" id="email" placeholder="Email" className="block w-full p-4 text-lg rounded-sm bg-black" value={email}
                                        onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="pb-2 pt-4">
                                    <input className="block w-full p-4 text-lg rounded-sm bg-black" type="password" name="password" id="password" placeholder="Password" value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="text-left text-gray-400 hover:underline hover:text-gray-100">
                                    <Link to='/manager/forgot' href="">Forgot your password?</Link>
                                </div>
                                <div className="px-4 pb-2 pt-4">
                                    <button className="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none" type='submit'>sign in</button>
                                </div>
                                <div className="mt-7 flex flex-row text-gray-400 ">
                                    <p className='inset-y-0 left-0 '>Are you a new Manager?</p>
                                    <Link to='/manager/signUp' className='ps-3 text-lg text-right hover:underline hover:text-gray-100'>Sign Up</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </body>
        </div>
    )
}

export default Login
