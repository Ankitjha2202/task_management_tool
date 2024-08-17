import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

interface User {
  id: string;
  email: string;
}

const Dashboard: FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [taskCount, setTaskCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;

        if (!user) {
          router.push('/login');
          return;
        }
        console.log(user)
        // setUser(user);

        const { count, error: taskError } = await supabase
          .from('tasks')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        if (taskError) throw taskError;
        setTaskCount(count || 0);
      } catch (error: any) {
        setError('Failed to load data. Please try again later.');
        console.error('Error fetching data:', error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/login');
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div role="status" aria-label="Loading...">
          <svg
            className="animate-spin h-5 w-5 text-gray-500"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></circle>
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Task Manager</h1>
          <div>
            <Link href="/profile">
              <span
                className="text-blue-600 hover:text-blue-800 mr-4 cursor-pointer"
                aria-label="Profile"
              >
                Profile
              </span>
            </Link>
            <button
              onClick={handleLogout}
              className="text-blue-600 hover:text-blue-800 cursor-pointer"
              aria-label="Logout"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Welcome, {user?.email}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Create New Task</h3>
            <Link href="/createtasks">
              <span
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                aria-label="Create New Task"
              >
                New Task
              </span>
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Your Tasks</h3>
            <p className="mb-2">You have {taskCount} tasks.</p>
            <Link href="/tasks">
              <span
                className="text-blue-600 hover:text-blue-800 cursor-pointer"
                aria-label="View All Tasks"
              >
                View All Tasks
              </span>
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