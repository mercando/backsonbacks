$(document).ready(function(){

  // Define nav and variable needed 
  var lastId,
      nav = $("nav"),
      navHeight = nav.outerHeight(),
      navItems = nav.find("a"),
      sections = navItems.map(function(){
        var item = $(this).attr("id");
        if (item.length) { return item; }
      });
  
  // Scroll user to section when navigation is clicked
  $(navItems).click(function(){
    var sectionName = $(this).attr("id")
        destination = $("section." + sectionName).offset().top;
    $("html,body").animate({
      scrollTop: destination - navHeight + 1
    }, 500);
    return false;        
  });

  // Monitor the current scroll position + execute on change.
  $(window).scroll(function(){
    var scrollPosition = $(this).scrollTop() + navHeight;

    //Calculate which section the user is currently in.
    var currentSection = sections.map(function(){
      var current = $("section." + this),
          currentTop = $(current).offset().top,
          currentBottom = $(current).offset().top + $(current).outerHeight();
      if (currentTop < scrollPosition && currentBottom > scrollPosition)
        return this;         
    });

    var id = currentSection[currentSection.length - 1];

    //If the section changes, update the navigation.
    if (lastId !== id) {
      lastId = id;
      navItems.parent().removeClass("active");
      navItems.filter("[id = " + lastId + "]").parent().addClass("active")
    }
  });
});
