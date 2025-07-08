# Portafolio 
Este repositorio tiene como objetivo funcionar como portafolio profesional, en el cual se presentan los proyectos, experiencia, habilidades y contacto. Su proposito es brindar mayor visibilidad al perfil, generar oportunidades de contacto y facilitar el acceso a posibles colaboraciones o propuestas laborales.

## Tabla de Contenidos
- [Instalacion de Dependencias](#instalacion-de-dependencias)
- [Correr Proyecto](#correr-proyecto)

## Instalacion de Dependencias
Para correr este proyecto en local y poder ejecutarlo debes seguir los siguientes passos.

1.**Instalacion de NPM**: Para este proyecto se necesita la instalacion de npm y node. A la fecha actual de este documento se esta trabajando con las siguientes versiones:
  ```
  node: v22.16.0
  npm: 10.9.2
  ```
Para verificar que version tiene instalado en tu sistema puedes ejecutar los siguientes comandos:
```
node -v
npm -v
```
En caso de no ser la misma version o no tenerlo instalado puedes ingresar al siguiente link y descargarlo: https://nodejs.org/es. Asegurate de descargar la misma version o una posterior a la que esta en este documento.

2.**Instalacion de Angular**: Para este proyecto se utiliza el Framework de Angular. Actualmente se esta trabajando con la siguiente version:
```
20.0.0
```
Para verificar la version que tiene en su sistema puedes ejecutar el siguiente comando:
```
ng --version
```
En caso de no tener la misma version o no tenerlo instalado puedes ejecutar el siguiente comando:
```
npm install -g @angular/cli
```
Este comando instalará la última versión de Angular CLI en tu equipo. Es importante tener en cuenta que puedes tener instalada una versión más reciente de Angular (por ejemplo, la versión 40), mientras que el proyecto puede estar desarrollado en una versión anterior (como la 20), y no habrá ningún problema: el proyecto funcionará correctamente.

Sin embargo, si deseas actualizar el proyecto a la última versión de Angular, es recomendable revisar cuidadosamente los cambios y posibles rupturas introducidos en las nuevas versiones. Angular suele modificar patrones, estructuras o dependencias entre versiones, lo que puede hacer que ciertas funcionalidades dejen de funcionar si no se adaptan.

En resumen: puedes tener una versión más actual en tu máquina que la del proyecto sin que eso afecte su ejecución, pero actualizar el proyecto sí requiere una evaluación previa para evitar errores inesperados.

3.**Instalar carpeta de node_modules**: Angular requiere una serie de dependencias adicionales para poder ejecutar correctamente el proyecto. Estas dependencias están definidas en el archivo package.json, y se instalarán automáticamente con el siguiente comando:
```
npm install
```
Este comando analizará el archivo de configuración del proyecto y descargará todas las librerías necesarias dentro de la carpeta node_modules.

## Correr Proyecto
Una vez tengas todos los programas necesarios para correr el proyecto, debes estar en la raiz del proyecto, abrir una nueva terminal y ejecutar el siguiente comando para correr el proyecto en tu maquina:
```
ng serve
```
Esto correra el proyecto y te dira en la termina que el proyecto se esta ejecutando en la siguiente direccion *http://localhost:4200*
