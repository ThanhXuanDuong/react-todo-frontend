import { useNavigate} from "react-router-dom";
import React from "react";
import {Todo} from "../types/Todo";

export default function TodoCard(
    {todo,
    onDelete,
    onAdvance}
 :{
    todo : Todo,
    onDelete: (id : string) => void,
    onAdvance: (todo : Todo) => void})
{
    const navigate = useNavigate();

    return (
        <div className="todoCard-container">
            <div className="description">
                <h4> {todo.description} - {todo.status}</h4>
            </div>
            <div className="buttons-container">
                <div className="details-button">
                    <button onClick={() => navigate("todo/" + todo.id)}>Details</button>
                </div>
                <div className="delete-button">
                    <button onClick={() => onDelete(todo.id)}>Delete</button>
                </div>
                <div className="advance-button">
                    <button onClick={() => onAdvance(todo)}>Advance</button>
                </div>
            </div>
        </div>

    )
}