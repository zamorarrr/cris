import {
  ArgumentCard,
  CharacterPerspective,
  ModuleDefinition,
  PrivacyHotspot,
  SimulatedPostReview,
  TimelineNode,
} from '../types/huella';

export const ASSET_IMAGES = {
  hero: '/src/assets/images/hero_huella_digital_1795477445174.jpg',
  centralCase: '/src/assets/images/caso_central_reunion_1795477446364.jpg',
  m1: '/src/assets/images/modulo_1_identidad_1795477446308.jpg',
  m2: '/src/assets/images/modulo_2_privacidad_1795477446906.jpg',
  m3: '/src/assets/images/modulo_3_consentimiento_1795477448003.jpg',
  m4: '/src/assets/images/modulo_4_permanencia_1795477448329.jpg',
  m5: '/src/assets/images/modulo_5_decisiones_1795477447343.jpg',
  m6: '/src/assets/images/modulo_6_futuro_1795477449483.jpg',
  final: '/src/assets/images/desafio_final_despedida_1795477449505.jpg',
} as const;

export const THINK_BEFORE_CARDS = [
  {
    id: 'info',
    question: '¿Qué información estoy mostrando?',
    shortDesc: 'Identifica datos visibles y ocultos en imágenes, textos y etiquetas.',
    explanation:
      'A veces creemos que solo mostramos un momento cotidiano, pero una fotografía o video puede revelar lugares que frecuentamos, insignias escolares, horarios o detalles privados propios y de otras personas.',
    connection:
      'En el caso central, el estudiante compartió imágenes con detalles del lugar y comentarios sin notar la información expuesta.',
  },
  {
    id: 'affect',
    question: '¿A quién puede afectar mi publicación?',
    shortDesc: 'Considera el consentimiento, la dignidad y la incomodidad ajena.',
    explanation:
      'Cuando aparecen compañeros, amigos o familiares, publicar deja de ser una decisión únicamente individual. Lo que para una persona es un recuerdo divertido, para otra puede resultar incómodo o vulnerar su privacidad.',
    connection:
      'En la historia principal, uno de los participantes se siente incómodo por los comentarios recibidos y solicita retirar el contenido.',
  },
  {
    id: 'share',
    question: '¿Qué podría pasar si alguien la comparte?',
    shortDesc: 'Evalúa la permanencia y la circulación fuera del contexto original.',
    explanation:
      'Una vez publicado un contenido, otras personas pueden descargarlo, reenviarlo o interpretarlo fuera de contexto. Eliminar la publicación original no siempre borra las copias que ya circularon.',
    connection:
      'Aunque el estudiante decide borrar el video cuando le piden retirarlo, descubre que varias personas ya lo habían guardado.',
  },
];

export const CENTRAL_CASE_DATA = {
  sectionTitle: 'Una publicación. Diferentes consecuencias.',
  intro: [
    'Imagina que compartes fotografías de una reunión con tus amigos. Para ti, la publicación representa un buen recuerdo y no parece tener nada de malo.',
    'Pero ¿qué sucede si una persona que aparece en las imágenes no quiere que se publiquen? ¿Qué pasa cuando otros usuarios guardan el contenido o lo comparten fuera de contexto?',
    'Una decisión que parecía sencilla puede generar preguntas sobre la privacidad, la libertad, el respeto y la responsabilidad.',
  ],
  storyTitle: 'Una publicación que llegó demasiado lejos',
  storyParagraphs: [
    'Un grupo de estudiantes de grado undécimo se reúne después de una actividad escolar. Durante el encuentro, uno de ellos toma varias fotografías y graba un video corto.',
    'Más tarde publica el contenido en sus redes sociales. En las imágenes aparecen sus compañeros, algunos detalles del lugar y comentarios que considera divertidos.',
    'La publicación comienza a recibir reacciones. Algunos usuarios comparten el video, mientras otros hacen comentarios que incomodan a uno de los compañeros.',
    'Cuando le piden que elimine el contenido, el estudiante responde que no quería causar problemas y que solamente estaba compartiendo un recuerdo.',
    'Sin embargo, descubre que varias personas ya guardaron las imágenes.',
  ],
  question: '¿En qué momento crees que aparece el problema?',
  options: [
    {
      id: 'sin_consultar',
      label: 'Cuando decide publicar sin consultar a quienes aparecen.',
    },
    {
      id: 'comparten',
      label: 'Cuando las demás personas comienzan a compartir el contenido.',
    },
    {
      id: 'comentarios',
      label: 'Cuando aparecen comentarios que incomodan a los participantes.',
    },
    {
      id: 'varios_momentos',
      label: 'Considero que existen varios momentos que deben analizarse.',
    },
  ],
  feedback: [
    'La situación permite reconocer que un problema ético puede comenzar antes de que aparezcan consecuencias negativas.',
    'La decisión de publicar, el consentimiento de quienes aparecen, la difusión del contenido y las reacciones posteriores son aspectos que merecen analizarse.',
    'No existe una sola pregunta que resuelva toda la situación. Por eso, durante los siguientes módulos conocerás diferentes elementos que te ayudarán a construir una postura.',
  ],
};

export const STEP_LABELS = [
  'Introducción',
  'Conceptos',
  'Caso',
  'Análisis',
  'Decisión',
  'Retroalimentación',
  'Revisión',
  'Taller creativo',
  'Cierre',
];

