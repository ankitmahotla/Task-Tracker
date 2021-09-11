import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState } from 'react'
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";
import { BrowserRouter as Router, Route } from 'react-router-dom'

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Doctors Appointment',
      day: 'Feb 5th at 2:30pm',
      reminder: true,
    },
    {
      id: 2,
      text: 'Meeting at School',
      day: 'Feb 6th at 1:30pm',
      reminder: true,
    },
    {
      id: 3,
      text: 'Food Shopping',
      day: 'Feb 5th at 2:30pm',
      reminder: false,
    },
  ])

  const addTask = (task) => {
    const id = Math.floor(Math.random() * 1000) + 1
    const newTask = { id, ...task }
    setTasks([...tasks, newTask])
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleReminder = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, reminder: !task.reminder } : task))
  }

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        <Route path='/' exact render={(props) => (
          <>
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ? (
              <Tasks onToggle={toggleReminder} tasks={tasks} onDelete=
                {deleteTask} />) : ('No Tasks To Show')}
          </>
        )}
        />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
