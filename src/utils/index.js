function is_touch_device() {
    var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
    var mq = function(query) {
        return window.matchMedia(query).matches;
    }
    
    if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
        return true;
    }
    
    // include the 'heartz' as a way to have a non matching MQ to help terminate the join
    // https://git.io/vznFH
    var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
    return mq(query);
}

export const isTouch = is_touch_device();

export const smoothdamp = (current, target, currentVelocity, smoothTime, maxSpeed, deltaTime) => {
    smoothTime = max (0.000, smoothTime);
    let num = 2 / smoothTime;
    let num2 = num * deltaTime;
    let num3 = 1 / (1 + num2 + 0.48 * num2 * num2 + 0.235 * num2 * num2 * num2);
    let num4 = current - target;
    let num5 = target;
    let num6 = maxSpeed * smoothTime;
    num4 = clamp (num4, -num6, num6);
    target = current - num4;
    let num7 = (currentVelocity + num * num4) * deltaTime;
    currentVelocity = (currentVelocity - num * num7) * num3;
    let num8 = target + (num4 + num7) * num3;
    if (num5 - current > 0 === num8 > num5)
    {
        num8 = num5;
        currentVelocity = (num8 - num5) / deltaTime;
    }
    return [num8, currentVelocity];
};