export const MODULES_DATA: ModuleDefinition[] = [
  {
    id: 1,
    shortTitle: 'Identidad digital',
    title: 'Módulo 1. Mi identidad digital',
    centralQuestion: '¿Qué dice de mí lo que publico?',
    summary:
      'Analiza cómo nuestras publicaciones construyen una imagen en internet y por qué somos mucho más que un perfil.',
    illustration: ASSET_IMAGES.m1,
    illustrationAlt:
      'Estudiante de bachillerato observando su teléfono rodeada de reacciones digitales frente a su reflejo con libros y arte.',
    introduction: [
      'Cuando utilizamos redes sociales, compartimos una parte de nuestra vida: fotografías, opiniones, comentarios, intereses y momentos que queremos recordar.',
      'Con el tiempo, estas publicaciones pueden contribuir a la imagen que otras personas construyen de nosotros.',
      'Sin embargo, nuestra identidad no se resume en un perfil. Somos mucho más que las fotografías que publicamos o las reacciones que recibimos.',
      'En este módulo reflexionarás sobre la identidad digital y sobre cómo las decisiones que tomamos al publicar pueden influir en la manera como nos presentamos ante los demás.',
    ],
    concepts: [
      {
        term: 'Identidad digital',
        definition:
          'Conjunto de información, publicaciones e interacciones que contribuyen a representar a una persona en los entornos digitales.',
      },
      {
        term: 'Imagen personal',
        definition: 'Manera como una persona decide presentarse ante otras.',
      },
      {
        term: 'Reputación digital',
        definition:
          'Percepción que otras personas pueden construir a partir de información y experiencias relacionadas con alguien en internet.',
      },
      {
        term: 'Autenticidad',
        definition:
          'Relación entre lo que una persona expresa y aquello que realmente piensa o desea comunicar.',
      },
      {
        term: 'Responsabilidad',
        definition: 'Capacidad de considerar las consecuencias de las propias decisiones.',
      },
    ],
    caseTitle: 'La publicación de Valeria',
    caseStory: [
      'Valeria cursa grado undécimo y utiliza una red social para compartir momentos con sus amigos.',
      'Un día publica un video en el que hace una broma sobre otra estudiante. La publicación recibe muchas reacciones y varios compañeros le comentan que debería seguir haciendo videos similares.',
      'Aunque al principio se siente contenta por la atención, después comienza a preguntarse si quiere que otras personas la reconozcan principalmente por ese tipo de contenido.',
      'Una amiga le dice que algunos compañeros han interpretado el video como una burla. Valeria considera que solamente quería divertirse y que una publicación no define quién es.',
    ],
    analysisPrompt: 'Analiza la situación respondiendo las cuatro preguntas guía:',
    analysisQuestions: [
      '¿Por qué Valeria publicó el video?',
      '¿Qué diferencia puede existir entre la intención de Valeria y la forma como otras personas interpretan su contenido?',
      '¿Una publicación puede influir en la reputación de alguien sin representar completamente quién es?',
      '¿Qué responsabilidades tiene Valeria frente a la otra estudiante?',
    ],
    alternatives: [
      {
        id: 'A',
        label:
          'Alternativa A: Mantener el video porque recibió muchas reacciones y considera que fue una broma.',
        feedbackTitle: 'Análisis de la Alternativa A',
        feedbackBody:
          'Recibir reacciones no es suficiente para determinar si una publicación fue respetuosa. La intención de divertirse no evita que otra persona se sienta expuesta o ridiculizada.',
        conceptualNote:
          'Aquí entran en juego la reputación digital y la responsabilidad: la atención inmediata puede proyectar una imagen contraria a tus valores.',
        consequenceNote:
          'Mantener el video prolonga la burla y normaliza que la diversión de un grupo pase por encima del bienestar de alguien.',
        perspectiveNote:
          'Quienes dan «me gusta» ven un momento pasajero; la compañera afectada enfrenta la repetición de la broma en el colegio.',
      },
      {
        id: 'B',
        label:
          'Alternativa B: Escuchar la opinión de su compañera y revisar el contenido antes de decidir si lo mantiene o elimina.',
        feedbackTitle: 'Análisis de la Alternativa B',
        feedbackBody:
          'Escuchar diferentes opiniones ayuda a comprender las consecuencias reales de una publicación y a tomar una decisión mejor fundamentada y empática.',
        conceptualNote:
          'Articula autenticidad, diálogo y responsabilidad al contrastar la intención inicial con el impacto percibido.',
        consequenceNote:
          'Abre un espacio de reparación directa y permite retirar o corregir el contenido con comprensión mutua.',
        perspectiveNote:
          'Reconoce que la persona involucrada tiene voz legítima sobre cómo aparece representada frente al grupo.',
      },
      {
        id: 'C',
        label:
          'Alternativa C: Eliminar el video inmediatamente, sin conversar con nadie sobre lo ocurrido.',
        feedbackTitle: 'Análisis de la Alternativa C',
        feedbackBody:
          'Retirar un contenido puede detener parte de su circulación, pero también puede ser importante reconocer lo ocurrido y considerar cómo responder frente a la persona afectada.',
        conceptualNote:
          'Detener la difusión es un primer paso de responsabilidad, aunque la convivencia también requiere diálogo y cuidado relacional.',
        consequenceNote:
          'Reduce la exposición en el perfil original, pero si no hay conversación, la compañera puede seguir sintiendo incomodidad o distancia.',
        perspectiveNote:
          'Para el resto del grupo el tema desaparece rápido, mientras la persona afectada puede quedar sin una aclaración respetuosa.',
      },
    ],
    allowCustomAlternative: true,
    newInfoTitle: 'Nueva información sobre el caso',
    newInfoText:
      'La estudiante que aparece en el video le escribe a Valeria y le explica que se sintió avergonzada porque otras personas comenzaron a repetir la broma en los pasillos.',
    newInfoQuestion: '¿Esta información cambia tu decisión inicial? Explica por qué.',
    workshopTitle: 'Taller creativo: «Así quiero construir mi identidad digital»',
    workshopProductTitle: 'Ficha visual de identidad digital responsable',
    workshopDescription:
      'Elabora una ficha editable con los valores, contenidos, límites privados y conductas que orientan tu identidad en internet.',
    reflectionQuestion:
      '¿Cómo puedo utilizar las redes sociales para expresar quién soy sin afectar el respeto que merecen otras personas?',
    closingTakeaway:
      'Nuestra identidad digital se construye mediante muchas decisiones. Una publicación no define toda nuestra personalidad, pero sí puede influir en cómo otras personas nos conocen y se relacionan con nosotros.',
  },
  {
    id: 2,
    shortTitle: 'Privacidad',
    title: 'Módulo 2. ¿Qué estoy compartiendo?',
    centralQuestion: '¿Cuánta información revelo sin darme cuenta?',
    summary:
      'Reconoce qué datos personales, rutinas y ubicaciones pueden quedar expuestos en una publicación cotidiana.',
    illustration: ASSET_IMAGES.m2,
    illustrationAlt:
      'Estudiante revisando una fotografía grupal con una lupa que revela pistas de ubicación y uniforme escolar.',
    introduction: [
      'Cuando compartimos una fotografía o un video, no siempre pensamos en toda la información que puede aparecer.',
      'Una imagen puede mostrar el lugar donde estamos, objetos personales, detalles de nuestra rutina o información sobre otras personas.',
      'En este módulo aprenderás a reconocer qué información puede quedar expuesta y por qué es importante revisar los contenidos antes de publicarlos.',
      'La intención no es generar miedo frente a las redes sociales, sino comprender que cuidar nuestra privacidad también es una forma de actuar responsablemente.',
    ],
    concepts: [
      {
        term: 'Privacidad',
        definition:
          'Posibilidad de mantener ciertos aspectos de la vida personal fuera del conocimiento público.',
      },
      {
        term: 'Datos personales',
        definition: 'Información que permite identificar o relacionar datos con una persona.',
      },
      {
        term: 'Información sensible',
        definition: 'Información que, por sus características, requiere especial protección.',
      },
      {
        term: 'Ubicación digital',
        definition:
          'Información que puede revelar dónde se encuentra una persona o qué lugares frecuenta.',
      },
      {
        term: 'Consentimiento',
        definition:
          'Autorización informada que una persona puede dar para determinados usos de su información o imagen.',
      },
    ],
    caseTitle: 'La fotografía de Samuel',
    caseStory: [
      'Samuel toma una fotografía para mostrar que está disfrutando una tarde con sus amigos.',
      'En la imagen aparece una parte de su uniforme, el nombre del lugar donde se encuentran y una etiqueta con la ubicación.',
      'Samuel considera que la fotografía es normal y piensa publicarla para que sus compañeros puedan verla.',
      'Antes de hacerlo, una amiga le pregunta si ha revisado toda la información que aparece.',
    ],
    analysisPrompt:
      'Actividad 1. Detective de publicaciones: haz clic sobre los cinco elementos de la publicación simulada de Samuel para descubrir qué información revelan.',
    alternatives: [
      {
        id: 'A',
        label: 'Alternativa A: Publicar la fotografía tal como está.',
        feedbackTitle: 'Análisis de la Alternativa A',
        feedbackBody:
          'No toda publicación con información personal produce consecuencias negativas inmediatas, pero publicar sin revisar expone datos de ubicación, institución y terceros a audiencias desconocidas.',
        conceptualNote:
          'La privacidad y los datos personales requieren prevención consciente antes de hacer público el contenido.',
        consequenceNote:
          'Cualquier contacto o desconocido con acceso al perfil puede deducir dónde estudian, qué lugares frecuentan y a qué hora.',
        perspectiveNote:
          'Es posible que alguno de sus amigos prefiera no revelar su ubicación en tiempo real o el lugar donde se encuentra.',
      },
      {
        id: 'B',
        label:
          'Alternativa B: Revisar la información visible, consultar a los compañeros y modificar algunos elementos antes de publicar.',
        feedbackTitle: 'Análisis de la Alternativa B',
        feedbackBody:
          'Ajustar detalles como quitar la etiqueta de ubicación, recortar o cubrir el escudo del uniforme y pedir permiso a los amigos permite compartir el recuerdo cuidando la privacidad.',
        conceptualNote:
          'Combina privacidad, consentimiento y cuidado mutuo sin renunciar a compartir una experiencia positiva.',
        consequenceNote:
          'Minimiza la exposición de datos identificables manteniendo el valor afectivo de la fotografía.',
        perspectiveNote:
          'Demuestra respeto por la seguridad y las preferencias de cada compañero que aparece en la toma.',
      },
      {
        id: 'C',
        label: 'Alternativa C: Decidir no publicar la fotografía.',
        feedbackTitle: 'Análisis de la Alternativa C',
        feedbackBody:
          'Conservar la foto en un álbum privado o enviarla únicamente por un canal cerrado acordado es una decisión válida cuando los riesgos o la falta de consentimiento superan el beneficio de publicarla.',
        conceptualNote:
          'Ejerce la autonomía digital: no todo momento valioso necesita convertirse en una publicación pública.',
        consequenceNote:
          'Protege por completo los datos visibles del grupo y evita la circulación externa.',
        perspectiveNote:
          'Algunas personas disfrutan más los recuerdos compartidos en privado que en redes abiertas.',
      },
    ],
    allowCustomAlternative: false,
    newInfoTitle: 'Revisión del caso: cambio de audiencia',
    newInfoText:
      'La publicación inicialmente estaba pensada para un grupo pequeño, pero la configuración de la cuenta permitía que la observaran más personas fuera del círculo cercano.',
    newInfoQuestion: '¿Qué información revisarías ahora antes de tomar una decisión?',
    workshopTitle: 'Taller creativo: «Mi filtro de privacidad»',
    workshopProductTitle: 'Infografía digital sobre privacidad',
    workshopDescription:
      'Construye una infografía argumentada en tres momentos (antes, mientras decides y después de publicar) con al menos dos recomendaciones por etapa.',
    reflectionQuestion:
      '¿Qué diferencia existe entre compartir una experiencia y exponer información que debería cuidarse?',
    closingTakeaway:
      'Pensar antes de publicar también implica revisar la información visible y considerar quiénes podrían acceder a ella. La privacidad requiere decisiones informadas, no solamente configuraciones tecnológicas.',
  },
  {
    id: 3,
    shortTitle: 'Consentimiento',
    title: 'Módulo 3. No todo se publica',
    centralQuestion: '¿Quién decide cuando aparecen otras personas?',
    summary:
      'Reflexiona sobre el consentimiento, la empatía y la dignidad cuando publicamos imágenes donde aparecen otros.',
    illustration: ASSET_IMAGES.m3,
    illustrationAlt:
      'Cuatro estudiantes conversando con respeto mientras uno expresa su incomodidad por aparecer en una fotografía.',
    introduction: [
      'Una fotografía puede ser importante para nosotros, pero también puede involucrar a otras personas que tienen opiniones diferentes sobre su publicación.',
      'Compartir una imagen o un comentario no depende únicamente de lo que nosotros queremos mostrar.',
      'En este módulo reflexionarás sobre el consentimiento, el respeto y las responsabilidades que surgen cuando publicamos contenidos donde aparecen compañeros, amigos o familiares.',
    ],
    concepts: [
      {
        term: 'Respeto',
        definition: 'Reconocimiento de la dignidad y los derechos de otras personas.',
      },
      {
        term: 'Consentimiento',
        definition:
          'Autorización que debe considerarse cuando se utiliza información o imagen de otra persona.',
      },
      {
        term: 'Dignidad humana',
        definition: 'Valor propio de todas las personas, que exige un trato respetuoso.',
      },
      {
        term: 'Empatía',
        definition:
          'Disposición para comprender cómo puede sentirse otra persona frente a una situación.',
      },
      {
        term: 'Convivencia digital',
        definition: 'Formas de relación y participación respetuosa en los entornos digitales.',
      },
    ],
    caseTitle: 'La fotografía del grupo',
    caseStory: [
      'Después de una actividad escolar, Camila publica varias fotografías con sus compañeros.',
      'En una de las imágenes aparece Nicolás en un momento que le resulta incómodo. Cuando observa la publicación, le pide a Camila que retire esa fotografía.',
      'Camila responde que la imagen también es suya porque ella la tomó y que no considera que sea ofensiva.',
      'Otros compañeros opinan que Nicolás está exagerando, mientras algunos consideran que Camila debería escuchar su solicitud.',
    ],
    analysisPrompt:
      'Explora las cuatro perspectivas de los personajes y selecciona los valores éticos que entran en tensión.',
    alternatives: [
      {
        id: 'A',
        label:
          'Alternativa A: Mantener la fotografía porque quien la tomó considera que tiene derecho a publicarla.',
        feedbackTitle: 'Análisis de la Alternativa A',
        feedbackBody:
          'Tomar una fotografía no otorga derecho absoluto sobre la imagen de otra persona. Ignorar la incomodidad de Nicolás antepone el gusto individual a su autonomía y dignidad.',
        conceptualNote:
          'La libertad de expresión encuentra un límite ético en el respeto a la intimidad, la dignidad y el consentimiento.',
        consequenceNote:
          'Deteriora la confianza dentro del grupo y genera malestar innecesario en la convivencia escolar.',
        perspectiveNote:
          'Para Camila la foto es un buen recuerdo; para Nicolás representa exposición pública sin su autorización.',
      },
      {
        id: 'B',
        label: 'Alternativa B: Retirar la fotografía solicitada y dialogar sobre lo ocurrido.',
        feedbackTitle: 'Análisis de la Alternativa B',
        feedbackBody:
          'Escuchar a alguien que manifiesta incomodidad reconoce su autonomía y dignidad. Retirar la foto y conversar fortalece la confianza en el grupo.',
        conceptualNote:
          'El consentimiento no es una palabra para memorizar, sino una práctica que protege las relaciones de confianza.',
        consequenceNote:
          'Resuelve el conflicto de forma directa y deja un precedente positivo de convivencia digital.',
        perspectiveNote:
          'Muestra empatía hacia Nicolás y permite que Camila conserve otras fotos donde todos estén de acuerdo.',
      },
      {
        id: 'C',
        label: 'Alternativa C: Modificar la publicación para evitar que Nicolás aparezca.',
        feedbackTitle: 'Análisis de la Alternativa C',
        feedbackBody:
          'Recortar o reemplazar la fotografía por otra del grupo donde todos se sientan cómodos puede ser una salida respetuosa si se acuerda con Nicolás.',
        conceptualNote:
          'Busca equilibrio entre conservar el recuerdo colectivo y respetar el derecho a la propia imagen.',
        consequenceNote:
          'Evita la exposición de Nicolás, aunque conviene confirmar que la edición no deje comentarios que lo señalen.',
        perspectiveNote:
          'Atiende el deseo de compartir la actividad sin pasar por alto la solicitud del compañero.',
      },
      {
        id: 'D',
        label: 'Alternativa D: Proponer otra alternativa respetuosa.',
        feedbackTitle: 'Análisis de tu propuesta alternativa',
        feedbackBody:
          'Las soluciones dialogadas —como acordar reglas previas en eventos escolares o compartir las fotos solo en un álbum interno— enriquecen la convivencia.',
        conceptualNote:
          'Fomenta la corresponsabilidad y la participación ética en la vida cotidiana del curso.',
        consequenceNote:
          'Previene tensiones futuras porque establece acuerdos claros antes de publicar.',
        perspectiveNote:
          'Integra la voz de todo el grupo de forma constructiva.',
      },
    ],
    allowCustomAlternative: true,
    newInfoTitle: 'Reflexión sobre el consentimiento en grupo',
    newInfoText:
      'Aunque otros compañeros comenten que Nicolás «está exagerando», la incomodidad de quien aparece en la imagen sigue siendo el criterio central para decidir sobre su propia exposición.',
    newInfoQuestion:
      '¿Cómo responderías a quienes dicen que «no pasa nada» cuando alguien pide retirar su foto?',
    workshopTitle: 'Taller creativo: «Compartir también es respetar»',
    workshopProductTitle: 'Mini campaña digital de convivencia y consentimiento',
    workshopDescription:
      'Elige entre cartel digital, carrusel de tres tarjetas o historieta de tres escenas para proponer una actuación respetuosa frente al consentimiento.',
    reflectionQuestion:
      '¿Por qué es importante escuchar la opinión de otras personas antes de publicar contenidos que las involucran?',
    closingTakeaway:
      'Una publicación puede involucrar derechos e intereses distintos. Compartir responsablemente también significa reconocer que los demás pueden tener razones para no querer aparecer en determinados contenidos.',
  },
  {
    id: 4,
    shortTitle: 'Permanencia',
    title: 'Módulo 4. Lo que internet recuerda',
    centralQuestion: '¿Borrar significa desaparecer?',
    summary:
      'Comprende la diferencia entre huella digital activa y pasiva y por qué un contenido borrado puede seguir circulando.',
    illustration: ASSET_IMAGES.m4,
    illustrationAlt:
      'Estudiante borrando un video en su teléfono mientras el archivo ya circula entre carpetas, nubes y pantallas.',
    introduction: [
      'En internet podemos publicar contenidos en pocos segundos. Sin embargo, eliminarlos no siempre significa que desaparezcan de todos los lugares donde fueron compartidos.',
      'Una fotografía puede ser guardada, reenviada o volver a aparecer tiempo después.',
      'En este módulo analizarás cómo se construye la huella digital y qué consecuencias pueden surgir cuando un contenido continúa circulando.',
    ],
    concepts: [
      {
        term: 'Huella digital',
        definition:
          'Rastros de información relacionados con la actividad de una persona en entornos digitales.',
      },
      {
        term: 'Huella digital activa',
        definition:
          'Información que una persona decide publicar o compartir de manera directa.',
      },
      {
        term: 'Huella digital pasiva',
        definition:
          'Información que puede recopilarse o generarse a partir de su actividad digital, según el funcionamiento de las plataformas.',
      },
      {
        term: 'Permanencia digital',
        definition:
          'Posibilidad de que un contenido siga disponible o almacenado después de su publicación inicial.',
      },
      {
        term: 'Reputación digital',
        definition:
          'Imagen que puede formarse sobre una persona a partir de la información disponible en internet.',
      },
    ],
    caseTitle: 'El video que volvió',
    caseStory: [
      'Hace varios meses, Andrés publicó un video de una reunión con compañeros.',
      'Después de recibir algunos comentarios, decidió eliminarlo de su perfil.',
      'Tiempo más tarde, descubre que el video volvió a circular porque otra persona lo había guardado.',
      'Andrés considera que el asunto ya estaba resuelto cuando eliminó la publicación, pero ahora debe decidir cómo responder.',
    ],
    analysisPrompt:
      'Actividad 1. Sigue el recorrido: selecciona cada uno de los seis momentos en la línea de tiempo para analizar qué decisiones influyeron en la circulación del video.',
    alternatives: [
      {
        id: 'A',
        label: 'Ignorar la situación esperando que pase con el tiempo.',
        feedbackTitle: 'Análisis de ignorar la situación',
        feedbackBody:
          'Aunque a veces la atención disminuye, si el video incomoda o afecta a alguien, guardar silencio puede permitir que siga circulando sin límites.',
        conceptualNote:
          'La permanencia digital muestra que la inacción no detiene las copias guardadas por terceros.',
        consequenceNote:
          'Quien reenvía el contenido puede asumir que no existe objeción alguna.',
        perspectiveNote:
          'Las personas que aparecen en el video pueden sentir que nadie las respalda.',
      },
      {
        id: 'B',
        label: 'Hablar con quien volvió a compartir el video y solicitar que detenga su difusión.',
        feedbackTitle: 'Análisis del diálogo directo',
        feedbackBody:
          'Expresar de manera clara y respetuosa que el contenido fue retirado por respeto a los participantes apela a la corresponsabilidad de quien lo redistribuye.',
        conceptualNote:
          'Eliminar reduce la disponibilidad en el perfil original, pero frenar la circulación exige corresponsabilidad entre pares.',
        consequenceNote:
          'Puede detener el reenvío a tiempo antes de que alcance nuevos grupos.',
        perspectiveNote:
          'Recuerda a la otra persona que reenviar un archivo guardado también es una decisión ética.',
      },
      {
        id: 'C',
        label: 'Buscar orientación docente o institucional si el contenido está afectando a alguien.',
        feedbackTitle: 'Análisis de buscar orientación',
        feedbackBody:
          'Cuando un contenido se difunde sin consentimiento y genera daño o burlas persistentes, acudir a orientación escolar o canales de reporte de la plataforma es una medida responsable.',
        conceptualNote:
          'La ciudadanía digital incluye conocer rutas de apoyo y protección cuando una situación supera el diálogo entre pares.',
        consequenceNote:
          'Brinda acompañamiento seguro a la persona afectada y activa protocolos de convivencia.',
        perspectiveNote:
          'Pedir ayuda a tiempo no es exagerar, es cuidar el bienestar colectivo.',
      },
      {
        id: 'D',
        label: 'Proponer otra alternativa de actuación.',
        feedbackTitle: 'Análisis de tu propuesta',
        feedbackBody:
          'Combinar diálogo respetuoso, solicitud de retiro en la plataforma y acompañamiento a los compañeros involucrados suele ser una estrategia integral.',
        conceptualNote:
          'Reconoce que el control técnico absoluto no existe y que la prevención y el acompañamiento son clave.',
        consequenceNote:
          'Atiende tanto la circulación digital como el impacto emocional en el grupo.',
        perspectiveNote:
          'Integra responsabilidad personal y apoyo comunitario.',
      },
    ],
    allowCustomAlternative: true,
    newInfoTitle: 'Lo que queda después de borrar',
    newInfoText:
      'Quien guardó el video explica que lo descargó cuando era público «solo por si acaso» y lo reenvió meses después sin recordar que había sido borrado del perfil original.',
    newInfoQuestion:
      '¿Cómo cambia tu comprensión sobre «borrar» un contenido y qué acuerdos deberían existir al guardar material de otras personas?',
    workshopTitle: 'Taller creativo: «El recorrido de una publicación»',
    workshopProductTitle: 'Línea de tiempo visual sobre el recorrido de una publicación',
    workshopDescription:
      'Diseña una línea de tiempo con al menos seis momentos, una decisión clave y dos acciones para prevenir o atender una consecuencia negativa.',
    reflectionQuestion:
      '¿Qué debería considerar antes de publicar algo que otras personas podrían guardar o compartir?',
    closingTakeaway:
      'La huella digital puede construirse a partir de diferentes actividades. Pensar antes de publicar implica reconocer que no siempre podemos controlar completamente el recorrido posterior de un contenido.',
  },
  {
    id: 5,
    shortTitle: 'Responsabilidad',
    title: 'Módulo 5. Mis decisiones, mis responsabilidades',
    centralQuestion: '¿Qué razones sostienen mi decisión?',
    summary:
      'Compara alternativas desde la ética del deber y la ética de las consecuencias para argumentar decisiones responsables.',
    illustration: ASSET_IMAGES.m5,
    illustrationAlt:
      'Estudiante sosteniendo una brújula ética frente a dos caminos: difusión viral impulsiva o respeto y diálogo.',
    introduction: [
      'En las redes sociales es fácil compartir algo de inmediato, especialmente cuando una publicación parece divertida, interesante o sorprendente.',
      'Pero una decisión responsable necesita algo más que una reacción rápida.',
      'En este módulo aprenderás a comparar alternativas, reconocer valores que pueden entrar en conflicto y justificar tus decisiones considerando los derechos y el bienestar de otras personas.',
    ],
    concepts: [
      {
        term: 'Decisión ética',
        definition:
          'Elección que requiere considerar valores, derechos, responsabilidades y posibles consecuencias.',
      },
      {
        term: 'Dilema ético',
        definition:
          'Situación en la que existen razones o principios en tensión y es necesario examinar diferentes alternativas.',
      },
      {
        term: 'Argumentación',
        definition: 'Explicación de una postura mediante razones.',
      },
      {
        term: 'Ética del deber',
        definition:
          'Perspectiva que permite examinar las acciones a partir del respeto por principios y por las personas.',
      },
      {
        term: 'Ética de las consecuencias',
        definition:
          'Perspectiva que permite examinar las decisiones considerando sus posibles efectos sobre las personas involucradas.',
      },
    ],
    caseTitle: 'Un video que todos quieren compartir',
    caseStory: [
      'En un grupo de mensajería circula un video que muestra a un estudiante en una situación incómoda.',
      'Algunos compañeros consideran que el video es divertido y proponen publicarlo para que más personas puedan verlo.',
      'Laura recibe el contenido y piensa que, si lo comparte, posiblemente obtendrá muchas reacciones.',
      'Sin embargo, también sabe que la persona que aparece podría sentirse afectada. Laura debe decidir qué hacer.',
    ],
    analysisPrompt:
      'Clasifica los argumentos del caso y examina la situación desde el respeto por las personas y desde sus consecuencias.',
    alternatives: [
      {
        id: 'compartir',
        label: 'Compartir el video para sumarse a lo que el grupo considera divertido.',
        feedbackTitle: 'Revisión desde los dos enfoques éticos',
        feedbackBody:
          'Una decisión ética no depende de cuántas personas apoyan una acción. Desde la ética del deber, instrumentaliza a un compañero; desde las consecuencias, multiplica el daño y la humillación.',
        conceptualNote:
          'Reenviar un contenido ajeno también es una decisión moral con responsabilidad propia.',
        consequenceNote:
          'Amplifica el alcance de una situación incómoda que puede derivar en burla sostenida.',
        perspectiveNote:
          'Obtener reacciones rápidas no compensa la afectación a la dignidad de quien aparece.',
      },
      {
        id: 'no_compartir',
        label: 'No compartirlo y cortar la cadena desde el propio teléfono.',
        feedbackTitle: 'Revisión desde los dos enfoques éticos',
        feedbackBody:
          'Negarse a reenviar protege la dignidad de la persona involucrada y evita contribuir a las consecuencias negativas, aunque todavía deja abierta la posibilidad de orientar al grupo.',
        conceptualNote:
          'Aplica el principio de no causar daño y reconoce la responsabilidad individual frente al reenvío.',
        consequenceNote:
          'Evita sumar más difusión desde tu red de contactos.',
        perspectiveNote:
          'Es una decisión respetuosa que puede fortalecerse si además invitas a otros a reflexionar.',
      },
      {
        id: 'explicar',
        label: 'Explicar a los compañeros por qué conviene detener su circulación.',
        feedbackTitle: 'Revisión desde los dos enfoques éticos',
        feedbackBody:
          'Argumentar en el grupo ayuda a transformar la presión colectiva en conciencia ética, uniendo el respeto por la dignidad humana con la prevención de consecuencias dañinas.',
        conceptualNote:
          'Pone en práctica la argumentación ética y la solidaridad activa entre pares.',
        consequenceNote:
          'Frena a otros compañeros que quizá iban a compartir por impulso sin medir el efecto.',
        perspectiveNote:
          'Recuerda al grupo la regla básica de empatía: ¿cómo nos sentiríamos en ese lugar?',
      },
      {
        id: 'buscar_ayuda',
        label: 'Buscar ayuda si la situación puede afectar seriamente a alguien.',
        feedbackTitle: 'Revisión desde los dos enfoques éticos',
        feedbackBody:
          'Cuando el contenido puede causar afectación seria en el entorno escolar, acudir a docentes u orientación demuestra compromiso real con el bienestar y los derechos de la persona.',
        conceptualNote:
          'Prioriza el cuidado de los derechos fundamentales sobre la comodidad de guardar silencio.',
        consequenceNote:
          'Permite una intervención oportuna para proteger al estudiante afectado.',
        perspectiveNote:
          'Respalda a quien se encuentra en situación de vulnerabilidad.',
      },
      {
        id: 'otra',
        label: 'Proponer otra alternativa fundamentada.',
        feedbackTitle: 'Revisión de tu alternativa',
        feedbackBody:
          'Cualquier postura ética sólida debe sostenerse con razones que respeten a las personas involucradas y evalúen el impacto real de difundir el material.',
        conceptualNote:
          'Integra principios de deber, empatía y evaluación de consecuencias.',
        consequenceNote:
          'Busca detener el daño sin generar nuevas exposiciones.',
        perspectiveNote:
          'Considera tanto a la persona del video como al grupo que participa en la conversación.',
      },
    ],
    allowCustomAlternative: true,
    newInfoTitle: 'Actualización del caso',
    newInfoText:
      'La persona del video solicitó en el grupo que dejaran de compartirlo y explicó que la situación le había generado dificultades con sus compañeros.',
    newInfoQuestion:
      '¿Mantendrías tu decisión inicial? ¿Qué razones cambiaron o se fortalecieron?',
    workshopTitle: 'Taller creativo: «Mi brújula ética digital»',
    workshopProductTitle: 'Matriz de análisis para tomar decisiones responsables',
    workshopDescription:
      'Aplica los cinco apartados de la brújula ética digital a un dilema escolar nuevo para fundamentar la decisión más responsable.',
    reflectionQuestion:
      '¿Qué diferencia existe entre tomar una decisión por impulso y tomarla después de considerar sus consecuencias?',
    closingTakeaway:
      'Tomar decisiones responsables implica examinar razones, reconocer derechos y considerar las consecuencias para las personas involucradas.',
  },
  {
    id: 6,
    shortTitle: 'Futuro digital',
    title: 'Módulo 6. Mi futuro digital',
    centralQuestion: '¿Qué huella quiero dejar?',
    summary:
      'Construye criterios personales para participar en internet de forma coherente con tu proyecto de vida y el respeto mutuo.',
    illustration: ASSET_IMAGES.m6,
    illustrationAlt:
      'Estudiante de grado undécimo organizando recuerdos y proyectos positivos en un camino luminoso hacia su futuro.',
    introduction: [
      'Las decisiones que tomamos en redes sociales forman parte de nuestra experiencia digital.',
      'Algunas publicaciones representan momentos importantes, intereses o ideas que deseamos compartir. Otras pueden dejar de representar lo que pensamos con el paso del tiempo.',
      'En este módulo reflexionarás sobre cómo quieres participar en los espacios digitales y qué criterios pueden ayudarte a construir una identidad digital responsable.',
      'La intención no es presentar el futuro como una consecuencia inevitable de nuestras publicaciones, sino reconocer que podemos revisar nuestras decisiones y construir nuevas formas de actuar.',
    ],
    concepts: [
      {
        term: 'Proyecto de vida',
        definition:
          'Conjunto de intereses, decisiones y metas que orientan el desarrollo personal.',
      },
      {
        term: 'Identidad digital responsable',
        definition:
          'Forma de participar en espacios digitales considerando los derechos propios y ajenos.',
      },
      {
        term: 'Autonomía',
        definition:
          'Capacidad de tomar decisiones reflexivas y reconocer sus consecuencias.',
      },
      {
        term: 'Reputación',
        definition:
          'Imagen que otras personas pueden construir a partir de la información disponible.',
      },
      {
        term: 'Compromiso ético',
        definition:
          'Decisión consciente de orientar las acciones a partir de principios y responsabilidades.',
      },
    ],
    caseTitle: 'La huella que quiero construir',
    caseStory: [
      'Daniela se encuentra próxima a terminar el grado undécimo.',
      'Mientras organiza sus fotografías y publicaciones, encuentra contenidos antiguos que ya no representan completamente sus intereses actuales.',
      'Algunos le generan buenos recuerdos, otros le parecen poco respetuosos y otros contienen información que ahora preferiría mantener privada.',
      'Daniela comienza a preguntarse qué tipo de información desea conservar, qué quiere compartir y cómo puede participar en redes sociales de manera más responsable.',
    ],
    analysisPrompt:
      'Audita las cinco publicaciones ficticias de Daniela y selecciona tus cinco principios prioritarios de ciudadanía digital.',
    alternatives: [
      {
        id: 'A',
        label:
          'Dejar todo igual porque «lo que pasó antes ya no se puede cambiar».',
        feedbackTitle: 'Análisis de la postura A',
        feedbackBody:
          'No existe un único perfil digital ideal ni estamos condenados por errores pasados, pero revisar y depurar contenidos antiguos es un acto legítimo de autonomía y madurez.',
        conceptualNote:
          'La identidad digital es dinámica y puede actualizarse con criterio propio.',
        consequenceNote:
          'Conservar información privada o poco respetuosa sin revisión puede afectar futuras oportunidades o relaciones.',
        perspectiveNote:
          'Tu versión actual tiene derecho a decidir cómo quiere presentarse hoy.',
      },
      {
        id: 'B',
        label:
          'Revisar el historial, proteger datos privados, retirar publicaciones que afecten a otros y conservar lo que refleja sus valores.',
        feedbackTitle: 'Análisis de la postura B',
        feedbackBody:
          'Cuidar nuestra huella combina revisar el pasado con definir criterios claros para el presente y el futuro, respetando tanto la autonomía propia como los derechos ajenos.',
        conceptualNote:
          'Integra proyecto de vida, autonomía y compromiso ético de manera equilibrada.',
        consequenceNote:
          'Construye un entorno digital más seguro, coherente y positivo.',
        perspectiveNote:
          'Muestra madurez al reconocer errores anteriores sin miedo ni culpa paralizante.',
      },
      {
        id: 'C',
        label:
          'Eliminar todas las cuentas digitales para evitar cualquier riesgo futuro.',
        feedbackTitle: 'Análisis de la postura C',
        feedbackBody:
          'Desconectarse es una opción personal válida temporalmente, pero el propósito de la ciudadanía digital no es aislarse, sino aprender a participar con criterio y respeto.',
        conceptualNote:
          'La autonomía permite habitar espacios digitales con herramientas críticas, no solo evitarlos.',
        consequenceNote:
          'Se pierden oportunidades de expresión, aprendizaje y colaboración positiva en red.',
        perspectiveNote:
          'Es posible compartir proyectos, causas y recuerdos valiosos cuidando los límites.',
      },
    ],
    allowCustomAlternative: true,
    newInfoTitle: 'Revisión hacia tu propio perfil',
    newInfoText:
      'Daniela descubre que al definir criterios claros —qué comparte, con quién y con qué propósito— deja de publicar por presión y disfruta más sus espacios digitales.',
    newInfoQuestion:
      '¿Qué cambio concreto harías esta semana en tu forma de publicar o revisar tus contenidos?',
    workshopTitle: 'Taller creativo: «Mi compromiso digital»',
    workshopProductTitle: 'Manifiesto visual personal de ciudadanía digital',
    workshopDescription:
      'Redacta tu afiche editorial con título propio, cinco compromisos, acciones de privacidad y respeto, y tu frase de huella digital.',
    reflectionQuestion:
      '¿Qué decisiones puedo empezar a tomar para construir una participación digital que refleje mis valores y respete a las demás personas?',
    closingTakeaway:
      'Construir una huella digital responsable no significa dejar de participar en internet, sino hacerlo con mayor conciencia de lo que se comparte, de sus posibles consecuencias y de los derechos de otras personas.',
  },
];

