class Launcher {
    constructor(x, y, w, h) {
      var options={isStatic:true};
        this.width=w;
        this.height=h;
        this.image=loadImage("launcher.png");

        this.body=Bodies.rectangle(x, y, this.width, this.height, options);

        World.add(world, this.body);

        Matter.Body.setAngle(this.body, -PI / 2); // -90 degree
    }

    display() {
        var pos=this.body.position;
        var angle=this.body.angle;

        if (keyDown(83)) {
          angle += 0.01;
          Matter.Body.setAngle(this.body, angle);
          console.log("down");
          Matter.Body.setPosition(this.body, {x:sub.y+40, y:sub.y-50});
        }
      
        if (keyDown(87)) {
          angle -= 0.01;
          Matter.Body.setAngle(this.body, angle);
          console.log("up");
          Matter.Body.setPosition(this.body, {x:sub.y+40, y:sub.y-50});
        }

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0, 0, this.width, this.height);
        pop();
    }
}