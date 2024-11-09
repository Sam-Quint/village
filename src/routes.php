<?php

declare(strict_types=1);
/*
-------------------------------------------------------------------------------
les routes
-------------------------------------------------------------------------------
 */

return [


    ['GET', '/village/villageois', 'villageois@index'],

    ['GET', '/client-php/curl', 'curl@index'],

    ['GET', '/village/villageois/{id:\\d+}', 'villageois@show'],

    ['POST', '/village/villageois/ajouter', 'villageois@create'],

    ['PATCH', '/village/villageois/{id:\\d+}', 'villageois@update'],

    ['DELETE', '/village/villageois/{id:\\d+}', 'villageois@delete'],

    ['OPTIONS', '/village/villageois/{id:\\d+}', 'villageois@option'],



    ['GET', '/village/Descriptions', 'Descriptions@index'],

    ['GET', '/village/Descriptions/{id:\\d+}', 'Descriptions@show'],

    ['POST', '/village/Descriptions/ajouter', 'Descriptions@create'],

    ['PATCH', '/village/Descriptions/{id:\\d+}', 'Descriptions@update'],

    ['DELETE', '/village/Descriptions/{id:\\d+}', 'Descriptions@delete'],

    ['OPTIONS', '/village/Descriptions/{id:\\d+}', 'Descriptions@option'],



];
