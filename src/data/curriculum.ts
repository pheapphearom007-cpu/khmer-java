import { CurriculumModule, Lesson } from '../types';
import { MODULE_1_SETUP } from './lessons/module1_setup';
import { MODULE_2_SYNTAX_VARIABLES_IO } from './lessons/module2_syntax_variables_io';
import { MODULE_3_CONTROL_LOOPS_METHODS } from './lessons/module3_control_loops_methods';
import { MODULE_4_CLASSES_OOP } from './lessons/module4_classes_oop';
import { MODULE_5_INHERITANCE_INTERFACES } from './lessons/module5_inheritance_interfaces';
import { MODULE_6_EXCEPTIONS_COLLECTIONS } from './lessons/module6_exceptions_collections';
import { MODULE_7_LAMBDAS_CONCURRENCY } from './lessons/module7_lambdas_concurrency';
import { MODULE_8_PROJECTS_DEBUGGING } from './lessons/module8_projects_debugging';

export const CURRICULUM_MODULES: CurriculumModule[] = [
  MODULE_1_SETUP,
  MODULE_2_SYNTAX_VARIABLES_IO,
  MODULE_3_CONTROL_LOOPS_METHODS,
  MODULE_4_CLASSES_OOP,
  MODULE_5_INHERITANCE_INTERFACES,
  MODULE_6_EXCEPTIONS_COLLECTIONS,
  MODULE_7_LAMBDAS_CONCURRENCY,
  MODULE_8_PROJECTS_DEBUGGING,
];

export const ALL_LESSONS: Lesson[] = CURRICULUM_MODULES.flatMap((mod) => mod.lessons);

export function findLessonBySlug(slug: string): Lesson | undefined {
  return ALL_LESSONS.find((l) => l.slug === slug);
}

export function findModuleByLessonSlug(lessonSlug: string): CurriculumModule | undefined {
  return CURRICULUM_MODULES.find((mod) => mod.lessons.some((l) => l.slug === lessonSlug));
}

export function getAdjacentLessons(currentSlug: string): { prevLesson?: Lesson; nextLesson?: Lesson } {
  const index = ALL_LESSONS.findIndex((l) => l.slug === currentSlug);
  if (index === -1) return {};
  return {
    prevLesson: index > 0 ? ALL_LESSONS[index - 1] : undefined,
    nextLesson: index < ALL_LESSONS.length - 1 ? ALL_LESSONS[index + 1] : undefined,
  };
}
