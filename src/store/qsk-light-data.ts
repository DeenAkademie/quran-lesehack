// QSK-Light Datenstore
// Diese Datei enthält alle hardcodierten Daten für das QSK-Light-Projekt

// Moduldaten
export const moduleData = [
  {
    id: 1,
    title: 'Einführung',
    description:
      'Dieser Einführungskurs bereitet dich optimal vor, erklärt den Kursaufbau und stärkt dein Mindset für konstante Fortschritte. Marcel Krass begrüßt dich persönlich!',
    lessons: 12,
    duration: 15,
    image: '/img/module-1.png',
  },
  {
    id: 2,
    title: 'Deine Lektionen',
    description:
      'Hier lernst du in 2 Wochen die Grundlagen des Quranlesens. Du übst jede Woche 3 arabische Buchstaben und machst durch gezielte Lektionen und Übungen schnelle Fortschritte im Lesen.',
    lessons: 10,
    duration: 75,
    image: '/img/module-2.png',
  },
  {
    id: 3,
    title: 'Wie geht es weiter?',
    description:
      'Das letzte Modul bringt dich zum Ziel! Fortsetzung des Kurses mit einer einzigartigen Methode, die dich zum Lesen ganzer Verse führt. Sichere dir jetzt lebenslangen Zugang!',
    lessons: 11,
    duration: 16,
    image: '/img/module-3.png',
  },
];

