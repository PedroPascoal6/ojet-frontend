
require(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojbutton'],
    function(oj, ko, $)
    {

        function ButtonModel() {
            this.isAdvanced = ko.observableArray([]);
            this.userText = ko.computed(function() {
                return "User is: " + (this.isAdvanced().length ? "an expert" : "a beginner");
            }, this);
        }

        $(function() {
            ko.applyBindings(new ButtonModel(), document.getElementById('buttons-container'));
        });

    });

