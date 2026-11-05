<?php

namespace App\Services;

use App\Models\ClassRoom;
use App\Models\Student;
use Carbon\Carbon;
use RuntimeException;

class StudentImportService
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
        $expected = ['name', 'nis', 'gender', 'birth_date', 'birth_place', 'class_name'];

        if ($header !== $expected) {
            fclose($handle);
            throw new RuntimeException('Header student.csv tidak sesuai.');
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
            $required = ['name', 'nis', 'gender', 'birth_date', 'birth_place', 'class_name'];

            if ($this->hasEmptyValue($data, $required)) {
                $this->failed($result, $rowNumber, 'Semua field Student wajib diisi.');
                continue;
            }

            if (isset($seen[$data['nis']]) || Student::where('nis', $data['nis'])->exists()) {
                $result['skipped']++;
                continue;
            }

            if (! in_array($data['gender'], ['male', 'female'], true)) {
                $this->failed($result, $rowNumber, 'Gender harus male atau female.');
                continue;
            }

            $birthDate = Carbon::createFromFormat('!Y-m-d', $data['birth_date']);

            if ($birthDate === false || $birthDate->format('Y-m-d') !== $data['birth_date'] || $birthDate->isFuture()) {
                $this->failed($result, $rowNumber, 'Birth date harus berformat YYYY-MM-DD dan bukan tanggal masa depan.');
                continue;
            }

            $classRoom = ClassRoom::where('name', $data['class_name'])->first();

            if ($classRoom === null) {
                $this->failed($result, $rowNumber, 'ClassRoom tidak ditemukan.');
                continue;
            }

            Student::create([
                'class_id' => $classRoom->id,
                'nis' => $data['nis'],
                'name' => $data['name'],
                'gender' => $data['gender'],
                'birth_date' => $data['birth_date'],
                'birth_place' => $data['birth_place'],
            ]);

            $seen[$data['nis']] = true;
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

    private function hasEmptyValue(array $data, array $keys): bool
    {
        foreach ($keys as $key) {
            if (($data[$key] ?? '') === '') {
                return true;
            }
        }

        return false;
    }

    private function failed(array &$result, int $row, string $reason): void
    {
        $result['failed']++;
        $result['errors'][] = ['row' => $row, 'reason' => $reason];
    }
}
