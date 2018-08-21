document.addEventListener("DOMContentLoaded", function() {

    // STABLE FLUIDS

    var visc = 0.3;

    var gridSize = 20;
    var mouseSpeed = 5;
    var timeScale = 5;
    var iterations = 20;

    var gridDim = {
        x: 0,
        y: 0,
    };

    var velocity_u, velocity_v;
    var next_velocity_u, next_velocity_v;
    var divergence, pressure;

    function bressenhamLine(inx0, iny0, inx1, iny1) {
        var points = [];

        var x0 = floor(inx0);
        var y0 = floor(iny0);
        var x1 = floor(inx1);
        var y1 = floor(iny1);

        var dx = x1 - x0;
        var dy = y1 - y0;
        var steep = (abs(dy) >= abs(dx));

        if (steep) {
            var tmp = x0;
            x0 = y0;
            y0 = tmp;

            tmp = x1;
            x1 = y1;
            y1 = tmp;

            // recompute Dx, Dy after swap
            dx = x1 - x0;
            dy = y1 - y0;
        }

        var xstep = 1;
        if (dx < 0) {
            xstep = -1;
            dx = -dx;
        }

        var ystep = 1;
        if (dy < 0) {
            ystep = -1;
            dy = -dy;
        }

        var twody = 2 * dy;
        var twodytwodx = twody - 2 * dx; // 2*Dy - 2*Dx
        var e = twody - dx; //2*Dy - Dx
        var y = y0;
        var xDraw, yDraw;

        for (var x = x0; x != x1; x += xstep) {
            if (steep) {
                xDraw = y;
                yDraw = x;
            }
            else {
                xDraw = x;
                yDraw = y;
            }

            // plot
            points.push({
                x: xDraw,
                y: yDraw,
            });

            if (e > 0) {
                e += twodytwodx; //E += 2*Dy - 2*Dx;
                y = y + ystep;
            }
            else {
                e += twody; //E += 2*Dy;
            }
        }

        if (points.length === 0) {
            points.push({
                x: inx0,
                y: iny0,
            });
        }

        return points;
    }

    function clamp(val, mmin, mmax) {
        return min(mmax, max(mmin, val));
    }

    function smoothstep(edge0, edge1, x) {
        x = clamp((x - edge0) / (edge1 - edge0), 0, 1);
        return x * x * (3 - 2 * x);
    }

    function getValue(arr, i, j) {
        var index = (j * (gridDim.x + 2)) + i;
        return arr[index];
    }

    function setValue(arr, i, j, val) {
        var index = (j * (gridDim.x + 2)) + i;
        arr[index] = val;
    }

    function getVelocity(i, j) {
        return {
            x: getValue(velocity_u, i + 1, j + 1),
            y: getValue(velocity_v, i + 1, j + 1),
        };
    }

    function setVelocity(i, j, vel) {
        setValue(velocity_u, i + 1, j + 1, vel.x);
        setValue(velocity_v, i + 1, j + 1, vel.y);
    }

    function swap_u() {
        var tmp = velocity_u;
        velocity_u = next_velocity_u;
        next_velocity_u = tmp;
    }

    function swap_v() {
        var tmp = velocity_v;
        velocity_v = next_velocity_v;
        next_velocity_v = tmp;
    }

    function interpolateD(d, i, j) {
        var i1 = clamp(floor(i), 0, gridDim.x);
        var i2 = i1 + 1;

        var j1 = clamp(floor(j), 0, gridDim.y);
        var j2 = j1 + 1;

        var s = clamp(i - i1, 0, 1);
        var t = clamp(j - j1, 0, 1);

        var d11 = getValue(d, i1, j1);
        var d12 = getValue(d, i1, j2);
        var d21 = getValue(d, i2, j1);
        var d22 = getValue(d, i2, j2);

        return (d11 * (1 - s) + d21 * s) * (1 - t) +
               (d12 * (1 - s) + d22 * s) * t;
    }

    function set_boundary_corners(x) {
        setValue(x, 0            , 0            , 0.5 * (getValue(x, 1, 0) + getValue(x, 0, 1)));
        setValue(x, 0            , gridDim.y + 1, 0.5 * (getValue(x, 1, gridDim.y + 1) + getValue(x, 0, gridDim.y)));
        setValue(x, gridDim.x + 1, 0            , 0.5 * (getValue(x, gridDim.x, 0) + getValue(x, gridDim.x + 1, 1)));
        setValue(x, gridDim.x + 1, gridDim.y + 1, 0.5 * (getValue(x, gridDim.x, gridDim.y + 1) + getValue(x, gridDim.x + 1, gridDim.y)));
    }

    function set_boundary_solid(x) {
        for (var i = 0; i <= gridDim.x + 1; i++) {
            setValue(x, i, 0            , getValue(x, i, 1));
            setValue(x, i, gridDim.y + 1, getValue(x, i, gridDim.y));
        }
        for (var j = 0; j <= gridDim.y + 1; j++) {
            setValue(x, 0            , j, getValue(x, 1, j));
            setValue(x, gridDim.x + 1, j, getValue(x, gridDim.x, j));
        }
        set_boundary_corners(x);
    }

    function set_boundary_horizontal(x) {
        for (var i = 0; i <= gridDim.x + 1; i++) {
            setValue(x, i, 0            , -getValue(x, i, 1));
            setValue(x, i, gridDim.y + 1, -getValue(x, i, gridDim.y));
        }
        for (var j = 0; j <= gridDim.y + 1; j++) {
            setValue(x, 0            , j, getValue(x, 1, j));
            setValue(x, gridDim.x + 1, j, getValue(x, gridDim.x, j));
        }
        set_boundary_corners(x);
    }

    function set_boundary_vertical(x) {
        for (var i = 0; i <= gridDim.x + 1; i++) {
            setValue(x, i, 0            , getValue(x, i, 1));
            setValue(x, i, gridDim.y + 1, getValue(x, i, gridDim.y));
        }
        for (var j = 0; j <= gridDim.y + 1; j++) {
            setValue(x, 0            , j, -getValue(x, 1, j));
            setValue(x, gridDim.x + 1, j, -getValue(x, gridDim.x, j));
        }
        set_boundary_corners(x);
    }

    function diffuse(x, x0, diff, dt) {
        var a = dt * diff / gridSize / gridSize;
        
        for (var k = 0; k < iterations; k++) {
            for (var i = 1; i <= gridDim.x; i++) {
                for (var j = 1; j <= gridDim.y; j++) {
                    setValue(x, i, j,
                        (getValue(x0, i, j) + a * (getValue(x, i - 1, j) + getValue(x, i + 1, j) +
                                                   getValue(x, i, j - 1) + getValue(x, i, j + 1))
                        ) / (1 + 4 * a)
                    );
                }
            }
        }
    }

    function advect(x, x0, u, v, dt) {
        for (var i = 1; i <= gridDim.x; i++) {
            for (var j = 1; j <= gridDim.y; j++) {
                var bi = i - getValue(u, i, j) * dt / gridSize;
                var bj = j - getValue(v, i, j) * dt / gridSize;

                setValue(x, i, j, interpolateD(x0, bi, bj));
            }
        }
    }

    function project(u, v, u0, v0) {

        var h = gridSize;

        for (var i = 1; i <= gridDim.x; i++) {
            for (var j = 1; j <= gridDim.y; j++) {
                setValue(divergence, i, j,
                    -0.5 * h * (getValue(velocity_u, i + 1, j) - getValue(velocity_u, i - 1, j) +
                                getValue(velocity_v, i, j + 1) - getValue(velocity_v, i, j - 1))
                );
                setValue(pressure, i, j, 0);
            }
        }

        set_boundary_solid(divergence);
        set_boundary_solid(pressure);

        for (var k = 0; k < iterations; k++) {
            for (var i = 1; i <= gridDim.x; i++) {
                for (var j = 1; j <= gridDim.y; j++) {
                    setValue(pressure, i, j, 
                        (getValue(divergence, i, j) + getValue(pressure, i - 1, j) +
                                                      getValue(pressure, i + 1, j) +
                                                      getValue(pressure, i, j - 1) +
                                                      getValue(pressure, i, j + 1)
                        ) / 4
                    );
                }
            }
            set_boundary_solid(pressure);
        }

        for (var i = 1; i <= gridDim.x; i++) {
            for (var j = 1; j <= gridDim.y; j++) {
                setValue(velocity_u, i, j,
                    getValue(velocity_u, i, j) -
                    0.5 * (getValue(pressure, i + 1, j) - getValue(pressure, i - 1, j)) / h
                );
                setValue(velocity_v, i, j,
                    getValue(velocity_v, i, j) -
                    0.5 * (getValue(pressure, i, j + 1) - getValue(pressure, i, j - 1)) / h
                );
            }
        }
        set_boundary_vertical(u);
        set_boundary_horizontal(v);
    }

    function vel_step(u, v, u0, v0, visc, dt) {

        diffuse(u0, u, visc, dt);
        set_boundary_vertical(u0);
        diffuse(v0, v, visc, dt);
        set_boundary_horizontal(v0);

        project(u0, v0, u, v);

        // advect u/v -> u0/v0
        advect(u, u0, u0, v0, dt);
        set_boundary_vertical(u);
        advect(v, v0, u0, v0, dt);
        set_boundary_horizontal(v);

        project(u, v, u0, v0);
    }

    // SKETCH

    var ctx = Sketch.create({
        eventTarget: document.body,
        container: document.body,
        retina: 'auto'
    });

    ctx.resize = function() {
        gridDim.x = floor(ctx.width / gridSize);
        gridDim.y = floor(ctx.height / gridSize);

        var numCells = (gridDim.x + 2) * (gridDim.y + 2);
        velocity_u = new Float32Array(numCells);
        velocity_v = new Float32Array(numCells);
        next_velocity_u = new Float32Array(numCells);
        next_velocity_v = new Float32Array(numCells);
        divergence = new Float32Array(numCells);
        pressure = new Float32Array(numCells);
    }

    ctx.mousemove = function() {
        var mouse = ctx.mouse;
        if (mouse.dx === 0 && mouse.dy === 0) return;

        var i = clamp(floor(mouse.x / gridSize), 0, gridDim.x - 1);
        var j = clamp(floor(mouse.y / gridSize), 0, gridDim.y - 1);
        var oi = clamp(floor(mouse.ox / gridSize), 0, gridDim.x - 1);
        var oj = clamp(floor(mouse.oy / gridSize), 0, gridDim.y - 1);

        var points = bressenhamLine(i, j, oi, oj);

        for (var index = 0; index < points.length; index++) {
            var p = points[index];
            var v = getVelocity(p.x, p.y);

            v.x += mouse.dx * mouseSpeed;
            v.y += mouse.dy * mouseSpeed;

            setVelocity(p.x, p.y, v);
        }
    }

    ctx.update = function() {

        next_velocity_u.set(velocity_u);
        next_velocity_v.set(velocity_v);

        vel_step(next_velocity_u, next_velocity_v, velocity_u, velocity_v, visc, ctx.dt * timeScale / 1000);

        // swap velocity buffers;
        swap_u();
        swap_v();
    }

    ctx.draw = function() {
        ctx.lineWidth = 2.0;
        ctx.strokeStyle = '#999';
        for (var j = 0; j < gridDim.y; j++)
        {
            var jNorm = j / (gridDim.y - 1);
            var alpha = smoothstep(0.5, 0, abs(jNorm - 0.5));
            var grayscale = floor(lerp(1, 0.6, alpha) * 255);
            ctx.strokeStyle = 'rgb(' + grayscale + ', ' + grayscale + ', ' + grayscale + ')';

            for (var i = 0; i < gridDim.x; i++)
            {
                var p = {
                    x: (i + 0.5) * gridSize,
                    y: (j + 0.5) * gridSize,
                };

                var v = getVelocity(i, j);

                v.x = v.x;
                v.y = v.y;

                var len = sqrt(v.x * v.x + v.y * v.y);
                var newLen = min(gridSize, len);

                v.x = v.x * newLen / len;
                v.y = v.y * newLen / len;

                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p.x + v.x, p.y + v.y);
                ctx.stroke();
            }
        }
    }

    var style = ctx.element.style;
    style.position = 'absolute';
    style.left = '0px';
    style.top = '0px';
    style.zIndex = '-1';
});
