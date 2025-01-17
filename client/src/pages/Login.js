import React from 'react'
import {Form,Input,Button} from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useSelector , useDispatch} from 'react-redux';
import { showLoading, hideLoading } from '../redux/alertsSlice';

function Login() {
  const dispatch = useDispatch();  
  const navigate = useNavigate();
    const onFinish=async(values)=>{
      try{
        dispatch(showLoading());
        const response =await axios.post("/api/user/login",values);
        dispatch(hideLoading());
        if(response.data.success)
        {
          toast.success(response.data.message);
          toast("Redirecting to Home page");
          localStorage.setItem("token", response.data.data);
          navigate("/");
        }else{
          toast.error(response.data.message);

        }

      }catch(error){
        dispatch(hideLoading());
        toast.error('something went wrong');

      }
    };
  return (
    <div className='authentication'>
        <div className='authentication-form card p-3'>
            <h1 className='card-title'>Welcome Back</h1>
            <Form layout='vertical' onFinish={onFinish}>
                   <Form.Item label='Email' name='email'>
                      <Input placeholder='Email'/>
                   </Form.Item>
                   <Form.Item label='Password' name='password'>
                      <Input placeholder='Password' type='password'/>
                   </Form.Item>
                   <Button className='primary-button my-1 full-width-button' htmlType='submit'>Login</Button>

                   <Link to="/register" className='anchor'>CLICK HERE TO REGISTER</Link>
            </Form>
        </div>

    </div>
  )
}

export default Login