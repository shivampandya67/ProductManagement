import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'

export default function NavbarMenu() {

    let navigate = useNavigate();

    const Logout = (e) => {
        e.preventDefault();
        localStorage.clear();
        navigate('/register');
    };

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>Product Management</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/products">Add Product</Nav.Link>
                    <Nav.Link href="/showProducts" >Display Products</Nav.Link>
                    <Nav.Link href="/logout" onClick={Logout}>Logout</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}
