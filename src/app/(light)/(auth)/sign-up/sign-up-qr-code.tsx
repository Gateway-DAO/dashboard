'use client';
import routes from '@/constants/routes';
import QRCode from 'react-qr-code';

export default function SignUpQrCode() {
  const url = new URL(routes.appStore, window.location.origin);
  return <QRCode value={url.toString()} size={380 - 34} />;
}