// Datos específicos para actividades interactivas de M2, M3, M4, M5 y M6
export const M2_HOTSPOTS: PrivacyHotspot[] = [
  {
    id: 'ubicacion',
    label: 'Etiqueta de ubicación en tiempo real',
    xPercent: 72,
    yPercent: 18,
    reveals: 'Muestra el café exacto y el barrio donde está Samuel en este momento.',
    whyItMatters:
      'Publicar ubicación en tiempo real permite que personas desconocidas sepan dónde encontrarte y cuáles son tus rutas habituales.',
  },
  {
    id: 'uniforme',
    label: 'Escudo y nombre en el uniforme escolar',
    xPercent: 34,
    yPercent: 62,
    reveals: 'Se distingue claramente el colegio al que pertenece y el apellido bordado en la chaqueta.',
    whyItMatters:
      'Facilita identificar la institución educativa, horarios de salida y datos personales sin que Samuel lo haya escrito.',
  },
  {
    id: 'etiquetas',
    label: 'Etiquetas con usuarios de compañeros',
    xPercent: 52,
    yPercent: 84,
    reveals: 'Vincula directamente los perfiles de tres compañeros que aparecen en la foto.',
    whyItMatters:
      'Expone la identidad digital de otras personas ante tu audiencia sin verificar si autorizaron ser etiquetadas.',
  },
  {
    id: 'sitio',
    label: 'Letrero y fachada del sitio frecuentado',
    xPercent: 18,
    yPercent: 28,
    reveals: 'Al fondo aparece el letrero del parque comercial cercano al colegio.',
    whyItMatters:
      'Incluso sin etiqueta GPS, los detalles visuales del fondo revelan lugares frecuentados con regularidad.',
  },
  {
    id: 'objetos',
    label: 'Carné escolar visible sobre la mesa',
    xPercent: 64,
    yPercent: 68,
    reveals: 'Sobre la mesa hay un carné estudiantil con código y fotografía parcial.',
    whyItMatters:
      'Los documentos visibles en fotografías cotidianas pueden filtrar datos sensibles o de identificación.',
  },
];

