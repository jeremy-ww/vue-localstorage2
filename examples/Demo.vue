<template>
  <section>
    <h1>Demo</h1>
    <p>
      Add any key value to local storage (including json、array). Open the developer tool to see the storage changes. 
    </p>
    <p>
      <a href="https://github.com/Army-U/vue-localstorage2/blob/master/examples/Demo.vue">
        <small>Source Code</small>
      </a>
    </p>

    <el-tag
      v-for="(tag, key) in dynamicTags"
      :disable-transitions="false"
      @close="handleClose(tag)"
      :key="key"
      closable>
        {{ tag }}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
      v-model="inputValue"
      ref="saveTagInput"
      size="small">
    </el-input>
    <el-button
      class="button-new-tag"
      @click="showInput"
      size="small"
      v-else>
        + New Tag
    </el-button>
  </section>
</template>

<script>
export default {
  name: 'demo1',

  data () {
    return {
      dynamicTags: this.$localStorage.get('dynamic_tags', ['标签一', [{ name: '标签二' }], ['标签三', '标签四']]),
      inputVisible: false,
      inputValue: ''
    }
  },

  watch: {
    dynamicTags: {
      deep: true,
      immediate: true,
      handler (dynamicTags) {
        this.$localStorage.set('dynamic_tags', dynamicTags)
      }
    }
  },

  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    parseJSON (value) {
      try {
        return new Function('return ' + value)()
      } catch (e) {
        return value
      }
    },

    handleInputConfirm() {
      const { inputValue } = this
      if (inputValue) this.dynamicTags.push(this.parseJSON(inputValue))
      Object.assign(this, { inputVisible: false, inputValue: '' })
    }
  }
}
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
