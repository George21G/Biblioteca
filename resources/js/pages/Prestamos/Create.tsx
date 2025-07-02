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

interface Libro {
    id: number;
    titulo: string;
    autor: string;
    isbn: string;
    disponible: boolean;
}

interface Usuario {
    id: number;
    nombre: string;
    documento: string;
    tipo: string;
    institucion?: {
        id: number;
        nombre: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Préstamos',
        href: '/prestamos',
    },
    {
        title: 'Crear Préstamo',
        href: '/prestamos/create',
    },
];

export default function PrestamosCreate() {
    const [formData, setFormData] = useState({
        libro_id: '',
        usuario_id: '',
        fecha_prestamo: '',
        fecha_devolucion: '',
        costo: '',
    });
    const [libros, setLibros] = useState<Libro[]>([]);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingLibros, setIsLoadingLibros] = useState(true);
    const [isLoadingUsuarios, setIsLoadingUsuarios] = useState(true);

    useEffect(() => {
        // Cargar libros disponibles
        fetch('/api/libros?disponible=true')
            .then(response => response.json())
            .then(data => {
                setLibros(data.data || []);
                setIsLoadingLibros(false);
            })
            .catch(error => {
                console.error('Error cargando libros:', error);
                setIsLoadingLibros(false);
            });

        // Cargar usuarios
        fetch('/api/usuarios')
            .then(response => response.json())
            .then(data => {
                setUsuarios(data.data || []);
                setIsLoadingUsuarios(false);
            })
            .catch(error => {
                console.error('Error cargando usuarios:', error);
                setIsLoadingUsuarios(false);
            });

        // Establecer fecha de préstamo como hoy
        const today = new Date().toISOString().split('T')[0];
        setFormData(prev => ({ ...prev, fecha_prestamo: today }));

        // Establecer fecha de devolución como 15 días después
        const devolucion = new Date();
        devolucion.setDate(devolucion.getDate() + 15);
        setFormData(prev => ({ ...prev, fecha_devolucion: devolucion.toISOString().split('T')[0] }));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        try {
            const response = await fetch('/prestamos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({
                    ...formData,
                    costo: parseFloat(formData.costo),
                }),
            });

            const result = await response.json();

            if (response.ok) {
                router.visit('/prestamos', {
                    onSuccess: () => {
                        // Mostrar mensaje de éxito
                        alert('Préstamo creado exitosamente');
                    },
                });
            } else {
                if (result.errors) {
                    setErrors(result.errors);
                } else {
                    setErrors({ general: result.message || 'Error al crear el préstamo' });
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

    const calcularCosto = () => {
        const fechaPrestamo = new Date(formData.fecha_prestamo);
        const fechaDevolucion = new Date(formData.fecha_devolucion);
        const dias = Math.ceil((fechaDevolucion.getTime() - fechaPrestamo.getTime()) / (1000 * 60 * 60 * 24));
        const costoPorDia = 1000; // $1000 por día
        return dias * costoPorDia;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Préstamo" />
            
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Crear Nuevo Préstamo</h1>
                        <p className="text-muted-foreground">
                            Registra un nuevo préstamo de libro
                        </p>
                    </div>
                    <Link href="/prestamos">
                        <Button variant="outline">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Volver
                        </Button>
                    </Link>
                </div>

                {/* Form */}
                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>Información del Préstamo</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {errors.general && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
                                    {errors.general}
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="libro_id">Libro</Label>
                                <Select
                                    value={formData.libro_id}
                                    onValueChange={(value) => handleInputChange('libro_id', value)}
                                    disabled={isLoadingLibros}
                                >
                                    <SelectTrigger className={errors.libro_id ? 'border-red-500' : ''}>
                                        <SelectValue placeholder={isLoadingLibros ? "Cargando libros..." : "Seleccione un libro"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {libros.map((libro) => (
                                            <SelectItem key={libro.id} value={libro.id.toString()}>
                                                {libro.titulo} - {libro.autor} (ISBN: {libro.isbn})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.libro_id && (
                                    <p className="text-sm text-red-600">{errors.libro_id}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="usuario_id">Usuario</Label>
                                <Select
                                    value={formData.usuario_id}
                                    onValueChange={(value) => handleInputChange('usuario_id', value)}
                                    disabled={isLoadingUsuarios}
                                >
                                    <SelectTrigger className={errors.usuario_id ? 'border-red-500' : ''}>
                                        <SelectValue placeholder={isLoadingUsuarios ? "Cargando usuarios..." : "Seleccione un usuario"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {usuarios.map((usuario) => (
                                            <SelectItem key={usuario.id} value={usuario.id.toString()}>
                                                {usuario.nombre} - {usuario.documento} 
                                                {usuario.institucion && ` (${usuario.institucion.nombre})`}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.usuario_id && (
                                    <p className="text-sm text-red-600">{errors.usuario_id}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="fecha_prestamo">Fecha de Préstamo</Label>
                                    <Input
                                        id="fecha_prestamo"
                                        type="date"
                                        value={formData.fecha_prestamo}
                                        onChange={(e) => handleInputChange('fecha_prestamo', e.target.value)}
                                        className={errors.fecha_prestamo ? 'border-red-500' : ''}
                                    />
                                    {errors.fecha_prestamo && (
                                        <p className="text-sm text-red-600">{errors.fecha_prestamo}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="fecha_devolucion">Fecha de Devolución</Label>
                                    <Input
                                        id="fecha_devolucion"
                                        type="date"
                                        value={formData.fecha_devolucion}
                                        onChange={(e) => handleInputChange('fecha_devolucion', e.target.value)}
                                        className={errors.fecha_devolucion ? 'border-red-500' : ''}
                                    />
                                    {errors.fecha_devolucion && (
                                        <p className="text-sm text-red-600">{errors.fecha_devolucion}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="costo">Costo del Préstamo (COP)</Label>
                                <Input
                                    id="costo"
                                    type="number"
                                    value={formData.costo}
                                    onChange={(e) => handleInputChange('costo', e.target.value)}
                                    placeholder="Ingrese el costo del préstamo"
                                    className={errors.costo ? 'border-red-500' : ''}
                                />
                                <p className="text-sm text-muted-foreground">
                                    Costo sugerido: ${calcularCosto().toLocaleString()} COP
                                </p>
                                {errors.costo && (
                                    <p className="text-sm text-red-600">{errors.costo}</p>
                                )}
                            </div>

                            <div className="flex gap-2 pt-4">
                                <Button type="submit" disabled={isSubmitting || isLoadingLibros || isLoadingUsuarios}>
                                    <Save className="w-4 h-4 mr-2" />
                                    {isSubmitting ? 'Guardando...' : 'Guardar Préstamo'}
                                </Button>
                                <Link href="/prestamos">
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