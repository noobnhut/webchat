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
          <div class="ml-2 font-bold text-2xl">PRODUCT CHAT</div>
        </div>
        <div
          class="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg"
          v-for="user in usersocket.filter((items) => items.id == this.user.id)"
          :key="user.id"
        >
          <div class="h-20 w-20 rounded-full border overflow-hidden">
            <img :src="user.avatar" alt="Avatar" class="h-full w-full" />
          </div>
          <div class="text-sm font-semibold mt-2">{{ user.username }}</div>
          <div class="flex flex-row items-center mt-3">
            <div class="leading-none ml-1 text-xs">
              {{ user.online ? "Hoạt động" : "Không hoạt động" }}
            </div>
          </div>
        </div>

        <div class="flex flex-col mt-8">
          <div class="flex flex-row items-center justify-between text-xs">
            <span class="font-bold">Cuộc trò chuyện</span>
          </div>
          <!--trung tâm cuộc trò chuyện-->
          <div
            class="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto"
            v-for="user in usersocket.filter(
              (items) => items.id != this.user.id
            )"
            :key="user.id"
          >
            <button
              class="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
              @click="openchat(user.id)"
              
             
            >
              <div
                class="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full"
              >
                <img
                  :src="user.avatar"
                  alt="Avatar"
                  class="h-full w-full rounded-full"
                />
              </div>
              <div class="ml-2 text-sm font-semibold">{{ user.username }}</div>
              <button class=" text-sm font-semibold text-rose-600 ml-auto  " @click="opendelete(user.id)">X</button>
            

            </button>
          </div>
          <!--trung tâm cuộc trò chuyện-->

          <!--đăng xuất-->

          <div class="flex flex-row items-center justify-between text-xs mt-6">
            <span class="font-bold">Hành động</span>
          </div>

          <div class="flex flex-col space-y-1 mt-4 -mx-2">
            <button
              class="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
            >
              <div
                class="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full"
              >
                O
              </div>
              <div class="ml-2 text-sm font-semibold" @click="logout">
                Đăng xuất
              </div>
            </button>
          </div>

          <!--đăng xuất-->
        </div>
      </div>
      <!--giao dien tro chuyen-->
      <div class="flex flex-col flex-auto h-full p-6 ">
        <userprofile v-if="!showchat" />
        <chat :currentUserid="idcurrent" v-if="showchat" />
      </div>
      <!--giao dien tro chuyen-->
    </div>
  </div>
  <!--modal xóa-->
  <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 " v-if="showDeleteHistory">
        <div class="absolute w-full h-full bg-gray-900 opacity-50" @click="onclosedelete"></div>

        <div class=" bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto " >
            <div class="flex flex-row py-3 px-4">
                <h5 class="text-lg font-semibold flex-grow">Xóa danh mục</h5>
                <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click="onclosedelete"></i>
            </div>    
            <div class="px-4">
                <div>
                    <label  class="block mb-2 text-sm font-medium text-gray-900 ">Bạn có muốn xóa danh mục: <span class="font-bold ">cuộc trò chuyện</span> </label>
                    
                </div>
            </div>
            <div class="py-3 px-4">
                <button
                    class="  py-2 px-4 bg-blue-100 text-white rounded-lg cursor-pointer mr-4" @click="deleteChat()">Xóa</button>
                <button
                    class="  py-2 px-4 bg-blue-100 text-white rounded-lg cursor-pointer"
                    @click="onclosedelete()">Đóng</button>
            </div>
        </div>
    </div>
   
</template>

<script>
import io from "socket.io-client";
import chat from "../components/chat.vue";
import userprofile from "../components/userprofile.vue";

export default {
  data() {
    return {
      users: [],
      user: "",
      usersocket: [],
      showchat: false,
      idcurrent: "",
      showDeleteHistory: false,
    
    };
  },
  components: {
    chat,
    userprofile,


  },
  async mounted() {
    const result = await this.$axios.get("user/get");
    this.users = result.data;
    this.user = JSON.parse(localStorage.getItem("user"));
    const socket = io("http://localhost:3000");
    const userId = this.user.id;
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
          online: data[user.id],
        };
      });
    },
    logout() {
      const socket = io("http://localhost:3000");
      const userId = this.user.id;
      socket.emit("userDisconnect", userId);
      socket.on("Updatedisconnect", (data) => {
        this.updateUserStatus(data);
      });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.$router.push("/");
    },
    openchat(id) {
      this.idcurrent = id;
      this.showchat = !this.showchat;
    },
    opendelete(id) {
      this.idcurrent = id;
      this.showDeleteHistory = true
    },
    onclosedelete()
    {
      this.showDeleteHistory=false
    },
    async getchat()
      {
        try {
          const result = await this.$axios.post('message/getbyid',
          {
            send:this.idcurrent,
            reply:this.user.id
          });
          this.chats=result.data;
 
        } catch (error) {
          console.log(error)
        }
      },
    async deleteChat()
    {
      try {
       const delete2= await this.$axios.post(`message/delete`,
        {
          send:this.user.id,
          receive:this.idcurrent
        })
        console.log(delete2.data)
        this.showDeleteHistory = false
        this.getchat();
      } catch (error) {
        console.log(error)
      }
    },
    
  },
};
</script>
