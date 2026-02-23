/* fotos.js
   Arquivo separado para fotos/imagens locais do projeto.
   As variáveis são globais e podem ser usadas em index.html e main.js.
   Coloque as imagens no diretório do projeto e altere o valor da variável.
*/

(() => {
  // Exemplo: coloque sua foto no diretório e troque para "minha_foto.jpg"
  // A variável precisa se chamar EXATAMENTE "foto_sobre_1"
  window.foto_sobre_1 = "denia_foto.png"; // ex: "denia_sobre.jpg"

  // Se quiser padronizar em um objeto também:
  window.FOTOS = {
    foto_sobre_1: window.foto_sobre_1,
  };
})();
