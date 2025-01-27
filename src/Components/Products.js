import React from 'react';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import product_list from '../JSON/movies.json';
import { Grid } from '@mui/material'; // Import Grid component
// import Fab from '@mui/material/Fab';
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
// import FavoriteIcon from '@mui/icons-material/Favorite'
import "../Styles/products.css";
import { useNavigate } from 'react-router-dom';

export default function Products() {
  const navigate = useNavigate();

  function handleBooking(item){
    navigate(`/booking/${item?.id}`)
  }
  
  if (product_list?.movies?.length > 0) {
    return (
      <div>
        {/* Use Grid container to create rows */}
        <Grid container spacing={2} sx={{ padding: '1%' }}>
          {product_list?.movies?.map((item, key) => (
            <Grid item xs={12} sm={6} md={3} key={key} maxHeight={'100vh'} onClick={()=>handleBooking(item)}>
              {/* Card for each product */}
              <Card sx={{ 
                width: '100%',
                height: '100%', // Ensure cards take up the full height of the grid item
                display: 'flex',
                flexDirection: 'column', // Arrange content vertically
               }}>
                
                <Box sx={{ 
                display: 'flex',
                flexDirection: 'row-reverse', // Arrange content vertically
                justifyContent: 'space-evenly'
               }}>
                    
                    <CardMedia
                        sx={{
                            height: 200, // You can adjust the height as needed
                            objectFit: 'contain', // Ensures the image is fully visible and not cropped
                            width: 200, // Ensures the image width stretches to fill the container
                            alignItems: 'center',
                            // marginRight: '5%',
                            marginTop: '10%',
                            marginLeft: '10%',
                            marginBottom: '5%',
                            transition: 'transform 0.3s ease-in-out', // Smooth zoom effect
                            '&:hover': {
                            transform: 'scale(1.2)', // Zoom in by 20%
                            }
                            
                            // marginRight: '5%'
                        }}
                        image={item?.Poster}
                        title={item?.Genre}
                    />
                </Box>
        
                <CardContent
                    sx={{
                        textAlign: 'justify'
                    }}
                >
                  <Typography gutterBottom variant="h4" component="div">
                    <Rating name="half-rating" defaultValue={(parseFloat(item?.imdbRating))/2} precision={0.1} readOnly/>
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    {item?.Title}
                  </Typography>
                  <Typography gutterBottom variant="body3" component="div">
                    {item?.Director}
                  </Typography>
                  <div className='movie-details'>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      <b>{item?.Rated}</b> Rated
                    </Typography>
                    <Typography> <ul/> </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {item?.Runtime}
                    </Typography>
                  </div>
                </CardContent>
                
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  } else {
    return (
      <div>
        No Movies!!!!!!!!!!!!!
      </div>
    );
  }
}
