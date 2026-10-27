import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { isSupabaseConfigured } from '../services/supabaseClient';
import { Coffee, Lock, Mail, User, ArrowRight, Database, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

export const AuthPage: React.FC = () => {
  const { t } = useLanguage();
  const { signIn, signUp, resetPassword, useGuestMode } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<'signin' | 'signup' | 'reset'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (mode === 'signin') {
        const { error } = await signIn(email, password);
        if (error) throw error;
        navigate('/dashboard');
      } else if (mode === 'signup') {
        const { error } = await signUp(email, password, displayName);
        if (error) throw error;
        setSuccessMsg(
          t(
            'បង្កើតគណនីជោគជ័យ! សូមពិនិត្យមើលអ៊ីមែលរបស់អ្នកដើម្បីបញ្ជាក់ (ប្រសិនបើបានបើក Email Confirmation)។',
            'Account created! Check your email to verify.'
          )
        );
        if (!isSupabaseConfigured) {
          navigate('/dashboard');
        }
      } else if (mode === 'reset') {
        const { error } = await resetPassword(email);
        if (error) throw error;
        setSuccessMsg(
          t(
            'តំណភ្ជាប់សម្រាប់កំណត់ពាក្យសម្ងាត់ឡើងវិញត្រូវបានផ្ញើទៅកាន់អ៊ីមែលរបស់អ្នករួចរាល់។',
            'Password reset link sent to your email.'
          )
        );
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'ប្រតិបត្តិការបរាជ័យ');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    useGuestMode();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <Card className="max-w-md w-full p-6 sm:p-8 space-y-6 shadow-xl">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center mx-auto shadow-sm">
            <Coffee className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            {mode === 'signin' && t('ចូលគណនី Khmer Java Academy', 'Sign In to Khmer Java Academy')}
            {mode === 'signup' && t('ចុះឈ្មោះគណនីថ្មី', 'Create Student Account')}
            {mode === 'reset' && t('កំណត់ពាក្យសម្ងាត់ឡើងវិញ', 'Reset Password')}
          </h2>
          <p className="text-xs text-slate-500">
            {mode === 'signin' && t('ចូលដើម្បីរក្សាទុកវឌ្ឍនភាព និងពិន្ទុឆ្លងឧបករណ៍', 'Sign in to sync your progress across devices')}
            {mode === 'signup' && t('ចាប់ផ្តើមដំណើររៀន Java របស់អ្នកឥឡូវនេះ', 'Join thousands of learners in Cambodia')}
            {mode === 'reset' && t('បញ្ចូលអ៊ីមែលដើម្បីទទួលតំណភ្ជាប់ផ្លាស់ប្តូរពាក្យសម្ងាត់', 'Enter your email to receive a password reset link')}
          </p>
        </div>

        {/* Database Sync Status Notice */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs flex items-center gap-2 text-slate-600 dark:text-slate-300">
          <Database className={`w-4 h-4 shrink-0 ${isSupabaseConfigured ? 'text-emerald-500' : 'text-amber-500'}`} />
          <span>
            {isSupabaseConfigured
              ? t('Supabase Cloud Database ត្រូវបានកំណត់រួចរាល់។', 'Supabase Cloud Database is configured and active.')
              : t('ប្រព័ន្ធដំណើរការក្នុង Local Mode (ទិន្នន័យរក្សាទុកក្នុង Browser)។', 'Running in Local Mode (progress saved in browser).')}
          </span>
        </div>

        {/* Alerts */}
        {errorMsg && (
          <div role="alert" aria-live="assertive" className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div role="alert" aria-live="assertive" className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          {mode === 'signup' && (
            <div>
              <label htmlFor="auth-fullname" className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t('ឈ្មោះពេញ (Full Name)', 'Full Name')}
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <input
                  id="auth-fullname"
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="សុខ ចាន់ធា"
                  className="w-full pl-9 pr-3 py-2 min-h-[44px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="auth-email" className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
              {t('អ៊ីមែល (Email)', 'Email Address')}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input
                id="auth-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@example.com"
                className="w-full pl-9 pr-3 py-2 min-h-[44px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          {mode !== 'reset' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="auth-password" className="font-medium text-slate-700 dark:text-slate-300">
                  {t('ពាក្យសម្ងាត់ (Password)', 'Password')}
                </label>
                {mode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => setMode('reset')}
                    className="text-[11px] text-rose-600 hover:underline min-h-[36px] flex items-center"
                  >
                    {t('ភ្លេចពាក្យសម្ងាត់?', 'Forgot password?')}
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <input
                  id="auth-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 min-h-[44px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="md"
            fullWidth
            isLoading={loading}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="min-h-[44px]"
          >
            {mode === 'signin'
              ? t('ចូលគណនី', 'Sign In')
              : mode === 'signup'
              ? t('ចុះឈ្មោះឥឡូវនេះ', 'Create Account')
              : t('ផ្ញើតំណភ្ជាប់ Reset', 'Send Reset Link')}
          </Button>
        </form>

        {/* Guest Mode Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-slate-900 px-2 text-slate-400">
              {t('ឬ (Or)', 'Or')}
            </span>
          </div>
        </div>

        <Button
          variant="secondary"
          size="md"
          fullWidth
          onClick={handleGuestLogin}
          leftIcon={<User className="w-4 h-4 text-slate-500" />}
        >
          {t('ប្រើប្រាស់ជាភ្ញៀវភ្លាមៗ (Continue as Guest)', 'Continue as Guest (No Login)')}
        </Button>

        {/* Toggle Mode */}
        <div className="text-center text-xs text-slate-500 pt-2">
          {mode === 'signin' ? (
            <span>
              {t('មិនទាន់មានគណនីនៅឡើយ? ', "Don't have an account? ")}
              <button
                onClick={() => setMode('signup')}
                className="font-bold text-rose-600 dark:text-rose-400 hover:underline"
              >
                {t('ចុះឈ្មោះឥឡូវនេះ', 'Sign Up')}
              </button>
            </span>
          ) : (
            <span>
              {t('មានគណនីរួចហើយ? ', 'Already have an account? ')}
              <button
                onClick={() => setMode('signin')}
                className="font-bold text-rose-600 dark:text-rose-400 hover:underline"
              >
                {t('ចូលគណនី', 'Sign In')}
              </button>
            </span>
          )}
        </div>
      </Card>
    </div>
  );
};
