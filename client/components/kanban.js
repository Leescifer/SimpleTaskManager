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
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    const statuses = ["pending", "in-progress", "completed"];

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        const data = await getTasks();
        setTasks(data);
    };

    const filteredTasks = tasks.filter((t) => {
        const matchesSearch =
            t.title.toLowerCase().includes(search.toLowerCase()) ||
            t.description.toLowerCase().includes(search.toLowerCase());

        const matchesStatus = filterStatus === "all" || t.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="p-6 space-y-6 bg-[#E5E5E5] min-h-screen text-[#1A1A1A]">
            {/* 🔎 Search & Filter */}
            <div className="flex gap-4 items-center">
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-60 border border-[#B0B0B0] bg-white text-[#1A1A1A] placeholder-[#1A1A1A]/50 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#E5C07B]"
                />
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border border-[#B0B0B0] bg-white text-[#1A1A1A] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#E5C07B]"
                >
                    <option value="all">All</option>
                    {statuses.map((s) => (
                        <option key={s} value={s}>
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            {/* 🗂️ Kanban Board */}
            <div className="grid grid-cols-3 gap-4">
                {statuses.map((status) => (
                    <div
                        key={status}
                        className="bg-[#B0B0B0] border border-[#1A1A1A]/10 rounded-xl p-4 shadow-lg"
                    >
                        <h2 className="text-lg font-bold capitalize mb-3 text-[#1A1A1A]">
                            {status}
                        </h2>

                        {filteredTasks
                            .filter((t) => t.status === status)
                            .map((task) => (
                                <div
                                    key={task.id || task._id}
                                    className="bg-white border border-[#E5C07B]/30 p-3 rounded-lg shadow mb-2 flex justify-between items-center text-[#1A1A1A]"
                                >
                                    <div>
                                        <h3 className="font-semibold">{task.title}</h3>
                                        <p className="text-sm text-[#1A1A1A]/70">{task.description}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setEditTask(task)}
                                            className="text-xs bg-[#E5C07B] text-[#1A1A1A] px-2 py-1 rounded hover:bg-[#D4AF37] transition"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => setDeleteTask(task)}
                                            className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition"
                                        >
                                            X
                                        </button>
                                    </div>
                                </div>
                            ))}

                        <button
                            onClick={() => setShowAdd(true)}
                            className="mt-3 text-xs bg-[#E5C07B] text-[#1A1A1A] font-bold px-3 py-1 rounded w-full hover:bg-[#D4AF37] transition"
                        >
                            + Add Task
                        </button>
                    </div>
                ))}
            </div>

            {/* Modals */}
            <AddTaskModal open={showAdd} onClose={() => setShowAdd(false)} onSuccess={loadTasks} />
            <EditTaskModal open={!!editTask} onClose={() => setEditTask(null)} onSuccess={loadTasks} task={editTask} />
            <DeleteTaskModal open={!!deleteTask} onClose={() => setDeleteTask(null)} onSuccess={loadTasks} task={deleteTask} />
        </div>
    );
}
