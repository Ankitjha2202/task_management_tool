# TaskManagementApp

![Project Diagram](https://i.postimg.cc/8c5FDRhs/Image-25-08-24-at-12-52-AM.jpg)

TaskManagementApp is a comprehensive task management platform designed to streamline project management activities, from task creation to tracking and assignment. Built with the T3 stack, this application integrates a modern frontend built with Next.js and Tailwind CSS, a serverless backend powered by SST on AWS, and a robust database using Supabase.

## Features

### 1. Task Management Interface
- **Task Creation:** Easily create tasks with detailed descriptions.
- **Assignment:** Assign tasks to team members, set deadlines, and prioritize with tags.
- **Tracking:** Monitor task progress and ensure timely completion.

### 2. User Profile and Project Settings
- **User Profile:** Allows team members to manage their personal information and preferences.
- **Project Settings:** Customize project-specific settings to suit team needs.

## Tech Stack

- **Frontend:** Next.js, Tailwind CSS
- **Backend:** SST (Serverless Stack) on AWS
- **Database:** Supabase with Prisma ORM
- **Authentication:** Supabase Authentication

## Installation

### Prerequisites

- **Node.js** (v14 or later) installed on your local machine.
- **npm** (Node Package Manager) or **Yarn**.

### Clone the Repository

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Ankitjha2202/task_management_tool.git
    ```

2. **Navigate to the project directory:**
    ```bash
    cd task_management_tool
    ```

### Set Up Environment Variables

1. **Create a `.env` file in the root directory.**

2. **Add your Supabase and AWS credentials to the `.env` file.** The file should include entries like:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-url.supabase.co
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
    AWS_ACCESS_KEY_ID=your-access-key-id
    AWS_SECRET_ACCESS_KEY=your-secret-access-key
    ```

### Install Dependencies

1. **Install the necessary dependencies:**
    ```bash
    npm install
    ```
    or, if using Yarn:
    ```bash
    yarn install
    ```

### Run the Development Server

1. **Start the development server:**
    ```bash
    npm run dev
    ```
    or, if using Yarn:
    ```bash
    yarn dev
    ```

2. **Access the application:**
    Open `http://localhost:3000` in your browser.

## Usage

### Task Management

- **Create Tasks:** Use the interface to create new tasks with descriptions.
- **Assign Tasks:** Assign tasks to team members, set deadlines, and add tags.
- **Track Progress:** Monitor the status of tasks and ensure they are completed on time.

### User Profile

- **Update Information:** Modify your personal details and preferences.
- **Manage Settings:** Adjust user-specific settings.

### Project Settings

- **Customize Settings:** Modify project-specific configurations to fit team needs.

## Code Examples

### Task Creation Example

```javascript
// Example function to create a task
async function createTask(taskData) {
    const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
    });
    const data = await response.json();
    return data;
}
