export default class BaseSketch {
    constructor() {
        this.dark = (document.body.id === 'dark') ? 1 : 0;
    }

    getName = () => {
        return 'untitled';
    }

    supportsAudio = () => {
        return false;
    }

    setDarkMode = (dark) => {
        this.dark = (dark === true) ? 1 : 0;
    }

    darkBG = "#0e0e0e".match(/[A-Za-z0-9]{2}/g).map(function(v) { return parseInt(v, 16) / 255 });
    lightBG = "#ffffff".match(/[A-Za-z0-9]{2}/g).map(function(v) { return parseInt(v, 16) / 255 });
}