export const M3_PERSPECTIVES: CharacterPerspective[] = [
  {
    id: 'camila',
    name: 'Camila',
    role: 'Quien tomó y publicó la fotografía',
    stance: 'Quiere conservar y compartir un recuerdo.',
    quote:
      '«Yo tomé la foto después de la actividad porque estábamos pasando un buen momento. No la veo ofensiva ni la subí con mala intención.»',
  },
  {
    id: 'nicolas',
    name: 'Nicolás',
    role: 'Compañero que aparece en la imagen',
    stance: 'No desea que esa fotografía sea pública.',
    quote:
      '«Salí en un gesto que me hace sentir incómodo y no me preguntaron antes de subirla. Prefiero que esa foto no esté en redes.»',
  },
  {
    id: 'companero',
    name: 'Compañero que comenta',
    stance: 'Considera que no debería existir un problema porque la imagen parece una broma.',
    role: 'Observador en comentarios',
    quote:
      '«Relájate, Nicolás, nadie se está burlando en serio. Es solo una foto chistosa del grupo, no hay que armar problema.»',
  },
  {
    id: 'companera',
    name: 'Compañera que interviene',
    role: 'Mediadora del grupo',
    stance: 'Cree que deben considerar la opinión de Nicolás.',
    quote:
      '«Aunque no haya mala intención, si Nicolás se siente incómodo con su imagen pública, lo justo es escucharlo y retirarla.»',
  },
];

