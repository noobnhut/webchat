<template>
  <!-- <div>
        <div v-for="user in usersocket" :key="user.id">
            {{ user.username }} {{ user.online ? 'online' : 'offline' }}
        </div>
        <div><button @click="logout">Đăng xuất</button></div>
    </div> -->

  <!-- component -->
  <div class="flex h-screen antialiased text-gray-800">
    <div class="flex flex-row h-full w-full overflow-x-hidden">
      <div class="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
        <div class="flex flex-row items-center justify-center h-12 w-full">
          <div class="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z">
              </path>
            </svg>
          </div>
          <div class="ml-2 font-bold text-2xl">PRODUCT</div>
        </div>
        <div class="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg"
          v-for="user in usersocket.filter(items => items.id == this.user.id)" :key="user.id">
          <div class="h-20 w-20 rounded-full border overflow-hidden">
            <img
              src="https://www.vietnamfineart.com.vn/wp-content/uploads/2023/03/hinh-avatar-anime-nu-lanh-lung-vo-cam-8.jpg"
              alt="Avatar" class="h-full w-full" />
          </div>
          <div class="text-sm font-semibold mt-2"> {{ user.username }} </div>
          <div class="flex flex-row items-center mt-3">

            <div class="leading-none ml-1 text-xs">{{ user.online ? 'Hoạt động' : 'Không hoạt động' }}</div>
          </div>
        </div>

        <div class="flex flex-col mt-8">
          <div class="flex flex-row items-center justify-between text-xs">
            <span class="font-bold">Cuộc trò chuyện</span>

          </div>
          <!--trung tâm cuộc trò chuyện-->
          <div class="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto"
            v-for="user in usersocket.filter(items => items.id != this.user.id)" :key="user.id">

            <button class="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2" @click="openchat(user.id)">
              <div class="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                N
              </div>
              <div class="ml-2 text-sm font-semibold" >{{ user.username }}</div>
            </button>
            
          </div>
          <!--trung tâm cuộc trò chuyện-->

          <!--đăng xuất-->

          <div class="flex flex-row items-center justify-between text-xs mt-6">
            <span class="font-bold">Hành động</span>
          </div>

          <div class="flex flex-col space-y-1 mt-4 -mx-2">
            <button class="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
              <div class="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                O
              </div>
              <div class="ml-2 text-sm font-semibold" @click="logout">Đăng xuất</div>
            </button>
          </div>

          <!--đăng xuất-->

        </div>
      </div>
      <!--giao dien tro chuyen-->
      <div class="flex flex-col flex-auto h-full p-6">
        <chat :currentUserid="idcurrent" v-if="showchat"/>
      </div>
      <!--giao dien tro chuyen-->

    </div>
  </div>
</template>
  
<script>
import io from 'socket.io-client';
import chat from '../components/chat.vue'
export default {
  data() {
    return {
      users: [],
      user: '',
      usersocket: [],
      showchat:false,
      idcurrent:''
    };
  },
  components:{
    chat
  },
  async mounted() {
    const result = await this.$axios.get('user/get');
    this.users = result.data;
    this.user = JSON.parse(localStorage.getItem('user'));
    const socket = io('http://localhost:3000');
    const userId = this.user.id;
    socket.emit('userConnected', userId);
    socket.on('UpdateUserStatus', (data) => {
      this.updateUserStatus(data);
      console.log(this.usersocket)
    });
    socket.on('Updatedisconnect', (data) => {
      this.updateUserStatus(data);
    });
  },
  
  methods: {
    updateUserStatus(data) {
      this.usersocket = this.users.map((user) => {
        return {
          id: user.id,
          username: user.username,
          online: data[user.id]
        };
      });
    },
    logout() {
      const socket = io('http://localhost:3000');
      const userId = this.user.id;
      socket.emit('userDisconnect', userId);
      socket.on('Updatedisconnect', (data) => {
        this.updateUserStatus(data);
      });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.$router.push('/')
    },
    openchat(id)
    {
      this.idcurrent=id;
      this.showchat = !this.showchat
    }
  }
};
</script>