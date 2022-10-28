import React, { useState } from 'react'

import listSvg from './assets/img/sidebarMenu.svg'
import './App.css'
import List from './components/List/List'
import AddButtonList from './components/AddButtonList/AddButtonList'

import db from './assets/db.json'
import Tasks from './components/Tasks/Tasks'



function App() {
    const [lists, setLists] = useState(
        db.lists.map(item => {
            item.color = db.colors.filter(color => color.id === item.colorId)[0].name
            return item
        }))




    const onAddList = obj => {
        const newList = [...lists, obj]
        setLists(newList)

    }


    return <div className="todo">
        <div className='todo__sidebar'>
            <List items={[
                {
                    icon: listSvg,
                    name: 'Все задачи'
                },


            ]} />
            <List items={lists}
                onRemove={(item) => { console.log(item) }}
                isRemovable />


            <AddButtonList colors={db.colors} onAdd={onAddList} />



        </div>


        <div div className='todo__tasks' >
            <Tasks />

        </div>

    </div>

}

export default App
