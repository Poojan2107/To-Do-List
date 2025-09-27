import { useEffect, useState } from 'react'

const API_BASE = ''

const Alert = ({ type = 'success', message, onClose }) => {
  if (!message) return null
  return (
    <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
      {message}
      <button type="button" className="btn-close" onClick={onClose}></button>
    </div>
  )
}

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    await onAdd({ title: title.trim(), description })
    setTitle('')
    setDescription('')
  }

  return (
    <form onSubmit={handleSubmit} className="card card-body mb-3">
      <div className="row g-2 align-items-end">
        <div className="col-md-4">
          <label className="form-label">Title</label>
          <input className="form-control" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter task title" />
        </div>
        <div className="col-md-6">
          <label className="form-label">Description</label>
          <input className="form-control" value={description} onChange={e => setDescription(e.target.value)} placeholder="Optional description" />
        </div>
        <div className="col-md-2 d-grid">
          <button className="btn btn-primary" type="submit">Add Task</button>
        </div>
      </div>
    </form>
  )
}

const TaskItem = ({ task, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description || '')

  const saveEdit = async () => {
    await onUpdate(task._id, { title, description })
    setIsEditing(false)
  }

  return (
    <li className="list-group-item">
      <div className="d-flex align-items-center justify-content-between gap-2">
        <div className="form-check flex-grow-1">
          <input className="form-check-input" type="checkbox" checked={!!task.completed} onChange={() => onToggle(task)} id={`check-${task._id}`} />
          {isEditing ? (
            <div className="row g-2 mt-2">
              <div className="col-md-5">
                <input className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
              </div>
              <div className="col-md-7">
                <input className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
              </div>
            </div>
          ) : (
            <label className={`form-check-label ms-2 ${task.completed ? 'text-decoration-line-through text-muted' : ''}`} htmlFor={`check-${task._id}`}>
              <strong>{task.title}</strong>
              {task.description && <span className="ms-2 text-secondary">- {task.description}</span>}
            </label>
          )}
        </div>
        <div className="btn-group">
          {isEditing ? (
            <>
              <button className="btn btn-sm btn-success" onClick={saveEdit}>Save</button>
              <button className="btn btn-sm btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
            </>
          ) : (
            <>
              <button className="btn btn-sm btn-outline-secondary" onClick={() => setIsEditing(true)}>Edit</button>
              <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(task._id)}>Delete</button>
            </>
          )}
        </div>
      </div>
    </li>
  )
}

export default function App() {
  const [tasks, setTasks] = useState([])
  const [alert, setAlert] = useState({ type: 'success', message: '' })

  const showAlert = (type, message) => setAlert({ type, message })

  const fetchTasks = async () => {
    const res = await fetch(`${API_BASE}/api/tasks`)
    const data = await res.json()
    if (data.ok) setTasks(data.data)
  }

  useEffect(() => { fetchTasks() }, [])

  const addTask = async (payload) => {
    const res = await fetch(`${API_BASE}/api/tasks`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const data = await res.json()
    if (data.ok) { showAlert('success', 'Task added successfully'); setTasks(prev => [data.data, ...prev]) }
    else { showAlert('danger', data.message || 'Failed to add task') }
  }

  const deleteTask = async (id) => {
    const res = await fetch(`${API_BASE}/api/tasks/${id}`, { method: 'DELETE' })
    const data = await res.json()
    if (data.ok) { showAlert('warning', 'Task deleted'); setTasks(prev => prev.filter(t => t._id !== id)) }
    else { showAlert('danger', data.message || 'Failed to delete task') }
  }

  const updateTask = async (id, update) => {
    const res = await fetch(`${API_BASE}/api/tasks/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(update) })
    const data = await res.json()
    if (data.ok) { showAlert('info', 'Task updated'); setTasks(prev => prev.map(t => (t._id === id ? data.data : t))) }
    else { showAlert('danger', data.message || 'Failed to update task') }
  }

  const toggleTask = async (task) => { await updateTask(task._id, { completed: !task.completed }) }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <span className="navbar-brand">Todo List</span>
        </div>
      </nav>
      <main className="container my-4">
        <Alert type={alert.type} message={alert.message} onClose={() => setAlert({ ...alert, message: '' })} />
        <TaskForm onAdd={addTask} />
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <span>Tasks</span>
            <div className="btn-group">
              <button className="btn btn-sm btn-primary" onClick={fetchTasks}>🔄 Refresh</button>
              <button className="btn btn-sm btn-secondary" onClick={() => window.location.reload()}>🔄 Reload</button>
            </div>
          </div>
          <ul className="list-group list-group-flush">
            {tasks.length === 0 ? (
              <li className="list-group-item text-center empty-state">No tasks yet</li>
            ) : (
              tasks.map(task => (
                <TaskItem key={task._id} task={task} onToggle={toggleTask} onDelete={deleteTask} onUpdate={updateTask} />
              ))
            )}
          </ul>
        </div>
      </main>
    </div>
  )
}
