//Event Listener
    //Event
    /* const EventEmitter = require("events");
    const emitter = new EventEmitter(); */

    /* //register a listener for an event
    emitter.on("trainWhistled", ({time, nextStation}) => {
        console.log(`Train will leave the station ${time} for ${nextStation}!`);
    })

    //raise an event
    //emitter.emit("trainWhistled", {time: "at 2.00pm", nextStation: "Joypurhat"});
    setTimeout(() => {
        emitter.emit("trainWhistled", {time: "at 2.00pm", nextStation: "Joypurhat"});
    }, 2000); */

    //with custom module(recommended)
    const Train = require("./train");
    const train = new Train();

    //register a listener for an event
    train.on("trainWhistled", ({time, nextStation}) => {
        console.log(`Train will leave the station ${time} for ${nextStation}!`);
    });

    //call the raise event
    train.trainStarts();