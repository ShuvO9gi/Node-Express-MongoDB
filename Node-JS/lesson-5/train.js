const EventEmitter = require("events");

class Train extends EventEmitter {
    trainStarts() {
        console.log("Train will leave the station after 2s!");

        // raise event when trainWhistled
        //raise an event
        //this.emit("trainWhistled", {time: "at 2.00pm", nextStation: "Joypurhat"});

        setTimeout(() => {
            this.emit("trainWhistled", {time: "at 2.00pm", nextStation: "Joypurhat"});
        }, 2000);
    }
}

module.exports = Train;