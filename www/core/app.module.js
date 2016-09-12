angular.module("app", [
        "ngRoute",
        "firebase",
        "ngMaterial",
        "ngMdIcons",

        "app.profile",
        "app.auth",
        "app.firebase-storage",
        "app.memory-brick",
        "app.addmemory",
        "app.about"
    ])

    .filter("Round", Round)
    .filter("Cut", Cut);

Round.$inject = [];
function Round() {
        return function (number) {

                // if null or undefined pass it through
                return (number == null)
                    ? number
                    : Math.ceil(number);
        };
}

Cut.$inject = [];
function Cut () {
        return function (value, wordwise, max, tail) {
                if (!value) return '';

                max = parseInt(max, 10);
                if (!max) return value;
                if (value.length <= max) return value;

                value = value.substr(0, max);
                if (wordwise) {
                        var lastspace = value.lastIndexOf(' ');
                        if (lastspace != -1) {
                                //Also remove . and , so its gives a cleaner result.
                                if (value.charAt(lastspace-1) == '.' || value.charAt(lastspace-1) == ',') {
                                        lastspace = lastspace - 1;
                                }
                                value = value.substr(0, lastspace);
                        }
                }

                return value + (tail || ' …');
        };
}



