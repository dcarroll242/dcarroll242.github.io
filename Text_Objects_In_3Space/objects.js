class Text3D {

  constructor(string, color, size, posX, posY, posZ) {
    this.string = string;
    this.color = color;
    this.size = size;
    this.pos = createVector(posX, posY, posZ);
    this.vel = createVector(0, 0, 0);
    this.acc = createVector(0, 0, 0);
    this.rot = createVector(0, 0, 0);
  }
  
  update(distPercent) {
    push();
    fill(this.color);
    textSize(this.size);
    translate(distPercent*this.pos.x, distPercent*this.pos.y, distPercent*this.pos.z);
    rotateX(this.rot.x);
    rotateY(this.rot.y);
    rotateZ(this.rot.z);
    text(this.string, 0, 0);
    pop();
  }
  
  translate(x, y, z) {
    this.pos.add(createVector(x, y, z));
  }
  
  rotate(rotX, rotY, rotZ) {
    this.rot.add(createVector(rotX, rotY, rotZ));
  }
  
}