export const M3_VALUES = [
  { id: 'libertad', label: 'Libertad', desc: 'Expresarse y compartir experiencias propias.' },
  { id: 'respeto', label: 'Respeto', desc: 'Reconocer los límites y derechos de los demás.' },
  { id: 'autonomia', label: 'Autonomía', desc: 'Decidir sobre la propia imagen e información.' },
  { id: 'dignidad', label: 'Dignidad', desc: 'Trato valioso que evita la exposición incómoda.' },
  { id: 'responsabilidad', label: 'Responsabilidad', desc: 'Asumir el impacto de lo que compartimos.' },
  { id: 'confianza', label: 'Confianza', desc: 'Seguridad mutua entre amigos y compañeros.' },
];

export const M4_TIMELINE_NODES: TimelineNode[] = [
  {
    step: 1,
    title: 'Andrés graba el video',
    description: 'Durante la reunión escolar registra un momento espontáneo con su teléfono.',
    decisionPrompt: '¿Qué conviene preguntar desde el momento de grabar?',
    insight:
      'Aun antes de publicar, vale preguntarse si quienes aparecen saben que están siendo grabados y si están de acuerdo.',
  },
  {
    step: 2,
    title: 'Decide publicarlo',
    description: 'Sube el clip a su perfil abierto para compartirlo con conocidos.',
    decisionPrompt: '¿Qué cambia al pasar de un archivo local a una red social?',
    insight:
      'Al publicarlo en línea, el contenido queda disponible para ser copiado o capturado por cualquier usuario con acceso.',
  },
  {
    step: 3,
    title: 'Sus compañeros lo observan',
    description: 'El video recibe visualizaciones, reacciones y comentarios rápidos.',
    decisionPrompt: '¿Cómo influye la reacción colectiva en la circulación?',
    insight:
      'Las interacciones aumentan la visibilidad algorítmica y llaman la atención de más personas en menos tiempo.',
  },
  {
    step: 4,
    title: 'Una persona lo descarga',
    description: 'Alguien guarda una copia del video en su propio dispositivo.',
    decisionPrompt: '¿Quién controla esa copia a partir de este instante?',
    insight:
      'El autor original pierde el control técnico exclusivo: la copia ya existe fuera de su perfil.',
  },
  {
    step: 5,
    title: 'Andrés elimina la publicación',
    description: 'Al notar comentarios incómodos, borra el video de su cuenta.',
    decisionPrompt: '¿Eliminar la publicación borra las copias ya descargadas?',
    insight:
      'Borrar detiene la vista directa en tu perfil, pero no elimina archivos descargados ni capturas realizadas por otros.',
  },
  {
    step: 6,
    title: 'Meses después, el video vuelve a circular',
    description: 'Otra persona reenvía el archivo guardado en un nuevo chat fuera de contexto.',
    decisionPrompt: '¿Qué exige este escenario en términos de responsabilidad?',
    insight:
      'Demuestra que internet recuerda a través de terceros y que actuar responsablemente implica prevenir y responder con diálogo o apoyo.',
  },
];

