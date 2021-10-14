<template>
  <div class="loading-box">
      <canvas id="loadingCanvas" width="120" height="120" ref="jjcccanvasRef"></canvas>
  </div>
</template>

<script>
import {onMounted,ref,computed,onBeforeUnmount} from "vue";
export default {
    name:"loadingCanvas",
    setup() {
        let jjcccanvasRef=ref(null);
        let circleCount=10;
        let tmp=null;
        let degRun=0;
        let canRun=true;
        let ctx=computed(()=>{
            if(jjcccanvasRef.value){

                return jjcccanvasRef.value.getContext("2d");
            }
            return null;
        })

            //绘制一个圆的方法
        function drawCircle(ctx,size){
             ctx.fillStyle="#ddd";
            ctx.beginPath();
            ctx.arc(0,-50,size,0,2*Math.PI,false);
            ctx.closePath();
               ctx.fill();
        }
        function initCanvas(){
           if(ctx){
               ctx.value.clearRect(0,0,120,120);
               for(let i=0;i<circleCount;i++){
                   ctx.value.save();
                   ctx.value.translate(60, 60);
                   ctx.value.rotate((i * 30 +degRun)* Math.PI / 180);
                   
                   drawCircle(ctx.value,2+i*0.4);
                   ctx.value.restore();
               }

                   ctx.value.save();
                     ctx.value.translate(60, 60);
                     ctx.value.fillStyle="#666";
                      ctx.value.font="bold 20px 黑体";
                 ctx.value.textBaseline="middle";//垂直上的调整
                ctx.value.textAlign="center";//水平上的调整,默认left,300的线在左
                    ctx.value.fillText("loading",0,0);
                   ctx.value.restore();
           }

        }

        function runCanvas(stamp){
            if(tmp===null){
                tmp=stamp;
            }
            if(stamp-tmp>200){
              degRun+=10;
             initCanvas();
             tmp=stamp;
            }

            if(canRun){
                console.log("requestAnimationFrame running");
                requestAnimationFrame(runCanvas);
            }
           
        }

     
    
         onMounted(()=>{
             requestAnimationFrame(runCanvas);
        })
        onBeforeUnmount(()=>{
           

                canRun=false;
      
        })
    
        return {
            jjcccanvasRef
        }
    }
}
</script>

<style scoped lang="less">
    .loading-box{
        width:120px;
        height:120px;
        position:fixed;
        z-index:999;
        left:0;
        right:0;
        margin:auto;
        bottom:200px;
    
    }
</style>