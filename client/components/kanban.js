"use client";
import { useEffect, useState } from "react";
import { getTasks } from "@/hooks/taskService";
import AddTaskModal from "@/components/modals/addTask";
import EditTaskModal from "@/components/modals/editTask";
import DeleteTaskModal from "@/components/modals/delete";


export default function KanbanBoard() {
    const [tasks, setTasks] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [editTask, setEditTask] = useState(null);
    const [deleteTask, setDeleteTask] = useState(null);

    const statuses = ["pending", "in-progress", "completed"];

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        const data = await getTasks();
        setTasks(data);
    };

    return (
        <div className="grid grid-cols-3 gap-4 p-6">
            {statuses.map((status) => (
                <div key={status} className="bg-gray-100 rounded-xl p-4 shadow">
                    <h2 className="text-lg font-bold capitalize mb-3">{status}</h2>

                    {tasks
                        .filter((t) => t.status === status)
                        .map((task) => (
                            <div
                                key={task._id}
                                className="bg-white p-3 rounded-lg shadow mb-2 flex justify-between items-center"
                            >
                                <div>
                                    <h3 className="font-medium">{task.title}</h3>
                                    <p className="text-sm text-gray-600">{task.description}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setEditTask(task)}
                                        className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => setDeleteTask(task)}
                                        className="text-xs bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        X
                                    </button>
                                </div>
                            </div>
                        ))}

                    <button
                        onClick={() => setShowAdd(true)}
                        className="mt-3 text-xs bg-green-500 text-white px-3 py-1 rounded w-full"
                    >
                        + Add Task
                    </button>
                </div>
            ))}

            {/* Modals */}
            <AddTaskModal open={showAdd} onClose={() => setShowAdd(false)} onSuccess={loadTasks} />
            <EditTaskModal open={!!editTask} onClose={() => setEditTask(null)} onSuccess={loadTasks} task={editTask} />
            <DeleteTaskModal open={!!deleteTask} onClose={() => setDeleteTask(null)} onSuccess={loadTasks} task={deleteTask} />
        </div>
    );
}
