import styled from 'styled-components';
import ContentCard, { CardExplanatoryText } from '../../../components/Layout/ContentCard';

// To use Html5QrcodeScanner (more info below)
// https://github.com/mebjas/html5-qrcode
import { Html5QrcodeScanner } from "html5-qrcode";

import { useCallback, useEffect, useRef } from 'react';
import { Html5QrcodeResult, QrcodeSuccessCallback } from 'html5-qrcode/esm/core';
import { useNavigate } from 'react-router-dom';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  justify-content: center;
  align-items: center;
  margin-bottom: 65px;
`;

export const ScanQrStep = (): JSX.Element => {

  const navigate = useNavigate();
  const scannerRef = useRef<HTMLDivElement>(null);

  const onScanSuccess: QrcodeSuccessCallback = useCallback((decodedText: string, decodedResult: Html5QrcodeResult) => {
    // handle the scanned code as you like, for example:
    console.log(`Code matched = ${decodedText}`, decodedResult);

    if (decodedText.startsWith('artworkId:')) {
      const artworkId = decodedText.slice('artworkId:'.length);
      navigate(`artwork/${artworkId}`);
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
    <Root>
      <ContentCard
        titleAlign='center'
        cardTitle='Scan QR'
        width='100%'
      >
        <CardExplanatoryText>
          Use your device's camera to take a picture of the QR code next to any artwork in this activity
          and select it from here.
        </CardExplanatoryText>
        <div id="reader" ref={scannerRef}></div>
      </ContentCard>
    </Root>
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