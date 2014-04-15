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
	<jsp:include page="menu.jsp" />

	<div style="float: left">
		<canvas id="c" class="tscanvas" width="1000" height="500"></canvas>
	</div>

	<div style="margin-right: 10px;">
		<h4>
			Other games play... <em>ToskeiraSpace</em> Kill !
		</h4>
		<hr />

		<h5>5 last - Vagabundos online:</h5>
		<ul>
			<li>Vagabundo 01</li>
			<li>Vagabundo 02</li>
			<li>Vagabundo 03</li>
			<li>Vagabundo 04</li>
			<li>Vagabundo 05</li>
		</ul>

		<hr>

		<h5>Top 5 score:</h5>
		<ul>
			<li>Super Vagabundo 01</li>
			<li>Vagabundo 02</li>
			<li>Vagabundo 03</li>
			<li>Vagabundo 04</li>
			<li>Vagabundo 05</li>
		</ul>
	</div>

	<script type="text/javascript" src="${ctx}/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/st.js"></script>
	<script type="text/javascript" src="${ctx}/js/ts.js"></script>

</body>
</html>
