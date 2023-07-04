<template>

    <div class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
        <!--noi dung cuoc tro chuyen-->
        <div class="flex flex-col h-full overflow-x-auto mb-4">
          <div class="flex flex-col h-full">
            <div class="grid grid-cols-12 gap-y-2" v-for="chat in chats">
            
              <!--nguoi gui-->
              <div  class="col-start-1 col-end-8 p-3 rounded-lg" v-if="chat.user_send !== user.id">
                <div class="flex flex-row items-center">
                  <div class="flex items-center justify-center px-2 py-2 bg-indigo-500 flex-shrink-0" v-for="user in users.filter(items=>items.id==currentUserid)">
                    {{ user.username }}
                  </div>
                  <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                    <div>{{ chat.message_content }}</div>
                    <div class="pl-4 flex items-center justify-center"><small class="text-gray-500 ">{{ formatTime(chat.createdAt) }}</small></div>
                  </div>
                </div>
              </div>
             
              <!--người nhận-->
              <div class="col-start-6 col-end-13 p-3 rounded-lg" v-else>
                <div class="flex items-center justify-start flex-row-reverse">
                  <div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                    <div>{{ chat.message_content}}</div>
                    <div class="pl-4 flex items-center justify-center"><small class="text-gray-500 ">{{ formatTime(chat.createdAt) }}</small></div>
                  </div>
                </div>     
              </div>
              </div>
            </div>
       
        </div>
        <!--noi dung cuoc tro chuyen-->

        <!--footer chat-->
        <div class="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">


          <!--input media-->
          <div>
            <button class="flex items-center justify-center text-gray-400 hover:text-gray-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13">
                </path>
              </svg>
            </button>
          </div>

          <!--input thêm tin nhắn-->
          <div class="flex-grow ml-4">
            <div class="relative w-full">
              <input type="text" v-model="message_content"
                class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10" />
            </div>
          </div>

          <!--button send tin nhắn-->
          <div class="ml-4">
            <button @click="sendmess()"
              class="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
              <span>Gửi</span>
              <span class="ml-2">
                <svg class="w-4 h-4 transform rotate-45 -mt-px" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
        <!--footer chat-->

    </div>

  </template>
    
  <script>
  import io from 'socket.io-client';
  import dayjs from 'dayjs';
  export default {
    props: ["currentUserid"],
    data() {
      return {
        users: [],
        user: '',
        usersocket: [],
        chats:[],
        message_content:''
      };
    },
    async mounted() {
        console.log(this.currentUserid)
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
      this.getchat()
      socket.on('chat', (chat) => {
                  console.log('Tin nhắn mới', chat);
                  this.chats.push(chat)
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
      formatTime(timeString) {
        return dayjs(timeString).format('HH:mm');
      },
      async getchat()
      {
        try {
          const result = await this.$axios.post('message/getbyid',
          {
            send:this.currentUserid,
            reply:this.user.id
          });
          this.chats=result.data;
          console.log(result.data)
        } catch (error) {
          console.log(error)
        }
      },
      async sendmess()
      {
        try {
          const result = await this.$axios.post('message/create',
          {
            send:this.user.id,
            reply:this.currentUserid,
            message_content:this.message_content
          });
          console.log(result.data)
          this.message_content = " "
        } catch (error) {
          console.log(error)
        }
      },
     
    }
  };
  </script>