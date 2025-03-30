"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TaskList from "@/components/TaskList";
import { fetchTasks, addTask, deleteTask } from "@/services/api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchTasks().then(setTasks);
  }, []);

  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    const task = await addTask(newTask);
    setTasks([...tasks, task]);
    setNewTask("");
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">Task Manager</h1>
        <div className="flex gap-2 mb-4">
          <Input value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Enter a task" />
          <Button onClick={handleAddTask}>Add</Button>
        </div>
        <TaskList tasks={tasks} onDelete={handleDeleteTask} />
        <Button onClick={() => router.push('/login')} className="mt-4 w-full bg-red-500 hover:bg-red-700">Logout</Button>
      </div>
    </div>
  );
}
