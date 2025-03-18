import React from "react";
import { SwiperComponent } from "../index.js";


function HomeBanner({className=""}) {
  
  return (
    <div className={`rounded-lg overflow-hidden`}>
      <SwiperComponent className={className}/>
    </div>
  );
}

export default HomeBanner;
