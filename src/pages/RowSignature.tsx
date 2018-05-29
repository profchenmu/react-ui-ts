import * as React from 'react';
class RowSignature extends React.Component<any, any> {
  constructor(props: object) {
    super(props);
    this.state = {
    }
    this.drawStart = this.drawStart.bind(this);
    this.drawing = this.drawing.bind(this);
    this.drawEnd = this.drawEnd.bind(this);
    this.reset = this.reset.bind(this);
  }
  canvas:any
  ctx:any
  canvas2:any
  ctx2:any
  x:number
  y:number
  maxX:number
  maxY:number
  minX:number
  minY:number
  componentDidMount() {
    this.canvas = document.getElementById('canvas');
    this.canvas2 = this.refs.canvas2;
    // this.canvas2 = document.getElementById('canvas2');
    this.ctx = this.canvas.getContext('2d');
    this.ctx2 = this.canvas2.getContext('2d');
    this.y = this.canvas.offsetTop;
    this.x = this.canvas.offsetLeft;
    this.maxX = this.maxY = 0;
    this.minX = this.canvas.clientWidth;
    this.minY = this.canvas.clientHeight;
  }
  reset(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx2.clearRect(0, 0, this.canvas2.width, this.canvas2.height);
  }
  drawEnd(e:any) {
    this.minX < 0 && (this.minX = 0);
    this.minY < 0 && (this.minY = 0);
    this.maxX > this.canvas.clientWidth && (this.maxX = this.canvas.clientWidth);
    this.maxY > this.canvas.clientHeight && (this.maxY = this.canvas.clientHeight);
    let file = this.canvas.toDataURL('base64');
    let img = new Image();
    img.src = file;
    let canvas2:any = this.refs.canvas2;
    canvas2.setAttribute('width', (this.maxX - this.minX));
    canvas2.setAttribute('height', (this.maxY - this.minY));
    let ctx2 = canvas2.getContext('2d');
    // ctx2.drawImage(img, (this.minX - this.maxX), (this.minY - this.maxY), this.minX, this.minY);
    console.log(
        (this.minX), 
        (this.minY), 
        (this.minX - this.maxX), 
        (this.minY - this.maxY), 
        0, 
        0, 
        (this.minX - this.maxX), 
        (this.minY - this.maxY))
    img.onload = () => {
      ctx2.drawImage(
        img, 
        (this.minX), 
        (this.minY), 
        (this.maxX - this.minX), 
        (this.maxY - this.minY), 
        0, 
        0,
        (this.maxX - this.minX),
        (this.maxY - this.minY)
      );
      let cao = canvas2.toDataURL('base64');
      console.log(cao);
    }
  }
  drawStart(e:any) {
    let scrollingElement:any = document.scrollingElement
    let _y = scrollingElement.scrollTop;
    let x = e.touches[0].clientX - this.canvas.offsetLeft;
    let y = e.touches[0].clientY - this.canvas.offsetTop +_y;
    this.x = x;
    this.y = y;
  }
  drawing(e:any) {
    e.preventDefault();
    let scrollingElement:any = document.scrollingElement
    let _y = scrollingElement.scrollTop;
    let x = e.touches[0].clientX - this.canvas.offsetLeft;
    let y = e.touches[0].clientY - this.canvas.offsetTop +_y;
    
    (x < this.minX) && (this.minX = x); 
    (y < this.minY) && (this.minY = y);

    (x > this.maxX) && (this.maxX = x); 
    (y > this.maxY) && (this.maxY = y);
    console.log(this.minX, this.maxX)
    this.draw(x,y);
  }
  draw(x:number, y:number) {
    this.ctx.strokeStyle = "red";
    this.ctx.lineWidth = 5;
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);//拿起画笔到新坐标

    this.ctx.lineTo(x, y);//画线

    this.ctx.closePath();
    this.ctx.stroke();
    this.x = x;
    this.y = y;
  }
  render() {
    return (
      <div>
        <canvas id="canvas"
          onTouchStart={this.drawStart}
          onTouchMove={this.drawing}
          onTouchEnd={this.drawEnd}
        />
        <canvas ref="canvas2" />
        <button onClick={this.reset}>reset</button>
        {/*<img src={require('./xxx.jpg')} width="200" height="200" id="source" />*/}
      </div>
    );
  }
}
export default RowSignature;
