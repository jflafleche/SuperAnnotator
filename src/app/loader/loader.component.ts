import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  images = [];
  annotations = {};
  selectedDir: string;
  selectedIdx: number;
  mock_dict = {
    'image1': [1,1],
    'image2': [1,1],
  }
  mock = ['image1', 'image2', 'image3']

  constructor() { }

  ngOnInit() {
    this.selectedIdx = 0;
  }

  selectFolder(e) {
    console.log('folder selected')
    this.selectedDir = e.target.files[0].path;
    var path = window['path'];
    var fs = window['fs'];
    var files = fs.readdirSync(this.selectedDir);
    var ext = ''
    var images = [];
    files.forEach(((file) => this.processFile(file)));
    this.images.sort();
  }

  processFile(file: string): void {
    var ext = file.split('.').slice(-1)[0];
    if (ext == 'jpg' || ext == 'jpeg' || ext == 'png') {
      this.images.push(file);
    } 
    else if (file == 'annotations.json') {
      this.loadJSON();
    }
  }

  loadAnnotations() {
    var path = window['path'];
    var image_name = this.images[this.selectedIdx];
    var image_path = path.join(this.selectedDir, image_name)
    var annos = [];
    if (this.annotations[image_name] != undefined) {
      annos = this.annotations[image_name];
    }
    return {'path': image_path, 'annos': annos};
  }

  writeAnnotations(landmarks) {
    this.annotations[this.images[this.selectedIdx]] = landmarks;
    this.saveJSON(this.annotations);
  }


  loadJSON(): void {
    console.log('load json');
    var fs = window['fs'];
    var filepath = this.selectedDir + '/annotations.json'
    console.log(filepath);
    fs.readFile(filepath, 'utf-8', (err, data) => {
      if(err){
        alert("An error ocurred reading the file :" + err.message);
        return;
      }

      // Change how to handle the file content
      this.annotations = JSON.parse(data);
    })
  }

  saveJSON(obj) {
    var fs = window['fs'];
    var path = window['path'];
    var jsonifyTask = JSON.stringify(this.annotations);
    var filepath = path.join(this.selectedDir, 'annotations.json');
    fs.writeFile(filepath, jsonifyTask, (err) => {
        if (err) {
            alert("An error ocurred updating the file" + err.message);
            console.log(err);
            return;
        }
    });
};

  next() {
    this.selectedIdx = Math.min(this.images.length - 1, this.selectedIdx + 1);
    return this.loadAnnotations()
  }

  prev() {
    this.selectedIdx = Math.max(0, this.selectedIdx - 1);
    return this.loadAnnotations()
  }

  jump(idx) {
    this.selectedIdx = idx;
    return this.loadAnnotations()
  }

  checkIfDone(im_name) {
    return im_name in this.annotations;
  }
}
