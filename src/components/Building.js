import React, { useCallback, useEffect, useState } from "react";
import Floor from "./Floor";
import { elevatorStatuses } from "../utils";

function Building({ floorsAmount, elevatorsAmount }) {
    /** @type {{ id: number, status: string, floor: number, direction: string|null }[]} */
    const [elevators, setElevators] = useState([...new Array(elevatorsAmount)].map((x, i) => ({ id: i, status: elevatorStatuses.available.key, floor: 0, direction: null })))
    /** @type {{floor: number}[]} */
    const [callsQueue, setCallsQueue] = useState([])

    const isThereIdleElevator = useCallback(() => {
        return elevators.some(elevator => elevator.status === elevatorStatuses.available.key);
    }, [elevators]);
    const isAllElevatorIdle = useCallback(() => {
        return elevators.every(elevator => elevator.status === elevatorStatuses.available.key);
    }, [elevators]);

    const callElevator = (floor) => {
        setCallsQueue(prevCallsQueue => {
            const newCallsQueue = [...prevCallsQueue];
            newCallsQueue.push({ floor })
            console.log({ newCallsQueue });
            return newCallsQueue;
        });
    }

    const findClosestElevator = useCallback((floor) => {
        const idleElevators = elevators.filter(elevator => elevator.status === elevatorStatuses.available.key);
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
    }, [elevators]);

    const moveElevator = useCallback((call, elevatorToMove) => {
        setElevators(prevElevators => {
            return prevElevators.map(elevator => {
                if (elevatorToMove.id === elevator.id) {
                    return { ...elevator, status: elevatorStatuses.busy.key, floor: call.floor }
                } else
                    return elevator;
            });
        })
    }, [])

    // useEffect for callsQueue
    useEffect(() => {
        if (isThereIdleElevator() && callsQueue.length > 0) {
            const call = callsQueue[0]
            console.log('handle a call: ', call);
            const elevator = findClosestElevator(call.floor)
            moveElevator(call, elevator)
            // notify once it's done
            setCallsQueue(prevCallsQueue => {
                return prevCallsQueue.slice(1);
            })
        }
    }, [callsQueue, findClosestElevator, isThereIdleElevator, moveElevator]);

    useEffect(() => {
        // Handle elevators statuses
        if (!isAllElevatorIdle()) {
            setTimeout(() => {
                setElevators(prevElevators => {
                    return prevElevators.map(elevator => {
                        if (elevator.status === elevatorStatuses.busy.key) {
                            return { ...elevator, status: elevatorStatuses.arrived.key };
                        } else if (elevator.status === elevatorStatuses.arrived.key) {
                            return { ...elevator, status: elevatorStatuses.available.key };
                        } else {
                            return elevator;
                        }
                    });
                })
            }, 5000)
        }
    }, [elevators, isAllElevatorIdle])

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
