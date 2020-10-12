import React, { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import './App.css';

function App() {

  const [ valueList, setValueList ] = useState([]);

    useEffect ( () => {
      fechData();
    }, [])

  async function fechData() {
    const additionalSetting = {
      headers: {
        "Content-Type": "application/json"
      },
      method: "GET",
    }
    fetch(
      "https://assets.breatheco.de/apis/fake/todos/user/alejojimenez",
      additionalSetting )
      .then(response => response.text() )
      .then(newResponse => {
      setValueList(JSON.parse(newResponse))
      })
      .catch((error) => console.log(error));
  }

  function addList(e) {
    if(e.key === 'Enter' && e.target.value !=="" ) {
      const addNewValue = {"label":e.target.value,"done":false};
      let newList = valueList.concat(addNewValue);
      setValueList(newList);
      methodPut(newList);
      e.target.value = "";
    }
  }

  const methodPut = (newList) => {
    const additionalSetting = {
      headers:{
        "Content-Type": "application/json"
      },
        method : "PUT",
        body: JSON.stringify(newList)
    }
    fetch( 
      "https://assets.breatheco.de/apis/fake/todos/user/alejojimenez", 
      additionalSetting )
        .then(response => response.text() )
        .then( newResponse => {
        })
        .catch((error)=> console.log(error));
  }

  function delList(index) {
    if(index > -1) {
      const filterData = valueList.filter(item => item !== valueList[index]);
      setValueList(filterData);
      methodDelete(filterData);
    }
  }

  const methodDelete = (filterData) => {

    const additionalSetting = {
      headers:{
        "Content-Type": "application/json"
      },
        method : "PUT",
        body: JSON.stringify(filterData)
    }
    fetch( 
      "https://assets.breatheco.de/apis/fake/todos/user/alejojimenez", 
      additionalSetting )
        .then(response => response.text() )
        .then( newResponse => {
        })
        .catch((error)=> console.log(error));  
  }

  return (
    <div className="container">
      <h1 className = "title">ToDo List - Fetch API</h1>
      <br />
      {/* {JSON.stringify(valueList)} Bandera para ver manejo de variable*/} 
      <input className = "shadow p-3 mb-5 bg-white rounded" type="text" name="item" placeholder=" What needs to be done?" onKeyPress = { (e) => addList(e) } />
      <div className = "inputValue shadow p-3 mb-5 bg-white rounded">
        <div className = "list">
          <ul className = "lineForm">
            { valueList.map((valor, index) => {
              return (
                <li key={index} className = "listForm" onClick = { () => { delList(index)}}>
                  {valor.label} <span className = "positionIcons"> <FaTrashAlt /> </span>
                </li>
            )})}
          </ul>
        </div>
      </div>
      <div className = "itemsNumberToTheList shadow p-3 mb-5 bg-light rounded">
        <p>
          {valueList.length} {" "}
          Item left
        </p>
      </div>
    </div>
  );
}

export default App;