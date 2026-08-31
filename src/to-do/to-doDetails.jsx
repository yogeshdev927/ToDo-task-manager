import { useCallback, useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie"
import { Link, useOutletContext } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToArchive } from "../slicers/task-slicer";

export function TodoDetails(){
    const [appointments, setAppointments] = useState([]);
    const [cookies] = useCookies(['userid','username']);
    const context = useOutletContext();
    const searchString = context ? context.searchString : '';
    let dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState('');
    const [sortAscending, setSortAscending] = useState(true);
    const userAppointments = useMemo(()=>{
        return appointments.filter(appointment=> appointment.user_id === cookies['userid']);
    },[appointments, cookies])
    const searchedAppointments = useMemo(()=>{
        if(!searchString){
            return userAppointments;
        } else {
            return userAppointments.filter(task=> task.title.toLowerCase().includes(searchString.toLowerCase()));
        }
    },[userAppointments, searchString])

    const uniqueDates = useMemo(()=>{
        return [...new Set(userAppointments.map(a=> a.date).filter(Boolean))];
    },[userAppointments])

    const dateFilteredAppointments = useMemo(()=>{
        if(!selectedDate) return searchedAppointments;
        return searchedAppointments.filter(a=> a.date === selectedDate);
    },[searchedAppointments, selectedDate])

    const FilteredAppointments = useMemo(()=>{
        const sorted = [...dateFilteredAppointments].sort((a,b)=> a.title.localeCompare(b.title));
        return sortAscending ? sorted : sorted.reverse();
    },[dateFilteredAppointments, sortAscending])

    const LoadAppointments = useCallback(()=>{
        axios.get('http://localhost:3000/appointments').then(response=>{
            setAppointments(response.data);
        })
    },[])
    useEffect(()=>{
        LoadAppointments();
    },[searchString])

    function AddToArchiveClick(appointment){
        dispatch(addToArchive(appointment));
        alert('Task Added to archives');
    }

    function handleClearFilter(){
        setSelectedDate('');
    }

    function handleSortToggle(){
        setSortAscending(prev=> !prev);
    }

    return(
        <div className="container-fluid">
             <div role="filter" className="mt-4 bg-light p-2">
                <div className="d-flex justify-content-baseline align-items-center">
                    <button onClick={handleClearFilter} type="button" className="btn bi bi-funnel"> Clear Filter</button>
                    <button onClick={handleSortToggle} type="button" className={`btn bi ${sortAscending ? 'bi-sort-alpha-down' : 'bi-sort-alpha-up'}`}></button>
                    <select
                        className="form-select w-25"
                        value={selectedDate}
                        onChange={(e)=> setSelectedDate(e.target.value)}
                    >
                        <option value="">Select Date</option>
                        {uniqueDates.map(date=>(
                            <option key={date} value={date}>{date}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="mt-2">
                {
                    FilteredAppointments.length === 0
                    ? <div className="text-center text-muted mt-4">No appointments found. Click "Add New" to create one.</div>
                    :
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Date</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                FilteredAppointments.map(appointment=>
                                    <tr key={appointment.id}>
                                        <td>{appointment.title}</td>
                                        <td>{appointment.description}</td>
                                        <td>{appointment.date}</td>
                                        <td>{appointment.category || 'General'}</td>
                                        <td>
                                            <Link to={`/dashboard/edit/${appointment.id}`} className="btn btn-warning bi bi-pen"></Link>
                                            <Link to={`/dashboard/delete/${appointment.id}`} className="btn btn-danger bi bi-trash mx-2"></Link>
                                            <button onClick={()=>{ AddToArchiveClick(appointment) }} className="btn btn-dark bi bi-archive"></button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                }
            </div>
        </div>
    )
}