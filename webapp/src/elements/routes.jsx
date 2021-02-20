import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import HomePage from './pages/Home/HomePage'
import FreeSpacePage from './pages/FreeSpace/FreeSpace'
import Nav from './components/NavComponent/NavBar'
import { useState } from 'react';

export default function Routes() {

    var [filter, setFilter] = useState('');

    function setFilterMovies(value) {
        setFilter(value)
    }


    const routesObj = {
        routes: [
            { path: '/', title: "Home", component: <HomePage /> },
            { path: '/freeSpace', title: "FreeSpace", component: <FreeSpacePage /> },
            { path: '/about', title: "About", component: <About /> }
        ],
        navTitle: "Movex Web App",
        filterFunction: setFilterMovies
    };

console.log(filter);
    return (
        <Router>
            <div>
                <Nav {...routesObj} />
                <Switch>
                    <Route path="/home">
                        <HomePage filter={filter} />
                    </Route>
                    <Route path="/freeSpace">
                        <FreeSpacePage />
                    </Route>
                    <Route path="/about">
                        <About />
                    </Route>
                    {/* {routesObj.
                        routes.
                        map((i, e) => {
                            return (
                                <Route key={i} path={e.path}>
                                    { e.component }
                                </Route>);
                        })} */}
                    <Redirect from="*" to="/home"></Redirect>
                </Switch>
            </div>
        </Router>
    );
}

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}