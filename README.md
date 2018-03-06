# Problema

Muchas veces la gestión de usuarios activos y los permisos dentro de la aplicación pueden complicarse si no se hace un planteamiento acertado desde un primer momento.

# Solución

Proponer una solución de base que resuelva los problemas se gestión y seguridad de usuarios más cotidianos como establecer el usuario activo en memoria mientras se ejecute la aplicación, proteger rutas contra accesos no autorizados, iniciar un usuario guardado al ejecutarse la aplicación, refrescar un token de manera transparente al usuario. 

# Manos a la obra

## Gestionar usuario activo después de un login

## Inicializar usuario al ejecutar la aplicación

## Proteger acceso a páginas mediante usuarios autenticados y roles

## Refrescar token de forma transparente

## Utilidades

# Ejecutar aplicación

Para ejecutar la aplicación basta con descargar el proyecto acceder desde la consola al directorio del mismo y ejecutar ``npm install`` y ``npm run start``.

## Testing

Para ejecutar los test accedemos desde la consola al directorio del proyecto y ejecutamos ``npm run test``. Los test generan un directorio con los resultados de la cobertura que podemos ver abriendo ``\coverage\index.html``.


**Configurar cobertura de test**

Para que al ejecutar los test se detecten todos los archivos de la aplicación y haga una cobertura global importamos en el archivo ``\src\test.ts`` el ``app.modules.ts``.

Si queremos excluir de la cobertura algún directorio o archivo lo podremos hacer en el archivo ``\.angular-cli.json`` dentro de la propiedad ``test.codeCoverage.exclude``.

La configuración general de la cobertura se define en el archivo ``\karma.conf.js`` dentro de la propiedad ``coverageIstanbulReporter``.

# Recursos

...

# Fuentes

[Angular Router Fundamentals: Child Routes, Auxiliary Routes, Master-Detail](https://blog.angular-university.io/angular2-router/)

[Angular Authentication: Using Route Guards](https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3)

[Run Code During App Initialization](https://www.intertech.com/Blog/angular-4-tutorial-run-code-during-app-initialization/)

[Start Loading](https://gitlab.ic.es.atos.net/angular-seedprojects/angular-start-loading)

[Redirect to Previous URL after Login with Auth Guard](http://jasonwatmore.com/post/2016/12/08/angular-2-redirect-to-previous-url-after-login-with-auth-guard)

[Access Token Response](https://www.oauth.com/oauth2-servers/access-tokens/access-token-response/)

[Angular 4 Interceptor retry requests after token refresh](https://stackoverflow.com/questions/45202208/angular-4-interceptor-retry-requests-after-token-refresh)

[Angular 4 Tutorial – Handling Refresh Token with New HttpInterceptor](https://www.intertech.com/Blog/angular-4-tutorial-handling-refresh-token-with-new-httpinterceptor/)
