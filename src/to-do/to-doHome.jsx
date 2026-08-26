import { Route, Routes } from "react-router-dom";
import { TodoLogin } from "./to-doLogin";
import { TodoRegister } from "./to-doRegister";

export function TodoHome(){
return(
    <div className="container-fluid">
        <div className="row">
            <div className="col text-center">
                <div className="fs-2 fw-bold mt-5">Manage Your Daily Tasks
                    <br />and Appointments
                </div>
                <div>
                    <img src="src/todoimg.jpg" width='450px' height='450px' />
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
    </div>
)
}