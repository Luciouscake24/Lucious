import { useEffect,useState } from "react";
import axios from "axios";
import "./Users.css";

const Users = ()=>{

const [users,setUsers] = useState([]);

useEffect(()=>{

const fetchUsers = async()=>{

try{

const token = sessionStorage.getItem("token");

const res = await axios.get(
"http://localhost:5000/api/users",
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

setUsers(res.data.users);

}catch(err){

console.log("Error:",err);

}

};

fetchUsers();

},[]);

return(

<div className="users-page">

<h2 className="users-title">Registered Users</h2>

<div className="users-table-wrapper">

<table className="users-table">

<thead>
<tr>
<th>Name</th>
<th>Email</th>
<th>Role</th>
</tr>
</thead>

<tbody>

{users.map((user)=>(
<tr key={user._id}>
<td>{user.name}</td>
<td>{user.email}</td>
<td>
<span className={`role ${user.role}`}>
{user.role}
</span>
</td>
</tr>
))}

</tbody>

</table>

</div>

</div>

);

};

export default Users;