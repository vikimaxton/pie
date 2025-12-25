import { login } from '@/routes';
import { home } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head, Link } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';

import CustomLogo from '@/components/custom-logo';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Register() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-white p-4">
            <Head title="Create an account" />

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
                    Create a new account
                </div>

                <Form
                    {...store.form()}
                    resetOnSuccess={['password', 'password_confirmation']}
                    disableWhileProcessing
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name" className="font-semibold text-gray-700">Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="name"
                                        name="name"
                                        className="h-11 rounded-none border-gray-200 bg-blue-50/50 px-4 focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500"
                                        placeholder="Full name"
                                    />
                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email" className="font-semibold text-gray-700">Email address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        tabIndex={2}
                                        autoComplete="email"
                                        name="email"
                                        className="h-11 rounded-none border-gray-200 bg-blue-50/50 px-4 focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500"
                                        placeholder="email@example.com"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password" className="font-semibold text-gray-700">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        tabIndex={3}
                                        autoComplete="new-password"
                                        name="password"
                                        className="h-11 rounded-none border-gray-200 bg-blue-50/50 px-4 focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500"
                                        placeholder="Password"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation" className="font-semibold text-gray-700">
                                        Confirm password
                                    </Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        required
                                        tabIndex={4}
                                        autoComplete="new-password"
                                        name="password_confirmation"
                                        className="h-11 rounded-none border-gray-200 bg-blue-50/50 px-4 focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500"
                                        placeholder="Confirm password"
                                    />
                                    <InputError
                                        message={errors.password_confirmation}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="mt-2 h-11 w-full rounded-sm bg-[#008080] text-base font-bold text-white hover:bg-[#006666] transition-colors"
                                    tabIndex={5}
                                    data-test="register-user-button"
                                    disabled={processing}
                                >
                                    {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    REGISTER
                                </Button>
                            </div>

                            <div className="text-center text-sm text-gray-500">
                                Already have an account?{' '}
                                <TextLink href={login()} tabIndex={6} className="font-semibold text-slate-600 hover:text-slate-800">
                                    Log in
                                </TextLink>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </div>
    );
}
