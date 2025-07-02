import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
    ArrowLeft, 
    Edit, 
    Building2,
    GraduationCap,
    Briefcase,
    Users,
    Calendar,
    User
} from 'lucide-react';
import { type BreadcrumbItem } from '@/types';

interface Usuario {
    id: number;
    nombre: string;
    email: string;
    prestamos_count: number;
    created_at: string;
}

interface Institucion {
    id: number;
    nombre: string;
    tipo: 'empresa' | 'universidad' | 'colegio';
    created_at: string;
    updated_at: string;
    usuarios: Usuario[];
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
        title: 'Detalles',
        href: '#',
    },
];

const tipoIcons = {
    empresa: Briefcase,
    universidad: Building2,
    colegio: GraduationCap,
};

const tipoColors = {
    empresa: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    universidad: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    colegio: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
};

export default function InstitucionesShow({ institucion }: Props) {
    const getTipoIcon = (tipo: string) => {
        const IconComponent = tipoIcons[tipo as keyof typeof tipoIcons];
        return IconComponent ? <IconComponent className="w-4 h-4" /> : null;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Institución - ${institucion.nombre}`} />
            
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">{institucion.nombre}</h1>
                        <p className="text-muted-foreground">
                            Detalles de la institución
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Link href={`/instituciones/${institucion.id}/edit`}>
                            <Button>
                                <Edit className="w-4 h-4 mr-2" />
                                Editar
                            </Button>
                        </Link>
                        <Link href="/instituciones">
                            <Button variant="outline">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Volver
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {/* Información de la Institución */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Building2 className="w-5 h-5" />
                                Información General
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Nombre</label>
                                <p className="text-lg font-semibold">{institucion.nombre}</p>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Tipo</label>
                                <div className="mt-1">
                                    <Badge className={tipoColors[institucion.tipo]}>
                                        <span className="flex items-center gap-1">
                                            {getTipoIcon(institucion.tipo)}
                                            {institucion.tipo}
                                        </span>
                                    </Badge>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Fecha de Creación</label>
                                <p className="text-sm">{new Date(institucion.created_at).toLocaleDateString()}</p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Última Actualización</label>
                                <p className="text-sm">{new Date(institucion.updated_at).toLocaleDateString()}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Estadísticas */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="w-5 h-5" />
                                Estadísticas
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    <span className="font-medium">Total de Usuarios</span>
                                </div>
                                <span className="text-2xl font-bold">{institucion.usuarios.length}</span>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span className="font-medium">Total de Préstamos</span>
                                </div>
                                <span className="text-2xl font-bold">
                                    {institucion.usuarios.reduce((total, usuario) => total + usuario.prestamos_count, 0)}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Lista de Usuarios */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="w-5 h-5" />
                            Usuarios de la Institución
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {institucion.usuarios.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left p-2">Nombre</th>
                                            <th className="text-left p-2">Email</th>
                                            <th className="text-left p-2">Préstamos</th>
                                            <th className="text-left p-2">Fecha de Registro</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {institucion.usuarios.map((usuario) => (
                                            <tr key={usuario.id} className="border-b hover:bg-muted/50">
                                                <td className="p-2 font-medium">{usuario.nombre}</td>
                                                <td className="p-2">{usuario.email}</td>
                                                <td className="p-2">
                                                    <Badge variant="secondary">
                                                        {usuario.prestamos_count} préstamos
                                                    </Badge>
                                                </td>
                                                <td className="p-2 text-sm text-muted-foreground">
                                                    {new Date(usuario.created_at).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <p>No hay usuarios registrados en esta institución</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
} 