<?php
// Legacy URL router for foggs.org static archive.
// Maps CSV-listed paths to preserved files or stable HTML locations.

$root = __DIR__;
$csvPath = $root . '/foggs_urls.csv';

$explicitRoutes = [
    '/' => '/index.html',
    '/about-us' => '/about.html',
    '/about' => '/about.html',
    '/contact-us' => '/contact.html',
    '/contact' => '/contact.html',
    '/projects' => '/work.html',
    '/publications' => '/publications.html',
    '/events' => '/archive.html',
    '/newsletter' => '/contact.html#newsletter',
    '/executive-board' => '/about.html#leadership',
    '/secretariat' => '/about.html#leadership',
    '/advisory-board' => '/about.html#leadership',
    '/vacancies-and-internships-as-of-may-2022' => '/work.html',
    '/global-south-perspectives' => '/work.html',
];

// Load CSV once per request into memory.
function loadLegacyMap(string $csvPath): array
{
    if (!is_file($csvPath)) {
        return [];
    }

    $map = [];
    if (($handle = fopen($csvPath, 'r')) !== false) {
        $header = fgetcsv($handle); // discard header
        while (($row = fgetcsv($handle)) !== false) {
            [$url, $type] = $row;
            $path = parse_url($url, PHP_URL_PATH);
            if ($path) {
                $map[$path] = strtoupper(trim($type));
            }
        }
        fclose($handle);
    }
    return $map;
}

function redirect(string $target): void
{
    header('Location: ' . $target, true, 301);
    exit;
}

function servePdf(string $legacyPath, string $root): void
{
    $prefix = '/wp-content/uploads';
    $remainder = str_starts_with($legacyPath, $prefix)
        ? substr($legacyPath, strlen($prefix))
        : $legacyPath;

    $safePath = '/assets/files' . $remainder;
    $fullPath = realpath($root . $safePath) ?: $root . $safePath;

    // Prevent path traversal outside the files directory.
    $filesRoot = realpath($root . '/assets/files');
    if ($filesRoot && str_starts_with(realpath($fullPath) ?: '', $filesRoot) && is_file($fullPath)) {
        header('Content-Type: application/pdf');
        header('Content-Disposition: inline; filename="' . basename($fullPath) . '"');
        header('Content-Length: ' . filesize($fullPath));
        readfile($fullPath);
        exit;
    }

    // If the file is missing, push to the archive page for discovery.
    redirect('/archive.html');
}

function chooseFallback(string $path): string
{
    $lower = strtolower($path);
    if (str_contains($lower, 'publication')) {
        return '/publications.html';
    }
    if (str_contains($lower, 'contact')) {
        return '/contact.html';
    }
    if (str_contains($lower, 'about') || str_contains($lower, 'board')) {
        return '/about.html';
    }
    if (str_contains($lower, 'grc') || str_contains($lower, 'prg') || str_contains($lower, 'un2100')) {
        return '/work.html';
    }
    return '/archive.html';
}

$legacyMap = loadLegacyMap($csvPath);
$uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?? '/';
$path = rtrim($uri, '/');
$path = $path === '' ? '/' : $path;

if (array_key_exists($path, $legacyMap)) {
    $type = $legacyMap[$path];
    if ($type === 'PDF') {
        servePdf($path, $root);
    }

    $target = $explicitRoutes[$path] ?? chooseFallback($path);
    redirect($target);
}

// If no legacy mapping exists, send visitors to the archive as a stable entry point.
redirect('/archive.html');
