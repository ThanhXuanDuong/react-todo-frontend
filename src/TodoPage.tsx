import React, {FormEvent, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Todo} from "./Todo";
import axios from "axios";

export default function TodoPage(){
    const {id} = useParams<{id: string}>();
    const [todo, setTodo] = useState<Todo>();

    useEffect( () =>{
        console.log("useEffect")
        axios.get("/api/todo/" +id)
            .then(response => setTodo(response.data))
            .catch(e => console.log(e))
    },[id]);

    const editedTodoInitial = {id:"", description:"", status: ""};

    const [editedTodo, setEditedTodo] = useState<Todo>(editedTodoInitial);


    const onSubmit  =((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.put("/api/todo/" + id, editedTodo)
            .then(response => response.data)
            .then(data => setTodo(data))
            .catch(e => console.log(e))
    });

    return (
        <div>
            {todo
                ?
                <div>
                    <h1>Description: {todo.description}</h1>
                    <h2>Status: {todo.status}</h2>
                    <form onSubmit={onSubmit}>
                        <input type= "text"  onChange={event =>setEditedTodo({...todo,description: event.target.value})}/>
                        <button>Edit</button>
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
