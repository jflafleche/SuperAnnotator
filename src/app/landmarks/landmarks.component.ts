import { Component, OnInit } from '@angular/core';
import { Landmark } from './landmark';
import { CanvasCtrlComponent } from '../canvas-ctrl/canvas-ctrl.component';

@Component({
  selector: 'app-landmarks',
  templateUrl: './landmarks.component.html',
  styleUrls: ['./landmarks.component.css']
})
export class LandmarksComponent implements OnInit {
  max_len = 4;
  RADIUS = 5;

  l_arr: Landmark[];

  constructor() { }

  ngOnInit() {
  }

  add_landmark(x, y) {

  }

  clear_landmarks() {
    this.l_arr = [];
  }
}
