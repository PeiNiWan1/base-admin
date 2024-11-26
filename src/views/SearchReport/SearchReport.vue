<template>
  <ContentWrap>
    <!-- 搜索 -->
    <div class="mb-20px">
      <ElInput
        v-model="searchValue"
        placeholder="请输入搜索内容"
        class="mr-20px"
        style="width: 200px"
      />
      <ElButton type="primary" @click="search">搜索</ElButton>
    </div>

    <div v-if="report && report">
      <table>
        <thead>
          <tr>
            <th>属性名称</th>
            <!-- 遍历每个报告，生成列 -->
            <th v-for="(reportItem, index) in report" :key="index">
              {{ `报告 ${index + 1}` }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>SKU等级</th>
            <td v-for="(reportItem, index) in report" :key="index">
              {{ reportItem.skuName }}
            </td>
          </tr>
          <tr>
            <th>质检报告编号</th>
            <td v-for="(reportItem, index) in report" :key="index">
              {{ reportItem.reportNo }}
            </td>
          </tr>
          <tr>
            <th>物品编号</th>
            <td v-for="(reportItem, index) in report" :key="index">
              {{ reportItem.productNo }}
            </td>
          </tr>
          <tr>
            <th>商品码</th>
            <td v-for="(reportItem, index) in report" :key="index">
              {{ reportItem.itemCode }}
            </td>
          </tr>
          <tr>
            <th>服务ID</th>
            <td v-for="(reportItem, index) in report" :key="index">
              {{ reportItem.inspectionServiceId }}
            </td>
          </tr>
          <tr>
            <th>类别</th>
            <td v-for="(reportItem, index) in report" :key="index">
              {{ reportItem.categoryName }}
            </td>
          </tr>
          <tr>
            <th>品牌</th>
            <td v-for="(reportItem, index) in report" :key="index">
              {{ reportItem.brandName }}
            </td>
          </tr>
          <tr>
            <th>型号</th>
            <td v-for="(reportItem, index) in report" :key="index">
              {{ reportItem.productName }}
            </td>
          </tr>
          <tr>
            <th>商品定义</th>
            <td v-for="(reportItem, index) in report" :key="index">
              {{ reportItem.businessChannelName }}
            </td>
          </tr>
          <tr>
            <th>IMEI&SN</th>
            <td v-for="(reportItem, index) in report" :key="index">
              {{ reportItem.imei[0] }}
            </td>
          </tr>
          <tr v-for="(property, idx) in report[0].propertyValues" :key="idx">
            <th>{{ property.propertyName }}</th>
            <!-- 遍历每个报告，显示对应的属性值 -->
            <td v-for="(reportItem, index) in report" :key="index">
              <div>
                <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap">
                  <text style="color: red" v-if="property.isDifferent">{{
                    property.propertyValueName
                  }}</text>
                  <text v-else>{{ property.propertyValueName }}</text>
                </div>

                <div
                  style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap"
                  class="images"
                  v-if="property.resources && property.resources.length > 0"
                >
                  <!-- 使用 Element Plus 的 ElImage 组件 -->
                  <ElImage
                    v-for="(image, imgIndex) in property.resources"
                    :key="imgIndex"
                    :src="image.resourceUrl"
                    :preview-src-list="[image.resourceUrl]"
                    alt="图片"
                  />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else>
      <p>数据加载中...</p>
    </div>
  </ContentWrap>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { ContentWrap } from '@/components/ContentWrap'
import { ElInput, ElButton, ElImage } from 'element-plus'
import { getReportApi } from '@/api/searchreport'
const report = ref<any | null>(null)
const searchValue = ref('')

const search = async () => {
  const res: any = await getReportApi({ productNo: searchValue.value })
  report.value = res.data
}
</script>
<style scoped>
.container {
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
h1 {
  font-size: 24px;
  color: #333;
  text-align: center;
}
table {
  border-collapse: collapse;
  table-layout: fixed; /* 强制表格的列宽固定 */
  width: 100%; /* 确保表格占满容器 */
}
table td:first-child,
table th:first-child {
  width: 200px !important; /* 强制设置第一列宽度 */
}
table th,
table td {
  padding: 8px 12px;
  border: 1px solid #ddd;
  text-align: center;
}

.images {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
}
.images .el-image {
  width: 100px;
  cursor: pointer;
  margin-right: 10px;
}
</style>
