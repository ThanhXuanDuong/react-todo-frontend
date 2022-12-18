import React, {FormEvent, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Todo} from "../types/Todo";
import axios from "axios";

export default function TodoDetails(){
    const navigate = useNavigate();
    const {id} = useParams<{id: string}>();
    const editedTodoInitial = {id:"", description: "", status: ""};

    const [todo, setTodo] = useState<Todo>();
    const [editingTodo, setEditingTodo] = useState<Todo>(editedTodoInitial);

    useEffect( () =>{
        (async () =>{
            const response = await axios.get("/api/todo/" +id);
            setTodo(response.data);
            setEditingTodo(response.data)
        })()
    },[id]);

    const onSubmit  =((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.put("/api/todo/" + id, editingTodo)
            .then(response => response.data)
            .then(data => setTodo(data))
            .catch(e => console.log(e));
    });

    return (
        <div className={"details"}>
            <button onClick={() => navigate("/")}>Back Home</button>
            {todo
                ?
                <div className={"details-container"}>
                    <h1>Description: {todo.description}</h1>
                    <h2>Status: {todo.status}</h2>
                    <form onSubmit={onSubmit}>
                        <div>
                            <input type= "text"  onChange={ event => setEditingTodo({...editingTodo,description: event.target.value})}/>
                        </div>
                        <div>
                            <select onChange={event => {setEditingTodo({...editingTodo,status:event.target.value})}}>
                                <option value="" selected disabled hidden>Status</option>
                                <option value="OPEN">OPEN</option>
                                <option value="IN_PROGRESS">IN PROGRESS</option>
                                <option value="DONE">DONE</option>
                            </select>
                        </div>
                        <div>
                        <button type={"submit"}>Edit</button>
                        </div>
                    </form>
                </div>
                :
                <div>
                    Not Found
                </div>
            }

        </div>
    )
}
