<template>
  <div class="good-img-bigger clearfix">
        <div class="left-show-img fl" ref="leftParentBox"  @mousemove="mousemoveHandle" @mouseenter="enterLeftImg" @mouseleave="leaveLeftImg">
            <img :src="mainpiclists[curImgIdx]" :alt="mainpiclists[curImgIdx]" />
            <div class="move-box" :style="moveBoxStyle" ref="innerRunBox">

            </div>
        </div>
        <ul class="right-pre-list fr">
            <li class="img-pre-item"  v-for="(itemimg,idx) in mainpiclists" :key="itemimg" @mouseenter="hoverRightSmallImg(idx)">
                <img :src="itemimg" :alt="itemimg" />
            </li>
        </ul>

        <div class="right-show-img" :style="rightBigStyle" >
            <img class="biggerImgRight"  :style="innerImgStyle" :src="mainpiclists[curImgIdx]" :alt="mainpiclists[curImgIdx]" />
        </div>
  </div>
</template>

<script>
// 放大镜图
// mousemove 改变hoverBigPos的数据，导致computed变化
import {reactive, ref,computed,watch} from "vue";
export default {
    name:"goodImgBigger",
    props:["mainpiclists"],
    setup() {
        //图片切换
        let curImgIdx=ref(0);//初始选中的图
         function hoverRightSmallImg(idx){
            curImgIdx.value=idx;
        }

       let isShowRightBig=ref(false);
        let hoverBigPos=reactive({left:0,top:0});//滑块的位置


         let leftParentBox=ref(null);//滑块父元素
    
       let leftParentOffset=reactive({});//滑块父元素相对文档的位置
        //父容器相对文档的位置和父容器的大小
        watch(leftParentBox,(newVal)=>{
            leftParentOffset.top=newVal.getBoundingClientRect().y+document.body.scrollTop+document.documentElement.scrollTop;
            leftParentOffset.left=newVal.getBoundingClientRect().x+document.body.scrollLeft+document.documentElement.scrollLeft;
            leftParentOffset.width=leftParentBox.value.clientWidth;
            leftParentOffset.height=leftParentBox.value.clientHeight;
            console.log(leftParentOffset);
        })



   //滑动块的大小
        let innerRunBox=ref(null);
        let innerRunBoxWh=reactive({
            width:200,
            height:200
        })
        watch(innerRunBox,()=>{
            innerRunBoxWh.width=innerRunBox.value.getBoundingClientRect().width;//offsetWidth
            innerRunBoxWh.height=innerRunBox.value.getBoundingClientRect().height;//offsetHeight
             console.log(innerRunBoxWh,innerRunBox.value.getBoundingClientRect());
        })


        let moveBoxStyle=computed(()=>{
            return {
                left:hoverBigPos.left+"px",
                top:hoverBigPos.top+"px",
                visibility:isShowRightBig.value?"visible":"hidden"  //display:none getBoundingClientRect获取为0？
            }
        })

        let rightBigStyle=computed(()=>{
            return {
            
                 display:isShowRightBig.value?"block":"none"
            }
        })
       

      let innerImgStyle=computed(()=>{
            return {
                    left:2*-hoverBigPos.left+"px",
                top:-2*hoverBigPos.top+"px",
            }
        })

   //滑块移动事件
    function mousemoveHandle(e){
        // console.log("mousemoveHandle",e.clientY,e.pageY,document.body.scrollTop+document.documentElement.scrollTop);
        //  console.log("mousemoveHandle",e.offsetX,e.offsetY);//相对自己
            // console.log(leftParentBox.value.clientTop,leftParentBox.value.offsetTop,leftParentBox.value.getBoundingClientRect());
        if(leftParentBox.value){    
            // console.log(e.pageX,leftParentOffset.left)
            hoverBigPos.left=e.pageX-innerRunBoxWh.width/2-leftParentOffset.left;
            hoverBigPos.top=e.pageY-innerRunBoxWh.height/2-leftParentOffset.top;
             (hoverBigPos.left<0)&&(hoverBigPos.left=0);
             (hoverBigPos.left>(leftParentOffset.width-innerRunBoxWh.width))&&(hoverBigPos.left=(leftParentOffset.width-innerRunBoxWh.width));
             (hoverBigPos.top<0)&&(hoverBigPos.top=0);
             (hoverBigPos.top>(leftParentOffset.height-innerRunBoxWh.height))&&(hoverBigPos.top=leftParentOffset.height-innerRunBoxWh.height);
        }
    }

    //鼠标滑进左边大图
        function enterLeftImg(){
           
            isShowRightBig.value=true;
        }

        function leaveLeftImg(){
             isShowRightBig.value=false;
        }
        
        return {
            leftParentBox,
            curImgIdx,
            hoverRightSmallImg,
            enterLeftImg,   //鼠标滑进左边大图
            leaveLeftImg,
            moveBoxStyle,  //左边小滑块样式
            rightBigStyle ,//右边大图显示隐藏
            mousemoveHandle,
            innerImgStyle,
            innerRunBox
        }
    }
}
</script>

<style lang="less" scoped>
.good-img-bigger{
    width:480px;
    height:400px;
    position:relative;
    > div.right-show-img {
        position:absolute;
          width:400px;
        height:400px;
      
        left:86%;
        top:0;
        z-index:21;
        overflow: hidden;
         > img.biggerImgRight{
                position:absolute;
                left:0;
                top:0;
                width:200%;
                height:200%;
               max-width:200%;
              max-height:200%;
            }
    }
}
    .left-show-img{
        width:400px;
        height:400px;
        cursor:move;
        position: relative;
        > div.move-box{
            position:absolute;
            width:50%;
            height:50%;
            left:0;
            top:0;
            background-color: #aaa7a796;
            border:2px solid;
          
        }
    }

    ul.right-pre-list{
        > li.img-pre-item{
            width:68px;
            height:68px;
            margin-bottom:15px;
            cursor: pointer;
            &:hover{
                outline:2px solid #0f0;
            }
        }
    }
</style>