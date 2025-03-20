<template>
  <div class="menu-wrapper">
    <div :key="`${item.title}-${index}`" v-for="(item, index) in data" :data-testid="`first-level-${item.key}`">
      {{ item.title }}
      <template v-if="item.isShowSub">
        <button @click="() => handleClick(index)" :data-testid="`button-${item.key}`">
          >
        </button>
        <ul v-show="item.isExpand" :data-testid="`ul-${item.key}`">
          <li :key="`${sub.title}-${i}`" v-for="(sub, i) in item.subItems" :data-testid="`li-${item.key}`">
            {{ sub.title }}
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>
<script>
const list = [
  {
    title: 'Home'
  },
  {
    title: 'Services',
    subItems: ['Cooking', 'Cleaning']
  }
];
export default {
  props: {
    menuConfig: {
      default: () => list
    }
  },
  data() {
    return {
      data: this.formatterMenuConfig(this.menuConfig)
    };
  },
  methods: {
    strToLowcase(str) {
      return str.toLowerCase();
    },
    formatterMenuConfig(data) {
      return data.map(item => {
        return {
          title: item.title,
          isExpand: false,
          isShowSub: !!item?.subItems,
          subItems: (item?.subItems || []).map(sub => ({
            title: sub,
            key: this.strToLowcase(sub)
          })),
          key: this.strToLowcase(item.title)
        }
      })
    },
    handleClick(index) {
      if (this.data[index].isExpand) {
        this.data[index].isExpand = false;
      } else {
        // 把前一个的 isExpand 置为 false，再把现在的置为 true
        const prevIndex = this.data.findIndex(item => item.isExpand);
        if (prevIndex > -1) {
          this.data[prevIndex].isExpand = false;
        }
        this.data[index].isExpand = true;
      }
    }
  }
};
</script>

<style>
.menu-wrapper {
  margin-left: 20px;
}
</style>