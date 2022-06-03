import React,{ useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase-config";

function App() {
  let navigate = useNavigate();
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [passError, setPassError] = useState(false);
  const [emailError, setEmailError] = useState(false);
 
    useEffect(()=>{
        const user = auth.currentUser;
        if (user) {
            navigate("/")
        } 
    },[]);
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
      navigate(`/`);
    } catch (error) {
      console.log("Oops, some error");
    }
  };
  const handleSubmit=()=>{
        setPassError(false);
        setEmailError(false);
        var mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if(registerPassword.length < 7){
            setPassError(true);
        }
        if(!registerEmail.match(mailformat)){
            setEmailError(true);
        }
        register();
  }
  return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-sm-6 col-md-4 rounded border border-dark p-4">
                    <span className="fs-2 fw-bold">Register</span>
                    <form onSubmit={e=>e.preventDefault()}>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email address</label>
                            <input onChange={(e)=>setRegisterEmail(e.target.value)} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <input onChange={(e)=>setRegisterPassword(e.target.value)} type="password" class="form-control" id="exampleInputPassword1"/>
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
    
  );
}

export default App;