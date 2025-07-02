import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Save } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Libros',
        href: '/libros',
    },
    {
        title: 'Crear Libro',
        href: '/libros/create',
    },
];

export default function LibrosCreate() {
    const [formData, setFormData] = useState({
        titulo: '',
        autor: '',
        isbn: '',
        disponible: true,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        try {
            const response = await fetch('/libros', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                router.visit('/libros', {
                    onSuccess: () => {
                        // Mostrar mensaje de éxito
                        alert('Libro creado exitosamente');
                    },
                });
            } else {
                if (result.errors) {
                    setErrors(result.errors);
                } else {
                    setErrors({ general: result.message || 'Error al crear el libro' });
                }
            }
        } catch (error) {
            setErrors({ general: 'Error de conexión' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Libro" />
            
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Crear Nuevo Libro</h1>
                        <p className="text-muted-foreground">
                            Agrega un nuevo libro al catálogo
                        </p>
                    </div>
                    <Link href="/libros">
                        <Button variant="outline">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Volver
                        </Button>
                    </Link>
                </div>

                {/* Form */}
                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>Información del Libro</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {errors.general && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
                                    {errors.general}
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="titulo">Título del Libro</Label>
                                <Input
                                    id="titulo"
                                    type="text"
                                    value={formData.titulo}
                                    onChange={(e) => handleInputChange('titulo', e.target.value)}
                                    placeholder="Ingrese el título del libro"
                                    className={errors.titulo ? 'border-red-500' : ''}
                                />
                                {errors.titulo && (
                                    <p className="text-sm text-red-600">{errors.titulo}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="autor">Autor</Label>
                                <Input
                                    id="autor"
                                    type="text"
                                    value={formData.autor}
                                    onChange={(e) => handleInputChange('autor', e.target.value)}
                                    placeholder="Ingrese el nombre del autor"
                                    className={errors.autor ? 'border-red-500' : ''}
                                />
                                {errors.autor && (
                                    <p className="text-sm text-red-600">{errors.autor}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="isbn">ISBN</Label>
                                <Input
                                    id="isbn"
                                    type="text"
                                    value={formData.isbn}
                                    onChange={(e) => handleInputChange('isbn', e.target.value)}
                                    placeholder="Ingrese el ISBN del libro"
                                    className={errors.isbn ? 'border-red-500' : ''}
                                />
                                {errors.isbn && (
                                    <p className="text-sm text-red-600">{errors.isbn}</p>
                                )}
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="disponible"
                                    checked={formData.disponible}
                                    onCheckedChange={(checked) => handleInputChange('disponible', checked as boolean)}
                                />
                                <Label htmlFor="disponible">Disponible para préstamo</Label>
                            </div>

                            <div className="flex gap-2 pt-4">
                                <Button type="submit" disabled={isSubmitting}>
                                    <Save className="w-4 h-4 mr-2" />
                                    {isSubmitting ? 'Guardando...' : 'Guardar Libro'}
                                </Button>
                                <Link href="/libros">
                                    <Button type="button" variant="outline">
                                        Cancelar
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
} 