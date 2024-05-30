import React from 'react';
import Layout from '../components/Layout';
import { Form, Input, Col, Row, TimePicker, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../redux/alertsSlice';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DoctorForm from '../components/DoctorForm';
import moment from 'moment';

function ApplyDoctor() {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    const navigate = useNavigate();

    const onFinish = async(values) => {
        try{
            dispatch(showLoading());
            const response =await axios.post("/api/user/apply-doctor-account",{...values, userId : user._id , timings : [
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
  return (
    <div>
        <Layout>
            <h1 className='page-title'>Apply to be a Doctor</h1>
            <hr />

            

            <DoctorForm onFinish={onFinish} />
        </Layout>
    </div>
  )
}

export default ApplyDoctor