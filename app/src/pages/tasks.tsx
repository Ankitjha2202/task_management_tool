import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface User extends SupabaseUser {}

interface Task {
  id: number;
  title: string;
  priority: string;
  due_date: string | null;
}

const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'Not set';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const Tasks: FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: { user: fetchedUser }, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;
        if (!fetchedUser) {
          router.push('/login');
          return;
        }
        setUser(fetchedUser as User);

        const { data: tasksData, error: tasksError } = await supabase
          .from('tasks')
          .select('id, title, priority, due_date')
          .eq('user_email', fetchedUser.email);

        if (tasksError) throw tasksError;
        setTasks(tasksData);
      } catch (error: any) {
        setError('Failed to load data. Please try again later.');
        console.log("This is error", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500 border-opacity-50"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-100">
        <p className="text-white text-xl font-semibold bg-blue-600 px-6 py-3 rounded-lg shadow-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-blue-600 mb-8 text-center">Your Tasks</h2>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div key={task.id} className="p-6 border-b last:border-b-0 hover:bg-blue-50 transition duration-300">
                <h3 className="text-2xl font-semibold text-blue-600 mb-2">{task.title}</h3>
                <p className="text-lg text-gray-700 mb-1">Priority: <span className="font-bold">{task.priority}</span></p>
                <p className="text-lg text-gray-700">Deadline: <span className="font-semibold">{formatDate(task.due_date)}</span></p>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-700">
              <p className="text-lg">No tasks available. Please create new tasks.</p>
            </div>
          )}
        </div>
        <div className="mt-6 text-center">
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 text-lg font-medium transition duration-300">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
