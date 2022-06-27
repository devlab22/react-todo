import React from 'react';

import Sidebar from './components/Sidebar';
import listSvg from '../src/assets/img/list.svg';
import plusSvg from '../src/assets/img/add.svg';


function App() {

  const tasks = [
    {
      icon: listSvg,
      name: "Alle Aufgaben",
      clsname: "active mb30"
    },
    {
      color: "green",
      name: "Einkäufe",
      removable: true
    },
    {
      color: "blue",
      name: "Frontend",
      removable: true
    },
    {
      color: "pink",
      name: "Filme und Serials",
      removable: true
    },
    {
      color: "pink",
      name: "Bücher",
      removable: true
    },
    {
      icon: plusSvg,
      name: "Aufgabe hinzufügen",
      clsname: "add"
    }
  ];

  return (
    <div className="todo">
      <Sidebar key={1} items={tasks} />
      <div className='todo__tasks'></div>
    </div>
  );
}

export default App;
