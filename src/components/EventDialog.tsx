import React, { useState } from "react";
import { EventItem } from "../types";

export default function EventDialog({
  date,
  onClose,
  onSave
}: {
  date: string;
  onClose: ()=>void;
  onSave: (e: EventItem)=>void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const save = () => {
    if (!title.trim()) return alert("Please enter a title");
    const e: EventItem = {
      id: "ev-" + Date.now().toString(36),
      title: title.trim(),
      date,
      description: description.trim()
    };
    onSave(e);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg p-4 z-10 w-full max-w-md">
        <div className="text-lg font-semibold mb-2">Create event — {date}</div>
        <div className="space-y-2">
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full px-3 py-2 border rounded bg-transparent" />
          <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description (optional)" className="w-full px-3 py-2 border rounded bg-transparent" />
        </div>

        <div className="mt-3 flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 rounded border">Cancel</button>
          <button onClick={save} className="px-3 py-1 rounded bg-sky-600 text-white">Save</button>
        </div>
      </div>
    </div>
  );
}
