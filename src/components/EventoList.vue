<template>
  <section class="evento-list">
    <router-view v-if="isHome"></router-view>
    <div v-for="evento in eventos" :key="evento._id">
      <evento-preview :evento="evento"></evento-preview>
    </div>
  </section>
</template>

<script>
import eventoPreview from "../components/EventoPreview";

export default {
  props: ["eventos","isHome"],
  components: {
    eventoPreview
  }
};
</script>