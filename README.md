## Ejercicio Open Cells

El objetivo del ejercicio ha sido crear una aplicación para gestionar tareas:

- Crear tareas
- Editar

## Condiciones que he tenido en cuenta:

- He utilizado json server para la gestión de tareas.
- He añadido un icono de idioma y he gestionado el cambio entre los idiomas "es" y "en", y los literales están traducidos.
- He usado material design para los componentes y botones del formulario y login.
  - El login tiene un formulario de usuario y contraseña que permite el acceso al resto de la app. Para controlar si se ha accedido o no, se ha guardado en LocalStorage un token para comprobar si damos acceso o no al resto de la app.
  - Los campos tienen la validación de que el usuario tiene que estar relleno y tener una longitud superior a 3, y la contraseña tiene que estar también rellena y tener una longitud superior a 8.
  - He añadido un icono al input de contraseña para que permita mostrar y ocultar la contraseña.
- En el header he puesto un icono de retroceso que se muestra solo en las rutas edit-task-page y add-task-page.
  - En el home se muestran las tarjetas de las tareas con la selección, título, descripción, etiquetas y con un icono con la funcionalidad de eliminar, editar y un botón para crear las tareas.
- He definido un tipo de tarea para poder especificar su tipado con TypeScript para no usar any como tipo.
- Utilizando interceptor he configurado que una vez que se haya logueado se redirija a home y no se podrá volver a login a no ser que se borre el token guardado en LocalStorage.
- Desarrollada el control a la ruta not-found.
