import logo from './logo.svg';
import React from 'react';
import 'materialize-css'
import {useRoutes} from "./routes";
import {BrowserRouter as Router} from 'react-router-dom'
import {useAuth} from "./hooks/auth.hook";
import {Footer} from "./components/footer";
import './static/main.css'
import {Header} from "./components/header";
import {ProgressLoader} from "./components/ProgressLoader";
import {useSelector} from "react-redux";
import {AdminNavBar} from "./admin/components/AdminNavBar";


function App() {

    const {ready} = useAuth()
    const isAuthenticated = useSelector(({isAuthenticated}) => isAuthenticated)

    const routes = useRoutes(isAuthenticated)

    if (!ready) {
        return <></>
    }

    return (
            <Router>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                <ProgressLoader />
                <main className="main-container">
                    <Header />
                    {isAuthenticated ? <AdminNavBar /> : ''}
                        <div className="container">
                            {routes}
                        </div>
                    <Footer/>
                </main>
            </Router>
    )
}


export default App;
