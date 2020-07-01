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
          <li class="active"><a href="/material">素材列表</a></li>
          <li class=""><a href="/material/hupu">虎扑</a></li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- 内容区 -->
  <!-- 搜索条 -->
  <form class="form-horizontal">
    <div class="form-group">
      <label for="inputHeader3" class="col-sm-1 control-label">headers</label>
      <div class="col-sm-8">
        <textarea class="form-control" name="headers" id="inputHeader3" onblur="setHeaders(event)" rows="10"
                  placeholder="请直接复制search接口的verifyauthtoken,cookie,accesstoken到本输入框"></textarea>
      </div>
      <button type="button" class="btn" onclick="clearLocalStorage('headers', 'inputHeader3')">清除headers缓存</button>
    </div>
    <div class="form-group">
      <label for="inputQ" class="col-sm-1 control-label">关键词</label>
      <div class="col-sm-8">
        <input class="form-control" name="q" id="inputQ" onblur="setQ(event)" placeholder="搜索关键词" />
      </div>
      <button type="button" class="btn" onclick="clearLocalStorage('q', 'inputQ')">清除q缓存</button>
    </div>
    <div class="form-group">
      <label for="inputPassword3" class="col-sm-1 control-label">爬取条数</label>
      <div class="col-sm-1">
        <select id="inputPassword3" class="form-control" name="size">
          <option selected>10</option>
          <option>20</option>
          <option>30</option>
          <option>40</option>
          <option>50</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-1 control-label">排序规则</label>
      <div class="col-sm-5">
        <label class="radio-inline">
          <input type="radio" name="sort" checked="true" id="inlineRadio1" value="_sales"> 销量(_sales)
        </label>
        <label class="radio-inline">
          <input type="radio" name="sort" id="inlineRadio2" value="default"> 综合(default)
        </label>
        <label class="radio-inline">
          <input type="radio" name="sort" id="inlineRadio3" value="_credit"> 评分(_credit)
        </label>
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-offset-1 col-sm-10">
        <button type="submit" class="btn btn-primary">开始抓取</button>
      </div>
    </div>
  </form>

  <!-- 分割线 -->
  <hr>

  <!-- 请求参数 -->
  {% if code === 200 %}
  <div class="alert alert-success" role="alert">{{ reqParams }}</div>
  {% endif %}

  <!-- 警告信息 -->
  {% if code !== 200 %}
    <div class="alert alert-danger" role="alert">{{ msg }}</div>
  {% endif %}

  <!-- 数据表格 -->
  <table class="table table-bordered">
    <tr>
      <th class="col-sm-1">产品主图</th>
      <th class="col-sm-1">产品ID</th>
      <th class="col-sm-1">产品URL</th>
      <th class="col-sm-2">产品名称</th>
      <th class="col-sm-2">产品SKU价格区间</th>
      <th class="col-sm-1">销量</th>
      <th class="col-sm-1">评价总数</th>
    </tr>
    {% for item in list %}
    <tr>
      <td><img style="width: 100px;" src="{{item.hd_thumb_url}}"></td>
      <td>{{item.goods_id}}</td>
      <td>{{item.link_url}}</td>
      <td>{{item.goods_name}}</td>
      <td>{{item.sku_price}}</td>
      <td>{{item.sales}}</td>
      <td>{{item.comment_number}}</td>
    </tr>
    {% endfor %}
  </table>

  </body>
  <script>
    window.addEventListener('load', function (e) {
      // 加载headers
      let headersStr = localStorage.getItem('headers');
      let q = localStorage.getItem('q');
      if (headersStr) {
        document.querySelector('#inputHeader3').value = headersStr;
      }
      if (q) {
        document.querySelector('#inputQ').value = q;
      }
    });

    function clearLocalStorage(key, domId) {
      localStorage.setItem(key, '');
      document.getElementById(domId).value = '';
    }

    // 设置headersStr
    function setHeaders(e) {
      localStorage.setItem('headers', document.querySelector('#inputHeader3').value);
    }

    // 设置inputQ
    function setQ(e) {
      localStorage.setItem('q', document.querySelector('#inputQ').value);
    }
  </script>
</html>
