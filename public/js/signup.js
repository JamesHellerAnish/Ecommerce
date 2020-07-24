$('#login-head').click(function() {
    $('.page-sign-up').fadeOut('fast', function() {
        $('.page-login').fadeIn('fast');
    });
    
    $('#sign-up-head').removeClass('head-active');
    $('#login-head').addClass('head-active');
  });
  $('#sign-up-head').click(function() {
    $('.page-login').fadeOut('fast', function() {
        $('.page-sign-up').fadeIn('fast');
    });
    $('#sign-up-head').addClass('head-active');
    $('#login-head').removeClass('head-active');
  });

  $('#eye1').click(function() {
      $('#eye1').toggleClass('fa-eye');
      $('#eye1').toggleClass('fa-eye-slash');
      var input = $('#password1');
      if(input.attr('type') === 'password') {
          input.attr('type', 'text');
      }
      else {
        input.attr('type', 'password');
      }
  });
  $('#eye2').click(function() {
      $('#eye2').toggleClass('fa-eye');
      $('#eye2').toggleClass('fa-eye-slash');
      var input = $('#password2');
      if(input.attr('type') === 'password') {
          input.attr('type', 'text');
      }
      else {
        input.attr('type', 'password');
      }
  });

$('.form-row #phone').change(function() {
  var phone = document.getElementById('phone');
  if(phone.checkValidity()) {
    $('.send-otp').css('cursor', 'pointer');
  }
  else {
    $('.send-otp').css('cursor', 'not-allowed');
  }
})
$('.send-otp').hover(function(){
  if(phone.checkValidity()) {
    $('.send-otp').css('text-decoration', 'underline');
  }
}, function() {
  if(phone.checkValidity()) {
    $('.send-otp').css('text-decoration', 'none');
  }
})

/******api calls****/

$('.send-otp').click(function() {
  var phone = document.getElementById('phone');
  if(phone.checkValidity()) {
    $.post('/login/sendOTP', {phoneNumber: Number($('.form-row #phone').val())}, (data) => {
      if(data.type === 'success') {
        alert("OTP sent successfully!");
      }
      else if(data.type === 'error') {
        alert('An error occurred! Please try again');
      }
      $('.resend-otp').fadeIn();
    })
  }
})

$('.resend-otp').click(function() {
  var phone = document.getElementById('phone');
  if(phone.checkValidity()) {
    $.post('/login/resendOTP', {phoneNumber: Number($('.form-row #phone').val())}, (data) => {
      if(data.type === 'success') {
        alert('OTP sent successfully!');
      }
      else if(data.type === 'error') {
        alert('An error occurred! Please try again');
      }
    })
  }
})

$('.page-sign-up #signup-form').submit(function(event) {
  event.preventDefault();
  $.post('/login/verifyOTP', {phoneNumber: Number($('.form-row #phone').val()), otp: Number($('.form-row #otp').val())}, (data) => {
    if(data.type === 'success') {

      var credentials = {
        username: $('.form-row #username1').val(),
        password: $('.form-row #password1').val(),
        firstName: $('.form-row #first-name').val(),
        lastName: $('.form-row #last-name').val(),
        mainPhoneNumber: Number($('.form-row #phone').val()),
        mainEmail: $('.form-row #email').val()
      }
      $.post('/login/signup', credentials, (user) => {
        if(typeof user === 'object') {
          if(!alert('Registered successfully! Login to continue')) window.location.reload(true);
        }
        else {
          alert('An error occurred! Please try again');
        }
      })
    }
    else if(data.type === 'error') {
      alert('Verification failed! Please try again');
    }
  })
})