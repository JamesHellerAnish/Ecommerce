var queryString = location.search.substring(1);
var c = queryString.split('&');
var categoryId = Number(c[0]);
var categoryName = c[1];
console.log(categoryId)
if(queryString === '') {
    window.location.href = 'index.html';
}

$('h1.category-name').html(categoryName);

var itemString = '<div class="col-6 col-lg-3 ftco-animate"><div class="product"><a href="#" class="img-prod"><img class="img-fluid" src="" alt=""><div class="overlay"></div></a><div class="text py-3 px-3"><h3><a href="#" class="product-names"></a><span class="product-id"></span></h3><div class="d-flex"><div class="pricing"><p class="price">&#8377 <span></span></p></div></div><p class="bottom-area d-flex px-3"><a href="#" class="add-to-cart text-center py-2 mr-1"><span>Add to cart</span></a><a href="#" class="buy-now text-center py-2">Buy now<span></span></a></p></div></div></div>';
var pageString = '<li class="pagination-num"><a href="#"><span></span></a></li>';

var sidebarString = '<div class="sidebar-box-2"><h2 class="heading mb-2 side-categories"><span style="float: right;">+</span></h2><ul class="side-drop"></ul><hr style="margin-top: 0px;"></div>';

$.get('/product/getFeatures', {categoryId: categoryId}, (features) => {
    console.log(features)
    for(var i=0; i<features.length; i++) {
        $('.row .sidebar').append(sidebarString);
        $('.sidebar-box-2 h2.heading.side-categories:eq('+i+')').prepend(features[i].value);
        $('ul.side-drop:eq('+i+')').attr('data-feature-id', features[i].id);
        $.get('/product/getFeatureOptions', {featureId: features[i].id}, (featureOptions) => {
            console.log(featureOptions)
            for(var j=0; j<featureOptions.length; j++) {
                $('ul.side-drop:eq('+i+')').append('<li><input type="checkbox" id="'+featureOptions[j].value.split(" ").join("-")+'" data-feature-option-id="'+featureOptions[j].id+'">&emsp;<label for="'+featureOptions[j].value.split(" ").join("-")+'">'+featureOptions[j].value+'</label></li>');
            }
            
        })
        
    }
});

var numOnOne = 12; //number of cards on one page

