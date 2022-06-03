import React,{useEffect, useState} from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase-config";
const Login=()=>{
    let navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [pass, setPassword] = useState("");
    const [passError, setPassError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    useEffect(()=>{
        onAuthStateChanged(auth, (currentUser) => {
            if(currentUser){
                navigate('/');
            }
        });
    },[]);
    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                email,
                pass
            );
            console.log(user);
            navigate(`/`);
        } catch (error) {
            if(error.message.includes('auth/user-not-found')){
                alert("User not found!");
            }else{
                alert("Wrong username or password!");
            }
        }
    };
    const handleSubmit=()=>{
        setPassError(false);
        setEmailError(false);
        var mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if(pass.length < 7){
            setPassError(true);
        }
        if(!email.match(mailformat)){
            setEmailError(true);
        }
        login();
    }
    return(
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-sm-6 col-md-4 rounded border border-dark p-4">
                    <span className="fs-2 fw-bold">Login</span>
                    <form onSubmit={e=>e.preventDefault()}>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email address</label>
                            <input onChange={(e)=>setEmail(e.target.value)} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <input onChange={(e)=>setPassword(e.target.value)} type="password" class="form-control" id="exampleInputPassword1"/>
                        </div>
                        <div id="passwordHelpBlock" class="text-danger form-text">
                            {emailError?"Invalid Email":""} 
                        </div>
                        <div id="passwordHelpBlock" class="text-danger form-text">
                            {passError?"Your password must be more than 6 characters long":""}
                        </div>
                            <button onClick={handleSubmit} type="submit" class="mt-2 btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login;