import { FC, useState } from 'react';
import Link from 'next/link';
import { showError } from 'appUtils/showError';
import { showSuccess } from 'appUtils/showSuccess';
import { supabase } from '~/lib/supabaseClient';

const CreateTask: FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [priority, setPriority] = useState('low');
  const [dueDate, setDueDate] = useState<string | undefined>('');
  const [userId, setUserId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        throw new Error('Failed to retrieve user information');
      }

      setUserId(user.id);
      
      const response = await fetch('/api/tasks/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          status,
          priority,
          due_date: dueDate,
          user_id: user.id, 
        }),
      });

      if (!response.ok) {
        showError('Failed to create task');
        throw new Error('Failed to create task');
      }

      showSuccess('Task successfully created!');
    } catch (error: any) {
      console.error('Error creating task:', error);
      showError('Failed to create task. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Create New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border rounded-lg"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="due_date" className="block text-gray-700 font-bold mb-2">Due Date</label>
            <input
              type="date"
              id="due_date"
              name="due_date"
              value={dueDate || ''}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="priority" className="block text-gray-700 font-bold mb-2">Priority</label>
            <select
              id="priority"
              name="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block text-gray-700 font-bold mb-2">Status</label>
            <select
              id="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create Task
          </button>
        </form>
        <div className="mt-4">
          <Link href="/dashboard">
            <span className="text-blue-600 hover:text-blue-800 cursor-pointer">Back to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
