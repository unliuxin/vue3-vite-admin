import { defineComponent, computed } from 'vue';
import { Drawer } from 'ant-design-vue';
import './style.less';

export default defineComponent({
  name: 't-drawer',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: [String, Number],
      default: '80%'
    }
  },
  emits: ['update:visible'],
  setup(props, { slots, emit }) {
    const visible = computed({
      get: () => props.visible,
      set: (val) => {
        emit('update:visible', val);
      }
    });

    return () => <Drawer v-model={[visible.value, 'visible']} {...props} v-slots={slots} class="t-drawer"></Drawer>;
  }
});
