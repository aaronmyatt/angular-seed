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

    .filter("Round", Round);

Round.$inject = [];
function Round() {
        return function (number) {

                // if null or undefined pass it through
                return (number == null)
                    ? number
                    : Math.ceil(number);
        };
}



