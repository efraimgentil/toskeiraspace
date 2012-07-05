/**
 * such code is intended t be strictly fun and experimental.
 */

var c = document.getElementById("c");

var player = {
	angle : 0,
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

function makeBullet(sx, sy, px, py) {
	var bullet = {
		x : sx,
		y : sy,
		dx : px,
		dy : py,
		color : "cyan",
		angle : ship.angle + Math.PI / 2,
		step : function() {
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
		},
		draw : function(ctx) {
			ctx.strokeStyle = this.color;
			ctx.translate(this.x, this.y);
			ctx.rotate(this.angle);
			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.arc(0, 0, 4, 0, Math.PI * 2, false);
			ctx.stroke();

		}
	};
	return bullet;
}

var bullets = [];

var ship = {
	x : 400,
	y : 300,
	angle : 0,
	color : "white",
	openFire : false,
	step : function() {
		// rotate
		var x = player.move.x - this.x;
		var y = player.move.y - this.y;
		player.angle = Math.atan2(y, x);
		this.angle = player.angle + Math.PI / 2;

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
			bullets.push(makeBullet(this.x, this.y, player.click.x,
					player.click.y));
		}
	},
	draw : function(ctx) {
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
	},
	mouseover : function() {
		var x = player.move.x - this.x;
		var y = player.move.y - this.y;
		return Math.sqrt(x * x + y * y) < 15;
	}
};

function makeRock() {
	var rock = {
		x : Math.random() * 800,
		y : Math.random() * 600,
		points : [ {
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
		} ],
		angle : Math.random(),
		color : "white",
		step : function() {
			this.angle += 0.01;
		},
		draw : function(ctx) {
			ctx.strokeStyle = this.color;
			ctx.translate(this.x, this.y);
			ctx.rotate(this.angle);
			ctx.beginPath();
			ctx.moveTo(0, 0);
			var i = this.points.length;
			while (i-- > 0)
				ctx.lineTo(this.points[i].x, this.points[i].y);
			ctx.stroke();
		},
		mouseover : function() {
			var x = player.move.x - this.x;
			var y = player.move.y - this.y;
			return Math.sqrt(x * x + y * y) < 25;
		}
	};
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

function dbg() {
	aaa.innerHTML = JSON.stringify(player);
}

var ctx = c.getContext("2d");
function mainLoop() {
	step();
	draw(ctx);
	dbg();
	setTimeout(mainLoop, 30);
}
mainLoop();