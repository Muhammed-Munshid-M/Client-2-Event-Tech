import React, { useEffect, useState } from 'react';
import { userUrl } from '../../../API/Api';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useSelector } from 'react-redux';
// import { useRoute } from '@react-navigation/native';
import Swal from 'sweetalert2'

function CheckoutPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [address, setAddress] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [count, setCount] = useState('')
  const [type, setType] = useState('Wedding')
  const [pin, setPin] = useState('')
  const [state, setState] = useState('Kerala')
  const [district, setDistrict] = useState('Kasargod')
  const [place, setPlace] = useState('')
  const [grandTotal, setGrandTotal] = useState()
  const userData = { name, email, mobile, address, date, time, count, type, pin, state, district, place, grandTotal }
  const navigate = useNavigate()
  const location = useLocation()

  const total = location.state.totalPrice;
  const gst = 10;
  const GrandTotal = total + gst

  useEffect(() => {
    setGrandTotal(GrandTotal)
  }, [])

  let { user } = useSelector((state) => state.user)

  const handleOpenRazorpay = (data) => {
    const options = {
      key: 'rzp_test_z85gRD1oIkrshQ',
      amount: Number(data.amount),
      currency: data.currency,
      name: 'EVENT TECH',
      description: 'Nothing',
      order_id: data.id,
      handler: (response) => {
        const token = localStorage.getItem('token')
        axios.post(`${userUrl}verify`, { response: response }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          if (response.data.status) {
            Swal.fire(
              'Success',
              'Your payment Successfully',
              'success'
            ).then(() => {
              try {
                const token = localStorage.getItem('token')
                axios.post(`${userUrl}add-event`, userData, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
                  .then((response) => {
                    if (response.data.success) {
                      toast.success(response.data.message)
                      navigate('/')
                    } else if (response.data.noAcc) {
                      toast.error(response.data.message)
                      navigate('/login')
                    } else {
                      toast.error('something error')
                      navigate('/add-event')
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  })
              } catch (error) {
                console.log(error)
                toast.error('something error')
              }
            })
          } else {
            toast.error(response.data.message)
          }
        })
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const handlePayment = (amount) => {
    const data = { amount: amount }
    const token = localStorage.getItem('token')
    axios.post(`${userUrl}orders`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      handleOpenRazorpay(res.data.data)
    })
      .catch(err => {
        console.log(err);
      })
  }
  return (
    <div>
      <Navbar />
      <div className='w-full h-full mt-10'>
        <div className='z-50 w-full h-full top-0'>
          <div className='flex flex-row'>
            <div className="container px-4">
              <div className="">
                <div className="w-full px-4">
                  <div className=" relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 mt-28 bg-slate-300">
                    <div className="rounded-t mb-0 px-6 py-6">
                      <div className="ml-8 mb-3">
                        <h6 className="text-blueGray-500 text-xl font-bold">
                          Your Details
                        </h6>
                      </div>
                    </div>
                    <div className="px-4 lg:px-10 py-10 pt-0 flex flex-row">
                      <div className='w-1/2 px-4'>
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Name
                          </label>
                          <input
                            type="name"
                            value={name}
                            required
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>

                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Mobile
                          </label>
                          <input
                            type="number"
                            value={mobile}
                            required
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Mobile"
                            onChange={(e) => setMobile(e.target.value)}
                          />
                        </div>
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Pin code
                          </label>
                          <input
                            type="number"
                            value={pin}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Pin Code"
                            onChange={(e) => setPin(e.target.value)}
                          />
                        </div>
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            District
                          </label>
                          <select name="" value={district} onChange={(e) => setDistrict(e.target.value)}
                            className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150' id="">
                            <option value="Kasargod">Kasargod</option>
                            <option value="Kannur">Kannur</option>
                            <option value="Wayanad">Wayanad</option>
                            <option value="Kozhikode">Kozhikode</option>
                            <option value="Malappuram">Malappuram</option>
                            <option value="Thrissur">Thrissur</option>
                            <option value="Palakkad">Palakkad</option>
                            <option value="Ernakulam">Ernakulam</option>
                            <option value="Idukki">Idukki</option>
                            <option value="Kottayam">Kottayam</option>
                            <option value="Alappuzha">Alappuzha</option>
                            <option value="Pathanamthitta">Pathanamthitta</option>
                            <option value="Kollam">Kollam</option>
                            <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                          </select>
                        </div>
                      </div>
                      <div className='w-1/2 px-4'>
                        {/* <form onSubmit={sendOtp}> */}
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            value={email}
                            required
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>

                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Address
                          </label>
                          <input
                            type="text"
                            value={address}
                            required
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Address"
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            State
                          </label>
                          <select value={state} onChange={(e) => setState(e.target.value)}
                            name="" className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150' id="">
                            <option value="Kerala">Kerala</option>
                            <option value="Kerala">Tamilnadu</option>
                            <option value="Kerala">Karnataka</option>
                          </select>
                        </div>
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            place
                          </label>
                          <input
                            type="text"
                            value={place}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Place"
                            onChange={(e) => setPlace(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    {/* <div className="text-center flex-auto px-4 lg:px-10 py-8 pt-0">
                        <button
                          className="bg-black text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="submit"
                        >
                          Pay Now
                        </button>
                      </div> */}
                  </div>
                </div>
                <div className="w-full px-4">
                  <div className=" relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 bg-slate-300">
                    <div className="rounded-t mb-0 px-6 py-6">
                      <div className="ml-8 mb-3">
                        <h6 className="text-blueGray-500 text-xl font-bold">
                          Booking Details
                        </h6>
                      </div>
                      {/* <hr className="mt-6 border-b-1 border-black" /> */}
                    </div>
                    <div className="px-4 lg:px-10 py-10 pt-0 flex flex-row">
                      <div className='w-1/2 px-4'>
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          >
                            Event Date
                          </label>
                          <input
                            type="date"
                            value={date}
                            required
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Date"
                            onChange={(e) => setDate(e.target.value)}
                          />
                        </div>
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          >
                            Count of people
                          </label>
                          <input
                            type="number"
                            value={count}
                            required
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Count of people"
                            onChange={(e) => setCount(e.target.value)}
                          />

                        </div>
                      </div>
                      <div className='w-1/2 px-4'>
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Event Time
                          </label>
                          <input
                            type="time"
                            value={time}
                            required
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Time"
                            onChange={(e) => setTime(e.target.value)}
                          />
                        </div>
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          >
                            Event Type
                          </label>
                          <select value={type} onChange={(e) => setType(e.target.value)}
                            name="" className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150' id="">
                            <option value="Wedding">Wedding</option>
                            <option value="Nikah">Nikah</option>
                            {/* <option value="Kerala">House Warming</option> */}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='container mx-auto px-4'>
              <div className="w-full px-4">
                <div className=" relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 mt-28 bg-slate-300">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div class="max-w-md mx-auto my-8">
                      <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div class="mb-4 flex items-center justify-between">
                          <label class="block text-gray-700 font-bold mb-2" for="subtotal">
                            Subtotal
                          </label>
                          <p class="text-gray-700 text-sm">₹{total}</p>
                        </div>
                        <div class="mb-4 flex items-center justify-between">
                          <label class="block text-gray-700 font-bold mb-2" for="subtotal">
                            Gst
                          </label>
                          <p class="text-gray-700 text-sm">₹{gst}</p>
                        </div>
                        <div class="mb-4 flex items-center justify-between">
                          <label class="block text-gray-700 font-bold mb-2" for="total">
                            Total
                          </label>
                          <div class="">
                            <p class="text-gray-700 font-bold">₹{grandTotal}</p>
                          </div>
                        </div>
                        <div class="mb-4">
                          <label class="block text-gray-700 font-bold mb-2">
                            About Payment
                          </label>
                          <div class="">
                            <p>For Booking time, Your Advance Payment have to only paying 50% of the total amount.</p>
                            <p>And you must need payment after the event programme.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center flex-auto px-4 lg:px-10 py-8 pt-0">
                      <button onClick={() => handlePayment(grandTotal)}
                        className="bg-black text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button"
                      >
                        Pay Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CheckoutPage
