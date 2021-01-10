import React,{useState} from 'react';
import axios from 'axios';
import '../App.css';
import M from 'materialize-css'
import {Link,useHistory} from 'react-router-dom'

const SignIn=()=>{
    const history = useHistory()
    
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
    
    const handleSubmit=()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Invalid email",classes:"#c62828 red darken-3"})
            return
        }
        if(!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password))
        {
            M.toast({html: "Password must contain atleast 6 characters,including UPPER/lowercase and numbers",classes:"#c62828 red darken-3"})
            return
        }
        const user={
            
            email:email,
            password:password
        }
        axios.post("http://localhost:5000/signin",user)
        .then(res=>{
            if(res.data.error)
            M.toast({html: res.data.error,classes:"#c62828 red darken-3"})
            else{
                M.toast({html:"Signed in successfully",classes:"#43a047 green darken-1"})
                history.push('/')
            }
        })
        .catch(err=>console.log(err))
    }
    return(
        <div className="mycard">
        <div className="card auth-card  input-field">
            <h2>Login</h2>

            <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder="password"  value={password}  onChange={(e)=>setPassword(e.target.value)}/>
            
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={handleSubmit}>Login </button>
            <h5><Link to="/signup">Don't have an account?</Link></h5>
        </div>
        </div>
    )
}

export default SignIn