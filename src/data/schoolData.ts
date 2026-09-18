import trainingImg from '../assets/training.webp'
import heroImg from '../assets/hero.webp'
import maestrosImg from '../assets/maestros.webp'

export interface Schedule {
  day: string
  hours: string
}

export interface Location {
  id: string
  name: string
  club: string
  address: string
  locality: string
  schedule: Schedule[]
  mapUrl: string
}

export interface Discipline {
  name: string
  tagline: string
  description: string
  image: string
  audience: string
}

export interface Teacher {
  name: string
  role: string
  description: string
  image: string
}

export const school = {
  name: 'Movimiento es Vida',
  nameCn: '运动就是生命',
  tagline: 'Shaolin Kung Fu',
  description:
    'Escuela de Shaolin Kung Fu en Lomas de Zamora, Temperley y Remedios de Escalada. Tradición, disciplina y entrenamiento para todas las edades.',
  motto:
    'Más allá de las medallas, buscamos el crecimiento de cada atleta a nivel personal y grupal, y que se lleven una gran experiencia junto a sus compañeros y familiares.',
  phone: '+54 9 11 4470-3212',
  phoneHref: 'tel:+5491144703212',
  whatsappHref: 'https://wa.me/5491144703212',
  instagram: 'https://www.instagram.com/shaolinlomasgye/',
  instagramHandle: '@shaolinlomasgye',
}

export const aboutText = [
  {
    title: 'Una escuela que acerca las artes marciales a la comunidad',
    body: 'La escuela "Movimiento es Vida" desarrolla sus actividades en Lomas de Zamora y Temperley y busca acercar las artes marciales a vecinos de distintas edades. Tras su participación en el Torneo Mercosur, donde sus nueve atletas obtuvieron 13 medallas, el proyecto continúa con clases gratuitas para la comunidad.',
  },
  {
    title: 'Más que técnica, una herramienta de crecimiento',
    body: 'El Shaolin Kung Fu no es solamente una disciplina basada en técnicas de combate. Para la escuela "Movimiento es Vida" (运动就是生命), también puede ser una herramienta para fortalecer vínculos, promover hábitos saludables y acompañar el crecimiento personal de quienes se acercan a entrenar.',
  },
  {
    title: 'Nacida en Lomas de Zamora',
    body: 'El proyecto nació hace más de un año en Lomas de Zamora, bajo la dirección del Shifu Brian Miranda y junto a la LaoShi Noelia Arispe, con el objetivo de transmitir los conocimientos del Shaolin desde una perspectiva que incluya el autocontrol, el bienestar, la humildad y el respeto.',
  },
]

export const values = [
  'Hermandad',
  'Humildad',
  'Respeto',
  'Autocontrol',
  'Bienestar',
]

export const kungfu = {
  intro:
    'El Shaolin Kung Fu es un arte marcial tradicional de origen chino, nacido en el Templo Shaolin. Es un camino de entrenamiento integral que combina el desarrollo físico, la técnica y la filosofía.',
  pillars: [
    {
      title: 'Cuerpo',
      text: 'Fuerza, resistencia, flexibilidad y coordinación se trabajan en cada clase a través de posiciones, formas y acondicionamiento físico.',
    },
    {
      title: 'Técnica',
      text: 'Se practican formas (taolu), trabajo de manos y piernas, bases tradicionales del estilo Shaolin y su aplicación con o sin armas.',
    },
    {
      title: 'Mente',
      text: 'La concentración, la disciplina y la constancia son parte del entrenamiento. El Kung Fu entrena el control sobre uno mismo tanto como el cuerpo.',
    },
  ],
}

export const disciplines: Discipline[] = [
  {
    name: 'Shaolin Kung Fu',
    tagline: 'La disciplina tradicional',
    description:
      'El arte raíz del templo. Formas, posiciones, fuerza y técnica en un camino progresivo que acompaña a cada alumno según su ritmo y condición.',
    image: trainingImg,
    audience: 'Niños, jóvenes y adultos, sin importar la condición física inicial.',
  },
  {
    name: 'Sanda',
    tagline: 'Combate deportivo',
    description:
      'La modalidad de combate del Kung Fu moderno: golpes, patadas y proyecciones. Entrenamiento de aplicación real con seguridad y supervisión constante.',
    image: heroImg,
    audience: 'Requiere un nivel previo de Shaolin Kung Fu y se entrena bajo supervisión.',
  },
]

