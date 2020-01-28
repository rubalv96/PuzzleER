import React from "react";
import {Modal} from 'react-bootstrap';
import {GLOBAL_CONFIG} from "../config/config";

export default class MensajeFinal extends React.Component
{
    render()
    {

        let endImage;
        GLOBAL_CONFIG.endImage === "" ? endImage = "./assets/images/egipto.jpg" : endImage = GLOBAL_CONFIG.endImage;
        return (
            <>
                <Modal show={true}  animation={false} size="lg">
                    <Modal.Header>
                        <Modal.Title>Puzzle completado</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>{GLOBAL_CONFIG.endMessage}</p>
                        <img src={endImage} style={{width: 300, height: 200, display: "block", margin: "auto"}}/>
                    </Modal.Body>

                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>
            </>);


    }


}

