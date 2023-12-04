# **Principios de la Arquitectura REST**
La arquitectura REST (Representational State Transfer) es un estilo arquitectónico utilizado en el diseño de sistemas distribuidos, especialmente en el desarrollo de servicios web.

## **1. Interfaz Uniforme**
La interfaz de un sistema REST debe ser uniforme para simplificar y mejorar la visibilidad de la arquitectura. Esto se logra a través de cuatro restricciones:

**1.1 Identificación de Recursos**

Los recursos, que pueden ser entidades físicas o conceptuales, son identificados mediante URIs (Uniform Resource Identifiers). Las URIs son proporcionadas por el desarrollador o el diseñador del sistema.

**1.2 Manipulación de Recursos a través de Representaciones**

Los clientes interactúan con los recursos a través de representaciones, como JSON o XML. Las operaciones comunes incluyen *GET* (obtener), *POST*(crear), *PUT* (actualizar) y *DELETE* (eliminar).

**1.3 Mensajes Autodescriptivos**

Cada mensaje enviado por el servidor contiene toda la información necesaria para entender y procesar la solicitud. La descripción de los mensajes está contenida en los propios mensajes, permitiendo la independencia entre clientes y servidores.

**1.4 HATEOAS (Hypermedia As The Engine Of Application State)**

La aplicación debe guiar al cliente a través de la interacción con hipervínculos dinámicos presentes en las representaciones. Estos enlaces son proporcionados por el servidor como parte de las respuestas a las solicitudes del cliente.

## **2. Estado Representacional**
El principio de *"Estado Representacional"* en la arquitectura REST implica que el estado de una aplicación o servicio se transfiere entre el cliente y el servidor en forma de representaciones de recursos. La aplicación cliente y servidor se comunican sin que el servidor almacene información sobre el estado del cliente entre las solicitudes.

**2.1 Representación de Recursos:**

En REST, un recurso es cualquier entidad o concepto que se puede identificar y manipular. Puede ser un objeto de datos, un servicio o cualquier otra cosa que tenga una identidad única.
El estado de un recurso se define por su representación, que puede ser en formato JSON, XML, HTML, u otro formato entendido por ambas partes (cliente y servidor).

**2.2 Transferencia de Estado:**

En lugar de enviar el estado completo de una aplicación con cada solicitud, REST transfiere solo la representación del estado actual del recurso solicitado.
Las solicitudes del cliente al servidor contienen información suficiente para que el servidor comprenda y procese la solicitud.

**2.3 Sin Almacenamiento de Estado en el Servidor:**

La arquitectura REST es *"sin estado"* (stateless), lo que significa que el servidor no almacena información sobre el estado del cliente entre solicitudes.
Cada solicitud del cliente al servidor es independiente y autocontenida.

**2.4 Independencia de Estado del Cliente:**

La aplicación cliente es responsable de gestionar su propio estado. Cada vez que se necesita realizar una operación, el cliente envía la información necesaria al servidor.
Esto permite una mayor escalabilidad y facilita la implementación de sistemas distribuidos.

**2.5 Facilita la Escalabilidad:**

Al no almacenar el estado del cliente en el servidor entre solicitudes, se reduce la carga en el servidor y se facilita la escalabilidad horizontal del sistema.

**2.6 Ejemplo Práctico:**

Un ejemplo sería un servicio de carrito de compras en una tienda en línea. El estado del carrito *(productos seleccionados, cantidades, etc.)* se representa en el cliente y se envía al servidor solo cuando se realiza una acción como agregar o eliminar un producto.

## **3. Sistema Cliente-Servidor**
La arquitectura REST separa la interfaz de usuario y la lógica del servidor, lo que facilita la escalabilidad y la evolución independiente de ambas partes.

**3.1 Separación de Responsabilidades:**

En un sistema cliente-servidor basado en REST:

* ***Cliente:*** Representa la interfaz de usuario o la aplicación que consume los servicios proporcionados por el servidor. Es responsable de la presentación y la interacción del usuario.
* ***Servidor:*** Maneja las solicitudes del cliente, procesa la lógica de negocio y gestiona los recursos. El servidor es responsable de almacenar y procesar datos, así como de gestionar el acceso a esos datos.

**3.2 Independencia y Escalabilidad:**

La separación entre el cliente y el servidor permite que ambas partes evolucionen de forma independiente. Los cambios en la interfaz de usuario *(cliente)* no afectan directamente la lógica del servidor y viceversa.

Facilita la escalabilidad, ya que los servidores pueden ser escalados independientemente de los clientes. Esto permite gestionar eficientemente la carga y la demanda, ya que se pueden agregar servidores para manejar un mayor número de solicitudes sin afectar directamente a los clientes.

**3.3 Comunicación mediante Protocolos Estándar:**

La comunicación entre el cliente y el servidor se realiza mediante protocolos estándar, como HTTP en el caso de aplicaciones web RESTful. Esto permite que diferentes clientes (p. ej., navegadores web, aplicaciones móviles) se conecten a un servidor utilizando un protocolo común.

