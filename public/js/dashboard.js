function validate() {
    if($('.p-form-row #accType').children('option:selected').val() === '') {
      $('#acc-check').addClass('fa fa-exclamation-circle');
    }
    else {
        $('#acc-check').removeClass('fa fa-exclamation-circle');
    }

}
function validate2() {
    if($('#mainImage').get(0).files.length === 0) {
        $('#img-check').addClass('fa fa-exclamation-circle');
        $('.img-input.mandatory1').css('border', '2px dashed red');
    }
    else {
        $('#img-check').removeClass('fa fa-exclamation-circle');
        $('.img-input.mandatory1').css('border', '2px dashed #666');
    }
    if($('#addImages').get(0).files.length === 0) {
        $('#img-check2').addClass('fa fa-exclamation-circle');
        $('.img-input.mandatory2').css('border', '2px dashed red');
    }
    else {
        $('#img-check2').removeClass('fa fa-exclamation-circle');
        $('.img-input.mandatory2').css('border', '2px dashed #666');
    }
}

function readURL(input) {
    if (input.files) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('.gallery#g1').empty();
            $('.gallery#g1').append('<img src="'+e.target.result+'">');
            $('.gallery#g1').show();
                
        };

        reader.readAsDataURL(input.files[0]);
        
    }
    else {
        $('.gallery#g1').empty().hide();
    }
    if($('#mainImage').get(0).files.length === 0) {
        $('#img-check').addClass('fa fa-exclamation-circle');
        $('.img-input.mandatory1').css('border', '2px dashed red');
    }
    else {
        $('#img-check').removeClass('fa fa-exclamation-circle');
        $('.img-input.mandatory1').css('border', '2px dashed #666');
    }
}
function readURL2(input) {
    if (input.files) {
        var filesAmount = input.files.length;
            $('.gallery#g2').empty();
            for (i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = function(e) {
                    $('.gallery#g2').append('<img src="'+e.target.result+'">');
                    $('.gallery#g2').show();
                }

                reader.readAsDataURL(input.files[i]);
            }
    }
    else {
        $('.gallery#g2').empty().hide();
    }
    if($('#addImages').get(0).files.length === 0) {
        $('#img-check2').addClass('fa fa-exclamation-circle');
        $('.img-input.mandatory2').css('border', '2px dashed red');
    }
    else {
        $('#img-check2').removeClass('fa fa-exclamation-circle');
        $('.img-input.mandatory2').css('border', '2px dashed #666');
    }
}

/*********api calls start form here********/

$.get('/product/getCategories', (categories) => {
    for(var i=0; i<categories.length; i++) {
        $('select#category').append('<option value="'+ categories[i].id +'">'+ categories[i].value +'</option>');
    }
});

$('select#category').change(function() {
    if($('select#category option:selected').val() !== '') {
        $.get('/product/getFeatures', {categoryId: parseInt($('select#category option:selected').val())}, (features) => {
            for(var i=0; i<features.length; i++) {
                $('.show-on-api-call').append('<div class="p-form-row"><label for="'+ features[i].value +'" class="add-dropdown-labels">'+ features[i].value + ' : </label><select name="'+ features[i].value +'" id="'+ features[i].value +'" class="add-dropdowns" required><option value="">Select</option></select><i class="fa fa-angle-down" id="arrow-down"></i></div>');
                $.get('/product/getFeatureOptions', {featureId: features[i].id}, (featureOptions) => {
                   for(var j=0; j<featureOptions.length; j++) {
                    $('.show-on-api-call select#'+features[i].value).append('<option value="'+ featureOptions[j].id +'">'+ featureOptions[j].value +'</option>');
                   }
                });
            }
        });
        
        $('.show-on-api-call').fadeIn('fast');
    }
    else {
        $('.show-on-api-call').fadeOut('fast');
    }
});

$.get('/product/getBrands', (brands) => {
    for(var i=0; i<brands.length; i++) {
        $('.p-form-row select#brand').append('<option value="'+ brands[i].id +'">'+ brands[i].value +'</option>');
    }
});

$.get('/product/getPTCs', (ptc) => {
    for(var i=0; i<ptc.length; i++) {
        $('.p-form-row select#ptc').append('<option value="'+ ptc[i].id +'">'+ ptc[i].value +'</option>');
    }
});

$('.add-product-form').submit(function(event) {
    event.preventDefault();

    var mainImage = new FormData();
    mainImage.append('image', $('#mainImage').get(0).files[0]);

    var moreImages = new FormData();
    for(var i=0; i<$('#addImages').get(0).files.length; i++) {
        product.append('moreImages', $('#addImages').get(0).files[i]);
    }

    $.ajax({
        type: 'POST',
        url: '/product/uploadImages',
        data: mainImage,
        processData: false,
		contentType: false,
        success: function(data1) {
            if(data1 === 'Please try again' || data1 === 'No files selected') {
                alert(data1);
            }
            else {
                $.ajax({
                    type: 'POST', 
                    url: '/product/uploadImages',
                    data: moreImages,
                    processData: false,
		            contentType: false,
                    success: function(data2) {
                        if(data2 === 'Please try again' || data2 === 'No files selected') {
                            alert(data2)
                        }
                        else {
                            var product = new FormData();
                            product.append('name', $('#prodName').val());
                            product.append('description', $('#description').val());
                            product.append('price', Number($('#price').val()));
                            product.append('categoryId',  parseInt($('select#category option:selected').val()));
                            product.append('brandId', parseInt($('select#brand option:selected').val()));
                            product.append('PTCId', parseInt($('select#ptc option:selected').val()));
                            product.append('image', data1[0]);
                            for(var i=0; i<data2.length; i++) {
                                product.append('moreImages', data2[i]);
                            }
                            for(var i=0; i<$('.show-on-api-call select').length; i++) {
                                var featureId = parseInt($('.show-on-api-call select:eq('+i+') option:selected').val());
                                product.append('featureOptions', featureId);
                            }
                    
                            $.ajax({
                                type: 'POST', 
                                url: '/product/createProduct',
                                data: product,
                                processData: false,
                                contentType: false,
                                success: function(data) {
                                    if(typeof data === 'string' && data.startsWith('Error')) {
                                        alert('An error occured. Please Try again!');
                                    }
                                    else if(typeof data === 'object') {
                                        if(!alert('Product added successfully!')) window.location.reload(true);
                                    }
                                }
                            })
                        }
                    }
                })
            }
        }
    })
});

$('.bank-info-form').submit(function(event) {
    event.preventDefault();

    var bankInfo = {
        name: $('.p-form-row #holderName').val(),
        number: $('.p-form-row #accNumber').val(),
        type: $('.p-form-row #accType option:selected').val(),
        IFSC: $('.p-form-row #ifsc').val()
    }

    $.post('partner/updateBank', bankInfo, (data) => {
        if(typeof data === 'string' && data.startsWith('Error')) {
            alert('An error occurred! Please try again');
        }
        else {
            if(!alert('Updated successfully!')) window.location.reload(true);
        }
    });
});

$('.tax-info-form').submit(function(event) {
    event.preventDefault();

    $.post('/partner/updateTax', {PAN: $('.p-form-row #pan').val(), GST: $('.p-form-row #gst').val()}, (data) => {
        if(typeof data === 'string' && data.startsWith('Error')) {
            alert('An error occurred! Please try again');
        }
        else {
            if(!alert('Updated successfully!')) window.location.reload(true);
        }
    })
})
