import SimplexNoise from 'simplex-noise';
import Sketch from '../sketch';

export default class FlowField {

    constructor(options) {
        this.viscosity = 0.3;

        this.gridSize = 20;
        this.mouseSpeed = 5;
        this.timeScale = 5;
        this.iterations = 20;
        this.noiseScale = 0.02;
        this.noiseFreq = 0.05;
        this.noiseEvolution = 0.2;
    
        this.gridDim = {
            x: 0,
            y: 0,
        };
    
        this.simplex = new SimplexNoise();

        this.ctx = Sketch.create(options);

        this.ctx.resize = this.resize.bind(this);
        this.ctx.mousemove = this.mousemove.bind(this);
        this.ctx.update = this.update.bind(this);
        this.ctx.draw = this.draw.bind(this);
    }

    static getName = () => {
        return 'flow-field';
    }

    bressenhamLine = (inx0, iny0, inx1, iny1, callback) => {
        let x0 = floor(inx0);
        let y0 = floor(iny0);
        let x1 = floor(inx1);
        let y1 = floor(iny1);

        let dx = x1 - x0;
        let dy = y1 - y0;
        let steep = (abs(dy) >= abs(dx));

        if (steep) {
            let tmp = x0;
            x0 = y0;
            y0 = tmp;

            tmp = x1;
            x1 = y1;
            y1 = tmp;

            // recompute Dx, Dy after swap
            dx = x1 - x0;
            dy = y1 - y0;
        }

        let xstep = 1;
        if (dx < 0) {
            xstep = -1;
            dx = -dx;
        }

        let ystep = 1;
        if (dy < 0) {
            ystep = -1;
            dy = -dy;
        }

        let twody = 2 * dy;
        let twodytwodx = twody - 2 * dx; // 2*Dy - 2*Dx
        let e = twody - dx; //2*Dy - Dx
        let y = y0;
        let xDraw, yDraw;

        let once = false;

        for (let x = x0; x != x1; x += xstep) {
            if (steep) {
                xDraw = y;
                yDraw = x;
            }
            else {
                xDraw = x;
                yDraw = y;
            }

            callback(xDraw, yDraw);

            if (e > 0) {
                e += twodytwodx; //E += 2*Dy - 2*Dx;
                y = y + ystep;
            }
            else {
                e += twody; //E += 2*Dy;
            }

            once = true;
        }

        if (!once) {
            callback(inx0, iny0);
        }
    }

    clamp = (val, mmin, mmax) => {
        return min(mmax, max(mmin, val));
    }

    smoothstep = (edge0, edge1, x) => {
        x = this.clamp((x - edge0) / (edge1 - edge0), 0, 1);
        return x * x * (3 - 2 * x);
    }

    getValue = (arr, i, j) => {
        let index = (j * (this.gridDim.x + 2)) + i;
        return arr[index];
    }

    setValue = (arr, i, j, val) => {
        let index = (j * (this.gridDim.x + 2)) + i;
        arr[index] = val;
    }

    getVelocity = (i, j) => {
        return {
            x: this.getValue(this.velocity_u, i + 1, j + 1),
            y: this.getValue(this.velocity_v, i + 1, j + 1),
        };
    }

    setVelocity = (i, j, vel) => {
        this.setValue(this.velocity_u, i + 1, j + 1, vel.x);
        this.setValue(this.velocity_v, i + 1, j + 1, vel.y);
    }

    swap_u = () => {
        let tmp = this.velocity_u;
        this.next_velocity_u = this.velocity_u;
        this.velocity_u = tmp;
    }

    swap_v = () => {
        let tmp = this.velocity_v;
        this.next_velocity_v = this.velocity_v;
        this.velocity_v = tmp;
    }

    interpolateD = (d, i, j) => {
        let i1 = this.clamp(floor(i), 0, this.gridDim.x);
        let i2 = i1 + 1;

        let j1 = this.clamp(floor(j), 0, this.gridDim.y);
        let j2 = j1 + 1;

        let s = this.clamp(i - i1, 0, 1);
        let t = this.clamp(j - j1, 0, 1);

        let d11 = this.getValue(d, i1, j1);
        let d12 = this.getValue(d, i1, j2);
        let d21 = this.getValue(d, i2, j1);
        let d22 = this.getValue(d, i2, j2);

        return (d11 * (1 - s) + d21 * s) * (1 - t) +
               (d12 * (1 - s) + d22 * s) * t;
    }

    set_boundary_corners = (x) => {
        this.setValue(x, 0                 , 0                 , 0.5 * (this.getValue(x, 1, 0) + this.getValue(x, 0, 1)));
        this.setValue(x, 0                 , this.gridDim.y + 1, 0.5 * (this.getValue(x, 1, this.gridDim.y + 1) + this.getValue(x, 0, this.gridDim.y)));
        this.setValue(x, this.gridDim.x + 1, 0                 , 0.5 * (this.getValue(x, this.gridDim.x, 0) + this.getValue(x, this.gridDim.x + 1, 1)));
        this.setValue(x, this.gridDim.x + 1, this.gridDim.y + 1, 0.5 * (this.getValue(x, this.gridDim.x, this.gridDim.y + 1) + this.getValue(x, this.gridDim.x + 1, this.gridDim.y)));
    }

