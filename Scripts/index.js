$(document).ready(function () {
  $('#MobileNoText').keyup(function (event) {
    if (isNaN(String.fromCharCode(event.which))) {
      var value = $(this).val();
      $(this).val(value.substr(0, value.length - 1));
    }
    else 
    {
       var value = $(this).val();
        $(this).val(value);
    }
  });
  $('#NameText,#MaskPlacetxt').keyup(function (e) {
    if (
      (e.which >= 65 && e.which <= 90) ||
      (e.which >= 97 && e.which <= 122) ||
      e.which <= 32
    ) {
      return true;
    } else {
      var value = $(this).val();
      $(this).val(value.substr(0, value.length - 1));
    }
  });
  $('#latitudeTxt,#longitudeTxt').keyup(function (event) {
    if (
      (isNaN(String.fromCharCode(event.which)) && event.which != 190) ||
      event.which == 32
    ) {
      var value = $(this).val();
      $(this).val(value.substr(0, value.length - 1));
    }
  });

  // Validate Username
  $('#usercheck').hide();
  let usernameError = true;
  let emailError = true;
  let MobileError = true;
  $('#NameText').keyup(function () {
    validateUsername();
  });
  $('#MaskPlacetxt').blur(function () {
    if ($('#MaskPlacetxt').val() != '') {
      $('#lblPlace').hide();
    }
  });
  $('#EmailText').blur(function () {
    validateEmail();
  });
  $('#MobileNoText').on('blur', function () {
    ValidateMobile();
  });
  function validateUsername() {
    let usernameValue = $('#NameText').val();
    if (usernameValue.length == '') {
      $('#usercheck').show();
      usernameError = false;
      return false;
    } else if (usernameValue.length < 3 || usernameValue.length > 40) {
      $('#usercheck').show();
      $('#usercheck').html('**length of username must be between 3 and 10');
      usernameError = false;
      return false;
    } else {
      $('#usercheck').hide();
    }
  }
  function ValidateMobile() {
    var mobNum = document.getElementById('MobileNoText');
    //var filter = /^\d*(?:\.\d{1,2})?$/; //[a-z]{1}
    var filter = /^([6-9]{1})+([0-9]{9})?$/; //[6-9]{1}
    // alert(mobNum.value.length);
    if (mobNum.value == '') {
      $('#MobileCheck').show();
      MobileError = false;
      return false;
    } else if (mobNum.value.length != 10) {
      $('#MobileCheck').html('**Not a valid number');
      $('#MobileCheck').show();
      MobileError = false;
      return false;
    } else if (filter.test(mobNum.value) == false) {
      $('#MobileCheck').html('**Not a valid number');
      $('#MobileCheck').show();
      MobileError = false;
      return false;
    } else {
      $('#MobileCheck').hide();
      MobileError = true;
      return true;
    }
  }
  // Validate Email
  function validateEmail() {
    const email = document.getElementById('EmailText');
    // email.addEventListener('blur', () => {
    let regex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
    let s = email.value;
    if (s.length == '') {
      $('#EmailCheck').show();
      emailError = false;
      return false;
    } else if (regex.test(s) == false) {
      $('#EmailCheck').show();
      $('#EmailCheck').html('**Enter Valid Email ID');
      emailError = false;
    } else {
      emailError = true;
      $('#EmailCheck').hide();
    }
    // });
  }
  function validateLocation() {
    if ($('#LocationDDL').val() == '0') {
      $('#Locationcheck').show();
      return false;
    } else {
      $('#Locationcheck').hide();
    }
  }
  function validateGrup() {
    if ($('#GrupDDL').val() == '0') {
      $('#Grupcheck').show();
      return false;
    } else {
      $('#Locationcheck').hide();
    }
  }
  // Submit button
  $('#submitbtn').click(function () {
    validateLocation();
    validateGrup();
    validateUsername();
    validateEmail();
    ValidateMobile();
    if (usernameError == true && emailError == true && MobileError == true) {
      return true;
    } else {
      return false;
    }
  });

  $('#MaskSubmitbutn').click(function () {
    ValidateLatitude();
    ValidateLongitude();
    if ($('#MaskPlacetxt').val() == '') {
      $('#lblPlace').html('Enter the Place').show();
      return false;
    } else {
      $('#lblPlace').hide();
    }
    if (ValidateLatitude() == true && ValidateLongitude() == true) {
      return true;
    } else {
      return false;
    }
  });
});

function ValidateLatitude() {
  $('#lblLat').hide();
  var regexLat = new RegExp(
    '^(\\+|-)?(?:90(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\\.[0-9]{1,6})?))$'
  );
  if (!regexLat.test($('#latitudeTxt').val())) {
    $('#lblLat').html('Invalid Latitude').show();
    return false;
  } else {
    return true;
  }
}

function ValidateLongitude() {
  $('#lblLong').hide();
  var regexLong = new RegExp(
    '^(\\+|-)?(?:180(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\\.[0-9]{1,6})?))$'
  );
  if (!regexLong.test($('#longitudeTxt').val())) {
    $('#lblLong').html('Invalid Longitude').show();
    return false;
  } else {
    return true;
  }
}
function AddButnClick() {
  $('#MaskData_Container').show();
}
function MaskModelClose() {
  $('#MaskData_Container').hide();
}
