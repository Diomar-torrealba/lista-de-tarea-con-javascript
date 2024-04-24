const lista = document.querySelector('#lista')
const elemento = document.querySelector('#elemento')
const input = document.querySelector('#input')
const botonEnter = document.querySelector('#boton-enter')
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'
let LIST
let id // para que inicie en 0 cada tarea tendra un id diferente
let contadorTotal = document.querySelector('#boton-total')
let contadorCompletadas = document.querySelector('#boton-completadas')
let contadorIncompletas = document.querySelector(' #boton-incompletas')
const total =lista.children.length;
// contadores para saber el total de tareas.
let tar=[];
let pinpo=0; 
console.log(lista.children.length)

const contador = () => {
    const totalTareas = lista.children.length;
    const totalTareasCompletadas = pinpo;
    
        const totalIncompletas = totalTareas - totalTareasCompletadas;
    
    

    contadorTotal.textContent = `Total : ${totalTareas}`;
    contadorCompletadas.textContent = `Completadas: ${totalTareasCompletadas}`;
    contadorIncompletas.textContent = `Incompletas: ${totalIncompletas}`;
};


// funcion de agregar tarea 

function agregarTarea( tarea,id,realizado,eliminado) {
    if(eliminado) {return} // si existe eliminado es true si no es false 

    const REALIZADO = realizado ? check : uncheck // si realizado es verdadero check si no uncheck

    const LINE = realizado ? lineThrough : '' 

    const elemento = `
                        <li id="elemento">
                        <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                        <p class="text ${LINE}">${tarea}</p>
                        <i class="fas fa-trash de" data="eliminado" id="${id}"></i> 
                        </li>
                    `
    lista.insertAdjacentHTML("beforeend",elemento)
    
    contador();
    
}



// funcion de Tarea Realizada 

function tareaRealizada(element) {
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    LIST[element.id].realizado = LIST[element.id].realizado ?false :true 
    
   pinpo++;
}



function tareaEliminada(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].eliminado = true
    console.log(LIST)

if    (pinpo>0)
{pinpo--;
} 

}


// para escuchar el enter y para habilitar el boton 

botonEnter.addEventListener('click', ()=> {
    const tarea = input.value
    if(tarea){
        agregarTarea(tarea,id,false,false)
        LIST.push({
            nombre : tarea,
            id : id,
            realizado : false,
            eliminado : false
        })
        localStorage.setItem('TODO',JSON.stringify(LIST))
        id++
        input.value = ''
        
    }

})

document.addEventListener('keyup', function (event) {
    if (event.key=='Enter'){
        const tarea = input.value
        if(tarea) {
            agregarTarea(tarea,id,false,false)
        LIST.push({
            nombre : tarea,
            id : id,
            realizado : false,
            eliminado : false
        })
        localStorage.setItem('TODO',JSON.stringify(LIST))
     
        input.value = ''
        id++
        console.log(LIST)
        }
    }
    contador();
})


lista.addEventListener('click',function(event){
    const element = event.target 
    const elementData = element.attributes.data.value
    console.log(elementData,pinpo)
    
    if(elementData == 'realizado') {
        
        tareaRealizada(element)
         
    }
    
    
    else if(elementData == 'eliminado') {
        tareaEliminada(element) 
        console.log("elimnado")


    }
    localStorage.setItem('TODO',JSON.stringify(LIST))
    contador();
})





let data = localStorage.getItem('TODO')
if(data){
    LIST = JSON.parse(data)
    console.log(LIST)
    id = LIST.length
    cargarLista(LIST)
    contador();
}else {
    LIST = []
    id = 0
    contador();
}


/**
 * Carga las tareas en el HTML desde el array de la memoria local
 * @param {Array} array Array de objetos con las tareas
 */
function cargarLista(array) {
    // Recorre el array de tareas y llama a la función agregarTarea
    array.forEach(function(item){
        /**
         * Agrega una tarea al HTML
         * @param {String} nombre Nombre de la tarea
         * @param {Number} id Identificador de la tarea
         * @param {Boolean} realizado Verdadero si la tarea está completada
         * @param {Boolean} eliminado Verdadero si la tarea está eliminada
         */
        agregarTarea(item.nombre,item.id,item.realizado,item.eliminado)
        // Evalúa el total de <li>s en el HTML para ver si se debe actualizar el contador
        evaluarTotal(numeroDeLi)
    })
}
