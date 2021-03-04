import React from 'react'
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import {AdminNavBar} from "../components/AdminNavBar";

const {useState} = require("react");

const {useEffect} = require("react");
export const AdminPage = () => {

    const [header, setHeader] = useState()



    const headerText = (event) => {
        console.log(event)
        //setHeader(event.target.innerHTML)
    }

    return(
        <div className="row">
            <AdminNavBar />
        </div>
    )
}