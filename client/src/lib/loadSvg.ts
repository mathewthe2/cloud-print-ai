import { type DataURL } from "@excalidraw/excalidraw/types/types";

const loadSvg = async (fileUrl: string) => {
  try {
    // const svgUrl = new URL(fileUrl, import.meta.url).toString();
    const response = await fetch(fileUrl);
    const arrayBuffer = await response.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    const blob = new Blob([uint8Array], { type: "image/svg+xml" });
    const dataURL = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
    return dataURL as DataURL;
  } catch (error) {
    console.error("Error loading SVG file as binary:", error);
  }
};

export default loadSvg;
