import { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
    Plus, 
    Edit, 
    Trash2, 
    Eye, 
    Building2,
    GraduationCap,
    Briefcase,
    ChevronLeft,
    ChevronRight,
    Check
} from 'lucide-react';
import { type BreadcrumbItem } from '@/types';

interface Institucion {
    id: number;
    nombre: string;
    tipo: 'escuela' | 'universidad' | 'empresa' | 'colegio';
    usuarios_count: number;
    created_at: string;
    updated_at: string;
}

interface Props {
    instituciones: {
        data: Institucion[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    contadores: {
        total: number;
        empresas: number;
        universidades: number;
        colegios: number;
    };
    success?: string;
    error?: string;
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
];

const tipoIcons = {
    escuela: GraduationCap,
    universidad: Building2,
    empresa: Briefcase,
};

const tipoColors = {
    escuela: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    universidad: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    empresa: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
};

export default function InstitucionesIndex({ instituciones, contadores, success, error }: Props) {
    const [notificationVisible, setNotificationVisible] = useState(false);
    const [errorVisible, setErrorVisible] = useState(false);

    const getTipoIcon = (tipo: string) => {
        const IconComponent = tipoIcons[tipo as keyof typeof tipoIcons];
        return IconComponent ? <IconComponent className="w-4 h-4" /> : null;
    };

    const handlePageChange = (page: number) => {
        router.get('/instituciones', { page }, { preserveState: true });
    };

    useEffect(() => {
        if (success) {
            setNotificationVisible(true);
            const timer = setTimeout(() => setNotificationVisible(false), 6000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    useEffect(() => {
        if (error) {
            setErrorVisible(true);
            const timer = setTimeout(() => setErrorVisible(false), 6000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Instituciones" />
            
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                {/* Success Message */}
                {success && notificationVisible && (
                    <div className="p-4 bg-gray-300 border-2 border-black rounded-md text-black flex items-center gap-3">
                        <Check className="w-5 h-5 text-green-600" />
                        <span className="font-medium">{success}</span>
                    </div>
                )}

                {/* Error Message */}
                {error && errorVisible && (
                    <div className="p-4 bg-red-100 border-2 border-red-500 rounded-md text-red-700 flex items-center gap-3">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">{error}</span>
                    </div>
                )}

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Instituciones</h1>
                        <p className="text-muted-foreground">
                            Gestiona las instituciones del sistema
                        </p>
                    </div>
                    <Link href="/instituciones/create">
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Nueva Institución
                        </Button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Instituciones</CardTitle>
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{contadores.total}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Empresas</CardTitle>
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{contadores.empresas}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Universidades</CardTitle>
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{contadores.universidades}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Colegios</CardTitle>
                            <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{contadores.colegios}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Lista de Instituciones</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left p-2">Nombre</th>
                                        <th className="text-left p-2">Tipo</th>
                                        <th className="text-left p-2">Usuarios</th>
                                        <th className="text-left p-2">Fecha Creación</th>
                                        <th className="text-right p-2">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {instituciones.data.map((institucion) => (
                                        <tr key={institucion.id} className="border-b hover:bg-muted/50">
                                            <td className="p-2 font-medium">{institucion.nombre}</td>
                                            <td className="p-2">
                                                <Badge className={tipoColors[institucion.tipo]}>
                                                    <span className="flex items-center gap-1">
                                                        {getTipoIcon(institucion.tipo)}
                                                        {institucion.tipo}
                                                    </span>
                                                </Badge>
                                            </td>
                                            <td className="p-2">{institucion.usuarios_count}</td>
                                            <td className="p-2 text-sm text-muted-foreground">
                                                {new Date(institucion.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="p-2">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/instituciones/${institucion.id}`}>
                                                        <Button variant="outline" size="sm">
                                                            <Eye className="w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link href={`/instituciones/${institucion.id}/edit`}>
                                                        <Button variant="outline" size="sm">
                                                            <Edit className="w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link 
                                                        href={`/instituciones/${institucion.id}/eliminar`}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            if (confirm('¿Estás seguro de que quieres eliminar esta institución?')) {
                                                                const form = document.createElement('form');
                                                                form.method = 'POST';
                                                                form.action = `/instituciones/${institucion.id}/eliminar`;
                                                                
                                                                const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
                                                                if (csrfToken) {
                                                                    const csrfInput = document.createElement('input');
                                                                    csrfInput.type = 'hidden';
                                                                    csrfInput.name = '_token';
                                                                    csrfInput.value = csrfToken;
                                                                    form.appendChild(csrfInput);
                                                                }
                                                                
                                                                document.body.appendChild(form);
                                                                form.submit();
                                                            }
                                                        }}
                                                    >
                                                        <Button variant="outline" size="sm">
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {instituciones.data.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground">
                                No hay instituciones registradas
                            </div>
                        )}

                        {/* Paginación */}
                        {instituciones.last_page > 1 && (
                            <div className="flex items-center justify-between mt-6">
                                <div className="text-sm text-muted-foreground">
                                    Mostrando {instituciones.from} a {instituciones.to} de {instituciones.total} resultados
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handlePageChange(instituciones.current_page - 1)}
                                        disabled={instituciones.current_page === 1}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                        Anterior
                                    </Button>
                                    <div className="flex items-center space-x-1">
                                        {Array.from({ length: instituciones.last_page }, (_, i) => i + 1).map((page) => (
                                            <Button
                                                key={page}
                                                variant={page === instituciones.current_page ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => handlePageChange(page)}
                                                className="w-8 h-8 p-0"
                                            >
                                                {page}
                                            </Button>
                                        ))}
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handlePageChange(instituciones.current_page + 1)}
                                        disabled={instituciones.current_page === instituciones.last_page}
                                    >
                                        Siguiente
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
} 