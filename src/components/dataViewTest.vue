<template>
  <div style="display:flex;background:#040428;">
    <div>
      <dv-border-box-1 style="width:550px;height:280px;">
        <div>
          <dv-scroll-board :config="config" style="width:500px;height:220px;margin:0 auto;padding-top:20px;" />
        </div>
      </dv-border-box-1>
    </div>
    <div style="margin-left:30px;">
      <dv-border-box-13 style="width:550px;height:280px;">
        <div>
          <dv-scroll-ranking-board :config="rankConfig" style="width:500px;height:250px;margin:0 auto;padding-top:20px;" />
        </div>
      </dv-border-box-13>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      config: {
        header: ['组件', '分支', '覆盖率'],
        data: [
          ['组件1', 'dev-1', "<span  class='colorGrass'>↑75%</span>"],
          ['组件2', 'dev-2', "<span  class='colorRed'>↓33%</span>"],
          ['组件3', 'dev-3', "<span  class='colorGrass'>↑100%</span>"],
          ['组件4', 'rea-1', "<span  class='colorGrass'>↑94%</span>"],
          ['组件5', 'rea-2', "<span  class='colorGrass'>↑95%</span>"],
          ['组件6', 'fix-2', "<span  class='colorGrass'>↑63%</span>"],
          ['组件7', 'fix-4', "<span  class='colorGrass'>↑84%</span>"],
          ['组件8', 'fix-7', "<span  class='colorRed'>↓46%</span>"],
          ['组件9', 'dev-2', "<span  class='colorRed'>↓13%</span>"],
          ['组件10', 'dev-9', "<span  class='colorGrass'>↑76%</span>"]
        ],
        rowNum: 7, //表格行数
        headerHeight: 35,
        headerBGC: '#0f1325', //表头
        oddRowBGC: '#0f1325', //奇数行
        evenRowBGC: '#171c33', //偶数行
        waitTime:1000,
        index: true,
        columnWidth: [50],
        align: ['center']
      },
      rankConfig: {
        data: [
            {
              name: '周口',
              value: 55
            },
            {
              name: '南阳',
              value: 120
            },
            {
              name: '西峡',
              value: 78
            },
            {
              name: '驻马店',
              value: 66
            },
            {
              name: '新乡',
              value: 80
            },
            {
              name: '信阳',
              value: 45
            },
            {
              name: '漯河',
              value: 29
            }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
