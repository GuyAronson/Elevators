import { Grid, Button } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import Elevator from "./Elevator";
import { callStates } from "../utils";

function Floor({ id, elevatorsAmount, elevators, callElevator, isElevatorArrived, notifyElevatorArrived }) {
    const [callState, setCallState] = useState(callStates.available);
    const floorItem = useRef()

    const handleCall = (e) => {
        if (callState.key !== callStates.available.key)
            return;

        setCallState(callStates.busy);
        callElevator(id);
    }
    useEffect(() => {
        if (isElevatorArrived) {
            setCallState(callStates.arrived);
            setTimeout(() => {
                setCallState(callStates.available)
                isElevatorArrived = false;
            }, 2000);
        }
    }, [isElevatorArrived])

    return (
        <div className='floor'>
            <Grid container >
                <Grid item xs={2} className="floor-text-box">
                    <p className="floor-text">{id === 0 ? `Ground Floor` : id + `th`}</p>
                </Grid>
                {[...new Array(elevatorsAmount)].map((x, i) =>
                    <Grid item xs={(8 / elevatorsAmount)} key={i} >
                        <div className='floor-item' ref={floorItem}>
                            {elevators[i] && elevators[i].floor === id ?
                                <Elevator
                                    id={elevators[i].id}
                                    status={elevators[i].status}
                                    floor={elevators[i].floor}
                                    targetFloor={elevators[i].targetFloor}
                                    notifyElevatorArrived={notifyElevatorArrived}
                                    floorSize={floorItem?.current?.clientHeight}
                                />
                                : null}
                        </div>
                    </Grid>
                )}
                <Grid item xs={2} className="call-btn-box" >
                    <Button className="call-btn" variant={callState.variant} color={callState.color} onClick={handleCall}>
                        {callState.label}
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default Floor;
