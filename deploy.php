<?php
namespace Deployer;

require 'recipe/laravel.php';

// Config

set('repository', 'git@github.com:vikimaxton/pie.git');

add('shared_files', []);
add('shared_dirs', []);
add('writable_dirs', []);

// Hosts

host('15.235.184.68')
    ->set('remote_user', 'deployer')
    ->set('deploy_path', '~/pie');

// Hooks

after('deploy:failed', 'deploy:unlock');
