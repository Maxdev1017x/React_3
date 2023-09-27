import { useState } from 'react'
import './App.css'

function App() {
  const [input, setInput] = useState("")
  const [tasks, setTasks] = useState<string[]>([])

  const [editTask, setEditTask] = useState({
    enable: false,
    task: ''
  })

  function handleRegister() {
    if (!input) {
      alert("Insira o nome da tarefa!")
      return
    }
    if(editTask.enable) {
      handleSaveEdit()
      return
    }

    setTasks(tarefas =>[...tarefas, input])
    setInput("")
  }

  function handleSaveEdit() {
    const findIndexTask = tasks.findIndex(task => task === editTask.task)
    const allTasks = [...tasks]

    allTasks[findIndexTask] = input
    setTasks(allTasks)

    setEditTask({
      enable: false,
      task: ''
    })
    setInput("")
  }

  function handleDelete(item: string) {
    const removeTask = tasks.filter(task => task !== item)
    setTasks(removeTask)
    setInput("")
  }

  function handleEdit(item: string) {
    setInput(item)
    setEditTask({
      enable: true,
      task: item
    })
  }

  return (
      <div>
        <h1>Lista de Tarefas</h1>
        <input placeholder="Digite a tarefa..." value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={handleRegister}>{editTask.enable ? "Atualizar tarefa" : "Adicionar tarefa"}</button> 
        <hr />

        {tasks.map((item,) => (
          <section>
            <span>{item}</span>
            <button onClick={() => handleEdit(item)}>Editar</button>
            <button onClick={() => handleDelete(item)}>Excluir</button>
          </section>
        ))}
      </div>
  )
}

export default App
