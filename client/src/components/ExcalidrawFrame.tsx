import { Excalidraw } from "@excalidraw/excalidraw";
import { useEffect, useState } from "react";
import { convertToExcalidrawElements } from "@excalidraw/excalidraw";
import { parseMermaidToExcalidraw } from "@excalidraw/mermaid-to-excalidraw";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { mapTextWithSvg } from "../lib/mapSvg";

// const mermaidSyntax = `
// graph LR
//     subgraph Client
//         A[User Device]
//         B[Mobile Device]
//     end

//     subgraph Publisher
//         P[Publisher]
//     end

//     A --> C[Cloud DNS\nXXXXXXXXXXXXXXXXX\nXXXXXXXXXXXXXXXXXX]
//     B --> C
//     C --> D[Cloud Load Balancer\nXXXXXXXXXXXXXXXXX\nXXXXXXXXXXXXXXXXX]

//     D --> E[Content Server Zone A]
//     D --> F[Content Server Zone B]

//     E --> G[Static Content]
//     E --> H[Dynamic Content]

//     F --> G
//     F --> H

//     P --> D
// `;

// const mermaidSyntax = `
// flowchart LR\n    subgraph User\n        A[User Browser] -- GET/POST --> CDN\n    end\n\n    subgraph Google Cloud\n        CDN[Cloud CDN] -- Cache Hit --> A\n        CDN -- Cache Miss --> LB\n        LB[Cloud Load Balancer] -- Route Requests --> CF\n        CF[Cloud Functions\nXXXXXXXXXXXXXXXXX\nXXXXXXXXXXXXXXXXXX] -- Read/Write --> DB\n        DB[Firestore] -- Data --> CF\n        CF -- JSON Response --> LB\n    end\n\n    subgraph Third-Party Services\n        PAY[Payment Gateway] -- API Calls --> CF\n    end\n\n    style A fill:#f9f,stroke:#333,stroke-width:2px\n    style CDN fill:#ccf,stroke:#333,stroke-width:2px\n    style LB fill:#ccf,stroke:#333,stroke-width:2px\n    style CF fill:#ccf,stroke:#333,stroke-width:2px\n    style DB fill:#ccf,stroke:#333,stroke-width:2px\n    style PAY fill:#ccf,stroke:#333,stroke-width:2px\n\n    classDef default fill:#f9f,stroke:#333,stroke-width:2px;\n
// `;

// const mermaidSyntax = `
// graph LR
//     subgraph ユーザー
//         A[ユーザー]
//     end

//     subgraph Google Cloud
//         subgraph App Engine
//             B[Frontend (React, Vue.jsなど)]
//             C[Backend (Python, Node.js, Goなど)]
//         end

//         D[Cloud SQL (MySQL, PostgreSQL)]
//         E[Cloud Storage (商品画像, 静的ファイル)]
//         F[Cloud CDN]
//     end

//     A --> F
//     F --> B
//     B --> C
//     C --> D
//     C --> E

//     style A fill:#f9f,stroke:#333,stroke-width:2px
//     style B fill:#ccf,stroke:#333,stroke-width:2px
//     style C fill:#ccf,stroke:#333,stroke-width:2px
//     style D fill:#ccf,stroke:#333,stroke-width:2px
//     style E fill:#ccf,stroke:#333,stroke-width:2px
//     style F fill:#ccf,stroke:#333,stroke-width:2px

//     linkStyle 0,1,2,3,4,5 stroke:#333,stroke-width:2px
// `;

const ExcalidrawFrame = ({ mermaidSyntax }: { mermaidSyntax: string }) => {
  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null);

  useEffect(() => {
    if (excalidrawAPI != null) {
      init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mermaidSyntax, excalidrawAPI]);

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
    <div style={{ height: "800px" }}>
      <Excalidraw
        excalidrawAPI={(api) => setExcalidrawAPI(api)}
        // onChange={(events) => console.log(events)}
        // onPointerDown={(event) => console.log(event)}
        // langCode={"ja"}
      />
    </div>
  );
};

export default ExcalidrawFrame;
