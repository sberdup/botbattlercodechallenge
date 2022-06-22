import React from "react";
import BotCard from "./BotCard";

function BotCollection({bots, recruitHandler, dismissHandler}) {
  // Your code here
  const botGrid = bots.map(bot => (
    <BotCard bot={bot} key={bot.id} recruitHandler={recruitHandler} dismissHandler={dismissHandler}/>
  ))
  return (
    <div className="ui four column grid">
      <div className="row">
        {/*...and here..*/}
        {botGrid}
      </div>
    </div>
  );
}

export default BotCollection;
