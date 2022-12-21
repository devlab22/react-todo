import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import { Sidebar, Tasks, Header, LoadingCircle } from './components';
import { About, Task, Folder, Home, Login, Error } from './pages';
import Dashboard from './API/Dashboard';

//import DB from './assets/db.json';

function App() {

  const [user, setUser] = useState({ id: null, login: "" })
  const [folders, setFolders] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [folderColors, setFolderColors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {

    async function loadCustomizing(){

      if(folderColors.length > 0){
        return
      }
      setIsLoading(true);
      console.log('colors')
      try{
        const data = await Dashboard.getColors();
        setFolderColors(data);
      }
      catch(err){
        handleOnError(err.message);
      }
      finally{
        setIsLoading(false);
      }
    };

    async function readData() {

      if(user.id === null){
        return
      }

      setIsLoading(true)

      try {
        
        const foldersList = await Dashboard.getFolders4User(user.id);
        const tasksList = await Dashboard.getTasks();

        foldersList.map(folder => {

          folder.tasks = tasksList.filter(task => task.listId === folder.id).length;
          return folder;
        });

        foldersList.sort((a, b) => a.seqnr - b.seqnr);

        var newTasks = [];

        tasksList.forEach(task => {

          const pup = foldersList.find(item => item.id === task.listId);
          if (pup) {
            newTasks.push(task);
          }
        });

        newTasks.sort((a,b) => a.seqnr - b.seqnr);
        setFolders(foldersList);
        setTasks(newTasks);

      }
      catch (err) {
        handleOnError(err.message);
      }
      finally {
        setIsLoading(false);
      }

    }

    loadCustomizing();
    readData();

  }, [user]);

  const handleOnRemove = async (event, id) => {
    event.stopPropagation();

    if (!window.confirm(`Wollen Sie Ordner ${folders.find(item => item.id === id).name} entfernen?`)) {
      return;
    }

    try {

      setIsLoading(true);

      await Dashboard.deleteFolder(id)

      setFolders(prev => prev.filter(item => item.id !== id));
    }
    catch (err) {
      handleOnError(err.message);
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
      setIsLoading(true);

      const data = await Dashboard.createFolder({
        name: item.name,
        colorId: item.colorId,
        seqnr: item.seqnr,
        userId: user.id
      })

      data.tasks = 0;

      const newList = [...folders, data];

      newList.sort((a, b) => a.seqnr - b.seqnr);

      setFolders(newList);

    }
    catch (err) {
      handleOnError(err.message);
    }
    finally {
      setIsLoading(false);
    }

  }

  const handleOnEditTask = async (task) => {

    try {

      setIsLoading(true);

      const taskUpd = await Dashboard.updateTask(task.id, {
        text: task.text,
        seqnr: task.seqnr,
        completed: task.completed
      });

      const newList = tasks.map(curr => {

        if (curr.id === taskUpd.id) {
          curr.text = taskUpd.text;
          curr.seqnr = taskUpd.seqnr;
          curr.completed = taskUpd.completed;
        }

        return curr;
      })

      newList.sort((a, b) => a.seqnr - b.seqnr);
      setTasks(newList);
    }
    catch (err) {

      handleOnError(err.message);
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
      await Dashboard.deleteTask(item.id)

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

      handleOnError(err.message);
    }
    finally {
      setIsLoading(false);
    }

  }

  const handleOnAddTask = async (task) => {

    try {

      setIsLoading(true);
      const data = await Dashboard.createTask(task)

      setTasks(prev => [...prev, data]);

      const newList = folders.map(item => {

        if (item.id === task.listId) {
          item.tasks++;
        }

        return item;
      })

      setFolders(newList)

    }
    catch (err) {
      handleOnError(err.message)
    }
    finally {
      setIsLoading(false);
    }

  }

  const handleOnCompleteTask = async (taskId, completed) => {

    try {

      setIsLoading(true);

      const data = await Dashboard.updateTask(taskId, {completed: completed})

      setTasks(prev => prev.map(item => {

        if (item.id === taskId) {
          item.completed = data.completed
        }

        return item;
      }

      ))

    }
    catch (err) {
      handleOnError(err.message)
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
      const data = await Dashboard.updateFolder(item.id, {
        name: item.name,
        colorId: item.colorId,
        seqnr: item.seqnr
      });

      const newList = folders.map(curr => {

        if (curr.id === data.id) {
          curr.name = data.name;
          curr.colorId = data.colorId;
          curr.seqnr = data.seqnr;
        }

        return curr;
      })

      newList.sort((a, b) => a.seqnr - b.seqnr);
      setFolders(newList);

    }
    catch (err) {
      handleOnError(err.message);
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleOnLogin = async (item) => {

    try {
      setIsLoading(true);

      const data = await Dashboard.login(item.login, item.password);
      setUser(data);
      navigate('/', { replace: true });
    }
    catch (err) {
      setUser({id:null, login: ''})
      handleOnError(err.message)
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
