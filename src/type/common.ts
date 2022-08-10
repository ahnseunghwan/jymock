export type SelectMenuType =
  | 'STUDENT_1'
  | 'STUDENT_2'
  | 'STUDENT_3'
  | 'ATTENDENCE_1'
  | 'ATTENDENCE_2'
  | 'ATTENDENCE_3'
  | 'LEARNING_MATERIAL_1'
  | 'LEARNING_MATERIAL_2'
  | 'TOEIC_EXAM_1'
  | 'TOEIC_EXAM_2'
  | 'EXAM_1'
  | 'EXAM_2'
  | 'SCORE_1'
  | 'SCORE_2'
  | 'ASSIGNMENT_1'
  | 'ASSIGNMENT_2'
  | 'CONSULT_LOG_1'
  | 'CONSULT_LOG_2';

export type LearningMaterialAudioType = {
  audio: string;
  title: string;
  page: number;
};

export type LearningMaterialType = {
  id: string;
  title: string;
  audio_list: LearningMaterialAudioType[];
  description: string;
  thumbnail: string;
};
