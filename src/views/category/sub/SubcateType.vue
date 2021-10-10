<template>
   <div class="sub-cate-type">
            <div class="type-item"  v-if="subcatedata.brands">
              <span class="type-text">品牌：</span>
              <span>全部</span>
              <span v-for="brand in subcatedata.brands" :key="brand.id">{{brand.name}} </span>
            </div>

            <div class="type-item" v-for="saletype of saleProperties" :key="saletype.id">
              <span class="type-text">{{saletype.name}}:</span>
              <span>全部</span>
              <span class="all-type-item"  v-for="sizeitem of saletype.properties" :key="sizeitem.id">{{sizeitem.name}}</span>
            </div>
    </div>
</template>

<script>
// 子分类的类型组件
export default {
    name:"SubcateType",
    props:["subcatedata","saleProperties"]
}
</script>

<style lang="less" scoped>
    .sub-cate-type{
     
        padding:16px 0;
           padding-left:16px;
        background-color: #fff;
        .type-item{
            margin:10px 0;
            font-size:1.1em;
            span.type-text{
                color:#aaa;
            }
             > span{
                margin-right:20px;
            }
            > span.all-type-item{
                cursor: pointer;
                &:hover{
                    color:rgb(144, 248, 123);
                }
            }
        }
    }
</style>