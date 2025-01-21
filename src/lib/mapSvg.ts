import { convertToExcalidrawElements } from "@excalidraw/excalidraw";
import type {
  ExcalidrawElement,
  ExcalidrawTextElement,
  FileId,
} from "@excalidraw/excalidraw/types/element/types";
import type {
  BinaryFileData,
  DataURL,
} from "@excalidraw/excalidraw/types/types";
import loadSvg from "./loadSvg";

const SVG_WIDTH = 60;
const SVG_HEIGHT = 60;

// file key to svg location
const resourceLocationMap: Record<string, string> = {
  clouddns: "../assets/google-cloud-icons/cloud_dns/cloud_dns.svg",
  loadbalanc:
    "../assets/google-cloud-icons/cloud_load_balancing/cloud_load_balancing.svg",
};

interface TextContainer {
  key?: string;
  x?: number;
  y?: number;
}

interface MapTextWithSvgOutput {
  elements: ExcalidrawElement[];
  files: BinaryFileData[];
}

export const mapTextWithSvg = async (
  elements: ExcalidrawElement[]
): Promise<MapTextWithSvgOutput> => {
  const textContainerMap: Record<string, TextContainer> = {};
  const files: BinaryFileData[] = [];

  const elementIdsToDelete: string[] = [];

  for (let i = 0; i < elements.length; i++) {
    if (
      elements[i]["type"] === "text" &&
      (elements[i] as ExcalidrawTextElement)["text"].includes("XXXX")
    ) {
      const containerId =
        (elements[i] as ExcalidrawTextElement)["containerId"] ?? "";
      textContainerMap[containerId] = {};

      for (const resourceKey of Object.keys(resourceLocationMap)) {
        const text = (elements[i] as ExcalidrawTextElement)["text"];
        // remove all whitespaces
        if (text.toLowerCase().replace(/\s/g, "").includes(resourceKey)) {
          textContainerMap[containerId].key = resourceKey;
          const dataURL = await loadSvg(resourceLocationMap[resourceKey]);
          files.push({
            mimeType: "image/svg+xml",
            id: resourceKey as FileId,
            dataURL: dataURL as DataURL,
            created: Date.now(),
          });
        }
      }

      // remove the placeholder text element
      elementIdsToDelete.push(elements[i]["id"]);
    }
  }

  for (let i = 0; i < elements.length; i++) {
    if (Object.keys(textContainerMap).includes(elements[i]["id"])) {
      textContainerMap[elements[i]["id"]]["x"] = elements[i]["x"];
      textContainerMap[elements[i]["id"]]["y"] = elements[i]["y"];
    }
  }

  elements = elements.filter(
    (element) => !elementIdsToDelete.includes(element.id)
  );

  const svgElements = convertToExcalidrawElements(
    Object.values(textContainerMap).map((textContainer) => {
      return {
        fileId: (textContainer.key ?? "") as FileId,
        type: "image",
        x: textContainer.x ?? 0,
        y: textContainer.y ?? 0,
        width: SVG_WIDTH,
        height: SVG_HEIGHT,
        backgroundColor: "",
      };
    })
  );

  console.log("files", files);

  return {
    elements: [...elements, ...svgElements],
    files: files,
  };
};
