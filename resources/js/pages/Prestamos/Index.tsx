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
    FileText,
    CheckCircle2,
    XCircle,
    RotateCcw
} from 'lucide-react';
import { type BreadcrumbItem } from '@/types';

interface Prestamo {
    id: number;
    libro_id: number;
    usuario_id: number;
    fecha_prestamo: string;
    fecha_devolucion: string;
    costo: number;
    devuelto: boolean;
    created_at: string;
    updated_at: string;
    libro?: {
        id: number;
        titulo: string;
        autor: string;
    };
    usuario?: {
        id: number;
        nombre: string;
        documento: string;
        institucion?: {
            id: number;
            nombre: string;
        };
    };
}

interface Props {
    prestamos: {
        data: Prestamo[];
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
        title: 'Préstamos',
        href: '/prestamos',
    },
];

export default function PrestamosIndex({ prestamos }: Props) {
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [devolviendoId, setDevolviendoId] = useState<number | null>(null);

    const handleDelete = (id: number) => {
        if (confirm('¿Estás seguro de que quieres eliminar este préstamo?')) {
            setDeletingId(id);
            router.delete(`/prestamos/${id}`, {
                onFinish: () => setDeletingId(null),
            });
        }
    };

    const handleDevolver = (id: number) => {
        if (confirm('¿Estás seguro de que quieres marcar este préstamo como devuelto?')) {
            setDevolviendoId(id);
            router.post(`/prestamos/${id}/devolver`, {}, {
                onFinish: () => setDevolviendoId(null),
            });
        }
    };

    const isVencido = (fechaDevolucion: string) => {
        return new Date(fechaDevolucion) < new Date();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Préstamos" />
            
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Préstamos</h1>
                        <p className="text-muted-foreground">
                            Gestiona los préstamos de libros
                        </p>
                    </div>
                    <Link href="/prestamos/create">
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Nuevo Préstamo
                        </Button>
                    </Link>
                </div>

                {/* Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Lista de Préstamos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left p-2">Libro</th>
                                        <th className="text-left p-2">Usuario</th>
                                        <th className="text-left p-2">Institución</th>
                                        <th className="text-left p-2">Fecha Préstamo</th>
                                        <th className="text-left p-2">Fecha Devolución</th>
                                        <th className="text-left p-2">Costo</th>
                                        <th className="text-left p-2">Estado</th>
                                        <th className="text-right p-2">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {prestamos.data.map((prestamo) => (
                                        <tr key={prestamo.id} className="border-b hover:bg-muted/50">
                                            <td className="p-2 font-medium">
                                                {prestamo.libro?.titulo}
                                                <br />
                                                <span className="text-sm text-muted-foreground">
                                                    {prestamo.libro?.autor}
                                                </span>
                                            </td>
                                            <td className="p-2">
                                                {prestamo.usuario?.nombre}
                                                <br />
                                                <span className="text-sm text-muted-foreground">
                                                    {prestamo.usuario?.documento}
                                                </span>
                                            </td>
                                            <td className="p-2">
                                                {prestamo.usuario?.institucion?.nombre || '-'}
                                            </td>
                                            <td className="p-2 text-sm">
                                                {new Date(prestamo.fecha_prestamo).toLocaleDateString()}
                                            </td>
                                            <td className="p-2 text-sm">
                                                {new Date(prestamo.fecha_devolucion).toLocaleDateString()}
                                            </td>
                                            <td className="p-2 font-medium">
                                                ${prestamo.costo.toFixed(2)}
                                            </td>
                                            <td className="p-2">
                                                {prestamo.devuelto ? (
                                                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                                        <CheckCircle2 className="w-4 h-4 mr-1 inline" /> Devuelto
                                                    </Badge>
                                                ) : isVencido(prestamo.fecha_devolucion) ? (
                                                    <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                                                        <XCircle className="w-4 h-4 mr-1 inline" /> Vencido
                                                    </Badge>
                                                ) : (
                                                    <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                                                        <FileText className="w-4 h-4 mr-1 inline" /> Activo
                                                    </Badge>
                                                )}
                                            </td>
                                            <td className="p-2">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/prestamos/${prestamo.id}`}>
                                                        <Button variant="outline" size="sm">
                                                            <Eye className="w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link href={`/prestamos/${prestamo.id}/edit`}>
                                                        <Button variant="outline" size="sm">
                                                            <Edit className="w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                    {!prestamo.devuelto && (
                                                        <Button 
                                                            variant="outline" 
                                                            size="sm"
                                                            onClick={() => handleDevolver(prestamo.id)}
                                                            disabled={devolviendoId === prestamo.id}
                                                        >
                                                            <RotateCcw className="w-4 h-4" />
                                                        </Button>
                                                    )}
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm"
                                                        onClick={() => handleDelete(prestamo.id)}
                                                        disabled={deletingId === prestamo.id}
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

                        {prestamos.data.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground">
                                No hay préstamos registrados
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
} 