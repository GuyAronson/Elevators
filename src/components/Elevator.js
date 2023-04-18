import React from 'react'
import { ReactComponent as ElevatorIcon } from '../elevator.svg'
import { elevatorStatuses } from '../utils';

function Elevator({ status }) {
    return (
        <ElevatorIcon className="elevator-icon" style={{stroke: elevatorStatuses[status]?.color}}/>
    )
}

export default Elevator;