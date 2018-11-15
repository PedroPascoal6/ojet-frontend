
require(['knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojbutton'],
    function(ko, $)
    {

        // self.clickHandler = function clickHandler() {
        //     alert("something");
        // }


        $(function() {
            ko.applyBindings(new buttonModel(), document.getElementById('buttons-container'));
        });

    });

