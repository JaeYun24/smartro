var scrollTop,			
	 gnbTop,				// GNB Top
	 lnbTop,				// LNB Top

	 win_w,				
	 win_h,			

	 lyNums = 0,			
	 lyOne = 0;	

$(document).ready(function () {
	//이슈티커
	$('#newsticker').Vnewsticker({
		speed: 1000,         //스크롤 스피드
		pause: 4000,        //잠시 대기 시간
		mousePause: true,   //마우스 오버시 일시정지(true=일시정지)
		showItems: 1,       //스크롤 목록 갯수 지정(1=한줄만 보임)
		direction : "Up"    //left=옆으로스크롤, up=위로스크롤, 공란=아래로 스크롤
	});

	//열고닫기탭
	$(".arr_btn").on('click', function(){
		if(!$(this).hasClass("on")){
			$(this).addClass("on").attr('title','닫기');
			$(this).parent("div").siblings(".cont").slideDown();
		}else{
			$(this).removeClass("on").attr('title','열기');
			$(this).parent("div").siblings(".cont").slideUp();
		}
	});
	
	//선택탭
	$(".bx_tab a").on("click", function () {
		var idx = $(".bx_tab a").index($(this));
		$(".bx_tab a").each(function(index){
			if(idx == index){
				if(!$(this).parent("li").hasClass("on")){
					$(this).parent().addClass("on").find("a").attr('title','선택됨');
					$(this).parent().siblings().removeClass("on").find("a").attr('title','');
				}else{
					$(this).parent().removeClass("on").find("a").attr('title','');
				}
				
			}else{
				$(this).parent().removeClass("on").find("a").attr('title','');
			}
		});
	});

	$(".bx_tab a.more").parent().nextAll().hide();
	$(".bx_tab a.more").on("click", function () {
		$(this).parent().hide();
		$(this).parent().nextAll().show();
	});

	//탭컨텐츠
	$(".tab_cnt a").on("click", function () {
		var idx = $(".tab_cnt a").index($(this));
		$(".tab_cnt a").each(function(index){
			if(idx == index){
				if(!$(this).parent("li").hasClass("on")){
					$(this).parent().addClass("on").find("a").attr('title','선택됨');
					$(this).parent().siblings().removeClass("on").find("a").attr('title','');
					$(".tab_con").eq(index).show();
				}else{

				}
			}else{
				$(this).parent().removeClass("on").find("a").attr('title','');
				$(".tab_con").eq(index).hide();
			}
		});
	});

	//공지사항
	$(".notice_view li a").on('click', function () {
		var idx = $(".notice_view li a").index($(this));
		$(".notice_view li a").each(function(index){
			if(idx == index){
				if(!$(this).parents("li").hasClass("on")){
					$(this).attr('title','닫기').parents("li").addClass("on");
					$(this).parents("li").find(".cont").slideDown(300);
				}else{
					$(this).attr('title','열기').parents("li").removeClass("on");
					$(this).parents("li").find(".cont").slideUp();
				}
			}else{
				$(this).attr('title','열기').parents("li").removeClass("on");
				$(this).parents("li").find(".cont").slideUp();
			}
		});
	});

	//전체체크
	$("input[name=agree_all]").click(function(){
		if ($(this).is(':checked')) {
			$("input[type=checkbox]").prop("checked", true).next('.chk_label').attr('aria-checked','true');
			$(".agr_list").find(".arr_btn").removeClass("on").attr('title','열기');
			$(".agr_list").find(".cont").slideUp();
		} else {
			$("input[type=checkbox]").prop("checked", false).next('.chk_label').attr('aria-checked','false');
		}
	});

	//선택체크 (필수)
	$("input[name=agree]").click(function(){
		checkBoxLength = $("input[name=agree]").length;
		checkedBoxLength = $("input[name=agree]:checked").length;

		if ($(this).is(':checked')) {
			$(this).prop("checked", true).next('.chk_label').attr('aria-checked','true');
			$(this).siblings(".arr_btn").removeClass("on").attr('title','열기');
			$(this).parent("div").siblings(".cont").slideUp();
		} else {
			$(this).prop("checked", false).next('.chk_label').attr('aria-checked','false');
		}

		if(checkBoxLength == checkedBoxLength) {
			$("input[name=agree_all]").prop("checked", true).next('.chk_label').attr('aria-checked','true');
		} else {
			$("input[name=agree_all]").prop("checked", false).next('.chk_label').attr('aria-checked','false');
		}
	});

	//자동input_focus
	$(".frm input").keyup(function () { if (this.value.length == this.maxLength) { $(this).parent().next().find("input").focus(); } })
	
	//셀렉박스_placeholder
	selectedEl = $('select').find('option:selected');
	if(selectedEl.val()==""){
		$('select').css('color','#c9c9c9');
		$('select').children().css('color','#363636');
	}

	$('body').on('change','select', function (){
		if($(this).find('option:selected').val() == ""){
			$(this).css('color','#c9c9c9');
			$(this).children().css('color','#363636');
		}
		else {
			$(this).css('color','#363636');
			$(this).children().css('color','#363636');
		}
	});

	//현금영수증 선택
	$('#recpOpt').change(function() {
		var result = $('#recpOpt option:selected').val();
		if (result == 'mob') {
		  $('.opt.mob').show().siblings(".opt").hide();
		} else if(result == 'bsn'){
		  $('.opt.bsn').show().siblings(".opt").hide();;
		}else{
		  $('.opt.card').show().siblings(".opt").hide();;
		}
	}); 
	
	//레이어 탭인덱스 우선시
	if($(".layer_wrap").hasClass("active")){
		$(".layer_wrap").attr('tabindex','0').focus();
	}

});

//라디오셀렉
function setDisplay(){
	if($('.rd_sel input:radio[id=buyOpt_2]').is(':checked')){
		$('.bform').show();
	}else{
		$('.bform').hide();
	}
}
//LayerPopup
function popupOpen(name) {
	$(name).parents('html').addClass('no_scroll');
	$(name).parents('.layer_wrap').addClass('active').fadeIn(150);
	$(name).parents('.layer_wrap').find('.ly_dim').fadeIn(150);
	$(name).css('display','table');
	$(name).parents('.layer_wrap').attr('tabindex','0').focus();
}
function popupClose(name) {
	$(name).parents('html').removeClass('no_scroll');
	$(name).parents('.layer_wrap').removeClass('active').fadeOut();
	$(name).css('display','none');
	$(name).parents('.layer_wrap').removeAttr('tabindex');
}

//세로스크린사이즈
function setScreenSize() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setScreenSize();
window.addEventListener('resize', () => setScreenSize());

