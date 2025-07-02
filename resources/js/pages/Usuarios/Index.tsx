import { useState } from 'react';
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
    Users,
    User,
    Briefcase,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { type BreadcrumbItem } from '@/types';

interface Usuario {
    id: number;
    nombre: string;
    documento: string;
    tipo: 'natural' | 'estudiante' | 'empresa';
    institucion_id: number;
    institucion?: { id: number; nombre: string };
    created_at: string;
    updated_at: string;
}

interface Props {
    usuarios: {
        data: Usuario[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
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
];

const tipoIcons = {
    natural: User,
    estudiante: Users,
    empresa: Briefcase,
};

const tipoColors = {
    natural: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    estudiante: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    empresa: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
};

export default function UsuariosIndex({ usuarios }: Props) {
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const handleDelete = (id: number) => {
        if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
            setDeletingId(id);
            router.delete(`/usuarios/${id}`, {
                onFinish: () => setDeletingId(null),
            });
        }
    };

    const getTipoIcon = (tipo: string) => {
        const IconComponent = tipoIcons[tipo as keyof typeof tipoIcons];
        return IconComponent ? <IconComponent className="w-4 h-4" /> : null;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Usuarios" />
            
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Usuarios</h1>
                        <p className="text-muted-foreground">
                            Gestiona los usuarios del sistema
                        </p>
                    </div>
                    <Link href="/usuarios/create">
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Nuevo Usuario
                        </Button>
                    </Link>
                </div>

                {/* Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Lista de Usuarios</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left p-2">Nombre</th>
                                        <th className="text-left p-2">Documento</th>
                                        <th className="text-left p-2">Tipo</th>
                                        <th className="text-left p-2">Institución</th>
                                        <th className="text-left p-2">Fecha Creación</th>
                                        <th className="text-right p-2">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usuarios.data.map((usuario) => (
                                        <tr key={usuario.id} className="border-b hover:bg-muted/50">
                                            <td className="p-2 font-medium">{usuario.nombre}</td>
                                            <td className="p-2">{usuario.documento}</td>
                                            <td className="p-2">
                                                <Badge className={tipoColors[usuario.tipo]}>
                                                    <span className="flex items-center gap-1">
                                                        {getTipoIcon(usuario.tipo)}
                                                        {usuario.tipo}
                                                    </span>
                                                </Badge>
                                            </td>
                                            <td className="p-2">{usuario.institucion?.nombre || '-'}</td>
                                            <td className="p-2 text-sm text-muted-foreground">
                                                {new Date(usuario.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="p-2">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/usuarios/${usuario.id}`}>
                                                        <Button variant="outline" size="sm">
                                                            <Eye className="w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link href={`/usuarios/${usuario.id}/edit`}>
                                                        <Button variant="outline" size="sm">
                                                            <Edit className="w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm"
                                                        onClick={() => handleDelete(usuario.id)}
                                                        disabled={deletingId === usuario.id}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {usuarios.data.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground">
                                No hay usuarios registrados
                            </div>
                        )}

                        {/* Paginación */}
                        {usuarios.last_page > 1 && (
                            <div className="flex items-center justify-between mt-6">
                                <div className="text-sm text-muted-foreground">
                                    Mostrando {(usuarios.current_page - 1) * usuarios.per_page + 1} a {Math.min(usuarios.current_page * usuarios.per_page, usuarios.total)} de {usuarios.total} resultados
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => router.get('/usuarios', { page: usuarios.current_page - 1 }, { preserveState: true })}
                                        disabled={usuarios.current_page === 1}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                        Anterior
                                    </Button>
                                    <div className="flex items-center space-x-1">
                                        {Array.from({ length: usuarios.last_page }, (_, i) => i + 1).map((page) => (
                                            <Button
                                                key={page}
                                                variant={page === usuarios.current_page ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => router.get('/usuarios', { page }, { preserveState: true })}
                                                className="w-8 h-8 p-0"
                                            >
                                                {page}
                                            </Button>
                                        ))}
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => router.get('/usuarios', { page: usuarios.current_page + 1 }, { preserveState: true })}
                                        disabled={usuarios.current_page === usuarios.last_page}
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