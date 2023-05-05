// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { userUrl } from '../../../API/Api';
// import Navbar from '../Navbar';
// import Footer from '../Footer';
// import { useDispatch,useSelector } from 'react-redux'
// import { toast } from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';
// import { setCompany } from '../../redux/companyDetails';

// function CompanyList() {
//     const [manager, setManager] = useState([])

//     const dispatch = useDispatch(setCompany)
//     const navigate = useNavigate()
//     const arrow = '>'

//     const selectCompany = async (id) => {
//         const token = localStorage.getItem('token')
//         await axios.post(`${userUrl}company-list/${id}`,{}, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         }).then((response) => {
//             console.log(response.data.data)
//             const managerDetails = response.data.data
//             dispatch(setCompany({managerDetails}))
//             navigate('/company-details')
//           })
//     }

//     useEffect(() => {
//         try {
//             const token = localStorage.getItem('token')
//             axios.post(`${userUrl}company-list`, {}, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             }).then((response) => {
//                 console.log('response: ' + response.data)
//                 if (response.data.noToken) {
//                     toast.error(response.data.message)
//                 }
//                 setManager(response.data.data)
//             })
//         } catch (err) {
//             console.log(err);

//         }
//     }, [])
//     return (
//         <div>
//             <Navbar />
//             <div className=''>
//             <video className='top-0 left-0 w-full h-auto' autoPlay loop muted src="/indian-wedding-reception_AdobeExpress.mp4"></video>
//                 <div className='mt-20 z-50 absolute w-full h-full top-0 ml-4'>
//                     <h1 className='font-serif py-8 font-bold text-purple-700 text-5xl ml-1'>Select your Company</h1>
//                     {manager.map((data) => (
//                         <div>
//                             <button onClick={() => selectCompany(data._id)} className="inline-flex items-center px-6 pr-10 py-4 mt-6 border text-white border-stone-950 rounded-md shadow-2xl shadow-black text-xl font-medium bg-purple-500 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-2xl">{data.company_name} <span>{arrow}</span></button>
//                         </div>
//                     )
//                     )}
//                 </div>
//                 <div className=''>
//                     <Footer />
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default CompanyList

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Navbar from '../Navbar';
import { Button } from '@mui/material';
import Layout from '../Layout';
import { useDispatch } from 'react-redux';
import { setCompany } from '../../redux/companyDetails';
import axios from 'axios';
import { userUrl } from '../../../API/Api';
import { useNavigate } from 'react-router-dom';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function CompanyList() {
    const [expanded, setExpanded] = React.useState([]);
    const [manager, setManager] = React.useState([])
    const [details, setDetails] = React.useState(false)

    const dispatch = useDispatch(setCompany)
    const navigate = useNavigate()

    const selectCompany = async (id) => {
        const token = localStorage.getItem('token')
        await axios.post(`${userUrl}company-list/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            console.log(response.data.data)
            const managerDetails = response.data.data
            dispatch(setCompany({ managerDetails }))
            navigate('/company-details')
        })
    }

    const viewCompany = () => {
        setDetails(true)
    }

    const closeModal = () => {
        setDetails(false)
    }

    React.useEffect(() => {
        try {
            const token = localStorage.getItem('token')
            axios.post(`${userUrl}company-list`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                console.log('response: ' + response.data)
                if (response.data.noToken) {
                    toast.error(response.data.message)
                }
                setManager(response.data.data)
            })
        } catch (err) {
            console.log(err);

        }
    }, [])

    const handleExpandClick = (index) => {
        setExpanded((prevExpanded) => {
            const newExpanded = [...prevExpanded];
            newExpanded[index] = !newExpanded[index];
            return newExpanded;
        });
    };

    return (
        <div>
            <Layout>
                {/* <video className='top-0 left-0 w-full h-auto' autoPlay loop muted src="/indian-wedding-reception_AdobeExpress.mp4"></video> */}
                <div className='mt-24 top-0 ml-10'>
                    <div className=''>
                        <h1 className='font-serif font-bold text-purple-700 text-4xl ml-1 md:mr-[37rem]'>Select your Company</h1>
                        {/* <div className='float-right text font-normal text-xl ml-1'> */}
                        {/* <h5 className='sm:py-2'>Filter : </h5>
                    <select className='inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-cyan-200 hover:bg-cyan-500 focus:outline-none focus:ring-2 sm:ml-3 sm:w-auto sm:text-sm' name="" id="">
                        <option className='py-4' value="">Select</option>
                        <option className='py-4' value="">Filter</option>
                    </select> */}
                        {/* </div> */}
                    </div>
                    <div className='grid md:grid-cols-3'>
                        {manager.map((data, index) => (
                            <Card key={index} sx={{ maxWidth: 300, backgroundColor: 'lightskyblue', marginTop: 6, pt: 1, mx: 3 }}>
                                <CardMedia
                                    component="img"
                                    height="10"
                                    sx={{ borderRadius: '50%', maxWidth: 180, mx: 'auto', display: 'block' }}
                                    image={data.company_logo}
                                    alt="catering icon"
                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'uppercase', textAlign: 'center', fontFamily: 'initial', fontSize: '18px', fontWeight: 'bold' }}>
                                        {data.company_name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', fontFamily: 'initial', fontSize: '18px', fontWeight: 'semibold' }}>
                                        {data.place}, {data.district}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', fontFamily: 'initial', fontSize: '18px', fontWeight: 'semibold' }}>
                                        {data.state}
                                    </Typography>
                                    {/* <div className='flex content-center items-center justify-center'>
                                        {details ? (
                                            <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 mt-10 ml-44">
                                                <div class="max-w-xl p-6 bg-white divide-y divide-gray-500">
                                                    <div class="flex items-center justify-between">
                                                        <h3 class="text-2xl">View Details</h3>
                                                        <svg onClick={closeModal} xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                                                            stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    </div>
                                                    <div class="mt-4">
                                            
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <Button onClick={viewCompany} sx={{ mx: 12, mt: 2, backgroundColor: 'green' }} variant="contained">
                                                <RemoveRedEyeIcon />
                                            </Button>
                                        )}
                                    </div> */}

                                    <Button onClick={() => selectCompany(data._id)} sx={{ mx: 11, mt: 2 }} variant="contained">
                                        Select
                                    </Button>
                                </CardContent>
                                {/* <CardActions disableSpacing>
                                    <ExpandMore
                                        expand={expanded[index]}
                                        onClick={() => handleExpandClick(index)}
                                        aria-expanded={expanded[index]}
                                        aria-label="show more"
                                    >
                                        <RemoveRedEyeIcon />
                                    </ExpandMore>
                                </CardActions>
                                <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        <Typography paragraph>Manager Name :</Typography>
                                        <Typography paragraph>Mobile : </Typography>
                                        <Typography paragraph>
                                            Heat
                                        </Typography>
                                        <Typography paragraph>
                                            Add
                                        </Typography>
                                        <Typography>
                                            Set aside off of the heat to let rest for 10 minutes, and then serve.
                                        </Typography>
                                    </CardContent>
                                </Collapse> */}
                            </Card>
                        ))}
                    </div>
                </div>
            </Layout>
        </div>
    );
}
