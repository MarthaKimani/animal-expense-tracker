import React, { useState, useEffect } from 'react';

const Tasks = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Morning Feeding',
      type: 'Feeding',
      assignedTo: 'Worker 1',
      dueDate: '2024-07-21',
      dueTime: '06:00',
      priority: 'High',
      status: 'Pending',
      recurrence: 'Daily',
      notes: 'Feed all animals in main barn'
    },
    {
      id: 2,
      title: 'Vaccination - Bessie',
      type: 'Medical',
      assignedTo: 'Veterinarian',
      dueDate: '2024-07-22',
      dueTime: '10:00',
      priority: 'Medium',
      status: 'Scheduled',
      recurrence: 'Once',
      notes: 'Annual brucellosis vaccination'
    }
  ]);

  const [newTask, setNewTask] = useState({
    title: '',
    type: 'Feeding',
    assignedTo: '',
    dueDate: '',
    dueTime: '08:00',
    priority: 'Medium',
    recurrence: 'Once',
    notes: ''
  });

  const [todayTasks, setTodayTasks] = useState([]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayTasksList = tasks.filter(task => 
      task.dueDate === today && task.status !== 'Completed'
    );
    setTodayTasks(todayTasksList);
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    const task = {
      id: Date.now(),
      ...newTask,
      status: 'Pending'
    };
    setTasks([...tasks, task]);
    setNewTask({
      title: '',
      type: 'Feeding',
      assignedTo: '',
      dueDate: '',
      dueTime: '08:00',
      priority: 'Medium',
      recurrence: 'Once',
      notes: ''
    });
  };

  const completeTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: 'Completed' } : task
    ));
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Task & Reminder System</h1>
      </div>

      {/* Today's Tasks */}
      <div className="dashboard-card">
        <h3>📋 Today's Tasks ({todayTasks.length})</h3>
        <div className="card-body">
          {todayTasks.length > 0 ? (
            todayTasks.map(task => (
              <div key={task.id} className="task-item">
                <div className="task-info">
                  <input 
                    type="checkbox" 
                    onChange={() => completeTask(task.id)}
                    checked={task.status === 'Completed'}
                  />
                  <div>
                    <strong>{task.title}</strong>
                    <span>Assigned to: {task.assignedTo} | Due: {task.dueTime}</span>
                    <small>Priority: <span className={`priority-${task.priority.toLowerCase()}`}>{task.priority}</span></small>
                  </div>
                </div>
                <div className="task-actions">
                  <span className={`task-type type-${task.type.toLowerCase()}`}>
                    {task.type}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p>No tasks scheduled for today. Great job! 🎉</p>
          )}
        </div>
      </div>

      {/* Add New Task */}
      <div className="form-card">
        <h3>Add New Task</h3>
        <form onSubmit={addTask}>
          <div className="form-row">
            <div className="form-group">
              <label>Task Title *</label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                placeholder="e.g., Morning Feeding, Cleaning, etc."
                required
              />
            </div>
            <div className="form-group">
              <label>Task Type</label>
              <select
                value={newTask.type}
                onChange={(e) => setNewTask({...newTask, type: e.target.value})}
              >
                <option value="Feeding">Feeding</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Medical">Medical</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Assigned To</label>
              <input
                type="text"
                value={newTask.assignedTo}
                onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}
                placeholder="Worker name"
              />
            </div>
            <div className="form-group">
              <label>Due Date *</label>
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Due Time</label>
              <input
                type="time"
                value={newTask.dueTime}
                onChange={(e) => setNewTask({...newTask, dueTime: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Priority</label>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
              value={newTask.notes}
              onChange={(e) => setNewTask({...newTask, notes: e.target.value})}
              rows="3"
              placeholder="Additional details..."
            />
          </div>

          <button type="submit" className="btn btn-success">Add Task</button>
        </form>
      </div>

      {/* All Tasks */}
      <div className="table-card">
        <h3>All Tasks</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Assigned To</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>
                  <span className={`task-type type-${task.type.toLowerCase()}`}>
                    {task.type}
                  </span>
                </td>
                <td>{task.assignedTo}</td>
                <td>{task.dueDate} {task.dueTime}</td>
                <td>
                  <span className={`priority priority-${task.priority.toLowerCase()}`}>
                    {task.priority}
                  </span>
                </td>
                <td>
                  <span className={`status status-${task.status.toLowerCase()}`}>
                    {task.status}
                  </span>
                </td>
                <td>
                  <button 
                    className="btn btn-sm btn-success"
                    onClick={() => completeTask(task.id)}
                    disabled={task.status === 'Completed'}
                  >
                    Complete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tasks;