import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const notesInitial = [
    {
      "_id": "63ab05edecb69c08c9db4423",
      "user": "63a9ad9c24122ae3cc8afd36",
      "title": "Aman",
      "description": "amanv is good boy",
      "tag": "famliy",
      "date": "2022-12-27T14:49:17.269Z",
      "__v": 0
    },
    {
      "_id": "63ac6b410fe1f2a24d0ed8fa",
      "user": "63a9ad9c24122ae3cc8afd36",
      "title": "React with Nodes Js",
      "description": "Web Programming Language",
      "tag": "Coding ",
      "date": "2022-12-28T16:13:53.086Z",
      "__v": 0
    },
    {
      "_id": "63ab052edecb69c08c9db4423",
      "user": "63a9ad9c24122ae3cc8afd36",
      "title": "Aman",
      "description": "amanv is good boy",
      "tag": "famliy",
      "date": "2022-12-27T14:49:17.269Z",
      "__v": 0
    },
    {
      "_id": "63ac6b3410fe1f2a24d0ed8fa",
      "user": "63a9ad9c24122ae3cc8afd36",
      "title": "React with Nodes Js",
      "description": "Web Programming Language",
      "tag": "Coding ",
      "date": "2022-12-28T16:13:53.086Z",
      "__v": 0
    },
    {
      "_id": "631ab052edecb69c08c9db4423",
      "user": "63a9ad9c24122ae3cc8afd36",
      "title": "Aman",
      "description": "amanv is good boy",
      "tag": "famliy",
      "date": "2022-12-27T14:49:17.269Z",
      "__v": 0
    },
    {
      "_id": "63a1c6b410fe1f2a24d0ed8fa",
      "user": "63a9ad9c24122ae3cc8afd36",
      "title": "React with Nodes Js",
      "description": "Web Programming Language",
      "tag": "Coding ",
      "date": "2022-12-28T16:13:53.086Z",
    }
  ]
  // console.log("hdjfwdfwdhwhfoewfliwhe",notesInitial)
  const [notes, setNotes] = useState(notesInitial)

  //Add a Note
  const addNote = (title, description, tag) => {
    console.log("Adding a New Notes")
    //TODO: API Call
    const note = {
      "_id": "63ab051edecb69c08c9db4423",
      "user": "63a9ad9c24122ae3cc8afd36",
      "title": "Amanss",
      "description": "amanv is good boy smartyyyy",
      "tag": "famliy",
      "date": "2022-12-27T14:49:17.269Z",
      "__v": 0
    };
  
    setNotes(notes.concat(note))
  }


  //Delete a Note
  const deleteNote = (id) => {
      //TODO: API Call
    console.log("deleting the note with id" +id);
    const newNotes = notes.filter((note)=>{return note._id !== id});
    setNotes(newNotes)
  }

  //Edit a Note
  const editNote = () => {

  }


  return (
    //value={{state, update}} => modern js
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;