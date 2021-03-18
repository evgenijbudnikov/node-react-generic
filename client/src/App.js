import logo from './logo.svg';
import React from 'react';
import 'materialize-css'
import {useRoutes} from "./routes";
import {BrowserRouter as Router} from 'react-router-dom'
import {useAuth} from "./hooks/auth.hook";
import {LoaderContext} from "./context/LoaderContext"
import {Footer} from "./components/footer";
import './static/main.css'
import {Header} from "./components/header";
import {ProgressLoader} from "./components/ProgressLoader";
import {useSelector} from "react-redux";
import {AdminNavBar} from "./admin/components/AdminNavBar";


const {useState} = require("react");


function App() {


    const {ready} = useAuth()
    const isAuthenticated = useSelector(({isAuthenticated}) => isAuthenticated)

    const routes = useRoutes(isAuthenticated)
    //console.log(isAuthenticated)

    const [max, setMax] = useState(0);
    const [value, setValue] = useState(0);



    if (!ready) {
        return <></>
    }

    return (
        <LoaderContext.Provider value={{setMax, setValue, max, value}}>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            <ProgressLoader v={value} m={max} />
                <Router>
                    <main className="main-container">
                        <Header />
                        {isAuthenticated ? <AdminNavBar /> : ''}
                            <div className="container">
                                {routes}
                            </div>
                        <Footer/>
                    </main>

                </Router>
        </LoaderContext.Provider>
    )
}


export default App;
