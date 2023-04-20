import React, { useCallback, useEffect, useRef } from 'react'
import { ReactComponent as ElevatorIcon } from '../assests/elevator.svg'
import { elevatorStatuses } from '../utils';
import bellElevatorSound from '../assests/bell_elevator.mp3'


const timePerFloor = 600
function Elevator({ id, status, floor, targetFloor, notifyElevatorArrived, floorSize }) {
    const icon = useRef();
    const elevatorSound = useRef(new Audio(bellElevatorSound)).current


    const handleAnimationEnd = useCallback(() => {
        notifyElevatorArrived(id)
        elevatorSound.play();

    }, [])

    useEffect(() => {
        icon.current.addEventListener('transitionend', handleAnimationEnd);
    }, [])

    useEffect(() => {
        if (status === elevatorStatuses.busy.key && targetFloor >= 0) {
            if (floor === targetFloor) {
                handleAnimationEnd()
            } else {
                const distance = floorSize * (floor - targetFloor)
                icon.current.style.transform = `translate(${0}px, ${distance}px)`
            }
        }
    }, [targetFloor, status, floor, floorSize, handleAnimationEnd])

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