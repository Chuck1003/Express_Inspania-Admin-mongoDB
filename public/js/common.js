function ajaxReq(url,type,data,cb){
    $.ajax({
        url: url,
        type: type || 'GET',
        data: data,
        success: function(re){
            cb(re);
        }
    })
}