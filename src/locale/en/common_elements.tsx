import ScanIcon from '@/components/icons/scan';
import reactStringReplace from 'react-string-replace';

export const common_elements = {
  scan_message: reactStringReplace(
    'Tap the $1 Scan icon on Gateway Wallet app to scan the QR code below.',
    /(\$\d)/g,
    (match) => <ScanIcon sx={{ verticalAlign: 'sub' }} key={match} />
  ),
};
