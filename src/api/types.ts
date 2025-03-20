// QSK-Light Kursdefinitionen
export interface QSKModule {
  id: number;
  title: string;
  description: string;
  lessons: number;
  duration: number; // in Minuten
  image: string;
}

export interface QSKSection {
  id: number;
  moduleId: number;
  title: string;
  duration: number; // in Minuten
  lessons: QSKLesson[];
}

export interface QSKLesson {
  id: number;
  sectionId: number;
  title: string;
  description?: string;
  duration: number; // in Minuten
  pages: number;
  type: 'video' | 'exercise' | 'text';
  status: 'completed' | 'in-progress' | 'locked';
  embedCode?: string; // Vimeo Embed-Code
  videoId?: string; // Vimeo-ID, falls vorhanden
  exerciseId?: number; // Übungs-ID, falls vorhanden
}
