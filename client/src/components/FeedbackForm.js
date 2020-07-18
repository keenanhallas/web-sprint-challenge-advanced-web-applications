import React, { useState } from "react";
import axios from "axios";

export const ContactForm = () => {
    const initialState = {
        name: "",
        email: "",
        comment: ""
    };
    
    const [formState, setFormState] = useState(initialState);
    const [comments, setComments] = useState([]);

    const handleChange = e => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
        console.log(formState);
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log("Feedback submitted!")
        axios.post("https://reqres.in/api/comments", formState)
            .then(res => {
                setComments([...comments, res.data])
            })
            .catch(err => {
                console.log({err})
            });
    }

    return (
        <div style={{display: "flex", flexDirection: "column", margin: "0 auto"}}>
            <h2>Please leave us feedback!</h2>
            <form style={{display: "flex", flexDirection: "column", alignItems: "center", margin: "0 auto"}}>
                <label htmlFor="name">Name: </label>
                <input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                />
                <label htmlFor="email">Email: </label>
                <input
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                />
                <label htmlFor="comment">Comment: </label>
                <input
                    type="textarea"
                    id="comment"
                    name="comment"
                    value={formState.comment}
                    onChange={handleChange}
                />
                <button onClick={handleSubmit}>Leave feedback</button>
            </form>
            <h2>Feedback:</h2>
            <div>
                {comments.map((comment, i) => {
                    return (
                        <div key={i} style={{border: "1px solid black", width: "70%", margin: "0 auto"}}>
                            <h3>Name: {comment.name}</h3>
                            <h4>Comment: {comment.comment}</h4>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}