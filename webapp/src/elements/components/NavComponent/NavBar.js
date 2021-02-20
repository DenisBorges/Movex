import React from 'react'
import ReactDOM from 'react-dom'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useRef } from 'react';


export default (props) => {

    function getSearchInputvalue() {
        let e = document.getElementById("searchInput")

        if (!!e) {
            props.filterFunction(e.value);
        }

    }


    return (<Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">{props.navTitle}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                {props.routes.map((e, i) => {
                    return <Link key={i} to={e.path} className="nav-link">{e.title}</Link>
                })}
            </Nav>
            <Form inline>
                <FormControl id="searchInput" type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success" onClick={() => getSearchInputvalue()}>Search</Button>
            </Form>
        </Navbar.Collapse>
    </Navbar>);
}