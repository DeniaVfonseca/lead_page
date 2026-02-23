/* links.js
   Arquivo separado para hyperlinks (sem conflitar com main.js).
   Preencha os valores "" manualmente.
*/

(() => {
  // Redes sociais - Sobre / Hero
  const instagram_sobre = "https://www.instagram.com/deniapsi/";
  const youtube_sobre = "https://www.youtube.com/@deniapsico";
  const facebook_sobre = "https://www.facebook.com/share/17XSiMqo9K/";
  const whatsapp_sobre = "https://wa.link/i58nsn";

  // Header (pílulas em "Sobre")
  const instagram_header = "https://www.instagram.com/deniapsi/";
  const youtube_header = "https://www.youtube.com/@deniapsico";
  const facebook_header = "https://www.facebook.com/share/17XSiMqo9K/";
  const whatsapp_header = "https://wa.link/i58nsn";

  // Contato (botões grandes)
  const instagram_contato = "https://www.instagram.com/deniapsi/";
  const youtube_contato = "https://www.youtube.com/@deniapsico";
  const facebook_contato = "https://www.facebook.com/share/17XSiMqo9K/";
  const whatsapp_contato = "https://wa.link/i58nsn";

  // (Opcional) Se você quiser integrar com Google Agenda via URL pública/ICS no futuro,
  // você pode colocar aqui um link (deixe vazio se não for usar agora).
  // Exemplo (dependendo da estratégia): link público do calendário / ICS / endpoint.
  const google_agenda_agenda = "";

  const forms_contato = "https://script.google.com/macros/s/AKfycbzP6-i779YggUZKWCCPygbPUAx5IvsMG_LEoudwIMGP1ATswjQJzMkd2blToETc8Xq1/exec";

  // Exporta como variáveis globais e também em um objeto único
  window.LINKS = {
    instagram_sobre,
    youtube_sobre,
    facebook_sobre,
    whatsapp_sobre,

    instagram_header,
    youtube_header,
    facebook_header,
    whatsapp_header,

    instagram_contato,
    youtube_contato,
    facebook_contato,
    whatsapp_contato,

    google_agenda_agenda,
    forms_contato,
  };
})();
