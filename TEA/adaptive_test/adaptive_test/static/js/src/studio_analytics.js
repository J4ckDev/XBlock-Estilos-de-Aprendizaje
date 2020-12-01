/* Javascript for StudioAnalyticsXBlock. */
function StudioAnalyticsXBlock(runtime, element) {
    // See load and submit funcions at python script
    var handlerUrlAnalytics = runtime.handlerUrl(element, 'load_analytics');

    // On document load
    $(function ($) {
        $.ajax({
            type: "POST",
            url: handlerUrlAnalytics,
            data: "null", // No return needed.
            dataType: 'json',
            success: function (data) {
                //add a header to the web page
                var header = '';
                header = '<h2>Resultados Tests</h2>'; 
                $("#analytics-header").append(header);
                //show database results (student id, date, test name and test result) in an HTML table 
                data.map((student) => {
                    var html = ''
                    html += '<tr>'
                    html += '<td>' + student.id_estudiante + '</td>'
                    html += '<td>' + student.fecha + '</td>'
                    html += '<td>' + student.test + '</td>'
                    html += '<td>' + student.resultado + '</td>'
                    html += '</tr>'
                    $("#analytics-table").append(html);
                })
            }
        });
    });
}
