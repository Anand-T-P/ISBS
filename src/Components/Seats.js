import React, { useEffect, useState } from 'react';
import { Grid, Button, Typography, Box } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate, useParams } from 'react-router-dom';
import movieList from '../JSON/movies.json'
import "../Styles/seats.css"

//Redux


import { useDispatch, useStore } from 'react-redux';
import { getSelectedSeat, setSelectedMovie,getSelectedTime,getDeselectedSeat,getTotal } from '../actions';


// Seat Layout configuration
const seatsPerRow = 10; // Number of seats per row

// Define pricing tiers and rows
const pricingTiers = [
  { name: 'Platinum', price: 200, rows: ['A', 'B', 'C', 'D', 'E', 'F'] },
  { name: 'Gold', price: 150, rows: ['G', 'H', 'I', 'J', 'K', 'L'] },
  { name: 'Silver', price: 100, rows: ['M', 'N', 'O', 'P', 'Q', 'R'] },
];

const TimingsArr =['10:00AM','1:00PM','4:15PM','8:00PM','11:15PM']



//Summary Table
const BasicTable = ({selectedSeats,totalSeats})=> {
  const navigate = useNavigate()
  
    const totalPrice = totalSeats.reduce((sum, seat) => sum + seat.price, 0);

    const dispatch = useDispatch()

    useEffect(()=>{
      dispatch(getTotal(totalPrice))
    },[selectedSeats,totalPrice,dispatch])

     //Store
    const store =useStore()
    const stateData = store.getState()
     
     function handleBookingTicket(){
      alert("Your Tickets are Booked... Enjoy the Show!!!")
      navigate('/')
     }
     
    
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={3} align="center"><b>Summary</b></TableCell>
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow>
              <TableCell colSpan={3} align="center"><Typography variant='h6'>{stateData?.selectedMovie?.Title}</Typography>( {stateData?.selectedMovie?.Language }) / {stateData?.selectedMovie?.Runtime} / {stateData?.selectedMovie?.Rated}</TableCell>
            </TableRow>
            <TableRow>
            <TableCell align="center"><b>{stateData?.timing}</b></TableCell>
            <TableCell colSpan={2} align="center">{stateData?.screen}<b></b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                <TableCell colSpan={2} component="th" scope="row">
                  Selected Seats
                </TableCell>
                <TableCell align="right">{Array.from(selectedSeats).join(', ') || 'None'}</TableCell>
            </TableRow>

            {stateData?.selectedSeats?.platinum[0]?.seats.length>0&&<><TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                  Platinum Seats 
                </TableCell>
                <TableCell align='right'></TableCell>
                <TableCell align="right">{stateData.selectedSeats.platinum[0].seats.join(',') || 'None'}</TableCell>
            </TableRow>

            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                  Total Platinum Seats Price
                </TableCell>
                <TableCell align="right">{stateData?.selectedSeats?.platinum[0]?.seats.length+ " X "+ stateData?.selectedSeats?.platinum[0]?.price}</TableCell>
                <TableCell align="right"><b>₹{parseInt(stateData?.selectedSeats?.platinum[0]?.seats.length) * parseInt(stateData?.selectedSeats?.platinum[0]?.price)}</b></TableCell>
            </TableRow></>}

            {stateData?.selectedSeats?.gold[0]?.seats.length>0&& <><TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell colSpan={2} component="th" scope="row">
                  Gold Seats
                </TableCell>
                <TableCell align="right">{stateData.selectedSeats.gold[0].seats.join(',') || 'None'}</TableCell>
            </TableRow>

            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                  Total Gold Seats Price
                </TableCell>
                <TableCell align="right">{stateData?.selectedSeats?.gold[0]?.seats.length+ "  X  " + parseInt(stateData.selectedSeats.gold[0].price)}</TableCell>
                <TableCell align="right"><b>₹{parseInt(stateData?.selectedSeats?.gold[0]?.seats.length) * parseInt(stateData.selectedSeats.gold[0].price)}</b></TableCell>
            </TableRow></>}

            {stateData?.selectedSeats?.silver[0]?.seats?.length>0&&
            <><TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell colSpan={2} component="th" scope="row">
                  Silver Seats
                </TableCell>
                <TableCell align="right">{stateData?.selectedSeats?.silver[0]?.seats.join(',') || 'None'}</TableCell>
            </TableRow>

            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                  Total Silver Seats Price
                </TableCell>
                <TableCell align="right">{parseInt(stateData?.selectedSeats?.silver[0]?.seats?.length)+ "  X  " +parseInt(stateData?.selectedSeats?.silver[0]?.price)}</TableCell>
                <TableCell align="right"><b>₹{parseInt(stateData?.selectedSeats?.silver[0]?.seats?.length) * parseInt(stateData?.selectedSeats?.silver[0]?.price)}</b></TableCell>
            </TableRow></>}

            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                  Grand Total
                </TableCell>
                <TableCell colSpan={2} align="right"><b>₹{parseInt(totalPrice)}</b></TableCell>
            </TableRow>

            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align='center' colSpan={3}>
                  <Button variant='contained' onClick={handleBookingTicket}>Book Tickets</Button>
                </TableCell>
            </TableRow>
            
          </TableBody>
        </Table>
      </TableContainer>
    );
  }


