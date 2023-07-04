<template>
  <div
    class="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5"
    v-for="user in usersocket.filter((item) => item.id === this.user.id)"
  >
    <img
      class="w-32 h-32 rounded-full mx-auto"
      :src="user.avatar"
      alt="Profile picture"
    />
    <h2 class="text-center text-2xl font-semibold mt-3">{{ user.username }}</h2>
    <p class="text-center text-gray-600 mt-1">
      {{ user.online ? "Hoạt động" : "Không hoạt động" }}
    </p>
    <div class="flex justify-center mt-5">
      <button
        class="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-sm shadow mr-2"
      >
        <div
          class="absolute inset-0 w-3 bg-blue-100 transition-all duration-[250ms] ease-out group-hover:w-full"
        ></div>
        <span class="relative text-black group-hover:text-white"
          >Cập nhập ảnh</span
        >
      </button>

      <button
        class="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-sm shadow mr-2"
      >
        <div
          class="absolute inset-0 w-3 bg-blue-100 transition-all duration-[250ms] ease-out group-hover:w-full"
        ></div>
        <span class="relative text-black group-hover:text-white"
          >Cập nhập mật khẩu</span
        >
      </button>

      <button
        class="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-sm shadow"
      >
        <div
          class="absolute inset-0 w-3 bg-blue-100 transition-all duration-[250ms] ease-out group-hover:w-full"
        ></div>
        <span class="relative text-black group-hover:text-white"
          >Cập nhập thông tin</span
        >
      </button>
    </div>
    <div class="mt-5">
      <h3 class="text-xl ">Thông tin cá nhân</h3>
      <p class="text-gray-600 mt-2"><span class="font-bold"> Địa chỉ:</span> {{ user.address }}</p>
      <p class="text-gray-600 mt-2"><span class="font-bold">Số điện thoại:</span> {{ user.phone }}</p>
      <p class="text-gray-600 mt-2"><span class="font-bold">Địa chỉ email: </span>{{ user.email }}</p>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  data() {
    return {
      users: [],
      user: "",
      usersocket: [],
      socket: "",
    };
  },
  components: {},
  async mounted() {
    const result = await this.$axios.get("user/get");
    this.users = result.data;
    this.user = JSON.parse(localStorage.getItem("user"));
    const userId = this.user.id;
    const socket = io("http://localhost:3000");
    socket.emit("userConnected", userId);
    socket.on("UpdateUserStatus", (data) => {
      this.updateUserStatus(data);
      console.log(this.usersocket);
    });
    socket.on("Updatedisconnect", (data) => {
      this.updateUserStatus(data);
    });
  },

  methods: {
    updateUserStatus(data) {
      this.usersocket = this.users.map((user) => {
        return {
          id: user.id,
          username: user.username,
          avatar: user.avatar,
          address: user.address,
          phone: user.phone,
          email: user.email,
          online: data[user.id],
        };
      });
    },
  },
};
</script>
