import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import {Button} from 'react-bootstrap';

function ListUsers() {
  const [userdata,setUserData] = useState([]);
  useEffect(()=>{
    getusers();
  },[])

  
  const getusers = () =>{
    axios.get(`${process.env.REACT_APP_SERVER_URL}get_details`).then((response) => {
      setUserData(response.data.data); 
    }
    )
  }

  const deleteUser = (val) => {
    if (window.confirm("Do you really want to delete the user?")) {
    axios.delete(`${process.env.REACT_APP_SERVER_URL}del_details?id=${val._id}`).then((response) => {
    });
    alert('User deleted successfully');
    setUserData("");
    getusers();
  }
  }
  return (
    <div className='d-flex flex-column min-vh-100 justify-content-center align-items-center'>
      <Table striped bordered hover className='w-75'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Birthdate</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      { userdata && userdata.map((val)=>{
          return(
          <tr key={val._id}>
            <td>{val.name}</td>
            <td>{new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC"}).format(new Date(val.date_of_birth))}</td>
            <td><Button variant="danger" type="submit" onClick={() => { deleteUser(val) }}>Delete</Button></td>
            </tr>
          )
        })
      }
        
      </tbody>
    </Table>
    </div>
  )
}

export default ListUsers