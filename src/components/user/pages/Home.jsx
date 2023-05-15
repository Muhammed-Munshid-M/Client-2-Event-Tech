import React, { useEffect } from 'react'
import Navbar from '../Navbar'
import Banner from '../Banner'
import Paragraph from './Paragraph'
import Footer from '../Footer'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { userUrl } from '../../../API/Api'
import { setUser } from '../../redux/userSlice'

function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userData=async()=>{
    try {
      const token = localStorage.getItem('token')
      const {data} =await axios.post(`${userUrl}user-data`,{},
      {
        headers :{
          Authorization : `Bearer ${token}`,
        },
      })
      console.log('data:',data.data);
      dispatch(setUser(data.data))
    } catch (error) {

    }
  }
  useEffect(()=>{
    userData()
  },[])

  const addEvent = () =>{
    navigate('/company-list')
  }

  return (
    <div>
      <Navbar />
      <Banner />
      <div className='h-auto p-28'>
        <Paragraph />
      </div>
      <div class="fixed bottom-4 md:bottom-8 lg:bottom-12 left-1/2 transform -translate-x-1/2">
        <button onClick={addEvent} class="px-10 w-full md:w-auto py-3 text-2xl font-semibold font-serif bg-orange-500 text-white rounded-3xl hover:bg-orange-600">Add Event</button>
      </div>
      <Footer />
    </div>
  )
}

export default Home
