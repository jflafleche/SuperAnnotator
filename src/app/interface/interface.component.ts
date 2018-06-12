import { Component, OnInit, ViewChild } from '@angular/core';
import { CanvasCtrlComponent } from '../canvas-ctrl/canvas-ctrl.component';
import { LoaderComponent } from '../loader/loader.component'
import { Landmarks } from '../landmarks/landmarks';
import { Landmark } from '../landmarks/landmark';

import { HostListener } from '@angular/core';


@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})
export class InterfaceComponent implements OnInit {
  @ViewChild(CanvasCtrlComponent) 
  canvas: CanvasCtrlComponent;

  @ViewChild(LoaderComponent) 
  loader: LoaderComponent;

  @HostListener('document:keyup', ['$event'])
  onKeyUp(e: KeyboardEvent) {
    console.log(`The user just pressed ${e.key}!`);
    switch(e.key) {
      case 'n':
        this.loader.writeAnnotations(this.landmarks.l_arr);
        var curr = this.loader.next();
        break;
      case 'p':
        this.loader.writeAnnotations(this.landmarks.l_arr);
        var curr = this.loader.prev();
        break;
      default:
        return;
    }
    this.landmarks.load_annos(curr.annos);
    this.setBackground(curr.path);
  }
  
  showMsg: string;
  landmarks = new Landmarks;
  selection: Landmark;
  dragoffset = {'x': 0, 'y': 0};
  dragging = false;

  constructor() { }

  ngOnInit() {
    this.setBackground('/Users/jfl/code/whales/data/train/0a0b2a01.jpg')
  }

  setBackground(imgPath: string): void {
    this.canvas.background.src = imgPath;
    this.canvas.background.onload = () => {
      this.canvas.drawBackground();
      this.drawAnnos();
    }
  }

  onDown(mouse): void {
    var mx = mouse.x;
    var my = mouse.y;
    for (var i=0; i < this.landmarks.l_arr.length; i++) {
        if (this.landmarks.l_arr[i].contains(mx, my)) {
            this.selection = this.landmarks.l_arr[i];
            this.selection.r *= 2;
            this.dragoffset.x = mx - this.selection.x;
            this.dragoffset.y = my - this.selection.y;
            this.dragging = true;
            return;
        }
    }

    this.landmarks.add_landmark(mx, my);
    this.drawAnnos();
  }

  onUp(): void {
    if (this.selection) {
      this.dragging = false;
      this.selection.r /= 2;
      this.selection = null;
      this.drawAnnos();
    }
  }

  onMove(mouse): void {
    if (this.dragging) {
      var mx = mouse.x - this.dragoffset.x;;
      var my = mouse.y - this.dragoffset.y;;
      if (mx >= 0 && mx < 1.0) this.selection.x = mx;
      if (my >= 0 && my < 1.0) this.selection.y = my;
      this.drawAnnos();
    }
  }

  drawAnnos() {
    console.log(this.landmarks.l_arr)
    this.canvas.clearAnnos();
    this.landmarks.l_arr.forEach((pt) => {
      this.canvas.drawPoint(pt.x, pt.y, pt.r)
    });
  }

  goTo(idx) {
    var curr = this.loader.jump(idx);
    this.landmarks.load_annos(curr.annos);
    this.setBackground(curr.path);
  }
}
