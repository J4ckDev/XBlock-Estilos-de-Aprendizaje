/* Javascript for StudentAdaptiveTestXBlock. */
function StudentAdaptiveTestXBlock(runtime, element) {
    // See load and submit funcions at python script
    var handlerUrlLoad = runtime.handlerUrl(element, 'load_test');
    var handlerUrlSubmit = runtime.handlerUrl(element, 'submit_test');
    //*********** DATABASE HANDLER BIN*********
    var handlerUrlUpdate = runtime.handlerUrl(element, 'update');   

    // On document load
    $(function ($) {
        window.test = 0;
        // Load the selected test. 
        // data: { test: number, test_result: optional_object }

        $.ajax({
            type: "POST",
            url: handlerUrlLoad,
            data: "null",
            success: function (data) {
                window.test = data.test;

                if (data.test_result) {
                    // Clear GUI

                    $("#test").empty();
                    // Avoid fake submitments
                    $("#submit-test").attr("disabled", true);
                    // Displays result
                    $("#test").append('<p> Tu test ha revelado que eres ' + JSON.stringify(data.test_result.result)+ '.</p>')
                } else {
                    if (data.test == 0) loadAlreadyPresented();
                    if (data.test == 1) loadKolb();
                    if (data.test == 2) loadDominancia();
                    if (data.test == 3) loadInteligencias();
                    if (data.test == 4) loadHoneyAlonso();

                    $("#sortable, #sortable1, #sortable2, #sortable3, #sortable4, #sortable5, #sortable6, #sortable7, #sortable8, #sortable9, #sortable10, #sortable11").sortable();
                    $("#sortable, #sortable1, #sortable2, #sortable3, #sortable4, #sortable5, #sortable6, #sortable7, #sortable8, #sortable9, #sortable10, #sortable11").disableSelection();
                }
            }
        });

        // On submit, send test result
        $("#submit-test").click(function () {
            // Uploads a result: { 'result': 'convergente <or any>' }
            var result = {};
            var test_name = ""; // ******** DATABASE VARIABLE ********
            if (test == 1) {
                result = getTestKolbResults();
                test_name = "Kolb"
            }
            if (test == 2) { 
                result = getTestHerrmannResults();
                test_name = "Hermann"
            }
            if (test == 3) {
                result = getTestInteligencias();
                test_name = "Inteligencias Multiples"
            }
            if (test == 4) {
                result = getTestHoneyAlonso();
                test_name = "Honey-Alonso"
            }
            

            $.ajax({
                type: "POST",
                url: handlerUrlSubmit,
                data: JSON.stringify(result),
                dataType: 'json',
                success: function (data) {
                    // Clear GUI
                    $("#test").empty();
                    // Avoid fake submitments
                    $("#submit-test").attr("disabled", true);

                    // Displays result
                    $("#test").append('<p> Tu test ha revelado que eres ' + JSON.stringify(result.result) + '.</p>')
                    // send test results to the python file, so they can be uploaded to database
                    $.ajax({
                        type: "POST",
                        url: handlerUrlUpdate,
                        data: JSON.stringify({"test_name": test_name, "result": result.result })
                    });
                }
            });
        });
    });

    // TODO: Improve the way these HTML files are being loaded, in order to make this system flexible
    // NOTE: use https://www.willpeavy.com/tools/minifier/
    // to minify (single line) HTML text files
    function loadKolb() {
        html = '<div id="testContainer" class="card d-flex justify-content-center" > <div class="container-fluid "> <div class="bg-primary  d-flex justify-content-center">  <h1 class="h1 text-white"> TEST DE KOLB</h1></div><p class="p-3 card">Lee atentamente las preguntas y arrastra las respuestas hasta ordenarlas según creas que te describen mejor, poniendo en primer lugar la respuesta más acertada y en último lugar la menos acertada. </p><table> <tr> <blockquote class="bloque"> <b>Cuando Aprendo:</b> </blockquote> </tr><ul id="sortable" class="lista"> <li class="ui-state-default alert alert-primary w-50 " ><span class="ui-icon ui-icon-arrowthick-2-n-s columnA"></span>Prefiero valerme de mis sensaciones y sentimientos</li><li class="ui-state-default alert alert-primary w-50 ""><span class="ui-icon ui-icon-arrowthick-2-n-s columnB"></span>Prefiero mirar y atender</li><li class="ui-state-default alert alert-primary w-50  ""><span class="ui-icon ui-icon-arrowthick-2-n-s columnC"></span>Prefiero pensar en las ideas </li><li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnD"></span>Prefiero hacer cosas</li></ul> <tr> <blockquote class="bloque"> <b>Aprendo mejor cuando:</b> </blockquote> </tr><ul id="sortable1" class="lista"> <li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnA"></span>Confío en mis corazonadas y sentimientos </li><li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnB"></span>Atiendo y observo cuidadosamente</li><li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnC"></span>Confío en mis pensamientos lógicos</li><li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnD"></span>Trabajo duramente para que las cosas queden realizadas </li></ul> <tr> <blockquote class="bloque"> <b class="b">Cuando estoy aprendiendo:</b> </blockquote> </tr><ul id="sortable2" class="lista"> <li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnA"></span>Tengo sentimientos y reacciones fuertes</li><li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnB"></span>Soy reservado y tranquilo</li><li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnC"></span>Busco razonar sobre las cosas que están sucediendo</li><li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnD"></span>Me siento responsable de las cosas</li></ul> <tr> <blockquote class="bloque"> <b class="b">Aprendo a través de:</b> </blockquote> </tr><ul id="sortable3" class="lista"> <li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnA"></span>Sentimientos</li><li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnB"></span>Observaciones</li><li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnC"></span>Razonamientos</li><li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnD"></span>Acciones</li></ul> <tr> <blockquote class="bloque"> <b class="b">Cuando aprendo:</b> </blockquote> </tr><ul id="sortable4" class="lista"> <li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnA"></span>Estoy abierto a nuevas experiencias</li><li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnB"></span>Tomo en cuenta todos los aspectos relacionados </li><li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnC"></span>Prefiero analizar las cosas dividiéndolas en sus partes componentes</li><li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnD"></span>Prefiero hacer las cosas directamente </li></ul> <tr> <blockquote class="bloque"> <b class="b">Cuando estoy aprendiendo:</b> </blockquote> </tr><ul id="sortable5" class="lista"> <li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnA"></span>Soy una persona intuitiva</li><li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnB"></span>Soy una persona observadora</li><li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnC"></span>Soy una persona lógica</li><li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnD"></span>Soy una persona activa </li></ul> <tr> <blockquote class="bloque"> <b class="b">Aprendo mejor a través de:</b> </blockquote> </tr><ul id="sortable6" class="lista"> <li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnA"></span>Las relaciones con mis compañeros</li><li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnB"></span>La observación</li><li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnC"></span>Teorías racionales</li><li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnD"></span>La práctica de los temas tratados</li></ul> <tr> <blockquote class="bloque"> <b class="b">Cuando aprendo:</b> </blockquote> </tr><ul id="sortable7" class="lista"> <li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnA"></span>Me siento involucrado en los temas tratados</li><li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnB"></span>Me tomo mi tiempo antes de actuar</li><li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnC"></span>Prefiero las teorías y las ideas</li><li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnD"></span>Prefiero ver los resultados a través de mi propio trabajo</li></ul> <tr> <blockquote class="bloque"> <b class="b">Aprendo mejor cuando:</b> </blockquote> </tr><ul id="sortable8" class="lista"> <li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnA"></span>Me baso en mis intuiciones y sentimientos</li><li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnB"></span>Me baso en observaciones personales</li><li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnC"></span>Tomo en cuenta mis propias ideas sobre el tema</li><li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnD"></span>Pruebo personalmente la tarea </li></ul> <tr> <blockquote class="bloque"> <b class="b">Cuando estoy aprendiendo:</b> </blockquote> </tr><ul id="sortable9" class="lista"> <li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnA"></span>Soy una persona abierta</li><li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnB"></span>Soy una persona reservada</li><li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnC"></span>Soy una persona racional</li><li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnD"></span>Soy una persona responsable </li></ul> <tr> <blockquote class="bloque"> <b class="b">Cuando aprendo:</b> </blockquote> </tr><ul id="sortable10" class="lista"> <li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnA"></span>Me involucro</li><li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnB"></span>Prefiero observar</li><li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnC"></span>Prefiero evaluar las cosas</li><li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnD"></span>Prefiero asumir una actitud activa </li></ul> <tr> <blockquote class="bloque"> <b class="b">Aprendo mejor cuando:</b> </blockquote> </tr><ul id="sortable11" class="lista"> <li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnA"></span>Soy receptivo y de mente abierta</li><li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnB"></span>Soy cuidadoso</li><li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnC"></span>Analizo las ideas</li><li class="ui-state-default alert alert-primary w-50 "><span class="ui-icon ui-icon-arrowthick-2-n-s columnD"></span>Soy práctico</li></ul></table> </div></div>';
        $("#test").html(html);
    }

    function loadDominancia() {
        html = '<div id="testContainer" class="card d-flex justify-content-center" > <div class="container-fluid "> <div class="bg-primary  d-flex justify-content-center">  <h1 class="h1 text-white"> TEST DOMINANCIA CEREBRAL </h1></div><p class="p-3 card">Lee atentamente las preguntas y escoge la respuesta según creas que te describen mejor.</p><form> <blockquote class="bloque"> <b>A1.Cuando toma sus decisiones, ¿Lo hace con obediencia en Razones o Principios?</b> </blockquote> <div class="input-group-text m-1"><input type="radio" name="A1" value="1" checked> Razones</div> <div class="input-group-text m-1"><input type="radio" name="A1" value="0"> Principios </div> <blockquote class="bloque"> <b>A2. ¿Le gustan las matemáticas?</b> </blockquote> <div class="input-group-text m-1"><input type="radio" name="A2" value="1" checked>Si</div> <div class="input-group-text m-1"><input type="radio" name="A2" value="0">No </div><blockquote class="bloque"> <b>A3. ¿Se considera un buen observador, con buena capacidad crítica?</b> </blockquote> <div class="input-group-text m-1"><input type="radio" name="A3" value="1" checked>Si</div><div class="input-group-text m-1"><input type="radio" name="A3" value="0">No</div><blockquote class="bloque"> <b>A4. ¿Está de acuerdo con la expresión “lo que más importa son los hechos”?</b> </blockquote> <div class="input-group-text m-1"><input type="radio" name="A4" value="1" checked>Si</div><div class="input-group-text m-1"><input type="radio" name="A4" value="0">No</div><blockquote class="bloque"> <b>B1. ¿Le gusta ser organizado en todas sus cosas?</b> </blockquote> <div class="input-group-text m-1"><input type="radio" name="B1" value="1" checked>Si</div><div class="input-group-text m-1"><input type="radio" name="B1" value="0">No</div><blockquote class="bloque"> <b>B2. ¿Se considera una persona detallista?</b> </blockquote> <div class="input-group-text m-1"><input type="radio" name="B2" value="1" checked>Si</div><div class="input-group-text m-1"><input type="radio" name="B2" value="0">No</div><blockquote class="bloque"> <b>B3. ¿Le gusta hacer planes y seguirlos fielmente?</b> </blockquote> <div class="input-group-text m-1"><input type="radio" name="B3" value="1" checked>Si</div><div class="input-group-text m-1"><input type="radio" name="B3" value="0">No</div><blockquote class="bloque"> <b>B4. ¿Suele verificar y estar seguro de los resultados de lo que hace?</b> </blockquote> <div class="input-group-text m-1"><input type="radio" name="B4" value="1" checked>Si</div><div class="input-group-text m-1"><input type="radio" name="B4" value="0">No</div><blockquote class="bloque"> <b>C1. ¿Se considera una persona dispuesta a servirle al prójimo, a los que están a su lado?</b> </blockquote> <div class="input-group-text m-1"><input type="radio" name="C1" value="1" checked>Si</div><div class="input-group-text m-1"><input type="radio" name="C1" value="0">No</div><blockquote class="bloque"> <b>C2. ¿Para usted es importante el desarrollo espiritual?</b> </blockquote> <div class="input-group-text m-1"><input type="radio" name="C2" value="1" checked>Si</div><div class="input-group-text m-1"><input type="radio" name="C2" value="0">No</div><blockquote class="bloque"> <b>C3. ¿Se considera una persona sensible?</b> </blockquote> <div class="input-group-text m-1"><input type="radio" name="C3" value="1" checked>Si</div><div class="input-group-text m-1"><input type="radio" name="C3" value="0">No</div><blockquote class="bloque"> <b>C4. ¿Se le facilita entablar conversaciones con otras personas?</b> </blockquote> <div class="input-group-text m-1"><input type="radio" name="C4" value="1" checked>Si</div><div class="input-group-text m-1"><input type="radio" name="C4" value="0">No</div><blockquote class="bloque"> <b>D1. ¿Disfruta de las artes? (pintura, música, teatro, poesía)</b> </blockquote> <div class="input-group-text m-1"><input type="radio" name="D1" value="1" checked>Si</div><div class="input-group-text m-1"><input type="radio" name="D1" value="0">No</div><blockquote class="bloque"> <b>D2. ¿Le gusta asumir riesgos?</b> </blockquote> <div class="input-group-text m-1"><input type="radio" name="D2" value="1" checked>Si</div><div class="input-group-text m-1"><input type="radio" name="D2" value="0">No</div><blockquote class="bloque"> <b>D3. ¿Se considera una persona creativa?</b> </blockquote> <div class="input-group-text m-1"><input type="radio" name="D3" value="1" checked>Si</div><div class="input-group-text m-1"><input type="radio" name="D3" value="0">No</div><blockquote class="bloque"> <b>D4. ¿Suele considerar o soñar sobre cómo serán las cosas o situaciones a futuro?</b> </blockquote> <div class="input-group-text m-1"><input type="radio" name="D4" value="1" checked>Si</div><div class="input-group-text m-1"><input type="radio" name="D4" value="0">No</div></form></div>';
        $("#test").html(html);
    }

    function loadInteligencias() {
        html = '<div id="testContainer" class="card d-flex justify-content-center" > <div class="container-fluid "> <div class="bg-primary  d-flex justify-content-center">  <h1 class="h1 text-white"> TEST INTELIGENCIAS MULTIPLES </h1> </div> <p class="p-3 card">Lee atentamente las preguntas y escoge la respuesta según creas que te describen mejor.</p> <form> <blockquote class="bloque"> <b>1.Prefiero hacer un mapa que explicarle a alguien como tiene que llegar</b> </blockquote> <input type="radio" name="C1" value="1" checked> Verdadero<br> <input type="radio" name="C1" value="0"> Falso<br> <blockquote class="bloque"> <b>2. Si estoy enojado(a) o contento (a) generalmente sé exactamente por qué</b> </blockquote> <input type="radio" name="F1" value="1" checked>Verdadero<br> <input type="radio" name="F1" value="0">Falso<br> <blockquote class="bloque"> <b>3. Sé tocar (o antes sabía tocar) un instrumento musical</b> </blockquote> <input type="radio" name="E1" value="1" checked>Verdadero<br> <input type="radio" name="E1" value="0">Falso<br> <blockquote class="bloque"> <b>4. Asocio la música con mis estados de ánimo</b> </blockquote> <input type="radio" name="E2" value="1" checked>Verdadero<br> <input type="radio" name="E2" value="0">Falso<br> <blockquote class="bloque"> <b>5. Puedo sumar o multiplicar mentalmente con mucha rapidez</b> </blockquote> <input type="radio" name="B1" value="1" checked>Verdadero<br> <input type="radio" name="B1" value="0">Falso<br> <blockquote class="bloque"> <b>6. Puedo ayudar a un amigo a manejar sus sentimientos porque yo lo pude hacer antes en relación a sentimientos parecidos</b> </blockquote> <input type="radio" name="F2" value="1" checked>Verdadero<br> <input type="radio" name="F2" value="0">Falso<br> <blockquote class="bloque"> <b>7. Me gusta trabajar con calculadoras y computadores</b> </blockquote> <input type="radio" name="B2" value="1" checked>Verdadero<br> <input type="radio" name="B2" value="0">Falso<br> <blockquote class="bloque"> <b>8. Aprendo rápido a bailar un ritmo nuevo</b> </blockquote> <input type="radio" name="D1" value="1" checked>Verdadero<br> <input type="radio" name="D1" value="0">Falso<br> <blockquote class="bloque"> <b>9. No me es difícil decir lo que pienso en el curso de una discusión o debate</b> </blockquote> <input type="radio" name="A1" value="1" checked>Verdadero<br> <input type="radio" name="A1" value="0">FalsoNo<br> <blockquote class="bloque"> <b>10. Disfruto de una buena charla, discurso o sermón</b> </blockquote> <input type="radio" name="A2" value="1" checked>Verdadero<br> <input type="radio" name="A2" value="0">Falso<br> <blockquote class="bloque"> <b>11. Siempre distingo el norte del sur, esté donde esté</b> </blockquote> <input type="radio" name="C2" value="1" checked>Verdadero<br> <input type="radio" name="C2" value="0">Falso<br> <blockquote class="bloque"> <b>12. Me gusta reunir grupos de personas en una fiesta o en un evento especial</b> </blockquote> <input type="radio" name="G1" value="1" checked>Verdadero<br> <input type="radio" name="G1" value="0">Falso<br> <blockquote class="bloque"> <b>13. La vida me parece vacía sin música</b> </blockquote> <input type="radio" name="E3" value="1" checked>Verdadero<br> <input type="radio" name="E3" value="0">Falso<br> <blockquote class="bloque"> <b>14. Siempre entiendo los gráficos que vienen en las instrucciones de equipos o instrumentos</b> </blockquote> <input type="radio" name="C3" value="1" checked>Verdadero<br> <input type="radio" name="C3" value="0">Falso<br> <blockquote class="bloque"> <b>15. Me gusta hacer rompecabezas y entretenerme con juegos electrónicos</b> </blockquote> <input type="radio" name="B3" value="1" checked>Verdadero<br> <input type="radio" name="B3" value="0">Falso<br> <blockquote class="bloque"> <b>16. Me fue fácil aprender a andar en bicicleta. (o patines)</b> </blockquote> <input type="radio" name="D2" value="1" checked>Verdadero<br> <input type="radio" name="D2" value="0">Falso<br></form> <blockquote class="bloque"> <b>17. Me enojo cuando oigo una discusión o una afirmación que parece ilógica</b> </blockquote> <input type="radio" name="A3" value="1" checked>Verdadero<br> <input type="radio" name="A3" value="0">Falso<br></form> <blockquote class="bloque"> <b>18. Soy capaz de convencer a otros que sigan mis planes. </b> </blockquote> <input type="radio" name="G2" value="1" checked>Verdadero<br> <input type="radio" name="G2" value="0">False<br> <blockquote class="bloque"> <b>19. Tengo buen sentido de equilibrio y coordinación. </b> </blockquote> <input type="radio" name="D3" value="1" checked>Verdadero<br> <input type="radio" name="D3" value="0">False<br> <blockquote class="bloque"> <b>20. Con frecuencia veo configuraciones y relaciones entre números con más rapidez y facilidad que otros.</b> </blockquote> <input type="radio" name="B4" value="1" checked>Verdadero<br> <input type="radio" name="B4" value="0">False<br> <blockquote class="bloque"> <b>21. Me gusta construir modelos (o hacer esculturas) </b> </blockquote> <input type="radio" name="D4" value="1" checked>Verdadero<br> <input type="radio" name="D4" value="0">False<br> <blockquote class="bloque"> <b>22. Tengo agudeza para encontrar el significado de las palabras. </b> </blockquote> <input type="radio" name="A4" value="1" checked>Verdadero<br> <input type="radio" name="A4" value="0">False<br> <blockquote class="bloque"> <b>23. Puedo mirar un objeto de una manera y con la misma facilidad verlo. </b> </blockquote> <input type="radio" name="C4" value="1" checked>Verdadero<br> <input type="radio" name="C4" value="0">False<br> <blockquote class="bloque"> <b>24. Con frecuencia hago la conexión entre una pieza de música y algún evento de mi vida. </b> </blockquote> <input type="radio" name="E4" value="1" checked>Verdadero<br> <input type="radio" name="E4" value="0">False<br> <blockquote class="bloque"> <b>25. Me gusta trabajar con números y figuras. </b> </blockquote> <input type="radio" name="B5" value="1" checked>Verdadero<br> <input type="radio" name="B5" value="0">False<br> <blockquote class="bloque"> <b>26. Me gusta sentarme silenciosamente y reflexionar sobre mis sentimientos íntimos.</b> </blockquote> <input type="radio" name="F3" value="1" checked>Verdadero<br> <input type="radio" name="F3" value="0">False<br> <blockquote class="bloque"> <b>27. Con sólo mirar la forma de construcciones y estructuras me siento a gusto. </b> </blockquote> <input type="radio" name="C5" value="1" checked>Verdadero<br> <input type="radio" name="C5" value="0">False<br> <blockquote class="bloque"> <b>28. Me gusta tararear, silbar y cantar en la ducha o cuando estoy sola. </b> </blockquote> <input type="radio" name="E5" value="1" checked>Verdadero<br> <input type="radio" name="E5" value="0">False<br> <blockquote class="bloque"> <b>29. Soy bueno(a) para el atletismo. </b> </blockquote> <input type="radio" name="D5" value="1" checked>Verdadero<br> <input type="radio" name="D5" value="0">False<br> <blockquote class="bloque"> <b>30. Me gusta escribir cartas detalladas a mis amigos </b> </blockquote> <input type="radio" name="A5" value="1" checked>Verdadero<br> <input type="radio" name="A5" value="0">False<br> <blockquote class="bloque"> <b>31. Generalmente me doy cuenta de la expresión que tengo en la cara. </b> </blockquote> <input type="radio" name="F4" value="1" checked>Verdadero<br> <input type="radio" name="F4" value="0">False<br> <blockquote class="bloque"> <b>32. Me doy cuenta de las expresiones en la cara de otras personas. </b> </blockquote> <input type="radio" name="G3" value="1" checked>Verdadero<br> <input type="radio" name="G3" value="0">False<br> <blockquote class="bloque"> <b>33. Me mantengo "en contacto" con mis estados de ánimo. No me cuesta identificarlos.</b> </blockquote> <input type="radio" name="F5" value="1" checked>Verdadero<br> <input type="radio" name="F5" value="0">False<br> <blockquote class="bloque"> <b>34. Me doy cuenta de los estados de ánimo de otros. </b> </blockquote> <input type="radio" name="G4" value="1" checked>Verdadero<br> <input type="radio" name="G4" value="0">False<br> <blockquote class="bloque"> <b>35. Me doy cuenta bastante bien de lo que otros piensan de mí. </b> </blockquote> <input type="radio" name="G5" value="1" checked>Verdadero<br> <input type="radio" name="G5" value="0">False<br></div>';
        $("#test").html(html);
    }

    function loadHoneyAlonso() {
        html = '<div id="testContainer" class="card d-flex justify-content-center" > <div class="container-fluid "> <div class="bg-primary d-flex justify-content-center"> <h1 class="h1 text-white"> TEST DE HONEY ALONSO </h1> </div> <p class="p-3 card"> Este Cuestionario ha sido diseñado para identificar su Estilo preferido de Aprendizaje. No es un test de inteligencia, ni de personalidad. No hay límite de tiempo para contestar al Cuestionario. No le ocupará más de 15 minutos. No hay respuestas correctas o erróneas. Será útil en la medida quesea sincero(a) en sus respuestas. <br><br> Si está más de acuerdo que en desacuerdo con el ítem ponga un signo de más (+) <br><br> Si por el contrario, está más en desacuerdo que de acuerdo, ponga un signo menos (-) <br><br> Por favor conteste a todos los ítems. Muchas gracias. </p> <div class="panel-body"> <table width="100%" name="aprendizaje" class="table table-striped table-bordered table-hover"> <thead> <tr> <th> <b>Cuestionario Honey – Alonso de Estilos de Aprendizaje CHAEA</b> </th> <th><b>+</b></th> <th><b>-</b></th> </tr> </thead> <tbody><tr class="bloque"><td>1. Tengo fama de decir lo que pienso claramente y sin rodeos</td><td>+ <input type="radio" name="D1" value="1" checked></td><td>- <input type="radio" name="D1" value="0"></td></tr><tr class="bloque"><td>2. Estoy seguro/a de lo que es bueno y lo que es malo, lo que está bien y lo que está mal</td><td>+ <input type="radio" name="C1" value="1" checked></td><td>- <input type="radio" name="C1" value="0"></td></tr><tr class="bloque"><td>3. Muchas veces actúo sin mirar las consecuencias</td><td>+ <input type="radio" name="A1" value="1" checked></td><td>- <input type="radio" name="A1" value="0"></td></tr><tr class="bloque"><td>4. Normalmente trato de resolver los problemas metódicamente y paso a paso</td><td>+ <input type="radio" name="C2" value="1" checked></td><td>- <input type="radio" name="C2" value="0"></td></tr><tr class="bloque"><td>5. Creo que los formalismos coartan y limitan la actuación libre de las personas</td><td>+ <input type="radio" name="A2" value="1" checked></td><td>- <input type="radio" name="A2" value="0"></td></tr><tr class="bloque"><td>6. Me interesa saber cuáles son los sistemas de valores de los demás y con qué criterios actúan</td><td>+ <input type="radio" name="C3" value="1" checked></td><td>- <input type="radio" name="C3" value="0"></td></tr><tr class="bloque"><td>7. Pienso que el actuar intuitivamente puede ser siempre tan válido como actuar reflexivamente</td><td>+ <input type="radio" name="A3" value="1" checked></td><td>- <input type="radio" name="A3" value="0"></td></tr><tr class="bloque"><td>8. Creo que lo más importante es que las cosas funcionen</td><td>+ <input type="radio" name="D2" value="1" checked></td><td>- <input type="radio" name="D2" value="0"></td></tr><tr class="bloque"><td>9. Procuro estar al tanto de lo que ocurre aquí y ahora</td><td>+ <input type="radio" name="A4" value="1" checked></td><td>- <input type="radio" name="A4" value="0"></td></tr><tr class="bloque"><td>10. Disfruto cuando tengo tiempo para preparar mi trabajo y realizarlo a conciencia</td><td>+ <input type="radio" name="B1" value="1" checked></td><td>- <input type="radio" name="B1" value="0"></td></tr><tr class="bloque"><td>11. Estoy a gusto siguiendo un orden en las comidas, en el estudio, haciendo ejercicio regularmente</td><td>+ <input type="radio" name="C4" value="1" checked></td><td>- <input type="radio" name="C4" value="0"></td></tr><tr class="bloque"><td>12. Cuando escucho una nueva idea enseguida comienzo a pensar cómo ponerla en práctica</td><td>+ <input type="radio" name="D3" value="1" checked></td><td>- <input type="radio" name="D3" value="0"></td></tr><tr class="bloque"><td>13. Prefiero las ideas originales y novedosas aunque no sean prácticas</td><td>+ <input type="radio" name="A5" value="1" checked></td><td>- <input type="radio" name="A5" value="0"></td></tr><tr class="bloque"><td>14. Admito y me ajusto a las normas sólo si me sirven para lograr mis objetivos</td><td>+ <input type="radio" name="D4" value="1" checked></td><td>- <input type="radio" name="D4" value="0"></td></tr><tr class="bloque"><td>15. Normalmente encajo bien con personas reflexivas, y me cuesta sintonizar con personas demasiado espontáneas, imprevisibles</td><td>+ <input type="radio" name="C5" value="1" checked></td><td>- <input type="radio" name="C5" value="0"></td></tr><tr class="bloque"><td>16. Escucho con más frecuencia que hablo</td><td>+ <input type="radio" name="B2" value="1" checked></td><td>- <input type="radio" name="B2" value="0"></td></tr><tr class="bloque"><td>17. Prefiero las cosas estructuradas a las desordenadas.</td> <td> + <input type="radio" name="C6" value="1" checked> </td><td>- <input type="radio" name="C6" value="0"> </td></tr><tr class="bloque"> <td>18. Cuando poseo cualquier información, trato de interpretarla bien antes de manifestar alguna conclusión.</td> <td> + <input type="radio" name="B3" value="1" checked> </td><td>- <input type="radio" name="B3" value="0"> </td></tr><tr class="bloque"> <td>19. Antes de hacer algo estudio con cuidado sus ventajas e inconvenientes. 19. Antes de hacer algo estudio con cuidado sus ventajas e inconvenientes. </td> <td> + <input type="radio" name="B4" value="1" checked> </td><td>- <input type="radio" name="B4" value="0"> </td></tr><tr class="bloque"> <td>20. Me entusiasmo con el reto de hacer algo nuevo y diferente</td> <td> + <input type="radio" name="A6" value="1" checked> </td><td>- <input type="radio" name="A6" value="0"> </td></tr><tr class="bloque"> <td>21. Casi siempre procuro ser coherente con mis criterios y sistemas de valores. Tengo principios y los sigo.</td> <td> + <input type="radio" name="C7" value="1" checked> </td><td>- <input type="radio" name="C7" value="0"> </td></tr><tr class="bloque"> <td>22. Cuando hay una discusión no me gusta ir con rodeos.r</td> <td> + <input type="radio" name="D5" value="1" checked> </td><td>- <input type="radio" name="D5" value="0"> </td></tr><tr class="bloque"> <td>23. Me disgusta implicarme afectivamente en el ambiente de la escuela.Prefiero mantener relaciones distantes.</td> <td> + <input type="radio" name="C8" value="1" checked> </td><td>- <input type="radio" name="C8" value="0"> </td></tr><tr class="bloque"> <td>24. Me gustan más las personas realistas y concretas que las teóricas. </td> <td> + <input type="radio" name="D6" value="1" checked> </td><td>- <input type="radio" name="D6" value="0"> </td></tr><tr class="bloque"> <td>25. Me cuesta ser creativo/a, romper estructuras.r</td> <td> + <input type="radio" name="C9" value="1" checked> </td><td>- <input type="radio" name="C9" value="0"> </td></tr><tr class="bloque"> <td>26. Me siento a gusto con personas espontáneas y divertidas.</td> <td> + <input type="radio" name="A7" value="1" checked> </td><td>- <input type="radio" name="A7" value="0"> </td></tr><tr class="bloque"> <td>27. La mayoría de las veces expreso abiertamente cómo me siento. </td> <td> + <input type="radio" name="A8" value="1" checked> </td><td>- <input type="radio" name="A8" value="0"> </td></tr><tr class="bloque"> <td>28. Me gusta analizar y dar vueltas a las cosas</td> <td> + <input type="radio" name="B5" value="1" checked> </td><td>- <input type="radio" name="B5" value="0"> </td></tr><tr class="bloque"> <td>29. Me molesta que la gente no se tome en serio las cosas.</td> <td> + <input type="radio" name="C10" value="1" checked> </td><td>- <input type="radio" name="C10" value="0"> </td></tr><tr class="bloque"> <td>30. Me atrae experimentar y practicar las últimas técnicas y novedades. </td> <td> + <input type="radio" name="D7" value="1" checked> </td><td>- <input type="radio" name="D7" value="0"> </td></tr><tr class="bloque"> <td>31. Soy cauteloso/a a la hora de sacar conclusiones.</td> <td> + <input type="radio" name="B6" value="1" checked> </td><td>- <input type="radio" name="B6" value="0"> </td></tr><tr class="bloque"> <td>32. Prefiero contar con el mayor número de fuentes de información. Cuantos más datos reúna para reflexionar, mejor.</td> <td> + <input type="radio" name="B7" value="1" checked> </td><td>- <input type="radio" name="B7" value="0"> </td></tr><tr class="bloque"> <td>33. Tiendo a ser perfeccionista.</td> <td> + <input type="radio" name="C11" value="1" checked></td><td>- <input type="radio" name="C11" value="0"></td></tr><tr class="bloque"> <td>34. Prefiero oír las opiniones de los demás antes de exponer la mía.</td> <td> + <input type="radio" name="B8" value="1" checked></td><td>- <input type="radio" name="B8" value="0"></td></tr><tr class="bloque"> <td>35. Me gusta afrontar la vida espontáneamente y no tener que planificar todo previamente.</td> <td> + <input type="radio" name="A9" value="1" checked></td><td>- <input type="radio" name="A9" value="0"></td></tr><tr class="bloque"> <td>36. En las discusiones me gusta observar cómo actúan los demás participantes.</td> <td> + <input type="radio" name="B9" value="1" checked></td><td>- <input type="radio" name="B9" value="0"></td></tr><tr class="bloque"> <td>37.Me siento incómodo/a con las personas calladas y demasiado analíticas.</td> <td> + <input type="radio" name="A10" value="1" checked></td><td>- <input type="radio" name="A10" value="0"></td></tr><tr class="bloque"> <td>38. Juzgo con frecuencia las ideas de los demás por su valor práctico.</td> <td> + <input type="radio" name="D8" value="1" checked></td><td>- <input type="radio" name="D8" value="0"></td></tr><tr class="bloque"> <td>39. Me agobio si me obligan a acelerar mucho el trabajo para cumplir un plazo</td> <td> + <input type="radio" name="B10" value="1" checked></td><td>- <input type="radio" name="B10" value="0"></td></tr><tr class="bloque"> <td>40. En las reuniones apoyo las ideas prácticas y realistas.</td> <td> + <input type="radio" name="D9" value="1" checked></td><td>- <input type="radio" name="D9" value="0"></td></tr><tr class="bloque"> <td>41. Es mejor gozar del momento presente que deleitarse pensando en el pasado o en el futuro</td> <td> + <input type="radio" name="A11" value="1" checked></td><td>- <input type="radio" name="A11" value="0"></td></tr><tr class="bloque"> <td>42. Me molestan las personas que siempre desean apresurar las cosas.</td> <td> + <input type="radio" name="B11" value="1" checked></td><td>- <input type="radio" name="B11" value="0"></td></tr><tr class="bloque"> <td>43. Aporto ideas nuevas y espontáneas en los grupos de discusión.</td> <td> + <input type="radio" name="A12" value="1" checked></td><td>- <input type="radio" name="A12" value="0"></td></tr><tr class="bloque"> <td>44. Pienso que son más consistentes las decisiones fundamentadas en un minucioso análisis que las basadas en la intuición</td> <td> + <input type="radio" name=B12 value="1" checked></td><td>- <input type="radio" name=B12 value="0"></td></tr><tr class="bloque"> <td>45. Detecto frecuentemente la inconsistencia y puntos débiles en las argumentaciones de los demás.</td> <td> + <input type="radio" name="C12" value="1" checked></td><td>- <input type="radio" name="C12" value="0"></td></tr><tr class="bloque"> <td>46. Creo que es preciso saltarse las normas muchas más veces que cumplirlas.</td> <td> + <input type="radio" name="A13" value="1" checked></td><td>- <input type="radio" name="A13" value="0"></td></tr><tr class="bloque"> <td>47. A menudo caigo en la cuenta de otras formas mejores y más prácticas de hacer las cosas.</td> <td> + <input type="radio" name="D10" value="1" checked></td><td>- <input type="radio" name="D10" value="0"></td></tr><tr class="bloque"> <td>48. En conjunto hablo más que escucho.</td> <td> + <input type="radio" name="A14" value="1" checked></td><td>- <input type="radio" name="A14" value="0"></td></tr><tr class="bloque"><td>49. Prefiero distanciarme de los hechos y observarlos desde otras perspectivas.</td><td>+ <input type="radio" name="B13" value="1" checked> </td><td>- <input type="radio" name="B13" value="0"> </td></tr><tr class="bloque"><td>50. Estoy convencido/a que debe imponerse la lógica y el razonamiento.</td><td>+ <input type="radio" name="C13" value="1" checked> </td><td>- <input type="radio" name="C13" value="0"> </td></tr><tr class="bloque"><td>51. Me gusta buscar nuevas experiencias.</td><td>+ <input type="radio" name="A15" value="1" checked> </td><td>- <input type="radio" name="A15" value="0"> </td></tr><tr class="bloque"><td>52. Me gusta experimentar y aplicar las cosas.</td><td>+ <input type="radio" name="D11" value="1" checked> </td><td>- <input type="radio" name="D11" value="0"> </td></tr><tr class="bloque"><td>53. Pienso que debemos llegar pronto al grano, al meollo de los temas.</td><td>+ <input type="radio" name="D12" value="1" checked> </td><td>- <input type="radio" name="D12" value="0"> </td></tr><tr class="bloque"><td>54. Siempre trato de conseguir conclusiones e ideas claras.</td><td>+ <input type="radio" name="C14" value="1" checked> </td><td>- <input type="radio" name="C14" value="0"> </td></tr><tr class="bloque"><td>55. Prefiero discutir cuestiones concretas y no perder el tiempo con pláticas superficiales.</td><td>+ <input type="radio" name="B14" value="1" checked> </td><td>- <input type="radio" name="B14" value="0"> </td></tr><tr class="bloque"><td>56. Me impaciento cuando me dan explicaciones irrelevantes e incoherentes.</td><td>+ <input type="radio" name="D13" value="1" checked> </td><td>- <input type="radio" name="D13" value="0"> </td></tr><tr class="bloque"><td>57. Compruebo antes si las cosas funcionan realmente.</td><td>+ <input type="radio" name="D14" value="1" checked> </td><td>- <input type="radio" name="D14" value="0"> </td></tr><tr class="bloque"><td>58. Hago varios borradores antes de la redacción definitiva de un trabajo.</td><td>+ <input type="radio" name="B15" value="1" checked> </td><td>- <input type="radio" name="B15" value="0"> </td></tr><tr class="bloque"><td>59. Soy consciente de que en las discusiones ayudo a mantener a los demás centrados en el tema, evitando divagaciones.</td><td>+ <input type="radio" name="D15" value="1" checked> </td><td>- <input type="radio" name="D15" value="0"> </td></tr><tr class="bloque"><td>60. Observo que, con frecuencia, soy uno/a de los/as más objetivos/as y desapasionados/as en las discusiones.</td><td>+ <input type="radio" name="C15" value="1" checked> </td><td>- <input type="radio" name="C15" value="0"> </td></tr><tr class="bloque"><td>61. Cuando algo va mal, le quito importancia y trato de hacerlo mejor.</td><td>+ <input type="radio" name="A16" value="1" checked> </td><td>- <input type="radio" name="A16" value="0"> </td></tr><tr class="bloque"><td>62. Rechazo ideas originales y espontáneas si no las veo prácticas.</td><td>+ <input type="radio" name="D16" value="1" checked> </td><td>- <input type="radio" name="D16" value="0"> </td></tr><tr class="bloque"><td>63. Me gusta sopesar diversas alternativas antes de tomar una decisión.</td><td>+ <input type="radio" name="B16" value="1" checked> </td><td>- <input type="radio" name="B16" value="0"> </td></tr><tr class="bloque"><td>64. Con frecuencia miro hacia delante para prever el futuro.</td><td>+ <input type="radio" name="C16" value="1" checked> </td><td>- <input type="radio" name="C16" value="0"> </td></tr><tr class="bloque"><td>65. En los debates y discusiones prefiero desempeñar un papel secundario antes que ser el/la líder o el/la que más participa.</td><td>+ <input type="radio" name="B17" value="1" checked></td><td>- <input type="radio" name="B17" value="0"></td></tr><tr class="bloque"><td>66. Me molestan las personas que no actúan con lógica.</td><td>+ <input type="radio" name="C17" value="1" checked></td><td>- <input type="radio" name="C17" value="0"></td></tr><tr class="bloque"><td>67. Me resulta incómodo tener que planificar y prever las cosas.</td><td>+ <input type="radio" name="A17" value="1" checked></td><td>- <input type="radio" name="A17" value="0"></td></tr><tr class="bloque"><td>68. Creo que el fin justifica los medios en muchos casos.</td><td>+ <input type="radio" name="D17" value="1" checked></td><td>- <input type="radio" name="D17" value="0"></td></tr><tr class="bloque"><td>69. Suelo reflexionar sobre los asuntos y problemas.</td><td>+ <input type="radio" name="B18" value="1" checked></td><td>- <input type="radio" name="B18" value="0"></td></tr><tr class="bloque"><td>70. El trabajar a conciencia me llena de satisfacción y orgullo.</td><td>+ <input type="radio" name="B19" value="1" checked></td><td>- <input type="radio" name="B19" value="0"></td></tr><tr class="bloque"><td>71. Ante los acontecimientos trato de descubrir los principios y teorías en que se basan.</td><td>+ <input type="radio" name="C18" value="1" checked></td><td>- <input type="radio" name="C18" value="0"></td></tr><tr class="bloque"><td>72. Con tal de conseguir el objetivo que pretendo soy capaz de herir sentimientos ajenos.</td><td>+ <input type="radio" name="D18" value="1" checked></td><td>- <input type="radio" name="D18" value="0"></td></tr><tr class="bloque"><td>73. No me importa hacer todo lo necesario para que sea efectivo mi trabajo.</td><td>+ <input type="radio" name="D19" value="1" checked></td><td>- <input type="radio" name="D19" value="0"></td></tr><tr class="bloque"><td>74. Con frecuencia soy una de las personas que más anima las fiestas.</td><td>+ <input type="radio" name="A18" value="1" checked></td><td>- <input type="radio" name="A18" value="0"></td></tr><tr class="bloque"><td>75. Me aburro enseguida con el trabajo metódico y minucioso.</td><td>+ <input type="radio" name="A19" value="1" checked></td><td>- <input type="radio" name="A19" value="0"></td></tr><tr class="bloque"><td>76. La gente con frecuencia cree que soy poco sensible a sus sentimientos.</td><td>+ <input type="radio" name="D20" value="1" checked></td><td>- <input type="radio" name="D20" value="0"></td></tr><tr class="bloque"><td>77. Suelo dejarme llevar por mis intuiciones.</td><td>+ <input type="radio" name="A20" value="1" checked></td><td>- <input type="radio" name="A20" value="0"></td></tr><tr class="bloque"><td>78. Si trabajo en grupo procuro que se siga un método y un orden.</td><td>+ <input type="radio" name="C19" value="1" checked></td><td>- <input type="radio" name="C19" value="0"></td></tr><tr class="bloque"><td>79. Con frecuencia me interesa averiguar lo que piensa la gente.</td><td>+ <input type="radio" name="B20" value="1" checked></td><td>- <input type="radio" name="B20" value="0"></td></tr><tr class="bloque"><td>80. Esquivo los temas subjetivos, ambiguos y poco claros.</td><td>+ <input type="radio" name="C20" value="1" checked></td><td>- <input type="radio" name="C20" value="0"> </td></tr></tbody> </table> </div> </div></div>'
        $("#test").html(html);
    }

    function loadAlreadyPresented() {
        html = '<p>El test no está disponible.</p>';
        $("#test").html(html);
        $("#submit-test").attr("disabled", true);
    }

    /* 
     * HERRMANN TEST. Documentation about the answers was provided but there is no input-ouput
     * relation, rather than a polar plane with A to D quadrants.
     * Therefore, the result of this test is based upon a scoring mechanism:
     * each question (1 to 4) scores per section (A to D). Prominent section is returned
     * as result.
     */
    function getTestHerrmannResults() {
        const sections = ["A", "B", "C", "D"];
        var results = [];
        var sectionsScore = [];

        sections.map((section) => {
            var scorePerSection = 0;
            for (var i = 1; i < 5; i++) {
                var value = parseInt(document.querySelector('input[name="' + section + i + '"]:checked').value);
                scorePerSection += value; // values are between 0 and 1, see template HTML
                results.push(value);
            }
            sectionsScore.push(scorePerSection);
        })

        // At this point, we have an array of 0s or 1s, according to chosen answer
        //alert(JSON.stringify(results))

        // Now we get the most relevant quadrant
        const highestSection = sectionsScore.indexOf(Math.max(...sectionsScore));
        var strQuadrant = '';

        switch(highestSection){
            case 0: {
                strQuadrant = 'Lógico' // A
                break;
            }
            case 1: {
                strQuadrant = 'Organizado' // B
                break;
            }
            case 2: {
                strQuadrant = 'Interpersonal' // C
                break;
            }
            case 3: {
                strQuadrant = 'Holísitico' // D
                break;
            }
        }

        //TODO: Improve. If scoring per section is equal and there is more than one prominent classifications, all must be returned
        // This reminds, how to classify multifaceted people

        return { result: strQuadrant, result_details: sectionsScore };
    }		
	function getTestInteligencias() {
        const sections = ["A", "B", "C", "D","E", "F", "G"];
        var results = [];
        var sectionsScore = [];

        sections.map((section) => {
            var scorePerSection = 0;
            for (var i = 1; i < 6; i++) {
                var value = parseInt(document.querySelector('input[name="' + section + i + '"]:checked').value);
                scorePerSection += value; // values are between 0 and 1, see template HTML
                results.push(value);
            }
            sectionsScore.push(scorePerSection);
        })
        const highestSection = sectionsScore.indexOf(Math.max(...sectionsScore));
        var strQuadrant = '';

        switch(highestSection){
            case 0: {
                strQuadrant = 'Inteligencia Verbal' // A
                break;
            }
            case 1: {
                strQuadrant = 'Inteligencia Logico-Matematica' // B
                break;
            }
            case 2: {
                strQuadrant = 'Inteligencia Visual-Espacial' // C
                break;
            }
            case 3: {
                strQuadrant = 'Inteligencia Kinestesica-Corporal' // D
                break;
            }
            case 4: {
                strQuadrant = 'Inteligencia Musical-Ritmica' // E
                break;
            }
            case 5: {
                strQuadrant = 'Inteligencia Intrapersonal' // F
                break;
            }
            case 6: {
                strQuadrant = 'Inteligencia Interpersonal' // H
                break;
            }
	
        }

        //TODO: Improve. If scoring per section is equal and there is more than one prominent classifications, all must be returned
        // This reminds, how to classify multifaceted people

        return { result: strQuadrant, result_details: sectionsScore };
    }
    function getTestHoneyAlonso() {
        const sections = ["A", "B", "C", "D"];
        var results = [];
        var sectionsScore = [];

        sections.map((section) => {
            var scorePerSection = 0;
            for (var i = 1; i < 21; i++) {
                var value = parseInt(document.querySelector('input[name="' + section + i + '"]:checked').value);
                scorePerSection += value; // values are between 0 and 1, see template HTML
                results.push(value);
            }
            sectionsScore.push(scorePerSection);
        })

        // At this point, we have an array of 0s or 1s, according to chosen answer
        //alert(JSON.stringify(results))

        // Now we get the most relevant quadrant
        const highestSection = sectionsScore.indexOf(Math.max(...sectionsScore));
        var strQuadrant = '';

        switch(highestSection){
            case 0: {
                strQuadrant = 'Activo' // A
                break;
            }
            case 1: {
                strQuadrant = 'Reflexivo' // B
                break;
            }
            case 2: {
                strQuadrant = 'Teórico' // C
                break;
            }
            case 3: {
                strQuadrant = 'Pragmático' // D
                break;
            }
        }

        //TODO: Improve. If scoring per section is equal and there is more than one prominent classifications, all must be returned
        // This reminds, how to classify multifaceted people

        return { result: strQuadrant, result_details: sectionsScore };   
    }

    /* 
     * Functions inherited from last team (Kolb team at 2018). Contact for support.
     * These functions act as a scrapper for sortables input.
     */
    function getTestKolbResults() {
        columns = getAnswersFromForm();
        responseTestKolb = {}

        sumColumns = []
        coords = { "x": -1, "y": -1 }
        for (var k = 0, length3 = columns.length; k < length3; k++) {
            sumColumns.push(getSumColumn(columns[k]))
        }
        coords.x = sumColumns[3] - sumColumns[1]
        coords.y = sumColumns[2] - sumColumns[0]

        if (coords.x > 6 && coords.y >= 4) {
            responseTestKolb = { 'result': "convergente" };
        }

        if (coords.x >= 6 && coords.y <= 4) {
            responseTestKolb = { 'result': "acomodador" };
        }

        if (coords.x <= 6 && coords.y >= 4) {
            responseTestKolb = { 'result': "asimilador" };
        }

        if (coords.x <= 6 && coords.y <= 4) {
            responseTestKolb = { 'result': "divergente" };
        }

        return responseTestKolb;
    }

    function getAnswersFromForm() {
        let columnA = []
        let columnB = []
        let columnC = []
        let columnD = []
        let formAnswers = document.getElementsByTagName('ul');

        for (var j = 0, length2 = formAnswers.length; j < length2; j++) {
            answersQuestions = formAnswers[j].getElementsByTagName('span');
            for (var k = 0, length3 = answersQuestions.length; k < length3; k++) {
                listClass = answersQuestions[k].classList;
                classAnswer = listClass[listClass.length - 1];

                switch (classAnswer) {
                    case 'columnA':
                        columnA.push(k + 1);
                        break;
                    case 'columnB':
                        columnB.push(k + 1);
                        break;
                    case 'columnC':
                        columnC.push(k + 1);
                        break;
                    case 'columnD':
                        columnD.push(k + 1);
                        break;
                }
            }
        }

        return [columnA, columnB, columnC, columnD];
    }

    function getSumColumn(column) {
        let sum = 0;

        for (var k = 0, length3 = column.length; k < length3; k++) {
            sum += column[k];
        }

        return sum;
    }
}
