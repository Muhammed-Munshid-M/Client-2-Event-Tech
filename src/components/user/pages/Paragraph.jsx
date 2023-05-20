/* eslint-disable linebreak-style */
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function Paragraph() {
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
              <Typography component="div" variant="h5" className="ps-9">
                <h1 className="text-3xl font-serif italic">Stage Show</h1>
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" className="ps-9" component="div">
                <p className="pt-5 italic">We will custom design the foundation  of your event to any shape or size as needed.Our solutions are professionally engineered,complete with design certifications, load limitation</p>
                <p className="italic">Events are special and usually refers to a thing that happens or takes place, especially one of importance. Setting up the stage could be the best option for making an event successful. The stage for celebration, business, marketing, and function can make them well-introduced. Further, stage shows demand a host and decoration to make it creative and attractive. And with us, you can make the stage setup attentive for the audience. </p>
              </Typography>
            </CardContent>
          </Box>
        </Card>
      </div>
      <div>
        <Card sx={{ display: 'flex', mt: 9, mb: 9 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5" className="ps-9">
                <h1 className="text-3xl font-serif italic">Food Court</h1>
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" className="ps-9" component="div">
                <p className="pt-5 italic">No one can get wrong with food, as others say. This is the very reason why there are a lot of food companies that are emerging anywhere across the globe. In spite of difference in food culture, religion and taste preference, these companies provide you with a lot of different cuisines to choose from.</p>
                <p className="italic">These companies are known already for their brand or for their quality manual of service that they are offering to its customers or clients. But for some start-up food companies, they are still working hard to build a name in the food industry, and these includes thorough marketing and advertising to get these done</p>
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
              <Typography component="div" variant="h5" className="ps-9">
                <h1 className="text-3xl font-serif italic">Decoration</h1>
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" className="ps-9" component="div">
                <p className="pt-5 italic">A decoration is anything used to make something more attractive or festive. If you’re having a Valentine’s Day party, drape your house in red and pink decorations. Decoration is also a type of honor, like a soldier`&apos;`s medal or stripe.</p>
                <p className="italic">To decorate is to spiff something up, making it more colorful and attractive, like hanging streamers in a room or ornaments on a tree. Decorations are things used in this way. Many decorations are specific to holidays, like green decorations for St. Patrick`&apos;`s Day. Also, decorations are the honors given to people who have won or achieved something.</p>
              </Typography>
            </CardContent>
          </Box>
        </Card>
      </div>
    </div>

  );
}
