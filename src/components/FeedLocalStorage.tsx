import React, { useEffect, useState } from "react";
import { FaRegPlusSquare } from "react-icons/fa";
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdOutlineModeEdit,
} from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";
import { HiOutlineSave } from "react-icons/hi";
import { Task } from "../types/task";
import { AddTask } from "./AddTask";

export const Feed = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  /* Load tasks from localStorage*/
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("tasks") || "[]");
    if (storedTodos.length) {
      setTasks(storedTodos);
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask: Task) => {
    console.log("task added");
    setTasks([...tasks, newTask]);
    closeModal();
  };

  const handleRemoveTask = (index: number) => {
    const newTodos = tasks.filter((_, i) => i !== index);
    setTasks(newTodos);
  };

  const toggleTaskCompletion = (index: number) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };
  const handleEditInputChange = (
    value: string,
    field: keyof Task,
    index: number
  ) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, [field]: value } : task
    );
    setTasks(updatedTasks);
  };

  const handleEditTask = (index: number) => {
    const editTodo = tasks.map((task, i) => i === index);
    setEditingIndex(index);
  };
  const handleSaveTask = (index: number) => {
    setEditingIndex(null);
  };
  return (
    <main className="pt-8 px-8 pb-4 flex flex-col items-center justify-center w-full gap-1">
      <h1 className="text-5xl font-semibold mb-8">To Do List</h1>
      <button
        onClick={openModal}
        className="flex items-center gap-1 mb-3 hover:underline"
      >
        <span className="text-xl font-bold">New Task</span>
        <FaRegPlusSquare className="size-8" />
      </button>

      <ul className="task-container flex flex-col gap-5 w-full justify-center items-center">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="flex flex-row items-center gap-3 border-black border rounded-lg w-1/2 py-2 px-4"
          >
            <button onClick={() => toggleTaskCompletion(index)}>
              {task.completed ? (
                <MdCheckBox className="size-8" />
              ) : (
                <MdCheckBoxOutlineBlank className="size-8" />
              )}
            </button>
            <div className="flex flex-col flex-1">
              {editingIndex === index ? (
                <>
                  <input
                    type="text"
                    value={task.title}
                    onChange={(e) =>
                      handleEditInputChange(e.target.value, "title", index)
                    }
                    className="text-2xl font-semibold bg-white border "
                  />
                  <textarea
                    value={task.description}
                    onChange={(e) =>
                      handleEditInputChange(
                        e.target.value,
                        "description",
                        index
                      )
                    }
                    className="text-xl bg-white"
                  />
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-semibold">{task.title}</h3>
                  <p className="text-xl">{task.description}</p>
                </>
              )}
            </div>
            {editingIndex === index ? (
              <button onClick={() => handleSaveTask(index)}>
                <HiOutlineSave className="size-6" />
              </button>
            ) : (
              <div className="flex flex-col gap-4">
                {editingIndex === index ? (
                  <button onClick={() => handleSaveTask(index)}>
                    <HiOutlineSave className="size-6" />
                  </button>
                ) : (
                  <div className="flex flex-col gap-4">
                    <button onClick={() => handleEditTask(index)}>
                      <MdOutlineModeEdit className="size-6" />
                    </button>
                    <button onClick={() => handleRemoveTask(task.id)}>
                      <FiTrash2 className="size-6" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 max-w-lg">
            <button
              onClick={closeModal}
              className="absolute top-1/3 right-1/2 text-gray-500 hover:text-black"
            >
              ✖
            </button>
            <AddTask onSave={addTask} />
          </div>
        </div>
      )}
    </main>
  );
};
