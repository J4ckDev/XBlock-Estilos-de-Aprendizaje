/* Javascript for StudentAdaptiveTestXBlock. */
function StudioAdaptiveTestXBlock(runtime, element) {

    var handlerUrl = runtime.handlerUrl(element, 'select_test');

    // Reads chosen test index and sends it to python script
    $(function ($) {
        $("#test-form").submit(function () {
            var index = $("#select-test")[0].selectedIndex;
            $.ajax({
                type: "POST",
                url: handlerUrl,
                data: (String) (index + 1), // 1: Kolb, 2: Dominancia
                dataType: 'json',
                success: function (data) {
                    if(index==0) alert("Kolb seleccionado con éxito");
                    if(index==1) alert("Dominancia Cerebral seleccionado con éxito")
		            if(index==2) alert("Inteligencias Multiples seleccionado con éxito")
                    if(index==3) alert("Honey-Alonso seleccionado con éxito")
                }
            });
        })
    });

}
