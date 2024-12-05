import React from "react";
import { Link } from "react-router-dom";
const login = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[400px]">
        <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-6">
          LOGIN
        </h1>

        <div className="flex flex-col space-y-4">
          <input
            className="border-b-2 border-blue-500 text-xl p-2 outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Enter Your Username"
          />
          <input
            className="border-b-2 border-blue-500 text-xl p-2 outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Enter Your Password"
          />
        </div>

        <button className="w-full h-[50px] bg-blue-600 text-lg font-bold rounded-3xl text-white hover:bg-blue-700 mt-6">
          LOGIN
        </button>

        <div className="text-lg mt-4 text-center">
          Not a user?{" "}
          <Link to="/signup" className="text-blue-600 underline hover:text-blue-800">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default login;
