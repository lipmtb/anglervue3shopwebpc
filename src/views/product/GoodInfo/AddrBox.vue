<template>
  <div class="addr-box fl" @click="showSelectAreaBox" :class="{'hide-bottom':isShowAreaSel}">
            <span class="addr-name">{{selAreaName}}</span>
            <i class="iconfont icon-angle-down"></i>
            <div class="area-abs-box" @click.stop="seleCity" v-show="isShowAreaSel">
                    <ul class="area-lists clearfix">
                        
                        <li class="area-item fl" :data-area-name="areaitem.name" :data-area-code="areaitem.code" v-for="areaitem in showArr" :key="areaitem.id">{{areaitem.name}}</li>
                    </ul>
            </div>
  </div>
</template>

<script>
import { ref,computed,reactive } from 'vue'

export default {
    name:"areaBox",
    props:["areaJsonArr"],
    setup(props) {
        let isShowAreaSel=ref(false);//是否显示地区选择
        let selAreaName=ref("北京 北京市 东城区");//选择的地区名
        let selAreaIdArr=reactive(["110000","110100","110103"]);//选择的地区id数组
        let secondLevelCode=ref("");//一级城市
        let thridLevelCode=ref("");//二级城市

     //展示的地区信息，每层
        let showArr=computed(()=>{
            if(!secondLevelCode.value&&!thridLevelCode.value){
                return props.areaJsonArr;
            }
            if(secondLevelCode.value&&thridLevelCode.value){
               let secArr=props.areaJsonArr.find((item)=>item.code===secondLevelCode.value).areaList;
               if(secArr.length>0){

                  return secArr.find((secitem)=>secitem.code===thridLevelCode.value).areaList;
               }
            }
            if(secondLevelCode.value&&!thridLevelCode.value){
                return props.areaJsonArr.find((item)=>item.code===secondLevelCode.value).areaList
            }
        
            return [];
        });
        
        let tmpSelectName="";
        let tmpAreaIdArr=[];
        function seleCity(e){
 
            //最后一层
           if(secondLevelCode.value&&thridLevelCode.value){
                tmpSelectName+=e.target.dataset.areaName;
                selAreaName.value=tmpSelectName;

                tmpAreaIdArr[2]=e.target.dataset.areaCode; 
                     selAreaIdArr.splice(0,selAreaIdArr.length,...tmpAreaIdArr);

                   isShowAreaSel.value=false;
                   secondLevelCode.value="";
                   thridLevelCode.value="";
                    
                return;
            }

        //倒数第二层
            if(secondLevelCode.value&&!thridLevelCode.value){
                thridLevelCode.value=e.target.dataset.areaCode;
                 tmpSelectName+=e.target.dataset.areaName;
                 tmpAreaIdArr[1]=e.target.dataset.areaCode; 
                return;
            }
        //第一层
              if( !secondLevelCode.value){

                secondLevelCode.value=e.target.dataset.areaCode; 
                tmpSelectName+=e.target.dataset.areaName;
                tmpAreaIdArr[0]=e.target.dataset.areaCode; 
            }
        }
    //显示toggle地区选择
        function showSelectAreaBox(){
            isShowAreaSel.value=!isShowAreaSel.value;
            if(isShowAreaSel.value){
                 tmpSelectName="";
                tmpAreaIdArr=[];
            }
        }   
        return {
            selAreaName,  //结果显示的地区名
            seleCity,   //选择某个地区
            showArr,    //展示的地区数据
            isShowAreaSel,  //是否显示地区选择
            showSelectAreaBox, //显示toggle地区选择
        
        }   
    }
}
</script>

<style lang="less" scoped>
 div.addr-box{
              position:relative;
              padding:0 4px;
              border:1px solid #ccc;
              z-index:20;
              &.hide-bottom{

                  border-bottom:none;
              }
                 cursor:pointer;
              i.iconfont{
                  font-size:0.6em;
              }

              > div.area-abs-box{
                  position:absolute;
                  left:0;
                  top:20px;
                 width:540px;
                 height:400px;
                 background-color:#fff;
                 > ul.area-lists{
                     padding:4px;
                     border:1px solid #ccc;
                     text-align: center;
                     li.area-item{
                       width:130px;
                       padding:6px 10px;
                        white-space: nowrap;
                        
                        border-radius:4px;
                       
                        &:hover{
                            background-color:#f5f5f5;
                        }
                     }
                 }
              }
          }
</style>