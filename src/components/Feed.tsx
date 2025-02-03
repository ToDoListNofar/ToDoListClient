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
import { getUserTasks, removeTask } from "../services/taskService";
import { logout } from "../services/authService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export const Feed = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  //fetch tasks from mysql db
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const user_id = localStorage.getItem("userId");
        if (!user_id) {
          toast.error("User ID not found. Please log in again.");
          return;
        }

        const tasksList = await getUserTasks(Number(user_id));
        setTasks(tasksList);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast.error("Failed to load tasks. Please try again later.");
      }
    };

    fetchTasks();
  }, [tasks]);

  const addTask = (newTask: Task) => {
    console.log("task added succesfully");
    closeModal();
  };

  const handleRemoveTask = async (taskId: number) => {
    try {
      await removeTask(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error removing task:", error);
    }
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
  const handleLogout = async () => {
    await logout;
    navigate("/login");
  };
  return (
    <main className="pt-8 px-8 pb-4 flex flex-col items-center justify-center w-full gap-1">
      <button
        onClick={handleLogout}
        className="flex items-center gap-1 mb-3 hover:underline"
      >
        Logout
      </button>
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
            key={task.id}
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
              className="absolute  top-4 right-4 text-gray-500 hover:text-black"
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
