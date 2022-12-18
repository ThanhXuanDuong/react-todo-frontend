import { useNavigate} from "react-router-dom";
import React from "react";
import {Todo} from "./Todo";

export default function TodoCard({
                                     todo,
                                     onDelete}
                                     :{
                                        todo : Todo,
                                        onDelete: (id : string) => void}){
    const navigate = useNavigate();
    return (
        <div className="todoCard-container">
            <div>
                <h1> {todo.description}</h1>
            </div>
            <div>
                <button onClick={() => navigate("todo/" + todo.id)}>Details</button>
            </div>
            <div>
                <button onClick={() => onDelete(todo.id)}>Delete</button>
            </div>
        </div>

    )
}