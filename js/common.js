//관심정보 고유 코드
var GPX_CODE = "";
var GPX_CNAME = 'anonymousck';

// url pathname
var url = $(location).attr('pathname');

/**
 * 로딩바
 */
 function gtag(){}

 var lazyLoad = {
    num: 0, // 기준 값
    /**
     * 로딩 시작
     * @param {object} userOptions 사용자 설정 옵션
     */
    set: function (userOptions) {
        var options = {
            space: $('body'), // 대상 공간
            name: 'lazyLoad', // 생성되는 로딩바 기본 값
            idx: 0, // 로딩바 구분
            // overAll: false, // 로딩바 영역 - 전체
            progress: false // 이미지 로딩 비율 노출
        };
        $.extend(options, userOptions);
        var loaderId, _html = '';

        if ($('[data-loader^="' + options.name + '"]').length) {
            // 이미 생성되어 있다면 아이디 값을 갱신하고 생성하지 않음
            loaderId = options.name + options.idx;
            $('.loader_wrap').data('loader', loaderId);
        } else {
            // 생성
            loaderId = options.name + options.idx;

            if (options.space[0].nodeName !== 'BODY') {
                _html += '<div class="loader_wrap" data-loader="' + loaderId + '">';
            } else {
                _html += '<div class="loader_wrap over_all" data-loader="' + loaderId + '">';
            }

            //console.log(options.space[0].nodeName);

            _html += '<div class="loader"><div></div><div></div></div>';

            if (options.progress) {
                _html += '<div id="progressedCount" class="progressed_count">- / -</div>'; // 이미지 개수 테스트용
            }

            _html += '</div>';

            if (options.space[0].nodeName !== 'BODY') {
                $('body').append('<div class="loader_wrap over_all" data-loader="' + loaderId + '">');
                options.space.append(_html);
            } else {
                options.space.append(_html);
            }
        }
        this.num++;
    },
    /**
     * 로딩 종료
     * @param {object} userOptions 사용자 설정 옵션
     */
    end: function (userOptions) {
        var options = {
            name: 'lazyLoad', // 생성되는 로딩바 기본 값
            idx: 0 // 로딩바 구분
        };

        $.extend(options, userOptions);

        var loaderId = options.name + options.idx;

        if ($('[data-loader="' + loaderId + '"]').length) {
            // console.log('loader 삭제');
            $('[data-loader="' + loaderId + '"]').remove();
            this.num = 0; // 기준 값 초기화
        }
    }
};

/**
 * popup touch scroll on/off
 */
var popupTouchScroll = {
    on: function(target){
        var $target = $(target);

        $target.unbind('touchmove');
    },
    off: function (target) {
        var $target = $(target);

        $target.bind("touchmove", function(e) {
            e.preventDefault();
        });
        $target.find(".popup_wrap").bind("touchmove", function(e) {
            e.stopPropagation();
        });
    }
}

var sujain = sujain || {};

