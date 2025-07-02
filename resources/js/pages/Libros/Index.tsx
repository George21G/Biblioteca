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
    BookOpen,
    CheckCircle2,
    XCircle,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { type BreadcrumbItem } from '@/types';

interface Libro {
    id: number;
    titulo: string;
    autor: string;
    isbn: string;
    disponible: boolean;
    created_at: string;
    updated_at: string;
}

interface Props {
    libros: {
        data: Libro[];
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
        title: 'Libros',
        href: '/libros',
    },
];

export default function LibrosIndex({ libros }: Props) {
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const handleDelete = (id: number) => {
        if (confirm('¿Estás seguro de que quieres eliminar este libro?')) {
            setDeletingId(id);
            router.delete(`/libros/${id}`, {
                onFinish: () => setDeletingId(null),
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Libros" />
            
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Libros</h1>
                        <p className="text-muted-foreground">
                            Gestiona el catálogo de libros
                        </p>
                    </div>
                    <Link href="/libros/create">
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Nuevo Libro
                        </Button>
                    </Link>
                </div>

                {/* Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Lista de Libros</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left p-2">Título</th>
                                        <th className="text-left p-2">Autor</th>
                                        <th className="text-left p-2">ISBN</th>
                                        <th className="text-left p-2">Disponible</th>
                                        <th className="text-left p-2">Fecha Creación</th>
                                        <th className="text-right p-2">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {libros.data.map((libro) => (
                                        <tr key={libro.id} className="border-b hover:bg-muted/50">
                                            <td className="p-2 font-medium">{libro.titulo}</td>
                                            <td className="p-2">{libro.autor}</td>
                                            <td className="p-2">{libro.isbn}</td>
                                            <td className="p-2">
                                                {libro.disponible ? (
                                                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                                        <CheckCircle2 className="w-4 h-4 mr-1 inline" /> Disponible
                                                    </Badge>
                                                ) : (
                                                    <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                                                        <XCircle className="w-4 h-4 mr-1 inline" /> No disponible
                                                    </Badge>
                                                )}
                                            </td>
                                            <td className="p-2 text-sm text-muted-foreground">
                                                {new Date(libro.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="p-2">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/libros/${libro.id}`}>
                                                        <Button variant="outline" size="sm">
                                                            <Eye className="w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link href={`/libros/${libro.id}/edit`}>
                                                        <Button variant="outline" size="sm">
                                                            <Edit className="w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm"
                                                        onClick={() => handleDelete(libro.id)}
                                                        disabled={deletingId === libro.id}
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

                        {libros.data.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground">
                                No hay libros registrados
                            </div>
                        )}

                        {/* Paginación */}
                        {libros.last_page > 1 && (
                            <div className="flex items-center justify-between mt-6">
                                <div className="text-sm text-muted-foreground">
                                    Mostrando {(libros.current_page - 1) * libros.per_page + 1} a {Math.min(libros.current_page * libros.per_page, libros.total)} de {libros.total} resultados
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => router.get('/libros', { page: libros.current_page - 1 }, { preserveState: true })}
                                        disabled={libros.current_page === 1}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                        Anterior
                                    </Button>
                                    <div className="flex items-center space-x-1">
                                        {Array.from({ length: libros.last_page }, (_, i) => i + 1).map((page) => (
                                            <Button
                                                key={page}
                                                variant={page === libros.current_page ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => router.get('/libros', { page }, { preserveState: true })}
                                                className="w-8 h-8 p-0"
                                            >
                                                {page}
                                            </Button>
                                        ))}
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => router.get('/libros', { page: libros.current_page + 1 }, { preserveState: true })}
                                        disabled={libros.current_page === libros.last_page}
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