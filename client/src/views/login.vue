<template>
  <section class="h-screen">
    <div class="h-full">
      <!-- Left column container with background-->
      <div class="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
        <div class="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
          <img src="https://img.freepik.com/premium-vector/social-media-marketing-mobile-phone-concept_23-2148424880.jpg"
            class="w-full" alt="Sample image" />
        </div>

        <!-- Right column container -->
        <div class="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 py-2 px-8">
          <!-- Separator between social media sign in and email/password sign in -->
          <div
            class="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p class="mx-4 mb-0 text-center font-semibold dark:text-white">
              Đăng nhập
            </p>
          </div>
          <div class="divide-y divide-gray-200">
            <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <div class="relative">
                <input autocomplete="off" id="email" name="email" type="text"
                  class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                  placeholder="Nhập địa chỉ email" v-model="email" />
                <label for="email"
                  class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Địa
                  chỉ email</label>
              </div>
              <div class="relative">
                <input autocomplete="off" id="password" name="password" type="password"
                  class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                  placeholder="Nhập mật khẩu" v-model="password" />
                <label for="password"
                  class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Mật
                  khẩu</label>
              </div>
            </div>
          </div>
          <!-- Login button -->
          <div class="text-center lg:text-left">

            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="login">
              Đăng nhập
            </button>

            <!-- Register link -->
            <p class="mb-0 mt-2 pt-1 text-sm font-semibold">
              Chưa có tài khoản
              <router-link
                class="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                to="/register">Đăng
                ký</router-link>
            </p>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>


<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
   
    async login() {
      try {
        const login = await this.$axios.post(`user/login`, {
          email: this.email,
          password: this.password,
        });

        if (login.status === 201) {
          console.log(login.data.message)
        }
        if (login.status === 200) {
          console.log('đăng nhập thành công')
          // Lưu thông tin người dùng vào localStorage hoặc sessionStorage
          localStorage.setItem('user', JSON.stringify(login.data));
          localStorage.setItem('token', login.data.token);
          // Chuyển hướng đến trang chính của ứng dụng
          setTimeout(() => {
            window.location.href = `http://localhost:5173/home`;
          }, 1000)

        }
      } catch (error) {
        // Xử lý lỗi nếu có
        console.log('đăng nhập thất bại')
      }
    }}
  }
</script>