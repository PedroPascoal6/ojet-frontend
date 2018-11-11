
require(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout',
        'ojs/ojdatagrid', 'ojs/ojrowexpander', 'ojs/ojflattenedtreedatagriddatasource', 'ojs/ojjsontreedatasource',],
    function(oj, ko, $)
    {

        function viewModel()
        {
            var self = this;


            var options = {
                'rowHeader': 'name',
                'columns': ['id','resource','start','end']
            };
            self.dataSource = ko.observable();
            $( async function()
                {
                    //let data = await userAction();
                    let data = [{"attr":{"end":"10/1/2014","id":"t1","name":"Task 1","resource":"Chadwick","start":"1/1/2014"},"children":[{"attr":{"end":"3/1/2014","id":"t1:1","name":"Task 1-1","resource":"Chris","start":"1/1/2014"},"children":[{"attr":{"end":"2/1/2014","id":"t1:1:1","name":"Task 1-1-1","resource":"Henry","start":"1/1/2014"}},{"attr":{"end":"3/1/2014","id":"t1:1:2","name":"Task 1-1-2","resource":"Victor","start":"2/1/2014"}}]},{"attr":{"end":"6/1/2014","id":"t1:2","name":"Task 1-2","resource":"Jim","start":"3/1/2014"},"children":[{"attr":{"end":"5/1/2014","id":"t1:2:1","name":"Task 1-2-1","resource":"Jay","start":"3/1/2014"}},{"attr":{"end":"6/1/2014","id":"t1:2:2","name":"Task 1-2-2","resource":"Karin","start":"5/1/2014"}}]},{"attr":{"end":"8/1/2014","id":"t1:3","name":"Task 1-3","resource":"Chadwick","start":"6/1/2014"}},{"attr":{"end":"10/1/2014","id":"t1:4","name":"Task 1-4","resource":"Chris","start":"8/1/2014"}}]}];
                    console.log("data -> " + JSON.stringify(data, null, 2));
                    self.dataSource(new oj.FlattenedTreeDataGridDataSource(new oj.JsonTreeDataSource(data), options));
                }
            );

            // $(
            //    async function(data)
            //     {
            //         data = await userAction();
            //         console.log(JSON.stringify(data, null, 2));
            //         self.dataSource(new oj.FlattenedTreeDataGridDataSource(new oj.JsonTreeDataSource(data), options));
            //     }
            // );

            // $.getJSON( "https://crossorigin.me/http://127.0.0.1:5002/employees",
            //     function(data)
            //     {
            //         console.log(JSON.stringify(data, null, 2));
            //         self.dataSource(new oj.FlattenedTreeDataGridDataSource(new oj.JsonTreeDataSource(data), options));
            //     }
            // ,"json");

            // $(
            //     function (){
            //         const axios = require('axios');
            //         axios
            //             .get("https://pure-mountain-71887.herokuapp.com",CONFIG.config)
            //             .then(response => {
            //                 console.log(JSON.stringify(response, null, 2))
            //             })
            //     }
            // );

        }
        const userAction = async () => {
            console.log("AQUI")
            const response = await fetch('https://pure-mountain-71887.herokuapp.com/employees')
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