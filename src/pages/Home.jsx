import { useNavigate } from "react-router";
import DeleteButton from "../components/shared/DeleteButton";
import EditButton from "../components/shared/EditButton";
import { useContext, useEffect, useState } from "react";
import { GlobalStore } from "../stores/MainStore";
import axios from "axios";
import TodoSkeleton from "../components/TodoSkeleton";
import ErrorMessage from "../feedback/Errors/ErrorMessage";
import toast from "react-hot-toast";

export default function Home() {
  // Hooks
  const navigate = useNavigate();
  const { base_url, token, userData } = useContext(GlobalStore);
  // Protected Route
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  // State
  const [todos, setTodos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [todo, setTodo] = useState("");
  const [editId, setEditId] = useState(null);

  // Vars
  const endpoint = "todos";

  // Functions
  async function getTodos() {
    try {
      const response = await axios.get(`${base_url}/${endpoint}`);
      setTodos(response.data.data);
      setError(false);
    } catch (error) {
      setError(true);
    }

    setLoading(false);
  }

  useEffect(() => {
    getTodos();
  }, []);

  const todoSkeletonList = () => {
    return (
      <div>
        <TodoSkeleton />
        <TodoSkeleton />
      </div>
    );
  };

  // // Create Todo
  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   const newTodo = {
  //     name: todo,
  //   };

  //   try {
  //     const res = await axios.post(`${base_url}/${endpoint}`, {
  //       data: newTodo,
  //     });

  //     getTodos();

  //     setTodo("");

  //     toast.success("Task Created Successfully", {
  //       duration: 2000,
  //     });
  //   } catch (error) {
  //     toast.error(error.response.data.error.message, {
  //       duration: 5000,
  //     });
  //   }
  // }
   //update todo
   async function handleSubmit(e) {
  e.preventDefault();

  const newTodo = {
    name: todo,
  };

  try {
    if (editId) {
      await axios.put(`${base_url}/${endpoint}/${editId}`, {
        data: newTodo,
      });

      toast.success("Task Updated Successfully");
      setEditId(null);
    } else {
      await axios.post(`${base_url}/${endpoint}`, {
        data: newTodo,
      });
      toast.success("Task Created Successfully");
    }
    setTodo("");
    getTodos();
  } catch (error) {
    toast.error(
      error.response?.data?.error?.message || "Something went wrong"
    );
  }
}
const editTodo = (id, name) => {
  setTodo(name);
  setEditId(id);
};

  // Delete Todo
  const deleteTodo = async (id) => {
    try {
      const res = await axios.delete(`${base_url}/${endpoint}/${id}`);

      toast.success("Task Deleted Successfully", {
        duration: 3000
      });
      getTodos()
    } catch (error) {
      toast.error(error.response.data.error.message, {
        duration: 5000
      });
    }
  };

  return (
    <div className="h-full flex flex-col gap-8 items-center mt-10">
      <h1 className="text-center text-4xl font-bold">
        Welcome
        <span className="hover:text-sage-primary duration-300">
          {userData?.username}
        </span>
      </h1>

      <form onSubmit={handleSubmit} className="flex gap-4 px-4 w-full">
        <input
          onChange={(e) => {
            setTodo(e.target.value);
          }}
          value={todo}
          type="text"
          placeholder="write your task here.."
          className="grow py-1 px-3 outline-0 border border-sage-secondary hover:border-2 hover:border-sage-primary focus:border-2 focus:border-sage-primary focus:ring-2 focus:ring-sage-secondary/50 rounded-lg "
        />
        {/* <AddButton /> */}
         <button
            type="submit"
            className="bg-sage-button hover:bg-sage-primary active:bg-sage-text text-sage-background px-5 py-2 rounded-lg transition-colors duration-200"
           >
            {editId ? "Update Task" : "Add Task"}
          </button>
      </form>

      <div className="tasks w-full flex flex-col gap-4">
        {loading ? (
          todoSkeletonList()
        ) : error ? (
          <ErrorMessage />
        ) : (
          todos.map(({ id, documentId, name }) => (
            <div
              key={documentId}
              className="group/parent task flex justify-between items-center bg-sage-secondary/20 border border-sage-secondary/50 shadow rounded-lg p-4"
            >
              <h2 className="relative overflow-hidden font-bold text-lg tracking-wide uppercase">
                {name}
                <span className="absolute bottom-0 right-full group-hover/parent:right-0 duration-300 block w-full h-0.5 bg-sage-button"></span>
              </h2>
              <div className="icons flex items-center gap-2">
                {/* <EditButton /> */}
                <EditButton
                handleClick={() => editTodo(documentId, name)}
                 />
                <DeleteButton id={documentId} handleClick={deleteTodo} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
