<template>
  <section class="event-edit">
    <el-form v-if="evento" el-form ref="form" :model="evento" label-width="120px">
      <div class="flex wrap space-around start">
        <el-form-item label="Event name" required>
          <el-input v-model="evento.title"></el-input>
        </el-form-item>
        <el-form-item label="Event start time">
          <el-date-picker
            v-if="evento.time"
            type="date"
            placeholder="Pick a date"
            v-model="evento.time.start"
            style="width: 100%;"
            value-format="timestamp"
          ></el-date-picker>
        </el-form-item>
      </div>
      <div class="flex wrap">
        <el-form-item label="Duration">
          <el-col :span="8">
            <el-input-number v-if="evento.time" v-model="evento.time.duration"></el-input-number>
          </el-col>
        </el-form-item>
        <el-form-item label="Price">
          <el-input-number v-model="evento.price"></el-input-number>
        </el-form-item>
        <el-form-item label="Members Limit">
          <el-input-number v-model="evento.membersLimit"></el-input-number>
        </el-form-item>
      </div>
      <div class="flex wrap space-around start">
        <el-form-item label="Categories">
          <event-category v-model="evento.categories"></event-category>
        </el-form-item>
        <el-form-item label="Address" required>
          <el-input placeholder v-model="evento.location.address_line_1" clearable ></el-input>
        </el-form-item>
      </div>
      <el-form-item label="Description">
        <el-input type="textarea" v-model="evento.desc"></el-input>
      </el-form-item>
      <el-form-item class="flex wrap">
        <div class="flex wrap space-between">
        <h3>Event Images: <input class="file-input" type="file" ref="images" multiple @change="uploadImg" /></h3>
        <h3>Event video: <input class="file-input" type="file" ref="videos" multiple @change="uploadVideo"/></h3>
        </div>
        <router-link v-if="this.$route.params.id" to="/event">
          <!-- <el-button type="primary" @click="editEventoo" to="/">editEvent</el-button> -->
          <el-button type="primary" @click="saveEvento" to="/">Edit Event</el-button>
        </router-link>
        <!-- <router-link v-else to="/event"> -->
          <!-- <el-button type="primary" @click="createEvento" to="/">Create</el-button> -->
          <el-button v-else type="primary" @click="saveEvento" to="/">Create</el-button>
        <!-- </router-link> -->
        <router-link class="cancel-btn" to="/event">
          <el-button>Cancel</el-button>
        </router-link>
      </el-form-item>
      <section class="imgs-to-add grid">
        <div class="relative" v-for="(img, index) in evento.imgs" :key="img">
          <img :src="img" />
          <button class="absolute" @click="removeImg(index)">X</button>
        </div>
      </section>
    </el-form>
  </section>
</template>
<script>
import { log } from "util";
import cloudinaryService from "../services/cloudinary.service";
import eventCategory from "../components/EventCategory";
import { gmapApi } from "vue2-google-maps";
export default {
  data() {
    return {
      evento: null
    };
  },
  methods: {
    // createEvento() {
    //   if (!this.evento.imgs.length)
    //     this.evento.imgs.push(
    //       "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
    //     );
    //   this.$geocoder.send(this.evento.location, response => {
    //     this.evento.location.coords = response.results[0].geometry.location;
    //     this.$store.dispatch({ type: "addEvento", evento: this.evento });
    //   });
    // },
    // editEventoo() {
    //   if (!this.evento.imgs.length)
    //     this.evento.imgs.push(
    //       "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
    //     );
    //   this.$geocoder.send(this.evento.location, response => {
    //     this.evento.location.coords = response.results[0].geometry.location;
    //     this.$store.dispatch({ type: "editEvento", evento: this.evento });
    //   });
    // },
    saveEvento() {
      if (!this.validateForm()){
       return this.$store.dispatch({type:"Alert", msg: "Please fill the required fields"})
      } 
      if (!this.evento.imgs.length) {
        this.evento.imgs.push(
          "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
        );
      }
      if (!this.evento.location.address_line_1) this.evento.location.address_line_1 = 'Jerusalem';
      this.$geocoder.send(this.evento.location, response => {
        this.evento.location.coords = response.results[0].geometry.location;

        if (!this.evento._id) this.$store.dispatch({ type: "addEvento", evento: this.evento });
        else this.$store.dispatch({ type: "editEvento", evento: this.evento });
        this.$router.push('/event');
      });
    },
    openLoading() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
    },
    closeLoading() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      loading.close();
    },
    uploadImg() {
      let imgCount = this.$refs.images.files.length;

      this.openLoading();
      cloudinaryService.uploadImg(event, imgCount).then(res => {
        console.log(res);

        this.evento.imgs.push(...res);
        this.closeLoading();
      });
    },
    uploadVideo() {
      let videoCount = this.$refs.videos.files.length;

      this.openLoading();
      cloudinaryService.uploadVideo(event, videoCount).then(res => {
        console.log(res);

        this.evento.videos.push(...res);
        console.log(this.evento);
        
        this.closeLoading();
      });
    },
    removeImg(idx) {
      this.evento.imgs.splice(idx, 1);
    },
    validateForm(){
      if (!this.evento.title || !this.evento.location.address_line_1) return false
      return true;
    }
  },
  computed: {
    google: gmapApi
  },
  async created() {
    var logedUser = this.$store.getters.logedInUser;
    if (!logedUser) {
      this.$router.push('/event');
      this.$store.dispatch({type: 'Alert', msg: 'Not logged in.'})
    }


    document.body.scrollIntoView();
    let eventoId = this.$route.params.id;
    if (!eventoId) eventoId = "";
    await this.$store.dispatch({ type: "getEvento", eventoId });
    this.evento = JSON.parse(JSON.stringify(this.$store.getters.currEvento));
  },
  components: {
    eventCategory
  }
};
</script>

<style scoped>
.cancel-btn {
  margin-left: 15px;
}
</style>