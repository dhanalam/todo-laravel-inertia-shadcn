"use client";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm, usePage} from '@inertiajs/react';
import {Button} from "@/Components/ui/button";
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Textarea } from "@/Components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {Undo2} from "lucide-react";


export default function Create() {

    const { flash } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        completed: 0,
    })

    function submit(e) {
        e.preventDefault()
        post(route('todos.store'))
    }


    return (
        <AuthenticatedLayout
            breadcrumb={
                {
                    links: [
                        { href: '/dashboard', text: 'Home' },
                        { href: '/todos', text: 'Todos' },
                        { href: '/todos/create', text: 'Create' }
                    ],
                    action: {
                        link: '/todos',
                        text: 'Back',
                        icon: Undo2
                    }
                }
            }
        >
            <Head title="Todo Create"/>

            {flash.message && (
                <div class="alert">{flash.message}</div>
            )}

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <form onSubmit={submit}>

                            <div className="grid w-full max-w-sm items-center gap-1.5 mb-5">
                                <Label htmlFor="title">Title</Label>
                                <Input type={'text'}
                                       id="title"
                                       value={data.title}
                                       placeholder="Enter your title"
                                       onChange={e => setData('title', e.target.value)}
                                ></Input>
                                <div>{errors.title && <div>{errors.title}</div>}</div>
                            </div>

                            <div className="grid w-full max-w-sm items-center gap-1.5 mb-5">
                                <Label htmlFor="description">Description</Label>
                                <Textarea placeholder="Enter your description"
                                          value={data.description}
                                          id="description"
                                          onChange={e => setData('description', e.target.value)}
                                          rows={6}
                                ></Textarea>
                                <div>{errors.description && <div>{errors.description}</div>}</div>
                            </div>

                            <Switch
                                checked={data.completed}
                                onCheckedChange={value => setData('completed', value ? 1 : 0)}
                                aria-readonly
                            />

                            <div className={'mt-5'}>
                                <Button type="submit" disabled={processing}>Create</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
