import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { NewTask } from "../types/task";

export const AddTask = ({ onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    if (title.length < 4 || description.length < 4) {
      toast.error("Please fill in all fields correctly.");
      return;
    }

    const newTask: NewTask = {
      title: title,
      description: description,
      completed: false,
    };

    onSave(newTask);
    setTitle("");
    setDescription("");
    toast.success("Task added successfully!");
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
      <div className="flex flex-col gap-10 justify-start">
        <div className="sm:col-span-4 flex flex-row items-center gap-5">
          <label
            htmlFor="title"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Title
          </label>
          <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
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
            className="block text-sm/6 font-medium text-gray-900"
          >
            Description
          </label>
          <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
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
      <div className="flex justify-end">
        <button onClick={handleSave} className=" hover:font-bold">
          Save
        </button>
      </div>
    </main>
  );
};
