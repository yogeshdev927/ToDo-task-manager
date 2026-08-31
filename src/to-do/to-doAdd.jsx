import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export function ToDoAdd(){
    const [cookies] = useCookies(['userid', 'username']);
    let navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
             title: "",
             description: "",
             date: "",
             category: "General",
             user_id: cookies['userid']
        },
        onSubmit : (appointment)=>{
            if(!appointment.title){
                alert('Please enter a title');
                return;
            }
            axios.post(`http://localhost:3000/appointments`, appointment)
            .then(()=>{
                alert('Appointment added successfully..');
                navigate('/dashboard');
            })
            .catch(err=> console.log(err));
        }
    })

    return(
        <div className="container-fluid">
            <div className="fw-bold fs-5">Add Appointment</div>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Title</dt>
                    <dd><input type="text" name="title" className="form-control w-50" onChange={formik.handleChange} value={formik.values.title} /></dd>
                    <dt>Description</dt>
                    <dd><textarea rows={4} name="description" className="form-control w-50" onChange={formik.handleChange} value={formik.values.description} cols={40}></textarea></dd>
                    <dt>Date</dt>
                    <dd><input type="date" name="date" className="form-control w-50" onChange={formik.handleChange} value={formik.values.date} /></dd>
                    <dt>Category</dt>
                    <dd>
                        <select name="category" className="form-select w-50" onChange={formik.handleChange} value={formik.values.category}>
                            <option value="General">General</option>
                            <option value="Work">Work</option>
                            <option value="Personal">Personal</option>
                            <option value="Urgent">Urgent</option>
                        </select>
                    </dd>
                </dl>
                <button className="btn btn-primary" type="submit">Add</button>
                <Link to="/dashboard" className="btn btn-danger mx-2">Cancel</Link>
            </form>
        </div>
    )
}