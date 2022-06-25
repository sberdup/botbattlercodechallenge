import React, { useState } from 'react'

export default function SortBar({setFilterKey}) {
    //variable to reset values more easily when clicking other sort methods
    const initVals = { 'health': 0, 'damage': 0, 'armor': 0 }
    const [sort, setSort] = useState(initVals)

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
    return (
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
    )
}
