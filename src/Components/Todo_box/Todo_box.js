import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";

const TodoBox = () => {
  const [isButton, setButton] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setTitle] = useState("");
  const [newDescription, setDescription] = useState("");
  const [completeTodos, setCompleteTodos] = useState([]);

  const handleComplete = (index) => {
    let now = new Date();
    let completeOn = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()} at ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    let filteredItem = {
      ...allTodos[index],
      completeOn: completeOn,
    };
    let updatedCompletedArr = [...completeTodos];
    updatedCompletedArr.push(filteredItem);
    setCompleteTodos(updatedCompletedArr);
    handleDelete(index);
    localStorage.setItem("completeTodos", JSON.stringify(updatedCompletedArr));
  };

  const handleAdd = () => {
    if (!newTitle.trim() || !newDescription.trim()) {
      alert("Please enter both a title and a description.");
      return;
    }
    let new_todo_list = {
      title: newTitle,
      description: newDescription,
    };
    let updatedTodo = [...allTodos];
    updatedTodo.push(new_todo_list);
    setTodos(updatedTodo);
    localStorage.setItem("TodoList", JSON.stringify(updatedTodo));
    setTitle("");
    setDescription("");
  };

  const handleDelete = (index) => {
    let deleteTodo = [...allTodos];
    deleteTodo.splice(index, 1);
    localStorage.setItem("TodoList", JSON.stringify(deleteTodo));
    setTodos(deleteTodo);
  };

  const handleDeleteCompleted = (index) => {
    let deleteTodo = [...completeTodos];
    deleteTodo.splice(index, 1);
    localStorage.setItem("completeTodos", JSON.stringify(deleteTodo));
    setCompleteTodos(deleteTodo);
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("TodoList"));
    let savedCompletedTodo = JSON.parse(localStorage.getItem("completeTodos"));
    if (savedTodo) {
      setTodos(savedTodo);
    }
    if (savedCompletedTodo) {
      setCompleteTodos(savedCompletedTodo);
    }
  }, []);

  return (
    <div className="py-[150px] px-[70px] md:px-[50px]">
      <div className=" bg-[#3f4152] w-[370px] md:w-[720px] mx-auto">
        {/* Input Section */}
        <div className="flex flex-col mx-auto md:flex-row items-center justify-center mb-6 md:pt-12">
          <div className="flex flex-col ml-[10px] md:ml-[38px] ">
            <label htmlFor="task1" className="mt-6 md:mt-4 text-white text-4xl">
              Title
            </label>
            <input
              type="text"
              id="task1"
              placeholder="Enter Your Task"
              className="py-[5px] pr-[50px] pl-[20px] focus:outline-none focus:outline-green-700"
              value={newTitle}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col mt-4 ml-[10px]">
            <label htmlFor="about" className="text-white text-4xl">
              About
            </label>
            <input
              type="text"
              id="about"
              placeholder="Enter about Your Task"
              className="py-[5px] pr-[50px] pl-[20px] focus:outline-none focus:outline-green-700"
              value={newDescription}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <button
              type="button"
              className="px-[45px] md:px-[15px] py-[5px] mt-6 md:mt-14 ml-5 text-white bg-green-600 hover:bg-green-900 rounded-md"
              onClick={handleAdd}
            >
              ADD
            </button>
          </div>
        </div>

        {/* Button Section */}
        <div className="flex justify-center md:justify-start mx-auto  md:ml-[83px]  pb-6 md:mb-8">
          <button
            className={`px-[8px] py-1.5 rounded-sm text-white  ${
              !isButton ? "bg-green-700" : "bg-slate-800"
            }`}
            onClick={() => setButton(false)}
          >
            TO DO
          </button>
          <button
            className={`px-[8px] py-1.5 rounded-sm text-white ${
              isButton ? "bg-green-700" : "bg-slate-800"
            }`}
            onClick={() => setButton(true)}
          >
            Completed
          </button>
        </div>

        {/* Todo List */}
        <div className="todo-list pb-6">
          {!isButton &&
            allTodos.map((item, index) => {
              return (
                <div
                  className="flex w-[300px] md:w-[600px] h-[80px] md:h-[120px] items-center justify-between mx-auto mt-4 md:ml-16 bg-slate-900 shadow-[10px_20px_30px_rgb(30,20,30)]"
                  key={index}
                >
                  <div className="flex flex-col px-[30px] py-[15px] ">
                    <h3 className="text-green-400 text-4xl text-green-600">
                      {item.title}
                    </h3>
                    <p className="text-green-200 text-1xl">{item.description}</p>
                  </div>
                  <div className="text-white text-[30px] text-green-600 mr-7 ">
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="mr-[10px] hover:text-red-500"
                      onClick={() => handleDelete(index)}
                    />
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="hover:text-green-600"
                      onClick={() => handleComplete(index)}
                    />
                  </div>
                </div>
              );
            })}

          {/* Completed Tasks */}
          {isButton &&
            completeTodos.map((item, index) => {
              return (
                <div
                  className="flex w-[300px] md:w-[600px] h-[120px] md:h-[130px] items-center justify-between mx-auto mt-4 bg-slate-900 shadow-[10px_20px_30px_rgb(30,20,30)]"
                  key={index}
                >
                  <div className="flex flex-col px-[30px] py-[15px] ">
                    <h3 className="text-4xl text-green-400">{item.title}</h3>
                    <p className="text-green-200 text-1xl">{item.description}</p>
                    <small className="text-white">
                      Completed on: {item.completeOn}
                    </small>
                  </div>
                  <div className="text-white text-[30px] text-green-600 mr-7 ">
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="mr-[10px] hover:text-red-500"
                      onClick={() => handleDeleteCompleted(index)}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default TodoBox;
