import { GET_DESELECTED_SEAT } from "./actions";
import { GET_TOTAL } from "./actions";
import { GET_SELECTED_SEAT,SET_SELECTED_MOVIE,GET_SELECTED_TIME } from "./actions";



const initialStore = {
  timing:"",
  screen:"",
  selectedMovie: {},
  selectedSeats: [],
  total: 0
 }
//reducer- used to update store

function reducer(state=initialStore,action){
  switch (action.type) {
    case SET_SELECTED_MOVIE:
      //logic to handle selecting the movie
      return {
        ...state,
        selectedMovie: action.payload,
      };

    case GET_SELECTED_SEAT:
      return {
        ...state,
        selectedSeats: action.payload
      }
    

    case GET_SELECTED_TIME:
    return{
      ...state,
      timing: action.payload.timing,
      screen: action.payload.screen
    }
  
  case GET_DESELECTED_SEAT:
  return{
    ...state,
    selectedSeats: action.payload
  }

  case GET_TOTAL:

    return{
      ...state,
      total:action.payload
    }
        
  
    default:
      break;
  }


}

export default reducer