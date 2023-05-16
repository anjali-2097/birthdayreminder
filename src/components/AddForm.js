import { Form, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import ListUsers from './ListUsers';
import Swal from 'sweetalert2';

 function AddForm() {
  const [dateofbirth, setdateofbirth] = useState(new Date());
  const [name,setName] = useState('');
  const [image,setImage] = useState('')
  const[error,setError] = useState('')

const handleRegistration = async (e) => { 
  e.preventDefault();
   try {
   const offset = dateofbirth.getTimezoneOffset()
   let newdob = new Date(dateofbirth.getTime() - (offset*60*1000))
   let date_of_birth = newdob.toISOString().split('T')[0];
    await axios.post(`${process.env.REACT_APP_SERVER_URL}add_details`, {
      name,image,date_of_birth
    }, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    Swal.fire('Awesome!', "You're successfully registered!", 'success');
    setImage('');
    setError('');
    setdateofbirth('');
    setName('');
    window.location.reload(false);
  } catch (error) {
    if (error.response) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data
      });
      setError(error.response.data);
      setdateofbirth('');
      setName('');
      setImage('');
      
    }
  }
};
  return (
    <>
    <div className='d-flex flex-column min-vh-50 justify-content-center align-items-center'>
    <Card border="dark" className='w-45 p-3 '>
      <Card.Header className='text-center'>Add Birthday Info</Card.Header>
      <Card.Body>
        
        <Form onSubmit={handleRegistration} encType='multipart/form-data'>
      <Form.Group className="mb-3" controlId="user_name">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" required value={name} placeholder="Enter Name" name='user_name' onChange={(e)=>setName(e.target.value)}/> 
      </Form.Group>

      <Form.Group className="mb-3" controlId="dateofbirth">
        <Form.Label>Upload Image</Form.Label>
        <Form.Control type="file" accept=".png, .jpg, .jpeg" required placeholder="Upload Image" name='image' onChange={(e)=>setImage(e.target.files[0])}/>
        {image &&(
          <img
          alt="not found"
          width={"100px"}
          src={URL.createObjectURL(image)}
        />
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="dateofbirth">
        <Form.Label>Date of Birth</Form.Label>
        <DatePicker selected={dateofbirth} required onChange={(date) => setdateofbirth(date)} placeholder="Enter Date of Birth" className='form-control' name='dateofbirth'/>
      </Form.Group>
      {error&&(
        <div className='alert alert-danger'>
        {error}
        </div>
      )}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
      </Card.Body>
    </Card>
    </div>
    
    <ListUsers/>
  </>
   
  );
}

export default AddForm