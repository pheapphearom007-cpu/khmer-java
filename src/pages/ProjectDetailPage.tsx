import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { GUIDED_PROJECTS } from '../data/projects';
import { ProjectWorkspace } from '../components/project/ProjectWorkspace';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/common/Button';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();

  const project = GUIDED_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          {t('រកមិនឃើញគម្រោងនេះឡើយ', 'Project Not Found')}
        </h2>
        <p className="text-slate-500 text-sm">
          {t('សូមត្រួតពិនិត្យតំណភ្ជាប់ ឬត្រឡប់ទៅកាន់ទំព័រគម្រោងទាំងអស់។', 'Please check the URL or view all available projects.')}
        </p>
        <Link to="/projects">
          <Button variant="primary" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            {t('ត្រឡប់ទៅកាន់គម្រោងទាំងអស់', 'Back to Projects')}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Link to="/projects">
        <Button variant="ghost" size="xs" leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}>
          {t('ត្រឡប់ទៅកាន់គម្រោងទាំងអស់', 'Back to All Projects')}
        </Button>
      </Link>

      <ProjectWorkspace project={project} />
    </div>
  );
};
