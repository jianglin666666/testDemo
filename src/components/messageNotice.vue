<template>
  <div id="root">
    <header>
      <section>
        <div id="form">
          <label for="title">{{ label }}</label>
          <input
            type="text"
            id="title"
            placeholder="添加ToDo"
            v-model="textValue"
            @keyup.enter="Keyuphandler"
          />
          <!-- @keyup.enter="Keyuphandler" 回车调用创建事件函数 -->
        </div>
      </section>
    </header>
    <section id="main">
      <h2>
        {{ willDo }} <span id="todocount">{{ willDoNum }}</span>
      </h2>
      <ol id="todolist" class="demo-box">
        <!-- 遍历事件数组,当事件的状态为false(未完成)时,显示该事件 -->
        <li
          v-for="(item, index) in willDoList"
          :key="item.id"
          v-if="!item.state"
        >
          <!-- 点击多选框改变当前事件状态为true(已完成),就会隐藏该事件 -->
          <input
            type="checkbox"
            :value="item"
            :checked="item.state"
            @change="toDoneState(index)"
          />
          <!-- 双击改变事件内容显示修改框control=ture -->
          <p @dblclick="dblClick(index, $event)">
            {{ item.id }}
            <!-- 失焦时或回车时触发修改事件内容并隐藏修改框control=false -->
            <input
              v-focus="item.control"
              @blur="blurHandler(index, $event)"
              type="text"
              v-if="item.control"
              :value="item.id"
              @keyup.enter="blurHandler(index, $event)"
            />
          </p>
          <!-- 点击删除该事件 -->
          <a href="javascript:void(0)" @click="removeInWillDo(index)">-</a>
        </li>
      </ol>
      <h2>
        {{ done }} <span id="donecount">{{ doneNum }}</span>
      </h2>
      <ul id="donelist">
        <li
          v-for="(item, index) in willDoList"
          :key="item.id"
          v-if="item.state"
        >
          <input
            type="checkbox"
            :value="item"
            :checked="item.state"
            @click="toWillDoState(index)"
          />
          <p>{{ item.id }} <input type="text" style="display: none" /></p>
          <a href="javascript:void(0)" @click="removeInDone(index)">-</a>
        </li>
      </ul>
    </section>
    <footer>
      {{ msg }} <a href="javascript:void(0)" @click="clearAll">clear</a>
    </footer>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { DirectiveOptions } from "vue";

// 注册一个全局自定义指令 `v-focus`
Vue.directive("focus", {
  // 指令的定义；当被绑定的元素插入到 DOM 中时……
  inserted: function(el, { value }) {
    // 聚焦元素
    if (value) {
      el.focus();
    }
  }
});
// 注明此类为一个vue组件
@Component({
  components: {}
})
export default class TestDemo extends Vue {
  private label = "ToDoList";
  private textValue = ""; //创建事件输入框内容初始
  private willDo = "正在进行";
  private willDoNum = 0; //未完成事件数量
  private doneNum = 0; //已完成事件储量
  private done = "已经完成";
  private willDoList = []; //用来存储添加的事件
  private msg = "Copyright © 2014 todolist.cn";

