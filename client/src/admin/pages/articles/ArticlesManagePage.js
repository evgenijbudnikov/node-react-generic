import React from 'react'
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import {AdminNavBar} from "../../components/AdminNavBar";

const {useState} = require("react");

const {useEffect} = require("react");
export const ArticlesManagementPage = () => {

    const [header, setHeader] = useState()

    return(
        <div className="row">

            <AdminNavBar />
            <h1>Articles Management Page</h1>

        </div>
    )
}