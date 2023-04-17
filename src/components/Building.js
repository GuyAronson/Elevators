import React, { useState } from "react";
import Floor from "./Floor";

function Building({ floorsAmount, elevatorsAmount }) {
    const [elevators, setElevators] = useState([...new Array(floorsAmount)].map((x, i) => ({ id: i, busy: false, floor: 0, direction: null })))
    /** @type {{elevator: number, floor: number}} */
    const [callsQueue, setCallsQueue] = useState([])

    // useEffect for callsQueue

    const callElevator = (floor) => {
        const elevator = findClosestElevator(floor)
        setCallsQueue(callsQueue.push({ elevator: elevator.id, floor: floor }))
    }

    const findClosestElevator = (floor) => {
        const idleElevators = elevators.filter(elevator => !elevator.busy);
        if (idleElevators.length > 0) {
            return idleElevators.reduce((prev, curr) => {
                const prevDistance = Math.abs(prev.floor - floor);
                const currDistance = Math.abs(curr.floor - floor);
                return currDistance < prevDistance ? curr : prev;
            });
        } else {
            const elevatorsAbove = this.elevators.filter(elevator => elevator.direction === 'up' && elevator.floor <= floor);
            const elevatorsBelow = this.elevators.filter(elevator => elevator.direction === 'down' && elevator.floor >= floor);
            const allElevators = elevatorsAbove.concat(elevatorsBelow);
            return allElevators.reduce((prev, curr) => {
                const prevDistance = Math.abs(prev.floor - floor);
                const currDistance = Math.abs(curr.floor - floor);
                return currDistance < prevDistance ? curr : prev;
            });
        }
    }

    return (
        <div id='building'>
            {[...new Array(floorsAmount)].map((x, i) =>
                <Floor key={i} id={i} floorsAmount={floorsAmount} elevatorsAmount={elevatorsAmount} elevators={elevators} callElevator={callElevator} />
            )}
        </div>
    );
}

export default Building;
