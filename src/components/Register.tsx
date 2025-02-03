import React, { useEffect, useState } from "react";
import RegisterImage from "../assets/register-image.png";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  function HandleEmailChange(e) {
    setEmail(e.target.value);
  }
  function HandlePasswordChange(e) {
    setPassword(e.target.value);
  }
  function HandleNameChange(e) {
    setName(e.target.value);
  }
  const handleRegister = async () => {
    try {
      await register(email, password, name);
      toast.success("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/Login"), 2000);
    } catch (error: any) {
      console.log("registration failed " + error.message);
      toast.error(error.message);
    }
  };
  const handleClickLogin = async () => {
    navigate("/login");
  };
  return (
    <main className="pt-8 px-8 pb-4 flex flex-col items-center justify-center w-full gap-1">
      <div className="bg-white w-1/2 h-1/2 flex rounded-lg  shadow-lg">
        <div className="w-1/3 flex flex-col items-center justify-center gap-4 bg-gray-200 px-4">
          <img src={RegisterImage} className="w-40 h-40"></img>
          <h1 className="text-xl font-semibold"> Let's get you set up</h1>
          <h3 className="text-sm font-medium text-center">
            It should only take a couple of seconds to start organizing your
            time properly
          </h3>
        </div>
        <div className="w-2/3 flex flex-col gap-5 py-10 px-10">
          <div className="grid items-center gap-5">
            <div className="sm:col-span-4 flex flex-row items-center gap-5">
              <label
                htmlFor="name"
                className="w-1/3 block text-sm/6 font-medium text-gray-900"
              >
                Name
              </label>
              <div className="w-2/3 flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                <input
                  id="name"
                  value={name}
                  onChange={HandleNameChange}
                  name="name"
                  type="text"
                  placeholder="your name"
                  className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-4 flex flex-row items-center gap-5">
              <label
                htmlFor="email"
                className="w-1/3 block text-sm/6 font-medium text-gray-900"
              >
                Email
              </label>
              <div className="w-2/3 flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                <input
                  id="email"
                  value={email}
                  onChange={HandleEmailChange}
                  name="email"
                  type="email"
                  placeholder="your email address"
                  className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-4 flex flex-row items-center gap-5">
              <label
                htmlFor="password"
                className="w-1/3 block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
              <div className="w-2/3 flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                <input
                  id="password"
                  value={password}
                  onChange={HandlePasswordChange}
                  name="password"
                  type="password"
                  placeholder=""
                  className=" block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
          <button className="mt-5 hover:font-bold" onClick={handleRegister}>
            Register
          </button>
          <h3 className="text-sm font-normal text-center">
            Already have an accout?
            <button
              className="text-sm font-bold text-center "
              onClick={handleClickLogin}
            >
              Login Here
            </button>
          </h3>
        </div>
      </div>
    </main>
  );
};
