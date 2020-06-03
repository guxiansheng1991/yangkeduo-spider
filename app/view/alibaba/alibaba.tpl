<!-- app/view/news/list.tpl -->
<html>
  <head>
    <title>1688详情页图片保存</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
  </head>
  <body>
  <!-- 导航条 -->
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand" href="#">图片保存</a>
      </div>
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
          <li class="active"><a href="#">1688详情页</a></li>
          <!--<li><a href="#">Link</a></li>-->
        </ul>
      </div>
    </div>
  </nav>

  <!-- 内容区 -->
  <!-- 搜索条 -->
  <form class="form-horizontal">
    <div class="form-group">
      <label for="inputUrl" class="col-sm-1 control-label">1688链接</label>
      <div class="col-sm-8">
        <textarea class="form-control" name="headers" id="inputUrl" onblur="setHeaders(event)" rows="20"
                  placeholder="图片链接, 每行一个链接"></textarea>
      </div>
    </div>
	  <div class="form-group">
		  <button type="button" class="col-sm-offset-1 btn btn-primary" onclick="save()">保存图片</button>
	  </div>
  </form>

  <!-- 分割线 -->
  <!--<hr>-->

  <!-- 数据表格 -->
  <!--<table class="table table-bordered">-->
    <!--<tr>-->
      <!--<th class="col-sm-1">产品主图</th>-->
      <!--<th class="col-sm-1">产品ID</th>-->
      <!--<th class="col-sm-1">产品URL</th>-->
      <!--<th class="col-sm-2">产品名称</th>-->
      <!--<th class="col-sm-2">产品SKU价格区间</th>-->
      <!--<th class="col-sm-1">销量</th>-->
      <!--<th class="col-sm-1">评价总数</th>-->
    <!--</tr>-->
  <!--</table>-->

  </body>
  <script>
		function save() {
				const inputPath = $('#inputPath').val();
        const inputUrl = $('#inputUrl').val();
        $.ajax({
		        method: 'post',
		        url: '/saveImg',
		        data: {
		            inputPath: inputPath,
				        inputUrl: inputUrl
		        },
		        success: function (data) {
				        console.log(data);
            },
		        error: function (req, err) {
				        console.error(req, err);
            }
        });
    }
  </script>
</html>
