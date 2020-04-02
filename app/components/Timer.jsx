import React, {useState} from "react";

export default function Timer(props){
  const [segundos, setSegundos] = useState(props.time);
  let min = Math.floor(segundos / 60);
  let timePannel;
  if(props.showMinutes){
    timePannel = (
      <div style={{fontSize:"2.5vw", fontFamily:"'Megrim', cursive", margin:"auto",
      }}>
        {min} : {segundos - min * 60}
      </div>
    );
  }
  else {
    timePannel = (
      <div style={{fontSize:"20px", fontFamily:"'Megrim', cursive", margin:"auto",
      }}>
        {segundos - min * 60}
      </div>
    );
  }
  if(segundos > 0 && props.onStartTime){
    setTimeout(()=>{
      setSegundos(segundos - 1);
      if(segundos === 1){
        // props.dispatch(comprobarCompletado("gameover"));
        props.onFinishTime();
      }

    }, 1000);
  }

  return (
    timePannel
  );
}