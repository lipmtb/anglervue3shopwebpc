import baseAxiosIns from "@/network/baseRequest";

export function getSubCateTemporary(categoryId,page,pageSize){
    return baseAxiosIns.post("/category/goods/temporary",{
        categoryId,page,pageSize
    })
}