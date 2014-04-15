<%-- in the name of the putaria --%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>ToskeiraSpace!</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="${ctx}/css/bootstrap.min.css" rel="stylesheet">
<link href="${ctx}/css/ts.css" rel="stylesheet">
<style>
body {
	padding-top: 60px;
}
</style>
<link rel="shortcut icon" href="favicon.ico">
</head>

<body>

	<div class="navbar navbar-inverse navbar-fixed-top">
		<div class="navbar-inner">
			<div class="container-fluid">
				<a class="btn btn-navbar" data-toggle="collapse"
					data-target=".nav-collapse"> <span class="icon-bar"></span> <span
					class="icon-bar"></span> <span class="icon-bar"></span>
				</a> <img class="pull-left" src="img/logot2.png"
					style="margin-right: 10px; margin-top: 3px;"> <a
					class="brand" href="#">ToskeiraSpace</a> <a class="brand"
					href="${ctx}">Reset</a> <a class="brand" href="#">Show scores</a>
				<div class="nav-collapse collapse ">
					<ul class="nav pull-right">
						<li><a href="#">About</a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>

	<div style="float: left">
		<canvas id="c" class="tscanvas" width="1000" height="500"></canvas>
	</div>

	<div style="margin-right: 10px;">
		<h4>
			Other games play... <em>ToskeiraSpace</em> Kill !
		</h4>
	</div>

	<script type="text/javascript" src="${ctx}/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/st.js"></script>
	<script type="text/javascript" src="${ctx}/js/ts.js"></script>

</body>
</html>

