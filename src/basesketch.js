// import CCapture from 'ccapture.js';

export default class BaseSketch {
    constructor() {
        this.dark = (document.body.id === 'dark') ? 1 : 0;

        if (typeof CCapture !== 'undefined') {
            this.ccapture = new CCapture({
                format: 'png',
                framerate: 30,
                verbose: true,
            });
            this.numframes = 10 * 30;
            this.ccapture.start();
        }
    }

    getName() {
        return 'untitled';
    }

    supportsAudio() {
        return false;
    }

    setDarkMode(dark) {
        this.dark = (dark === true) ? 1 : 0;
    }

    capture(canvas) {

    }

    draw() {
        if (this.ccapture) {
            this.frames = (this.frames || 0);
            if (this.frames < this.numframes) {
                this.ccapture.capture(this.ctx.element);
            }
            else if (this.frames === this.numframes) {
                this.ccapture.stop();
                this.ccapture.save();
            }

            this.frames++;
        }
    }

    darkBG = "#0e0e0e".match(/[A-Za-z0-9]{2}/g).map(function(v) { return parseInt(v, 16) / 255 });
    lightBG = "#ffffff".match(/[A-Za-z0-9]{2}/g).map(function(v) { return parseInt(v, 16) / 255 });
}
