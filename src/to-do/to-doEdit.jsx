import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export function ToDoEdit(){

    const [appointment, setAppointment] = useState({id:null, user_id:null, title:'', description:'', date:'', category:'General'});
    let navigate = useNavigate();
    let params = useParams();

    function LoadAppointment(){
        axios.get(`https://todo-task-manager-gtsf.onrender.com/appointments/${params.id}`)
        .then(response=>{
             setAppointment(response.data);
        })
    }

    useEffect(()=>{
        LoadAppointment();
    },[])

    const formik = useFormik({
        initialValues: {
             title: appointment.title,
             description: appointment.description,
             date: appointment.date,
             category: appointment.category || 'General',
             user_id: appointment.user_id
        },
        onSubmit: (updatedAppointment) => {
            axios.put(`https://todo-task-manager-gtsf.onrender.com/appointments/${params.id}`, updatedAppointment)
            .then(()=>{
                alert('Appointment Updated..');
                navigate('/dashboard');
            })
            .catch(err=> console.log(err));
        },
        enableReinitialize: true
    })

    return(
        <div className="container-fluid">
            <h4>Edit Appointment</h4>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Title</dt>
                    <dd><input type="text" name="title" className="form-control w-50" value={formik.values.title} onChange={formik.handleChange} /></dd>
                    <dt>Description</dt>
                    <dd><textarea rows={4} name="description" className="form-control w-50" value={formik.values.description} onChange={formik.handleChange} cols={40}></textarea></dd>
                    <dt>Date</dt>
                    <dd><input type="date" name="date" className="form-control w-50" value={formik.values.date} onChange={formik.handleChange} /></dd>
                    <dt>Category</dt>
                    <dd>
                        <select name="category" className="form-select w-50" value={formik.values.category} onChange={formik.handleChange}>
                            <option value="General">General</option>
                            <option value="Work">Work</option>
                            <option value="Personal">Personal</option>
                            <option value="Urgent">Urgent</option>
                        </select>
                    </dd>
                </dl>
                <button type="submit" className="btn btn-success">Save</button>
                <Link to="/dashboard" className="btn btn-danger mx-2"> Cancel </Link>
            </form>
        </div>
    )
}