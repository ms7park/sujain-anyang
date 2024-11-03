var addSearch = {};

var pageListInit = function(listFunc, add){

    /* 최초 검색 기간 세팅 */
    if($("#sdate").val() == '' || $("#edate").val() == ''){
        $("#sdate").val(getToday("month", -1));
        $("#edate").val(getToday("month", 0));
    }

    var defaultSearch = {
        'page' : $('#page').val(),
        'searchOption' : $('#searchCondition').val(),
        'searchInput' : $('#searchKeyword').val(),
        'startDate' : $('#sdate').val(),
        'endDate' : $('#edate').val(),
        '_csrf' : _CSRF,
    }
    if(add != null ){
        addSearch = add;
    }
    var searchCondition = $.extend(defaultSearch, addSearch);
    $.ajax({
        type: "POST",
        async: false,
        timeout: 10000,
        data: searchCondition,
        url: "list",
        success: function (data) {
            if ( typeof data.list != 'undefined'){
                listFunc(data.list);
                pagination(data.list);
            }
        },
        error: function (x,e) {
            console.log(x);
            console.log(e);
        },
        beforeSend: function(){
        },
        complete : function(){
        }
    });
};
$(document).on('click', '#searchBtn', function(){
    pageListInit(function(data){
        listGrid(data);
    });
});
$(document).on('click','.paging .pageNum', function(){
    $('#page').val($(this).attr('data-page'));
    pageListInit(function(data){
        listGrid(data);
    });
});
$(document).on('keyup', '#searchKeyword', function(e){
    if(e.keyCode == 13 && $(this).val() != ''){
        pageListInit(function(data){
            listGrid(data);
        });
    }
});

// Return YYYY-MM-DD hh-mm
function dateFormat(date) {
    var dateFormat = new Date(date);
    let month = dateFormat.getMonth() + 1;
    let day = dateFormat.getDate();
    let hour = dateFormat.getHours();
    let minute = dateFormat.getMinutes();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;
    hour = hour >= 10 ? hour : '0' + hour;
    minute = minute >= 10 ? minute : '0' + minute;

    return dateFormat.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute;
}

$(document).on('click', '#searchBtn', function(){
    
    pageListInit(function(data){
        listGrid(data);
    });

});
$(document).on('click','.paging .pageNum', function(){
    $('#page').val($(this).attr('data-page'));
    pageListInit(function(data){
        listGrid(data);
    });
});
$(document).on('keyup', '#searchKeyword', function(e){
    if(e.keyCode == 13 && $(this).val() != ''){
        pageListInit(function(data){
            listGrid(data);
        });
    }
});
$(document).on('click','.paging .first', function(){
    $('#page').val(0);
    pageListInit(function(data){
        listGrid(data);
    });
});
$(document).on('click','.paging .last', function(){
    $('#page').val($("#totalPage").val()-1);
    pageListInit(function(data){
        listGrid(data);
    });
});

$(document).on('click','.paging .prev', function(){
    if($('.paging .on').text() == 1){
        return;
    }else{
        $('#page').val($('.paging .on').text()-2);
        pageListInit(function(data){
            listGrid(data);
        });
    }
});

$(document).on('click','.paging .next', function(){
    if($('.paging .on').text() == $("#totalPage").val()){
        return;
    }else{
        $('#page').val($('.paging .on').text());
        pageListInit(function(data){
            listGrid(data);
        });
    }
});

// Return YYYY-MM-DD
function dateFormat2(date) {
    var dateFormat = new Date(date);
    let month = dateFormat.getMonth() + 1;
    let day = dateFormat.getDate();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;

    return dateFormat.getFullYear() + '-' + month + '-' + day;
}

// 오늘 일자 가져오기(매개변수 통해서 달 계산)
function getToday(division, cnt){
    var date = new Date();

    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    if(division == "year"){
        year = date.getFullYear() + cnt
    }else if(division == "month"){
        month = ("0" + (1 + date.getMonth()+cnt)).slice(-2);
    }else if(division == "day"){
        day = ("0" + date.getDate()+cnt).slice(-2);
    }

    return year + "-" + month + "-" + day;
}

// $("#sdate").val(getToday("month", -1));
// $("#edate").val(getToday("month", 0));
function getSearchParam(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}