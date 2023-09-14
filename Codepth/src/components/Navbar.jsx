import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';



export default function Navbar() {
  const navigator = useNavigate();
  const {currentUser} = useContext(AuthContext)  
  return (
   <div className="navbar">
    <span style={{color:"#F8F0E5"}} className='logo'>Arya Messaging</span>
    <div className="user">
      <img src={currentUser.photoURL} alt="DP" />
      <span style={{color:"#F8F0E5"}}>{currentUser.displayName}</span>
      <button onClick={()=>{
        signOut(auth);
        console.log("Logged out")
        navigator('/login')
        }}>Log out</button>
    </div>
   </div>
  )
}
