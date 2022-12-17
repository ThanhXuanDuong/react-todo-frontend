import {Link} from "react-router-dom";
import React from "react";
import {Todo} from "./Todo";

export default function TodoCard({todo} :{todo : Todo}){
    return (
        <div className="todoCard-container">
            <div>
                <h1> {todo.description}</h1>
            </div>
            <div>
                <Link to={"todo/" + todo.id}>Details</Link>
            </div>
            <div>
                <Link to={"todo/" + todo.id}>Delete</Link>
            </div>
        </div>

    )
}