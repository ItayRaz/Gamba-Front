<template>
  <section class="evento-preview" @click="goToDetails">
    <div class="prev-header">
      <transition name="fade">  
      <img v-if="evento.imgs.length > 0 && showImg" :src="evento.imgs[currImg]" alt="">
      <!-- <img v-else src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt=""> -->
      </transition>
      <EventGallery class="gallery-dots" @setMainImg="setImg" :imgs="evento.imgs"></EventGallery>
      <img v-if="seatsLeft === 0" class="full-img" src="@/assets/full.png">
    </div>
    <div class="prev-details flex space-between">
      <div v-if="evento.membersLimit && seatsLeft === 1" class="seats-left few-left">{{seatsLeft}} Seat Left!</div>
      <div v-else-if="evento.membersLimit && seatsLeft < 10 && seatsLeft> 0" class="seats-left few-left">{{seatsLeft}} Seats Left!</div>
      <div class="info flex column space-between">
        <h3><short-text :txt="evento.title" :txtLimit="19"/></h3>
        <h4>{{evento.time.start | moment("DD.MM.YY")}}</h4>
        <h4><short-text :txt="evento.location.address_line_1" :txtLimit="18"/></h4>
        <h4>Price: {{evento.price}}$</h4>
        <router-link :to="'/event/'+evento._id">Read More</router-link>
        <div class="member-count">{{evento.members.length}} / {{evento.membersLimit}} <i class="fa fa-user"></i></div>
      </div>
    <div class="prev-avatars">
      <div>
        <ul>
          <li v-for="member in members" :key="member._id" >
            <!-- <span v-if="member.img" :style="{ backgroundImage: `url(${member.img})`}"></span>
            <span v-else style="background-image: url(~@/assets/user_default.png)"></span> -->
            <img v-if="member.img" :src="member.img"/>
            <img v-else src="~@/assets/user_default.png"/>
          </li>
        </ul>
      </div>
    </div>
    </div>
    <!-- <short-text :txt="evento.desc" :limit="75">
    <div class="preview-btns flex space-around">
    <button @click="removeEvent(evento._id)">X</button>
    <router-link :to="'/event/'+evento._id"><button>Details</button></router-link>
    <router-link :to="'/edit/'+evento._id"><button>Edit</button></router-link>
    </div>-->
  </section>
</template>

<script>
import shortText from "./ShortTxt.vue";
import EventGallery from  './EventGallery.vue'

export default {
  props: ["evento"],
  data(){
    return{
      currImg: 0,
      showImg:true
    }
  },
  methods: {
    removeEvent(eventoId) {
      this.$store.dispatch({ type: "removeEvento", eventoId });
    },
    setImg(idx){
      this.currImg = idx;
    },
    goToDetails(){      
      this.$router.push(`/event/${this.evento._id}`)
    }
  },
  computed: {
    seatsLeft() {
      return this.evento.membersLimit - this.evento.members.length
    },
    members() {
      let memberCount = 0;
      let members = [];
      this.evento.members.map(member => {
        if (memberCount === 4) return;
        memberCount++
        members.push({_id: member._id, img: member.img});
      })
      return members;
    },
    url(){
      return "jfjf"
    }
    
  },
  components: {
    shortText,
    EventGallery
  },
   watch: {
    currImg(){
      this.showImg=!this.showImg
      setTimeout(() => {
        this.showImg=!this.showImg
      }, 300);
    }
  },
  created() {
    this.$store.dispatch({type:'loadEventos'});
  }
};
</script>