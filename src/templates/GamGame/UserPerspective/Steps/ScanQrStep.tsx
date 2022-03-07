// To use Html5QrcodeScanner (more info below)
// https://github.com/mebjas/html5-qrcode
import { Html5QrcodeScanner } from "html5-qrcode";

import { useCallback, useEffect, useRef } from 'react';
import { Html5QrcodeResult, QrcodeSuccessCallback } from 'html5-qrcode/esm/core';
import { useNavigate } from 'react-router-dom';
import StepTitleCard from '../../../../components/Forms/Cards/StepTitleCard';
import { StepRoot } from "../../components/generalStyles";
import { useTranslation } from "react-i18next";

export const ScanQrStep = (): JSX.Element => {

  const { t } = useTranslation('gamGame');

  const navigate = useNavigate();
  const scannerRef = useRef<HTMLDivElement>(null);

  const onScanSuccess: QrcodeSuccessCallback = useCallback((decodedText: string, decodedResult: Html5QrcodeResult) => {
    // handle the scanned code as you like, for example:
    console.log(`Code matched = ${decodedText}`, decodedResult);

    if (decodedText.startsWith('artworkId:')) {
      const artworkId = decodedText.slice('artworkId:'.length);
      navigate(`../collection/${artworkId}`);
    }
  }, [navigate]);

  const onScanFailure = useCallback((error: any) => {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.warn(`Code scan error = ${error}`);
  }, []);

  useEffect(() => {

    if (!scannerRef.current) return;

    let html5QrcodeScanner = new Html5QrcodeScanner(
      scannerRef.current.id,
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false);

    html5QrcodeScanner.render(onScanSuccess, onScanFailure);

    return () => {
      html5QrcodeScanner.clear();
    }
  }, [scannerRef, onScanFailure, onScanSuccess]);

  return (
    <StepRoot>
      <StepTitleCard
        stepTitle={t('scanQr')}
        stepDescription={t('scanQrDescription')}
      >
        <div id="reader" ref={scannerRef}></div>
      </StepTitleCard>
    </StepRoot>
  );
}

export default ScanQrStep;

/*
 const [qrScanner, setQrScanner] = useState<QrScanner | undefined>(undefined);

  const qrVideo = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (qrVideo.current != null) {
      setQrScanner(
        new QrScanner(
          qrVideo.current,
          result => console.log('decoded qr code:', result)
        )
      );
    }
  }, [qrVideo]);

  useEffect(() => {
    if (qrScanner && QrScanner.hasCamera()) {
      qrScanner.start();
    }
  }, [qrScanner]);

  useEffect(() => {
    return () => {
      qrScanner?.destroy();
    };
  }, []);

  <video ref={qrVideo} />
*/