export const M5_ARGUMENTS: ArgumentCard[] = [
  {
    id: 'arg1',
    quote: '«Es divertido y muchas personas quieren verlo».',
    category: 'consecuencias',
    explanation:
      'Apela al entretenimiento y la aprobación popular, pero ignora las consecuencias negativas sobre quien aparece.',
  },
  {
    id: 'arg2',
    quote: '«La persona que aparece puede sentirse afectada».',
    category: 'consecuencias',
    explanation:
      'Evalúa directamente los efectos emocionales y relacionales (ética de las consecuencias).',
  },
  {
    id: 'arg3',
    quote: '«Si yo estuviera en esa situación, no me gustaría que lo compartieran».',
    category: 'valores',
    explanation:
      'Refleja reciprocidad, empatía y respeto por principios universales de trato justo (ética del deber).',
  },
  {
    id: 'arg4',
    quote: '«Aunque Laura no grabó el video, reenviarlo también es una decisión».',
    category: 'derechos',
    explanation:
      'Reconoce la responsabilidad moral propia y el derecho a la dignidad e imagen de quien aparece.',
  },
];

export const M6_POST_REVIEWS: SimulatedPostReview[] = [
  {
    id: 'p1',
    title: 'Proyecto de robótica escolar',
    author: '@daniela.once',
    tag: 'Actividad académica',
    content:
      'Fotografía del prototipo construido en clase de Tecnología junto con la explicación del aprendizaje logrado.',
    recommendedAssessment: 'positivo',
    guidance:
      'Muestra intereses académicos positivos sin exponer datos personales sensibles ni burlarse de nadie.',
  },
  {
    id: 'p2',
    title: 'Comentario impulsivo en discusión',
    author: '@daniela.once',
    tag: 'Discusión en línea',
    content:
      'Respuesta escrita con enojo atacando personalmente a otro usuario durante un debate en comentarios.',
    recommendedAssessment: 'revisar',
    guidance:
      'Conviene revisar el tono: es válido expresar desacuerdo con argumentos, pero atacar a la persona afecta la convivencia y tu reputación.',
  },
  {
    id: 'p3',
    title: 'Foto frente a casa con dirección',
    author: '@daniela.once',
    tag: 'Información personal',
    content:
      'Publicación antigua donde se ve la placa exacta de la vivienda y el horario habitual de llegada.',
    recommendedAssessment: 'revisar',
    guidance:
      'Contiene datos de ubicación privada que conviene retirar o mantener fuera del alcance público.',
  },
  {
    id: 'p4',
    title: 'Campaña por biblioteca barrial',
    author: '@daniela.once',
    tag: 'Causa social',
    content:
      'Invitación a donar libros usados para la jornada comunitaria en Usme con el enlace oficial de la iniciativa.',
    recommendedAssessment: 'positivo',
    guidance:
      'Refleja compromiso ciudadano y uso constructivo de las redes sociales para aportar a la comunidad.',
  },
  {
    id: 'p5',
    title: 'Recuerdo de salida pedagógica',
    author: '@daniela.once',
    tag: 'Foto grupal con permiso',
    content:
      'Fotografía grupal publicada después de preguntar a todos los compañeros que aparecen si deseaban salir.',
    recommendedAssessment: 'positivo',
    guidance:
      'Integra convivencia digital y consentimiento previo, fortaleciendo la confianza en el grupo.',
  },
];

