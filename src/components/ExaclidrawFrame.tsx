import { Excalidraw } from "@excalidraw/excalidraw";
import { useEffect, useState } from "react";
import { convertToExcalidrawElements } from "@excalidraw/excalidraw";
import { parseMermaidToExcalidraw } from "@excalidraw/mermaid-to-excalidraw";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { mapTextWithSvg } from "../lib/mapSvg";

const mermaidSyntax = `
graph LR
    subgraph Client
        A[User Device]
        B[Mobile Device]
    end

    subgraph Publisher
        P[Publisher]
    end

    A --> C[Cloud DNS\nXXXXXXXXXXXXX\nXXXXXXXXXXXXX\nXXXXXXXXXXXXX]
    B --> C
    C --> D[Cloud Load Balancer\nXXXXXXXXXXXXX\nXXXXXXXXXXXXX\nXXXXXXXXXXXXX]

    D --> E[Content Server Zone A]
    D --> F[Content Server Zone B]

    E --> G[Static Content]
    E --> H[Dynamic Content]

    F --> G
    F --> H

    P --> D
`;

const ExcalidrawFrame = () => {
  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null);

  useEffect(() => {
    if (excalidrawAPI != null) {
      init();
    }
  }, [excalidrawAPI]);

  const init = async () => {
    await initMermaid();
    await mapIcons();
  };

  const initMermaid = async () => {
    try {
      const { elements, files } = await parseMermaidToExcalidraw(
        mermaidSyntax,
        {
          themeVariables: {
            fontSize: "14px",
          },
        }
      );
      const excalidrawElements = convertToExcalidrawElements(elements);

      excalidrawAPI?.updateScene({
        elements: excalidrawElements,
      });
      if (files != null) {
        excalidrawAPI?.addFiles(Object.values(files));
      }

      excalidrawAPI?.scrollToContent();
    } catch (e) {
      // Parse error, displaying error message to users
      console.error(e);
    }
  };

  const mapIcons = async () => {
    const elements = excalidrawAPI?.getSceneElements() ?? [];

    const mappedSvgOutput = await mapTextWithSvg(
      elements as ExcalidrawElement[]
    );

    excalidrawAPI?.addFiles(mappedSvgOutput.files);

    excalidrawAPI?.updateScene({
      elements: mappedSvgOutput.elements,
    });
  };

  return (
    <div style={{ height: "500px" }}>
      <Excalidraw
        // initialData={{
        //   elements: elements,
        // }}
        excalidrawAPI={(api) => setExcalidrawAPI(api)}
        // onChange={(events) => console.log(events)}
        // onPointerDown={(event) => console.log(event)}
        // langCode={"ja"}
      />
    </div>
  );
};

export default ExcalidrawFrame;
