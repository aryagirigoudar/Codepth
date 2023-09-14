import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from '../src/pages/Home'
import Chat from "./components/Chat";
import { AuthContextProvider } from './context/AuthContext.jsx'
import { auth } from './firebase.js';
import { ChatContextProvider } from "./context/ChatContext";




// 6+8+3+9+5+6+8+10+5+7+9+9+14+9+10+7 = 125
const ProtectedRoute = () => {
  
  if(!auth.currentUser){
    const navigate = useNavigate();
    alert("Please Login/Register")
    navigate('/login')
    return <Login />;
  }
  return <Home />
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/home",
    element: <ProtectedRoute> <Home /> </ProtectedRoute>,
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/Chat",
    element: <Chat />,
  },
]);



ReactDOM.createRoot(document.getElementById("root")).render(
  
  <React.StrictMode>
    <AuthContextProvider>
    <ChatContextProvider>
    <RouterProvider router={router} />
    </ChatContextProvider>
    </AuthContextProvider>
    
  </React.StrictMode>
);

