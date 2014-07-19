/**
 * such code is intended t be strictly fun and experimental.
 * autor: Sombriks 
 * since 2012
 */
var SPACE = SPACE || {};
SPACE.mainLoopInterval = null;
var frame = 0;
var frameConsole = 100;
window.toskeiraspace = function(){
    var c = document.getElementById("c");
    // the freaking global
    var player = {
        score : 0,
        pangle: 1,
        click : {
            x : 400,
            y : 300
        },
        move : {
            x : 400,
            y : 300
        },
        target : null,
        draw : function(ctx) {
            ctx.fillStyle = "White";
            ctx.fillText("Score: " + this.score, 10, 10);
        }
    };

    // basic class
    function Sprite(p) {
        if (!p) {
            p = {};
        }
        this.angle = p.angle || 0.7;
        this.x = p.x || 400;
        this.y = p.y || 300;
        this.color = ( this.color || p.color ) || "white";
        this.isDead = false;
        this.mouseover = function() {
            var x = player.move.x - this.x;
            var y = player.move.y - this.y;
            return Math.sqrt(x * x + y * y) < 15;
        };
    }

    // the floating rock
    function Rock(p) {
        Sprite.call(this, p);
        this.x = Math.random() * 800;
        this.y = Math.random() * 600;
        this.width = 5;
        this.points = [ {
                x : -5 + Math.random() * -2,
                y : 5 + Math.random() * 3
        }, {
                x : 5 + Math.random() * 2,
                y : 5 + Math.random() * 4
        }, {
                x : 5 + Math.random() * 2,
                y : -5 + Math.random() * -3
        }, {
                x : 2 + Math.random() * 2,
                y : -5 + Math.random() * -3
        }, {
                x : -5 + Math.random() * -2.6,
                y : -5 + Math.random() * -2
        }, {
                x : -5 + Math.random() * 2,
                y : 5 + Math.random() * 2
        } ];
        this.angle = Math.random();
        this.step = function() {
            this.angle += 0.01;
        };
        this.draw = function(ctx) {
            ctx.strokeStyle = this.color;
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            var i = this.points.length;
            while (i-- > 0) {
                ctx.lineTo(this.points[i].x, this.points[i].y);
            }
            ctx.stroke();
        };
    }

    // fancy bullet to fire
    function Bullet(p) {
        Sprite.call(this, p);
        this.dx = p.dx;
        this.dy = p.dy;
        this.range = 400;
        this.target = p.target;
        this.speed = 1.7;
        this.step = function() {
            this.x += this.speed * Math.cos( this.angle );
            this.y += this.speed * Math.sin( this.angle );
            var stopped = false;
            // it will not float forever...
            if (stopped || this.range < 0) {
                this.isDead = true;
                if (stopped) {
                    this.target.isDead = true;
                }
            }
            this.range--;
        };
        this.draw = function(ctx) {
            ctx.strokeStyle = this.color;
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, 4, 0, Math.PI * 2, false);
            ctx.stroke();
        };
        this.checkColision = function(arrObject  , ctx) {
            var bulletColisionRangeX1 = this.x - 30;
            var bulletColisionRangeY1 = this.y - 30;

            function insideX(objX) {
                return (bulletColisionRangeX1 <= objX && objX  <= ( bulletColisionRangeX1 + 60 ) );
            }

            function insideY(objY) {
                return (bulletColisionRangeY1 <= objY && objY <= ( bulletColisionRangeY1 + 60 ) );
            }

            var objLength = arrObject.length;
            for(var i = 0; i < objLength ; i++){
                var obj = arrObject[i];
                if (insideX(obj.x) && insideY(obj.y)) {
                    if ((obj.x - obj.width ) <= (this.x + 2) && (this.x - 2) <=  (obj.x + obj.width) && (obj.y - obj.width) <= (this.y + 2) && (this.y - 2) <=  (obj.y + obj.width)) {
                        this.isDead = true;
                        obj.isDead = true;
                    }
                }
            }
        };
    }


    var bullets = [];
    var objects = [];
    SPACE.addObject = function( obj ){
        objects.push( obj );
    };

    SPACE.bulletType = SPACE.bulletType || {};
    SPACE.bulletType.default = function(p){
        bullet =  {
            dx: p.dx,
            dy: p.dy,
            range: 400,
            color: "cyan",
            target: p.target,
            speed: 1.7,
            step: function() {
                this.x += this.speed * Math.cos( this.angle );
                this.y += this.speed * Math.sin( this.angle );
                // it will not float forever...
                if ( --this.range < 0) {
                    this.isDead = true;
                }
            },
            draw: function(ctx) {
                ctx.strokeStyle = this.color;
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.arc(0, 0, 4, 0, Math.PI * 2, false);
                ctx.stroke();
            },
            checkColision: function(arrObject ) {
                var bulletColisionRangeX1 = this.x - 30;
                var bulletColisionRangeY1 = this.y - 30;

                function insideX(objX) {
                    return (bulletColisionRangeX1 <= objX && objX  <= ( bulletColisionRangeX1 + 60 ) );
                }

                function insideY(objY) {
                    return (bulletColisionRangeY1 <= objY && objY <= ( bulletColisionRangeY1 + 60 ) );
                }

                var objLength = arrObject.length;
                for(var i = 0; i < objLength ; i++){
                    var obj = arrObject[i];
                    if (insideX(obj.x) && insideY(obj.y)) {
                        if ((obj.x - obj.width ) <= (this.x + 2) && (this.x - 2) <=  (obj.x + obj.width) && (obj.y - obj.width) <= (this.y + 2) && (this.y - 2) <=  (obj.y + obj.width)) {
                            this.isDead = true;
                            obj.isDead = true;
                        }
                    }
                }
            }
        };
        Sprite.call( bullet , p );
        return bullet;
    };

    SPACE.bulletType.laser = function(p){
        bullet =  {
            dx: p.dx,
            dy: p.dy,
            range: 600,
            color: "red",
            target: p.target,
            speed: 2.3,
            step: function() {
                this.x += this.speed * Math.cos( this.angle );
                this.y += this.speed * Math.sin( this.angle );
                // it will not float forever...
                if ( --this.range < 0) {
                    this.isDead = true;
                }
            },
            draw: function(ctx) {
                ctx.strokeStyle = this.color;
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.rect( 0 , 0 , 5 , 1);
                ctx.stroke();
            },
            checkColision: function( arrObject ) {
                var bulletColisionRangeX1 = this.x - 30;
                var bulletColisionRangeY1 = this.y - 30;

                function insideX(objX) {
                    return (bulletColisionRangeX1 <= objX && objX  <= ( bulletColisionRangeX1 + 60 ) );
                }

                function insideY(objY) {
                    return (bulletColisionRangeY1 <= objY && objY <= ( bulletColisionRangeY1 + 60 ) );
                }

                var objLength = arrObject.length;
                for(var i = 0; i < objLength ; i++){
                    var obj = arrObject[i];
                    if (insideX(obj.x) && insideY(obj.y)) {
                        if ((obj.x - obj.width ) <= (this.x + 2) && (this.x - 2) <=  (obj.x + obj.width) && (obj.y - obj.width) <= (this.y + 2) && (this.y - 2) <=  (obj.y + obj.width)) {
                            this.isDead = true;
                            obj.isDead = true;
                        }
                    }
                }
            }
        };
        Sprite.call( bullet , p );
        return bullet;
    };

    SPACE.bulletType.bigBall = function(p){
        bullet =  {
            dx: p.dx,
            dy: p.dy,
            range: 250,
            color: "green",
            target: p.target,
            speed: 1.2,
            colorArray: [ '#003300' , '#006600' , '#009900' , '#00CC00' , '#00FF00' , "#000000"],
            colorPosition: 0,
            step: function() {
                this.x += this.speed * Math.cos( this.angle );
                this.y += this.speed * Math.sin( this.angle );
                // it will not float forever...
                if ( --this.range < 0) {
                    this.isDead = true;
                }
                this.color = this.colorArray[ this.colorPosition ];
                this.colorPosition++;
                if( this.colorPosition === this.colorArray.length){
                    this.colorPosition = 0;
                }
            },
            draw: function(ctx) {
                ctx.strokeStyle = this.color;
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.arc(0, 0, 30 , 0, Math.PI * 2, false);
                ctx.stroke();
            },
            checkColision: function( arrObject ) {
                var bulletColisionRangeX1 = this.x - 30;
                var bulletColisionRangeY1 = this.y - 30;

                function insideX(objX) {
                    return (bulletColisionRangeX1 <= objX && objX  <= ( bulletColisionRangeX1 + 60 ) );
                }

                function insideY(objY) {
                    return (bulletColisionRangeY1 <= objY && objY <= ( bulletColisionRangeY1 + 60 ) );
                }

                var objLength = arrObject.length;
                for(var i = 0; i < objLength ; i++){
                    var obj = arrObject[i];
                    if (insideX(obj.x) && insideY(obj.y)) {
                        if ((obj.x - obj.width ) <= (this.x + 25) && (this.x - 25) <=  (obj.x + obj.width) && (obj.y - obj.width) <= (this.y + 25) && (this.y - 25) <=  (obj.y + obj.width)) {
                            obj.isDead = true;
                        }
                    }
                }
            }
        };
        Sprite.call( bullet , p );
        return bullet;
    };
    
    function createBullets(){
        //If math random  bigger than 99.0 will create a bullet type in a random spot of map
        if( (Math.random() * 10000) > 9990 ){
            var bulletTypes = [ { type: SPACE.bulletType.laser , color: "red" , border: "yellow" },
                                { type:  SPACE.bulletType.bigBall , color: "green" , border: "red" } ];
            var randPos = parseInt( Math.random() * 2  , 0);
            var randomType = bulletTypes[ randPos ];
            
            var box = SPACE.bulletTypeBox( randomType.type , 400 , 300 , randomType.color , randomType.border );
            objects.push( box );

        }
    }

    SPACE.bulletTypeBox = function( bulletType , x , y , fillColor , borderCollor){
        fillColor = fillColor || "red";
        borderCollor = borderCollor || "yellow";
        bulletType = bulletType || SPACE.bulletType.default;

        return {
            bulletType: bulletType,
            x: x,
            y: y,
            width: 10,
            height: 10,
            angle: Math.random() * 360 ,
            liveTime: 10,
            fillColor: fillColor,
            borderCollor: borderCollor,
            draw: function( c ) {
                if(this.angle > 360){
                    this.angle = 0;
                }
                c.translate( x , y);
                c.rotate(this.angle);
                c.beginPath();
                c.moveTo( this.x,  this.y );
                c.rect( -5 , -5 , this.width , this.height );
                c.fillStyle = fillColor;
                c.fill();
                c.lineWidth = 1;
                c.strokeStyle = borderCollor; 
                c.stroke();

                this.angle += 0.01;
            },
            checkColision: function( ship , c) {
                var boxCollisionRangeX = this.x - 20;
                var boxCollisionRangeY = this.y - 20;

                function insideX(objX) {
                    return (boxCollisionRangeX <= objX && objX  <= ( x + 20 ) );
                }

                function insideY(objY) {               
                    return (boxCollisionRangeY <= objY && objY <= ( y + 20 ) );
                }

                if (insideX(ship.x) && insideY(ship.y)) {
                    ship.bulletType = bulletType;
                    return true;
                }
                return false;
            }
        };
    };

   

    // almighty starship
    function Ship(p) {
        Sprite.call(this, p);
        this.openFire = false;
        this.bulletType = SPACE.bulletType.default;
        this.step = function() {
            // rotate
            var x = player.move.x - this.x;
            var y = player.move.y - this.y;
            this.originalAngle = Math.atan2(y, x);
            this.angle = this.originalAngle + Math.PI / 2;

            var k  = Math.abs(this.angle).toFixed(1);
            var w  = Math.abs(player.pangle).toFixed(1);
            if (k === w) {
                player.score += 2;
                player.pangle = (Math.random() * 1).toFixed(1);
            }

            // move (and shoot something maybe)
            x = player.click.x - this.x;
            y = player.click.y - this.y;
            var d = Math.sqrt(x * x + y * y);
            if (d) {
                this.x += (x > 15 ? 0.7 : x < -15 ? -0.7 : 0);
                this.y += (y > 15 ? 0.7 : y < -15 ? -0.7 : 0);
            }
            if (this.openFire && player.target) {
                this.openFire = false;

                bullets.push(makeBullet( this , player.target ));
            }
        };
        this.draw = function(ctx) {
            ctx.strokeStyle = this.color;
            ctx.strokeStyle = 'LimeGreen'; //little hack
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -15);
            ctx.lineTo(10, 5);
            ctx.lineTo(-10, 5);
            ctx.lineTo(0, -15);
            ctx.stroke();
        };

    }

    function makeBullet(  ship , target ) {
        return new ship.bulletType ({
            x : ship.x,
            y : ship.y,
            dx : target.x,
            dy : target.y,
            angle : ship.originalAngle,
            target : target
        });
    }

    var ship = new Ship();

    var asteroids = [];

    var i = 30;
    while (i--) {
        asteroids.push( new Rock() );
    }

    function step() {
        // cleanup first

        createBullets();

        var i = bullets.length;
        var b2 = [];
        while (i--) {
            if (!bullets[i].isDead) {
                b2.push(bullets[i]);
            }
        }
        bullets = b2;
        i = asteroids.length;
        b2 = [];
        while (i--) {
            if (!asteroids[i].isDead) {
                b2.push(asteroids[i]);
            }
            else {
                player.score += 10;
            }
        }
        asteroids = b2;
        player.target = null;
        // simulation step
        i = bullets.length;
        while (i--) {
            bullets[i].step();
        }
        i = asteroids.length;
        while (i--) {
            if (asteroids[i].mouseover()) {
                player.target = asteroids[i];
            }
            asteroids[i].step();
        }
        ship.step();
    }

    function draw(ctx) {
        // we always wipe the screen
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.save();
        player.draw(ctx);// HUD
        ship.draw(ctx);
        ctx.restore();
        var i = asteroids.length;
        while (i--) {
            ctx.save();
            asteroids[i].draw(ctx);
            ctx.restore();
        }
        i = bullets.length;
        while (i--) {
            ctx.save();
            bullets[i].checkColision( asteroids , ctx );
            bullets[i].draw(ctx);
            ctx.restore();
        }
        i = objects.length;
        while(i--){
            ctx.save();
            if( objects[i].checkColision( ship  , ctx ) ){
                objects.splice( i , 1);
            }else{
                objects[i].draw(ctx);
            }
            ctx.restore();
        }
    }

    function click(e) {
        if (player.target) {// shoot instead change destination
            ship.openFire = true;
        } else {
            player.click.x = e.clientX - c.offsetLeft;
            player.click.y = e.clientY - c.offsetTop;
        }
    }



    c.onclick = click;

    function move(e) {
        player.move.x = e.clientX - c.offsetLeft;
        player.move.y = e.clientY - c.offsetTop;
        var csr = document.body.style.cursor;
        if (ship.mouseover()) {
            csr = "move";
        } else if (player.target) {
            csr = "crosshair";
        } else {
            csr= "default";
        }
    }

    c.onmousemove = move;

    var ctx = c.getContext("2d");
    function mainLoop() {
        frame += 1;
        step();
        draw(ctx);
    }
    SPACE.mainLoopInterval = setInterval( mainLoop , 5);
    //mainLoop();
};


if(window.addEventListener) {
  window.addEventListener('DOMContentLoaded', toskeiraspace, false);
} else {
  window.attachEvent('onload', toskeiraspace );
}