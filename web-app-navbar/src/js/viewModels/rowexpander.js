
require(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout',
        'ojs/ojdatagrid', 'ojs/ojrowexpander', 'ojs/ojflattenedtreedatagriddatasource', 'ojs/ojjsontreedatasource',],
    function(oj, ko, $)
    {
        self.clickHandlerSend = function clickHandlerSend(value) {
            postData(`https://pure-mountain-71887.herokuapp.com/politicians`, {politicianid: value, jail: 'True'})
                .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
                .catch(error => console.error(error));

            function postData(url = ``, data = {}) {
                // Default options are marked with *
                return fetch(url, {
                    method: "POST", // *GET, POST, PUT, DELETE, etc.
                    mode: "cors", // no-cors, cors, *same-origin
                    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: "same-origin", // include, *same-origin, omit
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        // "Content-Type": "application/x-www-form-urlencoded",
                    },
                    redirect: "follow", // manual, *follow, error
                    referrer: "no-referrer", // no-referrer, *client
                    body: JSON.stringify(data), // body data type must match "Content-Type" header
                })
                    .then(response => response.json()); // parses response to JSON
            }
            location.reload();
            alert("Politician has been send to jail");
        }

        self.clickHandlerPost = function clickHandlerPost(value) {
            postData(`https://pure-mountain-71887.herokuapp.com/politicians`, {politicianid: value, jail: ''})
                .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
                .catch(error => console.error(error));

            function postData(url = ``, data = {}) {
                // Default options are marked with *
                return fetch(url, {
                    method: "POST", // *GET, POST, PUT, DELETE, etc.
                    mode: "cors", // no-cors, cors, *same-origin
                    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: "same-origin", // include, *same-origin, omit
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        // "Content-Type": "application/x-www-form-urlencoded",
                    },
                    redirect: "follow", // manual, *follow, error
                    referrer: "no-referrer", // no-referrer, *client
                    body: JSON.stringify(data), // body data type must match "Content-Type" header
                })
                    .then(response => response.json()); // parses response to JSON
            }

            location.reload();
            alert("Politician go out the jail");
        }

        self.clickHandlerGenerate = function clickHandlerGenerate(value) {
            postData(`https://pure-mountain-71887.herokuapp.com/support`, {amount: value})
                .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
                .catch(error => console.error(error));

            function postData(url = ``, data = {}) {
                // Default options are marked with *
                return fetch(url, {
                    method: "POST", // *GET, POST, PUT, DELETE, etc.
                    mode: "cors", // no-cors, cors, *same-origin
                    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: "same-origin", // include, *same-origin, omit
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        // "Content-Type": "application/x-www-form-urlencoded",
                    },
                    redirect: "follow", // manual, *follow, error
                    referrer: "no-referrer", // no-referrer, *client
                    body: JSON.stringify(data), // body data type must match "Content-Type" header
                })
                    .then(response => response.json()); // parses response to JSON
            }

            location.reload();
            alert("Politician has been generated");
        }

        function viewModel()
        {
            var self = this;


            var options = {
                'rowHeader': 'name',
                'columns': ['id','superiorid','superiorName','subordinateid','subordinateName','level']
            };
            self.dataSource = ko.observable();

            $(
               async function(data)
                {
                    data = await userAction();
                    console.log(JSON.stringify(data, null, 2));
                    self.dataSource(new oj.FlattenedTreeDataGridDataSource(new oj.JsonTreeDataSource(data), options));
                }
            );

        }
        const userAction = async () => {
            console.log("AQUI")
            const response = await fetch('https://pure-mountain-71887.herokuapp.com/politicians')
            const myJson = await response.json(); //extract JSON from the http response
            console.log(JSON.stringify(myJson, null, 2));
            return myJson;
        }

        $(
            function()
            {
                ko.applyBindings(new viewModel(), document.getElementById('datagrid'));
            }
        );
    });