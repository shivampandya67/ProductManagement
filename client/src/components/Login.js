import React from 'react';
import { useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();
    const [validated, setValidated] = useState(false);

    const checkUser = async (e) => {

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        setValidated(true);
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/login', {
                email: email,
                password: password
            });
            // console.log(response);
            if (response.status === 200) {
                localStorage.setItem('token', response.data.accessToken);
                navigate('/showProducts');
            }
        }
        catch (err) {
            toast.error(err.response.data, {
                position: "top-center"
            });
        }

    };

    return (
        <div id="background-Color">
            <Container id="main-container" className='d-grid h-100'>
                <div className='app' style={{ alignItems: 'center', float: 'center', backgroundColor: '#808080' }}>
                    <Card className="text-center" style={{ backgroundColor: "white", width: '90%' }}>
                        <h1 style={{ textAlign: "center", color: "#808080" }}>Login</h1>
                        <Card.Body>
                            <Form validated={validated}>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label style={{ float: 'left' }} >Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter Email" required pattern=".+@gmail\.com" onChange={(e) => { setEmail(e.target.value); }} />
                                    <Form.Control.Feedback type="invalid">Please provide a valid gmail.</Form.Control.Feedback>

                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label style={{ float: 'left' }} >Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value); }} required />
                                    <Form.Control.Feedback type="invalid">Please provide a valid password.</Form.Control.Feedback>
                                </Form.Group>

                                <Button variant="primary" type="submit" onClick={checkUser}>
                                    Login
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </div>
    );
};

