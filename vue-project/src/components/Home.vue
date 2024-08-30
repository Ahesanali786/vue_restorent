<template>
<Header />
<!-- <Add /> -->
<div class="container">

    <h1>Hello {{ name }}</h1>
</div>
<table class="table">
    <thead>
        <tr>
            <th scope="col">id</th>
            <th scope="col">NAME</th>
            <th scope="col">Address</th>
            <th scope="col">contect</th>
            <th scope="col">action</th>
        </tr>
        <tr v-for="item in rest" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.contect }}</td>
            <td>
                <router-link :to="'/Update/' + item.id"><i class="bi bi-pencil-square"></i></router-link>
                <i @click="deletresto(item.id)" class="bi bi-trash-fill"></i>
            </td>

        </tr>

    </thead>
</table>
</template>

<script>
import Header from './Header.vue'
// import Add from './Add.vue'
import axios from 'axios';
// import router from '@/routes';
// import { RouterLink } from 'vue-router';

export default {
    components: {
        Header
    },
    data() {
        return {
            name: '',
            rest: []
        }
    },
    methods: {
        async deletresto(id) {

            let result = await axios.delete("http://localhost:3000/Restorent/" + id)
            if (result.status == 200) {
                this.load()
            }

        },

        async load() {
        let user = localStorage.getItem('user-info')
        
        if (!user) {
            this.$router.push({
                name: 'SignUp'
            })
        } else {
            this.name = JSON.parse(user).name;
            let result = await axios.get("http://localhost:3000/Restorent")
            this.rest = result.data;
    }
}
    },
    mounted() {
        this.load()
    }
}
</script>
