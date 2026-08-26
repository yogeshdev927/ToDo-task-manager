import axios from "axios"
import { useFormik } from "formik"
import { Link, useNavigate } from "react-router-dom"
export function TodoRegister(props){
    let navigate= useNavigate();
    const formik= useFormik({
        initialValues: {
            user_id: "",
            user_name: "",
            password: "",
            email: ""
        },
        onSubmit: (user)=>{
            axios.post(`http://localhost:3000/users`, user)
            .then(()=>{
                console.log('Registered');
            })
            alert('Registered successfully..');
            navigate("/login");
        }
    })
return(
    <div className="container-fluid d-flex justify-content-center">
        <form className={`p-4 ${props.width} w-25`} onSubmit={formik.handleSubmit}>
           <h4 className="bi bi-person-fill">Register User</h4>
           <dl>
            <dt>User Id</dt>
            <dd><input type="text" name="user_id" className="form-control" onChange={formik.handleChange} /></dd>
             <dt>User Name</dt>
            <dd><input type="text" name="user_name" className="form-control" onChange={formik.handleChange} /></dd>
            <dt>Password</dt>
            <dd><input type="password" name="password" className="form-control" onChange={formik.handleChange} /></dd>
             <dt>Email</dt>
            <dd><input type="email" name="email" className="form-control" onChange={formik.handleChange} /></dd>
           </dl>
            <button type="submit" className="btn btn-secondary w-100">Register</button>
             <div className="mt-3">
            <Link to="/login">Existing User</Link>
        </div>
        </form>
    </div>
)
}