**3.4 Ejemplo Práctico:**

En una aplicación web basada en REST, el cliente (navegador web) solicita recursos al servidor utilizando solicitudes HTTP *(GET, POST, PUT, DELETE)*. El servidor, a su vez, procesa estas solicitudes, accede a la base de datos o realiza operaciones necesarias, y envía las respuestas correspondientes al cliente.

La interfaz de usuario (UI) y la experiencia del usuario (UX) están a cargo del cliente, mientras que la lógica de negocio y el manejo de datos están en manos del servidor.

**3.5 Beneficios:**

* ***Modularidad:*** La separación permite dividir la aplicación en módulos independientes, facilitando el desarrollo y el mantenimiento.
* ***Escalabilidad:*** Permite escalar el servidor de manera independiente según las necesidades de carga.
* ***Independencia de Plataforma:*** Clientes y servidores pueden implementarse en diferentes tecnologías sin afectar la comunicación.

## **4. Sin Estado (Stateless)**
Cada solicitud del cliente al servidor debe contener toda la información necesaria para entender y procesar la solicitud. El servidor no debe almacenar ningún estado del cliente entre las solicitudes.

**4.1 Independencia entre Solicitudes:**

Cada solicitud del cliente al servidor en una arquitectura REST es independiente. No hay estado almacenado en el servidor entre solicitudes, lo que significa que cada solicitud se puede entender y procesar de manera aislada.

**4.2 No Almacenamiento de Estado del Cliente en el Servidor:**

El servidor no guarda información sobre el estado del cliente entre solicitudes. Cada solicitud del cliente lleva consigo toda la información necesaria para que el servidor comprenda y responda adecuadamente.

**4.3 Beneficios:**

* ***Escalabilidad:*** Al ser stateless, la arquitectura REST facilita la escalabilidad horizontal, ya que los servidores pueden manejar solicitudes de manera independiente sin depender del estado del cliente.
* ***Sencillez:*** La simplicidad de no tener que mantener estados entre solicitudes simplifica la implementación y la gestión de los servicios.
* ***Independencia:*** Cada solicitud es autosuficiente, lo que permite a los clientes y servidores evolucionar independientemente sin afectar el comportamiento global del sistema.

**4.4 Ejemplo Práctico:**

Un ejemplo típico es una aplicación web RESTful donde un cliente realiza una solicitud al servidor para obtener información sobre un recurso específico. La solicitud contiene todos los detalles necesarios, como el identificador del recurso y cualquier otro parámetro necesario para la operación.

Cada vez que se realiza una nueva solicitud, el servidor utiliza la información proporcionada en esa solicitud para determinar cómo procesarla y qué respuesta enviar al cliente.

## **5. Cacheabilidad**
Las respuestas deben indicar si son o no cacheables. La implementación de un sistema de caché mejora la eficiencia y la escalabilidad de la arquitectura.

**5.1 Cacheabilidad de Respuestas:**

La cacheabilidad implica que las respuestas del servidor pueden ser almacenadas temporalmente en caché por parte del cliente. Esto significa que un cliente puede reutilizar la respuesta almacenada en caché en lugar de solicitar la misma información al servidor nuevamente.

**5.2 Beneficios de la Cacheabilidad:**

* ***Mejora el Rendimiento:*** Al permitir que los clientes almacenen en caché las respuestas, se reduce la necesidad de realizar solicitudes adicionales al servidor para obtener la misma información, mejorando así el rendimiento y la eficiencia.
* ***Reducción de la Latencia:*** Al evitar solicitudes repetitivas al servidor, se reduce la latencia de la red y se mejora la velocidad de carga de la aplicación.

**5.3 Control de Cacheabilidad:**

REST proporciona mecanismos específicos, como las cabeceras HTTP Cache-Control, Expires, y ETag, que permiten al servidor y al cliente controlar cómo y cuándo se deben almacenar en caché las respuestas, así como la duración de la caché.

**5.4 Ejemplo Práctico:**

En una aplicación web RESTful, cuando un cliente realiza una solicitud GET para recuperar un recurso, el servidor puede incluir información de cacheabilidad en la respuesta. Por ejemplo, el servidor puede indicar que la respuesta puede ser almacenada en caché durante cierto período de tiempo.

En solicitudes futuras para el mismo recurso, el cliente puede utilizar la copia almacenada en caché, siempre y cuando la información de cacheabilidad lo permita.

**5.5 Consideraciones de Cacheabilidad:**

La cacheabilidad debe gestionarse cuidadosamente, especialmente para recursos que pueden cambiar con el tiempo. El uso de mecanismos como ETags puede ayudar a garantizar que la información en caché esté sincronizada con el estado actual del recurso en el servidor.

Las aplicaciones que requieren datos en tiempo real o dinámicos pueden necesitar configurar la cacheabilidad de manera diferente para garantizar la frescura de la información.

