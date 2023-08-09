const taskForm = document.getElementById('taskForm');

taskForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const content = document.getElementById('content').value;

    if (content) {
        const data = {
            content: content,
            done: false
        };

        try {
            const response = await fetch('/add_task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();
            console.log(responseData.message);

            // Clear the form and update the task list if needed
            document.getElementById('content').value = '';
            fetchTaskList();
        } catch (error) {
            console.error('Error adding task:', error);
        }
    }
});
