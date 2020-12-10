/* Javascript for MyXBlock. */
function MyXBlock(runtime, element) {

    function updateCount(result) {
        var seccionData=document.getElementById("data");
        seccionData.innerHTML=result.resultado;
    }

    var handlerUrl = runtime.handlerUrl(element, 'listardatos');

    $('button', element).click(function(eventObject) {
        var name = document.getElementById("name").value;
        var lastname = document.getElementById("lastname").value;
        var email = document.getElementById("email").value;

        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: JSON.stringify({"name":name, "lastname":lastname, "email":email}),
            success: updateCount
        });

    });
}
