# Drag and Drop

- Instalar a biblioteca ```npm install react-beautiful-dnd ```

## Passo a passo
```javascript
// importar
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

/*
  Essa função reorder reordena os itens em um array, movendo o item localizado 
  no startIndex para a posição endIndex, enquanto preserva a ordem dos demais 
  itens. É útil para manipulações de listas, especialmente em interfaces de 
  usuário que suportam operações de Drag and Drop.
*/
function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list); // Essa linha cria uma cópia da lista original list e a armazena na variável result. O método Array.from() cria uma nova instância de um array a partir de um array-like ou iterável, garantindo que a lista original não seja modificada diretamente.

    const [removed] = result.splice(startIndex, 1); // Aqui, o método splice() é usado na variável result para remover um elemento da lista na posição startIndex
    result.splice(endIndex, 0, removed); // Agora, o método splice() é usado novamente, mas desta vez para inserir o elemento removed de volta na lista result.

    return result;
  }

  /*
    A função onDragEnd é um manipulador de eventos que é acionado quando um 
    item é solto após ser arrastado. Ela verifica se o item foi solto em um local válido (result.destination).
    Se for o caso, chama a função reorder para reorganizar a lista de itens de 
    acordo com o movimento do item arrastado, e em seguida, atualiza o estado da lista com a nova ordem.
    Esse padrão é comum em implementações de Drag and Drop em React, especialmente com bibliotecas como @hello-pangea/dnd.
  */
  function onDragEnd(result: any) {
      if (!result.destination) { // result.destination contém informações sobre a posição de destino onde o item foi solto. Se result.destination não existe (por exemplo, se o item foi arrastado para fora de uma área válida de drop), a função simplesmente retorna e não faz nada.
        return;
      }

      // tasks: que provavelmente é uma lista (array) de tarefas ou itens que estão sendo manipulados.
      // result.source.index: o índice de onde o item foi arrastado.
      // result.destination.index: o índice para onde o item foi solto.
      const items = reorder(tasks, result.source.index, result.destination.index);

      setTasks(items);
    }
```