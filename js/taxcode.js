var app = new Vue({
  el: "#app",
  data() {
    return {
      parentId: '',
      treeData: [],
      listData: [],
      input: '',
      loading:true,
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  created() {
    this.getTree()
  },
  methods: {
    getTree() {
      axios.get("https://api.easyapi.com/tax-code/tree").then(res => {
        let data = res.data
        if (data.code == 1) {
          this.treeData = data.content
          this.loading=false
        }
      })
    },
    handSearch() {
      axios({
        url: 'https://api.easyapi.com/tax-codes',
        method: 'get',
        params: {
          q: this.input,
        }
      }).then(res => {
        if (res.data.code == 1) {
          this.listData = res.data.content
        } else {
          this.listData = []
        }
      })
    },
    handleNodeClick(data) {
      this.parentId = data.taxCodeId
      axios.get("https://api.easyapi.com/tax-codes", {params: {parentId: data.taxCodeId}}).then(res => {
        if (res.data.code==1) {
          this.listData = res.data.content
        }
      })
    }
  }
})
