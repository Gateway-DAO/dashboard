import QRCode, { QRCodeProps } from 'react-qr-code';

export default function GtwQRCode(props: Omit<QRCodeProps, 'ref'>) {
  return (
    <QRCode
      {...props}
      viewBox="0 0 256 256"
      style={{
        height: 'auto',
        maxWidth: '100%',
        width: '100%',
      }}
    />
  );
}
