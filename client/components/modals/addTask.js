"use client"

import { useState } from 'react'
import { addTask } from '@/hooks/taskService'

export default function AddTaskModal({ open, onClose, onSuccess }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    if (!open) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addTask({ title, description, status: "pending" });
        setTitle("");
        setDescription("");
        onSuccess();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-96 shadow">
                <h2 className="text-lg font-bold mb-4">Add Task</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        type="text"
                        placeholder="Title"
                        className="border p-2 rounded"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        className="border p-2 rounded"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-3 py-1 rounded bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button type="submit" className="px-3 py-1 rounded bg-[#E5C07B] text-white">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}