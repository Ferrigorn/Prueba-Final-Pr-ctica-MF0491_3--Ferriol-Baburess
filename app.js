//Creación de las clases
class Alimento{
    constructor(nombre, calorias, nutrientes){
        this.nombre = nombre;
        this.calorias = calorias;
        this.nutrientes = nutrientes;
        }
}
 //Creación de las subclases
class Verdura extends Alimento {
    constructor(nombre, calorias, nutrientes, conservacion){
    super(nombre, calorias, nutrientes);
    this.conservacion = conservacion;
    }
}
class Fruta extends Alimento {
    constructor(nombre, calorias, nutrientes, conservacion){
    super(nombre, calorias, nutrientes);
    this.conservacion = conservacion;
    }
}
class Carne extends Alimento {
    constructor(nombre, calorias, nutrientes, conservacion){
    super(nombre, calorias, nutrientes);
    this.conservacion = conservacion;
    }
}
class Lacteos extends Alimento {
    constructor(nombre, calorias, nutrientes, conservacion){
    super(nombre, calorias, nutrientes);
    this.conservacion = conservacion;
    }
}
class Legumbres extends Alimento {
    constructor(nombre, calorias, nutrientes, conservacion){
    super(nombre, calorias, nutrientes);
    this.conservacion = conservacion;
    }
}

//Instancias de las clases

//Para Alimento
const alimento1 = new Alimento('Verdura', '100', ['Vitaminas', 'carbohidratos']);
const alimento2 = new Alimento('Frutas', '100', ['Vitaminas', 'Carbohidratos'] );
const alimento3 = new Alimento('Carne', '300', ['Proteínas', 'Lipidos']);
const alimento4 = new Alimento('Lácteos', '100', ['Vitaminas', 'Lípidos']);
const alimento5 = new Alimento('Legumbres', '100', ['Carbohidratos', 'Vitaminas']);

//Para Verdura
const verdura1 = new Verdura('Lechuga', '100',['Vitaminas', 'carbohidratos'], 'Nevera');
const verdura2 = new Verdura('Zanahoria', '100',['Vitaminas', 'carbohidratos'], 'Nevera');
const verdura3 = new Verdura('Tomate', '100',['Vitaminas', 'carbohidratos'], 'Nevera');

//Para Fruta
const fruta1 = new Fruta('Manzana', '50', ['Vitaminas', 'carbohidratos'], 'Mucho');
const fruta2 = new Fruta('Pera', '50', ['Vitaminas', 'carbohidratos'], 'Nevera');
const fruta3 = new Fruta('Plátano', '50', ['Vitaminas', 'carbohidratos'], 'Come rápido');

//Para Carne
const carne1 = new Carne('Carne Roja', '250', ['Proteínas', 'Lípidos'], '1Semana');
const carne2 = new Carne('Carne Blanca', '150', ['Proteínas', 'Lípidos'], '1Semana');



