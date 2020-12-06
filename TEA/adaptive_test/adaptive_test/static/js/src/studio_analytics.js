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

                    if (student.test == 1) test_name = "Kolb"
                    if (student.test == 2) test_name = "Hermann"
                    if (student.test == 3) test_name = "Inteligencias Multiples"
                    if (student.test == 4) test_name = "Honey-Alonso"

                    html += '<tr>'
                    html += '<td>' + student.user_id + '</td>'
                    //html += '<td>' + student.fecha + '</td>'
                    html += '<td>' + test_name + '</td>'
                    html += '<td>' + student.result.result + '</td>'
                    html += '</tr>'
                    $("#analytics-table").append(html);
                })
            }
        });
    });
}
