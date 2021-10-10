
import { ref, onMounted ,onBeforeUnmount} from "vue";
export default function srollFixNav(){
    let isFix = ref(false);
    let isSlideDown=ref(false);
    function onPageScroll() {
        if (this.scrollY > 120) {
         
           isFix.value = true;
           setTimeout(() => {
            isSlideDown.value=true;
           }, 32);
        }else{
          
           isFix.value = false;
           isSlideDown.value=false;
        }
      }
      onMounted(() => {
        document.defaultView.addEventListener("scroll", onPageScroll);
      });

      onBeforeUnmount(()=>{
        document.defaultView.removeEventListener("scroll", onPageScroll);
      })
      return {
        isFix,
        isSlideDown
      }
}