import React, {FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {NewTodo} from "./NewTodo";
import {Todo} from "./Todo";
import TodoCard from "./TodoCard";


export default function Root(){
    const newTodoInitial: NewTodo ={
        description:"",
        status:"OPEN"
    };

    const [newTodo, setNewTodo] = useState<NewTodo>(newTodoInitial);
    const [todos, setTodos]=useState<Todo[]>([]);

    useEffect( () =>{
        console.log("useEffect")
        axios.get("/api/todo")
            .then(response => setTodos(response.data))
            .catch(e => console.log(e))
    },[]);

    const onSubmit  =((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.post("/api/todo",newTodo)
            .then(response => response.data)
            .then(data =>setTodos([...todos,data]))
            .catch(e => console.log(e))
    });

    return(
        <div className={"todoList-container"}>
            <h1>To-do List</h1>
            <ul>
                {todos.map(todo => <TodoCard key={todo.id} todo={todo}/>)}
            </ul>
            <form onSubmit={onSubmit}>
                <input type= "text" onChange={event => setNewTodo({...newTodo,description: event.target.value})}/>
                <button>Add</button>
            </form>

        </div>

    )
    }