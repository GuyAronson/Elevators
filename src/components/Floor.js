import { Grid, Button } from "@mui/material";
import React from "react";
import { ReactComponent as ElevatorIcon } from '../elevator.svg'

function Floor({ id, elevatorsAmount, floorsAmount, elevators }) {
    const floorNum = floorsAmount - id - 1;

    return (
        <div className='floor'>
            <Grid container >
                <Grid item xs={2} className="floor-text-box">
                    <p className="floor-text">{floorNum === 0 ? `Ground Floor` : floorNum + `th`}</p>
                </Grid>
                {[...new Array(elevatorsAmount)].map((x, i) =>
                    <Grid item xs={1.5} key={i} >
                        <div className='floor-item'>
                            {elevators[i].floor === floorNum ? <ElevatorIcon className="elevator-icon" /> : null}
                        </div>
                    </Grid>
                )}
                <Grid item xs={2} className="call-btn-box" >
                    <Button variant="contained" className="call-btn" color="success">
                        Call
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default Floor;
