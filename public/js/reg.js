var index = new Vue({
    el: '#App',
    data: {
        user: {
            name: '',
            password: '',
            passwordconfirm: ''
        }
    },
    methods: {
        clearInput(){
            var self = this;
            self.user = {
                name: '',
                password: '',
                passwordconfirm: ''
            }
        },
        gologin(){
            location.href = location.origin + "/login";
        },
        goIndex(){
            location.href = location.origin;
        },
        reg(){
            var self = this;
            var _obj = self.user;
            if(!_obj.name || !_obj.password || !_obj.passwordconfirm){
                toastr.error('完善个人信息先亲~');
                return false;
            }
            ajaxReq('./reg','POST',{name: _obj.name,password: _obj.password,passwordconf: _obj.passwordconfirm},function(re){
                if(re.isSuccess){
                    toastr.success(re.msg);
                    setTimeout(function(){self.goIndex()},500);
                }
                !re.isSuccess && toastr.error(re.msg);
                self.user = {
                    name: '',
                    password: '',
                    passwordconfirm: ''
                };
            })
        }
    }
})