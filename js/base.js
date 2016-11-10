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


function createEditor() {
    promiseEditor().then(function(editors){
        console.log(editors);
    });
}

function promiseEditor(){
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