import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Circles } from 'react-loader-spinner';
import { Routes, Route, useLocation } from "react-router-dom";

import { Sidebar, Tasks, Header } from './components';
import { About, Task, Folder, Home } from './pages';

import listSvg from './assets/img/list.svg';

//import DB from './assets/db.json';

function App() {

  const [data, setData] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [folderColors, setFolderColors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {

    async function readData() {

      setIsLoading(true)
      try {

        const [respLists, respColors, respTasks] = await Promise.all([
          axios.get("/lists"),
          axios.get("/colors"),
          axios.get("/tasks")
        ]);

        const lists = respLists.data.map(item => {

          if (item.id === 0) {
            item.icon = listSvg;
            item.clsname = "mb30";
            item.tasks = respTasks.data.length;
          }
          else {
            item.tasks = respTasks.data.filter(task => task.listId === item.id).length;
          }

          return item;
        })

        lists.sort((a, b) => a.seqnr - b.seqnr);

        setData(lists);
        setTasks(respTasks.data);
        setFolderColors(respColors.data);

      }
      catch (err) {
        console.log(err);
      }
      finally {
        setIsLoading(false);
      }

    }

    readData();

  }, []);

  const handleOnRemove = async (event, id) => {
    event.stopPropagation();

    if (!window.confirm('Wollen Sie Ordner entfernen?')) {
      return;
    }

    try {

      await axios.delete(`/lists/${id}`);

      setData(prev => prev.filter(item => item.id !== id));
    }
    catch (err) {
      alert(err);
    }

  }

  const handleOnClickItem = (id) => {
    setSelectedId(id);
  }

  const handleOnAddFolder = async (item) => {

    try {
      const { data } = await axios.post('/lists', {
        name: item.name,
        colorId: item.colorId,
        seqnr: item.seqnr
      });

      data.tasks = 0;

      setData(prev => [...prev, data]);
    }
    catch (err) {
      alert(err);
    }

  }

  const handleOnEditTask = async (task) => {

    try {

      await axios.patch(`/tasks/${task.id}`, {
        text: task.text,
        seqnr: task.seqnr
      });

      const newList = tasks.map(curr => {

        if (curr.id === task.id) {
          curr.text = task.text;
          curr.seqnr = task.seqnr;
        }

        return curr;
      })

      newList.sort((a, b) => a.seqnr - b.seqnr);
      setTasks(newList);
    }
    catch (err) {

      alert(err);
    }

  }

  const handleOnDeleteTask = async (item) => {

    if (!window.confirm(`Möchten Sie Aufgabe "${item.text}" löschen?`)) {
      return;
    }

    try {

      await axios.delete(`/tasks/${item.id}`);

      setTasks(prev => prev.filter(curr => curr.id !== item.id));

      const newList = data.map(curr => {

        if (curr.id === item.listId) {
          curr.tasks--;
        }

        return curr;
      })

      setData(newList)

    }
    catch (err) {

      alert(err);
    }

  }

  const handleOnAddTask = async (task) => {

    try {

      const resp = await axios.post('/tasks', task);

      setTasks(prev => [...prev, resp.data]);

      const newList = data.map(item => {

        if (item.id === task.listId) {
          item.tasks++;
        }

        return item;
      })

      setData(newList)

    }
    catch (err) {
      alert(err)
    }

  }

  const handleOnCompleteTask = async (taskId, completed) => {

    try {

      const { data } = await axios.patch(`/tasks/${taskId}`, {
        completed: completed
      });

      setTasks(prev => prev.map(item => {

        if (item.id === taskId) {
          item.completed = data.completed
        }

        return item;
      }

      ))

    }
    catch (err) {

    }
  }

  const handleOnEditFolder = async (item) => {

    if (!item) {
      return
    }

    try {

      await axios.patch(`/lists/${item.id}`, {
        name: item.name,
        colorId: item.colorId,
        seqnr: item.seqnr
      });

      const newList = data.map(curr => {

        if (curr.id === item.id) {
          curr.name = item.name;
          curr.colorId = item.colorId;
          curr.seqnr = item.seqnr;
        }

        return curr;
      })

      newList.sort((a, b) => a.seqnr - b.seqnr);
      setData(newList);

    }
    catch (err) {
      alert(err);
    }
  }

  useEffect(() => {

    const itemId = location.pathname.split("lists/")[1];
    if (itemId) {
      itemId ? setSelectedId(Number(itemId)) : setSelectedId(null);
    }else{
      setSelectedId(null);
    }

  }, [data, location, location.pathname])

  if (isLoading) {

    return (
      <div className='loading-container'>
        <Circles
          color="#00BFFF"
          height={80}
          width={80} />
      </div>
    )

  } else {

    return (

      <div className='App'>

        <Header setCurrentPath={handleOnClickItem} />

        <div className="todo">

          <Sidebar
            key={1}
            items={data}
            onClickItem={handleOnClickItem}
            onClickRemove={handleOnRemove}
            selectedId={selectedId}
            colors={folderColors}
            onAddFolder={handleOnAddFolder} />

          <div className='todo__tasks'>
            <Routes>

              <Route exact path='/' element={
                <Home/>
              }>

              </Route>

              <Route exact path='/lists/0' element={

                data && data.map(item => (

                  item.id > 0 && (
                    <Tasks
                      key={item.id}
                      selectedId={item.id}
                      lists={data}
                      tasks={tasks}
                      colors={folderColors}
                      withoutEmpty={true}
                      onEditTask={handleOnEditTask}
                      onDeleteTask={handleOnDeleteTask}
                      onAddTask={handleOnAddTask}
                      onCompleteTask={handleOnCompleteTask}
                      onEditFolder={handleOnEditFolder}
                    />
                  )))  }>
              
                  
              </Route>
              <Route exact path='/lists/:id' element={

                <Tasks
                  // selectedId={selectedId}
                  lists={data}
                  tasks={tasks}
                  colors={folderColors}
                  onEditFolder={handleOnEditFolder}
                  onEditTask={handleOnEditTask}
                  onDeleteTask={handleOnDeleteTask}
                  onAddTask={handleOnAddTask}
                  onCompleteTask={handleOnCompleteTask}
                />
              }>
              </Route>

              <Route exact path='/task/:id' element={
                <Task
                  tasks={tasks}
                  onAdd={handleOnAddTask}
                  onEdit={handleOnEditTask}
                />
              }></Route>

              <Route exact path='/list/:id' element={
                <Folder 
                  items={data} 
                  colors={folderColors}
                  onEdit={handleOnEditFolder}
                  onAdd={handleOnAddFolder}
                  />
              }>

              </Route>
              <Route exact path='/about' element={
                <About />
              } />

            </Routes>

          </div>

        </div>

      </div>
    );
  }
}

export default App;
