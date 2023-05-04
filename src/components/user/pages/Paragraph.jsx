import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function Paragraph() {
    const theme = useTheme();

    return (
        <div>
            <div>
                <Card sx={{ display: 'flex', mb: 9 }}>
                    <CardMedia
                        component="img"
                        sx={{ width: 500, height: 350 }}
                        image="/pexels-edo.jpg"
                        alt="Live from space album cover"
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5" className='ps-9'>
                                <h1 className='text-3xl font-serif italic'>Stage Show</h1>
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" className='ps-9' component="div">
                                <p className='pt-5 italic'>We will custom design the foundation  of your event to any shape or size as needed.Our solutions are professionally engineered,complete with design certifications, load limitation</p>
                                <p className='italic'>Events are special and usually refers to a thing that happens or takes place, especially one of importance. Setting up the stage could be the best option for making an event successful. The stage for celebration, business, marketing, and function can make them well-introduced. Further, stage shows demand a host and decoration to make it creative and attractive. And with us, you can make the stage setup attentive for the audience. </p>
                            </Typography>
                        </CardContent>
                    </Box>
                </Card>
            </div>
            <div>
                <Card sx={{ display: 'flex', mt: 9, mb: 9 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5" className='ps-9'>
                                <h1 className='text-3xl font-serif italic'>Food Court</h1>
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" className='ps-9' component="div">
                                <p className='pt-5 italic'>we will custom design the foundation  of your event to any shape or size as needed.Our solutions are professionally engineered,complete with design certifications, load limitation</p>
                                <p className='italic'>Setting up the stage could be the best option for making an event successful. The stage for celebration, business, marketing, and function can make them well-introduced. Further, stage shows demand a host and decoration to make it creative and attractive. And with us, you can make the stage setup attentive for the audience. Here, Vision Vivaah brings the best ideas and event stage setup services below. </p>
                            </Typography>
                        </CardContent>
                    </Box>
                    <CardMedia
                        component="img"
                        sx={{ width: 500, height: 350 }}
                        image="/pexels-faruk.jpg"
                        alt="Live from space album cover"
                    />
                </Card>
            </div>
            <div>
                <Card sx={{ display: 'flex', mt: 9 }}>
                    <CardMedia
                        component="img"
                        sx={{ width: 500, height: 350 }}
                        image="/dec1.png"
                        alt="Live from space album cover"
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5" className='ps-9'>
                                <h1 className='text-3xl font-serif italic'>Decoration</h1>
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" className='ps-9' component="div">
                                <p className='pt-5 italic'>we will custom design the foundation  of your event to any shape or size as needed.Our solutions are professionally engineered,complete with design certifications, load limitation</p>
                                <p className='italic'>Setting up the stage could be the best option for making an event successful. The stage for celebration, business, marketing, and function can make them well-introduced. Further, stage shows demand a host and decoration to make it creative and attractive. And with us, you can make the stage setup attentive for the audience. Here, Vision Vivaah brings the best ideas and event stage setup services below. </p>
                            </Typography>
                        </CardContent>
                    </Box>
                </Card>
            </div>
        </div>

    );
}
