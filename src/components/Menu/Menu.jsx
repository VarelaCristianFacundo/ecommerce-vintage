import React from 'react';
import './Menu.css';
import { Navbar, Container, Nav, NavDropdown, Button, FormControl, Form, InputGroup } from 'react-bootstrap';
import { BiSearchAlt } from 'react-icons/bi';
import CartWidget from '../CartWidget/CartWidget';
import LoginControl from '../LoginControl/LoginControl';
import { Link } from 'react-router-dom';
import '../LogoutButton/LogoutButton.css';


function Menu(props) {
    return (
        //   Utilizando as={Link} en componentes de react bootstrap obtiene el mismo comportamiento de Link
        <Navbar fixed={'top'} className={'position-sticky ps-0'} variant="dark" style={{backgroundColor: "#40434E"}} expand="lg">
            <Container fluid>
                <Navbar.Brand  to="/" as={Link}>
                    <img
                        src="/american.png"
                        alt="logo"
                        width={100}
                        height={100}                          
                        backgroundcolor='transparent'    
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="flex-grow-1 justify-content-center">  
                        <Nav.Link to="/" as={Link}>Inicio</Nav.Link>
                        <Nav.Link to='/aboutus' as={Link}>Acerca de Nosotros</Nav.Link>
                        <NavDropdown title="Categorias" id="basic-nav-dropdown">                            
                            <NavDropdown.Item to='/category/invierno' as={Link}>Invierno</NavDropdown.Item>
                            <NavDropdown.Item to='/category/verano' as={Link}>Verano</NavDropdown.Item>
                            <NavDropdown.Item to='/category/otonio' as={Link}>Otoño</NavDropdown.Item>                            
                            <NavDropdown.Item to='/category/primavera' as={Link}>Primavera</NavDropdown.Item>
                        </NavDropdown>
                        <Form className="d-flex ms-5 mb-2">
                            <InputGroup>
                                <FormControl 
                                    className="btn-search"
                                    placeholder="Buscar Producto"
                                    aria-label="Buscar Producto"
                                />                                
                                <Button id="button-addon2" className='btn-white-gray'>
                                    <BiSearchAlt />
                                </Button>
                            </InputGroup>
                        </Form>
                    </Nav>        
                    <LoginControl {...props} />   
                    <CartWidget />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menu;