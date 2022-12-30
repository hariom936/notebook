
import NoteContext from "./noteContext";

const NoteState = (props) => {

    
    
    return(
        //value={{state, update}} => modern js
        <NoteContext.Provider value={{}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;