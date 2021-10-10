import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed, watch, ref } from "vue";

export default function breadAnimateRun(){
    let currentRoute = useRoute();
    let store = useStore();

    let oldName = ref("");
    let isChangeCate = ref(false);
    let showOld=ref(false);

    let className = computed(() => {
    
      let cId = currentRoute.params.classId;
      let classAll = store.getters.headerCateLists;
      let classItem = classAll.find((item) => {
        return item.id === cId;
      });
      if (classItem) {
        
        return classItem.name;
      }
      return "";
    });
 

 
    watch(
     className,
      (__,oldVal) => {
      
          oldName.value=oldVal||"";
        isChangeCate.value = true;
        showOld.value=true;
         setTimeout(() => {
          showOld.value = false;
            isChangeCate.value = false;
        }, 1000);
      }
    );

    return {
        className,
        oldName,
        showOld,
        isChangeCate,
    }
}