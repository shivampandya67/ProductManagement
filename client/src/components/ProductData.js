import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Container, Row, Col, Table } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import NavbarMenu from './NavbarMenu';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from "react-spinners/ClipLoader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove, faEdit } from '@fortawesome/free-solid-svg-icons';

import Typography from '@mui/material/Typography';
import Popper from '@mui/material/Popper';
import PopupState, { bindToggle } from 'material-ui-popup-state';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';

export default function ProductData() {
    let count = 0;
    let navigate = useNavigate();
    let viewProductCredentials;
    let [displayProducts, setDisplayProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState();


    useEffect(() => {

        const fetchData = async () => {
            try {
                const config = {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                };
                setIsLoading(true);
                const response = await axios.get('http://localhost:3001/product', config);
                setIsLoading(false);
                viewProductCredentials = response?.data.rows;
                if (response.status === 200) {
                    setDisplayProducts(viewProductCredentials);
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
            }
        };
        fetchData();
    }, []);

    const handleClick = (newPlacement) =>
        (event) => {
            setAnchorEl(event.currentTarget);
            setOpen((prev) => placement !== newPlacement || !prev);
            setPlacement(newPlacement);
        };

    const DeleteProduct = async (e, id) => {
        e.preventDefault();

        try {
            const config = {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            };

            const response = await axios.delete(`http://localhost:3001/product/${id}`, config);
            if (response.status === 200) {
                toast.success('Product Deleted Successfully!', {
                    position: "top-center"
                });
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
        }
    };

    const edit = async (e, product) => {
        e.preventDefault();
        navigate('/editProduct', { state: product });
    };

    return (
        <div id="background-Color">
            <NavbarMenu />
            <Container id="main-container" className='d-grid h-100'>
                <div className='app' style={{ alignItems: 'center', float: 'center', backgroundColor: '#808080' }}>
                    <Card className="text-center" style={{ backgroundColor: "white", width: '110%', alignItems: 'center' }}>

                        <Container>
                            <Row className="justify-content-md-center">
                                <Col xs lg="6">
                                    <h1 style={{ color: "black" }}>Products</h1>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs lg="8">
                                    <Form>
                                        <Form.Group className="mb-1" controlId="formBasicSearch">
                                            <Form.Control type="text" placeholder="Search by product name..." onChange={(e) => { setSearch(e.target.value); }} />
                                        </Form.Group>
                                    </Form>
                                </Col>
                                <Col xs lg="1"></Col>
                                <Col xs lg="3" style={{ float: 'right' }}>
                                    <Button variant="success" type="submit" as={Link} to='/products'>
                                        Add Products
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                        <br />
                        {isLoading ? <ClipLoader size={50} color={'#F37A24'} loading={isLoading} /> :
                            displayProducts.length !== 0 ?
                                <Table striped bordered hover style={{ width: '80%' }}>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Description</th>
                                            <th>Quantity</th>
                                            <th>Edit/Delete</th>
                                        </tr>
                                    </thead>

                                    {displayProducts?.filter((val) => {
                                        if (search === '') {
                                            return val;
                                        }
                                        else if (val.name.toLowerCase().includes(search.toLowerCase())) {
                                            return val;
                                        }

                                    }).map((product, index) => {
                                        return (
                                            <tbody key={index} id={product.id}>
                                                <tr>
                                                    <td>{++count}</td>
                                                    <td>{product.name}</td>
                                                    <td>{product.price}</td>
                                                    <td>{product.description}</td>
                                                    <td>{product.quantity}</td>
                                                    <td>
                                                        <Button variant="success" type="submit" style={{ float: 'right', marginLeft: '.5rem' }} onClick={(e) => edit(e, product)}>
                                                            <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                                                        </Button>

                                                        <PopupState variant="popper" popupId="demo-popup-popper">
                                                            {(popupState) => (
                                                                <div>
                                                                    <Button variant="danger" {...bindToggle(popupState)} type="submit" style={{ float: 'right', marginLeft: '.5rem' }} onClick={handleClick('top')}>
                                                                        <FontAwesomeIcon icon={faRemove}></FontAwesomeIcon>
                                                                    </Button>

                                                                    <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                                                                        {({ TransitionProps }) => (
                                                                            <Fade {...TransitionProps} timeout={350}>
                                                                                <Paper>
                                                                                    <Typography sx={{ pb: 6, pr: 2, textAlign: 'center', ml: 1, mb: 1 }}>Are you sure? <br />
                                                                                        <Button variant="success" {...bindToggle(popupState)} type="submit" style={{ float: 'right', marginLeft: '.5rem' }} as={Link} to='/products'>
                                                                                            no
                                                                                        </Button>
                                                                                        <Button variant="danger" {...bindToggle(popupState)} type="submit" style={{ float: 'right', marginLeft: '.5rem' }} onClick={(e) => DeleteProduct(e, product.id)}>
                                                                                            yes
                                                                                        </Button>
                                                                                    </Typography>
                                                                                </Paper>
                                                                            </Fade>
                                                                        )}
                                                                    </Popper>
                                                                </div>
                                                            )}
                                                        </PopupState>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        );
                                    })}
                                </Table> : <h2>No Data Added</h2>
                        }

                    </Card>

                </div>
            </Container>
        </div>
    );
}

