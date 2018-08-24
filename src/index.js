import FlowField from './flow-field';

document.addEventListener("DOMContentLoaded", () => {

    let sketches = [
        FlowField,
    ];
    
    let sketch = new sketches[0]({
        eventTarget: document.body,
        container: document.body,
        retina: 'auto'
    });

    let style = sketch.ctx.element.style;
    style.position = 'absolute';
    style.left = '0px';
    style.top = '0px';
    style.zIndex = '-1';
});