$.get('/product/getProducts', {categoryId: categoryId}, (data)=>{
    console.log(data)
    var filterData;

    //function to add product card
    function addProduct(x, y) {
        $('.row-products').append(itemString);
        if(typeof filterData === 'undefined') {
            $('.price:eq('+ x +') span').html(data[y].price);
            $('.img-prod:eq('+ x +') img').attr('src', data[y].image);
            $('.product-names:eq('+ x + ')').html(data[y].name);
            $('.product-id:eq('+ x + ')').html(data[y].id);
        }
        else {
            $('.price:eq('+ x +') span').html(filterData[y].price);
            $('.img-prod:eq('+ x +') img').attr('src', filterData[y].image);
            $('.product-names:eq('+ x + ')').html(filterData[y].name);
            $('.product-id:eq('+ x + ')').html(filterData[y].id);
        }
        $('.col-6.col-lg-3.ftco-animate:eq('+ x +')').addClass('fadeInUp ftco-animated');
    }

    //page one construction
    var upper = numOnOne;
    if(data.length < numOnOne) {
        upper = data.length;
    }
    for(var i=0; i<upper; i++) {
        addProduct(i, i);
    }

    //construction of pagination
    var pages = parseInt(data.length/numOnOne);
    if(data.length%numOnOne !== 0) pages++; 
    $('.block-27 ul').append('<li class="prev-page"><a href="#">&lt;</a></li>');
    for(var i=1; i<=pages; i++) {
        $('.block-27 ul').append(pageString);
        if(i===1) $('.block-27 ul li:eq(1)').addClass('active');
        $('.block-27 ul li:eq('+ i +')').find('span').html(i);
    }
    $('.block-27 ul').append('<li class="next-page"><a href="#">&gt;</a></li>');

    //next click of pagination
    $('.next-page').click(function() {
        var active = $('.block-27 .active');
        if(active.next().hasClass('next-page') === false) {
            active.removeClass('active');
            active.next().addClass('active');
        }

        var pageNum = parseInt($('.block-27 .active').find('span').html());
        $('.row-products').empty();
        var min = numOnOne*(pageNum-1);
        var max = numOnOne*pageNum;
        if(typeof filterData === 'undefined') {
            if(max > data.length) {
                max = data.length;
            }
        }
        else {
            if(max > filterData.length) {
                max = filterData.length;
            }
        }
        
        for(var i=min; i<max; i++) {
            addProduct(i%numOnOne, i);
        }
        
    });

    //prev-click of pagination
    $('.prev-page').click(function() {
        var active = $('.block-27 .active');
        if(active.prev().hasClass('prev-page') === false) {
            active.removeClass('active');
            active.prev().addClass('active');
        }

        var pageNum = parseInt($('.block-27 .active').find('span').html());
        $('.row-products').empty();
        var min = numOnOne*(pageNum-1);
        var max = numOnOne*pageNum;
        if(typeof filterData === 'undefined') {
            if(max > data.length) {
                max = data.length;
            }
        }
        else {
            if(max > filterData.length) {
                max = filterData.length;
            }
        }
        for(var i=min; i<max; i++) {
            addProduct(i%numOnOne, i);
        }
    });

    //page click of pagination
    $('.pagination-num').click(function() {
        var active = $('.block-27 .active');
        active.removeClass('active');
        $(this).addClass('active');

        var pageNum = parseInt($(this).find('span').html());
        $('.row-products').empty();
        var min = numOnOne*(pageNum-1);
        var max = numOnOne*pageNum;
        if(typeof filterData === 'undefined') {
            if(max > data.length) {
                max = data.length;
            }
        }
        else {
            if(max > filterData.length) {
                max = filterData.length;
            }
        }
        for(var i=min; i<max; i++) {
            addProduct(i%numOnOne, i);
        }
    });

    /****sorting****/

    //high to low
    $('#h2l').click(function() {
        $('span.sort-method-selected').html($(this).html());
        if(typeof filterData === 'undefined') {
            data.sort((a, b) => (a.price < b.price) ? 1 : -1);
        }
        else {
            filterData.sort((a, b) => (a.price < b.price) ? 1 : -1);
            data.sort((a, b) => (a.price < b.price) ? 1 : -1);
        }
        $('.block-27 ul li:eq(1)').click();
    });

    //low to high
    $('#l2h').click(function() {
        $('span.sort-method-selected').html($(this).html());
        if(typeof filterData === 'undefined') {
            data.sort((a, b) => (a.price > b.price) ? 1 : -1);
        }
        else {
            filterData.sort((a, b) => (a.price > b.price) ? 1 : -1);
            data.sort((a, b) => (a.price > b.price) ? 1 : -1);
        }
        $('.block-27 ul li:eq(1)').click();
    });

    //newest arrivals
    $('#na').click(function() {
        $('span.sort-method-selected').html($(this).html());
        if(typeof filterData === 'undefined') {
            data.sort((a, b) => (a.id > b.id) ? 1 : -1);
        }
        else {
            filterData.sort((a, b) => (a.id > b.id) ? 1 : -1);
            data.sort((a, b) => (a.id > b.id) ? 1 : -1);
        }
        $('.block-27 ul li:eq(1)').click();
    });

    //Z to A
    $('#z2a').click(function() {
        $('span.sort-method-selected').html($(this).html());
        if(typeof filterData === 'undefined') {
            data.sort((a, b) => (a.name < b.name) ? 1 : -1);
        }
        else {
            filterData.sort((a, b) => (a.name < b.name) ? 1 : -1);
            data.sort((a, b) => (a.name < b.name) ? 1 : -1);
        }
        $('.block-27 ul li:eq(1)').click();
    });

    //A to Z
    $('#a2z').click(function() {
        $('span.sort-method-selected').html($(this).html());
        if(typeof filterData === 'undefined') {
            data.sort((a, b) => (a.name > b.name) ? 1 : -1);
        }
        else {
            filterData.sort((a, b) => (a.name > b.name) ? 1 : -1);
            data.sort((a, b) => (a.name > b.name) ? 1 : -1);
        }
        $('.block-27 ul li:eq(1)').click();
    });


    $('ul.side-drop li input[type=checkbox]').click(function(){
        var checked = $('.sidebar input[type=checkbox]:checked').length;
        if(checked === 0) {
            filterData = undefined;
            $('.row-products').empty();
            //page one construction
            var upper = numOnOne;
            if(data.length < numOnOne) {
                upper = data.length;
            }
            for(var i=0; i<upper; i++) {
                addProduct(i, i);
            }

            //construction of pagination
            $('.block-27 ul').empty();
            var pages = parseInt(data.length/numOnOne);
            if(data.length%numOnOne !== 0) pages++; 
            $('.block-27 ul').append('<li class="prev-page"><a href="#">&lt;</a></li>');
            for(var i=1; i<=pages; i++) {
                $('.block-27 ul').append(pageString);
                if(i===1) $('.block-27 ul li:eq(1)').addClass('active');
                $('.block-27 ul li:eq('+ i +')').find('span').html(i);
            }
            $('.block-27 ul').append('<li class="next-page"><a href="#">&gt;</a></li>');
            $('.block-27 ul li:eq(1)').click();
        }
        else {
            filterData = data.filter((obj) => {
                var featoptarray = obj.featureOptions;
                for(var i=0; i<$('ul.side-drop').length; i++) {
                    var fId = Number($('ul.side-drop:eq('+i+')').attr('data-feature-id'));
                    var fOId = [];
                    for(var j=0; j<$('ul.side-drop:eq('+i+') input[type=checkbox]').length; j++) {
                        if($('ul.side-drop:eq('+i+') input[type=checkbox]:eq('+j+')').prop('checked')) {
                            fOId.push(Number($('ul.side-drop:eq('+i+') input[type=checkbox]:eq('+j+')').attr('data-feature-option-id')));
                        }
                    }
                    if(fOId.length) {
                        if(!fOId.includes(featoptarray.filter((ob) => ob.featureId === fId)[0].id)) return false;
                    }
                }
                return true;
            })
            $('.row-products').empty();
            //page one construction
            var upper = numOnOne;
            if(filterData.length < numOnOne) {
                upper = filterData.length;
            }
            for(var i=0; i<upper; i++) {
                addProduct(i, i);
            }

            //construction of pagination
            $('.block-27 ul').empty();
            var pages = parseInt(filterData.length/numOnOne);
            if(filterData.length%numOnOne !== 0) pages++; 
            $('.block-27 ul').append('<li class="prev-page"><a href="#">&lt;</a></li>');
            for(var i=1; i<=pages; i++) {
                $('.block-27 ul').append(pageString);
                if(i===1) $('.block-27 ul li:eq(1)').addClass('active');
                $('.block-27 ul li:eq('+ i +')').find('span').html(i);
            }
            $('.block-27 ul').append('<li class="next-page"><a href="#">&gt;</a></li>');
            $('.block-27 ul li:eq(1)').click();
        }

        //next click of pagination
        $('.next-page').click(function() {
            var active = $('.block-27 .active');
            if(active.next().hasClass('next-page') === false) {
                active.removeClass('active');
                active.next().addClass('active');
            }

            var pageNum = parseInt($('.block-27 .active').find('span').html());
            $('.row-products').empty();
            var min = numOnOne*(pageNum-1);
            var max = numOnOne*pageNum;
            if(typeof filterData === 'undefined') {
                if(max > data.length) {
                    max = data.length;
                }
            }
            else {
                if(max > filterData.length) {
                    max = filterData.length;
                }
            }
            
            for(var i=min; i<max; i++) {
                addProduct(i%numOnOne, i);
            }
            
        });

        //prev-click of pagination
        $('.prev-page').click(function() {
            var active = $('.block-27 .active');
            if(active.prev().hasClass('prev-page') === false) {
                active.removeClass('active');
                active.prev().addClass('active');
            }

            var pageNum = parseInt($('.block-27 .active').find('span').html());
            $('.row-products').empty();
            var min = numOnOne*(pageNum-1);
            var max = numOnOne*pageNum;
            if(typeof filterData === 'undefined') {
                if(max > data.length) {
                    max = data.length;
                }
            }
            else {
                if(max > filterData.length) {
                    max = filterData.length;
                }
            }
            for(var i=min; i<max; i++) {
                addProduct(i%numOnOne, i);
            }
        });

        //page click of pagination
        $('.pagination-num').click(function() {
            var active = $('.block-27 .active');
            active.removeClass('active');
            $(this).addClass('active');

            var pageNum = parseInt($(this).find('span').html());
            $('.row-products').empty();
            var min = numOnOne*(pageNum-1);
            var max = numOnOne*pageNum;
            if(typeof filterData === 'undefined') {
                if(max > data.length) {
                    max = data.length;
                }
            }
            else {
                if(max > filterData.length) {
                    max = filterData.length;
                }
            }
            for(var i=min; i<max; i++) {
                addProduct(i%numOnOne, i);
            }
        });
    })

});