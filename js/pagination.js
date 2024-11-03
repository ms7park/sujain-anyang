var pagination = function(list){
    var pagingHtml = '';
    var pageNum = list.totalPages;
    var currentPage = '';
    try{
        currentPage = (typeof list.pageable.pageNumber != 'undefined') ? list.pageable.pageNumber : 0;
    } catch(e){}
    
    var pageStart = 0;
    var pageEnd = 0;

    if(currentPage < 10){
        pageStart = 0;
        if(pageNum < 10){
            pageEnd = pageNum;
        }else{
            pageEnd = 10;
        }
    }else{
        var currentPageString = currentPage.toString();
        var currentPageLength = currentPageString.length;

        var pageNumString = pageNum.toString();
        var pageNumLength = pageNumString.length;

        var last  = Number(currentPageString.charAt(currentPageLength-2))+1;
        pageStart = Number(currentPageString.replaceAt(currentPageLength-1, "0"))

        if(currentPageString.replaceAt(currentPageLength-1, "0") == pageNumString.replaceAt(pageNumLength-1, "0")){
            pageEnd = pageNum;
        }else{
            pageEnd   = Number(currentPageString.replaceAt(currentPageLength-2, last.toString()));
            pageEnd   = Number(pageEnd.toString().replaceAt(currentPageLength-1, "0"));
        }
    }

    String.prototype.replaceAt=function(index, char) {
        var a = this.split("");
        a[index] = char;
        return a.join("");
    }

    pagingHtml += '<input type="hidden" id="page" value="0" />'
    pagingHtml += '<input type="hidden" id="totalPage" value='+list.totalPages+' />'
    pagingHtml += '<a href="javascript:void(0);" class="btn first"><span class="blind">첫번째 페이지</span></a>';
    pagingHtml += '<a href="javascript:void(0);" class="btn prev"><span class="blind">이전 페이지</span></a>';
    for(var i=pageStart; i<pageEnd; i++){
        //if(i == list.pageable.pageNumber){
        if(i == currentPage){
            pagingHtml += '<span class="on" title="현재페이지">'+(currentPage+1)+'</span>';
        }else{
            pagingHtml += '<a href="javascript:void(0);" class="pageNum" data-page="'+i+'">'+(i+1)+'</a>';
        }
    }
    if(list.numberOfElements == 0){
        pagingHtml += '<span class="on" title="현재페이지">1</span>';
    }
    pagingHtml += '<a href="javascript:void(0);" class="btn next"><span class="blind">다음 페이지</span></a>';
    pagingHtml += '<a href="javascript:void(0);" class="btn last"><span class="blind">마지막 페이지</span></a>';
    
    if(list.numberOfElements == 0 ){
        pagingHtml = '';
    }
    $('.paging').html(pagingHtml);
};