<?php

namespace Readycash\EmailTemplate\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class FormatTemplate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'format:email-template {--p|path=:path to template folder} {--zip}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Prepare mail template for artifacts';


    public function handle()
    {
        $path = $this->option('path');

        if (File::isDirectory(resource_path($path)) == false) {
            $this->info('invalid path provided');
            return static::FAILURE;
        }

        $path = str_replace('/', '\\', $this->option('path'));

        // Get all Blade files in the resources/views directory
        $bladeFiles = File::allFiles(resource_path($path));
        $modifiedFiles = [];

        foreach ($bladeFiles as $file) {
            $this->info('Processing file: ' . $file->getPathname());

            // Read the file content
            $content = File::get($file->getPathname());

            $mapping = config('template.find_and_replace', []);
            // Replace content based on the mapping array
            $newContent = str_replace(array_keys($mapping), array_values($mapping), $content);

            // Save the new content to the file
            File::put($file->getPathname(), $newContent);

            // Collect modified files for zipping
            $modifiedFiles[] = $file->getPathname();
        }

        // Check if the --zip option is provided
        if ($this->option('zip')) {
            $this->createZip($modifiedFiles);
        }

        $this->info('Replacement complete.');
        return 0;
    }

    /**
     * Create a zip file of the modified files.
     *
     * @param array $files
     * @return void
     */
    protected function createZip(array $files)
    {
        $path = str_replace('/', '\\', $this->option('path'));

        $zip = new \ZipArchive();
        $zipFileName = storage_path('modified_blade_files.zip');

        if ($zip->open($zipFileName, \ZipArchive::CREATE | \ZipArchive::OVERWRITE) === TRUE) {
            foreach ($files as $file) {
                // Add the file to the zip archive
                $relativePath = str_replace(resource_path($path) . '\\', '', $file);
                $relativePath = str_replace('.blade.php', '.html', $relativePath);
                $zip->addFile($file, $relativePath);
            }
            $zip->close();

            $this->info('Zip file created: ' . $zipFileName);
        } else {
            $this->error('Failed to create zip file.');
        }
    }
}
