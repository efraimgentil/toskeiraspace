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

	<div style="max-width: 940px; margin: 0 auto;">
	   <div class="row">
	       <div class="span12">
	           <h1>Super Developers Team</h1>
	       </div>
	   </div>
		<div class="row">
			<ul class="thumbnails developers">
				<li class="span6">
					<div class="thumbnail">
						<div class="media">
							<a class="pull-left" href="https://github.com/sombriks" target="_blank">
							    <img class="media-object"
								src="https://avatars2.githubusercontent.com/u/556695?s=150">
							</a>
							<div class="media-body">
								<h4 class="media-heading">Sombriks</h4>

								<div class="media">Some cool stuff here</div>
								<br/>
								<div class="media"><a href="https://github.com/sombriks">Github</a></div>
							</div>
							<div style="clear: both;" ></div>
						</div>
					</div>
				</li>
				<li class="span6">
					<div class="thumbnail">
						<div class="media">
                            <a class="pull-left" href="https://github.com/eprogramming" target="_blank">
                                <img class="media-object"
                                src="https://avatars2.githubusercontent.com/u/6443576?s=150">
                            </a>
                            <div class="media-body">
                                <h4 class="media-heading">Eprogramming</h4>

                                <div class="media">HULK SMASH</div>
                                <br/>
                                <div class="media"><a href="https://github.com/eprogramming">Github</a></div>
                            </div>
                            <div style="clear: both;" ></div>
                        </div>
					</div>
				</li>
				<li class="span6">
					<div class="thumbnail">
						<div class="media">
                            <a class="pull-left" href="https://github.com/efraimgentil" target="_blank">
                                <img class="media-object"
                                src="http://1.gravatar.com/avatar/72cdf06d6642a3d2e896f50aa103fe63?s=150">
                            </a>
                            <div class="media-body">
                                <h4 class="media-heading">Efraim Gentil</h4>

                                <div class="media">The only one that don't have a cool nickname =(</div>
                                <br/>
                                <div class="media"><a href="https://twitter.com/efraimgentil">@efraimgentil</a></div>
                                <div class="media"><a href="https://github.com/efraimgentil">Github</a></div>
                            </div>
                            <div style="clear: both;" ></div>
                        </div>
					</div>
				</li>
			</ul>
		</div>
	</div>

	<script type="text/javascript" src="${ctx}/js/st.js"></script>
</body>
</html>
