window.onload = function(){
    window.addEventListener('scroll',scrollThrottle);
}

// QUERY STRING HELPER
function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// RICH TEXT COMMENT BOX HELPER
var editor;
function createEditor() {
    promiseCreateEditor().then(function (result) {
        editor = result[0];
        editor.focus();
    });
}

function promiseCreateEditor() {

    var temp = tinymce.init({
        selector: '.editor',
        plugins: ['link', 'image', 'media'],
        default_link_target: '_blank',
        inline: true,
        fixed_toolbar_container: '.toolbar',
        menubar: false,
        toolbar:
        [
            'fontsizeselect bold italic underline | outdent indent | bullist numlist | link unlink | image media'
        ]
    });

    return temp;
}


// SERVICES
function putFile(formdata, comments) {
    $.ajax({
        url: './services/putfile.php',
        type: 'POST',
        cache: false,
        processData: false,
        contentType: false,
        data: formdata
    })
        .done(function (result, b, c) {
            // ONCE UPLOADED THAN SAVE COMMENTS            
            putComments(result, comments);
        })
        .fail(function (a, b, c) {
            console.log('Failed POST');
            console.log(a);
            console.log(b);
            console.log(c);
        });

}

function getPendingElements(callback){
    // GET PENDING ELEMENTS METADATA
    $.ajax({
        url:'./services/getfiles.php',
        type:'GET',
        data:{
            Filter: "BY_PENDING_ELEMENTS"
        }
    }).done(function(result){  
        callback(result);
    })
}

function addFileMeta(setid,status) {
    $.ajax({
        url: './services/addfilemeta.php',
        type: 'POST',
        data:
        {
            SetId: setid,
            Status: status
        }
    })
        .done(function (result, b, c) {
            console.log(result);
        })
        .fail(function (a, b, c) {
            console.log('Failed POST');
            console.log(a);
            console.log(b);
            console.log(c);
        });
}

function putComments(setid, comments) {
    $.ajax({
        url: './services/putcomments.php',
        type: "POST",
        data: {
            SetId: setid,
            Comments: comments
        }
    }).done(function (result) {
        if (result == 'TRUE') {
            window.location = './review.html';
        }
    }).fail(function (a, b, c) {
        console.log(a);
        console.log(b);
        console.log(c);
    })
}

function updateElementStatus(setId,status){
    $.ajax({
        url:'./services/updatestatus.php',
        type:'POST',
        data:{
            SetId: setId,
            Status: status
        }
    }).done(function(result){
        console.log(result);
    }).fail(function(a,b,c){
        console.log(a);
        console.log(b);
        console.log(c);
    })
}

// SCROLL EVENTS
var scrollTimeout;
function scrollThrottle(){
    if (!scrollTimeout){
        scrollTimeout = setTimeout(function(){
            scrollTimeout = null;
            scrolled();
        },50);
    }
}

var prevYScrollPos = 0;
function scrolled(){
    var yScrollPos = this.pageYOffset;
    var headerWrapper = $('.header-wrapper');
    if ((yScrollPos > 0) && (!headerWrapper.hasClass('scrolled'))){
        headerWrapper.addClass('scrolled');
    }else if ((yScrollPos==0) && (headerWrapper.hasClass('scrolled'))){
        headerWrapper.removeClass('scrolled');
    }
    
    // keep track of scoll pos to know if scrolling up or down
    prevYScrollPos = yScrollPos;
}