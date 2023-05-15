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
import Pagination from '../Pagination';

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
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(3);
    const [totalPages, setTotalPages] = React.useState(1);

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
            axios.post(`${userUrl}company-list?limit=${limit}&page=${page}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                console.log('response: ' + response.data)
                setManager(response.data.data.managerList)
                setTotalPages(response.data.data.totalPages);
            })
        } catch (err) {
            console.log(err);

        }
    }, [limit, page])

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <Layout>
                {/* <video className='top-0 left-0 w-full h-auto' autoPlay loop muted src="/indian-wedding-reception_AdobeExpress.mp4"></video> */}
                <div className='mt-24 top-0 ml-10'>
                    <div className=''>
                        <h1 className='font-serif font-bold text-purple-700 text-4xl ml-1 md:mr-[37rem]'>Select your Company</h1>
                    </div>
                    <div className='grid md:grid-cols-3'>
                        {manager.map((data, index) => (
                            <Card key={index} sx={{ maxWidth: 300, backgroundColor: 'lightskyblue', marginTop: 6, pt: 1, mx: 3 }}>
                                <CardMedia
                                    component="img"
                                    height="10"
                                    sx={{ borderRadius: '50%', maxWidth: 180, minHeight: 180, mx: 'auto', display: 'block' }}
                                    image={data.company_logo}
                                    alt="No company icon"
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

                                    <Button onClick={() => selectCompany(data._id)} sx={{ mx: 11, mt: 2 }} variant="contained">
                                        Select
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <div className='lg:mx-96 mt-7'>
                        {pageNumbers.map((pageNumber) => (
                            <button className='lg:mx-5 mx-7' key={pageNumber} onClick={() => setPage(pageNumber)}>
                                {pageNumber}
                            </button>
                        ))}
                    </div>
                </div>
            </Layout>
        </div>
    );
}
