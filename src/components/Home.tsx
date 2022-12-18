import React, {FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {NewTodo} from "../types/NewTodo";
import {Todo} from "../types/Todo";
import TodoCard from "./TodoCard";
import {Status} from "../types/Status";


export default function Home(){
    const newTodoInitial: NewTodo ={
        description: "",
        status: Status.OPEN
    };

    const [newTodo, setNewTodo] = useState<NewTodo>(newTodoInitial);
    const [todos, setTodos]=useState<Todo[]>([]);
    const [doings, setDoings]=useState<Todo[]>([]);
    const [dones, setDones]=useState<Todo[]>([]);

    useEffect( () =>{
        (async () =>{
            const response = await axios.get("/api/todo");
            setTodos(response.data.filter((d: Todo) => d.status === Status.OPEN));
            setDoings(response.data.filter((d: Todo) => d.status === Status.IN_PROGRESS));
            setDones(response.data.filter((d: Todo) => d.status === Status.DONE));
        })()
    },[]);

    const onSubmit  =((event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.post("/api/todo",newTodo)
            .then(response => response.data)
            .then(data => setTodos([...todos,data]))
            .catch(e => console.log(e));
    });

    const onDelete = (id:string) => {
        axios.delete("/api/todo/"+id)
            .then(response =>response.data)
            .catch(e => console.log(e));

        setTodos(todos.filter((todo) => todo.id !== id));
        setDoings(doings.filter((doing) => doing.id !== id));
        setDones(dones.filter((done) => done.id !== id));
    };

    const onAdvance = (todo : Todo)=>{
        if (todo.status === Status.OPEN){
            setDoings([...doings,{...todo,status: Status.IN_PROGRESS}]);
            setTodos(todos.filter((t) => t.id !== todo.id));

            axios.put("/api/todo/" + todo.id, {...todo,status: Status.IN_PROGRESS})
                .then(response => response.data)
                .catch(e => console.log(e));

        } else if (todo.status === Status.IN_PROGRESS){
            setDones([...dones,{...todo,status: Status.DONE}]);
            setDoings(doings.filter((t) => t.id !== todo.id));

            axios.put("/api/todo/" + todo.id, {...todo,status: Status.DONE})
                .then(response => response.data)
                .catch(e => console.log(e));

        }else {
            console.log("To Delete");
        }

    };

    return(
        <div className={"todoList-container"}>
            <div className={"header"}>
                <h1>To-do List</h1>
            </div>
            <div className={"categories-container"}>
                <div className={"todos-container"}>
                    <h2>To-do</h2>
                    <ul>
                        {todos.map(todo => <TodoCard key={todo.id} todo={todo} onDelete={onDelete} onAdvance={onAdvance}/>)}
                    </ul>
                </div>
                <div className={"doings-container"}>
                    <h2>Doing</h2>
                    <ul>
                        {doings.map(doing => <TodoCard key={doing.id} todo={doing} onDelete={onDelete} onAdvance={onAdvance}/>)}
                    </ul>
                </div>
                <div className={"dones-container"}>
                    <h2>Done</h2>
                    <ul>
                        {dones.map(done => <TodoCard key={done.id} todo={done} onDelete={onDelete} onAdvance={onAdvance}/>)}
                    </ul>
                </div>
            </div>
            <div className={"add-todo"}>
                <form onSubmit={onSubmit}>
                    <input type= "text" onChange={event => setNewTodo({...newTodo,description: event.target.value})}/>
                    <button>Add</button>
                </form>
            </div>

        </div>

    )
    }