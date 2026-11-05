<?php

namespace App\Services;

use App\Models\Teacher;
use RuntimeException;

class TeacherImportService
{
    public function import(string $path): array
    {
        $handle = fopen($path, 'rb');

        if ($handle === false) {
            throw new RuntimeException('File CSV tidak dapat dibaca.');
        }

        $result = $this->emptyResult();
        $header = fgetcsv($handle);
        $header = $this->normalizeHeader($header);

        if ($header !== ['name', 'mobile_phone']) {
            fclose($handle);
            throw new RuntimeException('Header teacher.csv tidak sesuai.');
        }

        $seen = [];
        $rowNumber = 1;

        while (($row = fgetcsv($handle)) !== false) {
            $rowNumber++;

            if ($this->isEmptyRow($row)) {
                continue;
            }

            if (count($row) !== count($header)) {
                $this->failed($result, $rowNumber, 'Jumlah kolom tidak sesuai.');
                continue;
            }

            $data = array_combine($header, array_map('trim', $row));
            $phone = $data['mobile_phone'];

            if ($data['name'] === '' || $phone === '') {
                $this->failed($result, $rowNumber, 'Name dan mobile_phone wajib diisi.');
                continue;
            }

            if (isset($seen[$phone]) || Teacher::where('mobile_phone', $phone)->exists()) {
                $result['skipped']++;
                continue;
            }

            Teacher::create($data);
            $seen[$phone] = true;
            $result['imported']++;
        }

        fclose($handle);

        return $result;
    }

    private function emptyResult(): array
    {
        return ['imported' => 0, 'skipped' => 0, 'failed' => 0, 'errors' => []];
    }

    private function normalizeHeader(?array $header): array
    {
        if ($header === null) {
            return [];
        }

        $header[0] = preg_replace('/^\xEF\xBB\xBF/', '', $header[0]);

        return array_map('trim', $header);
    }

    private function isEmptyRow(array $row): bool
    {
        return count($row) === 1 && trim((string) $row[0]) === '';
    }

    private function failed(array &$result, int $row, string $reason): void
    {
        $result['failed']++;
        $result['errors'][] = ['row' => $row, 'reason' => $reason];
    }
}
