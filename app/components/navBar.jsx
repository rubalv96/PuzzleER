import React from "react";
import '../assets/scss/main.scss';
export default class NavBar extends React.Component {
    render(){


        return (
            <nav className="navbar navbar-expand-sm " style={{backgroundColor: "white"}}>
                <a className="navbar-brand title" href="https://github.com/rubalv96/PuzzleER">
                    <img src="../assets/images/intentos.png" width="40px" height="40px"/>
                    </a>
                <a className="navbar-brand title" href="https://github.com/rubalv96/PuzzleER">
                   ¿Cómo jugar?
                </a>

            </nav>
        );
    }
}