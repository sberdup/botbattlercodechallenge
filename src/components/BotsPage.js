import React, {useEffect, useState} from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";
import BotSpecs from "./BotSpecs";
import SortBar from "./SortBar";

function BotsPage() {
  //start here with your code for step one
  const [bots, setBots] = useState([])
  const [botArmy, setBotArmy] = useState([])

  const [fullView, setFullView] = useState([{}, false])

  const [filterKey, setFilterKey] = useState([])

  //anonymous function to use the filterKey state set with SortBar and return a sorted list based on selected key
  const sortedBots = () => {
    if (filterKey === []) return bots

    const [key, direction] = filterKey
    if (direction === true) {
      return bots.sort((a, b) => a[key] - b[key])
    }
    else {
      return bots.sort((a, b) => b[key] - a[key])
    }
  }

  // initial fetch when page loads
  useEffect(() => {
    fetch('http://localhost:8002/bots')
    .then(r => r.json())
    .then(arr => {
      console.log(arr)
      setBots(arr)})
  }, [])
  
  //this function works when a bot in YourBotArmy is clicked to remove the bot from the botArmy state variable
  function yourRecruitHandler(recruit) {
    setBotArmy(botArmy.filter(bot => (bot !== recruit.id)))
  }

  //this passes in a selected bot from the collection and flips the boolean controlling whether to display Specs or Collection
  // if the function is called from the specs page, the default parameter is passed as no bot needs to be recorded
  function recruitHandler(bot = {}) {
    setFullView([bot, !fullView[1]])
  }

// this will be called from the enlist button to add the chosen bot to the list of ids in botArmy state
  function addBot(id){
    for (const i of botArmy) {
      if (i === id) return console.log("Can't hire the same bot twice!"
      )
    }
    console.log(`You recruited bot #${id}`)
    setBotArmy([...botArmy, id])
  }

//this passes a delete request and eliminated the bots from state and the backend
  function dismissHandler(id) {
    fetch(`http://localhost:8002/bots/${id}`, {method:'DELETE'})
    .then(() => {
      console.log(`You dismissed bot #${id}`)
      setBots(bots.filter(bot => (bot.id !== id)))
    })
  }

//this is how YourBotArmy selects which bots out of the collection to display
  const filteredBots = bots.filter(bot => {
    for (const i of botArmy) {
      if (i === bot.id) return true
    }
    return false
  })

  return (
    <div>
      <YourBotArmy filteredBots={filteredBots} yourRecruitHandler={yourRecruitHandler} />
      {fullView[1] ? null : <SortBar setFilterKey={setFilterKey}/>}
      {fullView[1] ? <BotSpecs bot={fullView[0]} addBot={addBot} goBack={recruitHandler} /> : <BotCollection bots={sortedBots()} recruitHandler={recruitHandler} dismissHandler={dismissHandler} />}
    </div>
  )
}

export default BotsPage;
