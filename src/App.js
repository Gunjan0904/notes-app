import { v4 as uuidv4 } from "uuid";
import React, { useState, useEffect } from "react";
import './App.css';

function App() {

    const [notes, setNotes] = useState([]);
    const [text, setText] = useState("");

    // Load notes from local storage on mount
    useEffect(() => {
      const savedNotes = JSON.parse(localStorage.getItem("notes"));
      if (savedNotes) {
        setNotes(savedNotes);
      }
    }, []);

    // Save notes to local storage whenever notes change
    useEffect(() => {
      localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    // Add a new note
    const addNote = () => {
      if (text.trim() === "") return;
      setNotes([...notes, { id: uuidv4(), text }]);
      setText("");
    };

    // Delete a note
    const deleteNote = (id) => {
      setNotes(notes.filter((note) => note.id !== id));
    };

    return (
      <div className="container">
        <h1>Notes App</h1>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a note..."
        ></textarea>
        <button onClick={addNote}>Add Note</button>
        <div className="notes-container">
          {notes.map((note) => (
            <div key={note.id} className="note">
              <p>{note.text}</p>
              <button onClick={() => deleteNote(note.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  export default App;
