$(document).ready(function () {
    // pagination buttons
    var more = $("#more");
    var nomore = $("#nomore");

    // feed settings
    var feed = new Instafeed({
        get: 'user',
        userId: 1734062083,
        accessToken: '1734062083.1677ed0.1c47c0fc159f401ab6f79d65365c3516',
        //userId: 4689975907,
        //accessToken: '4689975907.1677ed0.67f7d8de8a974a1d96708f58df8dce76',
        tagName: 'flushing',
        target: 'instafeed',
        limit: 15, // max 60
        sortBy: 'most-recent',
        resolution: 'standard_resolution',
        // when each set of images are loaded... *
        after: function () {
            // * check for more images
            if (!this.hasNext()) {
                more.hide();
                nomore.show();
            } else {
                more.show();
                nomore.hide();
            }
            // * animate new set of images and add class to each image
            $('.image').not('.animated').velocity('transition.slideUpIn', {
                stagger: 150
            }).addClass('animated');
            // * cache location name
            var loc = $(".location");
            // * hide location if not set
            loc.each(function () {
                if ($(this).is(':empty')) {
                    var locParent = $(this).parent();
                    locParent.css('visibility', 'hidden').insertAfter(locParent.next());
                }
            });
        },
        // for each image... *
        filter: function (image) {
            // * create new date object and pass in image date
            var date = new Date(image.created_time * 1000);
            // * create months array
            var months = new Array(12);
            months[0] = 'January';
            months[1] = 'February';
            months[2] = 'March';
            months[3] = 'April';
            months[4] = 'May';
            months[5] = 'June';
            months[6] = 'July';
            months[7] = 'August';
            months[8] = 'September';
            months[9] = 'October';
            months[10] = 'November';
            months[11] = 'December';
            // * parse month, day and year
            month = date.getMonth();
            day = date.getDate();
            year = date.getFullYear();
            // * concatenate and assign time
            var time = months[month] + ' ' + day + ', ' + year;
            image.created_time = time;
            // * end function execution
            return true;
        },
        template: '<a class="image" href="{{link}}"><span class="filter">{{model.filter}}</span><img src="{{image}}" alt="Instagram Photo"><div class="info"><p class="caption">{{caption}}</p><p class="location"><i class="fa fa-compass hidden-icon"></i>{{location}}</p><p class="likes"><i class="fa fa-heart"></i>{{likes}}</p><p class="date">{{model.created_time}}</p></div></a>'
    });

    // pagination binding
    more.on('click', function () {
        feed.next();
    });

    // initialize feed
    feed.run();
});
