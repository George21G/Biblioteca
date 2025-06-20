<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Libro extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'libros';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'titulo',
        'autor',
        'isbn',
        'disponible'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'disponible' => 'boolean',
    ];

    /**
     * Relación con los préstamos (un libro puede tener muchos préstamos).
     */
    public function prestamos(): HasMany
    {
        return $this->hasMany(Prestamo::class);
    }
}
