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
              <div class="relative">
                <input autocomplete="off" id="username" name="username" type="text"
                  class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                  placeholder="Nhập họ và tên" v-model="username" />
                <label for="username"
                  class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Họ
                  và tên </label>
              </div>
              <div class="relative">
                <input autocomplete="off" id="phone" name="phone" type="text"
                  class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                  placeholder="Nhập số điện thoại" v-model="phone" />
                <label for="phone"
                  class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Số
                  điện thoại</label>
              </div>
              <div class="relative">
                <input autocomplete="off" id="address" name="address" type="text"
                  class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                  placeholder="Nhập địa chỉ" v-model="address" />
                <label for="address"
                  class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Địa
                  chỉ</label>
              </div>
              <!--bắt đầu img-->
              <div class="flex items-center justify-center w-full mt-2">
                <label for="dropzone-file"
                  class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span class="font-semibold">Nhấn để tải ảnh</span>
                    </p>
                    <!-- <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p> -->
                  </div>
                  <input id="dropzone-file" type="file" class="hidden" @change="onFileSelected"
                    accept=".png, .jpeg, .gif, .jpg" />
                </label>

              </div>
            </div>
          </div>
          <!-- Login button -->
          <div class="text-center lg:text-left">

            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="register()">
              Đăng ký
            </button>

            <!-- Register link -->
            <p class="mb-0 mt-2 pt-1 text-sm font-semibold">
              Đã có tài khoản
              <router-link
                class="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                to="/">Đăng nhập</router-link>
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
      password: '',
      phone: '',
      address: '',
      username: '',
      avatar: ''
    }
  },
  methods: {
    onFileSelected(event) { this.avatar = event.target.files[0]; },
    async register() {
      try {

        const formData = new FormData();
        formData.append("username", this.username);
        formData.append("password", this.password);
        formData.append("email", this.email);
        formData.append("address", this.address);
        formData.append("phone", this.phone);
        formData.append("avatar", this.avatar);
        const login = await this.$axios.post(`user/register`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(login.data.message)

        if (login.status === 200) {

          setTimeout(() => {
            window.location.href = `http://localhost:5173/`;
          }, 1000)
        }
      } catch (error) {
        // Xử lý lỗi nếu có
        console.log('đăng nhập thất bại')
      }
    }
  }
}
</script>