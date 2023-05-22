/* eslint-disable linebreak-style */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout';
import { setCompany } from '../../redux/companyDetails';
import { userUrl } from '../../../API/Api';
import { hideLoading, showLoading } from '../../redux/alertSlice';

export default function CompanyList() {
  const [manager, setManager] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(3);
  const [totalPages, setTotalPages] = React.useState(1);
  const [showServices, setShowServices] = React.useState(false);
  const [serviceData, setServiceData] = React.useState([]);
  const [showFiltered, setShowFiltered] = React.useState(false);
  const [filteredData, setFilteredData] = React.useState([]);

  console.log('serviceDatas:', serviceData);
  console.log('filteredDatas:', filteredData);

  const datas = useSelector((state) => state.company || []);
  const serviceDatas = datas.service;
  const locationData = datas.location;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    try {
      dispatch(showLoading());
      const token = localStorage.getItem('token');
      axios.post(`${userUrl}company-list?limit=${limit}&page=${page}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        dispatch(hideLoading());
        if (serviceDatas.length === 0) {
          setManager(response.data.data.managerList);
          setTotalPages(response.data.data.totalPages);
        } else {
          setShowServices(!showServices);
          setServiceData(serviceDatas);
        }
        if (locationData.length === 0) {
          setManager(response.data.data.managerList);
          setTotalPages(response.data.data.totalPages);
        } else {
          setShowFiltered(!showFiltered);
          setFilteredData(locationData);
        }
      });
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
    }
  }, [limit, page, serviceDatas, locationData]);

  const selectCompany = async (id) => {
    dispatch(showLoading());
    const token = localStorage.getItem('token');
    await axios.post(`${userUrl}company-list/${id}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      dispatch(hideLoading());
      const managerDetails = response.data.data;
      dispatch(setCompany({ managerDetails }));
      navigate('/company-details');
    });
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <Layout>
        <div className="mt-24 top-0 ml-10">
          <div className="">
            <h1 className="font-serif font-bold text-purple-700 text-4xl ml-1 md:mr-[37rem]">Select your Company</h1>
          </div>
          {showFiltered ? (
            <div className="grid md:grid-cols-3">
              {filteredData.map((data, index) => (
                <Card
                  key={index}
                  sx={{
                    maxWidth: 300, backgroundColor: 'lightskyblue', marginTop: 6, pt: 1, mx: 3,
                  }}
                >
                  <CardMedia
                    component="img"
                    height="10"
                    sx={{
                      borderRadius: '50%', maxWidth: 180, minHeight: 180, mx: 'auto', display: 'block',
                    }}
                    image={data.company_logo}
                    alt="No company icon"
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        textTransform: 'uppercase', textAlign: 'center', fontFamily: 'initial', fontSize: '18px', fontWeight: 'bold',
                      }}
                    >
                      {data.company_name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        textAlign: 'center', fontFamily: 'initial', fontSize: '18px', fontWeight: 'semibold',
                      }}
                    >
                      {data.place}
                      ,
                      {' '}
                      {data.district}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        textAlign: 'center', fontFamily: 'initial', fontSize: '18px', fontWeight: 'semibold',
                      }}
                    >
                      {data.state}
                    </Typography>
                    <Button onClick={() => selectCompany(data._id)} sx={{ mx: 11, mt: 2 }} variant="contained">
                      Select
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : showServices ? (
            <div className="grid md:grid-cols-3">
              {serviceData.map((data, index) => (
                <Card
                  key={index}
                  sx={{
                    maxWidth: 300, backgroundColor: 'lightskyblue', marginTop: 6, pt: 1, mx: 3,
                  }}
                >
                  <CardMedia
                    component="img"
                    height="10"
                    sx={{
                      borderRadius: '50%', maxWidth: 180, minHeight: 180, mx: 'auto', display: 'block',
                    }}
                    image={data.company_logo}
                    alt="No company icon"
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        textTransform: 'uppercase', textAlign: 'center', fontFamily: 'initial', fontSize: '18px', fontWeight: 'bold',
                      }}
                    >
                      {data.company_name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        textAlign: 'center', fontFamily: 'initial', fontSize: '18px', fontWeight: 'semibold',
                      }}
                    >
                      {data.place}
                      ,
                      {' '}
                      {data.district}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        textAlign: 'center', fontFamily: 'initial', fontSize: '18px', fontWeight: 'semibold',
                      }}
                    >
                      {data.state}
                    </Typography>
                    <Button onClick={() => selectCompany(data._id)} sx={{ mx: 11, mt: 2 }} variant="contained">
                      Select
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3">
              {manager.map((data, index) => (
                <Card
                  key={index}
                  sx={{
                    maxWidth: 300, backgroundColor: 'lightskyblue', marginTop: 6, pt: 1, mx: 3,
                  }}
                >
                  <CardMedia
                    component="img"
                    height="10"
                    sx={{
                      borderRadius: '50%', maxWidth: 180, minHeight: 180, mx: 'auto', display: 'block',
                    }}
                    image={data.company_logo}
                    alt="No company icon"
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        textTransform: 'uppercase', textAlign: 'center', fontFamily: 'initial', fontSize: '18px', fontWeight: 'bold',
                      }}
                    >
                      {data.company_name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        textAlign: 'center', fontFamily: 'initial', fontSize: '18px', fontWeight: 'semibold',
                      }}
                    >
                      {data.place}
                      ,
                      {' '}
                      {data.district}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        textAlign: 'center', fontFamily: 'initial', fontSize: '18px', fontWeight: 'semibold',
                      }}
                    >
                      {data.state}
                    </Typography>
                    <Button onClick={() => selectCompany(data._id)} sx={{ mx: 11, mt: 2 }} variant="contained">
                      Select
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          <div className="lg:mx-96 mt-7">
            {pageNumbers.map((pageNumber) => (
              // eslint-disable-next-line react/button-has-type
              <button className="lg:mx-5 mx-7" key={pageNumber} onClick={() => setPage(pageNumber)}>
                {pageNumber}
              </button>
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
}
