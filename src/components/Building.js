import React, { useEffect, useState } from "react";
import Floor from "./Floor";

function Building({ floorsAmount, elevatorsAmount }) {
    /** @type {{ id: number, busy: boolean, floor: number, direction: string|null }[]} */
    const [elevators, setElevators] = useState([...new Array(floorsAmount)].map((x, i) => ({ id: i, busy: false, floor: 0, direction: null })))
    /** @type {{floor: number}[]} */
    const [callsQueue, setCallsQueue] = useState([])

    // useEffect for callsQueue
    useEffect(() => {
        if (isThereIdleElevator() && callsQueue.length > 0) {
            const call = callsQueue.pop();
            const elevator = findClosestElevator(call.floor)
            moveElevator(call, elevator)
            // notify once it's done
        }
    }, [callsQueue]);

    const isThereIdleElevator = () => {
        return elevators.some(elevator => !elevator.busy);
    }

    const callElevator = (floor) => {
        callsQueue.push({ floor: floor })
        setCallsQueue([...callsQueue])
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

    const moveElevator = (call, elevator) => {
        // if(call.floor> elevator.floor)
        //     elevator.direction = 'up'
        // else if(call.floor < elevator.floor)
        //     elevator.direction = 'down'
        const newElevators = [...elevators];
        let elevatorToMove = newElevators.find(e => e.id === elevator.id)
        elevatorToMove = { ...elevatorToMove, busy: true, direction: call.floor > elevatorToMove.floor ? "up" : "down" }
        setElevators(newElevators)
        setTimeout(() => {
            const updatedElevators = newElevators.map(elevator => {
                if (elevator.id === elevatorToMove.id) {
                    return { ...elevator, floor: call.floor, busy: false, direction: null };
                } else {
                    return elevator;
                }
            });
            setElevators(updatedElevators);
        }, 2000)
    }

    return (
        <div id='building'>
            {[...new Array(floorsAmount)].map((x, i) =>
                <Floor
                    key={i}
                    id={i}
                    floorsAmount={floorsAmount}
                    elevatorsAmount={elevatorsAmount}
                    elevators={elevators}
                    callElevator={callElevator} />
            )}
        </div>
    );
}

export default Building;
