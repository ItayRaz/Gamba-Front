<template>
    <section class="flex align-center column-evento-preview" v-if="evento">
        <router-link v-if="evento.imgs" class="evento-img" :to="'/event/'+evento._id"><img  :src="evento.imgs[0]" alt=""></router-link>
        <div class="flex column info">
            <div class="flex align-center creator">
                <p>Event by: </p>
                <router-link v-if="evento.creator" :to="'/user/'+evento.creator._id">{{evento.creator.name}}</router-link>
            </div>
            <router-link :to="'/event/'+evento._id"><short-txt :txt="evento.title" :txtLimit="20"/></router-link>
        </div>
        <div class="members-avatar-container flex" v-if="evento.members && evento.members.length">
            <router-link :to="'/user/'+evento.members[0]._id"><avatar class="avatar" :username="evento.members[0].username" :src="evento.members[0].img" :size="30" rounded/></router-link>
            <!-- <div v-for="idx in evento.members.slice(0,1).length">
                <router-link :to="'/user/'+evento.members[idx-1]._id"><avatar class="avatar" :username="evento.members[idx-1].name" :src="evento.members[idx-1].img" :size="30" rounded/></router-link>
            </div> -->
        </div>
    </section>
</template>

<script>
import Avatar from "vue-avatar";
import shortTxt from './ShortTxt.vue';

export default {
    props: ['evento'],
    components: {
        Avatar,
        shortTxt
    }
}
</script>