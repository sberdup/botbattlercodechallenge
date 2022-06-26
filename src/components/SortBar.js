import React, { useState } from 'react'

export default function SortBar({ setFilterKey, classBots, displayProp }) {
    //variable to reset values more easily when clicking other sort methods
    const initVals = { 'health': 0, 'damage': 0, 'armor': 0 }
    const [sort, setSort] = useState(initVals)

    const [checkboxes, setCheckboxes] = useState({'Support':true, 'Medic':true, 'Assault':true, 'Defender':true, 'Captain':true, 'Witch':true})

    //this function takes in the click event and based on the button id, rewrites the object tracking sort method and direction
    function clickHandler(event) {
        const selection = event.target.id
        if (sort[selection] === 1) {
            setSort({ ...sort, [selection]: -1 })
            setFilterKey([selection, false])
        } else {
            setSort({ ...initVals, [selection]: 1 })
            setFilterKey([selection, true])
        }

    }

    //this function will handle toggling classes to display
    function toggleHandler(event) {
        const selection = event.target.id
        const isOn = event.target.checked
        setCheckboxes(previous => ({...previous, [selection]:isOn}))
        classBots(selection, isOn)
    }

    return (
        // revised the display method of this component so it doesn't stop being rendered when going into bot Spec view
        <div style={{display:(displayProp) ? 'none' : 'block'}}>
            <div className="ui three column centered grid">
                <div className='row'>
                    <h4>Sort by:</h4>
                    <button
                        id='health'
                        style={{ margin: '3px', width: '20%' }}
                        className="ui button fluid column"
                        onClick={clickHandler}
                    >
                        {/* nested ternary for the cases of sort not selected, ascending, and descending */}
                        {
                            (sort.health === 0) ? 'Health' :
                                (sort.health === 1) ? 'Health: Ascending' : 'Health: Descending'
                        }
                    </button>
                    <button
                        id='damage'
                        style={{ margin: '3px', width: '20%' }}
                        className="ui button fluid column"
                        onClick={clickHandler}
                    >
                        {
                            (sort.damage === 0) ? 'Damage' :
                                (sort.damage === 1) ? 'Damage: Ascending' : 'Damage: Descending'
                        }
                    </button>
                    <button
                        id='armor'
                        style={{ margin: '3px', width: '20%' }}
                        className="ui button fluid column"
                        onClick={clickHandler}
                    >
                        {
                            (sort.armor === 0) ? 'Armor' :
                                (sort.armor === 1) ? 'Armor: Ascending' : 'Armor: Descending'
                        }
                    </button>
                </div>
            </div>
            <h4 style={{textAlign:'center'}}>Bot Classes to Show</h4>
            <div className='ui seven column centered grid'>
                <div className='row'>
                    <div className='ui button fluid column' for='Support'>
                        <label for='Support'>Support </label>
                        <input type='checkbox' name='Support' id='Support' checked={checkboxes.Support} onChange={toggleHandler} />
                    </div>
                    <div className='ui button fluid column'>
                        <label for='Medic'>Medic </label>
                        <input type='checkbox' name='Medic' id='Medic' checked={checkboxes.Medic} onChange={toggleHandler} />
                    </div>
                    <div className='ui button fluid column'>
                        <label for='Assault'>Assault </label>
                        <input type='checkbox' name='Assault' id='Assault' checked={checkboxes.Assault} onChange={toggleHandler} />
                    </div>
                    <div className='ui button fluid column'>
                        <label for='Defender'>Defender </label>
                        <input type='checkbox' name='Defender' id='Defender' checked={checkboxes.Defender} onChange={toggleHandler} />
                    </div>
                    <div className='ui button fluid column'>
                        <label for='Captain'>Captain </label>
                        <input type='checkbox' name='Captain' id='Captain' checked={checkboxes.Captain} onChange={toggleHandler} />
                    </div>
                    <div className='ui button fluid column'>
                        <label for='Witch'>Witch </label>
                        <input type='checkbox' name='Witch' id='Witch' checked={checkboxes.Witch} onChange={toggleHandler} />
                    </div>
                </div>
            </div>
        </div>
    )
}
