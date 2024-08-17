import { FC } from 'react';
import { useRouter } from 'next/router';

const TaskDetail: FC = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="mb-4 text-4xl font-bold text-gray-800">Task Detail for {id}</h1>
      {/* Detailed task information */}
      <div className="p-6 bg-white rounded shadow">
        <p>Task description and details...</p>
      </div>
    </div>
  );
};

export default TaskDetail;
