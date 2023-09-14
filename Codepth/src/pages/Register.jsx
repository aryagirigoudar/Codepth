
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from 'react'
import { auth, storage, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import dp from '../media/dp3.png'

export default function Register() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault()
    const name = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    const file = e.target[3].files[0]
    
    try {
      
      const res = await createUserWithEmailAndPassword(auth, email, password)
      console.log(res)

      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          setErr(true)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName: name,
              photoURL: downloadURL
            })
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName: name,
              email,
              photoURL: downloadURL
            });
            await setDoc(doc(db, "userChats", res.user.uid), {})
            navigate("/home");
          });
        }
      );
    }
    catch (err) {
      setErr(true)
      console.log(err)

    }

  }
  return (
    <div className='formContainer'>
      <div className="formWrapper">
        <span className='logo'>Register</span>
        
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Name' />
          <input type="email" placeholder='E-mail' />
          <input type="password" placeholder='Password' />

          <input type="file" id='file' style={{ display: 'none' }} />
          <label 
          htmlFor="file" 
          style={
            {
              display:"flex",
              alignItems:"center",
              gap:"10px",
              cursor:'pointer'
            }
          }>
          <img
            src={dp}
            alt="clip image" 
            height={'30px'}
          />
            Add Profile Photo
          </label>
          <button>Sign Up</button>
          {err && <span style={{ color: 'red' }}>Something Went worng</span>}
        </form>
        <p>If you have Account. <span><Link to={`/login`}>Login</Link></span></p>
      </div>
    </div>
  )
}
