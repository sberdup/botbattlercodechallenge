import React, {useEffect, useState} from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";
import BotSpecs from "./BotSpecs";

function BotsPage() {
  //start here with your code for step one
  const [bots, setBots] = useState([])
  const [botArmy, setBotArmy] = useState([])

  const [fullView, setFullView] = useState([{}, false])

  useEffect(() => {
    fetch('http://localhost:8002/bots')
    .then(r => r.json())
    .then(arr => {
      console.log(arr)
      setBots(arr)})
  }, [])
  
  function yourRecruitHandler(recruit) {
    setBotArmy(botArmy.filter(bot => (bot !== recruit.id)))
  }

  function recruitHandler(bot = {}) {
    setFullView([bot, !fullView[1]])
  }

  function addBot(id){
    for (const i of botArmy) {
      if (i === id) return console.log("Can't hire the same bot twice!"
      )
    }
    console.log(`You recruited bot #${id}`)
    setBotArmy([...botArmy, id])
  }

  function dismissHandler(id) {
    fetch(`http://localhost:8002/bots/${id}`, {method:'DELETE'})
    .then(() => {
      console.log(`You dismissed bot #${id}`)
      setBots(bots.filter(bot => (bot.id !== id)))
    })
  }

  const filteredBots = bots.filter(bot => {
    for (const i of botArmy) {
      if (i === bot.id) return true
    }
    return false
  })

  return (
    <div>
      <YourBotArmy filteredBots={filteredBots} yourRecruitHandler={yourRecruitHandler} />
      {fullView[1] ? <BotSpecs bot={fullView[0]} addBot={addBot} goBack={recruitHandler} /> : <BotCollection bots={bots} recruitHandler={recruitHandler} dismissHandler={dismissHandler} />}
    </div>
  )
}

export default BotsPage;
