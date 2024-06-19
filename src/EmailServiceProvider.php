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

        $this->publishes([__DIR__ . '/../login/index.html' => resource_path('views/email-template/login.blade.php')], 'readycash.template');
        $this->publishes([__DIR__ . '/../credit mail/index.html' => resource_path('views/email-template/credit-mail.blade.php')], 'readycash.template');
        $this->publishes([__DIR__ . '/../welcome mail/index.html' => resource_path('views/email-template/welcome-mail.blade.php')], 'readycash.template');
    }

    public function register()
    {
    }
}
