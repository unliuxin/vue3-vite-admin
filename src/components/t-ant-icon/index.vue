
<script lang="ts">
import { defineComponent, h } from 'vue';
import * as AntdIcons from '@ant-design/icons-vue';

export default defineComponent({
  props: {
    icon: {
      type: String,
      default: '',
      required: true
    }
  },
  setup(props) {
    return () => h((AntdIcons as any)[props.icon]);
  }
});
</script>
