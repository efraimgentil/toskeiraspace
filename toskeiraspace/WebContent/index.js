/**
 * such code is intended t be strictly fun and experimental.
 */

var c = document.getElementById("c");

// the reaking global
var player = {
	click : {
		x : 400,
		y : 300
	},
	move : {
		x : 400,
		y : 300
	},
	target : null
};

// basic class
function Sprite(p) {
	if (!p)
		p = {};
	this.angle = p.angle || 0.7;
	this.x = p.x || 400;
	this.y = p.y || 300;
	this.color = p.color || "white";
	this.isDead = false;
	
	this.mouseover = function() {
		var x = player.move.x - this.x;
		var y = player.move.y - this.y;
		return Math.sqrt(x * x + y * y) < 15;
	};
}

function Rock(p) {
	Sprite.call(this, p);
	this.x = Math.random() * 800;
	this.y = Math.random() * 600;
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
		while (i-- > 0)
			ctx.lineTo(this.points[i].x, this.points[i].y);
		ctx.stroke();
	};
}

function Bullet(p) {
	Sprite.call(this, p);
	this.dx = p.dx;
	this.dy = p.dy;
	this.step = function() {
		if(!this.isDead){
			var mx = this.dx - this.x;
			var my = this.dy - this.y;
			if (mx > 5)
				this.x += 0.7;
			else if (mx < -5)
				this.x -= 0.7;
			if (my > 5)
				this.y += 0.7;
			else if (my < -5)
				this.y -= 0.7;
			else {// stopped
				var i = bullets.length;
				while (i--)
					if (bullets[i] == this)
						this.isDead = true;
			}
		}
	};
	this.draw = function(ctx) {
		if(!this.isDead){			
			ctx.strokeStyle = this.color;
			ctx.translate(this.x, this.y);
			ctx.rotate(this.angle);
			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.arc(0, 0, 4, 0, Math.PI * 2, false);
			ctx.stroke();
		}
	};
}

function Ship(p) {
	Sprite.call(this, p);
	this.openFire = false;
	this.step = function() {
		// rotate
		var x = player.move.x - this.x;
		var y = player.move.y - this.y;
		this.angle = Math.atan2(y, x) + Math.PI / 2;
		// move (and shoot something maybe)
		x = player.click.x - this.x;
		y = player.click.y - this.y;
		var d = Math.sqrt(x * x + y * y);
		if (d) {
			this.x += (x > 15 ? 0.7 : x < -15 ? -0.7 : 0);
			this.y += (y > 15 ? 0.7 : y < -15 ? -0.7 : 0);
		}
		if (this.openFire) {
			this.openFire = false;
			bullets.push(makeBullet(this.x, this.y, this.angle, player.click.x,
					player.click.y));
		}
	};
	this.draw = function(ctx) {
		ctx.strokeStyle = this.color;
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

function makeBullet(sx, sy, sa, px, py) {
	return new Bullet({
		x : sx,
		y : sy,
		dx : px,
		dy : py,
		color : "cyan",
		angle : sa + Math.PI / 2
	});
}

var bullets = [];

var ship = new Ship();

function makeRock() {
	var rock = new Rock();
	return rock;
}

var asteroids = [];
var i = 30;
while (i--)
	asteroids.push(makeRock());

function step() {
	player.target = null;
	var i = bullets.length;
	while (i--)
		bullets[i].step();
	i = asteroids.length;
	while (i--) {
		if (asteroids[i].mouseover())
			player.target = asteroids[i];
		asteroids[i].step();
	}
	ship.step();
}

function draw(ctx) {
	// we always wipe the screen
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.save();
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
		bullets[i].draw(ctx);
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
};
c.onclick = click;

function move(e) {
	player.move.x = e.clientX - c.offsetLeft;
	player.move.y = e.clientY - c.offsetTop;
	if (ship.mouseover())
		document.body.style.cursor = "move";
	else if (player.target)
		document.body.style.cursor = "crosshair";
	else
		document.body.style.cursor = "default";
};
c.onmousemove = move;

var aaa = document.getElementById("aaa");
var aaa = document.getElementById("bbb");

function dbg() {
	aaa.innerHTML = JSON.stringify(ship);
	bbb.innerHTML = JSON.stringify(bullets);
}

var ctx = c.getContext("2d");
function mainLoop() {
	step();
	draw(ctx);
	dbg();
	setTimeout(mainLoop, 30);
}
mainLoop();