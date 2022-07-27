class StickyNavigation {

    constructor() {
        this.currentId = null;
        this.currentTab = null;
        this.tabContainerHeight = 70;
        let self = this;
        $(".et-hero-tab").click(function () {
            self.onTabClick(event, $(this));
        });
        $(window).scroll(() => {
            this.onScroll();
        });
        $(window).resize(() => {
            this.onResize();
        });
    }

    onTabClick(event, element) {
        event.preventDefault();
        let scrollTop =
            $(element.attr("href")).offset().top - this.tabContainerHeight + 1;
        $("html, body").animate({ scrollTop: scrollTop }, 600);
    }

    onScroll() {

        //Remove this too
        // this.checkTabContainerPosition();
        this.findCurrentTabSelector();
        this.checkTabHeaderPosition();
    }

    onResize() {
        if (this.currentId) {
            this.setSliderCss();
        }
    }

    // Remove this
    // checkTabContainerPosition() {
    //     let offset =
    //         $(".et-hero-tabs").offset().top +
    //         $(".et-hero-tabs").height() -
    //         this.tabContainerHeight;
    //     if ($(window).scrollTop() > offset) {
    //         $(".et-hero-tabs-container").addClass("et-hero-tabs-container--top");
    //     } else {
    //         $(".et-hero-tabs-container").removeClass("et-hero-tabs-container--top");
    //     }
    // }

    checkTabHeaderPosition() {
        let offset =
            $(".header").offset().top +
            $(".header").height() -
            this.tabContainerHeight;
        if ($(window).scrollTop() > offset) {
            $(".header").addClass("header--top");
        }
        // else {
        //     $(".header").removeClass("header--top");
        // }
    }

    findCurrentTabSelector(element) {
        let newCurrentId;
        let newCurrentTab;
        let self = this;
        $(".et-hero-tab").each(function () {
            let id = $(this).attr("href");
            let offsetTop = $(id).offset().top - self.tabContainerHeight;
            let offsetBottom =
                $(id).offset().top + $(id).height() - self.tabContainerHeight;
            if (
                $(window).scrollTop() > offsetTop &&
                $(window).scrollTop() < offsetBottom
            ) {
                newCurrentId = id;
                newCurrentTab = $(this);
            }
        });
        if (this.currentId != newCurrentId || this.currentId === null) {
            this.currentId = newCurrentId;
            this.currentTab = newCurrentTab;
            this.setSliderCss();
        }
    }

    setSliderCss() {
        let width = 0;
        let left = 0;
        if (this.currentTab) {
            width = this.currentTab.css("width");
            left = this.currentTab.offset().left;
        }
        $(".et-hero-tab-slider").css("width", width);
        $(".et-hero-tab-slider").css("left", left);
    }
}

new StickyNavigation();

// Image Slider - Owl Carousel
$(document).ready(function () {

    $("#owl-demo").owlCarousel({

        navigation: true, // Show next and prev buttons

        slideSpeed: 300,
        paginationSpeed: 400,

        items: 1,
        itemsDesktop: false,
        itemsDesktopSmall: false,
        itemsTablet: false,
        itemsMobile: false

    });



    // Observes the height of the navbar and gives paddingtop to the section below it
    const currentTopHeaderObserver = new ResizeObserver(function (entries) {
        let currentItem = entries[0].contentRect;

        let height = currentItem.height;

        document.getElementById("top-section").style.paddingTop = `${height + 2}px`;

        console.log('Current Height : ' + height);
    });

    // start observing for resize
    currentTopHeaderObserver.observe(document.querySelector("#top-header"));


});
