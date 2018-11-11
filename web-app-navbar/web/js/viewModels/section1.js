let dataArray;
require(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout',
        'ojs/ojdatagrid', 'ojs/ojarraydatagriddatasource'],

    function(oj, ko, $)
    {

        function viewModel(dataArray)
        {
            console.log("viewModel")
            let self = this;
            console.log(dataArray);
            self.dataSource = new oj.ArrayDataGridDataSource(dataArray);
        }
        $(
            function()
            {
                getDataFromAPI()
                    .then(async dataArray=>{
                        console.log("Apply Bindings");
                        ko.applyBindings(new viewModel(dataArray), document.getElementById('datagrid'));
                    })
                    .catch(async ()=>{
                            console.log("error")
                    }
                    );
            }
        );

        async function getDataFromAPI(){
            let myJson = await userAction();
            this.dataArray = [
                ['userID','id','title','completed'],
                [myJson.userId,myJson.id,myJson.title,myJson.completed]
            ];
            console.log(this.dataArray);
            console.log(JSON.stringify(myJson, null, 2));
            return this.dataArray;
        }

        const userAction = async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
            const myJson = await response.json(); //extract JSON from the http response
            return myJson;
        }

    });

