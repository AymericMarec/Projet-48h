# 🚲 Challenge 48h - Info X Cyber

## Refonte et sécurisation du site des stations VCub - TBM

### 👥 Équipe

-   **Maxime CHORT**
    
-   **Aymeric MAREC**
    
-   **Diane SAUTEREAU**
    
-   **Alexandre HOARAU**
    
-   **Kevin CANO**
    
-   **Stanislas THABAULT**

## 📁 Contenu du rendu

-   `pdf/audit_securite.pdf` : Audit de sécurité complet du site web et de l’API existante, avec les vulnérabilités identifiées et les propositions de remédiation.
    
-   `code` : Code source complet de la refonte du site VCub, développé en **Next.js**.
    
-   `README.md` : Documentation de mise en route du projet.

## 🚀 Lancer le projet Next.js en local

### Prérequis

-   Node.js ≥ 18.x
    
-   npm ou yarn
    
-   Accès à une instance MongoDB (locale ou distante)
    

### Installation

1.  Clonez le dépôt :
    
    ```bash
    git clone https://github.com/AymericMarec/Projet-48h.git
    cd Projet-48h
    ```
    
2.  Installez les dépendances :
    
    ```bash
    npm install
    ```
    
3.  Créez un fichier `.env` à la racine du projet avec les variables nécessaires :
    
    ```env
	API_URL=http://10.33.70.223:3000/api
    ```
    
4.  Démarrez le serveur de développement :
    
    ```bash
    npm run dev
    ```
    
5.  Accédez à l’application sur :
    
    ```
    http://localhost:3001
    ```

## 🔐 Sécurité

L'audit de sécurité est disponible dans le fichier `audit_securite.pdf` dans le dossier pdf.  
Il contient :

-   Une analyse des vulnérabilités du site original
    
-   Des recommandations concrètes
    
-   Les remédiations intégrées dans notre refonte

## 🎯 Objectifs réalisés

-   ✅ **Refonte complète** du front-end avec Next.js et Tailwind CSS
    
-   ✅ **Amélioration de la sécurité** basée sur les résultats de l’audit
    
-   ✅ **Modernisation de l'interface** UX/UI (prototypée sur Figma)
    
-   ✅ **Fonctionnalités améliorées** pour l'utilisateur final

## 📎 Liens utiles

-   🔗 [Prototype Figma](https://www.figma.com/design/PCtH6shHmhsPIArQVS5RK8/Prototype?node-id=114-907&t=3qJrwdQBNoWkqwxz-0)
-   🔗 [Audit Sécurité](https://github.com/AymericMarec/Projet-48h/tree/main/pdf/audit_securite.pdf)