import FlowField from './flow-field';
import Waves from './waves';

document.addEventListener("DOMContentLoaded", () => {

    let sketches = [
        FlowField,
        // Waves,
    ];

    let curSketch = null;
    let curIndex = 0;

    let setupSketch = () => {
        if (curSketch) {
            curSketch.ctx.destroy();
        }

        curSketch = new sketches[curIndex]({
            eventTarget: document.body,
            container: document.body,
            retina: 'auto'
        });

        let style = curSketch.ctx.element.style;
        style.position = 'absolute';
        style.left = '0px';
        style.top = '0px';
        style.zIndex = '-1';
    };

    setupSketch();
    
    document.addEventListener('keydown', (event) => {
        const keyName = event.key;
        let newIndex = curIndex;

        if (keyName === 'ArrowRight') {
            newIndex = (curIndex + 1) % sketches.length;
        }
        else if (keyName === 'ArrowLeft') {
            newIndex = (curIndex - 1) % sketches.length;
        }

        if (newIndex !== curIndex) {
            curIndex = newIndex;
            setupSketch();
        }
    });
});

