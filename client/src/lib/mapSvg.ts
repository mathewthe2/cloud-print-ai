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
import type { ExcalidrawElementSkeleton } from "@excalidraw/excalidraw/types/data/transform";

const SVG_WIDTH = 60;
const SVG_HEIGHT = 60;
const SVG_OFFSET_X = 5;
const SVG_OFFSET_Y = 15;

const LABEL_OFFSET_X = 55;
const LABEL_OFFSET_Y = 0;
const LABEL_FONT_SIZE = 18;

interface GoogleIconData {
  svg: string;
  label: string;
}

const resourceDataMap: Record<string, GoogleIconData> = {
  clouddns: {
    svg: "/assets/google-cloud-icons/cloud_dns/cloud_dns.svg",
    label: "Cloud\nDNS",
  },
  loadbalanc: {
    svg: "/assets/google-cloud-icons/cloud_load_balancing/cloud_load_balancing.svg",
    label: "Cloud Load\nBalancing",
  },
  appen: {
    svg: "/assets/google-cloud-icons/app_engine/app_engine.svg",
    label: "App\nEngine",
  },
  cloudrun: {
    svg: "/assets/google-cloud-icons/cloud_run/cloud_run.svg",
    label: "Cloud Run",
  },
  cloudfun: {
    svg: "/assets/google-cloud-icons/cloud_functions/cloud_functions.svg",
    label: "Cloud\nFunctions",
  },
  firest: {
    svg: "/assets/google-cloud-icons/firestore/firestore.svg",
    label: "Firestore",
  },
};

export const labelMaps: Record<string, string> = {
  "Cloud DNS": "clouddns",
  "Cloud Load Balancing": "loadbalanc",
  "App Engine": "appen",
  "Cloud Run": "cloudrun",
  "Cloud Functions": "cloudfun",
  Firestore: "firest",
};

export const resourceDataKeys = Object.keys(resourceDataMap);

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
  const textElementSkeleton: ExcalidrawElementSkeleton[] = [];

  const elementIdsToDelete: string[] = [];

  for (let i = 0; i < elements.length; i++) {
    if (
      elements[i]["type"] === "text" &&
      (elements[i] as ExcalidrawTextElement)["text"].includes("XXXX")
    ) {
      const containerId =
        (elements[i] as ExcalidrawTextElement)["containerId"] ?? "";
      textContainerMap[containerId] = {};

      for (const resourceKey of Object.keys(resourceDataMap)) {
        const text = (elements[i] as ExcalidrawTextElement)["text"];
        // remove all whitespaces
        if (text.toLowerCase().replace(/\s/g, "").includes(resourceKey)) {
          textContainerMap[containerId].key = resourceKey;
          const dataURL = await loadSvg(resourceDataMap[resourceKey].svg);
          files.push({
            mimeType: "image/svg+xml",
            id: resourceKey as FileId,
            dataURL: dataURL as DataURL,
            created: Date.now(),
          });
          textElementSkeleton.push({
            type: "text",
            x: elements[i]["x"] + LABEL_OFFSET_X,
            y: elements[i]["y"] + LABEL_OFFSET_Y,
            text: resourceDataMap[resourceKey].label,
            fontSize: LABEL_FONT_SIZE,
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

  const textElements = convertToExcalidrawElements(textElementSkeleton);

  const svgElements = convertToExcalidrawElements(
    Object.values(textContainerMap).map((textContainer) => {
      return {
        fileId: (textContainer.key ?? "") as FileId,
        type: "image",
        x: textContainer.x != null ? textContainer.x + SVG_OFFSET_X : 0,
        y: textContainer.y != null ? textContainer.y + SVG_OFFSET_Y : 0,
        width: SVG_WIDTH,
        height: SVG_HEIGHT,
        backgroundColor: "",
      };
    })
  );

  // console.log("files", files);

  return {
    elements: [...elements, ...svgElements, ...textElements],
    files: files,
  };
};
