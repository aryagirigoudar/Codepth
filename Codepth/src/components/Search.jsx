import { collection, query, where, getDoc, getDocs,setDoc, updateDoc, serverTimestamp, doc } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { db } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { updateEmail } from 'firebase/auth'

export default function Search() {

  const [userName, setUserName] = useState("")
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)
  const {currentUser} = useContext(AuthContext);


  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUserName("")
  };

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
      );
    try{
      
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
        console.log(doc.data())
        })
    }
    catch{
      setErr(true)
    }
  

  }

  const handleKey = (e) => {
    console.log("e.code == Enter")
    e.code === 'Enter' && handleSearch()
  }


  return (
    <div className='search'>
      <div className='searchForm'>
        <input 
          type="text"
          placeholder='Search' 
          onKeyDown={handleKey}
          onChange={(e)=>{setUserName(e.target.value)}}
          value={userName}
          />
      </div>
      {
        err &&  <span>Something went worng</span>
      }
      {
        user && <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="userimage" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
            {/* <p>hello</p> */}
          </div>
        </div>
      }
    </div>
  )
}
