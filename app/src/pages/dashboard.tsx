import { FC } from 'react';
import Link from 'next/link';

const Dashboard: FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Task Manager</h1>
          <div>
            <Link href="/profile">
              <span className="text-blue-600 hover:text-blue-800 mr-4 cursor-pointer">Profile</span>
            </Link>
            <Link href="/login">
              <span className="text-blue-600 hover:text-blue-800 cursor-pointer">Logout</span>
            </Link>
          </div>
        </div>
      </nav>
      
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Create New Task</h3>
            <Link href="/createtasks">
              <span className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                New Task
              </span>
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Your Tasks</h3>
            <Link href="/tasks">
              <span className="text-blue-600 hover:text-blue-800 cursor-pointer">View All Tasks</span>
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Project Overview</h3>
            <p>Project statistics will be displayed here.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;