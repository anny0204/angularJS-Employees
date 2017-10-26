angular.module('EmployeesApp', [])
.controller('EmployeesCtrl', function ($scope) {
//***Info about employees
    $scope.persons = todoModel.read();
//***Show/hide form for edeeting or deleting information about employee
    $scope.editFormVisible = false;
//***Show/hide the main form with information about all employees 
    $scope.mainFormVisible = false;
//***Show/hide the registration form
    $scope.registrationFormVisible = true;
//***Show/hide error message on the registration form
    $scope.showError = false;
//***Show/hide message about wrong registration data
    $scope.showMessage = false;

//*******Open form for edeeting or deleting information about employee******
    $scope.showEditForm = function (personInfo) {
        if (personInfo.position == 'Manager' || personInfo.position == 'Admin')
            showModalInfo("You don't have permission to edit or delete this position!");
            else
        {
            $scope.personInfo = personInfo;
            $scope.editFormVisible = true;
        }
    };

//*******Close form for edeeting or deleting information about employee******
    $scope.cancelEdit = function () {
        $scope.editFormVisible = false;
    };

//*******Update employee info******
    $scope.confirmEdit = function () {
        $scope.editFormVisible = false;
        todoModel.updateItem($scope.personInfo.id, $scope.personInfo);
    };

//******Check registration form validation******
    $scope.getError = function (error) {
        if (angular.isDefined(error)) {
            if (error.required) {
                return "This field can not be empty!";
            }
        }
    }

//******Check uer login/password*******
    $scope.signInBtnClick = function (user, isValid) {
        let loginInfo = [];
        let defaultPassword = '12345678';
        for (let i = 0; i < $scope.persons.length; i++) {
            loginInfo.push($scope.persons[i].fName + $scope.persons[i].lName);
        };

        if (isValid) {

            if (defaultPassword == user.password && loginInfo.filter(function (e) {
                return e == user.login;
            })) {
                $scope.registrationFormVisible = false;
                $scope.mainFormVisible = true;
            }
            else
                $scope.showMessage = true;
        } else
            $scope.showError = true;
    };

//******Deleting employee******

    $scope.deleteEmployee = function (id) {
        $scope.editFormVisible = false;
        todoModel.removeItem(id, $scope.persons);
    };
});
