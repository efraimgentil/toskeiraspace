<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Toskeiraspace</title>
<style type="text/css">
body {
	background: black;
	color: white;
}

canvas {
	border: 1px groove white;
	margin: 0px;
	position: absolute;
	top: 5px;
	left: 15px;
}

#aaa,#bbb {
	width: 300px;
	border: 1px groove white;
}
</style>
</head>
<body>
	<canvas id="c" width="800" height="600"></canvas>
	<div id="aaa"></div>
	<div id="bbb"></div>
	<script type="text/javascript" src="index.js"></script>
</body>
</html>