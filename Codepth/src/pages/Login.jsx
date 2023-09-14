import React, { useState } from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase';
 


export default function Login() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value
    
    console.log(e)

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home')
      
    }
    catch (err) {
      setErr(true)
      console.log(err)

    }
  }


  return (
    <div className='formContainer'>
        <div className="formWrapper">
            <span className='logo'>Login</span>
            <form onSubmit={
                  handleSubmit
                }>
                <input type="email" placeholder='E-mail' />
                <input type="password" placeholder='Password' />
                <button >Login</button>
              {err && <span style={{ color: 'red' }}>Something Went worng</span>}
            </form>
            <p>If you don't have Account. <Link to={`/register`}>Register</Link></p>
        </div>
    </div>
  )
}
 