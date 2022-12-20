import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import { Sidebar, Tasks, Header, LoadingCircle } from './components';
import { About, Task, Folder, Home, Login, Error } from './pages';

//import DB from './assets/db.json';

function App() {

  const [user, setUser] = useState({ id: null, login: "" })
  const [users, setUsers] = useState([]);
  const [folders, setFolders] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [folderColors, setFolderColors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {

    async function readData() {

      setIsLoading(true)
      try {

        const [respLists, respColors, respTasks, respUsers] = await Promise.all([
          axios.get("/lists"),
          axios.get("/colors"),
          axios.get("/tasks"),
          axios.get("/users")
        ]);

        const lists = respLists.data.filter(item => item.userId === user.id).map(item => {

          item.tasks = respTasks.data.filter(task => task.listId === item.id).length;

          return item;
        })

        lists.sort((a, b) => a.seqnr - b.seqnr);

        var newTasks = []

        for (let i = 0; i < respTasks.data.length; i++) {
          const task = respTasks.data[i]

          const pup = lists.find(item => item.id === task.listId)
          if (pup) {
            newTasks.push(task)
          }
        }

        setFolders(lists);
        setTasks(newTasks);
        setFolderColors(respColors.data);
        setUsers(respUsers.data);

      }
      catch (err) {
        console.log(err);
      }
      finally {
        setIsLoading(false);
      }

    }

    readData();

  }, [user]);

  const handleOnRemove = async (event, id) => {
    event.stopPropagation();

    if (!window.confirm(`Wollen Sie Ordner ${folders.find(item => item.id === id).name} entfernen?`)) {
      return;
    }

    try {

      setIsLoading(true);
      await axios.delete(`/lists/${id}`);

      setFolders(prev => prev.filter(item => item.id !== id));
    }
    catch (err) {
      alert(err);
    }
    finally {
      setIsLoading(false);
    }

  }

  const handleOnClickItem = (id) => {
    setSelectedId(id);
  }

  const handleOnAddFolder = async (item) => {

    if (user.id === null) {
      handleOnError('user ist nicht eingeloggt');
      return
    }

    try {
      const { data } = await axios.post('/lists', {
        name: item.name,
        colorId: item.colorId,
        seqnr: item.seqnr,
        userId: user.id
      });

      data.tasks = 0;

      const newList = [...folders, data];

      newList.sort((a, b) => a.seqnr - b.seqnr);

      setFolders(newList);

    }
    catch (err) {
      alert(err);
    }

  }

  const handleOnEditTask = async (task) => {

    try {

      setIsLoading(true);
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

    finally {
      setIsLoading(false);
    }

  }

  const handleOnDeleteTask = async (item) => {

    if (!window.confirm(`Möchten Sie Aufgabe "${item.text}" löschen?`)) {
      return;
    }

    try {

      setIsLoading(true);
      await axios.delete(`/tasks/${item.id}`);

      setTasks(prev => prev.filter(curr => curr.id !== item.id));

      const newList = folders.map(curr => {

        if (curr.id === item.listId) {
          curr.tasks--;
        }

        return curr;
      })

      setFolders(newList)

    }
    catch (err) {

      alert(err);
    }
    finally {
      setIsLoading(false);
    }

  }

  const handleOnAddTask = async (task) => {

    try {

      setIsLoading(true);
      const resp = await axios.post('/tasks', task);

      setTasks(prev => [...prev, resp.data]);

      const newList = folders.map(item => {

        if (item.id === task.listId) {
          item.tasks++;
        }

        return item;
      })

      setFolders(newList)

    }
    catch (err) {
      alert(err)
    }
    finally {
      setIsLoading(false);
    }

  }

  const handleOnCompleteTask = async (taskId, completed) => {

    try {

      setIsLoading(true);
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
      alert(err)
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleOnEditFolder = async (item) => {

    if (!item) {
      return
    }

    try {

      setIsLoading(true);
      await axios.patch(`/lists/${item.id}`, {
        name: item.name,
        colorId: item.colorId,
        seqnr: item.seqnr
      });

      const newList = folders.map(curr => {

        if (curr.id === item.id) {
          curr.name = item.name;
          curr.colorId = item.colorId;
          curr.seqnr = item.seqnr;
        }

        return curr;
      })

      newList.sort((a, b) => a.seqnr - b.seqnr);
      setFolders(newList);

    }
    catch (err) {
      alert(err);
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleOnLogin = async (item) => {

    try {
      setIsLoading(true);
      const { data } = await axios.get(`/users?login=${item.login}`);
      
      if (data.length === 0) {

        handleOnError("login oder password ist falsch");

      } else {

        const pwd = atob(data[0].password)
        if (item.password != pwd) {
          handleOnError("login oder password ist falsch");
        } else {
          setUser(data[0]);
          navigate('/', { replace: true });
        }

      }
    }
    catch (err) {
      alert(err)
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleOnLogout = () => {
    
    setUser({ id: null, login: '' })
    navigate('/', { replace: true })
  }

  const handleOnError = (message) => {

    setMessage(message);
    navigate(`/error`, { replace: true })
  }

  useEffect(() => {

    const itemId = location.pathname.split("lists/")[1];
    if (itemId) {
      itemId ? setSelectedId(Number(itemId)) : setSelectedId(null);
    } else {
      setSelectedId(null);
    }

  }, [folders, location, location.pathname])

  if (isLoading) {

    return (
      <LoadingCircle />
    )

  } else {

    return (

      <div className='App'>

        <Header setCurrentPath={handleOnClickItem} onLogout={handleOnLogout} />

        <div className="todo">

          <Sidebar
            key={1}
            login={user.id ? true : false}
            items={folders}
            tasks={tasks.length}
            onClickItem={handleOnClickItem}
            onClickRemove={handleOnRemove}
            selectedId={selectedId}
            colors={folderColors}
            onAddFolder={handleOnAddFolder} />

          <div className='todo__tasks'>
            <Routes>

              <Route exact path='/' element={
                <Home />
              }>

              </Route>

              <Route exact path='/lists/0' element={

                folders && folders.map(item => (

                  item.id > 0 && (
                    <Tasks
                      key={item.id}
                      selectedId={item.id}
                      lists={folders}
                      tasks={tasks}
                      colors={folderColors}
                      withoutEmpty={true}
                      onEditTask={handleOnEditTask}
                      onDeleteTask={handleOnDeleteTask}
                      onAddTask={handleOnAddTask}
                      onCompleteTask={handleOnCompleteTask}
                      onEditFolder={handleOnEditFolder}
                    />
                  )))}>


              </Route>
              <Route exact path='/lists/:id' element={

                <Tasks
                  // selectedId={selectedId}
                  lists={folders}
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
                  items={folders}
                  colors={folderColors}
                  onEdit={handleOnEditFolder}
                  onAdd={handleOnAddFolder}
                />
              }>

              </Route>
              <Route exact path='/about' element={
                <About />
              } />

              <Route exact path="/login" element={
                <Login onLogin={handleOnLogin} />
              } />

              <Route exact path='/error' element={
                <Error message={message} />
              }>

              </Route>

            </Routes>

          </div>

        </div>

      </div>
    );
  }
}

export default App;
