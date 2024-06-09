<?php

namespace Readycash\EmailTemplate;

use Illuminate\Support\ServiceProvider;

class EmailServiceProvider extends ServiceProvider
{

    public function boot()
    {
        $this->publishes([
            __DIR__ . '/../assets/' => public_path('email-assets')
        ], 'email-assets');
    }

    public function register()
    {
    }
}
