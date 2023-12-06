/* eslint-disable linebreak-style */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import { userUrl } from '../../../API/Api';
import Navbar from '../Navbar';
import Footer from '../Footer';

function CheckoutPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState(null);
  const [time, setTime] = useState('00:00');
  const [count, setCount] = useState('');
  const [type, setType] = useState('Wedding');
  const [pin, setPin] = useState('');
  const [state, setState] = useState('Kerala');
  const [district, setDistrict] = useState('Kasargod');
  const [place, setPlace] = useState('');
  const [grandTotal, setGrandTotal] = useState();
  const [submitClicked, setSubmitClicked] = useState(false);
  const userData = {
    name, email, mobile, address, date, time, count, type, pin, state, district, place, grandTotal,
  };
  const navigate = useNavigate();
  const location = useLocation();

  const total = location.state.totalPrice;
  const gst = 10;
  const GrandTotal = total + gst;

  useEffect(() => {
    setGrandTotal(GrandTotal);
  }, []);

  const handleOpenRazorpay = (data) => {
    let token;
    const options = {
      key: 'rzp_test_z85gRD1oIkrshQ',
      amount: Number(data.amount),
      currency: data.currency,
      name: 'EVENT TECH',
      description: 'Nothing',
      order_id: data.id,
      handler: async (response) => {
        token = localStorage.getItem('token');
        await axios.post(`${userUrl}add-event/${response.razorpay_order_id}`, userData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(async (res) => {
          if (res.data.success) {
            token = localStorage.getItem('token');
            await axios.post(`${userUrl}verify`, { response }, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }).then((response) => {
              if (response.data.status) {
                Swal.fire(
                  'Success',
                  'Your payment Successfully',
                  'success',
                ).then(() => {
                  navigate('/');
                });
              } else {
                toast.error(response.data.message);
              }
            });
          } else {
            toast.error('something error');
          }
        });
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handlePayment = (amount) => {
    setSubmitClicked(true);
    if (!email || !email || !mobile || !address || !pin || !place || !date || !count) {
      // You can display an error message, prevent the payment, or take appropriate action
      // alert('Email is required before proceeding to payment.');
      return;
    }
    const data = { amount };
    const token = localStorage.getItem('token');
    axios.post(`${userUrl}orders`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      handleOpenRazorpay(res.data.data);
    });
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  return (
    <div>
      <Navbar />
      <div className="w-full h-full mt-10">
        <div className="z-50 w-full h-full top-0">
          <div className="flex flex-row">
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
                      <div className="w-1/2 px-4">
                        <div className={`relative w-full mb-3 ${submitClicked && !name ? 'has-danger' : ''}`}>
                          <label
                            className={`block uppercase text-blueGray-600 text-xs font-bold mb-2 ${submitClicked && !name ? 'text-red-500' : ''}`}
                            htmlFor="grid-password"
                          >
                            Name
                            {' '}
                            {submitClicked && !name && '(Required)'}
                          </label>
                          <input
                            type="text"
                            value={name}
                            required
                            className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${submitClicked && !name ? 'border-red-500' : ''}`}
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className={`relative w-full mb-3 ${submitClicked && !mobile ? 'has-danger' : ''}`}>
                          <label
                            className={`block uppercase text-blueGray-600 text-xs font-bold mb-2 ${submitClicked && !mobile ? 'text-red-500' : ''}`}
                            htmlFor="grid-password"
                          >
                            Mobile
                            {' '}
                            {submitClicked && !mobile && '(Required)'}
                          </label>
                          <input
                            type="number"
                            value={mobile}
                            required
                            className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${submitClicked && !mobile ? 'border-red-500' : ''}`}
                            placeholder="Mobile"
                            onChange={(e) => setMobile(e.target.value)}
                          />
                        </div>
                        <div className={`relative w-full mb-3 ${submitClicked && !pin ? 'has-danger' : ''}`}>
                          <label
                            className={`block uppercase text-blueGray-600 text-xs font-bold mb-2 ${submitClicked && !pin ? 'text-red-500' : ''}`}
                            htmlFor="grid-password"
                          >
                            Pin
                            {' '}
                            {submitClicked && !pin && '(Required)'}
                          </label>
                          <input
                            type="number"
                            value={pin}
                            required
                            className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${submitClicked && !pin ? 'border-red-500' : ''}`}
                            placeholder="Pin"
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
                          <select
                            name=""
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            id=""
                          >
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
                      <div className="w-1/2 px-4">
                        {/* <form onSubmit={sendOtp}> */}
                        <div className={`relative w-full mb-3 ${submitClicked && !email ? 'has-danger' : ''}`}>
                          <label
                            className={`block uppercase text-blueGray-600 text-xs font-bold mb-2 ${submitClicked && !email ? 'text-red-500' : ''}`}
                            htmlFor="grid-password"
                          >
                            Email
                            {' '}
                            {submitClicked && !email && '(Required)'}
                          </label>
                          <input
                            type="email"
                            value={email}
                            required
                            className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${submitClicked && !email ? 'border-red-500' : ''}`}
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className={`relative w-full mb-3 ${submitClicked && !address ? 'has-danger' : ''}`}>
                          <label
                            className={`block uppercase text-blueGray-600 text-xs font-bold mb-2 ${submitClicked && !address ? 'text-red-500' : ''}`}
                            htmlFor="grid-password"
                          >
                            Address
                            {' '}
                            {submitClicked && !address && '(Required)'}
                          </label>
                          <input
                            type="address"
                            value={address}
                            required
                            className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${submitClicked && !address ? 'border-red-500' : ''}`}
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
                          <select
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            name=""
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            id=""
                          >
                            <option value="Kerala">Kerala</option>
                            <option value="Kerala">Tamilnadu</option>
                            <option value="Kerala">Karnataka</option>
                          </select>
                        </div>
                        <div className={`relative w-full mb-3 ${submitClicked && !place ? 'has-danger' : ''}`}>
                          <label
                            className={`block uppercase text-blueGray-600 text-xs font-bold mb-2 ${submitClicked && !place ? 'text-red-500' : ''}`}
                            htmlFor="grid-password"
                          >
                            Place
                            {' '}
                            {submitClicked && !place && '(Required)'}
                          </label>
                          <input
                            type="text"
                            value={place}
                            required
                            className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${submitClicked && !place ? 'border-red-500' : ''}`}
                            placeholder="Place"
                            onChange={(e) => setPlace(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
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
                    </div>
                    <div className="px-4 lg:px-10 py-10 pt-0 flex flex-row">
                      <div className="w-1/2 px-4">
                        <div className={`relative w-full mb-3 ${submitClicked && !date ? 'has-danger' : ''}`}>
                          <label
                            className={`block uppercase text-blueGray-600 text-xs font-bold mb-2 ${submitClicked && !date ? 'text-red-500' : ''}`}
                          >
                            Event Date
                            {submitClicked && !date && ' (Required)'}
                          </label>
                          <DatePicker
                            className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${submitClicked && !date ? 'border-red-500' : ''}`}
                            selected={date}
                            placeholderText="Select Your Date"
                            onChange={handleDateChange}
                            minDate={new Date()} // Restrict selection to future dates only
                            dateFormat="dd-MM-yyyy" // Specify your desired date format
                          />
                        </div>

                        <div className={`relative w-full mb-3 ${submitClicked && !count ? 'has-danger' : ''}`}>
                          <label
                            className={`block uppercase text-blueGray-600 text-xs font-bold mb-2 ${submitClicked && !count ? 'text-red-500' : ''}`}
                          >
                            Count of people
                            {submitClicked && !count && ' (Required)'}
                          </label>
                          <input
                            type="number"
                            value={count}
                            required
                            className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${submitClicked && !count ? 'border-red-500' : ''}`}
                            placeholder="Count of people"
                            onChange={(e) => setCount(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="w-1/2 px-4">
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
                          <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            name=""
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            id=""
                          >
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
            <div className="container mx-auto px-4">
              <div className="w-full px-4">
                <div className=" relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 mt-28 bg-slate-300">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="max-w-md mx-auto my-8">
                      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4 flex items-center justify-between">
                          <label className="block text-gray-700 font-bold mb-2" htmlFor="subtotal">
                            Subtotal
                          </label>
                          <p className="text-gray-700 text-sm">
                            ₹
                            {total}
                          </p>
                        </div>
                        <div className="mb-4 flex items-center justify-between">
                          <label className="block text-gray-700 font-bold mb-2" htmlFor="subtotal">
                            Gst
                          </label>
                          <p className="text-gray-700 text-sm">
                            ₹
                            {gst}
                          </p>
                        </div>
                        <div className="mb-4 flex items-center justify-between">
                          <label className="block text-gray-700 font-bold mb-2" htmlFor="total">
                            Total
                          </label>
                          <div className="">
                            <p className="text-gray-700 font-bold">
                              ₹
                              {grandTotal}
                            </p>
                          </div>
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700 font-bold mb-2">
                            About Payment
                          </label>
                          <div className="">
                            <p>For Booking time, Your Advance Payment have to only paying 50% of the total amount.</p>
                            <p>And you must need payment after the event programme.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center flex-auto px-4 lg:px-10 py-8 pt-0">
                      <button
                        onClick={() => handlePayment(grandTotal)}
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
  );
}

export default CheckoutPage;
