import React, { useCallback, useEffect, useRef } from 'react'
import { ReactComponent as ElevatorIcon } from '../elevator.svg'
import { elevatorStatuses } from '../utils';


const timePerFloor = 600
function Elevator({ id, status, floor, targetFloor, notifyElevatorArrived, floorSize }) {
    const icon = useRef();

    const handleAnimationEnd = useCallback(() => {
        notifyElevatorArrived(id)
    }, [])

    useEffect(() => {
        icon.current.addEventListener('transitionend', handleAnimationEnd);
    }, [])

    useEffect(() => {
        if (status === elevatorStatuses.busy.key && targetFloor >= 0) {
            const distance = floorSize * (floor - targetFloor)
            icon.current.style.transform = `translate(${0}px, ${distance}px)`

        }
    }, [id, targetFloor, status, notifyElevatorArrived, handleAnimationEnd, floor, floorSize])

    return (
        <ElevatorIcon
            className="elevator-icon"
            ref={icon}
            style={{
                stroke: elevatorStatuses[status]?.color,
                transition: `transform ${timePerFloor * Math.abs(floor - targetFloor)}ms ease-in-out`
            }} />
    )
}

export default Elevator;