<?php

declare(strict_types=1); // strict mode

namespace App\Controller;

use App\Helper\HTTP;
use App\Model\Villageois;

class VillageoisController extends Controller
{
    /**
     * Page d'accueil pour lister tous les avatars.
     * @route [get] /
     *
     */
    public function index()
    {
        $this->corseoption();
        // récupérer les informations sur les posts
        $posts = Villageois::getInstance()->findAll();
        echo json_encode($posts);
    }

    /**
     * Afficher le formulaire de saisie d'un nouvel avatar ou traiter les
     * données soumises présentent dans $_POST.
     * @route [get]  /avatars/ajouter
     * @route [post] /avatars/ajouter
     *
     */
    public function create()
    {
        $this->corseoption();
        Villageois::getInstance()->create([
            'nom' => trim($_POST['nom']),
            'age' => trim($_POST['age']),
            'metier' => trim($_POST['metier']),
            'categorie' => trim($_POST['categorie']),
        ]);
    }

    public function update()
    {

        $data = json_decode(file_get_contents('php://input'), true);
        $this->corseoption();
        $updateResult = Villageois::getInstance()->update([
            'id' => trim($data['id']),
            'nom' => trim($data['nom']),
            'age' => trim($data['age']),
            'metier' => trim($data['metier']),
        ]);

        if ($updateResult) {
            echo json_encode(['success' => 'Mise à jour réussie']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Échec de la mise à jour']);
        }
    }

    /**
     * Effacer un avatar.
     * @route [get] /avatars/effacer/{id}
     *
     */
    public function option(
        int|string $id
    ) {
        header("Access-Control-Allow-Origin: *");
        header('Access-Control-Allow-Methods: PUT, PATCH, DELETE, GET, POST, OPTIONS');
        header("Access-Control-Allow-Headers: *");
    }

    public function delete(
        int|string $id
    ) {
        $this->corseoption();
        Villageois::getInstance()->delete((int) $id);
    }

    private function corseoption()
    {

        Header("Access-Control-Allow-Origin: *");
        Header("Access-Control-Allow-Methods: POST, GET, PUT");
        Header("Access-Control-Allow-Headers: Content-Type");


    }
}
