"use client";
import { useState, useEffect } from "react";
import { updateTask } from "@/hooks/taskService";

export default function EditTaskModal({ open, onClose, onSuccess, task }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("pending");

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setStatus(task.status);
        }
    }, [task]);

    if (!open || !task) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateTask(task.id, { title, description, status });
        onSuccess();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-96 shadow">
                <h2 className="text-lg font-bold mb-4">Edit Task</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        type="text"
                        className="border p-2 rounded"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        className="border p-2 rounded"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <select
                        className="border p-2 rounded"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="px-3 py-1 rounded bg-gray-200">
                            Cancel
                        </button>
                        <button type="submit" className="px-3 py-1 rounded bg-[#E5C07B] text-white">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
