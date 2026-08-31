import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

export function ToDoCalendar(){
    const [appointments, setAppointments] = useState([]);
    const [cookies] = useCookies(['userid']);
    useEffect(()=>{
        axios.get('https://todo-task-manager-gtsf.onrender.com/appointments')
        .then(response=>{
            setAppointments(response.data);
        })
        .catch(err=> console.log(err));
    },[])
    const userAppointments = appointments.filter(a=> a.user_id === cookies['userid']);
    const groupedByDate = userAppointments.reduce((groups, appointment)=>{
        const key = appointment.date || 'No date set';
        if(!groups[key]) groups[key] = [];
        groups[key].push(appointment);
        return groups;
    }, {});
    const sortedDates = Object.keys(groupedByDate).sort();
    return(
        <div className="container-fluid">
            <div className="fw-bold fs-5 mb-3">Calendar — Tasks by Date</div>
            {
                sortedDates.length === 0
                ? <div className="text-muted">There are no appointments right now. Create a task using 'Add New', it will show up here.</div>
                : sortedDates.map(date=>(
                    <div key={date} className="mb-4">
                        <div className="fw-bold bg-light p-2">{date}</div>
                        <ul className="list-group">
                            {groupedByDate[date].map(appointment=>(
                                <li key={appointment.id} className="list-group-item">
                                    <span className="fw-bold">{appointment.title}</span> — {appointment.description}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            }
        </div>
    )
}