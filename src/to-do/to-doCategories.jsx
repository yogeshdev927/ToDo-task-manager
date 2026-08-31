import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

export function ToDoCategories(){
    const [appointments, setAppointments] = useState([]);
    const [cookies] = useCookies(['userid']);
    useEffect(()=>{
        axios.get('http://localhost:3000/appointments')
        .then(response=>{
            setAppointments(response.data);
        })
        .catch(err=> console.log(err));
    },[])
    const userAppointments = appointments.filter(a=> a.user_id === cookies['userid']);
    const groupedByCategory = userAppointments.reduce((groups, appointment)=>{
        const key = appointment.category || 'General';
        if(!groups[key]) groups[key] = [];
        groups[key].push(appointment);
        return groups;
    }, {});
    const categories = Object.keys(groupedByCategory);
    return(
        <div className="container-fluid">
            <div className="fw-bold fs-5 mb-3">Categories</div>
            {
                categories.length === 0
                ? <div className="text-muted">There is no appointment right now. Make a task using 'Add New' and choose a category.</div>
                : <div className="row">
                    {categories.map(category=>(
                        <div key={category} className="col-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-title fw-bold bi bi-folder"> {category} ({groupedByCategory[category].length})</div>
                                    <ul className="list-unstyled mt-2">
                                        {groupedByCategory[category].map(appointment=>(
                                            <li key={appointment.id}>
                                                <Link to={`/dashboard/edit/${appointment.id}`}>{appointment.title}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}