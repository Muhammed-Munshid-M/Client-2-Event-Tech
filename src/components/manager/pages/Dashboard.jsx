import axios from 'axios';
import React, { useEffect } from 'react'
import Layout from '../Layout'
import { managerUrl } from '../../../API/Api';
import { toast } from 'react-hot-toast';

function Dashboard() {
    const managerData = async () => {
        try {
            const token = localStorage.getItem('manager-token')
            await axios.post(`${managerUrl}manager-data`,{},
            {
                headers :{
                    Authorization : `Bearer ${token}`
                },
            }).then((response)=>{
                if (response.data.success) {
                    toast.success(response.data.message)
                } else if (response.data.noManager) {
                    toast.error(response.data.message)
                } else {
                    toast.error('Something error')
                }
            })
          } catch (error) {
            console.log(error);
          }
    }

    useEffect(()=>{
        managerData()
    })

    return (
        <div>
            <Layout>
                <h1>Hello</h1>
            </Layout>
        </div>
    )
}

export default Dashboard