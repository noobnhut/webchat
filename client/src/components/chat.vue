<template>

    <div class="flex flex-col flex-auto flex-shrink-0 rounded-2xl  h-full p-4">
      <div class="chat-header px-6 py-4 flex flex-row flex-none justify-between items-center shadow" v-for="user in usersocket.filter(item=>item.id == this.currentUserid)">
        <div class="flex">
            <div class="w-12 h-12 mr-4 relative flex flex-shrink-0">
                <img class="shadow-md rounded-full w-full h-full object-cover"
                     :src="user.avatar"
                     alt=""
                />
            </div>
            <div class="text-sm">
                <p class="font-bold">{{user.username}}</p>
                <p>  {{ user.online ? "Hoạt động" : "Không hoạt động" }}</p>
            </div>
        </div>

        <div class="flex">
            <a href="#" class="block rounded-full w-10 h-10 p-2">
                <svg viewBox="0 0 20 20" class="w-full h-full fill-current text-blue-300">
                    <path d="M11.1735916,16.8264084 C7.57463481,15.3079672 4.69203285,12.4253652 3.17359164,8.82640836 L5.29408795,6.70591205 C5.68612671,6.31387329 6,5.55641359 6,5.00922203 L6,0.990777969 C6,0.45097518 5.55237094,3.33066907e-16 5.00019251,3.33066907e-16 L1.65110039,3.33066907e-16 L1.00214643,8.96910337e-16 C0.448676237,1.13735153e-15 -1.05725384e-09,0.445916468 -7.33736e-10,1.00108627 C-7.33736e-10,1.00108627 -3.44283713e-14,1.97634814 -3.44283713e-14,3 C-3.44283713e-14,12.3888407 7.61115925,20 17,20 C18.0236519,20 18.9989137,20 18.9989137,20 C19.5517984,20 20,19.5565264 20,18.9978536 L20,18.3488996 L20,14.9998075 C20,14.4476291 19.5490248,14 19.009222,14 L14.990778,14 C14.4435864,14 13.6861267,14.3138733 13.2940879,14.7059121 L11.1735916,16.8264084 Z"/>
                </svg>
            </a>
            <a href="#" class="block rounded-full w-10 h-10 p-2 ml-4">
                <svg viewBox="0 0 20 20" class="w-full h-full fill-current text-blue-300">
                    <path d="M0,3.99406028 C0,2.8927712 0.894513756,2 1.99406028,2 L14.0059397,2 C15.1072288,2 16,2.89451376 16,3.99406028 L16,16.0059397 C16,17.1072288 15.1054862,18 14.0059397,18 L1.99406028,18 C0.892771196,18 0,17.1054862 0,16.0059397 L0,3.99406028 Z M8,14 C10.209139,14 12,12.209139 12,10 C12,7.790861 10.209139,6 8,6 C5.790861,6 4,7.790861 4,10 C4,12.209139 5.790861,14 8,14 Z M8,12 C9.1045695,12 10,11.1045695 10,10 C10,8.8954305 9.1045695,8 8,8 C6.8954305,8 6,8.8954305 6,10 C6,11.1045695 6.8954305,12 8,12 Z M16,7 L20,3 L20,17 L16,13 L16,7 Z"/>
                </svg>
            </a>
            <a href="#" class="block rounded-full w-10 h-10 p-2 ml-4">
                <svg viewBox="0 0 20 20" class="w-full h-full fill-current text-blue-300">
                    <path d="M2.92893219,17.0710678 C6.83417511,20.9763107 13.1658249,20.9763107 17.0710678,17.0710678 C20.9763107,13.1658249 20.9763107,6.83417511 17.0710678,2.92893219 C13.1658249,-0.976310729 6.83417511,-0.976310729 2.92893219,2.92893219 C-0.976310729,6.83417511 -0.976310729,13.1658249 2.92893219,17.0710678 Z M9,11 L9,10.5 L9,9 L11,9 L11,15 L9,15 L9,11 Z M9,5 L11,5 L11,7 L9,7 L9,5 Z"/>
                </svg>

            </a>
        </div>
    </div>
        <!--noi dung cuoc tro chuyen-->
        <div class="flex flex-col h-full overflow-x-auto mb-4">
          <div class="flex flex-col h-full">
            <div class="grid grid-cols-12 gap-y-2" v-for="chat in chats.filter(item=>item.deleted !== user.id)">
            
              <!--nguoi gui-->
              <div  class="col-start-1 col-end-8 p-3 rounded-lg" v-if="chat.user_send !== user.id">
                <div class="flex flex-row items-center">
                  <div class="flex items-center justify-center" v-for="user in users.filter(items=>items.id==currentUserid)">
                   <img :src=user.avatar alt="" class="h-10 w-10 rounded-full">
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
            online: data[user.id],
            avatar: user.avatar,
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