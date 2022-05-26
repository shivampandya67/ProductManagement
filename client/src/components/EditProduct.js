import React from 'react';
import { useState } from 'react';
import { Button, Card, Form, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import NavbarMenu from './NavbarMenu';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function EditProduct() {

    let location = useLocation();
    let navigate = useNavigate();

    const [name, setName] = useState(`${location.state.name}`);
    const [price, setPrice] = useState(`${location.state.price}`);
    const [description, setDescription] = useState(`${location.state.description}`);
    const [quantity, setQuantity] = useState(`${location.state.quantity}`);

    const HandleEdit = async (e) => {
        e.preventDefault();

        try {
            const config = {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            };

            let id = location.state.id;

            const response = await axios.put(`http://localhost:3001/product/${id}`, {
                name: name,
                price: price,
                description: description,
                quantity: quantity
            }, config);
            if (response.status === 200) {
                toast.success('Product Edited Successfully!', {
                    position: "top-center"
                });
            }
            const getRemainingData = await axios.get('http://localhost:3001/product', config);
            let viewProductCredentials = getRemainingData?.data.rows;
            if (getRemainingData.status === 200) {
                navigate('/showProducts', { state: viewProductCredentials });
            }
        }
        catch (err) {
            if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
                toast.error('Session Expired!', {
                    position: "top-center"
                });
                localStorage.clear();
                navigate('/login');
            }
            else {
                toast.error('Failed Editing Product!', {
                    position: "top-center"
                });
            }
        }
    };

    const HandleCancelEdit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            };
            const getRemainingData = await axios.get('http://localhost:3001/product', config);
            let viewProductCredentials = getRemainingData?.data.rows;
            if (getRemainingData.status === 200) {
                navigate('/showProducts', { state: viewProductCredentials });
            }
        }
        catch (error) {
            if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
                toast.error('Session Expired!', {
                    position: "top-center"
                });
                localStorage.clear();
                navigate('/login');
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
                                    <h1 style={{ textAlign: "center", color: "#808080" }}>Edit Products</h1>
                                </Col>
                            </Row>
                        </Container>


                        <Card.Body>
                            <Form >
                                <Form.Group className="mb-3" controlId="formBasicProductName">
                                    <Form.Label style={{ float: 'left' }}>Name of the product</Form.Label>
                                    <Form.Control type="text" placeholder="name" value={name} onChange={(e) => { setName(e.target.value); }} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicProductPrice">
                                    <Form.Label style={{ float: 'left' }}>Price of the product</Form.Label>
                                    <Form.Control type="number" placeholder="Enter Price" value={price} onChange={(e) => { setPrice(e.target.value); }} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicProductDescription">
                                    <Form.Label style={{ float: 'left' }}>Description of the product</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Description" value={description} onChange={(e) => { setDescription(e.target.value); }} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicProductQuantity">
                                    <Form.Label style={{ float: 'left' }}>Quantity of the product</Form.Label>
                                    <Form.Control type="number" placeholder="Enter Quantity" value={quantity} onChange={(e) => { setQuantity(e.target.value); }} />
                                </Form.Group>

                                <Button variant="success" type="submit" onClick={HandleEdit}>
                                    Edit Product
                                </Button>
                                &nbsp;
                                <Button variant="danger" type="submit" onClick={HandleCancelEdit}>
                                    Cancel
                                </Button>

                            </Form>
                        </Card.Body>
                    </Card>

                </div >
            </Container>
        </div>
    );
}