export const M6_PRINCIPLES = [
  'Pensar antes de publicar',
  'Respetar la privacidad',
  'Consultar a otras personas',
  'Revisar la información',
  'Evitar compartir contenidos que humillen',
  'Reconocer las consecuencias',
  'Expresar opiniones con respeto',
  'Buscar ayuda cuando sea necesario',
];

export const WORKSHOP_CRITERIA = [
  'Comprensión del problema planteado.',
  'Reconocimiento de derechos, valores o responsabilidades.',
  'Análisis de posibles consecuencias.',
  'Argumentación de las decisiones.',
  'Propuestas de actuación respetuosas y responsables.',
  'Claridad en la comunicación del producto.',
];

export const FINAL_CHALLENGE_DATA = {
  title: 'El desafío final: antes de compartir',
  subtitle: 'Actividad integradora de los seis módulos',
  situation: [
    'Un grupo de estudiantes organiza una actividad de despedida de grado undécimo.',
    'Durante la jornada se toman fotografías y videos que algunas personas desean publicar para recordar el evento.',
    'Una estudiante propone crear una publicación colectiva, pero descubre que algunas imágenes contienen información personal, una de las personas no quiere aparecer y un video podría interpretarse fuera de contexto.',
    'El grupo debe decidir cómo compartir los recuerdos de manera responsable.',
  ],
  moments: [
    {
      step: 1,
      title: 'Momento 1. Comprender',
      prompt:
        '¿Qué personajes intervienen en esta despedida, qué información visible podría generar riesgo y cuáles son las dificultades principales?',
    },
    {
      step: 2,
      title: 'Momento 2. Analizar',
      prompt:
        '¿Qué derechos, valores y responsabilidades están en juego (privacidad, consentimiento, dignidad, identidad y permanencia)?',
    },
    {
      step: 3,
      title: 'Momento 3. Comparar',
      prompt:
        'Compara al menos dos alternativas distintas para realizar la publicación colectiva y evalúa las consecuencias de cada una.',
    },
    {
      step: 4,
      title: 'Momento 4. Decidir',
      prompt:
        'Formula la propuesta concreta que debería adoptar el curso y explica qué características garantizan que sea una publicación responsable.',
    },
    {
      step: 5,
      title: 'Momento 5. Revisar',
      prompt:
        'Nueva opinión: uno de los compañeros sugiere que, además de retirar las fotos sin permiso, acuerden no reenviar el video ambiguo ni siquiera por grupos privados. ¿Cómo ajusta o refuerza esto tu propuesta?',
    },
  ],
};