sujain = {
    _setUserData : function(){
        $.ajax({
            type: "POST",
            async: false,
            timeout: 10000,
            data: {'cpxcode':GPX_CODE, '_csrf' : _CSRF},
            url: "/complex/getUserData",
            success: function (data) {
                if ( data.code  == 1){
                    var f = document.cpx_layer_frm;
                    f.phno.value = data.other.phno;
                    f.email.value = data.other.email;
                    f.uid.value = data.other.uuid;
                    $(".mem_name").html(data.other.username);
                    $(".mem_phone").html(data.other.phno);
                    $(".mem_address").html(data.other.postno + ' ' + data.other.addr01 + ' ' + data.other.addr02);
                    $(".mem_email").html(data.other.email);
                    if($("#hd_cpxcode").val() == GPX_CODE && $("#hd_cpxcode_bs").val() == 'true'){
                        $("#btn_like").hide();
                        $("#btn_unlike").show();
                    } else {
                        $("#btn_unlike").hide();
                        $("#btn_like").show();
                    }
                }
            },
            error: function (x, e) {
            },
            beforeSend: function () {
            },
            complete: function () {
            }
        });
    },
    /**
     * sujain 공통영역
     * @param {function}
     */
    common : function(){
		// topBtn
		$("#btnTop").click(function(){
			$("html, body").animate({scrollTop: 0}, 500);
			return false;
		});

		// @ gnb
        var $body = $("body"),
            $header = $(".header"),
            $btnOpen = $header.find(".btn_open");

        // complaxHeader
        var $complexHeader = $(".complex_header"),
            $complexBtnOpen= $complexHeader.find(".btn_open");

        $header.find($btnOpen).on("click", function(){
            $("header").addClass("open");
            $body.css({"overflow": "hidden"});

            var btnId = $(this).prop("id"),
                gnbMenu = $(".gnb_menu"),
                mySujainGnb = $(".my_sujain_gnb");

            if( btnId == "btnOpenMenu"){
                gnbMenu.addClass("on");
                mySujainGnb.removeClass("on");
            }else if( btnId == "btnOpenSujain" ){
                mySujainGnb.addClass("on");
                gnbMenu.removeClass("on");
            }
        });

        $complexHeader.find($complexBtnOpen).on("click", function(){
            $("header").addClass("open");
            $body.css({"overflow": "hidden"});

            var btnId = $(this).prop("id"),
                gnbMenu = $complexHeader.find(".gnb_menu");

            if( btnId == "btnOpenMenu"){
                gnbMenu.addClass("on");
            }else if( btnId == "btnOpenSujain" ){
                gnbMenu.removeClass("on");
            }
        });

        function dimClose(){
            $header.removeClass("open");
            $complexHeader.removeClass("open");
            $(".gnb_cont").removeClass("on");
            $body.css({"overflow": "visible"});
        }

        $("#btnCloseMenu").on("click", function(){
            dimClose();
        });

        $("#gnbDim").on("click", function(){
            dimClose();
        });

        /* sticky  */
        var $lnb = $(".lnb_scroll"), currentT = 0;

        if($(".lnb_scroll").length > 0){
            var lnbT = $lnb.offset().top,
                lnbH = $lnb.height(),
                fixedTop = lnbT + lnbH;
        }
        // lnbScroll function
        var lnbScroll = function(scrollT){
            if(scrollT > fixedTop){
                $lnb.addClass("fixed");
            }else{
                $lnb.removeClass("fixed");
            }
        };

        // lnb_scroll
        // if ($('#lnbScrollWrap').length) {
        //     var $lnbScroll = $('#lnbScrollWrap'), // lnb
        //         $lnbWrap = $lnbScroll.find('.lnb_wrap'), // 스크롤 lnb 영역
        //         $lnbLi = $lnbWrap.find('li'), // lnb 리스트
        //         $liLength = $lnbLi.length; // li length

        //     // lnb scroll :: li length 3개 이상일 경우
        //     if($liLength > 3){
        //         var $current = $lnbWrap.find('.on'), // 현재 요소
        //             viewportWidth = $(window).width(), // 화면 넓이
        //             currentWidth = $current.width(), // 현재 요소 넓이
        //             offsetLeft = $current.offset().left, // 현재 요소 위치
        //             leftCal = viewportWidth * 0.5 - currentWidth * 0.5, // 중앙 정렬용 좌표값
        //             scrollLeft = offsetLeft - leftCal; // 스크롤 위치

        //         $lnbScroll.find('.lnb_inner').scrollLeft(scrollLeft);
        //     }
        // }


        $(window).scroll(function(e){
            e.preventDefault();
            var scrollT = $(this).scrollTop();

            // scroll 상태 체크
            if(scrollT > currentT){
                $body.attr("data-scroll" , "down");
            }else if(scrollT < currentT){
                $body.attr("data-scroll" , "up");
            };

            if($body.attr("data-scroll") === "down"){
                $header.removeClass("fixed");
                $complexHeader.removeClass("fixed");
            }else if($body.attr("data-scroll") === "up"){
                if(scrollT == 0){
                    $header.removeClass("fixed");
                    $complexHeader.removeClass("fixed");
                }else{
                    $header.addClass("fixed");
                    $complexHeader.addClass("fixed");
                }
            };

            currentT = scrollT;

            // lnbScroll function 호출
            if($(".lnb_scroll").length > 0){
                lnbScroll(scrollT);
            }

        }).trigger("scroll");


		// Family Site
		$(".fam_btn").on("click", function () {
			if ($("#famSite").hasClass("open")) {
				$("#famSite").removeClass("open");
			} else {
				$("#famSite").addClass("open");
			}
		});

		// 특정 영역 외 클릭 비활성화
		$("body").on("click", function (e) {
			// Family Site
			if ($("#famSite").hasClass("open")) {
				if (!$("#famSite").has(e.target).length) {
					$("#famSite").removeClass("open");
				}
			}
		});

        // 관심단지 등록 버튼 클릭
		$(".btn_like").on("click", function(){
			var cpxcode = $(this).attr('data-cpx');
            $("#cpxcode").val(cpxcode);
            GPX_CODE = cpxcode;
		});

        // 관심단지 등록 팝업 - complexLayerPopup
        var $btnLike = $(".btn_like"),
            $complexPopupLayer = $("#complexLayerPopup"),
            $complexPopClose = $complexPopupLayer.find(".btn_close");

        function complexPopupOpen(){
            $complexPopupLayer.addClass("open");
        }

        function complexPopupClose(){
            $complexPopupLayer.removeClass("open");
        }

        function setUserData(){
            $.ajax({
                type: "POST",
                async: false,
                timeout: 10000,
                data: {'cpxcode':GPX_CODE, '_csrf' : _CSRF},
                url: "/complex/getUserData",
                success: function (data) {
                    if ( data.code  == 1){
                        var f = document.cpx_layer_frm;
                        f.phno.value = data.other.phno;
                        f.email.value = data.other.email;
                        f.uid.value = data.other.uuid;
                        $(".mem_name").html(data.other.username);
                        $(".mem_phone").html(data.other.phno);
                        $(".mem_address").html(data.other.postno + ' ' + data.other.addr01 + ' ' + data.other.addr02);
                        $(".mem_email").html(data.other.email);
                        if($("#btn_like_code_"+GPX_CODE).hasClass("on") === true){
                            $("#btn_like").hide();
                            $("#btn_unlike").show();
                        } else {
                            $("#btn_unlike").hide();
                            $("#btn_like").show();
                        }
                    }
                },
                error: function (x, e) {
                },
                beforeSend: function () {
                },
                complete: function () {
                }
            });
        }

        $btnLike.on("click", function(){
            setUserData();
            complexPopupOpen();
        });
        $complexPopClose.on("click", function(){
            complexPopupClose();
        });

        $complexPopupLayer.on('click', function (e) {
            if ($(e.target).is('.popup_layer') || $(e.target).is('.btn_close')) {
                complexPopupClose();
            }
        });

    },
    /**
     * 공통 tabList
     * @param {function}
     */
    tabList : function(){
        //tabList
        $("#tabList").find("li > a").on("click", function(){
            var _tabLi =  $(this).parent("li");
            var _tabIdx = _tabLi.index();

            _tabLi.addClass("on").siblings("li").removeClass("on");
            $(".tab_cont").eq(_tabIdx).addClass("active").siblings().removeClass("active");
        });
    },
    /**
     * 공통 accodion
     * @param {function}
     */
    accodion : function(){/*
        $(".acco_tit").on("click" ,function(e){
            var $list = $().closest(".accordion_list"),
                type = $($list).attr("data-type");

            var $accoTit =  $(this),
                $accoLi =  $(this).parent("li"),
                $accoCont =  $(this).siblings(".acco_cont");

            e.preventDefault();

            if(type == "single"){
                $accoLi .toggleClass("active");
                if($accoLi.is(".active")){
                    $accoTit.attr("title" , "내용 열기");
                    $accoCont.slideDown();
                    $accoLi.siblings().removeClass("active").children(".acco_cont").slideUp();
                }else{
                    $accoTit.attr("title" , "내용 닫기");
                    $accoCont.slideUp(200);
                };
            }else if("multi"){
                $accoLi.toggleClass("active");
                ($accoLi.is(".active")) ? ($accoTit.attr("title" , "내용 닫기")) : ($accoTit.attr("title" , "내용 열기"));
                $accoCont.slideToggle(300);
            }
        });*/
        $(document).on("click", ".acco_tit", function(e){
            var $list = $(this).closest(".accordion_list"),
                type = $($list).attr("data-type");

            var $accoTit =  $(this),
                $accoLi =  $(this).parent("li"),
                $accoCont =  $(this).siblings(".acco_cont");

            e.preventDefault();

            if(type == "single"){
                $accoLi.toggleClass("active");
                if($accoLi.is(".active")){
                    $accoTit.attr("title" , "내용 열기");
                    $accoCont.slideDown();
                    $accoLi.siblings().removeClass("active").children(".acco_cont").slideUp();
                }else{
                    $accoTit.attr("title" , "내용 닫기");
                    $accoCont.slideUp(200);
                };
            }else if("multi"){
                $accoLi.toggleClass("active");
                ($accoLi.is(".active")) ? ($accoTit.attr("title" , "내용 닫기")) : ($accoTit.attr("title" , "내용 열기"));
                $accoCont.slideToggle(300);
            }
        });
    },
    /**
     * 공통 customFile
     * @param {function}
     */
    customFile : function(){

        /**
         * 파일 선택
         * @param {object} fileTarget 대상
         */
        function readFile(fileTarget) {
            var $target = $(fileTarget),
                $fileTxt = $target.siblings('.file_text'),
                fileName;

            if(window.FileReader){
                fileName = $target[0].files[0].name;
            }else{
                fileName = $target.val().split('/').pop().split('\\').pop();
            }
            $fileTxt.val(fileName);

            if(!checkFileType($target)) {
                $fileTxt.val('선택 파일 없음');
                return false;
            }else if(!checkFileSize($target)) {
                $fileTxt.val('선택 파일 없음');
                return false;
            }

            // btn del
            $target.siblings(".btn_delete").show();
        }

        /**
         * 파일 사이즈 확인
         * @param {object} fileTarget 대상
         */
        function checkFileSize(fileTarget){
            var $file = $(fileTarget);
            var fileSize = $file[0].files[0].size;
            var maxSize = 1024 * 1024 * 5;// 5MB

            if( fileSize > maxSize ) {
                $file.siblings(".file_text").val('선택 파일 없음');
                alert("5MB 이하의 파일만 첨부 가능합니다.");
                return false;
            }
            return true;
        }

        /**
         * 파일 타입 확인
         * @param {object} fileTarget 대상
         */
         function checkFileType(fileTarget){
            var $file = $(fileTarget);
            var $filePath = $file.val();
            var $fileType = $filePath.substring($filePath.lastIndexOf('.') + 1, $filePath.length);
            var rightExts = $file.attr("exts");

            if (rightExts.indexOf($fileType.toLowerCase()) == -1) {
                alert(rightExts + " 형식만 지원 가능합니다.");
                return false;
            }
            return true;
        }

        /**
         * 파일 특수문자 확인
         * @param {object} fileTarget 대상
         */
        function checkFileName(fileTarget){
            var $file = $(fileTarget);
            var $filePath = $file.val();
            var fileName = $filePath.split('\\').pop().toLowerCase();
            var pattern =   /[\{\}\/?,;:|*~`!^\+<>@\#$%&\\\=\'\"]/gi;
            if(pattern.test(fileName) ){
                alert('파일명에 특수문자를 제거해주세요.');
                $file.val('선택 파일 없음');
                return false;
            }
            return true;
        }

        /**
         * 선택된 파일 삭제시
         * @param {object} $file 선택 대상
         * @param {object} $fileTxt 선택된 파일 value
         */
        function resetInputFile($file, $fileTxt) {
            var agent = navigator.userAgent.toLowerCase();
            if((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1)) {
                // ie 일때
                $file.replaceWith($file.clone(true));
                $fileTxt.val('선택 파일 없음');
            } else {
                // other
                $file.val('');
                $fileTxt.val('선택 파일 없음');
            }
        }

        // 파일 선택시
        $(".fileInput").on("change", function(){
            var $this = $(this).attr("id"),
                $this = $("#"+$this);

            readFile($this);
        });

        // file delete
        var $btnDelete = $(".btn_delete");
        $btnDelete.on("click", function() {
            var $file = $(this).siblings(".fileInput");
            var $fileTxt = $file.siblings(".file_text");
            resetInputFile($file, $fileTxt);

            $(this).hide();
        });

    },
    /**
     * 공통 form
     * @param {function}
     */
	form : function(){
		var $emailAddress = $("#emailAddress"),
			$email1_2 = $("#email1_2");

		// 이메일 선택
		$emailAddress.on("change", function(){
			$email1_2.val($emailAddress.prop("selected", true).val());

			if( $emailAddress.prop("selected", true).val() == "" ){
				$email1_2.removeAttr("readonly");
				$email1_2.focus();
			}else{
				$email1_2.prop("readonly", "readonly");
			};
		});
	},
    /**
     * 공통 floating
     * @param {function}
     */
    floating : function(){
        $(window).scroll(function(){
            var scrollT = $(window).scrollTop(),
                $floating = $(".floating");

            (scrollT > 0) ? $floating.fadeIn() : $floating.fadeOut(500);
        });
    },
    /**
     * 단지 허브 공통영역
     * @param {function}
     */
    complexCommon : function(){
        // complexLayerPopup
        var $complexHeader= $(".complex_header"),
            $complexPopupLayer = $("#complexLayerPopup"),
            $complexPopClose = $complexPopupLayer.find(".btn_close");

        function complexPopupOpen(){
            $("body").addClass("pop_open");
            $complexPopupLayer.addClass("open");
        }

        function complexPopupClose(){
            $("body").removeClass("pop_open");
            $complexPopupLayer.removeClass("open");
        }

        $complexHeader.find(".interest_complex").on("click", function(){
            var cpxcode = $("#hd_cpxcode").val();
            $("#cpxcode").val(cpxcode);
            GPX_CODE = cpxcode;
            console.log("GPX_CODE :" + GPX_CODE);
            sujain._setUserData();
            complexPopupOpen();
        });
        $complexPopClose.on("click", function(){
            complexPopupClose();
        });

        $complexPopupLayer.on('click', function (e) {
            if ($(e.target).is('.popup_layer') || $(e.target).is('.btn_close')) {
                complexPopupClose();
            }
        });
    },
    /**
     * 이메일무단수집거부 popup
     * @param {function}
     */
    emailSecurity : function(){
        var $emailPopBtn = $(".email_security"),
            $emailPop = $("#emailPopupLayer");

        $emailPopBtn.on('click',function(){
            $emailPop.fadeIn(300);

            popupTouchScroll.off($emailPop);
        });

        $emailPop.find(".pop_btn").on('click',function(){
            $emailPop.fadeOut(300);
            popupTouchScroll.on($emailPop);
        })

        $emailPop.on('click', function (e) {
            if ($(e.target).is('.popup_layer') || $(e.target).is('.pop_btn')) {
                $emailPop.fadeOut(300);
                popupTouchScroll.on($emailPop);
            }
        });
    },
    /**
     * 약관 Layer
     * @param {function}
     */
    termsLayer : function(){
        var $agreeBtn = $(".btn_agree"),
            $termsLayer = $("#popupLayer.terms_layer"),
            $termsClose = $termsLayer.find(".popup_close");

        $agreeBtn.on('click',function(){
            var $_this = $(this),
                $btn_data = $_this.attr("data-role");
            $termsLayer.addClass("open");
            $termsLayer.find(".terms_box").removeClass("open");
            $termsLayer.find(".terms_box[data-role='"+$btn_data+"']").addClass("open");

            popupTouchScroll.off($termsLayer);
        });

        $termsClose.find(".btn_close").on('click',function(){
            $termsLayer.removeClass("open");
            popupTouchScroll.on($termsLayer);
        })

        $termsLayer.on('click', function (e) {
            if ($(e.target).is('.terms_layer') || $(e.target).is('.btn_close')) {
                $termsLayer.removeClass("open");
                popupTouchScroll.on($termsLayer);
            }
        });
    },
    /**
     * 검색 레이어 팝업
     * @param {function}
     */
     searchLayer : function(){
        var $searchBtn = $(".search_open"),
            $searchLayer = $("#searchPopupLayer"),
            $searchClose = $searchLayer.find(".popup_close");

        $searchBtn.on('click',function(){
            $searchLayer.addClass("open");
            popupTouchScroll.off($searchLayer);
        });

        $searchClose.find(".btn_close").on('click',function(){
            $searchLayer.removeClass("open");
            popupTouchScroll.on($searchLayer);
        })

        $searchLayer.on('click', function (e) {
            if ($(e.target).is('.search_layer') || $(e.target).is('.btn_close')) {
                $searchLayer.removeClass("open");
                popupTouchScroll.on($searchLayer);
            }
        });
    },
    /**
     * mypage lnb
     * @param {function}
     */
    myLnb : function(){
        var $lnb = $(".lnb_mypage"),
            $list = $lnb.find(".lnb_wrap"),
            $label = $lnb.find(".menu_label"),
            lnbChk = false;

        $label.on('click',function(e){
            if($lnb.hasClass("on") == true){
                $lnb.removeClass("on");
                $list.stop().slideUp();

                lnbChk = false;
            }else{
                $lnb.addClass("on");
                $list.stop().slideDown();

                lnbChk = true;
            }
        })
        /* 접속되어 있는 페이지로 메뉴명 변경 */
        var menuName = $('.lnb_mypage a[href="'+ url +'"]').text();
        if(menuName == '') {
            if(url.includes("inquiry")) {
                menuName = "1:1문의";
            } else if(url.includes("data")) {
                menuName = "회원정보 관리";
            } else if(url.includes("pw")) {
                menuName = "비밀번호 변경";
            } else if(url.includes("addr")) {
                menuName = "회원정보 관리";
            }
        }
        $label.text(menuName);

        // lnb 활성화 중 scroll 시 닫기
        $(window).scroll(function(e){
            e.preventDefault();
           
            if(lnbChk == true){
                $lnb.removeClass("on");
                $list.slideUp(100);
            }
        });
    },
    /**
     * complexHeader lnb (added 2021.08.30.)
     * @param {function}
     */
    complexHeaderLnb : function(){
        // var url = $(location).attr('pathname');
        var selectedLiId = "#" + url.substring(url.lastIndexOf('/')+1) + "Li";
        if(url.includes("overview")){
            $('#overviewLnb').addClass("active");
        } else if(url.includes("area") || url.includes("plan")) {
            $('#detailLnb').addClass("active");
        }
        $(selectedLiId).addClass("on");
    },
    /**
     * sujain 시작 함수
     * @param {function}
     */
    init : function(){
        sujain.common();
        sujain.tabList();
        sujain.accodion();
		sujain.customFile();
        sujain.form();
        sujain.floating();
		sujain.complexCommon();
        //sujain.complexFloating();
        sujain.emailSecurity();
        sujain.termsLayer();
        sujain.searchLayer();
        sujain.myLnb();
        sujain.complexHeaderLnb();
    },

    reinit : function(){
        // 관심단지 등록 버튼 클릭
       $(".btn_like").click(function(){
               var cpxcode = $(this).attr('data-cpx');
               $("#cpxcode").val(cpxcode);
               GPX_CODE = cpxcode;
       });

// 관심단지 등록 팝업 - complexLayerPopup
       var $btnLike = $(".btn_like"),
           $complexPopupLayer = $("#complexLayerPopup"),
           $complexPopClose = $complexPopupLayer.find(".btn_close");

       function complexPopupOpen(){
           $('#agreeChkN').prop('checked', true);
           $("body").addClass("pop_open");
           $complexPopupLayer.addClass("open");
       }

       function complexPopupClose(){
           $("body").removeClass("pop_open");
           $complexPopupLayer.removeClass("open");
       }

       function setUserData(){
           $.ajax({
               type: "POST",
               async: false,
               timeout: 10000,
               data: {'cpxcode':GPX_CODE, '_csrf' : _CSRF},
               url: "/complex/getUserData",
               success: function (data) {
                   if ( data.code  == 1){
                       var f = document.cpx_layer_frm;
                       f.phno.value = data.other.phno;
                       f.email.value = data.other.email;
                       f.uid.value = data.other.uuid;
                       $(".mem_name").html(data.other.username);
                       $(".mem_phone").html(data.other.phno);
                       $(".mem_address").html(data.other.postno + ' ' + data.other.addr01 + ' ' + data.other.addr02);
                       $(".mem_email").html(data.other.email);
                       if($("#btn_like_code_"+GPX_CODE).hasClass("on") === true){
                           $("#btn_like").hide();
                           $("#btn_unlike").show();
                       } else {
                           $("#btn_unlike").hide();
                           $("#btn_like").show();
                       }
                   }
               },
               error: function (x, e) {
               },
               beforeSend: function () {
               },
               complete: function () {
               }
           });
       }

       $btnLike.on("click", function(){
           //isLike();
           setUserData();
           complexPopupOpen();
       });
       $complexPopClose.on("click", function(){
           complexPopupClose();
       });

       $complexPopupLayer.on('click', function (e) {
           if ($(e.target).is('.popup_layer') || $(e.target).is('.btn_close')) {
               complexPopupClose();
           }
       });
   }
}
sujain.init();

// 통합검색 gtag 설정
function integratedSearchGtag(action, category, label){
    if ( $.isFunction(gtag)){
        gtag('event', action, {'event_category': category , 'event_label': label });
    }
}


function userAuthCheck(action, category, label, urlPath){
    if(GLOBAL_MEMGRADE != "일반고객" && GLOBAL_MEMGRADE != ""){
        if(action == "Construction"){
            location.href = "/complex/"+urlPath+"/construction";
        }else{
            location.href = "/complex/"+urlPath+"/move/list";
        }

    }else{
        if(GLOBAL_MEMGRADE == ""){
            window.location.href = "/login";
        }else{
            alert("입주고객과 계약고객만 허브사이트에 접근이 가능합니다.");
        }
    }
    integratedSearchGtag(action, category, label);
}

//added 2021.08.06
var changeForm = {
    setChangeForm : function (formData){
        let form = document.getElementById(formData);
        form.addEventListener('change', function() {
            changeYn = true;
        });
    },
    checkChangeForm : function(){
        if(changeYn){
            if(!confirm("작성중인 내용이 있습니다. 목록으로 이동하시겠습니까?")){
                return;
            }else{
                history.back();
            }
        }else{
            history.back();
        }
    }
}


$(document).on('click', '#email_secu', function(){
    $.ajax({
    url: "/contents/etc/email",
    data: {'_csrf' : _CSRF},
    type: "POST",
    success: function (data) {
        $("#emailPopupLayer").find('.terms_box').html(data);
    }
    })
});

//다음 주소 api _ 관심단지
$(document).on('click', '#zipcode_btn', function () {
    new daum.Postcode({
        oncomplete: function (data) {
            $('#address').val(data.address);
            $('#zipcode').val(data.zonecode);
        }
    }).open();
});
//관심단지 , 팝업 제어 취소버튼.
$(document).on('click', '.popup_cont .btn_white', function () {
    $('.popup_cont input[type="text"]').val('');
    $('.btn_close').click();
});

//숫자만 입력 허용
$(document).on('input', '.num', function () {
    $(this).val($(this).val().replace(/[^0-9]/g, ''));
});
function isValidEmptyStr(obj, msg) {
    if ($.trim(obj.val()) == '') {
        alert(msg);
        obj.focus();
        return false;
    }
    return true;
};

//비회원 관심단지 등록
$(document).on('click', '#btn_like_non', function () {

    //validtiaon
    var phoneMsg = '휴대전화를 입력해 주세요';
    var emailMsg = '이메일을 입력해 주세요';
    var addressMsg = '주소를 입력해 주세요';
    var cpxcode3 = $(".btn_like", parent.document.body).attr('data-cpx');
    if ($('#agreeChkY:checked').length == 0) {
        alert('개인정보 수집 및 이용에 동의해주시기 바랍니다.');
        $('#agreeChkY').focus();
        return;
    }

     //기존 관심단지 등록 확인
     var bLike = isLike();
     if ( bLike ){
         alert("이미 등록된 단지입니다.");
         return;
     }


    if (!isValidEmptyStr($('#name'), '이름을 입력해 주세요')) return;
    if (!isValidEmptyStr($('#phone_1'), phoneMsg) || !isValidEmptyStr($('#phone_2'), phoneMsg) || !isValidEmptyStr($('#phone_3'), phoneMsg)) return;
    if (!isValidEmptyStr($('#email1_1'), emailMsg) || !isValidEmptyStr($('#email1_2'), emailMsg)) return;
    if (!isValidEmptyStr($('#zipcode'), addressMsg) || !isValidEmptyStr($('#address'), addressMsg) || !isValidEmptyStr($('#addressdetail'), addressMsg)) return;

    if (!confirm('등록 하시겠습니까?')) return;

    $('#phno').val($('#phone_1').val() + '-' + $('#phone_2').val() + '-' + $('#phone_3').val());
    $('#email').val($('#email1_1').val() + '@' + $('#email1_2').val());
    $('#cpxcode').val(GPX_CODE);

    //  //기존 관심단지 등록 확인
    //  var bLike = isLike();
    //  console.log("bLike :" + bLike);
    //  if ( bLike ){
    //      alert("이미 등록된 단지입니다.");
    //      return;
    //  }


    $.ajax({
        type: "POST",
        async: false,
        timeout: 10000,
        data: $('#cpx_layer_frm').serialize(),
        url: "/complex/like",
        success: function (data) {
            if (data.result) {
                alert('관심단지등록이 완료되었습니다.');
                $('.popup_cont input').val('');
                $("#agreeChkN").click();
                $('.btn_close').click();
                
            } else {
                alert('등록 실패');
            }
        },
        error: function (x, e) {
            console.log(x);
            console.log(e);
            $("#btn_like_code_"+GPX_CODE).removeClass("on");
        },
        beforeSend: function () {
        },
        complete: function () {
        }
    });
});
//회원 관심단지 등록
$(document).on('click', '#btn_like', function () {
    //validtiaon
    if ($('#agreeChkY:checked').length == 0) {
        alert('개인정보 수집 및 이용에 동의해주시기 바랍니다.');
        $('#agreeChkY').focus();
        return;
    }
    if (!confirm('등록 하시겠습니까?')) return;

    $.ajax({
        type: "POST",
        async: false,
        timeout: 10000,
        data: $('#cpx_layer_frm').serialize(),
        url: "/complex/like",
        success: function (data) {
            if (data.result) {
                alert('관심단지 등록이 완료되었습니다.');
                $('.btn_close').click();
                $("#btn_like_code_"+GPX_CODE).addClass("on");                
                try{
                    var interest_complex_btn = $("#hd_cpxcode").length ? true : false;
                    if ( interest_complex_btn)document.location.reload();
                } catch(e){
                    alert(e);
                }
            } else {
                alert('등록 실패');
            }
        },
        error: function (x, e) {
            console.log(x);
            console.log(e);
        },
        beforeSend: function () {
        },
        complete: function () {
        }
    });
})
//회원 관심단지 해제
$(document).on('click', '#btn_unlike', function () {
    if (!confirm('관심단지를 해제하시겠습니까?')) return;

    $.ajax({
        type: "POST",
        async: false,
        timeout: 10000,
        data: { 'cpxcode': GPX_CODE, '_csrf' : _CSRF },
        url: "/complex/unlike",
        success: function (data) {
            if (data.result) {
                alert('관심단지에서 해제 되었습니다.');
                $('.btn_close').click();
                $("#btn_like_code_"+GPX_CODE).removeClass("on");
                if( document.location.pathname == '/mypage/favorite')document.location.reload();

                try{
                    var interest_complex_btn = $("#hd_cpxcode").length ? true : false;
                    if ( interest_complex_btn)document.location.reload();
                } catch(e){
                    alert(e);
                }
            } else {
                alert('해제 실패');
            }
        },
        error: function (x, e) {
            console.log(x);
            console.log(e);
        },
        beforeSend: function () {
        },
        complete: function () {
        }
    });
});


// 해당이름의 쿠키를 가져온다.
function getCookie(cookie_name) {
    var isCookie = false;
    var start, end;
    var i = 0;

    // cookie 문자열 전체를 검색
    while (i <= document.cookie.length) {
        start = i;
        end = start + cookie_name.length;
        // cookie_name과 동일한 문자가 있다면
        if (document.cookie.substring(start, end) == cookie_name) {
            isCookie = true;
            break;
            console.log(cookie_name);
        }
        i++;
    }

    // cookie_name 문자열을 cookie에서 찾았다면
    if (isCookie) {
        start = end + 1;
        end = document.cookie.indexOf(";", start);
        // 마지막 부분이라는 것을 의미(마지막에는 ";"가 없다)
        if (end < start) end = document.cookie.length;
        // cookie_name에 해당하는 value값을 추출하여 리턴한다.
        return document.cookie.substring(start, end);
    }
    // 찾지 못했다면
    return "";
}

function setCookie(name, value, expiredays) {
    var todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expiredays);
    document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";";
}

var unSiginCookie = (function(){
    var preCookie = getCookie(GPX_CNAME);
    if ( preCookie == null || preCookie == '' || typeof preCookie == 'undefined'){
         preCookie = Math.random().toString(36).substr(2,18);
    }
    setCookie(GPX_CNAME , preCookie , 30);
})();

function isLike(){

    //console.log('isLike param 111:' + $('#phone_2').val());
    $('#phno').val($('#phone_1').val() + '-' + $('#phone_2').val() + '-' + $('#phone_3').val());
    if ( $.trim($('#phno').val()) == ''){
        alert("휴대전화 번호를 입력하세요.");
        $('#phone_1').focus();
        return;
    }

    var param = {'cpxcode':GPX_CODE , 'phno' :$('#phno').val(), '_csrf' : _CSRF};
    console.log('isLike param :' + JSON.stringify(param));
    var bLike = false;
    $.ajax({
        type: "POST",
        async: false,
        timeout: 10000,
        data: param,
        url: "/complex/islike",
        success: function (data) {
            bLike = data.result;
        },
        error: function (x, e) {
        },
        beforeSend: function () {
        },
        complete: function () {
        }
    });

    return bLike;

}//end fnc