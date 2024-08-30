<template>
<Header />

<section class="h-100 h-custom bg-light">
    <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col d-flex justify-content-center align-items-center">

                <div class="card border-0 " style="min-width:350px; max-width:500px">
                    <div class="card-body">
                        <h3 class="mb-4">Update Restorent</h3>
                        <hr />
                        <div v-if="v$.$errors.length > 0" class="alert alert-danger" role="alert">
                            <ul>
                                <li v-for="error of v$.$errors" :key="error.$uid">
                                    <strong>{{ error.$validator }}</strong>
                                    <small> on property </small>
                                    <strong>{{ error.$property }}</strong>
                                    <small> says: </small>
                                    <strong>{{ error.$message }}</strong>
                                </li>
                            </ul>
                        </div>
                        <form @submit="update">
                            <!-- Input--------------------->
                            <div class="mb-3">
                                <label class="form-label"> Restorent Name</label>
                                <input type="text" class="form-control" v-model.trim="form.name" @input="setTouched('name')" :class="v$.form.name.$error?'is-invalid':''">
                                <div v-for="error of v$.form.name.$errors" class="invalid-feedback" :key="error.$uid">
                                    {{ error.$message }}
                                </div>
                            </div>
                            <!-- Input--------------------->
                            <div class="mb-3">
                                <label class="form-label">Address</label>
                                <input type="text" class="form-control" v-model.trim="form.address" @input="setTouched('address')" :class="v$.form.address.$error?'is-invalid':''">
                                <div v-for="error of v$.form.address.$errors" class="invalid-feedback" :key="error.$uid">
                                    {{ error.$message }}
                                </div>
                            </div>
                            <!-- Input--------------------->
                            <div class="mb-3">
                                <label class="form-label">contect</label>
                                <input type="contect" class="form-control" v-model.trim="form.contect" @input="setTouched('contect')" :class="v$.form.contect.$error?'is-invalid':''">
                                <div v-for="error of v$.form.contect.$errors" class="invalid-feedback" :key="error.$uid">
                                    {{ error.$message }}
                                </div>
                            </div>
                            <div class="mb-3 text-center">
                                <button class="btn btn-primary">Submit</button><br /><br />
                                <!-- <router-link to="/Add">Login</router-link> -->
                            </div>
                            <hr />

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script>
import Header from './Header.vue';
import axios from 'axios'
import useVuelidate from '@vuelidate/core'
import {
    required,
    email,
    sameAs,
    between,
    minValue,
    maxValue,
    alpha,
    numeric,
    helpers,
    minLength,
    maxLength
} from '@vuelidate/validators'
export default {
    name: 'Add',
    setup() {
        return {
            v$: useVuelidate()

        }
    },
    components: {
        Header
    },
    data() {
        return {
            form: {
                name: '',
                address: '',
                contect: '',
            },
        }
    },
    validations() {
        return {
            form: {
                name: {
                    required,
                    // alpha,
                    minLength: minLength(3),
                    maxLength: maxLength(15)
                },
                address: {
                    required,

                },
                contect: {
                    required,
                },
            },
        }
    },
    methods: {
        setTouched(theModel) {
            if (theModel == 'name' || theModel == 'all') {
                this.v$.form.name.$touch()
            }
            if (theModel == 'address' || theModel == 'all') {
                this.v$.form.address.$touch()
            }
            if (theModel == 'contect' || theModel == 'all') {
                this.v$.form.contect.$touch()
            }
        },
        async update(e) {
            e.preventDefault();

            this.setTouched('all');
            if(!this.v$.$invalid){

            let result = await axios.put(`http://localhost:3000/Restorent/${this.$route.params.id}`, {
                name: this.form.name,
                address: this.form.address,
                contect: this.form.contect
            });
            if (result.status == 200) 
            {
                this.$router.push({ name: 'Home' })
            }
        }

        }
    },
        async mounted() {
            try {
                let user = localStorage.getItem('user-info')
                if (!user) {
                    this.$router.push({name: 'SignUp'})
                }
                const result = await axios.get(`http://localhost:3000/Restorent/${this.$route.params.id}`);
                this.form = result.data
            } catch (error) {

                console.log(error);
            }

        }
    
}
</script>
