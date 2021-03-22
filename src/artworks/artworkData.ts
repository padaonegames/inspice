import vulcano_src from "./fragua_vulcano.jpg";
import arachne_src from "./arachne.jpg";
import diana_src from "./diana_calisto.jpg";
import judit_src from "./judit_banquete.jpg";
import hipodamia_src from "./rapto_hipodamia.jpg";
import proserpina_src from "./rapto_proserpina.jpg";

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

export const sampleArtworks: ArtworkData[] = [
  vulcano,
  arachne,
  judit,
  proserpina,
  hipodamia,
  diana,
];