<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Procès-Verbal d'Arrêté de Caisse</title>
    <style>
        body { font-family: 'Helvetica', 'Arial', sans-serif; color: #333; font-size: 12px; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #059669; padding-bottom: 10px; }
        .titre { font-size: 20px; font-weight: bold; color: #059669; text-transform: uppercase; }
        .meta-box { width: 100%; margin-bottom: 25px; border-collapse: collapse; }
        .meta-box td { padding: 5px; }
        .table-finance { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        .table-finance th { bg-color: #f3f4f6; font-weight: bold; text-transform: uppercase; font-size: 10px; }
        .table-finance th, .table-finance td { border: 1px solid #e5e7eb; padding: 8px; text-align: left; }
        .text-right { text-align: right; }
        .montant-bold { font-weight: bold; color: #059669; }
        .signatures { margin-top: 50px; width: 100%; }
        .signatures td { width: 50%; text-align: center; height: 100px; vertical-align: top; }
    </style>
</head>
<body>

    <div class="header">
        <div class="titre">Procès-Verbal d'Arrêté de Caisse</div>
        <p>G-Caisse Web — Système de Gestion Auditable</p>
    </div>

    <!-- Informations administratives -->
    <table class="meta-box">
        <tr>
            <td><strong>Date de l'arrêté :</strong> {{ $cloture->date_cloture->format('d/m/Y H:i') }}</td>
            <td class="text-right"><strong>Signataire :</strong> {{ $cloture->comptable->name }} (Comptable)</td>
        </tr>
    </table>

    <!-- Synthèse financière de l'arrêté -->
    <h3>📊 Synthèse de la Période</h3>
    <table class="table-finance">
        <thead>
            <tr>
                <th>Désignation</th>
                <th class="text-right">Montant (FCFA)</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Solde Initial de la période (Report de la clôture précédente)</td>
                <td class="text-right">{{ number_format($cloture->solde_initial) }} F</td>
            </tr>
            <tr>
                <td>Total des approvisionnements (Flux Crédits)</td>
                <td class="text-right text-right font-medium text-blue-600">+ {{ number_format($transactions->where('type', 'credit')->sum('montant')) }} F</td>
            </tr>
            <tr>
                <td>Total des dépenses accordées (Flux Débits Validés)</td>
                <td class="text-right text-right font-medium text-rose-600">- {{ number_format($transactions->where('type', 'debit')->sum('montant')) }} F</td>
            </tr>
            <tr style="background-color: #ecfdf5;">
                <td><strong>Solde Final Clôturé et Arrêté en Caisse</strong></td>
                <td class="text-right montant-bold">{{ number_format($cloture->solde_final) }} F</td>
            </tr>
        </tbody>
    </table>

    <!-- Liste succincte du journal audité -->
    <h3>📋 Journal des écritures contrôlées</h3>
    <table class="table-finance" style="font-size: 11px;">
        <thead>
            <tr>
                <th>Date</th>
                <th>Catégorie</th>
                <th>Description / Référence</th>
                <th class="text-right">Flux</th>
            </tr>
        </thead>
        <tbody>
            @foreach($transactions as $t)
                <tr>
                    <td>{{ $t->created_at->format('d/m/Y') }}</td>
                    <td>{{ $t->type === 'credit' ? 'Approvisionnement' : $t->categorie->nom }}</td>
                    <td>{{ $t->description }} {{ $t->reference_piece ? '(Réf: '.$t->reference_piece.')' : '' }}</td>
                    <td class="text-right {{ $t->type === 'credit' ? 'montant-bold' : '' }}">
                        {{ $t->type === 'credit' ? '+' : '-' }} {{ number_format($t->montant) }} F
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <!-- Espace pour les signatures physiques -->
    <table class="signatures">
        <tr>
            <td>
                <strong>Le Caissier (Agent Émetteur)</strong>
                <p style="font-size: 10px; color: #9ca3af; margin-top: 40px;">[Signature précédée de la mention 'Lu et approuvé']</p>
            </td>
            <td>
                <strong>Le Comptable Général (Administrateur)</strong>
                <p style="font-size: 10px; color: #9ca3af; margin-top: 40px;">[Signature et cachet officiel]</p>
            </td>
        </tr>
    </table>

</body>
</html>
