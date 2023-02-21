<div align="center">
    <img width="200" height="200"
      src="https://libertex.org/sites/default/files/inline-images/forex2.0_2.jpg">
  
  <h1>TRADER APP</h1>
</div>

## Objetivo
El objetivo es crear un sistema de compra-venta de monedas.
Los clientes del sitio tienen en su cuenta, una cantidad de dinero que depositan en pesos y pueden
convertir a cualquier moneda al precio actualizado.
## Descripción
La Aplicacion consta de un backend y frontend en el mismo repositorio.
El Backend esta implementado con NodeJS(Typescript) + SQLite para la persisitencia de los datos, utilizando TypeOrm como Orm.

En cuanto al Frontend, este esta desarrollado en Angular 9, y consta de 3 vistas principales, `login`, `signup` y `home` y por simplicidad se utilizaron los modulos de Angular Materials para el maquetado y vistas de los componentes.
Para lo que respecta a los forms para el alta de cuentas y depositos, se utilizarom modals(`Dialogs de Materials`).

La base de datos esta compuesta de dos tablas: `Users` y `MonetaryAccount`,   relacionadas  1-n & n-1 respectivamente.


En la tabla `Users` se guardan los atributos:

- firstName
- lastName
- email
- password


En la tabla `MonetaryAccount` se guardan los atributos:

- type >>   tipo de divisa (codigoISO) eg. USD, ARS
- amount >>    monto diponible en la cuenta
- userId >> usuario al que le pertence esta cuenta

Al momento de darse de alta en la aplicacion, por default  crea una cuenta en pesos (`ARS`) con monto en cero y se la asigna al usuario.

Cada cuenta es unica, por loque no se pueden compartir entre usuarios


Casos de uso:

1. El Cliente abre una cuenta, la cuenta permite tener depósitos(`MonetaryAccounts`) en multiples divisas.
2. El Cliente deposita una cantidad X de pesos (ejemplo: 10.000 pesos) en su caja en pesos. Al sistema
solo ingresan pesos argentinos.
3. El Cliente compra otra moneda al tipo de cambio vigente con el dinero de cualquiera de sus cajas.
Por ejemplo: cambia 7.000 pesos a USD, ahora tiene 3.000 pesos y el equivalente a 7.000 pesos en
su caja en USD.

## Documentación API
La api esta segucurizada con JWT  por lo que para la utilizacion de la API es necesario el inicio de sesion para obtener el token de acceso.
La ruta POST /users, no estan securizadas, ya que esta se utiliza para registrarse en la aplicacion.

Para obtener el listado completo de usuarios, se debe hacer el request vacio.

`GET /users/`

    curl -i -H 'Accept: application/json' http://localhost:3000/users

### Response

    [{
      firstName:"",
      lastName:"",
      email:"",
    }]
}

`GET /users/:id=1/`
     Para obtener un usuario en especifico, es necesario enviar por Paramas el email de dicho usuario.
    curl -i -H 'Accept: application/json' http://localhost:3000/users/1

### Response
    {
      firstName:"",
      lastName:"",
      email:"",
    }


}

## Create User
El metodo POST user recibe un objeto con los atributos del usuario.
Incluida la password, ya que ese metodo se usa para el registro
    {
      firstName:"",
      lastName:"",
      email:"",
      password:""
    }

    Punto a tene en cuenta:
    1: *El email no debe estar registrado previamente en el sistema
### Request

`POST /users/`

    curl -i -H 'Accept: application/json' --request POST -d ' {firstName:"", lastName:"", email:"", password:""}'
    http://localhost:3000/user

### Response
    {
      firstName:"",
      lastName:"",
      email:""    
    }
    
}

### Request

Metodo para comprar divisias, recibe el id de la cuenta de la moneda que con la que se quiere comprar, el monto, el usurio de dicha cuenta y el tipo de divisa a comprar.

`PUT /accounts/:id`

    curl -i -H 'Accept: application/json' --request POST -d ' {type:"USD", amount:1200, user_id:1}'
    http://localhost:3000/user

### Response
    {
      id: int 
    }

### Request

Metodo para abrir una cuenta, recibe el usuario al que se le asignara la cuenta y el tipo.

`POST /accounts`

    curl -i -H 'Accept: application/json' --request POST -d ' {type:"USD", user_id:1}'
    http://localhost:3000/user

### Response
    {
      id: int,
      type: string,
      amount: 0 
    } 



## Development

### Requerimientos
- NodeJs instalado (12.x.x)
- SQLite
- Angular 9
- Visual Studio Code

La el motor de base de datos para este proyecyo es SQLite ya que para el momento de correr la app en  local no requiere realizar instalcion o configuracion extra. Simplemente con instalar las dependencias(`npm install`) dentro del directorio backend es suficiente.


### Local Deploy
Para correr la aplicacion en local, se deben instalar las dependencias ejecuntado el comando `npm install` en los directorios backend y frontend y luego 
debe que ejecutar el comando `npm run dev` estando ubicado en le directorio /frontend. (este comando levanta la API en el puerto 3000 y el frontend  en el puerto 4200).
Se debe ingresar en el navegador: http://localhost:4200

### Disclaimer
Esta aplicacion no se encunetra deployada ni hosteada en la web. Por lo que para su testeo es necesario levantar la aplicacion en local.

### No-Gos
* Nos estan implementados los metodos para la baja, tanto de cuenta como de usuarios.
* No se pueden crear cuentas que no estan viculadas almenos 1 usuario.
* Las cuentas no pueden ser compartidas entre usuarios
* Un usuario por defaul(por codigo) siempre se le asigna una cuenta en pesos.
* Un usuario no puede tener mas de una cuenta del mismo tipo de moneda.
* Una vez que compro una divisa, este no se puede vender, a menos que se compre otra divisa con esta.
* El sitema no muestra el valor de la moneda en Euros en la vista. El calculo para comprar divisas se realiza por codigo en backend.

### Instrucciones para su uso:
1. Luego de levantar el sistema, es necesario darse  de alta en el mismo mediante el form de registro brindado en la pantalla de login.
2. Para dar de alta una cuenta , en el sidenav al hacer click en el primer item se abre un subitem el cual al seleccionarlo, abre un modal que te permite elegir el tipo de cuenta que se quiere abrir.
Este tipos de cuentas se obtuvieron a partir de un json sacado de la web.
3. Solo se pueden ingresar dinero en la duenta de pesos argentinos, donde a partir de este saldo, se pueden comprar divisas de otro tipo que tenga abierto el usuario.
4. Se puenden comprar divisas con cualquier cuenta que el usuario tenga abierta. Peros solo puede depositar dinero en la cuenta de pesos.
5. Para comprar una divisa, la aplicacion levanta un modal donde se pide elegir con que cuentase  (que el usuario tenga creada) queire comprar dicha divisa. Luego de crearla si la operacion es valida actualiza los montos.
5. Los valores de las monedas se obtienen de la api fixer.io al momento de comprar una moneda.