// Lektionsdaten mit Embed-Code und Thumbnails
export const lessonData = [
  {
    id: 1,
    title: 'Herzlich Willkommen zum Quran Lesehack!',
    moduleId: 1,
    sectionId: 1,
    type: 'video',
    duration: 2,
    pages: 1,
    status: 'completed',
    exerciseId: undefined,
    thumbnail: '/img/thumbnails/lesson-1.jpg',
    embedCode:
      '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1067564218?h=6ea0794706&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Herzlich Willkommen zum Quran Lesehack!"></iframe></div>',
  },
  {
    id: 2,
    title: 'Überprüfe deine Aussprache!',
    moduleId: 1,
    sectionId: 1,
    type: 'video',
    duration: 1,
    pages: 1,
    status: 'completed',
    exerciseId: undefined,
    thumbnail: '/img/thumbnails/lesson-2.jpg',
    embedCode:
      '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1067696095?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Überprüfe deine Aussprache!"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  },
  {
    id: 3,
    title: 'Viel Spaß und Erfolg beim Lernen!',
    moduleId: 1,
    sectionId: 1,
    type: 'video',
    duration: 1,
    pages: 1,
    status: 'completed',
    exerciseId: undefined,
    thumbnail: '/img/thumbnails/lesson-3.jpg',
    embedCode:
      '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1067696440?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Viel Spaß und Erfolg beim Lernen!"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  },
  {
    id: 4,
    title: 'Assalamu Aleikum zum Quran Lesehack!',
    moduleId: 1,
    sectionId: 2,
    type: 'video',
    duration: 1,
    pages: 1,
    status: 'completed',
    exerciseId: undefined,
    thumbnail: '/img/thumbnails/lesson-4.jpg',
    embedCode:
      '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1067678934?h=020a2f15ae&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Assalamu Aleikum zum Quran Lesehack"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  },
  {
    id: 5,
    title: 'Was ist im Quran Lesehack enthalten?',
    moduleId: 1,
    sectionId: 2,
    type: 'video',
    duration: 1,
    pages: 1,
    status: 'completed',
    exerciseId: undefined,
    thumbnail: '/img/thumbnails/lesson-5.jpg',
    embedCode:
      '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1067679215?h=7dfcbc9bff&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Was ist im Quran Lesehack enthalten"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  },
  {
    id: 6,
    title: 'Impulse für dein Mindset',
    moduleId: 1,
    sectionId: 3,
    type: 'video',
    duration: 1,
    pages: 1,
    status: 'completed',
    exerciseId: undefined,
    thumbnail: '/img/thumbnails/lesson-6.jpg',
    embedCode:
      '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1067679085?h=dd59312af9&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Impulse für dein Mindset"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  },
  {
    id: 7,
    title: 'Das Allerwichtigste: Fasse deine Absicht!',
    moduleId: 1,
    sectionId: 3,
    type: 'video',
    duration: 1,
    pages: 1,
    status: 'completed',
    exerciseId: undefined,
    thumbnail: '/img/thumbnails/lesson-7.jpg',
    embedCode:
      '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1067679001?h=612951abaa&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Das Allerwichtigste Fasse deine Absicht"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  },
  {
    id: 8,
    title: 'اBalance zwischen Theorie und Praxis',
    moduleId: 1,
    sectionId: 3,
    type: 'video',
    duration: 1,
    pages: 1,
    status: 'completed',
    exerciseId: 1,
    thumbnail: '/img/thumbnails/lesson-8.jpg',
    embedCode:
      '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1067678968?h=39a008740b&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Balance zwischen Theorie und Praxis"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  },
  {
    id: 9,
    title: 'Sei geduldig und lass dir helfen',
    moduleId: 1,
    sectionId: 3,
    type: 'video',
    duration: 1,
    pages: 1,
    status: 'completed',
    exerciseId: 1,
    thumbnail: '/img/thumbnails/lesson-9.jpg',
    embedCode:
      '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1067679148?h=e762aa44f5&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Sei geduldig und lass dir helfen"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  },
  {
    id: 10,
    title: 'Glaube an dich selbst!',
    moduleId: 1,
    sectionId: 3,
    type: 'video',
    duration: 1,
    pages: 1,
    status: 'completed',
    exerciseId: 1,
    thumbnail: '/img/thumbnails/lesson-10.jpg',
    embedCode:
      '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1067679048?h=5af1ac76d7&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Glaube an dich selbst"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  },
  {
    id: 11,
    title: 'Investiere jeden Tag ein bisschen!',
    moduleId: 1,
    sectionId: 3,
    type: 'video',
    duration: 1,
    pages: 1,
    status: 'completed',
    exerciseId: 1,
    thumbnail: '/img/thumbnails/lesson-11.jpg',
    embedCode:
      '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1067679109?h=1554d11a70&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Investiere jeden Tag ein bisschen"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  },
  {
    id: 12,
    title: 'Was du bisher gelernt hast',
    moduleId: 1,
    sectionId: 4,
    type: 'video',
    duration: 1,
    pages: 1,
    status: 'completed',
    exerciseId: 1,
    thumbnail: '/img/thumbnails/lesson-11.jpg',
    embedCode:
      '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1067679183?h=b5221f64c8&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Was du bisher gelernt hast"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  },
  {
    id: 13,
    title: 'Einführung in dieses Lernmodul',
    moduleId: 2,
    sectionId: 5,
    type: 'video',
    duration: 1,
    pages: 1,
    status: 'completed',
    exerciseId: undefined,
    thumbnail: '/img/thumbnails/lesson-13.jpg',
    embedCode:
      '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1067679494?h=6eeb375704&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Einführung in dieses Lernmodul"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  },
  {
    id: 14,
    title: 'Erklärung der Übungsseite',
    moduleId: 2,
    sectionId: 5,
    type: 'video',
    duration: 7,
    pages: 1,
    status: 'completed',
    exerciseId: undefined,
    thumbnail: '/img/thumbnails/lesson-14.jpg',
    embedCode:
      '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1067679513?h=05c3f52f65&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Erklärung der Übungsseite"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  },
  {
    id: 15,
    title: 'Lektion 1 - ا',
    moduleId: 2,
    sectionId: 6,
    type: 'video',
    duration: 10,
    pages: 1,
    status: 'completed',
    exerciseId: 2,
    thumbnail: '/img/thumbnails/lesson-15.jpg',
    embedCode:
      '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1067742691?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Lektion 1 - د"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  },
  {
    id: 16,
    title: 'Lektion 2 - ب',
    moduleId: 2,
    sectionId: 6,
    type: 'video',
    duration: 11,
    pages: 1,
    status: 'available',
    exerciseId: 3,
    thumbnail: '/img/thumbnails/lesson-16.jpg',
    embedCode:
      '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1067742803?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Lektion 2 - ز"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  },
  {
    id: 17,
    title: 'Lektion 3 - ت',
    moduleId: 2,
    sectionId: 6,
    type: 'video',
    duration: 9,
    pages: 1,
    status: 'available',
    exerciseId: 4,
    thumbnail: '/img/thumbnails/lesson-17.jpg',
    embedCode:
      '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1067742929?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Lektion 3 - م"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  },
  {
    id: 18,
    title: 'Lektion 4 - ث',
    moduleId: 2,
    sectionId: 7,
    type: 'video',
    duration: 12,
    pages: 1,
    status: 'available',
    exerciseId: 5,
    thumbnail: '/img/thumbnails/lesson-18.jpg',
    embedCode:
      '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1067743409?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Lektion 4 - ن"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  },
  {
    id: 19,
    title: 'Lektion 5 - ج',
    moduleId: 2,
    sectionId: 7,
    type: 'video',
    duration: 10,
    pages: 1,
    status: 'available',
    exerciseId: 6,
    thumbnail: '/img/thumbnails/lesson-19.jpg',
    embedCode:
      '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1067743600?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Lektion 5 - ل"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  },
  {
    id: 20,
    title: 'Lektion 6 - ح',
    moduleId: 2,
    sectionId: 7,
    type: 'video',
    duration: 13,
    pages: 1,
    status: 'available',
    exerciseId: 7,
    thumbnail: '/img/thumbnails/lesson-20.jpg',
    embedCode:
      '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1067743722?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Lektion 6 - ا"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  },
  {
    id: 21,
    title: 'Herzlichen Glückwunsch zum Abschluss!',
    moduleId: 2,
    sectionId: 8,
    type: 'video',
    duration: 1,
    pages: 1,
    status: 'available',
    exerciseId: undefined,
    thumbnail: '/img/thumbnails/lesson-21.jpg',
    embedCode:
      '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1067679562?h=0a00a62997&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Herzlichen Glückwunsch zum Abschluss"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  },
  {
    id: 22,
    title: 'Abschluss dieses Moduls',
    moduleId: 2,
    sectionId: 8,
    type: 'video',
    duration: 1,
    pages: 1,
    status: 'available',
    exerciseId: undefined,
    thumbnail: '/img/thumbnails/lesson-22.jpg',
    embedCode:
      '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1067679463?h=ed56a12d7d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Abschluss dieses Moduls"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  },
  {
    id: 23,
    title: 'Zuallerst: Du hast es geschafft!',
    moduleId: 3,
    sectionId: 9,
    type: 'video',
    duration: 1,
    pages: 1,
    status: 'available',
    exerciseId: undefined,
    thumbnail: '/img/thumbnails/lesson-23.jpg',
    embedCode:
      '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1067680021?h=761f3288fd&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Zuallererst Du hast es geschafft"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  },
  // Module 3 - Was macht die QSK Methode besonders?
  {
    id: 24,
    title: 'Wie geht es nun weiter?',
    moduleId: 3,
    sectionId: 10,
    type: 'video',
    duration: 1,
    pages: 1,
    status: 'available',
    exerciseId: undefined,
    thumbnail: '/img/thumbnails/lesson-24.jpg',
    embedCode:
      '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1067679957?h=bcf8d6ce66&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Wie geht es nun weiter"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  },
  {
    id: 25,
    title: '1. Alternative: Moschee?',
    moduleId: 3,
    sectionId: 10,
    type: 'video',
    duration: 2,
    pages: 1,
    status: 'available',
    exerciseId: undefined,
    thumbnail: '/img/thumbnails/lesson-25.jpg',
    embedCode:
      '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1067679723?h=afe1ea5beb&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Alternative Moschee"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  },
  {
    id: 26,
    title: '2. Alternative: Videokurs?',
    moduleId: 3,
    sectionId: 10,
    type: 'video',
    duration: 1,
    pages: 1,
    status: 'available',
    exerciseId: undefined,
    thumbnail: '/img/thumbnails/lesson-26.jpg',
    embedCode:
      '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1067679760?h=36ed6955c9&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Alternative Videokurs"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  },
  {
    id: 27,
    title: '3. Alternative: Online-Live-Unterricht?',
    moduleId: 3,
    sectionId: 10,
    type: 'video',
    duration: 2,
    pages: 1,
    status: 'available',
    exerciseId: undefined,
    thumbnail: '/img/thumbnails/lesson-27.jpg',
    embedCode:
      '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1067679791?h=b1253c46c6&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Alternative Online-Live-Unterrichte"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  },
  {
    id: 28,
    title: '4. Alternative: Lern-Apps',
    moduleId: 3,
    sectionId: 10,
    type: 'video',
    duration: 1,
    pages: 1,
    status: 'available',
    exerciseId: undefined,
    thumbnail: '/img/thumbnails/lesson-28.jpg',
    embedCode:
      '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1067679825?h=075b3d8cfd&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Alternative Lern-Apps"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  },
  {
    id: 29,
    title: 'Was haben alle Alternativen gemeinsam?',
    moduleId: 3,
    sectionId: 10,
    type: 'video',
    duration: 1,
    pages: 1,
    status: 'available',
    exerciseId: undefined,
    thumbnail: '/img/thumbnails/lesson-29.jpg',
    embedCode:
      '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1067679926?h=3f43075310&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Was haben alle Alternativen gemeinsam"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  },
  {
    id: 30,
    title: 'Es liegt nicht an dir!',
    moduleId: 3,
    sectionId: 10,
    type: 'video',
    duration: 1,
    pages: 1,
    status: 'available',
    exerciseId: undefined,
    thumbnail: '/img/thumbnails/lesson-30.jpg',
    embedCode:
      '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1067679856?h=918420c72d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Es liegt nicht an dir"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  },
  {
    id: 31,
    title: 'Starte durch mit QSK!',
    moduleId: 3,
    sectionId: 10,
    type: 'video',
    duration: 4,
    pages: 1,
    status: 'available',
    exerciseId: undefined,
    thumbnail: '/img/thumbnails/lesson-31.jpg',
    embedCode:
      '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1067679890?h=968c3370cc&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Starte durch mit QSK"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  },
  // Module 3 - Abschluss des Moduls
  {
    id: 32,
    title: 'Wir freuen uns, von dir zu hören!',
    moduleId: 3,
    sectionId: 11,
    type: 'video',
    duration: 1,
    pages: 1,
    status: 'available',
    exerciseId: undefined,
    thumbnail: '/img/thumbnails/lesson-32.jpg',
    embedCode:
      '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1067679987?h=bed8c46f80&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Wir freuen uns, von dir zu hören"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  },
  {
    id: 33,
    title: 'QSK für Kinder',
    moduleId: 3,
    sectionId: 11,
    type: 'video',
    duration: 1,
    pages: 1,
    status: 'available',
    exerciseId: undefined,
    thumbnail: '/img/thumbnails/lesson-33.jpg',
    embedCode:
      '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1067679873?h=4116d9e8b2&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="QSK für Kinder"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  },
];

// Sektionsdaten mit Referenzen zu Lektionen
export const sectionData = {
  // Modul 1: Einführung
  1: [
    {
      id: 1,
      moduleId: 1,
      title: 'Herzlich Willkommen!',
      duration: 4,
      lessons: [1, 2, 3], // IDs der enthaltenen Lektionen
    },
    {
      id: 2,
      moduleId: 1,
      title: 'Einführung und Übersicht',
      duration: 2,
      lessons: [4, 5],
    },
    {
      id: 3,
      moduleId: 1,
      title: 'Mindset & Vorgehen beim Lernen',
      duration: 2,
      lessons: [6, 7, 8, 9, 10, 11],
    },
    {
      id: 4,
      moduleId: 1,
      title: 'Abschluss des Moduls',
      duration: 2,
      lessons: [12],
    },
  ],
  // Modul 2: Deine Lektionen
  2: [
    {
      id: 5,
      moduleId: 2,
      title: 'Einführung',
      duration: 8,
      lessons: [13, 14],
    },
    {
      id: 6,
      moduleId: 2,
      title: 'Woche 1',
      duration: 30,
      lessons: [15, 16, 17],
    },
    {
      id: 7,
      moduleId: 2,
      title: 'Woche 2',
      duration: 35,
      lessons: [18, 19, 20],
    },
    {
      id: 8,
      moduleId: 2,
      title: 'Abschluss des Moduls',
      duration: 2,
      lessons: [21, 22],
    },
  ],
  // Modul 3: Wie geht es weiter?
  3: [
    {
      id: 9,
      moduleId: 3,
      title: 'Einführung',
      duration: 1,
      lessons: [23],
    },
    {
      id: 10,
      moduleId: 3,
      title: 'Was macht die QSK Methode besonders?',
      duration: 13,
      lessons: [24, 25, 26, 27, 28, 29, 30, 31],
    },
    {
      id: 11,
      moduleId: 3,
      title: 'Abschluss des Moduls',
      duration: 2,
      lessons: [32, 33],
    },
  ],
};

// Lokaler Fortschritt (in einer echten Anwendung würde dies in localStorage oder einer Datenbank gespeichert)
export const lessonProgress = {
  1: { progress: 100, completed: true },
  2: { progress: 100, completed: true },
  3: { progress: 100, completed: true },
  4: { progress: 100, completed: true },
  5: { progress: 100, completed: true },
  13: { progress: 100, completed: true },
  14: { progress: 100, completed: true },
  15: { progress: 100, completed: true },
  16: { progress: 0, completed: false },
  17: { progress: 0, completed: false },
  18: { progress: 0, completed: false },
  19: { progress: 0, completed: false },
  20: { progress: 0, completed: false },
  21: { progress: 0, completed: false },
  22: { progress: 0, completed: false },
  23: { progress: 0, completed: false },
};

// Hilfsfunktionen für den Zugriff auf Daten
export function getLessonById(id: number) {
  return lessonData.find((lesson) => lesson.id === id);
}

export function getLessonsByIds(ids: number[]) {
  return ids.map((id) => getLessonById(id)).filter(Boolean);
}

export function getModuleById(id: number) {
  return moduleData.find((module) => module.id === id);
}

export function getSectionsForModule(moduleId: number) {
  return sectionData[moduleId as keyof typeof sectionData] || [];
}

export function getSectionLessons(section: { lessons: number[] }) {
  return getLessonsByIds(section.lessons);
}

export function getLessonProgress(lessonId: number) {
  return (
    lessonProgress[lessonId as keyof typeof lessonProgress] || {
      progress: 0,
      completed: false,
    }
  );
}

export function updateLessonProgress(lessonId: number, progress: number) {
  lessonProgress[lessonId as keyof typeof lessonProgress] = {
    progress,
    completed: progress >= 90,
  };
  return lessonProgress[lessonId as keyof typeof lessonProgress];
}
