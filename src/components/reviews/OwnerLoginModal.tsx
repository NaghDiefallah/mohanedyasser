import { useState } from 'react';
import { X, Lock } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface OwnerLoginModalProps {
  open: boolean;
  onClose: () => void;
  onLoggedIn: () => void;
}

const OwnerLoginModal = ({ open, onClose, onLoggedIn }: OwnerLoginModalProps) => {
  const { theme } = useTheme();
  const { isRTL } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) throw error;
      onLoggedIn();
      onClose();
      toast({
        title: isRTL ? 'تم تسجيل الدخول' : 'Logged in',
        description: isRTL ? 'مرحباً بك!' : 'Welcome back!',
      });
    } catch {
      toast({
        title: isRTL ? 'خطأ' : 'Error',
        description: isRTL ? 'بيانات الدخول غير صحيحة.' : 'Invalid credentials.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const overlayBg = 'hsl(0 0% 0% / 0.6)';
  const modalBg = theme === 'light' ? 'hsl(210 20% 97%)' : 'hsl(220 30% 10%)';
  const modalBorder = theme === 'light'
    ? '1px solid hsl(214 20% 85%)'
    : '1px solid hsl(195 100% 40% / 0.2)';
  const inputBg = theme === 'light' ? 'hsl(210 20% 94%)' : 'hsl(220 25% 12%)';
  const inputBorder = theme === 'light'
    ? '1px solid hsl(214 20% 82%)'
    : '1px solid hsl(220 20% 20%)';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: overlayBg }}
      onClick={onClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleLogin}
        className="w-full max-w-sm rounded-2xl p-6 space-y-5 backdrop-blur-xl"
        style={{ background: modalBg, border: modalBorder }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-foreground">
            <Lock size={16} className="text-primary" />
            <span className="text-sm font-semibold">
              {isRTL ? 'دخول المالك' : 'Owner Login'}
            </span>
          </div>
          <button type="button" onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={16} />
          </button>
        </div>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={isRTL ? 'البريد الإلكتروني' : 'Email'}
          required
          className="w-full px-4 py-2.5 rounded-lg text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-1 focus:ring-primary/40"
          style={{ background: inputBg, border: inputBorder }}
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={isRTL ? 'كلمة المرور' : 'Password'}
          required
          className="w-full px-4 py-2.5 rounded-lg text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-1 focus:ring-primary/40"
          style={{ background: inputBg, border: inputBorder }}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:brightness-110 disabled:opacity-40 transition-all"
        >
          {loading ? '...' : (isRTL ? 'دخول' : 'Sign In')}
        </button>
      </form>
    </div>
  );
};

export default OwnerLoginModal;
