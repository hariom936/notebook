import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const s1 = {
        "name": "Hariom",
        "class": "5b"
    }
    //update function using UseState
    const [state, setState] =  useState(s1);
    const update =() =>{
        setTimeout(() => {
            setState({
                "name": "Verma",
                "class": "5A"
            })
        },1000);
    }
    return(
        //value={{state, update}} => modern js
        <NoteContext.Provider value={{state:state, update:update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;