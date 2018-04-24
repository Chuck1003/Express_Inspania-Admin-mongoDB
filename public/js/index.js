var index = new Vue({
    el: '#App',
    data: {
        newBook: {
            name: '',
            type: -1,
            place: ''
        },
        bookList: [],
        total: 0,
        pageIndex: 1,
        pageSize: 10
    },
    created: function(){
        this.getBookList(1,10);
    },
    methods: {
        clearInput(){
            var self = this;
            self.newBook = {
                name: '',
                type: -1,
                place: ''
            }
        },
        addBook(){
            var self = this;
            if(!self.newBook.name || !self.newBook.type || !self.newBook.place){
                toastr.error('完善图书信息先亲~');
                return false;
            }
            ajaxReq('./addBook','POST',{name: self.newBook.name,type: self.newBook.type,place: self.newBook.place},function(re){
                re.isSuccess && toastr.success(re.msg) && setTimeout(function(){location.reload();},300);
                !re.isSuccess && toastr.error(re.msg);
                self.newBook = {
                    name: '',
                    type: -1,
                    place: ''
                };
            })
        },
        edit(index){
            var self = this;
            self.bookList[index].editable = !self.bookList[index].editable ? 1 : 0;
        },
        delBook(id,index){
            var self = this;
            swal({
                title: "Are you sure?",
                text: "Are you sure that you want to delete this book?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确定删除！",
                closeOnConfirm: true
            },function(){
                ajaxReq('./deleteBook','POST',{id:id},function(re){
                    if(re.isSuccess){
                        toastr.success(re.msg);
                        setTimeout(function(){location.reload();},300);
                    }
                    !re.isSuccess && toastr.error(re.msg);
                })
            })
        },
        saveEdit(id,index){
            var self = this;
            var _obj = this.bookList[index];
            ajaxReq('./saveEdit','POST',{id: id,name: _obj.name,type: _obj.type,place:_obj.place},function(re){
                self.edit(index);
                if(re.isSuccess){
                    toastr.success("编辑成功!");
                    return;
                }
                toastr.error("编辑失败!");
            })
        },
        getBookList(pageIndex,pageSize){
            var self = this;
            ajaxReq('./getBookList','GET',{pageIndex: pageIndex, pageSize: pageSize},function(re){
                if(re.isSuccess){
                    self.bookList = re.bookList;
                    self.total = re.total;
                    self.pageIndex = re.pageIndex;
                    self.pageSize = re.pageSize;

                    var totalpage = Math.ceil(self.total/self.pageSize);
                    self.page(totalpage, totalpage > 5 ? 5 : totalpage);
                }else{
                    toastr.error("暂无图书");
                }
            })
        },
        page(totalPages,visiblePages,page){
            var self = this;
            $('#pagination').twbsPagination({
                totalPages: totalPages,
                visiblePages: visiblePages,
                onPageClick: function (event, page) {
                    self.getBookList(page,10);
                }
            });
        }
    }
})