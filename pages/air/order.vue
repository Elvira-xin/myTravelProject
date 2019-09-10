<template>
    <div class="container">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
           <orderForm :data="airInfo"/>

            <!-- 侧边栏 -->
            <!-- <orderAside></orderAside> -->
        </el-row>
    </div>
</template>

<script>
import orderForm from '@/components/air/orderForm.vue'
// import orderAside from '@/components/air/orderAside.vue'
export default {
    components:{
        orderForm,
        // orderAside
    },
    data(){
        return{
            airInfo:{
                insurances:[]
            }
        }
    },
    mounted(){
        this.$axios({
            url:'/airs/'+this.$route.query.id,
            params:{
                seat_xid:this.$route.query.seat_xid
            }
        }).then(res=>{
            console.log(res)
            this.airInfo=res.data
        })
    }
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>