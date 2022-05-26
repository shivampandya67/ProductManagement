import React from 'react';
import { useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Register() {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [validated, setValidated] = useState(false);

    const addUser = async (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        if (password !== confirmPassword) {
            toast.error("Confirm password should be same as password", {
                position: "top-center"
            });
            e.preventDefault();
            e.stopPropagation();
        }

        setValidated(true);
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/register', {
                username: username,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            });

            if (response.status === 200) {
                toast.success("Registration Successful!!", {
                    position: "top-center"
                });

            }
        }
        catch (error) {
            toast.error("Registration Failed!!", {
                position: "top-center"
            });
        }
    };
    return (
        <div id="background-Color">
            <Container id="main-container" className='d-grid h-100 '>
                <div className='app' style={{ alignItems: 'center', float: 'center', backgroundColor: '#808080' }}>
                    <Card className="text-center" style={{ backgroundColor: "white", width: '110%' }}>
                        <h1 style={{ color: "#808080" }}>Sign Up</h1>
                        <Card.Body>
                            <Form validated={validated}>
                                <Form.Group className="mb-3" controlId="formBasicUsername">
                                    <Form.Label style={{ float: 'left' }}>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Username" value={username} onChange={(e) => { setUsername(e.target.value); }} required />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">Please provide a valid Username.</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label style={{ float: 'left' }}>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter Email" value={email} required pattern=".+@gmail\.com" onChange={(e) => { setEmail(e.target.value); }} />
                                    <Form.Control.Feedback type="invalid">Please provide a valid gmail.</Form.Control.Feedback>
                                    <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label style={{ float: 'left' }}>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value); }} required />
                                    <Form.Control.Feedback type="invalid">Please provide a password.</Form.Control.Feedback>
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                                    <Form.Label style={{ float: 'left' }}>Confirm Password</Form.Label>
                                    <Form.Control type="Password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); }} required />

                                    {password !== confirmPassword ? <Form.Control.Feedback type="invalid">Confirm password should be same as password!</Form.Control.Feedback> :
                                        <Form.Control.Feedback >Bingo</Form.Control.Feedback>}
                                </Form.Group>

                                <Button variant="success" type="submit" onClick={addUser}>
                                    Submit
                                </Button>
                                <br />
                                <br />
                                <Button variant="primary" type="submit" onClick={() => { navigate('/Login'); }}>
                                    Already have an account?
                                </Button>

                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Container >
        </div >
    );
}
