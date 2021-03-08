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


const {useState} = require("react");


function App() {


    const {ready} = useAuth()
    const isAuthenticated = useSelector(({isAuthenticated}) => isAuthenticated)

    const routes = useRoutes(isAuthenticated)
    console.log(isAuthenticated)

    const [max, setMax] = useState(0);
    const [value, setValue] = useState(0);



    if (!ready) {
        return <></>
    }

    return (
        <LoaderContext.Provider value={{setMax, setValue, max, value}}>

            <ProgressLoader v={value} m={max} />
                <Router>
                    <Header />

                    <main className="Site-content">
                        <div className="container">
                            {routes}
                        </div>
                    </main>
                </Router>
        </LoaderContext.Provider>
    )
}


export default App;
