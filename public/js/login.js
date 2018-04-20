var login = new Vue({
    el: '#App',
    data: {
        user: {
            name: '',
            password: ''
        }
    },
    methods: {
        clearInput(){
            var self = this;
            self.user = {
                name: '',
                password: ''
            }
        },
        goreg(){
            location.href = location.href.split('/')[0] + "/reg";
        },
        goIndex(){
            location.href = location.origin;
        },
        login(){
            var self = this;
            var _obj = self.user;
            if(!_obj.name || !_obj.password){
                toastr.error('完善个人信息先亲~');
                return false;
            }
            ajaxReq('./login','POST',{name: _obj.name,password: _obj.password},function(re){
                if(re.isSuccess){
                    toastr.success(re.msg);
                    setTimeout(function(){self.goIndex()},300);
                }
                !re.isSuccess && toastr.error(re.msg);
                self.user = {
                    name: '',
                    password: ''
                };
            })
        }
    }
})