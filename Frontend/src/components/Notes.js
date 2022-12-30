import React, {useContext} from 'react';
import noteContext from '../context/notes/noteContext';
import Notesitem from './Notesitem';

const Notes = () => {
    const context = useContext( noteContext);
    const {notes} = context;
    return (
        <div className="row my-3">
            <h3>Your Notes</h3>
            {notes.map((note) => {
                return <Notesitem note={note} />
            })}
        </div>
    )
}
export  default Notes;