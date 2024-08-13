import { FC } from 'react';
import Link from 'next/link';

const Tasks: FC = () => {
  // This would typically come from your database
  const mockTasks = [
    { id: 1, title: 'Complete project proposal', priority: 'high', deadline: '2023-06-30' },
    { id: 2, title: 'Review code changes', priority: 'medium', deadline: '2023-06-25' },
    { id: 3, title: 'Update documentation', priority: 'low', deadline: '2023-07-05' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Your Tasks</h2>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {mockTasks.map((task) => (
            <div key={task.id} className="p-4 border-b last:border-b-0">
              <h3 className="font-bold">{task.title}</h3>
              <p className="text-sm text-gray-600">Priority: {task.priority}</p>
              <p className="text-sm text-gray-600">Deadline: {task.deadline}</p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Link href="/dashboard">
            <span className="text-blue-600 hover:text-blue-800 cursor-pointer">Back to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Tasks;