export const GLOSSARY_ITEMS = [
  {
    term: 'Ciudadanía digital',
    definition:
      'Participación crítica, ética, segura y responsable en entornos digitales respetando los derechos propios y los de otras personas.',
  },
  {
    term: 'Identidad digital',
    definition:
      'Conjunto de información, publicaciones, comentarios e interacciones que construyen la representación de una persona en internet.',
  },
  {
    term: 'Privacidad',
    definition:
      'Derecho y capacidad de decidir qué aspectos de la vida personal se mantienen reservados y cuáles se comparten.',
  },
  {
    term: 'Consentimiento',
    definition:
      'Autorización libre e informada de una persona antes de usar o publicar su imagen, voz o información personal.',
  },
  {
    term: 'Huella digital activa',
    definition:
      'Rastros que dejamos de forma consciente cuando publicamos fotos, videos, comentarios o formularios.',
  },
  {
    term: 'Huella digital pasiva',
    definition:
      'Datos generados automáticamente al navegar o interactuar en plataformas, como historial, ubicación o preferencias.',
  },
  {
    term: 'Permanencia digital',
    definition:
      'Capacidad de los contenidos publicados en línea para seguir almacenados o circulando incluso después de haber sido eliminados del perfil original.',
  },
  {
    term: 'Reputación digital',
    definition:
      'Percepción que otras personas forman sobre alguien a partir de los rastros e interacciones visibles en internet.',
  },
  {
    term: 'Dignidad humana',
    definition:
      'Valor intrínseco de toda persona que exige trato respetuoso y prohíbe la humillación o instrumentalización.',
  },
  {
    term: 'Dilema ético',
    definition:
      'Situación en la que entran en tensión valores o deberes y se requiere analizar alternativas antes de decidir.',
  },
];

export const DIGITAL_RIGHTS = [
  {
    title: 'Derecho a la intimidad personal y familiar',
    foundation: 'Artículo 15 de la Constitución Política de Colombia',
    explanation:
      'Protege la esfera privada de cada estudiante frente a intromisiones o exposiciones no autorizadas en espacios públicos o digitales.',
  },
  {
    title: 'Derecho al buen nombre y a la honra',
    foundation: 'Artículos 15 y 21 de la Constitución Política de Colombia',
    explanation:
      'Implica que ninguna publicación, broma o comentario fuera de contexto debe lesionar injustamente la dignidad y reputación de otra persona.',
  },
  {
    title: 'Protección de datos personales (Habeas Data)',
    foundation: 'Ley Estatutaria 1581 de 2012',
    explanation:
      'Reconoce el derecho de conocer, actualizar y rectificar información personal y exige autorización previa del titular para tratar o difundir datos e imágenes identificables.',
  },
  {
    title: 'Libertad de expresión responsable',
    foundation: 'Artículo 20 de la Constitución Política de Colombia',
    explanation:
      'Garantiza expresar opiniones e ideas libremente, en equilibrio con la veracidad, el respeto por los derechos ajenos y la convivencia escolar.',
  },
];

export const FAQ_ITEMS = [
  {
    q: '¿Qué debo considerar antes de compartir una fotografía donde aparece otra persona?',
    a: 'Verifica que la imagen no la exponga de manera incómoda, revisa si revela información privada (uniforme, ubicación, documentos) y pregúntale directamente si está de acuerdo con aparecer antes de publicar.',
  },
  {
    q: '¿Qué puedo hacer si alguien comparte una imagen mía que no quiero que circule?',
    a: 'Primero solicita de forma clara y respetuosa a quien la publicó que la retire. Si persiste o genera burlas, guarda evidencia, utiliza las opciones de reporte de la plataforma y busca apoyo de tus docentes, orientadores escolares o familia.',
  },
  {
    q: '¿Si borro una publicación inmediatamente después de subirla, desaparece por completo?',
    a: 'No siempre. Aunque desaparezca de tu perfil, otras personas pudieron hacer capturas de pantalla o descargarla mientras estuvo visible. Por eso la mejor estrategia es revisar antes de publicar.',
  },
  {
    q: '¿Significa esto que no debo usar redes sociales?',
    a: 'No. El objetivo de HUELLA DIGITAL no es prohibir ni generar miedo, sino desarrollar criterio ético para compartir momentos, aprender, expresarse y convivir con respeto.',
  },
  {
    q: '¿Dónde se guardan mis respuestas y materiales en esta página?',
    a: 'Todo tu avance se almacena únicamente de forma local en este navegador, sin crear cuentas ni recopilar datos sensibles. Si borras los datos del navegador se perderán, por eso te recomendamos imprimir o guardar en PDF tus creaciones al terminar.',
  },
];

export const CONSULTATION_SOURCES = [
  {
    title: 'Constitución Política de Colombia (1991)',
    detail: 'Artículos 15 (intimidad, buen nombre y habeas data), 20 (libertad de expresión) y 44 (derechos de niños, niñas y adolescentes).',
  },
  {
    title: 'Ley 1581 de 2012 — Régimen General de Protección de Datos Personales',
    detail: 'Principios de libertad, finalidad, veracidad y autorización previa del titular en el tratamiento de datos personales.',
  },
  {
    title: 'Ley 1620 de 2013 y Decreto 1965 de 2013',
    detail: 'Sistema Nacional de Convivencia Escolar y rutas de atención frente a situaciones de ciberacoso o afectación a la convivencia.',
  },
  {
    title: 'Ministerio de Educación Nacional (MEN)',
    detail: 'Estándares Básicos de Competencias Ciudadanas y Orientaciones Generales para la Educación en Tecnología.',
  },
  {
    title: 'MinTIC Colombia — Estrategia En TIC Confío',
    detail: 'Lineamientos pedagógicos sobre uso seguro, responsable y creativo de internet y redes sociales.',
  },
  {
    title: 'UNESCO — Marco de Competencias en Ciudadanía Digital',
    detail: 'Referentes internacionales sobre ética digital, alfabetización mediática e informacional y participación respetuosa.',
  },
];