  created() {
    if (localStorage.willDoList) {
      this.willDoList = JSON.parse(localStorage.willDoList);
      let willList = this.willDoList.reduce((value, item, index) => {
        if (item.state === false) value.push(item);
        return value;
      }, []);
      this.willDoNum = willList.length;
      this.doneNum = this.willDoList.length - this.willDoNum;
    }
  }
  mounted() {}
  Keyuphandler() {
    // 当输入的事件不为空,且在事件列表中没有该事件时,允许创建该事件
    // 因为上面li取的是事件名称当做key,不能重复,所以也就不能添加重复事件,无论该事件有没有完成
    // 解决办法:可以给每个事件单独创建一个id,或者一个不重复的随机数作为key值
    let result = this.willDoList.reduce((value, item, index) => {
      if (this.textValue === item.id) value = item;
      return value;
    }, null);
    if (this.textValue.trim() !== "" && !result) {
      this.willDoList.push({
        id: this.textValue,
        // 事件名称,同时作为li的key值,这个事件不能重复
        state: false,
        // 每个添加的事件都有一个默认状态,该状态用来控制该事件的完成或未完成状态
        // 同时checked计算属性,显示选中或未选中
        control: false
        //control主要用来控制隐藏的input的显示或失焦隐藏状态
        // 初始设置为false,利用v-if,那么就会隐藏input
        // 双击事件触发只要将control改为true,input就会显示出来
      });
      this.willDoNum++;
      this.textValue = "";
      this.setLocalStorage(this.willDoList);
    } else if (result) {
      alert("该事件已添加或完成");
    } else if (this.textValue.trim() === "") {
      alert("输入事件不能为空");
    }
  }
  // 查找该事件的状态state，取反，同时更改数量统计
  toDoneState(index) {
    // 把该事件的状态从未完成事件改为已完成事件
    this.willDoList[index].state = true;
    // 并且写入本地存储
    this.setLocalStorage(this.willDoList);
    // 同时分别修改未完成事件状态和已完成事件状态的事件的数量
    this.willDoNum--;
    this.doneNum++;
  }
  // 查找该事件的状态state，取反，同时更改数量统计
  toWillDoState(index) {
    // 把该事件的状态从已完成事件改为未完成事件
    this.willDoList[index].state = false;
    // 并且写入本地存储
    this.setLocalStorage(this.willDoList);
    // 同时分别修改未完成事件状态和已完成事件状态的事件的数量
    this.willDoNum++;
    this.doneNum--;
  }
  //   添加缓存
  setLocalStorage(willDoList) {
    // 将每次修改后的事件列表存储在本地
    localStorage.willDoList = JSON.stringify(willDoList);
  }
  //   从未完成数组中删除该项
  removeInWillDo(index) {
    // 将这个状态为未完成事件的事件删除,同时修改相应统计数量,写入本地存储
    this.willDoList.splice(index, 1);
    this.willDoNum--;
    this.setLocalStorage(this.willDoList);
  }
  //   从已完成数组中删除该项
  removeInDone(index) {
    // 将这个状态为已完成事件的事件删除,同时修改相应统计数量,写入本地存储
    this.willDoList.splice(index, 1);
    this.doneNum--;
    this.setLocalStorage(this.willDoList);
  }
  //   双击p标签让他下边的子元素input显示出来
  dblClick(index, e) {
    // 双击P标签时,将P标签下隐藏的input修改框显示出来
    this.willDoList[index].control = true;
    console.log(e.target.firstElementChild);
  }
  //  失焦改变列表
  blurHandler(index, e) {
    // 当失去焦点时，input框应该隐藏，并将现有值赋给当前未完成事件
    // 判断，当修改后的事件和现有的事件不相同时允许将原事件改为修改后的事件
    let result = this.willDoList.reduce((value, item, i) => {
      if (e.target.value === item.id && i !== index) value = item;
      return value;
    }, null);
    // 当输入内容不为空且事件不重复时隐藏input修改框
    // 并重新写入本地存储
    if (e.target.value.trim() !== "" && !result) {
      this.willDoList[index].id = e.target.value;
      this.willDoList[index].control = false;
      this.setLocalStorage(this.willDoList);
    }
  }
  //   清空列表
  clearAll() {
    // 将数组、未完成事件和已完成事件数量清空为初始状态
    this.willDoList.length = 0;
    this.willDoNum = 0;
    this.doneNum = 0;
    // 重写本地存储
    this.setLocalStorage(this.willDoList);
    // arr.length=0这种方式清空数组不是响应式的，所以要手动重新渲染一遍
    this.$forceUpdate();
  }
}
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  font-size: 16px;
  background: #cdcdcd;
}
header {
  height: 50px;
  background: #333;
  background: rgba(47, 47, 47, 0.98);
}
section {
  margin: 0 auto;
}
label {
  float: left;
  width: 100px;
  line-height: 50px;
  color: #ddd;
  font-size: 24px;
  cursor: pointer;
  font-family: “Helvetica Neue”, Helvetica, Arial, sans-serif;
}
header input {
  float: right;
  width: 60%;
  height: 24px;
  margin-top: 12px;
  text-indent: 10px;
  border-radius: 5px;
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.24),
    0 1px 6px rgba(0, 0, 0, 0.45) inset;
  border: none;
}
input:focus {
  outline-width: 0;
}
h2 {
  position: relative;
}
span {
  position: absolute;
  top: 2px;
  right: 5px;
  display: inline-block;
  padding: 0 5px;
  height: 20px;
  border-radius: 20px;
  background: #e6e6fa;
  line-height: 22px;
  text-align: center;
  color: #666;
  font-size: 14px;
}
ol,
ul {
  padding: 0;
  list-style: none;
}
li input {
  position: absolute;
  top: 2px;
  left: 10px;
  width: 22px;
  height: 22px;
  cursor: pointer;
}
p {
  margin: 0;
  user-select: none;
}
li p input {
  top: 3px;
  left: 40px;
  width: 70%;
  height: 20px;
  line-height: 14px;
  text-indent: 5px;
  font-size: 14px;
}
li {
  height: 32px;
  line-height: 32px;
  background: #fff;
  position: relative;
  margin-bottom: 10px;
  padding: 0 45px;
  border-radius: 3px;
  border-left: 5px solid #629a9c;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07);
}
ol li {
  cursor: move;
}
ul li {
  border-left: 5px solid #999;
  opacity: 0.5;
}
li a {
  position: absolute;
  top: 2px;
  right: 5px;
  display: inline-block;
  width: 14px;
  height: 12px;
  border-radius: 14px;
  border: 6px double #fff;
  background: #ccc;
  line-height: 14px;
  text-align: center;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
}
footer {
  color: #666;
  font-size: 14px;
  text-align: center;
}
footer a {
  color: #666;
  text-decoration: none;
  color: #999;
}
@media screen and (max-device-width: 620px) {
  section {
    width: 96%;
    padding: 0 2%;
  }
}
@media screen and (min-width: 620px) {
  section {
    width: 600px;
    padding: 0 10px;
  }
}
</style>
