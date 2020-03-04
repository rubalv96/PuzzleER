import React, {useState} from "react";
export default function Timer(props){
  const [segundos, setSegundos] = useState(props.conf.time);
  let min = Math.floor(segundos / 60);
  if(segundos > 0 && props.onStartTime){
    setTimeout(()=>{
      setSegundos(segundos - 1);
      if(segundos === 1){
        props.comprobarCompletado("gameover");
      }
    }, 1000);
  }


  return (
    <div style={{width: "40%", height: "auto"}}>
      {min} : {segundos - min * 60}
    </div>
  );
}