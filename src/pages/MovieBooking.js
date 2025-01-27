import React from 'react'
import Seats from '../Components/Seats'

import {createStore} from 'redux'
import { Provider } from "react-redux";
import reducer from "../reducer";

   
const store = createStore(reducer)

export default function MovieBooking() {
  return (
    <Provider store={store}>
        <div>
            <Seats/>
        </div>
    </Provider>
  )
}
