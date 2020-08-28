var app = new Vue({
  el: "#app",
  data() {
    return {
      parentId:'',
      treeData: [],
      listData: [],
      input: '',
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
      axios.get("https://api2.easyapi.com/tax-code/tree").then(res => {
        let data = res.data
        if (data.code == 1) {
          this.treeData = data.content
        }
      })
    },
    handSearch() {
      axios({
        url: 'https://api2.easyapi.com/tax-codes',
        method: 'get',
        params: {
          q: this.input,
          parentId: this.parentId
        }
      }).then(res => {
        if (res.data.code == 1) {
          this.listData = res.data.content
        }
      })
    },
    handleNodeClick(data) {
      this.parentId = data.taxCodeId
      axios.get("https://api2.easyapi.com/tax-codes", {params: {parentId: data.taxCodeId}}).then(res => {
        console.log(res)
        this.listData = res.data.content
        console.log(this.listData);
      })
    }
  }
})
