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
            // ONCE UPLOADED THAN ADD METADTA TO DB
            addFileMeta(result);
            putComments(result, comments);
        })
        .fail(function (a, b, c) {
            console.log('Failed POST');
            console.log(a);
            console.log(b);
            console.log(c);
        });

}

function addFileMeta(setid) {
    $.ajax({
        url: './services/addfilemeta.php',
        type: 'POST',
        data:
        {
            SetId: setid
        }
    })
        .done(function (result, b, c) {

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