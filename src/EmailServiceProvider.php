<?php

namespace Readycash\EmailTemplate;

use Illuminate\Support\ServiceProvider;
use Readycash\EmailTemplate\Commands\FormatTemplate;

class EmailServiceProvider extends ServiceProvider
{

    public function boot()
    {
        $this->publishes([
            __DIR__ . '/../assets/' => public_path('email-assets')
        ], 'email-assets');

        $this->publishes([
            __DIR__ . '/../config/template.php' => config_path('template.php'),
        ], 'parkway.config');

        $this->publishes([__DIR__ . '/../parkway-website/images/' => public_path('assets/website/images')], 'parkway.website.assets');
        $this->publishes([__DIR__ . '/../parkway-website/fonts/' => public_path('assets/website/fonts')], 'parkway.website.assets');
        $this->publishes([__DIR__ . '/../parkway-website/style.css' => public_path('assets/website/css/style.css')], 'parkway.website.assets');
        $this->publishes([__DIR__ . '/../parkway-website/script.js' => public_path('assets/website/js/script.js')], 'parkway.website.assets');
        $this->publishes([__DIR__ . '/../parkway-website/faq.html' => public_path('assets/website/js/script.js')], 'parkway.website.assets');

        $this->publishes([__DIR__ . '/../login/index.html' => $index = resource_path('views/email-template/login.blade.php')], 'readycash.template');
        $this->publishes([__DIR__ . '/../credit mail/index.html' => $credit_mail = resource_path('views/email-template/dedit.blade.php')], 'readycash.template');
        $this->publishes([__DIR__ . '/../welcome mail/index.html' => $welcome = resource_path('views/email-template/welcome.blade.php')], 'readycash.template');
        $this->publishes([__DIR__ . '/../agent mail/index.html' => $welcome = resource_path('views/email-template/logininfo.blade.php')], 'readycash.template');


        $this->commands([FormatTemplate::class]);
    }

    public function register()
    {
        $this->mergeConfigFrom(
            __DIR__ . '/../config/template.php',
            'template'
        );
    }
}
