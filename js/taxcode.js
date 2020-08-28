var app = new Vue({
  el: "#app",
  data() {
    return {
      treeData: [],
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
    }
  }
})
