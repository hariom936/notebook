import React, { useContext } from 'react';
import AddNote from './AddNote';
import noteContext from '../context/notes/noteContext';
import Notesitem from './Notesitem';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes } = context;
    return (
        <>

            <AddNote />

            <div className="row my-3">
                <h3>Your Notes</h3>
                {notes.map((note) => {
                    return <Notesitem key={note._id} note={note} />
                })}
            </div>

        </>
    )
}
export default Notes;