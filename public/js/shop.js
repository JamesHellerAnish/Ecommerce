
var itemString = '<div class="col-6 col-lg-3 ftco-animate"><div class="product"><a href="#" class="img-prod"><img class="img-fluid" src="" alt=""><div class="overlay"></div></a><div class="text py-3 px-3"><h3><a href="#" class="product-names"></a><span class="product-id"></span></h3><div class="d-flex"><div class="pricing"><p class="price">&#8377 <span></span></p></div></div><p class="bottom-area d-flex px-3"><a href="#" class="add-to-cart text-center py-2 mr-1"><span>Add to cart</span></a><a href="#" class="buy-now text-center py-2">Buy now<span></span></a></p></div></div></div>';
var pageString = '<li class="pagination-num"><a href="#"><span></span></a></li>';

var numOnOne = 12; //number of cards on one page

$.get('/product/getProducts', (data)=>{

    //function to add product card
    function addProduct(x, y) {
        $('.row-products').append(itemString);
        $('.price:eq('+ x +') span').html(data[y].price);
        $('.img-prod:eq('+ x +') img').attr('src', data[y].image);
        $('.product-names:eq('+ x + ')').html(data[y].name);
        $('.product-id:eq('+ x + ')').html(data[y].id);
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
        if(max > data.length) {
            max = data.length;
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
        if(max > data.length) {
            max = data.length;
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
        if(max > data.length) {
            max = data.length;
        }
        for(var i=min; i<max; i++) {
            addProduct(i%numOnOne, i);
        }
    });

    /****sorting****/

    //high to low
    $('#h2l').click(function() {
        data.sort((a, b) => (a.price < b.price) ? 1 : -1);
        $('.block-27 ul li:eq(1)').click();
    });

    //low to high
    $('#l2h').click(function() {
        data.sort((a, b) => (a.price > b.price) ? 1 : -1);
        $('.block-27 ul li:eq(1)').click();
    });

    //newest arrivals
    $('#na').click(function() {
        data.sort((a, b) => (a.id > b.id) ? 1 : -1);
        $('.block-27 ul li:eq(1)').click();
    });

});