export const teachers: Teacher[] = [
  {
    name: 'Brian Miranda',
    role: 'Shifu · Director',
    description:
      'Inició su recorrido marcial a los 16 años y cuenta con experiencia en competencias nacionales e internacionales. Dirige el proyecto y dicta clases en las distintas sedes, trabajando principalmente con niños.',
    image: maestrosImg,
  },
  {
    name: 'Noelia Arispe',
    role: 'LaoShi · Profesora',
    description:
      'Acompaña la dirección de la escuela junto al Shifu Brian Miranda, transmitiendo los valores del Shaolin con foco en la formación de cada alumno.',
    image: maestrosImg,
  },
]

export const locations: Location[] = [
  {
    id: 'ituzaingo',
    name: 'Club Social y Deportivo Ituzaingó',
    club: 'El Itu',
    address: 'Iriarte 1337',
    locality: 'Temperley · Buenos Aires',
    schedule: [
      { day: 'Martes', hours: '18:00 a 19:30' },
      { day: 'Miércoles', hours: '10:00 a 11:30' },
      { day: 'Jueves', hours: '18:00 a 19:30' },
      { day: 'Viernes', hours: '10:00 a 11:30' },
    ],
    mapUrl:
      'https://www.google.com/maps/place/Club+Ituzaing%C3%B3/data=!4m2!3m1!1s0x0:0xcb5daf7589f1f0d6?sa=X&ved=1t:2428&ictx=111',
  },
  {
    id: 'gimnasia',
    name: 'Club Gimnasia y Esgrima de Lomas de Zamora',
    club: 'Gimnasia y Esgrima',
    address: 'Salguero 63',
    locality: 'Lomas de Zamora · Buenos Aires',
    schedule: [
      { day: 'Martes', hours: '18:00 a 20:00' },
      { day: 'Viernes', hours: '18:00 a 20:00' },
      { day: 'Sábado', hours: '10:00 a 11:30' },
    ],
    mapUrl:
      'https://www.google.com/maps/place/club+gimnasia+y+esgrima+de+lomas+de+zamora/data=!4m2!3m1!1s0x95bcd2c10fba0389:0xdaac6981e3c990bd?sa=X&ved=1t:242&ictx=111',
  },
  {
    id: 'amistad',
    name: 'Club Social y Deportivo La Amistad',
    club: 'La Amistad',
    address: 'Almirante Mariano Cordero 675',
    locality: 'Remedios de Escalada · Lanús',
    schedule: [
      { day: 'Lunes', hours: '18:00 a 19:00' },
      { day: 'Miércoles', hours: '18:00 a 19:00' },
    ],
    mapUrl:
      'https://www.google.com/maps/place/Club+La+Amistad/data=!4m2!3m1!1s0x0:0x7d893e7814bb73a8?sa=X&ved=1t:2428&ictx=111',
  },
]

export const gallery = {
  title: 'Galería',
  subtitle:
    'Entrenamientos, exámenes y momentos de la escuela registrados por quienes viven el Shaolin todos los días.',
  instagramCta: 'Seguinos en Instagram para ver más contenido.',
}

export const navItems = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'escuela', label: 'La Escuela' },
  { id: 'kungfu', label: 'Shaolin Kung Fu' },
  { id: 'entrenamiento', label: 'Entrenamiento' },
  { id: 'maestros', label: 'Maestros' },
  { id: 'galeria', label: 'Galería' },
  { id: 'ubicaciones', label: 'Dónde entrenamos' },
  { id: 'contacto', label: 'Contacto' },
]

export const heroPhrase = 'Disciplina. Tradición. Movimiento.'
export const heroDescription =
  'Escuela de Shaolin Kung Fu en Lomas de Zamora, Temperley y Remedios de Escalada. Una propuesta comunitaria que acerca las artes marciales a personas de todas las edades.'