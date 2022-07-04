import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Circles } from 'react-loader-spinner';
import { Routes, Route, useLocation } from "react-router-dom";

import { Sidebar, Tasks } from './components';

import listSvg from './assets/img/list.svg';

//import DB from './assets/db.json';

function App() {

  const [data, setData] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [folderColors, setFolderColors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let location = useLocation();

  useEffect(() => {

    async function readData() {
     
      setIsLoading(true)
      try {

        const [respLists, respColors, respTasks] = await Promise.all([
          axios.get("http://localhost:3001/lists"),
          axios.get("http://localhost:3001/colors"),
          axios.get("http://localhost:3001/tasks")
        ]);

        const lists = respLists.data.map(item => {

          if (item.colorId) {
            item.color = respColors.data.find(color => color.id === item.colorId).name;
            item.hex = respColors.data.find(color => color.id === item.colorId).hex;
          }

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

        setData(lists);
        setTasks(respTasks.data)
        setFolderColors(respColors.data);

      }
      catch (err) {
        console.log(err);
      }
      finally{
        setIsLoading(false);
      }

    }

    readData();

  }, []);

  const handleOnRemove = async (event, id) => {
    event.stopPropagation();

    if (!window.confirm('Wollen Sie order entfernen?')) {
      return;
    }

    try {

      await axios.delete(`http://localhost:3001/lists/${id}`);

      setData(prev => prev.filter(item => item.id !== id))
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
      const { data } = await axios.post('http://localhost:3001/lists', {
        name: item.name,
        colorId: item.colorId
      });

      data.color = folderColors.find(color => color.id === item.colorId).name;
      data.colorHex = folderColors.find(color => color.id === item.colorId).hex;
      setData(prev => [...prev, data]);
    }
    catch (err) {
      alert(err);
    }

  }

  const handleOnEditTitle = async (item) => {

    if (!item) {
      return
    }

    const newTitle = window.prompt('Bezeichnung', item.name);

    if (!newTitle) {
      return
    }

    try {

      await axios.patch(`http://localhost:3001/lists/${item.id}`, {
        name: newTitle
      });

      const newList = data.map(curr => {

        if (curr.id === item.id) {
          curr.name = newTitle;
        }

        return curr;
      })

      setData(newList);
    }
    catch (err) {

      alert(err);
    }

  }

  const handleOnEditTask = async (task) => {

    if (!task) {
      return
    }
    const newTitle = window.prompt('Bezeichnung', task.text);

    if (!newTitle) {
      return
    }

    try {

      await axios.patch(`http://localhost:3001/tasks/${task.id}`, {
        text: newTitle
      });

      const newList = tasks.map(curr => {

        if (curr.id === task.id) {
          curr.text = newTitle;
        }

        return curr;
      })

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

      await axios.delete(`http://localhost:3001/tasks/${item.id}`);

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

      const resp = await axios.post('http://localhost:3001/tasks', task);

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

  useEffect(() => {

    const itemId = location.pathname.split("lists/")[1];
    itemId ? setSelectedId(Number(itemId)) : setSelectedId(0);

  }, [data, location, location.pathname])

  if (isLoading){

    return(
      <div className='loading-container'>
        <Circles 
          color="#00BFFF" 
          height={80} 
          width={80}/>
      </div>
    )

  }else{

  return (
   
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
            data && data.map(item => (

              item.id > 0 && (
                <Tasks
                  key={item.id}
                  selectedId={item.id}
                  lists={data}
                  tasks={tasks}
                  withoutEmpty={true}
                  onEditTitle={handleOnEditTitle}
                  onEditTask={handleOnEditTask}
                  onDeleteTask={handleOnDeleteTask}
                  onAddTask={handleOnAddTask}>                  
                </Tasks>
              )))
          }>

          </Route>
          <Route path='/lists/:id' element={

            <Tasks
              selectedId={selectedId}
              lists={data}
              tasks={tasks}
              onEditTitle={handleOnEditTitle}
              onEditTask={handleOnEditTask}
              onDeleteTask={handleOnDeleteTask}
              onAddTask={handleOnAddTask} />
          }>
          </Route>
        </Routes>

      </div>
      
    </div>
        );
}
}

export default App;
