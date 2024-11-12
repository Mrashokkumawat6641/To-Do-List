import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { RiEdit2Fill, RiDeleteBin6Fill } from "react-icons/ri";


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }

  }, [])


  const saveToLs = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)

  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos)
    saveToLs()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos)
  }

  const handleAdd = (e) => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLs()

  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLs()
  }
  return (
    <div className='text-gray-700'>
      <Navbar />
      <div className=" container mx-auto my-5 rounded-xl justify-center items-center p-5 bg-violet-100 min-h-screen">
        <div>
          <p className='mx-36 font-bold text-3xl my-10'>iTask - Manage your todos at one place</p>
        </div>
        <div className="addTodo mx-36">
          <h2 className="mx-56 text-lg pb-3 font-bold">Add a Todo</h2>
          <input onChange={handleChange} value={todo} className='py-3 rounded-lg font-bold px-3 text-center mx- w-full' type="text" placeholder='Type New Todo' required />
          <button onClick={handleAdd} disabled={todo.length<=3} className='px-5 font-bold bg-violet-800 hover:bg-violet-950 p-3 py-4 my-8  w-full text-white rounded-xl mx-4  h-[4vh]'>Save</button>
        </div> 
        <input className='px-5 py-6 my-6' onClick={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
        <h2 className='text-xl pt-3 font-bold hover:text-gray-500 cursor-pointer'>Your Todos</h2>
        <div className="todos text-2xl font-bold border-2 px-6 text-white/50">
          {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
          {todos.map(item => {


            return  (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex w-1/2 my-4 justify-between">
              <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id='' />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>

              <div className='buttons'>
                <button onClick={(e) => handleEdit(e, item.id)} className='px-5 font-bold bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-xl mx-4 h-[4vh]'><RiEdit2Fill /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='px-5 font-bold bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-xl mx-4 h-[4vh]'><RiDeleteBin6Fill /></button>
              </div>
            </div>
          })}
        </div>

      </div>
    </div>
  )
}

export default App


