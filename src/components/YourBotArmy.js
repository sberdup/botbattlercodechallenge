import React from "react";
import BotCard from "./BotCard";

function YourBotArmy({botArmy, yourRecruitHandler}) {
  //your bot army code here...
  
  const botGrid = botArmy.map(bot => (
    <BotCard key={bot.id} bot={bot} recruitHandler={yourRecruitHandler} />
  ))
  return (
    <div className="ui segment inverted olive bot-army">
      <div className="ui five column grid">
        <div className="row bot-army-row">
          {/*...and here...*/}
          {botGrid}
        </div>
      </div>
    </div>
  );
}

export default YourBotArmy;
