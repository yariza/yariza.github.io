import FlowField from './flow-field';
import Waves from './waves';

document.addEventListener("DOMContentLoaded", () => {

    let sketches = [
        Waves,
        FlowField,
    ];

    let curSketch = null;
    let curIndex = 0;

    let checkHash = (hash) => {
        for (let i = 0; i < sketches.length; i++) {
            if (sketches[i].getName() === hash) {
                curIndex = i;
                return;
            }
        }
    }

    let navigate = (delta) => {
        let newIndex = curIndex + delta;
        if (newIndex < 0 || newIndex >= sketches.length) {
            return;
        }

        if (newIndex !== curIndex) {
            curIndex = newIndex;
            setupSketch();
            window.location.hash = '#' + sketches[curIndex].getName();
        }
        document.getElementsByClassName('sketch-left')[0].classList.toggle('disabled', curIndex === 0);
        document.getElementsByClassName('sketch-right')[0].classList.toggle('disabled', curIndex === sketches.length - 1);
    }

    let setupSketch = () => {
        if (curSketch) {
            curSketch.ctx.destroy();
            for (let prop in curSketch) {
                if (curSketch.hasOwnProperty(prop)) {
                    delete curSketch[prop];
                }
            }
        }

        curSketch = new sketches[curIndex]({
            eventTarget: document.body,
            container: document.body,
            retina: 'auto'
        });

        document.getElementsByClassName('sketch-title')[0].textContent = sketches[curIndex].getName();

        let style = curSketch.ctx.element.style;
        style.position = 'absolute';
        style.left = '0px';
        style.top = '0px';
        style.zIndex = '-1';
    };

    if (window.location.hash) {
        checkHash(window.location.hash.slice(1));
    }

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
    });
});

