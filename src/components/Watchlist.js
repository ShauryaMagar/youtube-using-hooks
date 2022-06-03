import React,{useEffect, useState} from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import { auth } from "./firebase-config";

const Watchlist=() =>{
    let navigate = useNavigate();
    useEffect(()=>{
        const user = auth.currentUser;
        if (!user) {
            navigate("/login")
        }else{
            
        }
    },[]);
    return(
        <>
        <NavLink to="/">
            Home
        </NavLink>
        <h1>Watchlist</h1>
        </>
    );
};

export default Watchlist;