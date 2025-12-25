import CustomLogo from '@/components/custom-logo';
import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: LoginProps) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-white p-4">
            <Head title="Log in" />

            <div className="w-full max-w-[450px] space-y-8 rounded-sm bg-white p-10 shadow-[0_0_15px_rgba(0,0,0,0.1)] border border-gray-100">
                {/* Logo Section */}
                <div className="flex flex-col items-center">
                    <Link href={home()} className="flex flex-col items-center gap-2 font-medium">
                        <div className="flex h-16 w-16 items-center justify-center rounded-md">
                            <CustomLogo className="h-full w-full object-contain" />
                        </div>
                        <span className="sr-only">Home</span>
                    </Link>
                </div>

                {status && (
                    <div className="rounded-md bg-green-50 p-4 font-medium text-green-600 border border-green-200 text-sm text-center">
                        {status}
                    </div>
                )}

                <Form
                    {...store.form()}
                    resetOnSuccess={['password']}
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email" className="font-semibold text-gray-700">
                                        Login(Email ID)
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="email"
                                        className="h-11 rounded-none border-gray-200 bg-blue-50/50 px-4 focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500"
                                        placeholder="email@example.com"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password" className="font-semibold text-gray-700">
                                        Password
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        required
                                        tabIndex={2}
                                        autoComplete="current-password"
                                        className="h-11 rounded-none border-gray-200 bg-blue-50/50 px-4 focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="mt-2 flex items-center justify-between">
                                    <Button
                                        type="submit"
                                        className="h-11 min-w-[140px] rounded-sm bg-[#008080] text-base font-bold text-white hover:bg-[#006666] transition-colors"
                                        tabIndex={3}
                                        disabled={processing}
                                    >
                                        {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        LOGIN
                                    </Button>

                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="text-xs font-semibold text-slate-600 hover:text-slate-800 uppercase"
                                            tabIndex={4}
                                        >
                                            FORGOT PASSWORD?
                                        </TextLink>
                                    )}
                                </div>
                            </div>

                            {/* Hidden fields / Removed UI but keeping functional if needed in potential future */}
                            <input type="hidden" name="remember" value="on" />

                            {canRegister && (
                                <div className="mt-4 text-center text-sm text-gray-500">
                                    Don't have an account?{' '}
                                    <TextLink href={register()} tabIndex={5} className="font-semibold text-slate-600 hover:text-slate-800">
                                        Sign up
                                    </TextLink>
                                </div>
                            )}
                        </>
                    )}
                </Form>
            </div>
        </div>
    );
}
