$(function(){

    var container = $("#visual_wrap");  
    var slideGroup = container.find(".visual"); // 실제 움직여주는 역할을 하는 박스
    var slides = slideGroup.find("li"); // 슬라이드 이미지들
    var nav = container.find(".btn01");   // 이전, 다음 버튼들
    var indicator = container.find(".indicator ul");    // 인디케이터

    var slideCount = slides.length; // 슬라이드 개수
    var currentIdx = 0; // 현재 보여지는 슬라이드의 인덱스 번호를 담을 변수
    var duration = 700; // 슬라이드 전환 시간(장이 넘어가는 속도)
    var easing = "swing";   // 슬라이드 가속도
    var interval = 4000;    // 슬라이드 자동 실행 간격
    var timer;  // 아래쪽에서 interval을 걸어줄 변수를 선언


    // 슬라이드 위치 설정 및 인디케이터 생성
    for(var i = 0; i < slideCount; i++) {

        slides.eq(i).css({
            left: 100 * i + "%"
        });
    
        var slideImgSrc = slides.eq(i).find("img").attr("src");
    

        indicator.append("<li><img src='" + slideImgSrc + "'></li>");

    }

    function goToSlide(index) {
       var currentSlide = slides.eq(currentIdx);
  var nextSlide = slides.eq(index);

  currentSlide.find("div > div").fadeOut(duration / 2, easing); // Fade out with half the duration
 
      

        slideGroup.animate({
            left: - 100 * index + "%"
        }, duration, easing);
       

        setTimeout(function() {
            nextSlide.find("div > div").fadeIn(duration / 2, easing); // Fade in with half the duration after the slide transition
          }, duration / 2);
        currentIdx = index;


        // 캡션
        var slideImg = slides.find("img");
        var imgTitle = slideImg.eq(currentIdx).attr("title");
        // console.log(slideImg);
        // console.log(imgTitle);
        var caption = container.find(".caption");

        // 이미지 태그에 title속성이 있는 경우 그 속성값을 가져와 caption 박스에 text로 입력
        if( imgTitle == undefined ) {
            caption.hide(); // title 속성이 없으면 caption박스도 가림
        } else {
            caption.show().text(imgTitle);
        }



        update();


    }
    
    goToSlide(currentIdx);


    // // 내비게이션 버튼 클릭 이벤트
    // nav.click(function(){
    // // .btn을 클릭하면 if-else문을 통해서 그 버튼이 이전/다음 여부를 확인한 다음 그것에 맞는 코드를 실행

    //     if( $(this).hasClass("prev") ) {
        
    //         goToSlide(currentIdx - 1);

    //     } else {

    //         goToSlide(currentIdx + 1);

    //     }

    // });



    // 슬라이더의 상태(인덱스 번호)에 따라 내비게이션, 인디케이터를 업데이트 하는 함수
    function update() {

        var navPrev = nav.filter(".prev");
        // .btn 클래스를 가지고 있는 것 중 .prev 클래스를 가지고 있는 것
        // 선택자.filter("선택자"); 선택한 요소를 필터링 하는 선택 메서드
        var navNext = nav.filter(".next");

        
        if( currentIdx == 0 ) {             // 현재 슬라이드 번호가 0이면(첫번째 슬라이드면)
            navPrev.addClass("disabled");   // disabled 클래스 추가(이전 버튼 없앰)
        } else {                                // 첫번째가 아니면
            navPrev.removeClass("disabled");    // disabled 클래스 제거(이전 버튼 살리기)
        }

        if( currentIdx == slideCount - 1 ) {
            // 인덱스 번호 4번 == 슬라이드의 개수(5개) - 1 같아지면
            // 마지막 슬라이드에 도달하면
            navNext.addClass("disabled");
        } else {
            navNext.removeClass("disabled");
        }


        // 현재 슬라이드의 인덱스에 맞는 인디케이터에 active 추가(불켜기)
        indicator.find("li")
        // 인디케이터 요소 선택
                 .removeClass("active")
                //  혹시 먼저 active가 붙어있을 수도 있으니 전체적으로 다 클래스 삭제해줌
                 .eq(currentIdx).addClass("active");
                //  해당 인덱스 번호에 맞는 요소만 선택해서 active 붙여줌


    }




    // 인디케이터 클릭 이벤트
    indicator.children().click(function(){
        // 인디케이터 버튼을 클릭하면

        if( !$(this).hasClass("active") ) {
            // 클릭한 해당 요소가 active클래스를 가지고있지 '않은' 경우만 실행
            // active상태가 아닌 인디케이터를 클릭했을 때

            goToSlide( $(this).index() );
            // 선택자.index() : 선택자의 인덱스 번호를 반환하는 메서드
            // 클릭한 요소의 인덱스 번호를 가져와 goToSlide함수의 매개변수로 전달하며 같은 인덱스번호로 이동하도록 실행한다.

        }

    });

    var timer;
    var isAutoPlayPaused = false;
    
    // 오토플레이 실행 함수
    function autoPlay() {
        // 이전 타이머 해제
        clearInterval(timer);
    
        timer = setInterval(function(){
            if (!isAutoPlayPaused) {
                var nextIndex = (currentIdx + 1) % slideCount;
                goToSlide(nextIndex);
            }
        }, 4000); // 4초에 한 번씩 슬라이드가 변경되도록 설정 (기존과 같이 4초로 설정)
    }
    
    // 오토플레이 일시정지 함수
    function pauseAutoPlay() {
        clearInterval(timer);
        isAutoPlayPaused = true;
    }
    
    // 오토플레이 재시작 함수
    function resumeAutoPlay() {
        isAutoPlayPaused = false;
        autoPlay();
    }
    // visibilitychange 이벤트 핸들러
document.addEventListener("visibilitychange", function() {
    if (document.visibilityState === "visible") {
        // 슬라이드가 다시 보이는 상태일 때 오토플레이 재시작
        resumeAutoPlay();
    } else {
        // 슬라이드가 보이지 않는 상태일 때 오토플레이 일시정지
        pauseAutoPlay();
    }
});
    
    $(".play").click(function(){
        if (!isAutoPlayPaused && !overlapClick()) {
            autoPlay();
            console.log(overlapClickFlag);
        }
    });
    
    $(".pause").click(function(){
        if (!isAutoPlayPaused) {
            pauseAutoPlay();
            overlapClickFlag = false;
            console.log(overlapClickFlag);
        }
    });
    
    $(".next").click(function(){
        if (!isAutoPlayPaused) {
            // 다음 슬라이드로 이동
            var nextIndex = (currentIdx + 1) % slideCount;
            goToSlide(nextIndex);
    
            // 오토플레이 재시작
            resumeAutoPlay();
        }
    });
    
    $(".prev").click(function(){
        if (!isAutoPlayPaused) {
            // 이전 슬라이드로 이동
            var prevIndex = (currentIdx - 1 + slideCount) % slideCount;
            goToSlide(prevIndex);
    
            // 오토플레이 재시작
            resumeAutoPlay();
        }
    });




    // 플레이 버튼 중복 클릭 방지
    // 플레이 버튼을 계속해서 클릭하면 setInterval이 계속해서 중첩으로 실행되서 속도가 빨라진다.
    // 이를 방지하기 위해서 플래그 변수를 선언하고 불리언타입으로 값을 반환할 수 있게 설정해둔다.

    var overlapClickFlag = false;
    // 불리언타입의 플래그 변수(무언가를 기억하거나 다른 프로그램에게 약속된 신호를 남기기 위한 용도의 변수)

    function overlapClick() {

        if(overlapClickFlag) {  // 플래그변수가 true이면

            return overlapClickFlag;    //플래그변수를 return시킨다.

        } else {                // 플래그변수가 false이면

            overlapClickFlag = true;    // 플래그변수의 값은 true로 저장한 다음
            return false;               // false를 반환하고 종료

        }

    }
    // overlapClick()함수를 호출하면 최초 1회는 false를 반환, 2회부터는 계속 true를 반환
    // false를 한 번 return하고 나서는 다시 false를 반환하지 않고 계속 true만 반환

    $(document).ready(function() {
        $(".play").click()   
        });
    // ------------------------------------------------------------
        var isQuickReservationOpen = false;
      
        
        $("#quick_reservation_wrap").click(function(e) {
          e.stopPropagation(); // Prevent the click event from propagating to the document
         
          $("#boarding_date").css('pointer-events', 'auto');
      
          if (!isQuickReservationOpen) {
            
            // Move the #quick_reservation_wrap 600px upwards
            $(this).animate({
              top: "-=600px"
            }, 500);
            $("html, body").animate({
                scrollTop: 0
              }, 500);
            // Darken the background
        
            $("body").addClass("dark-overlay");
            $("#visual_big_wrap").addClass("dark");
      
            isQuickReservationOpen = true;
          }
        });
      
        $(document).click(function(e) {
            $("#boarding_date").css('pointer-events', 'none');
            $("#passenger_secret").hide();
            $("#main_go_secret_menu_wrap").hide();
            $("#destination_secret").hide();
            $("#seat_class_secret").hide();
          if (!$(e.target).closest("#quick_reservation_wrap").length && isQuickReservationOpen) {
           
            // Restore the original state of #quick_reservation_wrap
            $("#quick_reservation_wrap").animate({
              top: "0"
            }, 500);
      
            // Remove the dark overlay
            $("body").removeClass("dark-overlay");
            $("#visual_big_wrap").removeClass("dark");
            isQuickReservationOpen = false;
          }
        });

        $("#flight_booking").on("click",function(){
            $("#flight_booking").siblings().removeClass('quick_active');
            $("#flight_booking").siblings().find("span").removeClass('quick_icon_active');
            $("#flight_booking").siblings().find("p").removeClass('quick_p_active');
            $("#flight_booking").addClass('quick_active');
            $("#flight_booking_icon").addClass('quick_icon_active');
            $("#flight_booking p").addClass('quick_p_active');
            $("#flight_booking_zone").show();
            $("#flight_booking_zone").siblings().hide();
        });

        $("#check_in").on("click",function(){
            $("#check_in").siblings().removeClass('quick_active');
            $("#check_in").siblings().find("span").removeClass('quick_icon_active');
            $("#check_in").siblings().find("p").removeClass('quick_p_active');
            $("#check_in").addClass('quick_active');
            $("#check_in_icon").addClass('quick_icon_active');
            $("#check_in p").addClass('quick_p_active');
            $("#check_in_zone").show();
            $("#check_in_zone").siblings().hide();
        });

        $("#hotel_car_rental").on("click",function(){
            $("#hotel_car_rental").siblings().removeClass('quick_active');
            $("#hotel_car_rental").siblings().find("span").removeClass('quick_icon_active');
            $("#hotel_car_rental").siblings().find("p").removeClass('quick_p_active');
            $("#hotel_car_rental").addClass('quick_active');
            $("#hotel_car_rental_icon").addClass('quick_icon_active');
            $("#hotel_car_rental p").addClass('quick_p_active');
            $("#hotel_car_rental_zone").show();
            $("#hotel_car_rental_zone").siblings().hide();
        });

        $("#goback_select").on("click",function(){
            $("#goback_select").siblings().find('p').removeClass('select_active')
            $("#goback_select p").addClass('select_active');
            
        });

        $("#go_select").on("click",function(){
            $("#go_select").siblings().find("p").removeClass('select_active');
            $("#go_select p").addClass('select_active');
            
        });


        // -----------------------------------------------------
    
        $(document).ready(function() {
            // 변수 선언과 초기화
            var currentIdx = 0;
            var slideCount = $(".slide_item").length;
            var slideWidth = $(".slide_item").outerWidth(true);
            var visibleSlides = Math.floor($("#carousel").width() / slideWidth);
            var slideWrapperWidth = slideWidth * slideCount;
        
            // 슬라이드 아이템 복사본 만들기
            $(".slide_item").clone().appendTo("#carousel_slider");
        
            // 슬라이드 컨테이너와 슬라이드 아이템에 너비 설정
            $("#carousel_slider").css("width", slideWrapperWidth * 2);
        
            // 이전 버튼 클릭 이벤트 처리
            $("#carousel_prev").on("click", function() {
                if (currentIdx === 0) {
                    currentIdx = slideCount;
                    $("#carousel_slider").css("margin-left", -slideWidth * slideCount);
                }
                currentIdx--;
                var moveX = -currentIdx * slideWidth;
                $("#carousel_slider").animate({ "margin-left": moveX }, 300);
            });
        
            // 다음 버튼 클릭 이벤트 처리
            $("#carousel_next").on("click", function() {
                if (currentIdx === slideCount) {
                    currentIdx = 0;
                    $("#carousel_slider").css("margin-left", 0);
                }
                currentIdx++;
                var moveX = -currentIdx * slideWidth;
                $("#carousel_slider").animate({ "margin-left": moveX }, 300);
            });
        });
    // ------------------------------------------------------------
    $("#world_air_menu li:nth-of-type(1)").on("click", function(){
        $("#northeast_asia").siblings().hide();
        $("#northeast_asia").show();
    });
    $("#world_air_menu li:nth-of-type(2)").on("click", function(){
        $("#southeast_asia").siblings().hide();
        $("#southeast_asia").show();
    });
    $("#world_air_menu li:nth-of-type(3)").on("click", function(){
        $("#americas").siblings().hide();
        $("#americas").show();
    });
    $("#world_air_menu li:nth-of-type(4)").on("click", function(){
        $("#europe").siblings().hide();
        $("#europe").show();
    });
    $("#world_air_menu li:nth-of-type(5)").on("click", function(){
        $("#oceania").siblings().hide();
        $("#oceania").show();
    });
    $("#world_air_menu li:nth-of-type(6)").on("click", function(){
        $("#central_asia").siblings().hide();
        $("#central_asia").show();
    });
    
    $("#go_menu_table tbody tr td").on("click", function(){
        let textPoint = $(this).find("span").html();
        $("#go_station").val(textPoint);
        $("#main_go_secret_menu_wrap").hide();
    });
    $("#world_air_secret_menu ul li").on("click", function(){
        let textPoint = $(this).html();
        $("#go_station").val(textPoint);
        $("#main_go_secret_menu_wrap").hide();
    });


    $("#destination_air li:nth-of-type(1)").on("click", function(){
        $("#korea").siblings().hide();
        $("#korea").show();
    });
    $("#destination_air li:nth-of-type(2)").on("click", function(){
        $("#northeast_asia2").siblings().hide();
        $("#northeast_asia2").show();
    });
    $("#destination_air li:nth-of-type(3)").on("click", function(){
        $("#southeast_asia2").siblings().hide();
        $("#southeast_asia2").show();
    });
    $("#destination_air li:nth-of-type(4)").on("click", function(){
        $("#americas2").siblings().hide();
        $("#americas2").show();
    });
    $("#destination_air li:nth-of-type(5)").on("click", function(){
        $("#europe2").siblings().hide();
        $("#europe2").show();
    });
    $("#destination_air li:nth-of-type(6)").on("click", function(){
        $("#oceania2").siblings().hide();
        $("#oceania2").show();
    });
    $("#destination_air li:nth-of-type(7)").on("click", function(){
        $("#central_asia2").siblings().hide();
        $("#central_asia2").show();
    });

  

    $("#destination_air_secret ul li").on("click", function(){
        
        let textPoint = $(this).html();
        $("#destination").val(textPoint);
       
        if($("#go_station").val() == $("#destination").val()){
            $("#destination_secret").hide();
            alert("출발지와 도착지가 같으면 안됩니다.");
            $("#destination").val(null)
        }else{
            $("#destination_secret").hide();
        }
    });
 

    $(document).ready(function() {

        function updatePassengerText() {
            let adult = parseInt($("#adult").val());
            let young = parseInt($("#young").val());
            let baby = parseInt($("#baby").val());
    
            let passengerText = '';
            if (adult > 0) {
                passengerText += '성인' + adult + ' ';
            }
            if (young > 0) {
                passengerText += '소아' + young + ' ';
            }
            if (baby > 0) {
                passengerText += '유아' + baby;
            }
    
            $("#passenger").val(passengerText);
        }


    $("#adult_minus").on("click", function(){
        if($("#adult").val() > 0){
            if($("#baby").val() >= $("#adult").val()){
                alert("유아의 숫자가 성인보다 많을 수 없습니다");
                return false;
            } else {
                $("#adult").val(parseInt($("#adult").val()) - 1);
                updatePassengerText();
            }
        } else {
            return false;
        }
    });
    $("#adult_plus").on("click", function(){
        if($("#adult").val() < 5){
            $("#adult").val(parseInt($("#adult").val()) + 1);
            updatePassengerText();
        } else {
            return false;
        }
    });

    $("#young_minus").on("click", function(){
        if($("#young").val() > 0){
            $("#young").val(parseInt($("#young").val()) - 1);
            updatePassengerText();
        } else {
            return false;
        }
    });

    $("#young_plus").on("click", function(){
        if($("#young").val() < 5){
            $("#young").val(parseInt($("#young").val()) + 1);
            updatePassengerText();
        } else {
            return false;
        }
    });

    $("#baby_minus").on("click", function(){
        if($("#baby").val() > 0){
            $("#baby").val(parseInt($("#baby").val()) - 1);
            updatePassengerText();
        } else {
            return false;
        }
    });

    $("#baby_plus").on("click", function(){
        if($("#baby").val() < 5){
            if($("#baby").val() >= $("#adult").val()){
                alert("유아의 숫자가 성인보다 많을 수 없습니다");
                return false;
            } else {
                $("#baby").val(parseInt($("#baby").val()) + 1);
                updatePassengerText();
            }
        } else {
            return false;
        }
    });

});
$("#go_station").on("click",function(){
   if($("#destination") !="" || $("#destination") != null){
    $("#destination").val(null);
    $("#go_station").val(null);
    $("#destination_secret").hide();
    $("#passenger_secret").hide();
    $("#seat_class_secret").hide();
    $("#main_go_secret_menu_wrap").show();
   }else{
    $("#destination_secret").hide();
    $("#passenger_secret").hide();
    $("#seat_class_secret").hide();
    $("#main_go_secret_menu_wrap").show();
    $("#go_station").val(null);
   }
});
$("#destination").on("click",function(){
    if($("#go_station").val() == ""){
        $("#passenger_secret").hide();
        alert("출발지를 선택하세요");
    }else{
        $("#main_go_secret_menu_wrap").hide();
        $("#seat_class_secret").hide();
        $("#passenger_secret").hide();
        $("#destination_secret").show();

    }
});
$("#boarding_date").on("click",function(){
    $("#seat_class_secret").hide();
    $("#passenger_secret").hide();
    $("#main_go_secret_menu_wrap").hide();
    $("#destination_secret").hide();
});
$("#passenger").on("click",function(){
    $("#seat_class_secret").hide();
    $("#main_go_secret_menu_wrap").hide();
    $("#destination_secret").hide();
    $("#passenger_secret").show();
});
$("#seat_class").on("click",function(){
    $("#passenger_secret").hide();
    $("#main_go_secret_menu_wrap").hide();
    $("#destination_secret").hide();
    $("#seat_class_secret").show();
});
$("#select_passenger_check_btn").on("click",function(){

    $("#passenger_secret").hide();
});
$("#seat_class_check_btn").on("click",function(){
    $("#seat_class_secret").hide();
});

     $("#select_seat_class ul li").on("click",function(){
        $(this).siblings().removeClass('seat_class_active');
        $(this).addClass('seat_class_active');
        
     }); 

if($("#go_station").val() != "" && $("#destination").val() != "" && $("#boarding_date").val() != "" && $("#passenger").val() != "" && $("#seat_class").val() != ""){
    $("#go_check button").addClass('go_check_active');
}else{
    $("#go_check button").removeClass('go_check_active');
}

});

var fp = flatpickr(document.getElementById("boarding_date"), {
    'monthSelectorType': 'static',
    'locale': 'ko',
    'mode': 'range',
  });
  // 버튼 클릭 시 날짜 하루만 선택 가능하도록 설정
  if($("#go_select_p").hasClass('select_active')){
    var fp = flatpickr(document.getElementById("boarding_date"), {
        'monthSelectorType' : 'static',
        "locale": "ko",
        "mode": "single"
    });
    
 }else{
    var fp = flatpickr(document.getElementById("boarding_date"), {
        'monthSelectorType' : 'static',
        "locale": "ko",
        "mode": "range"
    });
 }
 
 



  