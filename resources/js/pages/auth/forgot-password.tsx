import { login } from '@/routes';
import { home } from '@/routes';
import { email } from '@/routes/password';
import { Form, Head, Link } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';

import CustomLogo from '@/components/custom-logo';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-white p-4">
            <Head title="Forgot password" />

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

                <div className="text-center text-sm text-gray-600">
                    Enter your email to receive a password reset link
                </div>

                {status && (
                    <div className="rounded-md bg-green-50 p-4 font-medium text-green-600 border border-green-200 text-sm text-center">
                        {status}
                    </div>
                )}

                <div className="space-y-6">
                    <Form {...email.form()}>
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-2">
                                    <Label htmlFor="email" className="font-semibold text-gray-700">Email address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        autoComplete="off"
                                        autoFocus
                                        placeholder="email@example.com"
                                        className="h-11 rounded-none border-gray-200 bg-blue-50/50 px-4 focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500"
                                    />

                                    <InputError message={errors.email} />
                                </div>

                                <div className="my-6 flex items-center justify-start">
                                    <Button
                                        className="h-11 w-full rounded-sm bg-[#008080] text-base font-bold text-white hover:bg-[#006666] transition-colors"
                                        disabled={processing}
                                        data-test="email-password-reset-link-button"
                                    >
                                        {processing && (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        EMAIL PASSWORD RESET LINK
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form>

                    <div className="space-x-1 text-center text-sm text-gray-500">
                        <span>Or, return to</span>
                        <TextLink href={login()} className="font-semibold text-slate-600 hover:text-slate-800">log in</TextLink>
                    </div>
                </div>
            </div>
        </div>
    );
}
