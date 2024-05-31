import React, { useEffect, useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from './pages/Register';
import { Toaster } from "react-hot-toast";
import Home from './pages/Home';
import Login from './pages/Login';
import ApplyDoctor from './pages/ApplyDoctor';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import { useSelector } from 'react-redux';
import Notifications from './pages/Notifications';
import Doctorlist from './pages/Doctorlist';
import Userlist from './pages/Userlist';
import Profile from './pages/Doctor/Profile';
import BookAppointment from './pages/BookAppointment';
import Appointments from './pages/Appointments';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
function App() {
    const {loading} =useSelector(state => state.alerts);
    const [message , setMessage] = useState(""); 
    useEffect(() =>{
        fetch("http://localhost:5000").then(res => res.json()).then(data =>setMessage(data.message));
    },[]);
return (
<BrowserRouter>
{loading && (<div className='spinner-parent'>
<div class="spinner-border" role="status">
  
</div>
</div>)}
<Toaster position="top-center" reverseOrder={false} />
<Routes>    
<Route path='/login' element={<PublicRoute><Login /></PublicRoute>}/>
<Route path='/register' element={<PublicRoute><Register /></PublicRoute>}/>
<Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>}/>
<Route path='/apply-doctor' element={<ProtectedRoute><ApplyDoctor /></ProtectedRoute>}/>
<Route path='/notifications' element={<ProtectedRoute><Notifications /></ProtectedRoute>}/>
<Route path='/doctors' element={<ProtectedRoute><Doctorlist /></ProtectedRoute>}/>
<Route path='/users' element={<ProtectedRoute><Userlist /></ProtectedRoute>}/>
<Route path='/doctor/profile/:userId' element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
<Route path='/book-appointment/:doctorId' element={<ProtectedRoute><BookAppointment /></ProtectedRoute>}/>
<Route path='/appointments' element={<ProtectedRoute><Appointments /></ProtectedRoute>}/>
<Route path='/doctor/appointments' element={<ProtectedRoute><DoctorAppointments /></ProtectedRoute>}/>
</Routes>
</BrowserRouter>
);
}
export default App;