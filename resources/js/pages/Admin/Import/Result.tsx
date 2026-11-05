import { Alert, List, ListItem, Stack, Typography } from '@mui/material';

export type ImportResultData = {
    imported: number;
    skipped: number;
    failed: number;
    errors: { row: number; reason: string }[];
};

export default function ImportResult({ result }: { result?: ImportResultData }) {
    if (!result) return null;

    return <Stack spacing={1}>
        <Alert severity="success">Imported: {result.imported}</Alert>
        <Alert severity="info">Skipped: {result.skipped}</Alert>
        <Alert severity={result.failed > 0 ? 'error' : 'success'}>Failed: {result.failed}</Alert>
        {result.errors.length > 0 && <><Typography variant="h6">Details</Typography><List>{result.errors.map((error) => <ListItem key={`${error.row}-${error.reason}`}>Baris {error.row}: {error.reason}</ListItem>)}</List></>}
    </Stack>;
}
