
import {onMounted,onBeforeUnmount,ref} from "vue";
export default function(handle){
    
    let hasFinish=ref(true);//网络请求控制（加载更多网络未返回不能重复加载）
    let timerout=null;
    let lastTop=0;//保证是下拉状态
    let sTop=0;//滚动scrollTop
    function runHandle(){
        handle.call(null);
    }
    function onSrollPage(){
        
        lastTop=sTop;
        
        sTop=document.body.scrollTop+document.documentElement.scrollTop;
        
        let limitScrollTop=document.documentElement.scrollHeight-380-document.documentElement.clientHeight;
        if(sTop>limitScrollTop&&sTop>80&&lastTop<sTop){
            if(hasFinish.value){
                if(timerout){
                    clearTimeout(timerout);
                }
                timerout=setTimeout(()=>{
                    runHandle();
                },1000)
               
            }
        }
    }
    onMounted(()=>{

        document.defaultView.addEventListener("scroll",onSrollPage,false)
    })

    onBeforeUnmount(() => {
            document.defaultView.removeEventListener("scroll",onSrollPage);
    })

    return{
        hasFinish
    }
}