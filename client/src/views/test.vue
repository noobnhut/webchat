<!-- <template>
    <div class="messages flex-1 overflow-auto">
        <!--nguoi chat-->
        <div class="message mb-4 flex">
        <div v-for="message in chats" :key="message.id" :class="{'me': message.sender_id === user.id, 'you': message.sender_id !== user.id}">
          <div class="message mb-4 flex" v-if="message.sender_id !== user.id">
            <div class="flex-2">
                <div class="w-8 h-8 relative">
                    <img class="w-8 h-8 rounded-full mx-auto" src="../assets/login.gif"
                        alt="chat-user" />
                </div>
              <div class="w-8 h-8 relative">
                <img class="w-8 h-8 rounded-full mx-auto" src="../assets/login.gif" alt="chat-user" />
              </div>
            </div>
            <div class="flex-1 px-2">
                <!--nội dung chat-->
                <div
                    class="inline-block bg-gradient-to-r from-indigo-100 via-purple-200 to-pink-100 rounded-full p-2 px-6 text-gray-700">
                    <span>Tôi hứa là mua nốt con qk80 t endgame</span>
                </div>
                <!--time-->
                <div class="pl-4"><small class="text-gray-500">10:32</small></div>
              <div class="inline-block bg-gradient-to-r from-indigo-100 via-purple-200 to-pink-100 rounded-full p-2 px-6 text-gray-700">
                <span>{{ message.messenger_content }}</span>
              </div>
              <div class="pl-4"><small class="text-gray-500">{{ formatTime(message.createdAt) }}</small></div>
            </div>
        </div>
        <!--mình chat-->
        <div class="message me mb-4 flex text-right">
          </div>
          <div class="message me mb-4 flex text-right" v-else>
            <div class="flex-1 px-2">
                <!--nội dung chat-->
                <div
                    class="inline-block bg-gradient-to-r from-indigo-100 via-purple-200 to-pink-200 rounded-full p-2 px-6 ">
                    <span>Chú chắc chưa</span>
                </div>
                <!--time-->
                <div class="pr-4"><small class="text-gray-500">10:33</small></div>
              <div class="inline-block bg-gradient-to-r from-indigo-100 via-purple-200 to-pink-200 rounded-full p-2 px-6 ">
                <span>{{ message.messenger_content }}</span>
              </div>
              <div class="pr-4"><small class="text-gray-500">{{ formatTime(message.createdAt) }}</small></div>
            </div>
          </div>
        </div>
      </div>
</template> -->