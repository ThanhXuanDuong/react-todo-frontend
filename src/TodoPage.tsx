import React, {FormEvent, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Todo} from "./Todo";
import axios from "axios";

export default function TodoPage(this: any){
    const navigate = useNavigate();
    const {id} = useParams<{id: string}>();
    const editedTodoInitial = {id:"", description: "", status: ""};

    const [todo, setTodo] = useState<Todo>();
    const [editingTodo, setEditingTodo] = useState<Todo>(editedTodoInitial);

    useEffect( () =>{
        console.log("useEffect")
        axios.get("/api/todo/" +id)
            .then(response => { setTodo(response.data);
                                setEditingTodo(response.data)})
            .catch(e => console.log(e))
    },[id]);

    const onSubmit  =((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.put("/api/todo/" + id, editingTodo)
            .then(response => response.data)
            .then(data => setTodo(data))
            .catch(e => console.log(e));
    });

    return (
        <div>
            {todo
                ?
                <div>
                    <button onClick={() => navigate("/")}>Back Home</button>
                    <h1>Description: {todo.description}</h1>
                    <h2>Status: {todo.status}</h2>
                    <form onSubmit={onSubmit}>
                            <input type= "text"  onChange={ event => setEditingTodo({...editingTodo,description: event.target.value})}/>

                            <select onChange={event => {setEditingTodo({...editingTodo,status:event.target.value})}}>
                                <option value="" selected disabled hidden>Change status</option>
                                <option value="OPEN">OPEN</option>
                                <option value="IN_PROGRESS">IN PROGRESS</option>
                                <option value="DONE">DONE</option>
                            </select>

                            <button type={"submit"}>Edit</button>
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
