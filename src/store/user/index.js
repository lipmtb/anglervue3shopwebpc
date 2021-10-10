
//用户信息核心
export default {
    state(){
        return {
            userProfile:{
                id:"",
                avatarUrl:"",
                nickName:"",
                account:"",
                phoneNum:"",
                token:""
            }
        }
    },
    getters:{
        userProfile(state){
            return state.userProfile;
        }
    },
    mutations:{
        createUserInfo(state,payload){
                state.userProfile=payload;
        },
        removeUserInfo(state){
            state.userProfile={};
        },
        changeNickName(state){
            state.userProfile.nickName="pmtb";
        }
    }
}