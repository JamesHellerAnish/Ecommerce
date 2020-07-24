$(document).ready(function() {

    var subTotal = 0;
    for(var i=0; i<$('.cart-prod-total-price').length; i++) {
        var quantity = parseInt($('.cart-prod-quantity:eq('+i+')').val());
        var actualPrice = Number($('.cart-prod-actual-price:eq('+i+')').html());
        subTotal += actualPrice*quantity;
        $('.cart-prod-total-price:eq('+i+')').html(actualPrice*quantity);
        $('.cart-prod-total-price-mobile:eq('+i+')').html(actualPrice*quantity);
    }
    var discount = Number($('.cart-discount').html());
    var delivery = Number($('.cart-delivery-charge').html());

    $('.cart-sub-total').html(subTotal);
    $('.cart-final-total').html(subTotal-discount+delivery);

    $('.quantity-right-plus').click(function(e){
        
        e.preventDefault();
        var index = $('.quantity-right-plus').index(this);
        var quantity = parseInt($('.cart-prod-quantity:eq('+index+')').val());
        
        if(quantity < 10)  {
            $('.cart-prod-quantity:eq('+index+')').val(++quantity);
            var actualPrice = Number($('.cart-prod-actual-price:eq('+index+')').html());
            $('.cart-prod-total-price:eq('+index+')').html(actualPrice*quantity);
            $('.cart-prod-total-price-mobile:eq('+index+')').html(actualPrice*quantity);
            subTotal += actualPrice;
            $('.cart-sub-total').html(subTotal);
            $('.cart-final-total').html(subTotal-discount+delivery);
        }
        
        
    });

        $('.quantity-left-minus').click(function(e){
        
        e.preventDefault();
        var index = $('.quantity-left-minus').index(this);
        var quantity = parseInt($('.cart-prod-quantity:eq('+index+')').val());
    
            if(quantity > 1){
                $('.cart-prod-quantity:eq('+index+')').val(--quantity);
                var actualPrice = Number($('.cart-prod-actual-price:eq('+index+')').html());
                $('.cart-prod-total-price:eq('+index+')').html(actualPrice*quantity);
                $('.cart-prod-total-price-mobile:eq('+index+')').html(actualPrice*quantity);
                subTotal -= actualPrice;
                $('.cart-sub-total').html(subTotal);
                $('.cart-final-total').html(subTotal-discount+delivery);
            }
        
    });
})