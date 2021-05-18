import React, { useContext } from 'react'
import Fab from '@material-ui/core/Fab';
import float from './float.png'
import "./floating.css";


const Floatingbtn = () => {
    return (
        <div>
            <a href="#"><img src={float} className="flow"></img></a>
        </div>
    )
}

export default Floatingbtn
