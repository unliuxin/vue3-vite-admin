import { defineComponent, computed } from 'vue';
import { Modal } from 'ant-design-vue';

export default defineComponent({
  name: 'modal',
  props: {
    title: {
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      default: false
    },
    okText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    maskClosable: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '60%'
    },
    destroyOnClose: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:visible'],
  setup(props, { emit, slots }) {
    const visible = computed({
      get: () => props.visible,
      set: (val) => {
        emit('update:visible', val);
      }
    });

    return () => <Modal v-model={[visible.value, 'visible']} {...props} v-slots={slots} zIndex={1001} />;
  }
});
