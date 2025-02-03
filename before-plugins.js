module.exports = function (context) {
    // Agregar dependencias necesarias antes de que se carguen los plugins
    context.addBuildFilesDependency(
        {
            gradleFile: 'platforms/android/build.gradle',
            dependency: "classpath 'com.google.gms:google-services:4.3.10'",
            target: 'dependencies'
        },
        {
            gradleFile: 'platforms/android/app/build.gradle',
            dependency: "apply plugin: 'com.google.gms.google-services'",
            target: 'afterLast'
        }
    );
};