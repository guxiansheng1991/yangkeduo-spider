<!-- app/view/news/list.tpl -->
<html>
  <head>
    <title>毒蜘蛛</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
  </head>
  <body>
  <!-- 导航条 -->
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand" href="#">毒蜘蛛</a>
      </div>
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
          <li class="active"><a href="#">首页</a></li>
          <!--<li><a href="#">Link</a></li>-->
        </ul>
      </div>
    </div>
  </nav>

  <!-- 内容区 -->
  <!-- 搜索条 -->
  <form class="form-horizontal">
    <div class="form-group">
      <label for="inputEmail3" class="col-sm-1 control-label">目标url</label>
      <div class="col-sm-10">
        <input type="email" class="form-control" id="inputEmail3" placeholder="目标url">
      </div>
    </div>
    <div class="form-group">
      <label for="inputPassword3" class="col-sm-1 control-label">限制条数</label>
      <div class="col-sm-1">
        <select class="form-control">
          <option selected>10</option>
          <option>20</option>
          <option>30</option>
          <option>40</option>
          <option>50</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-offset-1 col-sm-10">
        <button type="submit" class="btn btn-default">开始抓取</button>
      </div>
    </div>
  </form>

  <!-- 分割线 -->
  <hr>

  {% if code !== 200 %}
    <div class="alert alert-danger" role="alert">{{ msg }}</div>
  {% endif %}

  <!-- 数据表格 -->
  <table class="table table-bordered">
    <tr>
      <th class="col-sm-1">编码</th>
      <th class="col-sm-1">产品主图</th>
      <th class="col-sm-1">产品ID</th>
      <th class="col-sm-3">产品URL</th>
      <th class="col-sm-2">产品名称</th>
      <th class="col-sm-2">产品SKU价格区间</th>
      <th class="col-sm-1">销量</th>
      <th class="col-sm-1">评价总数</th>
    </tr>
    <!--<tr>-->
      <!--<td></td>-->
      <!--<td></td>-->
      <!--<td></td>-->
      <!--<td></td>-->
      <!--<td></td>-->
      <!--<td></td>-->
    <!--</tr>-->
  </table>

  </body>
</html>
