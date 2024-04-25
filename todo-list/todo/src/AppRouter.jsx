import { useState } from "react"

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import App from "./App";
import Template from "./Template";
import Edit from "./Edit";

const api = "http://localhost:8000/tasks";


export default function AppRouter() {
    const [ list, setList ] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        (async () => {
            const res = await fetch(api);
            const data = await res.json();
            setList(data);
            setIsLoading(false);
        })();
    },[]);

    const add = async (subject) => {
        if(!subject) return false;

        const res = await fetch(api, {
            method: "post",
            body: JSON.stringify({subject}),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await res.json();
        setList([...list, data]);
    }

    const update = (_id, subject) => {
        if(!subject) return false;

        fetch(`${api}/${_id}`, {
            method: 'put',
            body: JSON.stringify({subject}),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        setList(
            list.map(item => {
                if(item._id === _id) item.subject = subject;
                return item;
            })
        );

    };

    const toggle = _id => {
        fetch(`${api}/toggle/${_id}`, {method: 'put'});
        setList(
            list.map(item => {
                if(item._id === _id) item.done = !item.done
                return item;
            })
        );
    }

    const remove = _id => {
        fetch(`${api}/${_id}`, {method: 'delete'});
        setList(list.filter(item => item._id !== _id));
    }

    const clear = () => {
        fetch(api, {method: 'delete'});
        setList(list.filter(item => !item.done));
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <Template 
                    isLoading={isLoading}
                    list={list} 
                    clear={clear} />
            ),
            children: [
                {
                    path: "/",
                    element: (
                        <App 
                            list={list}
                            add={add}
                            remove={remove}
                            toggle={toggle}
                            clear={clear} />
                    ),
                },
                {
                    path: "/edit",
                    element: (
                        <Edit update={update} />
                    )
                }
            ]
        }
    ]);

    return <RouterProvider router={router} />;
}
