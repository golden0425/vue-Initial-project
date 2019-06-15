<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld :msg="gymName"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { location } from "@/api/http/index";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  data() {
    return {
      gymName: null
    };
  },
  methods: {
    async getLocation() {
      let params = {
        data: {
          city: "上海市",
          province: "上海市",
          latitude: 31.2832287,
          longitude: 121.557675
        }
      };
      let res = await location(params);
      this.gymName = res.data.gymName;
      console.log(res);
    }
  },
  created() {
    this.getLocation();
  }
};
</script>
