import React from 'react'
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import {AdminNavBar} from "../../components/AdminNavBar"
import {useState} from "react"

const {useCallback} = require("react")
const {useEffect} = require("react")


export const RolesPage = () => {

    const [header, setHeader] = useState()
    const  [progress, setProgress] = useState(0)

    return(

        <div className="row">

            <AdminNavBar />

            <h1>Roles page</h1>

        </div>
    )
}