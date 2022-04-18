<template>
  <div style="display:flex;jusitify-content:space-between;align-items:center;">
    <div style="border: 1px solid #ccc;">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editor"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 300px; overflow-y: hidden;"
        v-model="html"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="onCreated"
      />
    </div>
    <div style="margin-top:40px 20px 0;width:150px;" >
        <button @click="add">确认</button>
    </div>
    <div ref="boxContent" id="box-content" style="height:423px;min-width:45%;border:1px solid #ccc;"></div>
  </div>
</template>
<script>
import Vue from "vue";
import "@wangeditor/editor/dist/css/style.css";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

export default Vue.extend({
  components: { Editor, Toolbar },
  data() {
    return {
      editor: null,
      html: null,
      toolbarConfig: {},
      editorConfig: { 
          placeholder: "请输入内容..."
      },
      mode: "default" // or 'simple'
    };
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    add(){
        console.log(this.editor.getHtml())
        this.$nextTick(()=>{
            let html = this.editor.getHtml()
            document.getElementById("box-content").innerHTML = html
        })
    }
  },
  mounted() {
    // 模拟 ajax 请求，异步渲染编辑器
    // setTimeout(() => {
    //     this.html = '<p>模拟 Ajax 异步设置内容 HTML</p>'
    // }, 1500)
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  }
});
</script>
