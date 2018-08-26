import Sketch from '../sketch';

export default class Waves {

    constructor(options) {

        this.ctx = Sketch.create(options);

        this.ctx.draw = this.draw.bind(this);
    }

    draw = () => {
        
    }
}
