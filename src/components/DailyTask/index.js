import {useState, useEffect} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'

const DailyTask = () => {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('dailyTasks')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('dailyTasks', JSON.stringify(tasks))
  }, [tasks])

  const handleAddTask = () => {
    const trimmed = task.trim()
    if (trimmed !== '') {
      const newTask = {
        id: uuidv4(),
        task: trimmed,
        completed: false,
      }
      setTasks([...tasks, newTask])
      setTask('')
    }
  }

  const toggleComplete = id => {
    const updatedTasks = tasks.map(item =>
      item.id === id ? {...item, completed: !item.completed} : item,
    )
    setTasks(updatedTasks)
  }

  return (
    <div className="daily-task-container">
      <h1>🗓️ Daily Task Planner</h1>
      <div className="task-input-group">
        <input
          className="task-input"
          value={task}
          type="text"
          placeholder="Add a task like 'Solve 2 Leetcode problems'"
          onChange={e => setTask(e.target.value)}
        />
        <button
          type="button"
          className="add-task-button"
          onClick={handleAddTask}
        >
          Add
        </button>
      </div>
      <ul className="task-list">
        {tasks.map(item => (
          <li
            key={item.id}
            className={`task-item ${item.completed ? 'completed' : ''}`}
          >
            <label>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleComplete(item.id)}
              />
              <span className="task-text">{item.task}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DailyTask
