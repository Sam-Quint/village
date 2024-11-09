<?php

declare(strict_types=1); // strict mode

namespace App\Controller;

use App\Helper\HTTP;
use App\Model\descriptions;

class DescriptionsController extends Controller
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
        $posts = descriptions::getInstance()->findAll();
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
        descriptions::getInstance()->create([
            'description' => trim($_POST['description']),
            'villageois_id' => trim($_POST['villageois_id']),
        ]);
    }

    public function update()
    {
        $this->corseoption();
        descriptions::getInstance()->update([
            'id' => trim($_POST['id']),
            'description' => trim($_POST['description']),
            'villageois_id' => trim($_POST['villageois_id']),
        ]);
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
        header('Access-Control-Allow-Methods:  *');
        header("Access-Control-Allow-Headers: *");
    }

    public function delete(
        int|string $id
    ) {
        $this->corseoption();
        descriptions::getInstance()->delete((int) $id);
    }

    private function corseoption()
    {
        header("Access-Control-Allow-Origin: *");
        header('Access-Control-Allow-Methods:   *');
        header("Access-Control-Allow-Headers: *");
    }
}
