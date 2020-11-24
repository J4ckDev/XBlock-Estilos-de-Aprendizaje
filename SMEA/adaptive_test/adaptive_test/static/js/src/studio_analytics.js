/* Javascript for StudioAnalyticsXBlock. */
function StudioAnalyticsXBlock(runtime, element) {
    // See load and submit funcions at python script
    var handlerUrlAnalytics = runtime.handlerUrl(element, 'load_analytics');

    // On document load
    $(function ($) {
        // Load the selected test. 
        // data: { test: number, test_result: optional_object }
        $.ajax({
            type: "POST",
            url: handlerUrlAnalytics,
            data: "null", // No return needed.
            dataType: 'json',
            success: function (data) {
                var header = '';
                if(data.test == 1) header = '<h2>Test de Kolb</h2>';
                if(data.test == 1) header = '<h2>Test de Kolb</h2>';
                
                $("#analytics-header").append(header);

                data.map((student) => {
                    var html = ''
                    html += '<tr>'
                    html += '<td>' + student.user_id + '</td>'
                    html += '<td>' + student.user_full_name + '</td>'
                    html += '<td>' + student.result.result + '</td>'
                    html += '</tr>'
                    $("#analytics-table").append(html);
                })
            }
        });
    });
}
