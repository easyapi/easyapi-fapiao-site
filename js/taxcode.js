var app = new Vue({
  el: "#app",
  data() {
    return {
      parentId: '',
      treeData: [],
      listData: [],
      input: '',
      loading: true,
      tableLoading: false,
      page: 0,
      pageSize: 20,
      total: 0,
      searchMode: false,
      leafQuery: '',
      isMobile: false,
      treeDrawerVisible: false,
      selectedTaxCodeId: null,
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },

  computed: {
    paginationLayout() {
      return this.isMobile ? 'prev, pager, next' : 'total, sizes, prev, pager, next'
    },

    paginationPagerCount() {
      return this.isMobile ? 5 : 7
    }
  },

  created() {
    this.checkMobile()
    this.getTree()
  },

  mounted() {
    window.addEventListener('resize', this.checkMobile)
    this.$nextTick(this.bindTreeClickFilter)
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.checkMobile)
    this.unbindTreeClickFilter()
  },

  methods: {
    checkMobile() {
      var mobile = window.innerWidth <= 768
      if (!mobile) {
        this.treeDrawerVisible = false
      }
      this.isMobile = mobile
      this.$nextTick(this.bindTreeClickFilter)
    },

    getTreeComponent() {
      return this.$refs.taxTree || this.$refs.taxTreeMobile
    },

    syncTreeCurrentKey(key) {
      if (this.$refs.taxTree) {
        this.$refs.taxTree.setCurrentKey(key)
      }
      if (this.$refs.taxTreeMobile) {
        this.$refs.taxTreeMobile.setCurrentKey(key)
      }
    },

    openTreeDrawer() {
      this.treeDrawerVisible = true
    },

    onTreeDrawerOpened() {
      this.$nextTick(function () {
        this.updateTreeScrollbar()
        this.bindTreeClickFilter()
        if (this.$refs.taxTreeMobile && this.selectedTaxCodeId) {
          this.$refs.taxTreeMobile.setCurrentKey(this.selectedTaxCodeId)
        }
      }.bind(this))
    },

    bindTreeClickFilter() {
      this.unbindTreeClickFilter()
      var tree = this.getTreeComponent()
      if (tree && tree.$el) {
        tree.$el.addEventListener('click', this.filterTreeClick, true)
        this._treeEl = tree.$el
      }
    },

    unbindTreeClickFilter() {
      if (this._treeEl) {
        this._treeEl.removeEventListener('click', this.filterTreeClick, true)
        this._treeEl = null
      }
    },

    filterTreeClick(e) {
      var tree = this.getTreeComponent()
      var treeEl = tree && tree.$el
      if (!treeEl || !treeEl.contains(e.target)) {
        return
      }
      if (e.target.closest('.el-tree-node__expand-icon')) {
        return
      }
      if (e.target.closest('.tree-node-label')) {
        return
      }
      e.stopPropagation()
      e.preventDefault()
    },

    getTree() {
      axios.get("https://api.easyapi.com/tax-code/tree").then(res => {
        let data = res.data
        if (data.code === 1) {
          this.treeData = data.content
          this.loading = false
          this.updateTreeScrollbar()
          this.$nextTick(this.bindTreeClickFilter)
        }
      })
    },

    updateTreeScrollbar() {
      this.$nextTick(function () {
        var scrollbars = [this.$refs.treeScroll, this.$refs.treeScrollMobile]
        scrollbars.forEach(function (scrollbar) {
          if (scrollbar && scrollbar.update) {
            scrollbar.update()
          }
        })
      }.bind(this))
    },

    fetchList(resetPage) {
      if (resetPage) {
        this.page = 0
      }
      const params = {
        page: this.page,
        size: this.pageSize
      }
      if (this.searchMode) {
        params.q = this.input
      } else {
        if (this.parentId) {
          params.parentId = this.parentId
        }
        if (this.leafQuery) {
          params.q = this.leafQuery
        }
      }
      this.tableLoading = true
      axios.get("https://api.easyapi.com/tax-codes", {params}).then(res => {
        if (res.data.code === 1) {
          this.listData = res.data.content || []
          this.total = res.data.totalElements || 0
          if (res.data.number != null) {
            this.page = res.data.number
          }
        } else {
          this.listData = []
          this.total = 0
        }
      }).finally(() => {
        this.tableLoading = false
      })
    },

    handSearch() {
      this.searchMode = true
      this.parentId = ''
      this.leafQuery = ''
      this.selectedTaxCodeId = null
      this.syncTreeCurrentKey(null)
      this.fetchList(true)
    },

    handleNodeClick(data, node) {
      this.selectedTaxCodeId = data.taxCodeId
      this.syncTreeCurrentKey(data.taxCodeId)
      this.searchMode = false
      const isLeaf = node.isLeaf || !data.children || data.children.length === 0
      if (isLeaf) {
        this.parentId = ''
        this.leafQuery = data.code || ''
      } else {
        this.parentId = data.taxCodeId
        this.leafQuery = ''
      }
      this.fetchList(true)
      if (this.isMobile) {
        this.treeDrawerVisible = false
      }
    },

    handlePageChange(page) {
      this.page = page - 1
      this.fetchList(false)
    },

    handleSizeChange(size) {
      this.pageSize = size
      this.fetchList(true)
    }
  }
})


