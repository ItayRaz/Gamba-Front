<template>
    
    <div id="calender" v-if="user">
      <h1 style="color: white">Your Events</h1>
      <h3 style="color: white">{{Date.now() | moment('MMMM')}}</h3>
      <calendar-view
        :events="userEventos"
        :show-date="showDate"
        class="theme-default holiday-us-traditional "
        @click-event="showEvento"
        style="width: 100%; height: 400px; backgroundColor: #ffff; border-radius: 10px; cursor:pointer;"
      ></calendar-view>
    </div>
</template>
<script>
import { CalendarView, CalendarViewHeader } from "vue-simple-calendar";
// The next two lines are processed by webpack. If you're using the component without webpack compilation,
// you should just create <link> elements for these. Both are optional, you can create your own theme if you prefer.
require("vue-simple-calendar/static/css/default.css");
require("vue-simple-calendar/static/css/holidays-us.css");

export default {
  name: "app",
  props: ['eventos'],
  data() {
    return {
      showDate: new Date(),
      user: {},
      // userEventos: []
    };
  },
  computed: {
    userEventos() {
      return this.eventos.map(evento => {
        return {
          id: evento._id,
          startDate: evento.time.start,
          title: evento.title
        };
    });
  }
  },
  components: {
    CalendarView
  },
  methods: {
    setShowDate(d) {
      this.showDate = d;
    },
    showEvento(calendarItem, windowEvent) {
      this.$router.push(`/event/${calendarItem.id}`);
    },
    formatDate(time) {
      var date = new Date(time).toGMTString();
      return date;
    },
    closeCalender() {
      this.$router.push(`/user/${this.user._id}`);
    }
  },
  async created() {
  //   this.user = await this.$store.dispatch("getLogedUser");
  //   if (!this.user) {
  //     this.userEventos = await this.$store.dispatch({
  //     type: "loadEventos",
  //     isSetEvents: false});      
  //   }
  //   else{
  //     this.userEventos = await this.$store.dispatch({
  //       type: "loadEventos",
  //       filterBy: { memberId: this.user._id },
  //       isSetEvents: false
  //     });
  //   }

    // this.userEventos = this.eventos.map(evento => {
    //   return {
    //     id: evento._id,
    //     startDate: evento.time.start,
    //     title: evento.title
    //   };
    // });
  }
};
</script>
