<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>手工爬取数据-详情页</title>
	<link rel="stylesheet" href="/public/common.css">
	<link href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.css" rel="stylesheet">
	<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<script src="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/4.5.0/js/bootstrap.min.js"></script>
	<script src="https://cdn.bootcdn.net/ajax/libs/echarts/4.7.0/echarts.min.js"></script>
	<script src="https://cdn.bootcdn.net/ajax/libs/xlsx/0.16.1/xlsx.core.min.js"></script>
	<script src="https://cdn.bootcdn.net/ajax/libs/clipboard.js/2.0.6/clipboard.min.js"></script>
	<script src="/public/detail.js"></script>
</head>
<body>
<!-- 数据录入区域 -->
<div class="alert alert-success" role="alert">数据录入区域  <span id="code1" value="JSON.stringify(window.rawData.store.initDataObj);">JSON.stringify(window.rawData.store.initDataObj);</span> <button data-clipboard-target="#code1">复制代码</button></div>
<div class="row">
	<div class="col-md-10">
		<textarea id="data" class="form-control" rows="5"></textarea>
	</div>
	<div class="col-md-2">
		<button class="btn btn-primary" id="saveData">数据暂存</button>
	</div>
</div>
<hr>

<!-- 数据展示与分析 -->
<div class="alert alert-warning" role="warning">数据展示与分析</div>
<table id="table" class="table table-striped">
	<tr class="row">
		<th class="col-md-1">产品主图</th>
		<th class="col-md-2">产品名称</th>
		<th class="col-md-1">产品ID</th>
		<th class="col-md-1">已拼数量</th>
		<th class="col-md-7">skus</th>
	</tr>
</table>
<div class="row">
	<button class="btn btn-primary" id="commentModel">评论数据录入</button>
</div>
<br>
<div class="row">
	<button class="btn btn-primary" id="analyze">评论数据分析</button>
</div>
<div class="row" id="myEchartsWrapper">

</div>
<hr>

<!-- 数据导出区域 -->
<div class="alert alert-danger" role="danger">数据导出</div>
<div class="row">
	<button class="btn btn-primary" id="exportProduct">产品数据导出</button>
	&nbsp;&nbsp;&nbsp;&nbsp;
	<button class="btn btn-primary" id="exportComment">评论数据导出</button>
</div>


<!-- 弹框加载评论数据 -->
<div class="model" id="model">
	<div class="shade"></div>
	<div class="con">
		<div class="header">
			<span>评论数据录入  <span id="code2" value="JSON.stringify(window.rawData.store.commentsMap[0]);">JSON.stringify(window.rawData.store.commentsMap[0]);</span> <button data-clipboard-target="#code2">复制代码</button></span>
			<span id="closeCommentModel">关闭</span>
		</div>
		<div class="content">
			<div class="data-in">
				<div class="row">
					<div class="col-md-10">
						<textarea id="commentData" class="form-control" rows="5"></textarea>
					</div>
					<div class="col-md-2">
						<button class="btn btn-primary" id="saveCommentData">数据暂存</button>
					</div>
				</div>
			</div>
			<div class="data-show">
				<div class="alert alert-danger" role="alert">当前产品录入数据的产品ID是: <span id="currentInputProduct"></span></div>
				<table id="tableComment" class="table table-striped">
					<tr class="row">
						<th class="col-md-2">产品ID</th>
						<th class="col-md-2">已录入数据量</th>
					</tr>
				</table>
			</div>
		</div>
	</div>
</div>
</body>
</html>
