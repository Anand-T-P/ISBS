export const SET_SELECTED_MOVIE = 'SET_SELECTED_MOVIE';
export const GET_SELECTED_SEAT = 'GET_SELECTED_SEAT';
export const GET_SELECTED_TIME = 'GET_SELECTED_TIME';
export const GET_DESELECTED_SEAT = 'GET_DESELECTED_SEAT'
export const GET_TOTAL = "GET_TOTAL"

export const setSelectedMovie = (movieDetails) => ({
    type: SET_SELECTED_MOVIE,
    payload: movieDetails,
  });

export const getSelectedSeat = (selectedObj)=>{
    const platinumSeatArr = selectedObj.filter((item)=>item.category === 'Platinum')
    const goldSeatArr = selectedObj.filter((item)=>item.category === 'Gold')
    const silverSeatArr = selectedObj.filter((item)=>item.category === 'Silver')

    const payload ={
        platinum: [{seats:platinumSeatArr.map((seat)=>seat.seatId),price:platinumSeatArr.length>0&&platinumSeatArr[0].price}],
        gold: [{seats:goldSeatArr.map((seat)=>seat.seatId),price:goldSeatArr.length>0&&goldSeatArr[0].price}],
        silver: [{seats:silverSeatArr.map((seat)=>seat.seatId),price:silverSeatArr.length>0&&silverSeatArr[0].price}]
    }
    return{
        type: GET_SELECTED_SEAT,
        payload: payload
    };
};

export const getSelectedTime = (timing)=>{
    return{
        type: GET_SELECTED_TIME,
        payload: timing
    };
};

export const getDeselectedSeat = (stateData)=>{
    return{
        type: GET_DESELECTED_SEAT,
        payload: stateData
    }
}

export const getTotal = (totalPrice)=>{
    return{
        type: GET_TOTAL,
        payload: parseInt(totalPrice)
    }
}