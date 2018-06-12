export class Landmark {
    x: number;
    y: number;
    r: number;

    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    contains(mx, my) {
        return (this.x - mx)**2 + (this.y - my)**2 <= 0.0005
    }
}