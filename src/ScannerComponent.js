import React from "react";

import { Button, Select, MenuItem } from "@material-ui/core";

import {
  BrowserMultiFormatReader,
  BarcodeFormat,
  DecodeHintType,
  NotFoundException
} from "@zxing/library";

export default function ScannerComponent(props) {
  const [loading, setLoading] = React.useState(props.loading || false);
  const [showButtons, setShowButtons] = React.useState(
    props.showButtons === true ? true : false
  );
  const [isRunning, setIsRunning] = React.useState(false);
  const [source, setSource] = React.useState("");
  const [devices, setDevices] = React.useState([]);
  const [scanResult, setScanResult] = React.useState("");
  const [codeReader, setCodeReader] = React.useState(
    new BrowserMultiFormatReader()
  );

  const [formats, setFormats] = React.useState([
    BarcodeFormat.QR_CODE,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.CODE_39,
    BarcodeFormat.CODE_128
  ]);
  const [hints, setHints] = React.useState(new Map());

  React.useEffect(() => {
    hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);

    // codeReader.getVideoInputDevices().then(videoInputDevices => {
    //   setSource(videoInputDevices[0].deviceId);
    //   if (videoInputDevices.length >= 1) {
    //     videoInputDevices.forEach(element => {
    //       setDevices([...devices, element]);
    //     });
    //   }
    // });
  }, []);

  React.useEffect(() => {
    setLoading(props.loading);
    setShowButtons(props.showButtons);
  }, [props.loading, props.showButtons]);

  React.useEffect(() => {
    if (props.started === true) {
      if (isRunning === false) {
        captureStart(props.onResult);
      }
    } else if (props.started === false) {
      if (isRunning === true) {
        captureStop();
      }
    } else {
    }
  }, [props.started]);

  const captureStart = (callback = () => {}, stopOnCapture = true) => {
    setIsRunning(true);
    codeReader.decodeFromVideoDevice(source, "video", (result, err) => {
      if (result) {
        setScanResult(result);
        if (stopOnCapture === true) {
          captureStop();
        }
        callback(result, err);
      }
      if (err && !(err instanceof NotFoundException)) {
        console.log("error", err);
      }
    });
  };

  const captureStop = () => {
    setIsRunning(false);
    codeReader.reset();
  };

  return (
    <div>
      {showButtons && (
        <div>
          <Button
            color="primary"
            variant="contained"
            onClick={() => captureStart(props.onResult)}
          >
            Scan Barcode
          </Button>{" "}
          <Button color="primary" variant="contained" onClick={captureStop}>
            Stop Scanner
          </Button>
        </div>
      )}

      <div>
        <video
          id="video"
          width="100%"
          height="100%"
          style={{ border: "1px solid gray" }}
        ></video>
      </div>

      <Select value={source} onChange={event => setSource(event.target.value)}>
        {devices.map((device, index) => {
          return (
            <MenuItem key={index} value={device.deviceId}>
              {device.label}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
}