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

  const [classArr, setClassArr] = useState(['Support', 'Medic', 'Assault', 'Defender', 'Captain', 'Witch'])

  //anonymous function to use the filterKey state set with SortBar and return a sorted list based on selected key
  const sortedBots = () => {
    if (filterKey === []) return selectedBots

    const [key, direction] = filterKey
    if (direction === true) {
      return selectedBots.sort((a, b) => a[key] - b[key])
    }
    else {
      return selectedBots.sort((a, b) => b[key] - a[key])
    }
  }

  //callback function to handle adding classes to display
  function classBots(botClass, isSelected) {
    if (isSelected) {
      setClassArr([...classArr, botClass])
    } else {
      setClassArr(classArr.filter(cls => cls !== botClass))
    }
  }

  //this will reduce the bots list down to just the selected classes before passing into the sort function
  const selectedBots = bots.filter((bot) => {
    if (classArr === []) return true
    return !!classArr.find(cls => cls === bot.bot_class)
  })

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
    setBotArmy(botArmy.filter(bot => (bot.id !== recruit.id)))
    setBots([...bots, recruit])
  }

  //this passes in a selected bot from the collection and flips the boolean controlling whether to display Specs or Collection
  // if the function is called from the specs page, the default parameter is passed as no bot needs to be recorded
  function recruitHandler(bot = {}) {
    setFullView([bot, !fullView[1]])
  }

// this will be called from the enlist button to add the chosen bot to the list of ids in botArmy state
  function addBot(bot){
    for (const i of botArmy) {
      if (i.id === bot.id) return console.log("Can't hire the same bot twice!")
      if (i.bot_class === bot.bot_class) return alert("Can't hire two of the same class bot!")
    }
    console.log(bot)
    setBotArmy([...botArmy, bot])
    setBots(bots.filter(item => (item.id !== bot.id)))
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
  // const filteredBots = bots.filter(bot => {
  //   for (const i of botArmy) {
  //     if (i === bot.id) return true
  //   }
  //   return false
  // })

  return (
    <div>
      <YourBotArmy botArmy={botArmy} yourRecruitHandler={yourRecruitHandler} />
      {<SortBar setFilterKey={setFilterKey} classBots={classBots} displayProp={fullView[1]}/>}
      {fullView[1] ? <BotSpecs bot={fullView[0]} addBot={addBot} goBack={recruitHandler} /> : <BotCollection bots={sortedBots()} recruitHandler={recruitHandler} dismissHandler={dismissHandler} />}
    </div>
  )
}

export default BotsPage;
