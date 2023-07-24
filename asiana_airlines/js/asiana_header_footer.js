$(function(){
    $("#nav, #secret_nav_wrap").hover(
        function() {
            $("#secret_nav_wrap").stop().slideDown();
        },
        function() {
            $("#secret_nav_wrap").mouseleave(function() {
                $("#secret_nav_wrap").stop().slideUp();
                $("#nav").children().find("a").removeClass("nav_title_active");
            });
        }
    );
    
    $("#nav").mouseleave(function() {
        $("#secret_nav_wrap").stop().slideUp();
        $("#nav").children().find("a").removeClass("nav_title_active");
        
    });
   
    $("#reservation_nav_wrap").mouseover(function(){
        $("#reservation_title").addClass("nav_title_active");
    });
    $("#travel_preparation_nav_wrap").mouseover(function(){
        $("#travel_preparation_title").addClass("nav_title_active");
    });
    $("#travel_nav_wrap").mouseover(function(){
        $("#travel_title").addClass("nav_title_active");
    });
    $("#asiana_club_nav_wrap").mouseover(function(){
        $("#asiana_title").addClass("nav_title_active");
    });
    
    $("#reservation_title").hover(
            function(){
                $(this).parents().siblings().children().removeClass("nav_title_active");
                $(this).addClass("nav_title_active");
                $("#reservation_nav_wrap").show()
                $("#reservation_nav_wrap").siblings().hide();
    });
   
    $("#travel_preparation_title").hover(
        function(){
            $(this).parents().siblings().children().removeClass("nav_title_active");
            $(this).addClass("nav_title_active");
            $("#travel_preparation_nav_wrap").siblings().hide();
            $("#travel_preparation_nav_wrap").show()
        }
    )
    $("#travel_title").hover(
        function(){
            $(this).parents().siblings().children().removeClass("nav_title_active");
            $(this).addClass("nav_title_active");
            $("#travel_nav_wrap").siblings().hide();
            $("#travel_nav_wrap").show()
        }
    )
    $("#asiana_title").hover(
        function(){
            $(this).parents().siblings().children().removeClass("nav_title_active");
            $(this).addClass("nav_title_active");
            $("#asiana_club_nav_wrap").siblings().hide();
            $("#asiana_club_nav_wrap").show()
        }
    )
   

});