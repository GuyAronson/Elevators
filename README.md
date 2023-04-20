# Elevator App

A web application that manages a building with multiple elevators. Users can call an elevator by clicking on the `call` button, and the elevator will move towards the requested floor and stop by it.

![צילום מסך 2023-04-20 162204](https://user-images.githubusercontent.com/83305443/233379781-f4089d3b-123f-4f8d-a3bc-40eb81bd68ec.png)

The finding elevator algorithm finds the closest elevator to the requested floor.
A busy elevator **can not be interrupted**, therefore, requesting another elevator from any other floor will call a different elevator.
There is **calls queue** implemented to never lose any request for an elevator

![צילום מסך 2023-04-20 162242](https://user-images.githubusercontent.com/83305443/233379820-db92c314-e6cc-43ff-b9f1-aa83ef655247.png)

This project is implemented using React.

## Installing

To get started, make sure you have [Node.js](https://nodejs.org/) installed on your machine. You can then install the necessary dependencies by running the following command:

```
npm install
```


## Running the App

Once you've installed the dependencies, you can run the app using the following command:

```
npm start
```
This will start the development server and open the app in your default browser. The page will automatically reload if you make changes to the code.

