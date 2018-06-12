import { Landmark } from './landmark'

export class Landmarks {
    RADIUS = 5;
    max_len = 4;
    l_arr: Landmark[];

    constructor() {
        this.l_arr = [];
    }

    add_landmark(x, y) {
        if (this.l_arr.length < this.max_len) {
            this.l_arr.push(new Landmark(x, y, this.RADIUS));
        }
    }

    clear_landmarks() {
        this.l_arr = [];
    }

    load_annos(annos) {
        this.clear_landmarks();
        for (var i in annos) {
            this.add_landmark(annos[i].x, annos[i].y);
        }
    }
}