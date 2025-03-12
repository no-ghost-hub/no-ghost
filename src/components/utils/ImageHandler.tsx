import {
  Button,
  FileTrigger,
  Label,
  Slider,
  SliderOutput,
  SliderThumb,
  SliderTrack,
  ToggleButton,
  ToggleButtonGroup,
} from "react-aria-components";
import Link from "@/components/elements/Link";
import Text from "@/components/elements/Text";
import { useEffect, useRef, useState } from "react";
import { burn } from "@/utils/burnImage";
import { useWindowSize } from "react-use";

const ImageHandler = () => {
  const previewCanvasEl = useRef<HTMLCanvasElement>(null);
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const image = useRef(new Image());
  const reader = new FileReader();

  function handleFiles(files: FileList | null) {
    if (files) {
      const file = files[0];
      reader.readAsDataURL(file);
    }
  }

  reader.addEventListener("load", (e) => {
    const imgData = e.target?.result;
    if (imgData) {
      image.current.src = imgData as string;
    }
  });

  image.current.addEventListener("load", () => {
    drawImage();
  });

  function drawImage() {
    const previewCanvas = previewCanvasEl.current;
    const canvas = canvasEl.current;
    if (!canvas || !previewCanvas) return;
    const parent = previewCanvas.parentElement;
    if (!parent) return;

    const ratio = image.current.width / image.current.height;
    const width = parent.clientWidth;
    const height = width / ratio;

    previewCanvas.width = width;
    previewCanvas.height = height;
    canvas.width = image.current.width;
    canvas.height = image.current.height;

    const previewCtx = previewCanvas.getContext("2d");
    const ctx = canvas.getContext("2d");
    if (!ctx || !previewCtx) return;
    previewCtx.reset();
    previewCtx.drawImage(image.current, 0, 0, width, height);
    ctx.reset();
    ctx.drawImage(image.current, 0, 0);
  }

  const [color, setColor] = useState("orange");

  const colors: {
    id: string;
    name: string;
    value: [number, number, number];
  }[] = [
    {
      id: "orange",
      name: "Orange",
      value: [255, 105, 5],
    },
    {
      id: "blue",
      name: "Blue",
      value: [25, 155, 255],
    },
    {
      id: "green",
      name: "Green",
      value: [190, 240, 210],
    },
    {
      id: "yellow",
      name: "Yellow",
      value: [255, 245, 165],
    },
  ];

  const [tolerance, setTolerance] = useState(50);

  function download() {
    if (canvasEl.current) {
      const a = document.createElement("a");
      a.href = canvasEl.current.toDataURL("image/jpeg", 0.8);
      a.download = "burned.jpeg";
      a.click();
    }
  }

  function handleCanvasClick(e: React.MouseEvent<HTMLCanvasElement>) {
    drawImage();
    const previewCanvas = previewCanvasEl.current;
    const canvas = canvasEl.current;

    if (!previewCanvas || !canvas) return;

    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    burn({
      canvas,
      previewCanvas,
      x,
      y,
      color: colors.find((c) => c.id === color)?.value || colors[0].value,
      tolerance,
    });
  }

  const { width } = useWindowSize();

  useEffect(() => {
    drawImage();
  }, [width]);

  return (
    <div className="grid bg-white">
      <FileTrigger acceptedFileTypes={["image/*"]} onSelect={handleFiles}>
        <div className="grid">
          <Link theme="button" background="orange">
            <Text>Upload</Text>
          </Link>
        </div>
      </FileTrigger>
      <ToggleButtonGroup
        selectedKeys={[color]}
        onSelectionChange={(keys) => setColor(Array.from(keys)[0] as string)}
        className="grid grid-flow-col"
        disallowEmptySelection={true}
      >
        {colors.map(({ id, name }) => (
          <ToggleButton
            key={id}
            id={id}
            className="custom-underline data-selected:bg-grey cursor-pointer"
          >
            <div className="p-xs">
              <Text tag="div" wrap={false}>
                {name}
              </Text>
            </div>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <Slider
        value={tolerance}
        onChange={setTolerance}
        minValue={0}
        maxValue={100}
        className="p-xs gap-xs grid"
      >
        <Label className="grid justify-items-center">
          <Text tag="div" align="center">
            Tolerance
          </Text>
        </Label>
        <SliderTrack className="h-xs relative grid cursor-pointer before:absolute before:top-1/2 before:h-[0.1em] before:w-full before:-translate-y-1/2 before:bg-black">
          <SliderThumb className="h-xs bg-orange top-1/2 w-xs" />
        </SliderTrack>
      </Slider>
      <div>
        <canvas
          ref={previewCanvasEl}
          onClick={handleCanvasClick}
          className="w-full"
        />
      </div>
      <canvas ref={canvasEl} className="hidden" />
      <Link theme="button" background="orange" onClick={download}>
        <Text>Download</Text>
      </Link>
    </div>
  );
};

export default ImageHandler;
