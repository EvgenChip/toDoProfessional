import React from 'react'
import './Tasks.scss'
import panIcon from '../../assets/img/pain.svg'
import okTask from '../../assets/img/okTask.svg'

const Tasks = () => {

    return (
      <div className="tasks">
        <h2 className="tasks__title">
          Фронтед
          <img src={panIcon} alt="" />
        </h2>
        <div className="tasks__items">
          <div className="tasks__items-row">
            <div className="checkbox">
              <input id="check" type="checkbox" />
              <label htmlFor="check">
                <img src={okTask} alt="" />
              </label>
            </div>
            <p>ReactJS Hooks (useState, useReducer, useEffect и т.д.)</p>
          </div>
        </div>
      </div>
    );
}



export default Tasks