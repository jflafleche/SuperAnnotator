import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-canvas-ctrl',
  templateUrl: './canvas-ctrl.component.html',
  styleUrls: ['./canvas-ctrl.component.css']
})

export class CanvasCtrlComponent implements OnInit {
  canvas_bkg: HTMLCanvasElement;
  canvas_anno: HTMLCanvasElement;
  ctx_bkg: CanvasRenderingContext2D;
  ctx_anno: CanvasRenderingContext2D;
  background = new Image();

  @Output() down: EventEmitter<object> = new EventEmitter<object>();
  @Output() move: EventEmitter<object> = new EventEmitter<object>();
  @Output() up: EventEmitter<void> = new EventEmitter<void>();
  
  onDown(e) {
    var w = this.canvas_bkg.width;
    var h = this.canvas_bkg.height;
    var rect = this.canvas_anno.getBoundingClientRect();
    var x = (e.clientX - rect.left) / w;
    var y = (e.clientY - rect.top) / h;
    this.down.emit({x: x, y: y});
  }
  
  onUp() {
    this.up.emit();
  }

  onMove(e) {
    var w = this.canvas_bkg.width;
    var h = this.canvas_bkg.height;
    var rect = this.canvas_anno.getBoundingClientRect();
    var x = (e.clientX - rect.left) / w;
    var y = (e.clientY - rect.top) / h;
    this.move.emit({x: x, y: y});
  }

  constructor() { }

  ngOnInit() {
    this.canvas_bkg = document.getElementById('canvas_bkg') as HTMLCanvasElement;
    this.ctx_bkg = this.canvas_bkg.getContext('2d');
    this.canvas_anno = document.getElementById('canvas_anno') as HTMLCanvasElement;
    this.ctx_anno = this.canvas_anno.getContext('2d');
  }

  clearAnnos() {
    this.ctx_anno.clearRect(0, 0, this.canvas_anno.width, this.canvas_anno.height)
  }

  drawPoint(x, y, r) {
    var w = this.canvas_bkg.width;
    var h = this.canvas_bkg.height;
    this.ctx_anno.beginPath();
    this.ctx_anno.arc(x * w, y * h, r, 0, 2 * Math.PI);
    this.ctx_anno.fillStyle = '#FF4081';
    this.ctx_anno.fill();
    this.ctx_anno.strokeStyle = 'black';
    this.ctx_anno.stroke();
    this.ctx_anno.closePath();
  }

  drawLine(x1, y1, x2, y2) {
    var w = this.canvas_bkg.width;
    var h = this.canvas_bkg.height;
    this.ctx_anno.beginPath();
    this.ctx_anno.moveTo(x1 * w, y1 * h);
    this.ctx_anno.lineTo(x2 * w, y2 * h);
    this.ctx_anno.strokeStyle = '#FF4081';
    this.ctx_anno.stroke();
    this.ctx_anno.closePath();
  }

  drawBackground() {
    const scaling = this.canvas_bkg.width / this.background.width;
    var new_width = this.background.width * scaling;
    var new_height = this.background.height * scaling;
    this.canvas_bkg.height = new_height;
    this.canvas_anno.height = new_height;
    this.ctx_bkg.drawImage(this.background, 0, 0, new_width, new_height);  
  }
}
