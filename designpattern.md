# Pour le convertisseur 

Pour le convertisseur, je suis parti sur le Separation of Concerns pattern. L'objectif est de séparé les des fonctions/demandes de manière distincte,
afin que chaque partie réponde à une question précise. Cela permet de faciliter la maintenabilité de l'application et améliore sa lisibilité.


# Pour l'app de prise de note

Pour l'app de prise de note, j'utilise le principe du State Management/Observer. Un peu poussé par la réactivité de "zustand", j'ai suivi cette logique avec la séparation entre le store qui gère les états des notes, et l'affichage qui est d'un autre côté.
