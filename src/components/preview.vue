<template>
    <div style="width:100%;height:100%;" v-waterMarker="{text:'cjl版权所有',textColor:'rgba(180, 180, 180, 0.8)'}">
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
            width:1250,
            height:520,
            style1:''
        }
    },
    mounted(){
        this.compName = this.$route.params.name
        console.log(this.$route)
        this.style1 = `top: 0px; left: 0px; width: ${this.width}px; height: ${this.height}px;`
        // this.style1 = `top: 0px; left: 0px;`
    },
    methods:{
        addWaterMarker(str, parentNode, font, textColor) {
            // 水印文字，父元素，字体，文字颜色
            let can = document.createElement('canvas')
            parentNode.appendChild(can)
            can.width = 200
            can.height = 150
            can.style.display = 'none'
            let cans = can.getContext('2d')
            cans.rotate((-20 * Math.PI) / 180)
            cans.font = font || '16px Microsoft JhengHei'
            cans.fillStyle = textColor || 'rgba(180, 180, 180, 0.3)'
            cans.textAlign = 'left'
            cans.textBaseline = 'Middle'
            cans.fillText(str, can.width / 10, can.height / 2)
            parentNode.style.backgroundImage = 'url(' + can.toDataURL('image/png') + ')'
        } 
    },
    directives:{
        waterMarker:{
            bind(el, binding,vnode){
                //函数里面第三个参数vnode 它的vnode.context就是当前的vm实例
                let that = vnode.context 
                that.addWaterMarker(binding.value.text, el, binding.value.font, binding.value.textColor)
            }
        }
    }
}
</script>