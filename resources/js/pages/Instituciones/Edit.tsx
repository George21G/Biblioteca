import { useState } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';

interface Institucion {
    id: number;
    nombre: string;
    tipo: 'empresa' | 'universidad' | 'colegio';
}

interface Props {
    institucion: Institucion;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Instituciones',
        href: '/instituciones',
    },
    {
        title: 'Editar',
        href: '#',
    },
];

export default function InstitucionesEdit({ institucion }: Props) {
    // Obtener ID de la institución (con fallback a la URL)
    const getInstitucionIdFromUrl = () => {
        const pathParts = window.location.pathname.split('/');
        const idIndex = pathParts.indexOf('instituciones') + 1;
        return pathParts[idIndex];
    };

    const institucionId = institucion?.id || getInstitucionIdFromUrl();

    const { data, setData, put, processing, errors, reset } = useForm({
        nombre: institucion?.nombre || '',
        tipo: institucion?.tipo || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Usar POST con la ruta de actualización
        router.post(`/instituciones/${institucionId}/actualizar`, {
            nombre: data.nombre,
            tipo: data.tipo,
        }, {
            onSuccess: () => {
                reset();
            },
            onError: (errors) => {
                console.error('Error al actualizar:', errors);
            },
        });
    };

    const handleInputChange = (field: string, value: string) => {
        setData(field, value);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar Institución - ${institucion.nombre}`} />
            
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Editar Institución</h1>
                        <p className="text-muted-foreground">
                            Modifica la información de la institución
                        </p>
                    </div>
                    <Link href="/instituciones">
                        <Button variant="outline">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Volver
                        </Button>
                    </Link>
                </div>

                {/* Form */}
                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>Información de la Institución</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="nombre">Nombre de la Institución</Label>
                                <Input
                                    id="nombre"
                                    type="text"
                                    value={data.nombre}
                                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                                    placeholder="Ingrese el nombre de la institución"
                                    className={errors.nombre ? 'border-red-500' : ''}
                                />
                                {errors.nombre && (
                                    <p className="text-sm text-red-600">{errors.nombre}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="tipo">Tipo de Institución</Label>
                                <Select
                                    value={data.tipo}
                                    onValueChange={(value) => handleInputChange('tipo', value)}
                                >
                                    <SelectTrigger className={errors.tipo ? 'border-red-500' : ''}>
                                        <SelectValue placeholder="Seleccione el tipo de institución" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="empresa">Empresa</SelectItem>
                                        <SelectItem value="universidad">Universidad</SelectItem>
                                        <SelectItem value="colegio">Colegio</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.tipo && (
                                    <p className="text-sm text-red-600">{errors.tipo}</p>
                                )}
                            </div>

                            <div className="flex gap-2 pt-4">
                                <Button type="submit" disabled={processing}>
                                    <Save className="w-4 h-4 mr-2" />
                                    {processing ? 'Guardando...' : 'Actualizar Institución'}
                                </Button>
                                <Link href="/instituciones">
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