import React, { useCallback, useEffect, useState } from "react";
import Floor from "./Floor";
import { elevatorStatuses } from "../utils";

function Building({ floorsAmount, elevatorsAmount }) {
    /** @type {{ id: number, status: string, floor: number}[]} */
    const [elevators, setElevators] = useState([...new Array(elevatorsAmount)].map((x, i) => ({ id: i, status: elevatorStatuses.available.key, floor: 0, targetFloor: -1 })))
    /** @type {{targetFloor: number}[]} */
    const [callsQueue, setCallsQueue] = useState([])

    const isThereIdleElevator = useCallback(() => {
        return elevators.some(elevator => elevator.status === elevatorStatuses.available.key);
    }, [elevators]);
    const AreThereArrivedElevators = useCallback(() => {
        return elevators.some(elevator => elevator.status === elevatorStatuses.arrived.key);
    }, [elevators]);

    const callElevator = (targetFloor) => {
        setCallsQueue(prevCallsQueue => {
            const newCallsQueue = [...prevCallsQueue];
            newCallsQueue.push({ targetFloor })
            console.log(`callsQueue: `, ...newCallsQueue);
            return newCallsQueue;
        });
    }

    const notifyElevatorArrived = (id) => {
        setElevators(prevElevators => {
            prevElevators[id].floor = prevElevators[id].targetFloor
            prevElevators[id].status = elevatorStatuses.arrived.key;
            return [...prevElevators]
        })
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
            return elevators.reduce((prev, curr) => {
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
                    return { ...elevator, status: elevatorStatuses.busy.key, targetFloor: call.targetFloor }
                } else
                    return elevator;
            });
        })
    }, [])

    useEffect(() => {
        if (isThereIdleElevator() && callsQueue.length > 0) {
            const call = callsQueue[0]
            const elevator = findClosestElevator(call.targetFloor)
            moveElevator(call, elevator)
            setCallsQueue(prevCallsQueue => {
                return prevCallsQueue.slice(1);
            })
        }
    }, [elevators, callsQueue, findClosestElevator, isThereIdleElevator, moveElevator]);

    useEffect(() => {
        if (AreThereArrivedElevators()) {
            setTimeout(() => {
                setElevators(prevElevators => {
                    return prevElevators.map(elevator => {
                        if (elevator.status === elevatorStatuses.arrived.key) {
                            return { ...elevator, status: elevatorStatuses.available.key };
                        } else {
                            return elevator;
                        }
                    });
                })
            }, 2000)
        }
    }, [elevators, AreThereArrivedElevators])

    return (
        <div id='building'>
            {[...new Array(floorsAmount)].map((x, i) => {
                const id = floorsAmount - i - 1
                return <Floor
                    key={i}
                    id={id}
                    floorsAmount={floorsAmount}
                    elevatorsAmount={elevatorsAmount}
                    elevators={elevators}
                    callElevator={callElevator}
                    notifyElevatorArrived={notifyElevatorArrived}
                    isElevatorArrived={elevators.some(elvtr => elvtr.status === elevatorStatuses.arrived.key && elvtr.floor === id)}
                />
            })}
        </div>
    );
}

export default Building;
