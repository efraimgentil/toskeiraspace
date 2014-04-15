<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<div class="navbar navbar-inverse navbar-fixed-top">
	<div class="navbar-inner">
		<div class="container-fluid">
			<a class="btn btn-navbar" data-toggle="collapse"
				data-target=".nav-collapse"> <span class="icon-bar"></span> <span
				class="icon-bar"></span> <span class="icon-bar"></span>
			</a> <img class="pull-left" src="img/logot2.png"
				style="margin-right: 10px; margin-top: 3px;"> <a class="brand"
				href="${ctx}/">ToskeiraSpace</a> <a class="brand" href="${ctx}">Reset</a>
			<a class="brand" href="#">Show scores</a>
			<div class="nav-collapse collapse ">
				<ul class="nav pull-right">
					<li><a href="${ctx}/about.jsp">About</a></li>
				</ul>
			</div>
		</div>
	</div>
</div>