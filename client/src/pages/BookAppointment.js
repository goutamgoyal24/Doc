import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import TimeInput from 'material-ui-time-picker'
import { Form, Input, Col, Row,Button ,DatePicker} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../redux/alertsSlice';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import DoctorForm from '../components/DoctorForm';
import { useState } from 'react';
import moment from "moment";

function BookAppointment() {
    const [isAvailable , setIsAvailable] = useState(false);
    const [date , setDate] =useState();
    const [time, setTime] = useState();
    const { user } = useSelector((state) => state.user);
    const [doctor,setDoctor] = useState(null);
    const params = useParams()
    const dispatch=useDispatch()

    const getDoctorData=async()=>{
        try{
          dispatch(showLoading())
          const response = await axios.post('/api/doctor/get-doctor-info-by-id',{
            doctorId: params.doctorId,
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
      
      };
      const checkAvailability=async()=>{
        try{
            dispatch(showLoading())
            const response = await axios.post('/api/user/check-booking-availability',{
              doctorId: params.doctorId,
              date:date,
              time:time,
            },{
              headers: {
                Authorization : `Bearer ${localStorage.getItem('token')}`,
              }
            });
            dispatch(hideLoading());
            if (response.data.success){
              toast.success(response.data.message);
              setIsAvailable(true);
            }
            else{
              toast.error(response.data.message);
            }
          }catch(error)
          {
            toast.error('error booking appointment');
            dispatch(hideLoading());
            localStorage.clear()
          }

      };


      const booknow=async()=>{
        setIsAvailable(false);
        try{
            dispatch(showLoading())
            const response = await axios.post('/api/user/book-appointment',{
              doctorId: params.doctorId,
              userId: user._id,
              doctorInfo : doctor,
              userInfo : user,
              date:date,
              time:time,
            },{
              headers: {
                Authorization : `Bearer ${localStorage.getItem('token')}`,
              }
            });
            dispatch(hideLoading());
            if (response.data.success){
              toast.success(response.data.message);
        
            }
          }catch(error)
          {
            toast.error('error booking appointment');
            dispatch(hideLoading());
            localStorage.clear()
          }

      };


      
      useEffect(() => {
          getDoctorData()
      
      }, [])

  return (
    <Layout>
        {doctor && (
            <div>
                <h1 className='page-title'>{doctor.firstName} {doctor.lastName}</h1>
                <hr />
                <Row>
                    <Col span={8} sm={24} xs={24} lg={8}>
                    <h1 className='normal-text'><b>Timings:</b>{doctor.timings[0]} - {doctor.timings[1]}</h1>
                <div className='d-flex flex-column pt-2'>
                    <DatePicker format='DD-MM-YYYY' onChange={(value)=>{setIsAvailable(false); setDate(moment(value).format('DD-MM-YYYY'))}}/>
                    <TimeInput format='HH:mm' className='mt-3' onChange={(value)=>{ setIsAvailable(false) ;setTime(moment(value).format('HH:mm'));}}/>
                    <Button className='primary-button mt-3 full-width-button' onClick={checkAvailability  }>Check Availability</Button>
                    {isAvailable && (<Button className='primary-button mt-3 full-width-button'onClick={booknow}>Book Now</Button>)}
                </div>
                    </Col>
                </Row>
            </div>
        )}
    </Layout>
  );
}

export default BookAppointment; 