## **6. Sistema de Capas**
La arquitectura puede estar compuesta por múltiples capas, donde cada capa realiza una función específica. Cada capa solo conoce la capa inmediatamente inferior o superior, lo que mejora la modularidad y facilita la escalabilidad.

**6.1 Separación de Funcionalidades:**

Cada capa en un sistema RESTful tiene una función claramente definida. Puede haber capas para la gestión de datos, la lógica de negocio, la interfaz de usuario, la seguridad, etc.

**6.2 Independencia y Escalabilidad:**

La separación de capas permite que diferentes partes del sistema evolucionen de manera independiente. Por ejemplo, se pueden actualizar las capas superiores (interfaz de usuario) sin afectar directamente a las capas inferiores (lógica de negocio o almacenamiento de datos).
Facilita la escalabilidad ya que cada capa puede escalarse por separado según las necesidades.

**6.3 Comunicación Entre Capas:**

Las capas se comunican entre sí a través de interfaces bien definidas. Una capa puede solicitar servicios de la capa inmediatamente inferior y responder a solicitudes de la capa inmediatamente superior.

**6.4 Ejemplo Práctico:**

En una aplicación web RESTful, las capas podrían incluir:
Capa de Presentación (Interfaz de Usuario): Maneja la presentación de la información y la interacción del usuario.
Capa de Lógica de Negocio: Procesa las solicitudes, realiza operaciones comerciales y maneja la lógica específica de la aplicación.
Capa de Acceso a Datos: Interactúa con la base de datos o almacén de datos para recuperar o persistir información.

**6.5 Beneficios del Sistema de Capas:**

* ***Modularidad:*** La separación en capas permite una estructura modular, facilitando el desarrollo y la comprensión del sistema.
* ***Reutilización de Componentes:*** Los componentes específicos de una capa pueden reutilizarse en diferentes partes del sistema o en diferentes aplicaciones.
* ***Mantenimiento y Evolución Independientes:*** Las capas pueden actualizarse y evolucionar de forma independiente, siempre que mantengan la compatibilidad con las interfaces establecidas.

**6.6 Consideraciones:**

* Cada capa debe ser diseñada para realizar una tarea específica sin depender demasiado de los detalles internos de otras capas.
* La comunicación entre capas debe ser eficiente y seguir los principios de REST, utilizando protocolos estándar como HTTP.

## **7. Código Bajo Demanda (Optional)**
La restricción de *"Código Bajo Demanda"* es uno de los principios de la arquitectura REST, aunque es importante destacar que es opcional y no siempre se implementa. Este principio sugiere que el servidor puede proporcionar funcionalidades específicas o incluso el código ejecutable al cliente en forma de applets o scripts.

**7.1 Descarga de Código al Cliente:**

Permite que el servidor envíe código ejecutable al cliente en respuesta a una solicitud. Esto puede incluir scripts, applets u otro código que el cliente puede ejecutar.

**7.2 Ejecución Dinámica:**

El cliente puede ejecutar el código recibido dinámicamente para mejorar o extender su funcionalidad.

**7.3 Beneficios del Código Bajo Demanda:**

* ***Flexibilidad:*** Permite que la funcionalidad del cliente se extienda dinámicamente sin necesidad de una actualización completa de la aplicación.
* ***Reducción de la Carga Inicial:*** Puede reducir la cantidad de código que el cliente necesita descargar inicialmente, ya que solo obtiene el código necesario cuando es necesario.

**7.4 Casos de Uso:**

*JavaScript en Navegadores Web:* La carga de scripts JavaScript en el navegador es un ejemplo común de código bajo demanda. Los navegadores pueden solicitar y ejecutar scripts adicionales según sea necesario.

*Plug-ins en Aplicaciones:* Algunas aplicaciones permiten la descarga e instalación de plug-ins o módulos adicionales de manera dinámica.

**7.5 Consideraciones:**
* ***Seguridad:*** La ejecución de código desde el servidor en el cliente plantea preocupaciones de seguridad. El código recibido debe ser confiable y seguro para ejecutarse en el entorno del cliente.
* ***Compatibilidad:*** La implementación del código bajo demanda puede no ser compatible con todos los entornos de ejecución del cliente.
* ***Complejidad:*** Puede agregar complejidad al diseño y mantenimiento de la aplicación debido a la dinámica asociada con la ejecución de código en el cliente.

-------------------------

***Estos principios proporcionan las bases para el diseño de sistemas RESTful, permitiendo la creación de servicios web escalables, simples y eficientes.***

-------------------------
### INSTITUTO TECNOLOGICO DE NUEVO LAREDO
#### Desarrollo API REST:computer:

**Nombre del Alumno:** *Jonathan Alonso Lara*  
**Numero de control:** *#19100141*  
<br></br>

![LogoTec](http://www.itnuevolaredo.edu.mx/images/resources/Soto/Logo/Logo.png)