import React, { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  where,
  query,
  deleteDoc,
  getDoc,
  doc,
} from "firebase/firestore";
import { db, updateNote } from "../firebase";

export function Home() {
  const inicializeDataInputs = {
    title: "",
    post: "",
    author: localStorage.getItem("email"),
  };

  const [dataInputs, setDataInputs] = useState(inicializeDataInputs);
  const [currentId, setCurrentId] = useState("");
  const [notes, setNotes] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataInputs({ ...dataInputs, [name]: value });
    console.log(name, value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addnote(dataInputs);
    setDataInputs({ ...inicializeDataInputs });
  };
  const getNoteById = async (id) => {
    const docRefId = doc(db, "notes", id);
    const docSnap = await getDoc(docRefId);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
    setDataInputs({ ...docSnap.data() });
  };

  const addnote = async (objectNote) => {
    console.log(currentId);
    if (currentId === "") {
      const docRef = await addDoc(collection(db, "notes"), objectNote);
      console.log("Document written with ID: ", docRef.id);
    } else {
      await updateNote(currentId, objectNote.title, objectNote.post).then(
        () => {
          getNotes();
        }
      );
    }
  };

  const getNotes = async () => {
    const q = query(
      collection(db, "notes"),
      where("author", "==", localStorage.getItem("email"))
    );
    onSnapshot(q, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setNotes(docs);
    });
  };
  getNotes();

  const onDeleteNote = (id) => {
    deleteDoc(doc(db, "notes", id));
  };

  useEffect(() => {
    const inicializeDataInputs = {
      title: "",
      post: "",
      author: localStorage.getItem("email"),
    };
    if (currentId === "") {
      setDataInputs({ ...inicializeDataInputs });
    } else {
      getNoteById(currentId);
    }
    getNotes();
  }, [currentId]);

  return (
    <section className="containerHome">
      <form className="containerNot" onSubmit={handleSubmit}>
        <label>
          <input
            className="imputLitle"
            type="text"
            name="title"
            placeholder="Titulo"
            onChange={handleInputChange}
            value={dataInputs.title}
          />
        </label>
        <label>
          <textarea
            className="imputPosts"
            type="text"
            name="post"
            placeholder="Escribe una nota"
            onChange={handleInputChange}
            value={dataInputs.post}
          ></textarea>
        </label>
        <br></br>
        <button className="btnPrimary">Guardar</button>
      </form>

      
        <div className="contentList">
          {notes.map((note) => (
            <div className="notesContent" key={note.id} id={note.id}>
              <div className="noteCard">
                <div className='btnEdit'>
                  <button className='contentBtnEdit'
                    data-noteid={note.id}
                    onClick={() => setCurrentId(note.id)}
                  >
                    {
                      <img
                        className="editNote"
                        src={require("../componentes/img/edit.png")}
                        alt="lovenotes"
                      />
                    }
                  </button>
                </div>
                <div className='btnClose' >
                  <button className="contentBtnClose"
                    onClick={() => onDeleteNote(note.id)
                    }
                  >
                   {
                      <img
                        className="closeNote"
                        src={require("../componentes/img/tachito.png")}
                        alt="lovenotes"
                      />
                    }
                  </button>
                </div>
                
                <label>
                <input
                  //disabled={editNoteSelected !== index}
                  className="editTitleLoad"
                  value={note.title}
                  onChange={handleInputChange}
                />
                </label>
                <label>
                <textarea
                  //disabled={editNoteSelected !== index}
                  className="editDescriptionLoad"
                  rows="5"
                  value={note.post}
                  onChange={handleInputChange}
                ></textarea>
                </label>
              </div>
            </div>
          ))}
        </div>
      </section>
    
  );
}
export default Home;

/*import React, {useState } from "react";
import {useAuth,} from "../context/authContext";
import {db} from '../firebase';


export function Home() {
  
  const {user, logout,loading} = useAuth();
  const handleLogout= async () =>{
    await logout();
  }
  if (loading) return <h1>loading</h1>


return(<section className ='containerHome'>
<div className='logoHome'>
<h1>Welcome {user.displayName}</h1>
</div>
<button onClick={handleLogout} >logout</button>
<hr/>
</section>

)


};
export default Home;*/
