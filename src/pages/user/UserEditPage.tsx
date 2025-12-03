import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Separator } from '@/components/ui/Separator';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';

const profileSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  avatarUrl: z.string().url().optional().or(z.literal('')),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const UserEditPage = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (user) {
      setValue('email', user.email || '');
      setValue('fullName', user.user_metadata?.full_name || '');
      setValue('avatarUrl', user.user_metadata?.avatar_url || '');
    }
  }, [user, setValue]);

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: data.fullName,
          avatar_url: data.avatarUrl,
        },
      });

      if (error) throw error;
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-white">Profile</h3>
        <p className="text-sm text-neutral-400">
          Manage your account settings and preferences.
        </p>
      </div>
      <Separator className="bg-neutral-800" />

      <Card className="border-neutral-800 bg-neutral-900/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Personal Information</CardTitle>
          <CardDescription className="text-neutral-400">
            Update your personal details here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-neutral-200">
                  Email
                </Label>
                <Input
                  id="email"
                  disabled
                  className="border-neutral-800 bg-neutral-950 text-neutral-400"
                  {...register('email')}
                />
                <p className="text-[0.8rem] text-neutral-400">
                  Email cannot be changed.
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="fullName" className="text-neutral-200">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  className="border-neutral-800 bg-neutral-950 text-white focus:border-emerald-500"
                  {...register('fullName')}
                />
                {errors.fullName && (
                  <p className="text-[0.8rem] text-red-500">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="avatarUrl" className="text-neutral-200">
                  Avatar URL
                </Label>
                <Input
                  id="avatarUrl"
                  className="border-neutral-800 bg-neutral-950 text-white focus:border-emerald-500"
                  {...register('avatarUrl')}
                />
                {errors.avatarUrl && (
                  <p className="text-[0.8rem] text-red-500">
                    {errors.avatarUrl.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-emerald-600 text-white hover:bg-emerald-700"
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserEditPage;
