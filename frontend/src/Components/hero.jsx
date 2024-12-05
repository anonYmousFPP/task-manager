import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Hero = () => {
    const [task, setTask] = useState("");
    const [time, setTime] = useState("");

    const [todo, setTodo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const deleteTodo = async (id) => {
        setLoading(true);
        try {
            const response = await axios.delete(`${import.meta.VITE_REACT_APP_BACKEND_BASEURL}/task/delete?id=${id}`);
            // Ensure response.data.response contains the updated list
            if (response.data.response) {
                setTodo(response.data.response);
            } else {
                // Fallback: Remove the deleted item from the state locally
                setTodo((prevTodo) => prevTodo.filter((item) => item._id !== id));
            }
        } catch (error) {
            setError(error.message);
            console.error("Error deleting task:", error);
        } finally {
            setLoading(false); // Always reset loading state
        }
    };


    useEffect(() => {
        axios
            .get(`${import.meta.VITE_REACT_APP_BACKEND_BASEURL}/task/read`)
            .then((response) => {
                const data = response.data.response || [];
                setTodo(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const todoHandler = () => {
        axios({
            url: `${import.meta.VITE_REACT_APP_BACKEND_BASEURL}/task/create`,
            method: 'POST',
            data: { task, time },
        })
            .then((res) => {
                setTodo((prevTodo) => [...prevTodo, res.data]);
            })
            .catch((err) => {
                setError(err.message);
                console.error('Unsuccessful', err.response?.data);
            });
        
        setTask("");
        setTime("");
    };

    return (
        <div className="fixed inset-0 bg-gradient-to-r from-blue-400 to-indigo-600 flex items-center justify-center">
            <div className="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-4xl font-semibold text-center text-indigo-700 mb-8">Task Manager</h1>

                {/* Input Section */}
                <div className="flex flex-col md:flex-row justify-between space-y-6 md:space-y-0 md:space-x-8 mb-8">
                    {/* Task Input */}
                    <div className="flex flex-col items-center w-full md:w-1/2">
                        <h2 className="text-xl font-semibold text-indigo-600 mb-3">Task</h2>
                        <input
                            className="p-3 border border-gray-300 rounded-md w-full"
                            placeholder="Enter Task"
                            type="text"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                        />
                    </div>

                    {/* Time Input */}
                    <div className="flex flex-col items-center w-full md:w-1/2">
                        <h2 className="text-xl font-semibold text-indigo-600 mb-3">Time</h2>
                        <input
                            className="p-3 border border-gray-300 rounded-md w-full"
                            placeholder="Enter Time"
                            type="text"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </div>
                </div>

                {/* Add Task Button */}
                <div className="flex justify-center mb-6">
                    <button
                        onClick={todoHandler}
                        className="w-20 h-20 text-4xl text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition duration-300"
                    >
                        +
                    </button>
                </div>

                {/* Task List Section */}
                <div className="bg-gray-100 p-4 rounded-lg shadow-lg max-h-96 overflow-y-auto">
                    {/* Header Row */}
                    <div className="flex justify-between sticky top-0 bg-gray-100 p-2">
                        <h3 className="text-2xl font-semibold text-indigo-600 flex-1">My To-Do List</h3>
                        <h3 className="text-2xl font-semibold text-indigo-600 flex-1 text-center">Time</h3>
                        <h3 className="text-2xl font-semibold text-indigo-600 flex-1 text-center">Delete</h3>
                    </div>

                    {/* Task Rows */}
                    {loading ? (
                        <div className="text-center text-lg text-gray-600">Loading tasks...</div>
                    ) : error ? (
                        <div className="text-center text-lg text-red-600">Error: {error}</div>
                    ) : (Array.isArray(todo) && todo.length > 0) ? (
                        todo.map((item) => (
                            <div
                                key={item._id}
                                className="flex justify-between items-center p-3 border-b border-gray-300"
                            >
                                <span className="text-lg text-gray-800 flex-1">{item.task}</span>
                                <span className="text-lg text-gray-600 flex-1 text-center">{item.time}</span>
                                <button onClick={() => deleteTodo(item._id)} className="flex-1 text-center text-2xl border-red-500 border-3 font-mono font-black text-red-500 hover:text-red-700 hover:border-red-700">-</button>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-lg text-gray-600">No tasks available</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Hero;
