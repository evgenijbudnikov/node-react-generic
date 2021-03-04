import logo from './logo.svg';
import React from 'react';
import 'materialize-css'
import {useRoutes} from "./routes";
import {BrowserRouter as Router} from 'react-router-dom'
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext"
import {LoaderContext} from "./context/LoaderContext"
import {Footer} from "./components/footer";
import './static/main.css'
import {Header} from "./components/header";
import {ProgressLoader} from "./components/ProgressLoader";
import {
    progressBarFetch,
    setOriginalFetch,
    ProgressBar
} from "react-fetch-progressbar";

const {useState} = require("react");

//setOriginalFetch(window.fetch)
//window.fetch = progressBarFetch;

function App() {




    const {token, login, logout, userId, ready} = useAuth()
    const isAuthenticated = !!token

    const routes = useRoutes(isAuthenticated)

    const [max, setMax] = useState(0);
    const [value, setValue] = useState(0);



    if (!ready) {
        return <></>
    }

    return (

        <LoaderContext.Provider value={{setMax, setValue, max, value}}>

            <ProgressLoader v={value} m={max} />
            <AuthContext.Provider value={{
            token, login, logout, userId, isAuthenticated}}>

                <Router>
                    <Header />

                    <main className="Site-content">
                        <div className="container">
                            {routes}
                        </div>
                    </main>
                </Router>

            </AuthContext.Provider>
        </LoaderContext.Provider>
    )
}


export default App;
