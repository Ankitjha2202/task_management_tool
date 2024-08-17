// src/pages/api/tasks/create.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '~/lib/supabaseClient';

const createTask = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { title, description, status, priority, due_date, user_id } = req.body;
      console.log(user_id)
      // Validate user_id is provided
      if (!user_id) {
        throw new Error('User ID is required');
      }

      // Insert the task into the database
      const { error: insertError } = await supabase
        .from('tasks')
        .insert({
          title,
          description,
          status,
          priority,
          due_date,
          user_id, // Use the user ID from the request body
        });

      if (insertError) {
        throw insertError;
      }

      res.status(200).json({ message: 'Task created successfully' });
    } catch (error: any) {
      console.error('Error creating task:', error.message);
      res.status(500).json({ error: 'Failed to create task' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default createTask;
