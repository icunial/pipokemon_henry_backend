GET https://pokeapi.co/api/v2/pokemon
GET https://pokeapi.co/api/v2/pokemon/{id}
GET https://pokeapi.co/api/v2/pokemon/{name}
GET https://pokeapi.co/api/v2/type

**Ruta principal**: debe contener

- [ ] Input de búsqueda para encontrar pokemons por nombre (La búsqueda será exacta, es decir solo encontrará al pokemon si se coloca el nombre completo)
- [ ] Área donde se verá el listado de pokemons. Al iniciar deberá cargar los primeros resultados obtenidos desde la ruta `GET /pokemons` y deberá mostrar su:
  - Imagen
  - Nombre
  - Tipos (Electrico, Fuego, Agua, etc)
- [ ] Botones/Opciones para filtrar por tipo de pokemon y por pokemon existente o creado por nosotros
- [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los pokemons por orden alfabético y por ataque
- [ ] Paginado para ir buscando y mostrando los siguientes pokemons, 12 pokemons por pagina.

**Ruta de detalle de Pokemon**: debe contener

- [ ] Los campos mostrados en la ruta principal para cada pokemon (imagen, nombre y tipos)
- [ ] Número de Pokemon (id)
- [ ] Estadísticas (vida, ataque, defensa, velocidad)
- [ ] Altura y peso

## Base de datos

El modelo de la base de datos deberá tener las siguientes entidades (Aquellas propiedades marcadas con asterísco deben ser obligatorias):

- [ ] Pokemon con las siguientes propiedades:
  - ID (Número de Pokemon) \* : No puede ser un ID de un pokemon ya existente en la API pokeapi
  - Nombre \*
  - Vida
  - Ataque
  - Defensa
  - Velocidad
  - Altura
  - Peso
- [ ] Tipo con las siguientes propiedades:
  - ID
  - Nombre

La relación entre ambas entidades debe ser de muchos a muchos ya que un pokemon puede pertenecer a más de un tipo y, a su vez, un tipo puede incluir a muchos pokemons.

**IMPORTANTE**: Pensar como modelar los IDs de los pokemons en la base de datos. Existen distintas formas correctas de hacerlo pero tener en cuenta que cuando hagamos click en alguno, este puede provenir de la API o de la Base de Datos por lo que cuando muestre su detalle no debería haber ambigüedad en cual se debería mostrar. Por ejemplo si en la API el pokemon `Bulbasaur` tiene id = 1 y en nuestra base de datos creamos un nuevo pokemon `Henry` con id = 1, ver la forma de diferenciarlos cuando querramos acceder al detalle del mismo.

## Backend

Se debe desarrollar un servidor en Node/Express con las siguientes rutas:

**IMPORTANTE**: No está permitido utilizar los filtrados, ordenamientos y paginados brindados por la API externa, todas estas funcionalidades tienen que implementarlas ustedes.

- [ ] **GET /pokemons**:
  - Obtener un listado de los pokemons desde pokeapi.
  - Debe devolver solo los datos necesarios para la ruta principal
- [ ] **GET /pokemons/{idPokemon}**:
  - Obtener el detalle de un pokemon en particular
  - Debe traer solo los datos pedidos en la ruta de detalle de pokemon
  - Tener en cuenta que tiene que funcionar tanto para un id de un pokemon existente en pokeapi o uno creado por ustedes
- [ ] **GET /pokemons?name="..."**:
  - Obtener el pokemon que coincida exactamente con el nombre pasado como query parameter (Puede ser de pokeapi o creado por nosotros)
  - Si no existe ningún pokemon mostrar un mensaje adecuado
- [ ] **POST /pokemons**:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de pokemons por body
  - Crea un pokemon en la base de datos relacionado con sus tipos.
- [ ] **GET /types**:
  - Obtener todos los tipos de pokemons posibles
  - En una primera instancia deberán traerlos desde pokeapi y guardarlos en su propia base de datos y luego ya utilizarlos desde allí

## Testing

- [ ] Al menos tener un componente del frontend con sus tests respectivos
- [ ] Al menos tener una ruta del backend con sus tests respectivos
- [ ] Al menos tener un modelo de la base de datos con sus tests respectivos
