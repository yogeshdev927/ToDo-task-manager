import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { TodoLogin } from "./to-doLogin";
import { TodoRegister } from "./to-doRegister";
import todoimg from "../todoimg.jpg";

export function TodoHome(){
    useEffect(()=>{
        if(window.location.hash){
            const el = document.querySelector(window.location.hash);
            if(el){
                el.scrollIntoView({ behavior: "smooth" });
            }
        }
    },[])

return(
    <div className="container-fluid">
        <div className="row">
            <div className="col text-center">
                <div className="fs-2 fw-bold mt-5">Manage Your Daily Tasks
                    <br />and Appointments
                </div>
                <div>
                    <img src={todoimg} alt="Todo tasks" width='450px' height='450px' />
                </div>
            </div>
            <div className="col">
                <div className="mt-5 ms-5">
                    <ul className="nav nav-tabs ps-5">
                        <li className=" nav-item"><a href="#login" data-bs-toggle="tab" className="nav-link active">User Login</a></li>
                        <li className="nav-item"><a href="#register" data-bs-toggle="tab" className="nav-link">Register</a></li>
                    </ul>
                    <div className="tab-content">
                        <div className="tab-pane active" id="login">
                            <TodoLogin width="w-75" />
                        </div>
                         <div className="tab-pane" id="register">
                            <TodoRegister width="w-75" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <section id="features" className="p-5 bg-light mt-5">
            <h3 className="fw-bold mb-3">Features</h3>
            <ul>
                <li>Create, edit, and delete your personal appointments/tasks</li>
                <li>Quickly search and filter tasks by date</li>
                <li>Organize the tasks into categories</li>
                <li>See your tasks by date in the calendar view</li>
                <li>Archive the important tasks</li>
            </ul>
        </section>
        <section id="pricing" className="p-5">
            <h3 className="fw-bold mb-3">Pricing</h3>
            <p>Task Manager is completely free for personal use.</p>
        </section>
        <section id="about" className="p-5 bg-light">
            <h3 className="fw-bold mb-3">About</h3>
            <p>Task Manager is a simple app that helps you track your daily appointments and to-dos all in one place.</p>
        </section>
    </div>
)
}