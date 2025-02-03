import React, { useEffect } from "react";
import { useState } from "react";
import { NewTask } from "../types/task";
import { addTask } from "../services/taskService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AddTask = ({ onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const user_id = localStorage.getItem("userId");

  const handleSave = async () => {
    if (!user_id) {
      toast.error("User ID not found. Please log in again.");
      return;
    }
    if (title.length < 4 || description.length < 4) {
      toast.error("Please fill in all fields correctly.");
      return;
    }
    const newTask: NewTask = {
      title: title,
      description: description,
      completed: false,
      user_id: Number(user_id),
    };
    try {
      const savedTask = await addTask(newTask);
      toast.success("Task added successfully!");
      onSave(savedTask);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  function HandleTitleChange(e) {
    setTitle(e.target.value);
  }
  function HandleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  return (
    <main className="flex flex-col">
      <div className="my-5 flex items-center justify-center">
        <div className="border-b border-gray-900/10 pb-5">
          <h2 className="text-3xl font-semibold text-gray-900">
            Create New Task
          </h2>
        </div>
      </div>
      <div className="grid items-center gap-5">
        <div className="sm:col-span-4 flex flex-row items-center gap-5">
          <label
            htmlFor="title"
            className="w-1/3 block text-sm/6 font-medium text-gray-900"
          >
            Title
          </label>
          <div className="w-2/3 flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
            <input
              id="title"
              value={title}
              onChange={HandleTitleChange}
              name="title"
              type="text"
              placeholder="your task title"
              className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
            />
          </div>
        </div>

        <div className="sm:col-span-4 flex flex-row items-center gap-5">
          <label
            htmlFor="description"
            className="w-1/3 block text-sm/6 font-medium text-gray-900"
          >
            Description
          </label>
          <div className="w-2/3 flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
            <textarea
              id="description"
              value={description}
              onChange={HandleDescriptionChange}
              name="description"
              placeholder=""
              className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button onClick={handleSave} className=" hover:font-bold">
          Save
        </button>
      </div>
    </main>
  );
};
