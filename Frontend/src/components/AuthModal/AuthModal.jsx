import { useState, useEffect } from "react";
import axios from "axios";
import { X } from "lucide-react";
import "./AuthModal.css";

const AuthModal = ({ open, setOpen }) => {

const [mode,setMode] = useState("login");

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

/* Reset form when modal closes */

useEffect(()=>{
if(!open){
setName("");
setEmail("");
setPassword("");
setMode("login");
}
},[open]);

if(!open) return null;

/* SUBMIT */

const submitHandler = async(e)=>{
e.preventDefault();

try{

const url =
mode === "login"
? "http://localhost:5000/api/auth/login"
: "http://localhost:5000/api/auth/register";

const body =
mode === "login"
? { email: email.trim(), password }
: { name, email: email.trim(), password };

const res = await axios.post(url, body);

/* SUCCESS */

if(res.data.success){

sessionStorage.clear();

sessionStorage.setItem("token",res.data.token);
sessionStorage.setItem("user",JSON.stringify(res.data.user));

alert("Welcome 🎉");

setOpen(false);

/* reload navbar state */
window.location.reload();

}

/* ERROR FROM BACKEND */

else{

alert(res.data.message);

}

}catch(err){

console.log(err);

/* backend error message */

if(err.response && err.response.data.message){
alert(err.response.data.message);
}else{
alert("Server connection error");
}

}

};

return(

<div className="auth-overlay">

<div className="auth-modal">

<X
className="close-btn"
size={22}
onClick={()=>setOpen(false)}
/>

<h2>
{mode === "login" ? "Login" : "Create Account"}
</h2>

<form onSubmit={submitHandler}>

{mode === "signup" && (

<input
type="text"
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
required
/>

)}

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

<button type="submit">
{mode === "login" ? "Login" : "Signup"}
</button>

</form>

<p className="switch">

{mode === "login"
? "Don't have an account?"
: "Already have an account?"
}

<span
onClick={()=>{

setMode(mode === "login" ? "signup" : "login");

/* clear inputs when switching */

setName("");
setEmail("");
setPassword("");

}}
>

{mode === "login" ? "Signup" : "Login"}

</span>

</p>

</div>

</div>

);

};

export default AuthModal;