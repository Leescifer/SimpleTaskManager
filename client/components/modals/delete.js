"use client";
import { deleteTask } from "@/hooks/taskService";

export default function DeleteTaskModal({ open, onClose, onSuccess, task }) {
    if (!open || !task) return null;

    const handleDelete = async () => {
        await deleteTask(task.id);
        onSuccess();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-96 shadow">
                <h2 className="text-lg font-bold mb-4">Delete Task</h2>
                <p>Are you sure you want to delete <strong>{task.title}</strong>?</p>
                <div className="flex justify-end gap-2 mt-4">
                    <button onClick={onClose} className="px-3 py-1 rounded bg-gray-200">
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-3 py-1 rounded bg-red-500 text-white"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
