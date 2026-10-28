import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { isSupabaseConfigured, supabase } from '../services/supabaseClient';
import {
  Coffee,
  Lock,
  Mail,
  User,
  ArrowRight,
  Database,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  Eye,
  EyeOff,
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

export const AuthPage: React.FC = () => {
  const { t } = useLanguage();
  const { signIn, signUp, resetPassword, updatePassword, useGuestMode } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<'signin' | 'signup' | 'reset' | 'update-password'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Detect recovery links, auth state changes, and URL hash errors (e.g. expired OTP tokens)
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const rawHash = window.location.hash.startsWith('#')
      ? window.location.hash.substring(1)
      : window.location.hash;
    const hashParams = new URLSearchParams(rawHash);

    // 1. Check for error parameters in hash or search (e.g. otp_expired, access_denied)
    const errCode = hashParams.get('error_code') || searchParams.get('error_code');
    const errDesc = hashParams.get('error_description') || searchParams.get('error_description');
    const err = hashParams.get('error') || searchParams.get('error');

    if (err || errCode || errDesc) {
      let desc = errDesc ? decodeURIComponent(errDesc.replace(/\+/g, ' ')) : '';
      if (errCode === 'otp_expired' || desc.toLowerCase().includes('expired') || desc.toLowerCase().includes('invalid')) {
        setErrorMsg(
          t(
            'តំណភ្ជាប់កំណត់ពាក្យសម្ងាត់បានផុតកំណត់ ឬត្រូវបានប្រើរួចហើយ (Email link is invalid or has expired)។ សូមបញ្ចូលអ៊ីមែលរបស់អ្នកដើម្បីស្នើសុំតំណភ្ជាប់ថ្មី។',
            'Password reset link is invalid or has expired. Please enter your email below to request a fresh reset link.'
          )
        );
      } else {
        setErrorMsg(desc || err || 'ប្រតិបត្តិការកំណត់ពាក្យសម្ងាត់មិនជោគជ័យ');
      }
      setMode('reset');

      // Clear sensitive error hash from browser URL without reloading
      if (window.history.replaceState) {
        window.history.replaceState(null, '', window.location.pathname);
      }
      return;
    }

    // 2. Check for recovery mode in URL search or hash
    const type = searchParams.get('type') || hashParams.get('type');
    if (type === 'recovery') {
      setMode('update-password');
    }

    // 3. Listen for Supabase PASSWORD_RECOVERY event
    if (supabase) {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event) => {
        if (event === 'PASSWORD_RECOVERY') {
          setMode('update-password');
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [t]);

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
            'តំណភ្ជាប់សម្រាប់កំណត់ពាក្យសម្ងាត់ឡើងវិញត្រូវបានផ្ញើទៅកាន់អ៊ីមែលរបស់អ្នករួចរាល់។ សូមពិនិត្យមើលប្រអប់សំបុត្រ (Inbox ឬ Spam) របស់អ្នក។',
            'Password reset link sent to your email! Please check your inbox or spam folder.'
          )
        );
      } else if (mode === 'update-password') {
        if (!newPassword) {
          throw new Error(t('សូមបញ្ចូលពាក្យសម្ងាត់ថ្មី។', 'Please enter a new password.'));
        }
        if (newPassword.length < 6) {
          throw new Error(
            t(
              'ពាក្យសម្ងាត់ត្រូវតែមានយ៉ាងតិច ៦ តួអក្សរ។',
              'Password must be at least 6 characters long.'
            )
          );
        }
        if (newPassword !== confirmPassword) {
          throw new Error(
            t(
              'ពាក្យសម្ងាត់ទាំងពីរមិនត្រូវគ្នាទេ។ សូមពិនិត្យមើលម្តងទៀត។',
              'Passwords do not match. Please verify.'
            )
          );
        }

        const { error } = await updatePassword(newPassword);
        if (error) throw error;

        setSuccessMsg(
          t(
            'ផ្លាស់ប្តូរពាក្យសម្ងាត់បានជោគជ័យ! កំពុងបញ្ជូនទៅកាន់ Dashboard...',
            'Password updated successfully! Redirecting to Dashboard...'
          )
        );

        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
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
            {mode === 'update-password' ? <KeyRound className="w-6 h-6" /> : <Coffee className="w-6 h-6" />}
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            {mode === 'signin' && t('ចូលគណនី Khmer Java Academy', 'Sign In to Khmer Java Academy')}
            {mode === 'signup' && t('ចុះឈ្មោះគណនីថ្មី', 'Create Student Account')}
            {mode === 'reset' && t('កំណត់ពាក្យសម្ងាត់ឡើងវិញ', 'Reset Password')}
            {mode === 'update-password' && t('កំណត់ពាក្យសម្ងាត់ថ្មី', 'Set New Password')}
          </h2>
          <p className="text-xs text-slate-500">
            {mode === 'signin' && t('ចូលដើម្បីរក្សាទុកវឌ្ឍនភាព និងពិន្ទុឆ្លងឧបករណ៍', 'Sign in to sync your progress across devices')}
            {mode === 'signup' && t('ចាប់ផ្តើមដំណើររៀន Java របស់អ្នកឥឡូវនេះ', 'Join thousands of learners in Cambodia')}
            {mode === 'reset' && t('បញ្ចូលអ៊ីមែលដើម្បីទទួលតំណភ្ជាប់ផ្លាស់ប្តូរពាក្យសម្ងាត់', 'Enter your email to receive a password reset link')}
            {mode === 'update-password' && t('សូមបញ្ចូលពាក្យសម្ងាត់ថ្មីយ៉ាងតិច ៦ តួអក្សរសម្រាប់គណនីរបស់អ្នក', 'Enter your new password (min. 6 characters) to secure your account')}
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
            <span className="leading-relaxed">{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div role="alert" aria-live="assertive" className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
            <span className="leading-relaxed">{successMsg}</span>
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

          {mode !== 'update-password' && (
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
          )}

          {/* Password field for signin / signup */}
          {(mode === 'signin' || mode === 'signup') && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="auth-password" className="font-medium text-slate-700 dark:text-slate-300">
                  {t('ពាក្យសម្ងាត់ (Password)', 'Password')}
                </label>
                {mode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => {
                      setErrorMsg('');
                      setSuccessMsg('');
                      setMode('reset');
                    }}
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
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2 min-h-[44px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-rose-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? t('លាក់ពាក្យសម្ងាត់', 'Hide password') : t('បង្ហាញពាក្យសម្ងាត់', 'Show password')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {/* New Password fields for update-password */}
          {mode === 'update-password' && (
            <>
              <div>
                <label htmlFor="auth-new-password" className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t('ពាក្យសម្ងាត់ថ្មី (New Password)', 'New Password')}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                  <input
                    id="auth-new-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="•••••••• (យ៉ាងតិច ៦ តួអក្សរ)"
                    className="w-full pl-9 pr-10 py-2 min-h-[44px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-rose-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? t('លាក់ពាក្យសម្ងាត់', 'Hide password') : t('បង្ហាញពាក្យសម្ងាត់', 'Show password')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="auth-confirm-password" className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t('បញ្ជាក់ពាក្យសម្ងាត់ថ្មី (Confirm New Password)', 'Confirm New Password')}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                  <input
                    id="auth-confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-10 py-2 min-h-[44px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>
            </>
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
              : mode === 'reset'
              ? t('ផ្ញើតំណភ្ជាប់ Reset', 'Send Reset Link')
              : t('រក្សាទុកពាក្យសម្ងាត់ថ្មី', 'Save New Password')}
          </Button>
        </form>

        {/* Guest Mode Divider (Only in signin/signup/reset modes) */}
        {mode !== 'update-password' && (
          <>
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
          </>
        )}

        {/* Toggle Mode Footer */}
        <div className="text-center text-xs text-slate-500 pt-2">
          {mode === 'signin' && (
            <span>
              {t('មិនទាន់មានគណនីនៅឡើយ? ', "Don't have an account? ")}
              <button
                type="button"
                onClick={() => {
                  setErrorMsg('');
                  setSuccessMsg('');
                  setMode('signup');
                }}
                className="font-bold text-rose-600 dark:text-rose-400 hover:underline"
              >
                {t('ចុះឈ្មោះឥឡូវនេះ', 'Sign Up')}
              </button>
            </span>
          )}

          {mode === 'signup' && (
            <span>
              {t('មានគណនីរួចហើយ? ', 'Already have an account? ')}
              <button
                type="button"
                onClick={() => {
                  setErrorMsg('');
                  setSuccessMsg('');
                  setMode('signin');
                }}
                className="font-bold text-rose-600 dark:text-rose-400 hover:underline"
              >
                {t('ចូលគណនី', 'Sign In')}
              </button>
            </span>
          )}

          {(mode === 'reset' || mode === 'update-password') && (
            <span>
              <button
                type="button"
                onClick={() => {
                  setErrorMsg('');
                  setSuccessMsg('');
                  setMode('signin');
                }}
                className="font-bold text-rose-600 dark:text-rose-400 hover:underline inline-flex items-center gap-1"
              >
                ← {t('ត្រឡប់ទៅទំព័រចូលគណនី', 'Back to Sign In')}
              </button>
            </span>
          )}
        </div>
      </Card>
    </div>
  );
};
