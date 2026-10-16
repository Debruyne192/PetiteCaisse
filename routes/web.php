<?php
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\PersonneController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\ClosureController;
use App\Http\Controllers\Teams\TeamInvitationController;
use App\Http\Controllers\ProfilController;
use App\Http\Middleware\EnsureTeamMembership;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'accueil')->name('home');
Route::get('/portofolio', function () { return Inertia::render('Portofolio/Index');})->name('portofolio'); 
Route::prefix('{current_team}') ->middleware(['auth', 'verified', EnsureTeamMembership::class]) ->group(function () { Route::get('dashboard', DashboardController::class)->name('dashboard'); }); 
Route::resource('personne', PersonneController::class);
Route::middleware(['auth'])->group(function () { 
    Route::post('invitations/{invitation}/accept', [TeamInvitationController::class, 'accept'])->name('invitations.accept'); 
    Route::delete('invitations/{invitation}', [TeamInvitationController::class, 'decline'])->name('invitations.decline'); 
    Route::resource('category', CategorieController::class); 
    Route::resource('transaction', TransactionController::class); 
    Route::get('/dashboard',[TransactionController::class , 'dashboard'])->name('personne.dashboard'); 
    Route::get('/mon-profil', [ProfilController::class, 'edit'])->name('profil.edit'); 
    Route::put('/mon-profil', [ProfilController::class, 'update'])->name('profil.update'); 
    Route::post('/logout', [PersonneController::class, 'logout'])->name('logout');
    Route::put('/transaction/{transaction}/valider', [TransactionController::class, 'valider'])->name('transaction.valider');
    Route::put('/transaction/{transaction}/rejeter', [TransactionController::class, 'rejeter'])->name('transaction.rejeter');
    Route::get('/clotures', [ClosureController::class, 'index'])->name('clotures.index');
    Route::post('/clotures/executer', [ClosureController::class, 'store'])->name('clotures.store');
    Route::get('/clotures/{id}/pdf', [ClosureController::class, 'telechargerPDF'])->name('clotures.pdf');
    Route::get('/mon-journal-caisse', [TransactionController::class, 'monHistorique'])->name('transaction.historique.personnel');
 
    });
Route::get('/aide', function () {
    return Inertia::render('Documentation/Aide');
})->name('aide');

Route::get('/support', function () {
    return Inertia::render('Documentation/Support');
})->name('support');
Route::get('/login', function () {
    return Inertia::render('Personne/Login'); 
})->name('login');
Route::post('/login', [PersonneController::class, 'connexion']);
        
;require __DIR__.'/settings.php';


