'use client';

import { ReactNode, useState } from 'react';
import { FieldError, useForm } from 'react-hook-form';

function FormRow({
    label,
    children,
    error,
}: {
    name: string;
    label: string;
    error?: FieldError;
    children: ReactNode;
}) {
    return (
        <div className="w-full">
            <div className="flex gap-4 items-center">
                <label className="w-32">{label}</label>
                <div className="flex-grow">{children}</div>
            </div>
            {error && (
                <p className="text-red-600 text-sm text-right pt-1">
                    {error.message}
                </p>
            )}
        </div>
    );
}

interface Input {
    name: string;
    email: string;
    adult: boolean;
    beverage: string;
}

export default function Signup() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Input>({
        defaultValues: { beverage: '' },
    });

    const [serverError, setServerError] = useState('');

    console.log(errors);

    async function onSubmit(data: Input) {
        console.log('Posting:', data);
        const resp = await fetch('/api/signup', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json' },
        });

        if (resp.status !== 201) {
            setServerError(await resp.text());
        } else {
            alert('Thank you for signing up!');
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className="container max-w-lg items-center justify-center font-mono flex flex-col">
                <h1 className="text-3xl font-semibold mb-16">
                    🎉 Join the Party 🥳
                </h1>
                <form
                    className="flex flex-col w-full text-lg gap-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <FormRow name="name" label="Name" error={errors.name}>
                        <input
                            type="text"
                            placeholder="You name"
                            className={`input input-bordered w-full ${
                                errors.name ? 'input-error' : ''
                            }`}
                            {...register('name', {
                                required: true,
                            })}
                        />
                    </FormRow>

                    <FormRow name="email" label="Email" error={errors.email}>
                        <input
                            type="email"
                            placeholder="You email"
                            className={`input input-bordered w-full ${
                                errors.email ? 'input-error' : ''
                            }`}
                            {...register('email', { required: true })}
                        />
                    </FormRow>

                    <FormRow name="adult" label="Adult" error={errors.adult}>
                        <input
                            type="checkbox"
                            className="toggle"
                            {...register('adult')}
                        />
                    </FormRow>

                    <FormRow
                        name="beverage"
                        label="Beverage"
                        error={errors.beverage}
                    >
                        <select
                            className={`select w-full ${
                                errors.beverage ? 'input-error' : ''
                            }`}
                            {...register('beverage', { required: true })}
                        >
                            <option disabled value="">
                                Choose a beverage
                            </option>
                            <option value="SODA">Soda</option>
                            <option value="COFFEE">Coffee</option>
                            <option value="BEER">Beer</option>
                            <option value="COCKTAIL">Cocktail</option>
                        </select>
                    </FormRow>

                    <input className="btn btn-outline" type="submit" />

                    {serverError && (
                        <p className="text-red-600 text-sm">{serverError}</p>
                    )}
                </form>
            </div>
        </main>
    );
}