    set_boundary_solid = (x) => {
        for (let i = 0; i <= this.gridDim.x + 1; i++) {
            this.setValue(x, i, 0            , this.getValue(x, i, 1));
            this.setValue(x, i, this.gridDim.y + 1, this.getValue(x, i, this.gridDim.y));
        }
        for (let j = 0; j <= this.gridDim.y + 1; j++) {
            this.setValue(x, 0            , j, this.getValue(x, 1, j));
            this.setValue(x, this.gridDim.x + 1, j, this.getValue(x, this.gridDim.x, j));
        }
        this.set_boundary_corners(x);
    }

    set_boundary_horizontal = (x) => {
        for (let i = 0; i <= this.gridDim.x + 1; i++) {
            this.setValue(x, i, 0            , -this.getValue(x, i, 1));
            this.setValue(x, i, this.gridDim.y + 1, -this.getValue(x, i, this.gridDim.y));
        }
        for (let j = 0; j <= this.gridDim.y + 1; j++) {
            this.setValue(x, 0            , j, this.getValue(x, 1, j));
            this.setValue(x, this.gridDim.x + 1, j, this.getValue(x, this.gridDim.x, j));
        }
        this.set_boundary_corners(x);
    }

    set_boundary_vertical = (x) => {
        for (let i = 0; i <= this.gridDim.x + 1; i++) {
            this.setValue(x, i, 0            , this.getValue(x, i, 1));
            this.setValue(x, i, this.gridDim.y + 1, this.getValue(x, i, this.gridDim.y));
        }
        for (let j = 0; j <= this.gridDim.y + 1; j++) {
            this.setValue(x, 0            , j, -this.getValue(x, 1, j));
            this.setValue(x, this.gridDim.x + 1, j, -this.getValue(x, this.gridDim.x, j));
        }
        this.set_boundary_corners(x);
    }

    diffuse = (x, x0, diff, dt) => {
        let a = dt * diff / this.gridSize / this.gridSize;
        
        for (let k = 0; k < this.iterations; k++) {
            for (let i = 1; i <= this.gridDim.x; i++) {
                for (let j = 1; j <= this.gridDim.y; j++) {
                    this.setValue(x, i, j,
                        (this.getValue(x0, i, j) + a * (this.getValue(x, i - 1, j) + this.getValue(x, i + 1, j) +
                                                        this.getValue(x, i, j - 1) + this.getValue(x, i, j + 1))
                        ) / (1 + 4 * a)
                    );
                }
            }
        }
    }

    advect = (x, x0, u, v, dt) => {
        for (let i = 1; i <= this.gridDim.x; i++) {
            for (let j = 1; j <= this.gridDim.y; j++) {
                let bi = i - this.getValue(u, i, j) * dt / this.gridSize;
                let bj = j - this.getValue(v, i, j) * dt / this.gridSize;

                this.setValue(x, i, j, this.interpolateD(x0, bi, bj));
            }
        }
    }

    project = (u, v, u0, v0) => {

        let h = this.gridSize;

        for (let i = 1; i <= this.gridDim.x; i++) {
            for (let j = 1; j <= this.gridDim.y; j++) {
                this.setValue(this.divergence, i, j,
                    -0.5 * h * (this.getValue(u0, i + 1, j) - this.getValue(u0, i - 1, j) +
                                this.getValue(v0, i, j + 1) - this.getValue(v0, i, j - 1))
                );
                this.setValue(this.pressure, i, j, 0);
            }
        }

        this.set_boundary_solid(this.divergence);
        this.set_boundary_solid(this.pressure);

        for (let k = 0; k < this.iterations; k++) {
            for (let i = 1; i <= this.gridDim.x; i++) {
                for (let j = 1; j <= this.gridDim.y; j++) {
                    this.setValue(this.pressure, i, j, 
                        (this.getValue(this.divergence, i, j) + this.getValue(this.pressure, i - 1, j) +
                                                                this.getValue(this.pressure, i + 1, j) +
                                                                this.getValue(this.pressure, i, j - 1) +
                                                                this.getValue(this.pressure, i, j + 1)
                        ) / 4
                    );
                }
            }
            this.set_boundary_solid(this.pressure);
        }

        for (let i = 1; i <= this.gridDim.x; i++) {
            for (let j = 1; j <= this.gridDim.y; j++) {
                this.setValue(u, i, j,
                    this.getValue(u0, i, j) -
                    0.5 * (this.getValue(this.pressure, i + 1, j) - this.getValue(this.pressure, i - 1, j)) / h
                );
                this.setValue(v, i, j,
                    this.getValue(v0, i, j) -
                    0.5 * (this.getValue(this.pressure, i, j + 1) - this.getValue(this.pressure, i, j - 1)) / h
                );
            }
        }
        this.set_boundary_vertical(u);
        this.set_boundary_horizontal(v);
    }

