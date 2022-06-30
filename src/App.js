import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Sidebar, Tasks } from './components';

import listSvg from './assets/img/list.svg';

//import DB from './assets/db.json';

function App() {

  const [data, setData] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [folderColors, setFolderColors] = useState([])

  useEffect(() => {

    async function readData() {

      try {

        const [respLists, respColors, respTasks] = await Promise.all([
          axios.get("http://localhost:3001/lists"),
          axios.get("http://localhost:3001/colors"),
          axios.get("http://localhost:3001/tasks")
        ]);

        const lists = respLists.data.map(item => {

          if ('colorId' in item) {
            item.color = respColors.data.find(color => color.id === item.colorId).name;
            item.hex = respColors.data.find(color => color.id === item.colorId).hex;
          }

          if(item.id === 0){
            item.icon = listSvg;
            item.clsname = "mb30";
            item.tasks = respTasks.data.length;
          }
          else{
            item.tasks = respTasks.data.filter(task => task.listId === item.id).length;
            //console.log(item)
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
      alert(err)
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
        <Tasks selectedId={selectedId} lists={data} tasks={tasks} />

      </div>
    </div>
  );
}

export default App;
