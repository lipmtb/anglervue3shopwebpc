<template>
  <footer class="app-footer">
    <!-- 联系 -->
    <div class="contact">
      <div class="container clearfix">
        <dl>
          <dt>客户服务</dt>
          <dd><i class="iconfont icon-kefu"></i> 在线客服</dd>
          <dd><i class="iconfont icon-question"></i> 问题反馈</dd>
        </dl>
        <dl>
          <dt>关注我们</dt>
          <dd><i class="iconfont icon-weixin"></i> 公众号</dd>
          <dd><i class="iconfont icon-weibo"></i> 微博</dd>
        </dl>
        <dl>
          <dt>下载APP</dt>
          <dd class="qrcode"><img src="~@/assets/images/logo.png" /></dd>
          <dd class="download">
            <span>扫描二维码</span>
            <span>立马下载APP</span>
            <a href="javascript:;">下载页面</a>
          </dd>
        </dl>
        <dl>
          <dt>服务热线</dt>
          <dd class="hotline">10086-10010-10086-1001010<small>周一至周日 8:00-18:00</small></dd>
        </dl>
      </div>
    </div>
    <!-- 其它 -->
    <div class="extra">
      <div class="container">
        <div class="slogan clearfix">
          <a href="javascript:;">
            <i class="iconfont icon-footer01"></i>
            <span>顾客至上</span>
          </a>
          <a href="javascript:;">
            <i class="iconfont icon-footer02"></i>
            <span>服务至上</span>
          </a>
          <a href="javascript:;">
            <i class="iconfont icon-footer03"></i>
            <span>品牌至上</span>
          </a>
        </div>
   
        <!-- <div class="copyright">
          <p>
            <a href="javascript:;">关于我们</a>
            <a href="javascript:;">帮助中心</a>
            <a href="javascript:;">售后服务</a>
            <a href="javascript:;">配送与验收</a>
            <a href="javascript:;">商务合作</a>
            <a href="javascript:;">搜索推荐</a>
            <a href="javascript:;">友情链接</a>
          </p>
          <p>CopyRight ©jjcc123</p>
        </div> -->
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>


<style lang="less" scoped>
        .contact .container{
            background-color:#fff;
            padding-top:20px;
            dl{
                float:left;
                width:24%;
                height:180px;
                padding:10px;
                text-align:center;
                dt{
                    font-size:2em;
                    color:#999;
                    margin-bottom:20px;
                }
                dd{
                    float:left;
                    width:100px;
                    height:100px;
                    border:1px solid #eee;
                    margin-left:26px;
                    i.iconfont{
                        display: block;
                        font-size:3em;
                    }
                }

                &:last-child{
                    dd{
                        border:none;
                        width:200px;
                    }
                }
                &:not(:first-child){
                    border-left:1px solid #eee;
                }


            }
        }
        .extra  .container{
            background-color: #333333;
            .slogan{
                   border-bottom:1px solid #fff;
                   padding:50px 0;
                a{
                    float:left;
                    width:33%;
                    font-size:2em;
                    color:#fff;
             
                    text-align: center;
                    i.iconfont{
                        font-size:2em;
                    }
                    span{
                        vertical-align:super;
                        margin-left:6px;
                    }
                }
            }
        }
</style>