import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { Link, Outlet, useNavigate } from "react-router-dom"
export default function TodoDashboard(){
    const [cookies, setCookie, removeCookie] = useCookies(['userid', 'username']);
    const [searchString, setSearchString] = useState('');
    let navigate = useNavigate();
    useEffect(()=>{
        if(cookies['userid'] === undefined){
            navigate('/login')
        }
    },[cookies])
    function handleSignout(){
        removeCookie('userid', { path: '/' });
        removeCookie('username', { path: '/' });
        navigate('/login');
    }
    return(
        <div className="container-fluid mt-4">
            <div className="row">
                <div className="col-2">
                    <div className=" fw-bold fs-6">{cookies['username']}-Dashboard</div>
                    <nav className=" mt-3">
                        <div className="bi bi-pencil-square">
                            <Link to="/dashboard/details" className="text-decoration-none ms-1">My Tasks</Link>
                        </div>
                        <div className="bi bi-calendar-date my-4">
                            <Link to="/dashboard/calendar" className="text-decoration-none ms-1">Calendar</Link>
                        </div>
                        <div className="bi bi-folder">
                            <Link to="/dashboard/categories" className="text-decoration-none ms-1">Categories</Link>
                        </div>
                    </nav>
                </div>
                <div className="col-10">
                    <div role="header" className=" d-flex justify-content-between">
                        <div className="w-50">
                            <div className="input-group">
                                <input type="text" className="form-control" onChange={(e)=>{setSearchString(e.target.value);}} placeholder="Search appointments, categories" />
                                <button type="button" className="btn btn-secondary bi bi-search"></button>
                            </div>
                        </div>
                        <div>
                            <Link to="/dashboard/add" className="btn btn-primary bi bi-plus mx-2">Add New</Link>
                            <button onClick={handleSignout} className="btn btn-warning bi bi-person-circle">Signout</button>
                        </div>
                    </div>
                    <div>
                        <Outlet context={{searchString}} />
                    </div>
                </div>
            </div>
        </div>
    )
}