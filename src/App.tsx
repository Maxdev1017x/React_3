import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import './App.css'

function App() {

  const inputRef = useRef<HTMLInputElement>(null)
  const firstRender = useRef(true)
  const [input, setInput] = useState("")
  const [tasks, setTasks] = useState<string[]>([])

  const [editTask, setEditTask] = useState({
    enable: false,
    task: ''
  })

  useEffect(() => {
    const tarefaSalvas = localStorage.getItem("@maxlist")
  
    if(tarefaSalvas) {
      setTasks(JSON.parse(tarefaSalvas)) //JSON.parse, transforma o texto no storage em Array novamente para ser exibido na tela//
    }
  },[])

  useEffect(() => {
    if(firstRender.current) {
      firstRender.current = false
      return
    }

    localStorage.setItem("@maxlist", JSON.stringify(tasks))
  }, [tasks])


  const handleSaveEdit = useCallback(() => {
    const findIndexTask = tasks.findIndex(task => task === editTask.task);
    const allTasks = [...tasks];
  
    allTasks[findIndexTask] = input;
    setTasks(allTasks);
  
    setEditTask({
      enable: false,
      task: ''
    });
    setInput("");
  }, [tasks, editTask, input]);



  const handleRegister = useCallback(() => {
    if (!input) {
      alert("Insira o nome da tarefa!")
      return
    }
    if(editTask.enable) {
      handleSaveEdit()
      return
    }
  
    setTasks(tarefas => [...tarefas, input])
    setInput("")
  
  }, [input,editTask.enable, handleSaveEdit]);



  function handleDelete(item: string) {
    const removeTask = tasks.filter(task => task !== item)
    setTasks(removeTask)
    setInput("")
  }

  function handleEdit(item: string) {

    inputRef.current?.focus()

    setInput(item)
    setEditTask({
      enable: true,
      task: item
    })
  }



  const totalTarefas = useMemo(() => {
    return tasks.length
  }, [tasks])


  return (
      <div>
        <h1>Lista de Tarefas</h1>
        <input placeholder="Digite a tarefa..." value={input} onChange={(e) => setInput(e.target.value)} ref={inputRef} />
        <button onClick={handleRegister}>{editTask.enable ? "Atualizar tarefa" : "Adicionar tarefa"}</button> 
        <hr />
        <strong>Você tem {totalTarefas} tarefas!</strong>
        <br /><br />

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
