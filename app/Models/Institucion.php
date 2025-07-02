<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Institucion extends Model
{
    use HasFactory, SoftDeletes;

     /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'instituciones';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nombre',
        'tipo'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'tipo' => 'string', // El enum se maneja como string
    ];

    /**
     * Obtener todos los usuarios de esta institución.
     */
    public function usuarios(): HasMany
    {
        return $this->hasMany(Usuario::class);
    }

    /**
     * Scope para filtrar instituciones por tipo.
     */
    public function scopePorTipo($query, string $tipo)
    {
        return $query->where('tipo', $tipo);
    }

    /**
     * Accessor para el nombre en formato título.
     */
    public function getNombreFormateadoAttribute()
    {
        return ucwords(strtolower($this->nombre));
    }

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName()
    {
        return 'id';
    }
}
