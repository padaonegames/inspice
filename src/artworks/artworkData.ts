import vulcano_src from "./fragua_vulcano.jpg";
import arachne_src from "./arachne.jpg";
import diana_src from "./diana_calisto.jpg";
import judit_src from "./judit_banquete.jpg";
import hipodamia_src from "./rapto_hipodamia.jpg";
import proserpina_src from "./rapto_proserpina.jpg";
import hipomenes_atalanta_src from "./hipomenes_atalanta.jpg";
import venus_adonis_src from "./venus_adonis.jpg";
import venus_adonis_cupido_src from "./venus_adonis_cupido.jpg";
import susana_src from "./susana.jpg";
import ofrenda_venus_src from "./ofrenda_venus.jpg";
import bacanal_adrios_src from "./bacanal_adrios.jpg";

export interface ArtworkData {
  src: string; // path de la imagen a usar
  id: string; // id único que identifique a la obra
  title: string; // título de la obra
  author: string; // autor de la obra
  date: string; // año o época en la que se creó
  location: string; // museo y sala donde se encuentra la obra
  info: string; // cualquier otro tipo de info adicional
};

const vulcano: ArtworkData = {
  src: vulcano_src,
  id: 'vulcano',
  title: 'La fragua de vulcano',
  author: 'Velázquez, Diego Rodríguez de Silva y',
  info: 'Óleo sobre lienzo, 223 x 290 cm',
  location: 'Museo del Prado Sala 011',
  date: '1630'
};

const arachne: ArtworkData = {
  src: arachne_src,
  id: 'arachne',
  title: 'Las hilanderas o la fábula de Aracne',
  author: 'Velázquez, Diego Rodríguez de Silva y',
  info: 'Óleo sobre lienzo, 220 x 289 cm',
  location: 'Museo del Prado Sala C',
  date: '1655 - 1660'
};

const judit: ArtworkData = {
  src: judit_src,
  id: 'judit',
  title: 'Judit en el banquete de Holofernes',
  author: 'Rembrandt Harmensz. van Rijn',
  info: 'Óleo sobre lienzo, 143 x 154,7 cm',
  location: 'Museo del Prado Sala 076',
  date: '1634'
};

const proserpina: ArtworkData = {
  src: proserpina_src,
  id: 'proserpina',
  title: 'El rapto de Proserpina',
  author: 'Rubens, Pedro Pablo',
  info: 'Óleo sobre lienzo, 181 x 271,2cm',
  location: 'Museo del Prado Sala 079',
  date: '1636 - 1637'
};

const hipodamia: ArtworkData = {
  src: hipodamia_src,
  id: 'hipodamia',
  title: 'El rapto de Hipodamía',
  author: 'Rubens, Pedro Pablo',
  info: 'Óleo sobre lienzo, 182,5 x 285,5 cm',
  location: 'Museo del Prado Sala 079',
  date: '1636 - 1637'
};

const diana: ArtworkData = {
  src: diana_src,
  id: 'diana',
  title: 'Diana y Calisto',
  author: 'Rubens, Pedro Pablo',
  info: 'Óleo sobre lienzo, 202,6 x 325,5 cm',
  location: 'Museo del Prado Sala C',
  date: 'Hacia 1635'
};

const hipomenes_atalanta: ArtworkData = {
  src: hipomenes_atalanta_src,
  id: 'hipomenes_atalanta',
  title: 'Hipómenes y Atalanta',
  author: 'Reni, Guido',
  info: 'Óleo sobre lienzo, 206 x 297 cm',
  location: 'Museo del Prado, No expuesto',
  date: '1618 - 1619'
};

const venus_adonis: ArtworkData = {
  src: venus_adonis_src,
  id: 'venus_adonis',
  title: 'Venus y Adonis',
  author: 'Veronés, Paolo',
  info: 'Óleo sobre lienzo, 162 x 191 cm',
  location: 'Museo del Prado, Sala C',
  date: 'Hacia 1580'
};

const venus_adonis_cupido: ArtworkData = {
  src: venus_adonis_cupido_src,
  id: 'venus_adonis_cupido',
  title: 'Venus, Adonis y Cupido',
  author: 'Carracci, Annibale',
  info: 'Óleo sobre lienzo, 212 x 268 cm',
  location: 'Museo del Prado, Sala 026',
  date: 'Hacia 1590'
};

const susana: ArtworkData = {
  src: susana_src,
  id: 'susana',
  title: 'Susana y los viejos',
  author: 'Guercino',
  info: 'Óleo sobre lienzo, 176 x 208 cm',
  location: 'Museo del Prado, Sala 005',
  date: '1617'
};

const ofrenda_venus: ArtworkData = {
  src: ofrenda_venus_src,
  id: 'ofrenda_venus',
  title: 'Ofrenda a Venus',
  author: 'Tiziano, Vecellio di Gregorio',
  info: 'Óleo sobre lienzo, 172 x 175 cm',
  location: 'Museo del Prado, Sala C',
  date: '1518'
};

const bacanal_adrios: ArtworkData = {
  src: bacanal_adrios_src,
  id: 'bacanal_adrios',
  title: 'La bacanal de los andrios',
  author: 'Tiziano, Vecellio di Gregorio',
  info: 'Óleo sobre lienzo, 175 x 193 cm',
  location: 'Museo del Prado, Sala C',
  date: '1523 - 1526'
};

export const sampleArtworks: ArtworkData[] = [
  vulcano,
  arachne,
  judit,
  proserpina,
  hipodamia,
  diana,
  hipomenes_atalanta,
  venus_adonis,
  venus_adonis_cupido,
  susana,
  ofrenda_venus,
  bacanal_adrios,
];