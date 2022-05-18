<template>
    <div style="width:100%;height:100%;">
        <div :is="compName" :style="style1"></div>
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
        return {
            compName:'',
            width:1280,
            height:800,
            style1:''
        }
    },
    mounted(){
        this.compName = this.$route.params.name
        console.log(this.$route)
        // this.style1 = `top: 0px; left: 0px; width: ${this.width}px; height: ${this.height}px;`
        this.style1 = `top: 0px; left: 0px;`
    }
}
</script>