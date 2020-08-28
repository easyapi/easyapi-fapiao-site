var app = new Vue({
  el: "#app",
  data() {
    return {
      treeData: [],
      listData:[],
      key:'',
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
    handSearch(){
      axios.get("https://api2.easyapi.com/tax-code/list",{params:}).then(res=>{

      })
    },
    handleNodeClick(data) {
      axios.get("https://api2.easyapi.com/tax-codes",{params:{parentId:data.taxCodeId}}).then(res=>{
        console.log(res)
        this.listData=res.data.content
        console.log(this.listData);
      })
    }
  }
})
