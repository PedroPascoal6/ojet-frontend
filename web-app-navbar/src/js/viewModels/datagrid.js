
require(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojmodel', 'ojs/ojcollectiontabledatasource', 'ojs/ojtable', 'mockjax', 'customrest'],
    function(oj, ko, $)
    {
        function viewModel() {
            var self = this;

            var serviceURL = "https://jsonplaceholder.typicode.com/";

            function getVerb(verb) {
                if (verb === "read" || verb === "update") {
                    return "POST";
                }
                if (verb === "delete") {
                    return "PATCH";
                }
                if (verb === "create") {
                    return "PUT"
                }
            };

            function getURL(operation, collection, options) {
                var retObj = {};
                retObj['type'] = getVerb(operation);
                if (operation === "delete" || operation === "update") {
                    retObj['url'] = serviceURL + operation + "/" + collection.id;
                }
                else {
                    retObj['url'] = serviceURL + operation;
                }
                if (operation ==="delete") {
                    // Check for record ID
                    equal(options['recordID'], 27, "Check recordID on delete");
                }
                retObj['headers'] = {};
                retObj['headers']['testopt'] = 'value';
                return retObj;
            };

            self.DeptCol = ko.observable();
            self.datasource = ko.observable();

            self.parseSaveDept = function (response) {
                return {DepartmentId: response['DepartmentId'],
                    DepartmentName: response['DepartmentName'],
                    LocationId:response['LocationId'],
                    ManagerId:response['ManagerId']};
            };

            self.parseDept = function(response) {
                return {DepartmentId: response['DepartmentId'],
                    DepartmentName: response['DepartmentName'],
                    LocationId: response['LocationId'],
                    ManagerId: response['ManagerId']};
            };
            self.Department = oj.Model.extend({
                urlRoot: serviceURL,
                parse: self.parseDept,
                parseSave: self.parseSaveDept,
                idAttribute: 'DepartmentId'
            });

            self.myDept = new self.Department();

            self.parseTaskCollection = function(response) {
                if (response.hasOwnProperty('collection')) {
                    var subVal = response['collection'];
                    if (subVal.hasOwnProperty('array')) {
                        return subVal['array'].Departments;
                    }
                }
                return response;
            };

            self.DeptCollection = oj.Collection.extend({
                customURL: getURL,
                model: self.myDept,
                parse: self.parseTaskCollection,
                comparator: "DepartmentId"
            });

            self.DeptCol(new self.DeptCollection());

            $.getJSON("todos/1",
                function (data) {
                    new CustomURLServer(data, false, "DepartmentId", undefined, serviceURL, /^http:\/\/myserver\/.+\/([\d]+)$/i);
                    self.datasource(new oj.CollectionTableDataSource(self.DeptCol()));
                });
        }
        var vm = new viewModel;

        $(document).ready(
            function() {
                ko.applyBindings(vm, document.getElementById('mainContent'));
            }
        );
    });

