document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('devis-formulaire');
    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    const prixTotalElement = document.getElementById('prix-total');
    const genererDevisBtn = document.getElementById('generer-devis');
    const recapitulatifDiv = document.getElementById('recapitulatif');
    const listeServicesUl = document.getElementById('liste-services');
    const totalFinalSpan = document.getElementById('total-final');

    const TVA_TAUX = 0.20; // 20% 

  // Fonction pour formater un nombre en €
    function formatDevise(nombre) {
      // Arrondir à l'entier pour la simplicité, ou utiliser toFixed(2) pour les centimes
        return Math.round(nombre).toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' €';
    }

/**
   * fonction qui mets le prix total en fonction des cases chochée sur les cases cochée
   */
    function calculerTotal() {
    let total = 0;
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            const prix = parseInt(checkbox.dataset.prix); 
            total += prix;
        }
    });
        prixTotalElement.textContent = formatDevise(total); 
        return total;
    }

  //  case à cocher
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', calculerTotal);
    });

/**
   * Génère le devis
   */
    genererDevisBtn.addEventListener('click', function() {
        listeServicesUl.innerHTML = ''; // Réinitialiser la liste
        let totalHT = 0;
    
    // 1. Construction du tableau des services
    checkboxes.forEach(function(checkbox) {

        if (checkbox.checked) {
            const prix = parseInt(checkbox.dataset.prix);
        // Utiliser le label associé pour la désignation
            const labelText = form.querySelector(`label[for="${checkbox.id}"]`).textContent;
        
        // Créer une ligne de devis avec les 4 colonnes
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="service-designation">${labelText.trim()}</span>
                <span class="service-unite">1 Unité</span>
                <span class="service-prix-unitaire">${formatDevise(prix)}</span>
                <span class="service-total-ht">${formatDevise(prix)}</span>
            `;
            listeServicesUl.appendChild(li);
            
            totalHT += prix;
            }
        });

    // 2. Calcul des prix  
    if (totalHT > 0) {
      const montantTVA = totalHT * TVA_TAUX;
        const totalTTC = totalHT + montantTVA;
    
      // Mise à jour de l'en-tête du devis (date/référence)
        const dateEmission = new Date().toLocaleDateString('fr-FR');
      // Générer une référence simple
        const reference = 'DEVIS-' + Date.now().toString().slice(-6);
        document.getElementById('devis-date').textContent = dateEmission;
        document.getElementById('devis-ref').textContent = reference;
    
      // Mise à jour des totaux dans le pied de page
        document.getElementById('total-ht').textContent = formatDevise(totalHT);
        document.getElementById('montant-tva').textContent = formatDevise(montantTVA);
        totalFinalSpan.textContent = formatDevise(totalTTC);
    
        recapitulatifDiv.style.display = 'block'; // Afficher le récapitulatif
    
      //  le bouton impression
        document.getElementById('action-buttons').innerHTML = '<button onclick="window.print()" class="print-button">🖨️ Imprimer le Devis</button>';
    
    } else {
        recapitulatifDiv.style.display = 'none';
        alert("Veuillez sélectionner au moins un service pour générer le devis.");
    }
});

  // Calculer le total initial au chargement
    calculerTotal();
});