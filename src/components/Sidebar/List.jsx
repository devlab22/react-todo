import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Badge }  from "../../components";

import './Sidebar.scss';
import removeIcon from '../../assets/img/remove.svg';

function List({ items = [], onClickItem, onClickRemove, selectedId=null, colors=[], isRemovable=false}) {

  const navigate = useNavigate();
  const params = useParams();

  if(params.id){
    selectedId = params.id
  }

  const handleOnClickItem = (id) => {
    
    console.log("click", id)
    if(id != null){
      id === 0 ? navigate("/lists") : navigate(`/lists/${id}`);
    }else{
      //onClickItem(id);
      navigate(`/list/${null}`);
    }  
    
  }
  return (
    <ul className="list">
      {
        items.map((item, index) => (
         
          <li key={index} className={item.clsname + ' ' + ( ( selectedId === item.id ) || (selectedId === null) && (item.id === 0) && 'active' ) } onClick={() => handleOnClickItem(item.id)}>
            <i>
              {item.icon ? (<img src={item.icon} alt="icon" ></img>) : <Badge width={8} hex={colors.find(color => color.id === item.colorId).hex} />}
            </i>
            <span>
              {item.name}
              {item.tasks >= 0 && <span className="list-tasks-cnt">{`(${item.tasks})`}</span> }
             </span> 
            {isRemovable && <img className="removable" src={removeIcon} alt="remove" onClick={(event) => onClickRemove(event, item.id)} ></img>}
          </li>
        
        ))
      }
    </ul>
  )
}

export default List;