    vel_step = (u, v, u0, v0, visc, dt) => {

        this.diffuse(u0, u, visc, dt);
        this.set_boundary_vertical(u0);
        this.diffuse(v0, v, visc, dt);
        this.set_boundary_horizontal(v0);

        this.project(u, v, u0, v0);

        // advect u/v -> u0/v0
        this.advect(u0, u, u, v, dt);
        this.set_boundary_vertical(u0);
        this.advect(v0, v, u, v, dt);
        this.set_boundary_horizontal(v0);

        this.project(u, v, u0, v0);
    }

    computeCurl = (x, y, t) => {
        let eps = 0.0001;
      
        //Find rate of change in X direction
        let n1 = this.simplex.noise3D(x + eps, y, t);
        let n2 = this.simplex.noise3D(x - eps, y, t);
      
        //Average to find approximate derivative
        let a = (n1 - n2)/(2 * eps);
      
        //Find rate of change in Y direction
        n1 = this.simplex.noise3D(x, y + eps, t);
        n2 = this.simplex.noise3D(x, y - eps, t);
      
        //Average to find approximate derivative
        let b = (n1 - n2)/(2 * eps);
      
        //Curl
        return [b, -a];
    }
            
    add_velocity = (u, v) => {
        let t = this.ctx.millis * this.noiseEvolution / 1000;
        for (let i = 1; i <= this.gridDim.x; i++) {
            for (let j = 1; j <= this.gridDim.y; j++) {
                let curl = this.computeCurl(i * this.noiseFreq, j * this.noiseFreq, t);
                this.setValue(u, i, j, this.getValue(u, i, j) + curl[0] * this.noiseScale);
                this.setValue(v, i, j, this.getValue(v, i, j) + curl[1] * this.noiseScale);
            }
        }
    }

    resize = () => {
        if (!this.ctx) return;

        this.gridDim.x = floor(this.ctx.width / this.gridSize);
        this.gridDim.y = floor(this.ctx.height / this.gridSize);

        let numCells = (this.gridDim.x + 2) * (this.gridDim.y + 2);
        this.velocity_u = new Float32Array(numCells);
        this.velocity_v = new Float32Array(numCells);
        this.next_velocity_u = new Float32Array(numCells);
        this.next_velocity_v = new Float32Array(numCells);
        this.divergence = new Float32Array(numCells);
        this.pressure = new Float32Array(numCells);
    };

    mousemove = () => {
        let mouse = this.ctx.mouse;
        if (mouse.dx === 0 && mouse.dy === 0) return;

        let i = this.clamp(floor(mouse.x / this.gridSize), 0, this.gridDim.x - 1);
        let j = this.clamp(floor(mouse.y / this.gridSize), 0, this.gridDim.y - 1);
        let oi = this.clamp(floor(mouse.ox / this.gridSize), 0, this.gridDim.x - 1);
        let oj = this.clamp(floor(mouse.oy / this.gridSize), 0, this.gridDim.y - 1);

        this.bressenhamLine(i, j, oi, oj, (px, py) => {
            let v = this.getVelocity(px, py);

            v.x += mouse.dx * this.mouseSpeed;
            v.y += mouse.dy * this.mouseSpeed;

            this.setVelocity(px, py, v);
        });
    }

    update = () => {

        if (this.swap === undefined) this.swap = false;

        let u = this.swap ? this.next_velocity_u : this.velocity_u;
        let v = this.swap ? this.next_velocity_v : this.velocity_v;
        let next_u = this.swap ? this.velocity_u : this.next_velocity_u;
        let next_v = this.swap ? this.velocity_v : this.next_velocity_v;

        this.add_velocity(u, v);

        next_u.set(u);
        next_v.set(v);

        this.vel_step(next_u, next_v, u, v, this.viscosity, this.ctx.dt * this.timeScale / 1000);

        // swap velocity buffers;
        this.swap = !this.swap;
    }

    draw = () => {
        this.ctx.lineWidth = 2.0;
        let baseColor = 0.6;
        for (let j = 0; j < this.gridDim.y; j++)
        {
            let jNorm = j / (this.gridDim.y - 1);
            let alpha = this.smoothstep(0.5, 0, abs(jNorm - 0.5));

            for (let i = 0; i < this.gridDim.x; i++)
            {
                let p = {
                    x: (i + 0.5) * this.gridSize,
                    y: (j + 0.5) * this.gridSize,
                };

                let v = this.getVelocity(i, j);

                v.x = v.x;
                v.y = v.y;

                let len = sqrt(v.x * v.x + v.y * v.y);
                if (len === 0) continue;

                let scale = 1 - pow(1.5, -len / this.gridSize);

                let color = alpha * scale;
                let grayscale = floor(lerp(1.0, 0.4, color) * 255);
                this.ctx.strokeStyle = 'rgb(' + grayscale + ', ' + grayscale + ', ' + grayscale + ')';
    
                let constrainedLen = min(this.gridSize * 0.7, len / 2);
                v.x = v.x * constrainedLen / len;
                v.y = v.y * constrainedLen / len;

                this.ctx.beginPath();
                this.ctx.moveTo(p.x, p.y);
                this.ctx.lineTo(p.x + v.x, p.y + v.y);
                this.ctx.stroke();
            }
        }
    }
    
}
