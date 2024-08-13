import { FC } from 'react';
import Link from 'next/link';

const CreateTask: FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Create New Task</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
            <input type="text" id="title" name="title" className="w-full px-3 py-2 border rounded-lg" />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
            <textarea id="description" name="description" rows="4" className="w-full px-3 py-2 border rounded-lg"></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="deadline" className="block text-gray-700 font-bold mb-2">Deadline</label>
            <input type="date" id="deadline" name="deadline" className="w-full px-3 py-2 border rounded-lg" />
          </div>
          <div className="mb-4">
            <label htmlFor="priority" className="block text-gray-700 font-bold mb-2">Priority</label>
            <select id="priority" name="priority" className="w-full px-3 py-2 border rounded-lg">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
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