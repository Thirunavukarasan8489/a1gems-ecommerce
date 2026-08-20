'use client';

import { useState } from 'react';
import { Clock, Plus, User } from 'lucide-react';
import { addLeadNote } from '@/lib/actions/admin-leads';

interface Note {
  _id: string;
  content: string;
  addedBy?: string;
  createdAt: string;
}

export default function LeadTimeline({ leadId, notes = [] }: { leadId: string, notes: Note[] }) {
  const [newNote, setNewNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    
    setIsSubmitting(true);
    setError('');
    
    const result = await addLeadNote(leadId, newNote);
    
    if (result.success) {
      setNewNote('');
    } else {
      setError(result.error || 'Failed to add note');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm">
      <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Clock size={18} className="text-slate-400" />
          Timeline & Notes
        </h2>
      </div>
      
      <div className="p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
        <form onSubmit={handleAddNote} className="flex flex-col gap-3">
          <textarea 
            placeholder="Add a private note or log a call..."
            rows={3}
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex justify-end">
            <button 
              type="submit" 
              disabled={isSubmitting || !newNote.trim()}
              className="bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white px-4 py-2 rounded-md text-sm transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <Plus size={16} /> Add Note
            </button>
          </div>
        </form>
      </div>
      
      <div className="p-5">
        {notes.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-6">No notes or activities yet.</p>
        ) : (
          <ul className="space-y-6 relative before:absolute before:inset-y-0 before:left-3.5 before:w-px before:bg-slate-200 dark:before:bg-slate-800">
            {notes.slice().reverse().map((note, index) => (
              <li key={note._id || index} className="relative pl-10">
                <span className="absolute left-1 top-1 size-5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 flex items-center justify-center ring-4 ring-white dark:ring-slate-900">
                  <User size={10} className="text-slate-500" />
                </span>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 mb-1">
                    {new Date(note.createdAt).toLocaleString()}
                  </span>
                  <div className="bg-slate-50 dark:bg-slate-800/80 rounded-md p-3 border border-slate-100 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300">
                    {note.content}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
