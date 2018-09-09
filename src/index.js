import { isTouch } from './utils';

let sketches = [
    {
        name: 'waves',
        sketch: () => import(/* webpackChunkName: 'waves' */ './waves'),
    },
    {
        name: 'flow-field',
        sketch: () => import(/* webpackChunkName: 'flow-field' */ './flow-field'),
    }
];

let curSketch = null;
let curIndex = 0;
let mute = true;
let clicked = false;

if (window.location.hash) {
    let hash = window.location.hash.slice(1);
    for (let i = 0; i < sketches.length; i++) {
        if (sketches[i].name === hash) {
            curIndex = i;
            break;
        }
    }
}

Promise.all([
    sketches[curIndex].sketch(),
    new Promise((resolve, reject) => { document.addEventListener("DOMContentLoaded", resolve); }),
]).then((results) => {

    let sketchConstr = results[0].default;

    let setMute = (newMute) => {
        mute = newMute;
        let element = document.getElementsByClassName('sketch-mute-button')[0];
        if (mute) {
            element.classList.toggle('fa-volume-up', false);
            element.classList.toggle('fa-volume-off', true);
        }
        else {
            element.classList.toggle('fa-volume-up', true);
            element.classList.toggle('fa-volume-off', false);
        }
    }

    let toggleMute = () => {
        setMute(!mute);
        if (mute) {
            curSketch.mute();
        }
        else {
            curSketch.unmute();
        }
    }

    let navigate = (delta) => {
        let newIndex = curIndex + delta;
        if (newIndex < 0 || newIndex >= sketches.length) {
            return;
        }

        if (newIndex !== curIndex) {
            curIndex = newIndex;

            let curLocation = window.location;
            window.location.assign(curLocation.origin + curLocation.pathname + '#' + sketches[curIndex].name);
            window.location.reload(true);
            return;
        }
        clicked = false;
        setMute(true);
        document.getElementsByClassName('sketch-left')[0].classList.toggle('disabled', curIndex === 0);
        document.getElementsByClassName('sketch-right')[0].classList.toggle('disabled', curIndex === sketches.length - 1);
    }

    let setupSketch = () => {
        curSketch = new sketchConstr({
            eventTarget: document.body,
            container: document.body,
            retina: 'auto'
        });

        let oldTouchStart = curSketch.ctx.touchstart;
        curSketch.ctx.touchstart = (event) => {
            if (oldTouchStart) {
                oldTouchStart(event);
            }
            // super jank way to prevent scrolling in mobile but keep all the clickables clickable
            let classList = event.target.classList;
            if (isTouch && event.target.tagName.toLowerCase() !== 'a' &&
                !classList.contains('sketch-left') &&
                !classList.contains('sketch-right')) {
                event.preventDefault();
            }
        }

        document.getElementsByClassName('sketch-mute')[0].style.display = curSketch.supportsAudio() ? 'block' : 'none';

        document.getElementsByClassName('sketch-title')[0].textContent = curSketch.getName();

        let style = curSketch.ctx.element.style;
        style.position = 'absolute';
        style.left = '0px';
        style.top = '0px';
        style.zIndex = '-1';
    };

    navigate(0);
    setupSketch();

    document.addEventListener('keydown', (event) => {
        const keyName = event.key;
        let newIndex = curIndex;

        if (keyName === 'ArrowLeft') {
            navigate(-1);
        } else if (keyName === 'ArrowRight') {
            navigate(1);
        }

        if (curSketch.supportsAudio() && clicked) {
            if (keyName === 'm') {
                toggleMute();
            }
        }
    });

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('sketch-left')) {
            navigate(-1);
            event.preventDefault();
            event.stopPropagation();
        }
        else if (event.target.classList.contains('sketch-right')) {
            navigate(1);
            event.preventDefault();
            event.stopPropagation();
        }

        if (clicked) {
            if (event.target.classList.contains('sketch-mute-button')) {
                toggleMute();
            }
        }
        else {
            clicked = true;
            setMute(false);
        }
    });

})
