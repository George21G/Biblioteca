import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
    Building2, 
    Users, 
    BookOpen, 
    FileText,
    GraduationCap,
    Briefcase,
    Plus,
    TrendingUp,
    Clock,
    CheckCircle,
    AlertTriangle
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface Stats {
    instituciones: {
        total: number;
        escuelas: number;
        universidades: number;
        empresas: number;
    };
    usuarios: {
        total: number;
        natural: number;
        estudiante: number;
        empresa: number;
    };
    libros: {
        total: number;
        disponibles: number;
        prestados: number;
    };
    prestamos: {
        total: number;
        activos: number;
        devueltos: number;
        vencidos: number;
    };
}

interface RecentActivity {
    prestamos: any[];
    libros: any[];
    usuarios: any[];
}

interface Props {
    stats: Stats;
    recentActivity: RecentActivity;
}

export default function Dashboard({ stats, recentActivity }: Props) {
    const modules = [
        {
            title: 'Instituciones',
            description: 'Gestiona las instituciones del sistema',
            icon: Building2,
            href: '/instituciones',
            color: 'bg-blue-500',
            stats: `${stats.instituciones.total} instituciones`
        },
        {
            title: 'Usuarios',
            description: 'Administra los usuarios registrados',
            icon: Users,
            href: '/usuarios',
            color: 'bg-green-500',
            stats: `${stats.usuarios.total} usuarios`
        },
        {
            title: 'Libros',
            description: 'Gestiona el catálogo de libros',
            icon: BookOpen,
            href: '/libros',
            color: 'bg-purple-500',
            stats: `${stats.libros.total} libros`
        },
        {
            title: 'Préstamos',
            description: 'Controla los préstamos de libros',
            icon: FileText,
            href: '/prestamos',
            color: 'bg-orange-500',
            stats: `${stats.prestamos.activos} préstamos activos`
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                        <p className="text-muted-foreground">
                            Bienvenido al sistema de gestión de biblioteca
                        </p>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Instituciones</CardTitle>
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.instituciones.total}</div>
                            <p className="text-xs text-muted-foreground">
                                Escuelas, universidades y empresas
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.usuarios.total}</div>
                            <p className="text-xs text-muted-foreground">
                                Estudiantes y personal
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Libros</CardTitle>
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.libros.total}</div>
                            <p className="text-xs text-muted-foreground">
                                En el catálogo
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Préstamos Activos</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.prestamos.activos}</div>
                            <p className="text-xs text-muted-foreground">
                                Sin devolver
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {modules.map((module) => {
                        const IconComponent = module.icon;
                        return (
                            <Link key={module.title} href={module.href}>
                                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">{module.title}</CardTitle>
                                        <div className={`p-2 rounded-full ${module.color}`}>
                                            <IconComponent className="h-4 w-4 text-white" />
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-xs text-muted-foreground mb-2">
                                            {module.description}
                                        </p>
                                        <div className="text-sm font-medium">{module.stats}</div>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </div>

                {/* Quick Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Libros Disponibles</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{stats.libros.disponibles}</div>
                            <p className="text-xs text-muted-foreground">
                                Listos para préstamo
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Libros Prestados</CardTitle>
                            <Clock className="h-4 w-4 text-orange-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-600">{stats.libros.prestados}</div>
                            <p className="text-xs text-muted-foreground">
                                En préstamo actualmente
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Préstamos Vencidos</CardTitle>
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">{stats.prestamos.vencidos}</div>
                            <p className="text-xs text-muted-foreground">
                                Requieren atención
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Activity */}
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Préstamos Recientes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {recentActivity.prestamos.length > 0 ? (
                                <div className="space-y-3">
                                    {recentActivity.prestamos.map((prestamo) => (
                                        <div key={prestamo.id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div>
                                                <p className="font-medium">{prestamo.libro?.titulo}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {prestamo.usuario?.nombre} - {prestamo.usuario?.institucion?.nombre}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-medium">
                                                    ${prestamo.costo?.toLocaleString()}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(prestamo.fecha_prestamo).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground text-center py-4">
                                    No hay préstamos recientes
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Libros Recientes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {recentActivity.libros.length > 0 ? (
                                <div className="space-y-3">
                                    {recentActivity.libros.map((libro) => (
                                        <div key={libro.id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div>
                                                <p className="font-medium">{libro.titulo}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {libro.autor} - ISBN: {libro.isbn}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                    libro.disponible 
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                                }`}>
                                                    {libro.disponible ? 'Disponible' : 'Prestado'}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground text-center py-4">
                                    No hay libros recientes
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