const alimentos = [alimento1, alimento2, alimento3, alimento4, alimento5, verdura1, verdura2, verdura3, fruta1, fruta2, fruta3, carne1, carne2];
document.addEventListener("DOMContentLoaded", function() {
    const alimentosSection = document.getElementById('alimentos');
    const resultadosSection = document.getElementById('resultados');
    const resultadosComparacion = document.getElementById('resultadosMaximo');

    let caloriasTotalMax = 0;
    
    // Función para agregar alimento consumido por el usuario
    function agregarCampoAlimento() {
        const nuevoCampo = document.createElement('div');
        nuevoCampo.innerHTML = `
            <label for="alimento">Alimento:</label>
            <select name="alimento" onchange="mostrarOpciones(this)">
                <option value="seleccionar" disabled selected>Seleccionar</option>
                ${crearOpcionesAlimentos()}
            </select>
            <div id="opciones"></div>
            <label for="cantidad">Cantidad (Kcal):</label>
            <input type="text" name="cantidad" placeholder="Ingrese la cantidad(Kcal)" required>
        `;
        alimentosSection.appendChild(nuevoCampo);
    }

    // Función para crear las opciones del desplegable
    function crearOpcionesAlimentos() {
        let opciones = '';
        alimentos.forEach(alimento => {
            opciones += `<option value="${alimento.nombre}">${alimento.nombre}</option>`;
        });
        return opciones;
    }
     
    
    
    // Función para calcular las calorías
        function calcularCalorias() {
            let caloriasTotal = 0;
    
            let resultadosHTML = `
                <h2>Resultados:</h2>
                <table>
                    <tr>
                        <th>Alimento</th>
                        <th>Cantidad</th>
                        <th>Nutrientes</th>
                        <th>Conservación</th>
                    </tr>
            `;
    
            const alimentosInputs = document.getElementsByName('alimento');
            const cantidadesInputs = document.getElementsByName('cantidad');
    
            for (let i = 0; i < alimentosInputs.length; i++) {
                const tipoAlimento = alimentosInputs[i].value;
                const cantidad = parseInt(cantidadesInputs[i].value);
    
                // Validar duración ingresada
                if (isNaN(cantidad) || cantidad <= 0) {
                    alert('Por favor, ingrese una cantidad válida para el alimento ' + alimentosInputs[i].value);
                    return;
                }
    
                let nutrientesAlimento = '';
                let conservacion = '';
    
                // Buscar el destino seleccionado en la lista de alimentos
                const alimentoseleccionado = alimentos.find(alimento => alimento.nombre === tipoAlimento);
    
                if (alimentoseleccionado) {
                    // Asignar tipos de nutrientes según alimento 
                    if (alimentoseleccionado instanceof Verdura || alimentoseleccionado instanceof Alimento) {
                        nutrientesAlimento = alimentoseleccionado.nutrientes.join(', ');
                    }
    
                    // Determinar mejor época para viajar
                    if (alimentoseleccionado instanceof Verdura || alimentoseleccionado instanceof Fruta|| alimentoseleccionado instanceof Carne || alimentoseleccionado instanceof Lacteos) {
                        conservacion = alimentoseleccionado.conservacion;
                    
                    } else if (alimentoseleccionado instanceof Alimento) {
                        conservacion = 'En congelador mucho tiempo';}
                    
                    
    
                    // Agregar fila a la tabla de resultados
                    resultadosHTML += `
                        <tr>
                            <td>${alimentoseleccionado.nombre}</td>
                            <td>${cantidad}</td>
                            <td>${nutrientesAlimento}</td>
                            <td>${conservacion}</td>
                        </tr>
                    `;
    
                    caloriasTotal += cantidad;
                }
            }
    
            resultadosHTML += `</table>`;
            resultadosSection.innerHTML = resultadosHTML;
    
            // Mostrar duración total del viaje
            alert('La Ingesta total es ' + caloriasTotal + ' Kcal.');
            caloriasTotalMax = caloriasTotal;
    
        }
    
    function calcularComparacion(){
    
        let maximoKcal = document.getElementById('maximoKcal');
        let valorMaximo = parseFloat(maximoKcal.value);
    
        if(caloriasTotalMax > valorMaximo){
            let KcalSobrantes = caloriasTotalMax - valorMaximo;
            resultadosComparacion.innerHTML = `<p> Te has pasado  ${KcalSobrantes}Kcal de tu ingesta máxima diaria. ¡Al gimnasio! </p>`;
        } else if(caloriasTotalMax == valorMaximo){
            resultadosComparacion.innerHTML = `<p> Has ingerido la cantidad máxima diaria. Ahora ¡no comas más! </p>`;
        } else{
            let KcalRestantes = valorMaximo - caloriasTotalMax;
            resultadosComparacion.innerHTML = `<p> Aún puedes comer ${KcalRestantes}Kcal ¡A la nevera! </p>`;
        }
    }
    
    
    // Evento para agregar campo de destino al hacer clic en un botón
    document.getElementById('agregar_alimento').addEventListener('click', agregarCampoAlimento);
    
    // Evento para calcular el itinerario al hacer clic en un botón
    document.getElementById('calcular-calorias').addEventListener('click', calcularCalorias);
    
    // Evento para calcular la comparación de días al hacer clic en un botón
    document.getElementById('maxKcalDia').addEventListener('click', calcularComparacion);
    
    });
    

    // Cosas que faltan
    //La función para calcular las kcal ingeridas con el número de elementos comidos (usuario introduce numero de platanos, se calcula automaticamente cuantas kcal són)
    //modo light/dark así como alguna otra opción de accesibilidad
