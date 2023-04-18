import { Grid, Button } from "@mui/material";
import React, { useState } from "react";
import { ReactComponent as ElevatorIcon } from '../elevator.svg'

const callStates = {
    available: { key: 'available', label: 'Call', color: 'success', variant: 'contained' },
    busy: { key: 'busy', label: 'Waiting', color: 'error', variant: 'contained' },
    arrived: { key: 'arrived', label: 'Arrived', color: 'success', variant: 'outlined' },
}
function Floor({ id, elevatorsAmount, floorsAmount, elevators, callElevator }) {
    const floorNum = floorsAmount - id - 1;
    const [callState, setCallState] = useState(callStates.available);

    const handleCall = (e) => {
        if (callState.key !== callStates.available.key)
            return;

        setCallState(callStates.busy)
        callElevator(floorNum);
        // after notification
        setCallState(callStates.arrived)
        setTimeout(() => setCallState(callStates.available), 2000)
    }
    return (
        <div className='floor'>
            <Grid container >
                <Grid item xs={2} className="floor-text-box">
                    <p className="floor-text">{floorNum === 0 ? `Ground Floor` : floorNum + `th`}</p>
                </Grid>
                {[...new Array(elevatorsAmount)].map((x, i) =>
                    <Grid item xs={1.5} key={i} >
                        <div className='floor-item'>
                            {elevators[i] && elevators[i].floor === floorNum ? <ElevatorIcon className="elevator-icon" /> : null}
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
