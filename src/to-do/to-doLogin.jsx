import axios from "axios"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
export function TodoLogin(props){

    const[users, setUsers]= useState([{user_id:null, user_name:null, password:null, email:null}]);
    let navigate= useNavigate();
    const[cookies, setCookie, removeCookie]= useCookies(['userid','username']);

    function LoadUsers(){
        axios('http://localhost:3000/users')
        .then(Response=>{
            setUsers(Response.data)
        })
    }

    useEffect(()=>{
        LoadUsers();
    },[])

    const formik= useFormik({
        initialValues: {
            user_id: '',
            user_name: '',
            password: '',
            email: ''
        },
        onSubmit: (user)=>{
            var userDetails= users.find(item=> item.user_id===user.user_id);
            if(userDetails)
            {
                if(userDetails.password===user.password){
                    setCookie('userid', userDetails.user_id);
                    setCookie('username', userDetails.user_name);
                    navigate('/dashboard');
                }else{
                    alert('Invalid Password');
                }
            }else{
                alert('Invalid UserId');
            }
        }
    })
return(
    <div className="container-fluid d-flex justify-content-center">
        <form className={`p-4 ${props.width} w-25`} onSubmit={formik.handleSubmit}>
           <h4 className="bi bi-person-fill">User Login</h4>
           <dl>
            <dt>User Id</dt>
            <dd><input type="text" name="user_id" className="form-control" onChange={formik.handleChange} /></dd>
            <dt>Passwoerd</dt>
            <dd><input type="password" name="password" className="form-control" onChange={formik.handleChange} /></dd>
           </dl>
           <button className="btn btn-secondary w-100" type="submit">Login</button>
           <div className="mt-5">
            <Link to="/register">New User Register</Link>
           </div>
        </form>
    </div>
)
}