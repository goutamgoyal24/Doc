import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import { Form, Input, Col, Row, TimePicker, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/alertsSlice';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import DoctorForm from '../../components/DoctorForm';
import { useState } from 'react';
import moment from "moment";

function Profile() {
  const { user } = useSelector(state => state.user);
  const params = useParams()
  const [doctor, setDoctor] = useState(null)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async(values) => {
    try{
        dispatch(showLoading());
        const response =await axios.post("/api/doctor/update-doctor-profile",{...values, userId : user._id , timings : [
          moment(values.timings[0]).format("HH:mm"),
          moment(values.timings[1]).format("HH:mm"),
        ],},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        dispatch(hideLoading());
        if(response.data.success)
        {
          toast.success(response.data.message);
          navigate("/");
        }else{
          toast.error(response.data.message);

        }

      }catch(error){
        dispatch(hideLoading());
        toast.error('something went wrong');

      }
}

const getDoctorData=async()=>{
  try{
    dispatch(showLoading())
    const response = await axios.post('/api/doctor/get-doctor-info-by-user-id',{
      userId: params.userId,
    },{
      headers: {
        Authorization : `Bearer ${localStorage.getItem('token')}`,
      }
    });
    dispatch(hideLoading());
    if (response.data.success){
      setDoctor(response.data.data);

    }
  }catch(error)
  {
    localStorage.clear()
  }

}

useEffect(() => {
    getDoctorData()

}, [])
 return (
    <Layout>
        <h1 className='page-title'>Doctor Profile</h1>
        <hr />
        {doctor && <DoctorForm onFinish={onFinish} initivalValues={doctor}/>}
    </Layout>
  )
}

export default Profile