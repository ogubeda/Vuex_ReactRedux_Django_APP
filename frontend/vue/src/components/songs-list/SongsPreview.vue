<template>
<div>
  <h2>{{ song.title }}</h2>
  </div>
</template>

<script lang = "ts">

import { defineComponent } from 'vue';

export default defineComponent({
    name: "SongsPreview",
    props: {
      song: { type: Object, required: true }
    }
});
</script>