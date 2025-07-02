import { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
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
    tipo: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Usuarios',
        href: '/usuarios',
    },
    {
        title: 'Crear Usuario',
        href: '/usuarios/create',
    },
];

export default function UsuariosCreate() {
    const [formData, setFormData] = useState({
        nombre: '',
        documento: '',
        tipo: '',
        institucion_id: '',
    });
    const [instituciones, setInstituciones] = useState<Institucion[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingInstituciones, setIsLoadingInstituciones] = useState(true);

    useEffect(() => {
        // Cargar instituciones
        fetch('/api/instituciones')
            .then(response => response.json())
            .then(data => {
                setInstituciones(data.data || []);
                setIsLoadingInstituciones(false);
            })
            .catch(error => {
                console.error('Error cargando instituciones:', error);
                setIsLoadingInstituciones(false);
            });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        try {
            const response = await fetch('/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                router.visit('/usuarios', {
                    onSuccess: () => {
                        // Mostrar mensaje de éxito
                        alert('Usuario creado exitosamente');
                    },
                });
            } else {
                if (result.errors) {
                    setErrors(result.errors);
                } else {
                    setErrors({ general: result.message || 'Error al crear el usuario' });
                }
            }
        } catch (error) {
            setErrors({ general: 'Error de conexión' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Usuario" />
            
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Crear Nuevo Usuario</h1>
                        <p className="text-muted-foreground">
                            Agrega un nuevo usuario al sistema
                        </p>
                    </div>
                    <Link href="/usuarios">
                        <Button variant="outline">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Volver
                        </Button>
                    </Link>
                </div>

                {/* Form */}
                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>Información del Usuario</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {errors.general && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
                                    {errors.general}
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="nombre">Nombre Completo</Label>
                                <Input
                                    id="nombre"
                                    type="text"
                                    value={formData.nombre}
                                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                                    placeholder="Ingrese el nombre completo"
                                    className={errors.nombre ? 'border-red-500' : ''}
                                />
                                {errors.nombre && (
                                    <p className="text-sm text-red-600">{errors.nombre}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="documento">Número de Documento</Label>
                                <Input
                                    id="documento"
                                    type="text"
                                    value={formData.documento}
                                    onChange={(e) => handleInputChange('documento', e.target.value)}
                                    placeholder="Ingrese el número de documento"
                                    className={errors.documento ? 'border-red-500' : ''}
                                />
                                {errors.documento && (
                                    <p className="text-sm text-red-600">{errors.documento}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="tipo">Tipo de Usuario</Label>
                                <Select
                                    value={formData.tipo}
                                    onValueChange={(value) => handleInputChange('tipo', value)}
                                >
                                    <SelectTrigger className={errors.tipo ? 'border-red-500' : ''}>
                                        <SelectValue placeholder="Seleccione el tipo de usuario" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="natural">Persona Natural</SelectItem>
                                        <SelectItem value="estudiante">Estudiante</SelectItem>
                                        <SelectItem value="empresa">Empresa</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.tipo && (
                                    <p className="text-sm text-red-600">{errors.tipo}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="institucion_id">Institución</Label>
                                <Select
                                    value={formData.institucion_id}
                                    onValueChange={(value) => handleInputChange('institucion_id', value)}
                                    disabled={isLoadingInstituciones}
                                >
                                    <SelectTrigger className={errors.institucion_id ? 'border-red-500' : ''}>
                                        <SelectValue placeholder={isLoadingInstituciones ? "Cargando instituciones..." : "Seleccione una institución"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {instituciones.map((institucion) => (
                                            <SelectItem key={institucion.id} value={institucion.id.toString()}>
                                                {institucion.nombre} ({institucion.tipo})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.institucion_id && (
                                    <p className="text-sm text-red-600">{errors.institucion_id}</p>
                                )}
                            </div>

                            <div className="flex gap-2 pt-4">
                                <Button type="submit" disabled={isSubmitting || isLoadingInstituciones}>
                                    <Save className="w-4 h-4 mr-2" />
                                    {isSubmitting ? 'Guardando...' : 'Guardar Usuario'}
                                </Button>
                                <Link href="/usuarios">
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