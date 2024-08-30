<template>
    <section class="h-100 h-custom bg-light" >
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col d-flex justify-content-center align-items-center">
                        
                    <div class="card border-0 " style="min-width:350px; max-width:500px">
                        <div class="card-body">
                            <h3 class="mb-4">Sign up</h3>
                            <hr/>
                            <div v-if="v$.$errors.length > 0" class="alert alert-danger" role="alert">
                                <ul>
                                    <li
                                        v-for="error of v$.$errors"
                                        :key="error.$uid"
                                        >
                                        <strong>{{ error.$validator }}</strong>
                                        <small> on property </small>
                                        <strong>{{ error.$property }}</strong>
                                        <small> says: </small>
                                        <strong>{{ error.$message }}</strong>
                                    </li>
                                </ul>
                            </div>
                            <form @submit="getdata">
                                <!-- Input--------------------->
                                <div class="mb-3">
                                    <label class="form-label"> Name</label>
                                    <input type="text" class="form-control"
                                        v-model.trim="form.name"
                                        @input="setTouched('name')"
                                        :class="v$.form.name.$error?'is-invalid':''"
                                    >
                                    <div v-for="error of v$.form.name.$errors" class="invalid-feedback"  :key="error.$uid"> 
                                        {{ error.$message }}
                                    </div>
                                </div>
                                <!-- Input--------------------->
                                <div class="mb-3">
                                    <label class="form-label">Email</label>
                                    <input type="email" class="form-control"
                                        v-model.trim="form.email"
                                        @input="setTouched('email')"
                                        :class="v$.form.email.$error?'is-invalid':''"
                                    >
                                    <div v-for="error of v$.form.email.$errors" class="invalid-feedback"  :key="error.$uid"> 
                                        {{ error.$message }}
                                    </div>
                                </div>
                                <!-- Input--------------------->
                                <div class="mb-3">
                                    <label class="form-label">Password</label>
                                    <input type="password" class="form-control"
                                        v-model.trim="form.password"
                                        @input="setTouched('password')"
                                        :class="v$.form.password.$error?'is-invalid':''"
                                    >
                                    <div v-for="error of v$.form.password.$errors" class="invalid-feedback"  :key="error.$uid"> 
                                        {{ error.$message }}
                                    </div>
                                </div>
                                <div class="mb-3 text-center">
                                    <button class="btn btn-primary">Submit</button><br/><br/>
                                    <router-link to="/Login">Login</router-link>
                                </div>
                                <hr/>
    
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </template>
  
  

  <script>
  import axios from 'axios'
  import useVuelidate from '@vuelidate/core'
  import { required, email, sameAs, between, minValue, maxValue, alpha, numeric, helpers,minLength ,maxLength } from '@vuelidate/validators'

  
  export default {
    name: 'Registration',
    setup() {
      return { v$: useVuelidate() }
    },
    data() {
      return {
        form: {
          name: '',
          email: '',
          password: '',
        },
      }
    },
    validations() {
          return {
            form: {
              name: {
                  required,
                  alpha,
                  minLength: minLength(3),
                  maxLength: maxLength(15)
              },
              email: {
                  required,
                  email
              },
              password: {
                  required,
              },
            },
          }
    },
    methods: {
      setTouched(theModel) {
          if(theModel == 'name' || theModel == 'all'){this.v$.form.name.$touch()} 
          if(theModel == 'email' || theModel == 'all' ){this.v$.form.email.$touch()}
          if(theModel == 'password' || theModel == 'all'){this.v$.form.password.$touch()}
      },

      async getdata(e){
        e.preventDefault();
        
        this.setTouched('all');
        if (!this.v$.$invalid) {
          
          let result = await axios.post("http://localhost:3000/user",{
            
            name:this.form.name,
            email:this.form.email,
            password:this.form.password
          });
          console.log(result);
          

          if(result.status==201){
            localStorage.setItem("user-info",JSON.stringify(result.data))
            this.$router.push({name:'Home'})
          }
        }
      },
    },

    mounted(){
      let user=localStorage.getItem('user-info')
      if(user){
        this.$router.push({name:'Home'})
      }  
    },

  }
  </script>
