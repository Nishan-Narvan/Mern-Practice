import { useState, useRef } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [anotes, setAnotes] = useState([]);
  const [trash, setTrash] = useState([]);

  function addnotes() {
    if (text.trim().length !== 0) {
      const newnoteobj = { text, origin: "notes" };
      setNotes([...notes, newnoteobj]);
      setText("");
    }
  }

  // from notes to trash
  function deleteNote(index) {
    const fdel = notes[index];
    setTrash([...trash, fdel]);
    setNotes(notes.filter((_, i) => i !== index));
  }

  // from archieve to trash
  function adeleteNote(index) {
    const farchinote = anotes[index];
    setTrash([...trash, farchinote]);
    setAnotes(anotes.filter((_, i) => i !== index));
  }

  // from notes to archieve
  function archieveNote(index) {
    const archinote = notes[index];
    const farchinote = { ...archinote, origin: "archive" };
    setAnotes([...anotes, farchinote]);
    setNotes(notes.filter((_, i) => i !== index));
  }

  // from archieve to notes
  function unarchieveNote(index) {
    const backtolist = anotes[index];
    setNotes([...notes, backtolist]);
    setAnotes(anotes.filter((_, i) => i !== index));
  }

  // trash to where it came from
  function backtowhere(index) {
    const tnote = trash[index];
    if (tnote.origin === "archive") {
      setAnotes([...anotes, tnote]);
    } else {
      setNotes([...notes, tnote]);
    }
    setTrash(trash.filter((_, i) => i !== index));
  }

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      padding: "20px",
      minHeight: "100vh" 
    }}>
      {/* Header */}
      <div style={{ textAlign: "center" }}>
        <h1 style={{ textAlign: "center", margin: "20px 0" }}>
          A simple To do App
        </h1>
      </div>
      
      {/* Input Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          margin: "20px 0"
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add notes here"
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button onClick={addnotes} style={{ padding: "10px 20px", borderRadius: "5px" }}>
          Add
        </button>
      </div>

      <div style={{ textAlign: "center", margin: "20px 0" }}>-------------------------</div>

      {/* Notes Section */}
      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        width: "100%" 
      }}>
        <h2 style={{ textAlign: "center" }}>Notes</h2>
        <ul style={{ 
          listStyle: "none", 
          padding: 0, 
          margin: 0, 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center" 
        }}>
          {notes.map((n, i) => (
            <li style={{
              display: "flex",
              padding: "20px", 
              flexDirection: "row", 
              backgroundColor: "black",
              color: "white",
              width: "500px", 
              borderRadius: "20px",
              alignItems: "center", 
              gap: "20px", 
              margin: "10px 0",
              justifyContent: "space-between"
            }} key={i}>
              <span>{n.text}</span>
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => deleteNote(i)}>Delete</button>
                <button onClick={() => archieveNote(i)}>Archive</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ textAlign: "center", margin: "20px 0" }}>------------</div>

      {/* Archived Notes Section */}
      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        width: "100%" 
      }}>
        <h2 style={{ textAlign: "center" }}>Archived Notes</h2>
        <ul style={{ 
          listStyle: "none", 
          padding: 0, 
          margin: 0, 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center" 
        }}>
          {anotes.map((n, i) => (
            <li style={{ 
              display: "flex",
              backgroundColor: "black",
              color: "white",
              borderRadius: "20px",
              padding: "20px",
              width: "500px",
              gap: "20px",
              margin: "10px 0",
              alignItems: "center",
              justifyContent: "space-between"
            }} key={i}>
              <span>{n.text}</span>
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => adeleteNote(i)}>Delete</button>
                <button onClick={() => unarchieveNote(i)}>Unarchive</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ textAlign: "center", margin: "20px 0" }}>------------</div>

      {/* Trash Section */}
      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        width: "100%" 
      }}>
        <h2 style={{ textAlign: "center" }}>Notes in Trash</h2>
        <ul style={{ 
          listStyle: "none", 
          padding: 0, 
          margin: 0, 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center" 
        }}>
          {trash.map((_, i) => (
            <li style={{ 
              display: "flex", 
              margin: "10px 0", 
              backgroundColor: "black",
              color: "white",
              borderRadius: "20px",
              padding: "20px",
              width: "500px",
              gap: "20px",
              alignItems: "center",
              justifyContent: "space-between"
            }} key={i}>
              <span>{_.text}</span>
              <button
                onClick={() => {
                  backtowhere(i);
                }}
              >
                Undo
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
