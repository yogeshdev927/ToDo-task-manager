import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { TodoHome } from "./to-doHome";
import { TodoLogin } from "./to-doLogin";
import { TodoRegister } from "./to-doRegister";
import { ToDoAdd } from "./to-doAdd";
import { ToDoDelete } from "./to-doDelete";
import { ToDoEdit } from "./to-doEdit";
import { TodoDetails } from "./to-doDetails";
import { lazy, Suspense } from "react";
const TodoDashboard = lazy(()=> import('./to-doDashboard'));
export function TodoIndex(){
return(
    <div className="container-fluid p-0">
        <BrowserRouter>
        <header className="bg-dark text-white p-3 d-flex justify-content-between">
            <div className="fs-3 fw-bold ps-3">
                <span className="bi bi-pencil-square"></span>
                <span>TASK MANAGER</span>
            </div>
            <div>
                <button className="btn text-white me-3">Features</button>
                <button className="btn text-white">Pricing</button>
                <button className="btn text-white mx-3">About</button>
                <button className="btn btn-light me-3">Get Started</button>
            </div>
        </header>
        <section>
            <Suspense fallback={<div>Loading component please wait..</div>}>
            <Routes>
                <Route path="/" element={<TodoHome />} />
                <Route path="login" element={<TodoLogin />} />
                <Route path="register" element={<TodoRegister />} />
                <Route path="dashboard" element={<TodoDashboard />}>
                  <Route path="" element={<TodoDetails />} />
                  <Route path="details" element={<TodoDetails />} />
                  <Route path="add" element={<ToDoAdd />} />
                  <Route path="edit/:id" element={<ToDoEdit />} />
                  <Route path="delete/:id" element={<ToDoDelete />} />
                </Route> 
            </Routes>
            </Suspense>
        </section>
        </BrowserRouter>
    </div>
)
}