<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/Search'
import { Dialog } from '@/components/Dialog'
import { useI18n } from '@/hooks/web/useI18n'
import { Table } from '@/components/Table'
import { getTableListApi } from '@/api/searchreport'
import { useTable } from '@/hooks/web/useTable'
import { TableData } from '@/api/table/types'
import { ref, unref, reactive } from 'vue'
import Write from './components/Write.vue'
import Detail from './components/Detail.vue'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { BaseButton } from '@/components/Button'

const ids = ref<string[]>([])

const { tableRegister, tableState, tableMethods } = useTable({
  fetchDataApi: async () => {
    const { currentPage, pageSize } = tableState
    const res = await getTableListApi({
      pageIndex: unref(currentPage),
      pageSize: unref(pageSize),
      ...unref(searchParams)
    })
    return {
      list: res.data.results,
      total: res.data.count
    }
  }
})
const { loading, dataList, total, currentPage, pageSize } = tableState
const { getList, getElTableExpose, delList } = tableMethods

const searchParams = ref({})
const setSearchParams = (params: any) => {
  searchParams.value = params
  getList()
}

const { t } = useI18n()

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'id',
    label: 'ID',
    search: {
      hidden: true
    },
    form: {
      hidden: true
    },
    table: {
      width: '80px'
    },
    detail: {
      hidden: true
    }
  },
  {
    field: 'sku',
    label: '账号',
    search: {
      hidden: true
    },
    form: {
      hidden: true
    },
    detail: {
      span: 24
    }
  },
  {
    field: 'level_name',
    label: '等级',
    search: {
      hidden: true
    },
    form: {
      hidden: true
    },
    table: {
      width: '80px'
    },
    detail: {
      span: 24
    }
  },
  {
    field: 'username',
    label: '账号',
    search: {
      hidden: true
    },
    form: {
      hidden: true
    },
    table: {
      width: '100px'
    },
    detail: {
      span: 24
    }
  },
  {
    field: 'create_time',
    label: '创建时间',
    search: {
      hidden: true
    },
    form: {
      hidden: true
    },
    table: {
      width: '240px'
    },
    detail: {
      span: 24
    }
  },
  {
    field: 'json_data',
    label: '源数据',
    search: {
      hidden: true
    },
    form: {
      hidden: true
    },
    table: {
      hidden: true
    },
    detail: {
      slots: {
        default: (data: any) => {
          return <div>{JSON.stringify(data)}</div>
        }
      }
    }
  },
  {
    field: 'action',
    width: '260px',
    label: t('tableDemo.action'),
    search: {
      hidden: true
    },
    form: {
      hidden: true
    },
    detail: {
      hidden: true
    },
    table: {
      slots: {
        default: (data: any) => {
          return (
            <>
              <BaseButton type="success" onClick={() => action(data.row, 'detail')}>
                {t('exampleDemo.detail')}
              </BaseButton>
            </>
          )
        }
      }
    }
  }
])

// @ts-ignore
const { allSchemas } = useCrudSchemas(crudSchemas)

const dialogVisible = ref(false)
const dialogTitle = ref('')

const currentRow = ref<TableData | null>(null)
const actionType = ref('')

const AddAction = () => {
  dialogTitle.value = t('exampleDemo.add')
  currentRow.value = null
  dialogVisible.value = true
  actionType.value = ''
}

const delLoading = ref(false)

const delData = async (row: TableData | null) => {
  const elTableExpose = await getElTableExpose()
  ids.value = row ? [row.id] : elTableExpose?.getSelectionRows().map((v: TableData) => v.id) || []
  delLoading.value = true
  await delList(unref(ids).length).finally(() => {
    delLoading.value = false
  })
}

const action = (row: TableData, type: string) => {
  dialogTitle.value = t(type === 'edit' ? 'exampleDemo.edit' : 'exampleDemo.detail')
  actionType.value = type
  currentRow.value = row
  dialogVisible.value = true
}

const writeRef = ref<ComponentRef<typeof Write>>()

const saveLoading = ref(false)
</script>

<template>
  <ContentWrap>
    <!-- <Search :schema="allSchemas.searchSchema" @search="setSearchParams" @reset="setSearchParams" /> -->

    <div class="mb-10px">
      <!-- <BaseButton type="primary" @click="AddAction">{{ t('exampleDemo.add') }}</BaseButton> -->
      <!-- <BaseButton :loading="delLoading" type="danger" @click="delData(null)">
        {{ t('exampleDemo.del') }}
      </BaseButton> -->
    </div>

    <Table
      v-model:pageSize="pageSize"
      v-model:currentPage="currentPage"
      :columns="allSchemas.tableColumns"
      :data="dataList"
      :loading="loading"
      :pagination="{
        total: total
      }"
      @register="tableRegister"
    />
  </ContentWrap>

  <Dialog v-model="dialogVisible" :title="dialogTitle">
    <Write
      v-if="actionType !== 'detail'"
      ref="writeRef"
      :form-schema="allSchemas.formSchema"
      :current-row="currentRow"
    />

    <Detail
      v-if="actionType === 'detail'"
      :detail-schema="allSchemas.detailSchema"
      :current-row="currentRow"
    />

    <template #footer>
      <BaseButton @click="dialogVisible = false">{{ t('dialogDemo.close') }}</BaseButton>
    </template>
  </Dialog>
</template>
