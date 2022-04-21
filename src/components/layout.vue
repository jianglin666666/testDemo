<template>
    <div style="width:100%;height:100%;">
        <!-- 其他子组件header -->
        <router-view></router-view>
    </div>
</template>
<script>
import Vue from 'vue'
import components from '../common/compData.js'
components.map(component => {
    Vue.component(component.name,component.component)
})
export default {
    data(){
       
    },
    mounted(){
        
    }
}
</script>