// SeatRow Component
const SeatRow = ({ row, seatsPerRow, pricing, selectedSeats, toggleSeatSelection }) => {
  const isSeatSelected = (seatId) => selectedSeats.has(seatId);
  

  return (
    <>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        {pricing.name} Seats: ₹{pricing.price}
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {row.map((rowLetter) => (
          <Grid item xs={12} key={rowLetter}>
            <Grid container justifyContent="center" spacing={1}>
              {Array.from({ length: seatsPerRow }).map((_, seatIndex) => {
                const seatId = `${rowLetter}${seatIndex + 1}`;
                return (
                  <Grid item key={seatId} xs={4} sm={2} md={1}>
                    <Button
                      variant="outlined"
                      color={isSeatSelected(seatId) ? 'primary' : 'default'}
                      onClick={() => toggleSeatSelection(seatId,{seatId:seatId,price:pricing.price,category:pricing.name})}
                      sx={{
                        width: '100%',
                        height: 40,
                        fontSize: 12,
                        fontWeight: 'bold',
                        borderRadius: 2,
                        backgroundColor: isSeatSelected(seatId)
                          ? 'green'
                          : (pricing?.name === 'Platinum'?'brown':pricing.name.toLowerCase()),
                        color: 'white',
                        '&:hover': {
                          backgroundColor: isSeatSelected(seatId) ? 'darkgreen' : pricing.name.toLowerCase(),
                        },
                      }}
                    >
                      {seatId}
                    </Button>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

// Second Main Component
const MovieSeatsPage = ({movieDetails}) => {
      //Store
      const store =useStore()
      const stateData = store.getState() 

      
  const [selectedSeats, setSelectedSeats] = useState(new Set()); // Tracks selected seats
  const [selectedTiming, setSelectedTiming] = useState(TimingsArr[0]); // Tracks selected timing
  const [totalSeats,setTotalSeats] = useState([])// Tracks the details of all selected seats 
  const maxSeats = 8;
  

  const handleTimingSelection = (timing) => {
    setSelectedTiming(timing?.timing); // Call the setter function with the selected timing
    dispatch(getSelectedTime(timing)) // dispatch action for seting the time and screen
};

  const dispatch = useDispatch();
  
  
  // Handle seat selection
  const toggleSeatSelection = (seatId, selectedObj) => {
    const newSelectedSeats = new Set(selectedSeats);
  
    if (newSelectedSeats.has(seatId)) {
      // Deselect seat: Remove from Set and `totalSeats`
      newSelectedSeats.delete(seatId);
  
      // Create updated Redux payload
      const updatedPayload = { ...stateData.selectedSeats };
      updatedPayload[selectedObj.category.toLowerCase()][0].seats = updatedPayload[selectedObj.category.toLowerCase()][0].seats.filter((seat) => seat !== seatId);

      dispatch(getDeselectedSeat(updatedPayload));
      
      setTotalSeats((prev) => prev.filter((seat) => seat.seatId !== seatId));
    } 
    else if (newSelectedSeats.size < maxSeats) {
      // Select seat: Add to Set and `totalSeats`
      newSelectedSeats.add(seatId);
      setTotalSeats((prev) => [...prev, selectedObj]);
  
      // Dispatch the action to update selected seats in Redux
      dispatch(
        getSelectedSeat([
          ...totalSeats,
          selectedObj,
        ])
      );
    } 
    else {
      alert(`You can select a maximum of ${maxSeats} seats.`);
      return;
    }
  
    setSelectedSeats(newSelectedSeats);
  };

  return (
    <Box sx={{ padding: { xs: 2, sm: 4 }, textAlign: 'center',display:'flex',flexDirection:'row' }}>
        <Box>
            <Typography variant="h4" gutterBottom>
                {movieDetails?.Title}
            </Typography>

            {/* Render Timings as Selectable Buttons */}
            <Box sx={{ marginTop: 2, marginBottom: 4 }}>
                <Grid container spacing={2} justifyContent="center">
                {TimingsArr.map((timing, index) => (
                    <Grid item key={timing}>
                    <Button
                        variant={selectedTiming === timing ? 'contained' : 'outlined'}
                        color='success'
                        onClick={() => handleTimingSelection({timing:timing,screen:`Screen ${movieDetails?.id}`})}
                        sx={{
                        width: 120,
                        height: 45,
                        fontSize: 14,
                        fontWeight: 'bold',
                        borderRadius: 2,
                        }}
                    >
                        <div className='timings-cls'>
                            {timing}
                            <Typography variant='h10' >Screen {movieDetails?.id}</Typography>
                        </div>
                    </Button>
                    </Grid>
                ))}
                </Grid>
            </Box>

            {/* Dynamically render seat sections */}
            {pricingTiers.map((pricing, index) => (
                <SeatRow
                key={pricing.name}
                row={pricing.rows}
                seatsPerRow={seatsPerRow}
                pricing={pricing}
                selectedSeats={selectedSeats}
                toggleSeatSelection={toggleSeatSelection}
                />
            ))}

            {/* Theatre Screen for Silver tier */}
            <Box
                sx={{
                textAlign: 'center',
                marginTop: 4,
                marginBottom: 4,
                position: 'sticky',
                bottom: 0,
                backgroundColor: 'white',
                zIndex: 10,
                boxShadow: '0 4px 6px rgba(182, 23, 23, 0.1)',
                }}
            >
                <Typography variant="h8" sx={{ fontWeight: 'bold' }}>
                Screen this way
                </Typography>
                <Box
                sx={{
                    height: '20px',
                    width: '80%',
                    border: 'solid',
                    borderColor: '#555',
                    margin: '20px auto',
                    borderRadius: '8px',
                }}
                />
            </Box>

            
        </Box>
        <Box>
            {totalSeats?.length>0&&<BasicTable selectedSeats={selectedSeats} totalSeats={totalSeats}/>}
        </Box>
    </Box>
  );
};

//Main Component
export default function Seats() {
    const { id } = useParams(); // Access the ID from the URL
    let movieDetails = movieList?.movies[id-1]//selected Movie details

    const dispatch = useDispatch();
    
    useEffect(() => {
      if (movieDetails) {
        // Dispatch the action to set the selected movie in Redux store
        dispatch(setSelectedMovie(movieDetails));
        dispatch(getSelectedTime({timing:"10:00AM",screen:`Screen ${id}`}))
      }
    }, [movieDetails, dispatch,id]);

    

    if(movieDetails!==undefined){
        return (
            <div>
              <MovieSeatsPage movieDetails={movieDetails}/>
            </div>
          );
    }
    else{
        return (
            <div>
              Error
            </div>
          );
    }

}
