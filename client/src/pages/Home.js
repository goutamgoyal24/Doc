import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../components/Layout';
import Doctor from '../components/Doctor';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import { Row, Col } from 'antd';
function Home() {
  const [doctors, setDoctors] =useState([]);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get('/api/user/get-all-approved-doctors',
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        });
        dispatch(hideLoading());
      if(response.data.success)
      {
        setDoctors(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());

    }
  };
  useEffect(() => {
    getData()
  }, []);
  return(
    <Layout>
      <Row gutter={20}>
        {doctors.map((doctor) => (
          <Col>
            <Doctor doctor={doctor} />
          </Col>
        ))}
      </Row>
    </Layout> 

  );
}

export default Home