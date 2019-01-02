import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
* Generated class for the RoutePage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-roulette',
  templateUrl: 'roulette.html',
})
export class RoulettePage {
  
  options:string[] = [];
  canvas:any;
  startAngle = 0;
  arc;
  spinTimeout = null;
  spinAngleStart;
  spinArcStart = 10;
  spinTime = 0;
  spinTimeTotal = 0;
  
  isDrawed = false;
  
  name = '';
  ctx;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  
  addHooker(){
    // this.options.splice(this.options.indexOf('Inserta participantes',1),1);
    if(this.name!==''){
      this.options.unshift(this.name);
      this.name = '';
      this.drawRouletteWheel();
    }    
    console.log(this.options);
  }
  
  reset(){
    let sp = document.createElement("canvas");
    sp.setAttribute("id","canvas")
    let parent = this.canvas.parentNode;
    parent.replaceChild(sp, this.canvas);
    this.options = [];
    this.name = '';
    this.isDrawed = false;
  }
  
  ionViewDidEnter() {
  }
  
  byte2Hex(n) {
    var nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
  }
  
  RGB2Color(r,g,b) {
    return '#' + this.byte2Hex(r) + this.byte2Hex(g) + this.byte2Hex(b);
  }
  
  getColor(item, maxitem) {
    var phase = 0;
    var center = 128;
    var width = 127;
    var frequency = Math.PI*2/maxitem;
    
    let red   = Math.sin(frequency*item+2+phase) * width + center;
    let green = Math.sin(frequency*item+0+phase) * width + center;
    let blue  = Math.sin(frequency*item+4+phase) * width + center;
    
    return this.RGB2Color(red,green,blue);
  }
  
  drawRouletteWheel() {
    this.arc = Math.PI / (this.options.length / 2);
    this.canvas = document.getElementById("canvas");
    console.log(this.canvas);
    if (this.canvas.getContext) {
      var outsideRadius = 150;
      var textRadius = 160;
      var insideRadius = 125;
      
      this.ctx = this.canvas.getContext("2d");
      this.ctx.canvas.width  = window.innerWidth;
      this.ctx.canvas.height = window.innerHeight;
      this.ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
      
      this.ctx.strokeStyle = "black";
      this.ctx.lineWidth = 2;
      
      this.ctx.font = 'bold 12px Helvetica, Arial';
      
      for(var i = 0; i < this.options.length; i++) {
        console.log(this.options[i]);
        var angle = this.startAngle + i * this.arc;
        //ctx.fillStyle = colors[i];
        this.ctx.fillStyle = this.getColor(i, this.options.length);
        
        this.ctx.beginPath();
        this.ctx.arc(window.innerWidth/2, window.innerHeight/3, outsideRadius, angle, angle + this.arc, false);
        this.ctx.arc(window.innerWidth/2, window.innerHeight/3, insideRadius, angle + this.arc, angle, true);
        this.ctx.stroke();
        this.ctx.fill();
        
        this.ctx.save();
        this.ctx.shadowOffsetX = -1;
        this.ctx.shadowOffsetY = -1;
        this.ctx.shadowBlur    = 0;
        this.ctx.shadowColor   = "rgb(220,220,220)";
        this.ctx.fillStyle = "black";
        this.ctx.translate(window.innerWidth/2 + Math.cos(angle + this.arc / 2) * textRadius, 
        window.innerHeight/3 + Math.sin(angle + this.arc / 2) * textRadius);
        this.ctx.rotate(angle + this.arc / 2 + Math.PI / 2);
        let text = this.options[i]!==undefined ? this.options[i]: 'Añade participantes.' ;
        this.ctx.fillText(text, - this.ctx.measureText(text).width / 2, 0);
        this.ctx.restore();
      } 
      
      //Arrow
      this.ctx.fillStyle = "black";
      this.ctx.beginPath();
      
      this.ctx.moveTo(window.innerWidth/2 - 4, window.innerHeight/3 - (outsideRadius + 5));
      this.ctx.lineTo(window.innerWidth/2 + 4, window.innerHeight/3 - (outsideRadius + 5));
      this.ctx.lineTo(window.innerWidth/2 + 4, window.innerHeight/3 - (outsideRadius - 5));
      this.ctx.lineTo(window.innerWidth/2 + 9, window.innerHeight/3 - (outsideRadius - 5));
      this.ctx.lineTo(window.innerWidth/2 + 0, window.innerHeight/3 - (outsideRadius - 13));
      this.ctx.lineTo(window.innerWidth/2 - 9, window.innerHeight/3 - (outsideRadius - 5));
      this.ctx.lineTo(window.innerWidth/2 - 4, window.innerHeight/3 - (outsideRadius - 5));
      this.ctx.lineTo(window.innerWidth/2 - 4, window.innerHeight/3 - (outsideRadius + 5));
      this.ctx.fill();
      this.ctx.stroke();
    }
    this.isDrawed = true;
  }
  
  spin() {
    this.spinAngleStart = Math.random() * 10 + 10;
    this.spinTime = 0;
    this.spinTimeTotal = Math.random() * 3 + 4 * 1000;
    this.rotateWheel();
  }
  
  rotateWheel():any {
    this.spinTime += 30;
    if(this.spinTime >= this.spinTimeTotal) {
      this.stopRotateWheel();
      return;
    }
    let spinAngle = this.spinAngleStart - this.easeOut(this.spinTime, 0, this.spinAngleStart, this.spinTimeTotal);
    this.startAngle += (spinAngle * Math.PI / 180);
    this.drawRouletteWheel();
    this.spinTimeout = setTimeout(this.rotateWheel(), 3);
  }
  
  stopRotateWheel() {
    clearTimeout(this.spinTimeout);
    let degrees = this.startAngle * 180 / Math.PI + 90;
    let arcd = this.arc * 180 / Math.PI;
    let index = Math.floor((360 - degrees % 360) / arcd);
    this.ctx.save();
    this.ctx.font = 'bold 30px Helvetica, Arial';
    let text = this.options[index]!==undefined ? `¡¡ Felicidades ${this.options[index]} !!` : 'Añade participantes.';
    this.ctx.fillText(text, window.innerWidth/2 - this.ctx.measureText(text).width / 2, window.innerHeight/3 + 10);
    this.ctx.restore();
  }
  
  easeOut(t, b, c, d) {
    var ts = (t/=d)*t;
    var tc = ts*t;
    return b+c*(tc + -3*ts + 3*t);
  }
}
