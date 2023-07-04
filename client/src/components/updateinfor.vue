<template>
    <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 overflow-auto ">
        <div class="absolute w-full h-full bg-gray-900 opacity-50"></div>

        <div class=" bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto h-full md:h-auto">
            <div class="flex flex-row py-3 px-4">
                <h5 class="text-lg font-semibold flex-grow">Cập nhập thông tin</h5>
                <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click="onclose"></i>
            </div>
            <div class="py-4 px-2">

                <!--bắt đầu username
          + v-model : username đại diện cho tên người dùng
          + @focus -> checkUsernameError cho phép bật tắt việc check lỗi input username
          + 2 if là check rỗng và độ dài username nhập vào input
          -->
                <div class="mt-1">
                    <input type="text" placeholder="Họ và tên"
                        class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none "
                        v-model="username" @focus="checkUsernameError" />
                </div>
                <p class="text-red-500 text-sm ml-1" v-if="!username && usernameFocused">Tên người dùng bị trống.</p>
                <p class="text-red-500 text-sm ml-1"
                    v-else-if="(username.length < 3 || username.length > 20) && usernameFocused">Tên người dùng phải từ 3
                    đến 20
                    ký tự.</p>

                <!--kết thúc username-->

                <!--bắt đầu phone
          + v-model : phone đại diện cho số điện thoại người dùng
          + @focus -> checkphoneError cho phép bật tắt việc check lỗi input phone
          + 2 if : 1 là check rỗng, 2 là check định dạng phone /^(0[1-9]|84[2-9])(\d{8})$/
          -->
                <div class="mt-5">
                    <input type="text" placeholder="Số điện thoại"
                        class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                        v-model="phone" @focus="checkphoneError()" />
                </div>
                <p class="text-red-500 text-sm ml-1" v-if="!phone && phoneFocused">Số điện thoại bị trống.</p>
                <p class="text-red-500 text-sm ml-1" v-else-if="!validPhone(phone) && phoneFocused">Số điện thoại sai định
                    dạng.
                </p>

                <!--kết thúc phone-->

                <div class="mt-5">
                    <input type="text" placeholder="Email" disabled
                        class=" px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none w-full"
                        v-model="email">
                </div>

                <!-- địa chỉ cụ thể:
          + @focus -> checkaddressError() bật tắt chế độ kiểm tra
          + v-model : address đại diện địa chỉ cụ thể
          + 1 if kiểm tra rỗng 
          -->
                <div class="mt-5">
                    <input type="text" placeholder="Địa chỉ cụ thể:"
                        class="px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none w-full"
                        v-model="address" @focus="checkaddressError()" />
                </div>
                <p class="text-red-500 text-sm ml-1" v-if="!address && addressFocusted">Địa chỉ cụ thể bị trống.</p>

                <!--kết thúc địa chỉ-->
            </div>

            <div class="modal-footer py-3 px-4 ">
                <button
                    class="py-2 px-4 bg-blue-100 text-white rounded-lg cursor-pointer mr-4"
                    @click="updateInfo">Cập
                    nhập</button>
                <button
                    class="  py-2 px-4 bg-blue-100 text-white rounded-lg cursor-pointer"
                    @click="onclose()">Đóng</button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            user: '',
             username: '', address: '',phone: '', email: '', 
            /* các biển kiểm tra bật tắt focus để validate form*/
            usernameFocused: false,
            addressFocusted: false, phoneFocused: false,
        };
    },
    mounted() {

        this.user = JSON.parse(localStorage.getItem('user'));
        this.email = this.user.email;
        this.phone = this.user.phone;
        this.username = this.user.username;
        this.address = this.user.address;
    },
    methods: {
        onclose() {
            this.$emit('cancel')
        },
        // xử lý các focus bật tắt validate
        checkUsernameError() { this.usernameFocused = true; },
        checkphoneError() { this.phoneFocused = true; },
        checkaddressError() { this.addressFocusted = true },
        validPhone(phone) {
            const re = /^(0[1-9]|84[2-9])(\d{8})$/;
            return re.test(phone);
        },


        async updateInfo() {
            const id =this.user.id
        }
    },
}

</script>
