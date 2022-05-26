import React from 'react';
import { useState } from 'react';
import { Button, Card, Form, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavbarMenu from './NavbarMenu';
import { Link } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Products() {

    let navigate = useNavigate();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [quantity, setQuantity] = useState();
    const [validated, setValidated] = useState(false);

    const addProduct = async (e) => {

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        setValidated(true);
        e.preventDefault();

        try {

            const config = {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            };

            const response = await axios.post('http://localhost:3001/product', {
                name: name,
                price: price,
                description: description,
                quantity: quantity
            }, config);
            if (response.status === 200) {
                toast.success('Product Added Successfully!', {
                    position: "top-center"
                });
            }
        }
        catch (err) {
            if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
                localStorage.clear();
                navigate('/login');
            }
            else {
                toast.error('Product failed to add!', {
                    position: "top-center"
                });
            }
        }
    };

    return (
        <div id="background-Color">
            <NavbarMenu />
            <Container id="main-container" className='d-grid h-100 '>
                <div className='app' style={{ alignItems: 'center', float: 'center', backgroundColor: '#808080' }}>
                    <Card className="text-center" style={{ backgroundColor: "white", width: '110%' }}>
                        <Container>
                            <Row className="justify-content-md-center">
                                <Col xs lg="6">
                                    <h1 style={{ textAlign: "center", color: "#808080" }}>Add Products</h1>
                                </Col>
                            </Row>
                            <Row>
                                <Col></Col>
                                <Col xs lg="2">
                                    <Button variant="success" type="submit" as={Link} to='/showProducts'>
                                        View Products
                                    </Button>
                                </Col>
                            </Row>
                        </Container>


                        <Card.Body>
                            <Form validated={validated}>
                                <Form.Group className="mb-3" controlId="formBasicProductName">
                                    <Form.Label style={{ float: 'left' }}>Name of the product</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Name" onChange={(e) => { setName(e.target.value); }} required />
                                    <Form.Control.Feedback type="invalid">Name is required.</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicProductPrice">
                                    <Form.Label style={{ float: 'left' }}>Price of the product</Form.Label>
                                    <Form.Control type="number" placeholder="Enter Price" onChange={(e) => { setPrice(e.target.value); }} required />
                                    <Form.Control.Feedback type="invalid">Price is required.</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicProductDescription">
                                    <Form.Label style={{ float: 'left' }}>Description of the product</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Description" onChange={(e) => { setDescription(e.target.value); }} required />
                                    <Form.Control.Feedback type="invalid">Description is required.</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicProductQuantity">
                                    <Form.Label style={{ float: 'left' }}>Quantity of the product</Form.Label>
                                    <Form.Control type="number" placeholder="Enter Quantity" onChange={(e) => { setQuantity(e.target.value); }} required />
                                    <Form.Control.Feedback type="invalid">Quantity is required.</Form.Control.Feedback>
                                </Form.Group>

                                <Button variant="primary" type="submit" onClick={addProduct}>
                                    Submit
                                </Button>

                            </Form>
                        </Card.Body>
                    </Card>

                </div >
            </Container>
        </div>
    );
}

