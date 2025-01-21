type Point = [number, number];

interface ElementBase {
  type: string; // Generic type to allow various element types
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface LineElement extends ElementBase {
  type: "line";
  points: Point[];
}

export interface TextElement extends ElementBase {
  type: "text";
  fontSize: number;
}

interface EllipseElement extends ElementBase {
  type: "ellipse";
  strokeWidth: number;
  strokeStyle: string;
  fillStyle: string;
  strokeColor: string;
  backgroundColor: string;
}

export type Element = LineElement | TextElement | EllipseElement;

// interface BoundingBox {
//   x: number;
//   y: number;
//   w: number;
//   h: number;
// }

// function resizeElementsToBoundingBox(
//   elements: Element[],
//   boundingBox: BoundingBox
// ): Element[] {
//   const {
//     x: targetX,
//     y: targetY,
//     w: targetWidth,
//     h: targetHeight,
//   } = boundingBox;

//   // 1. Calculate the current bounding box of elements
//   // let minX = Infinity,
//   //   minY = Infinity,
//   //   maxX = -Infinity,
//   //   maxY = -Infinity;

//   // elements.forEach((el) => {
//   //   const elMinX = el.x;
//   //   const elMinY = el.y;
//   //   const elMaxX = el.x + el.width;
//   //   const elMaxY = el.y + el.height;

//   //   minX = Math.min(minX, elMinX);
//   //   minY = Math.min(minY, elMinY);
//   //   maxX = Math.max(maxX, elMaxX);
//   //   maxY = Math.max(maxY, elMaxY);
//   // });

//   // const currentWidth = maxX - minX;
//   // const currentHeight = maxY - minY;

//   // 2. Calculate the scaling factor
//   // const scaleX = targetWidth / el.width;
//   // const scaleY = targetHeight / currentHeight;
//   // const scale = Math.min(scaleX, scaleY); // Maintain aspect ratio

//   console.log("targetWidth", targetWidth);

//   // 3. Apply scaling and repositioning
//   const resizedElements = elements.map((el) => {
//     const scaleX = targetWidth / el.width;
//     const scaleY = targetHeight / el.height;
//     const scale = Math.min(scaleX, scaleY);

//     // Scale the position
//     const newX = targetX * scale;
//     const newY = targetY * scale;

//     // Scale the size
//     const newWidth = el.width * scale;
//     const newHeight = el.height * scale;

//     // Handle specific properties based on element type
//     if (el.type === "line") {
//       // return el;
//       console.log("el.width", el.width);
//       console.log("scale2", scale);
//       return {
//         ...el,
//         x: newX,
//         y: newY,
//         width: newWidth,
//         height: newHeight,
//         points: el.points.map(([px, py]) => [px * scale, py * scale] as Point),
//       };
//     } else if (el.type === "text") {
//       return el;
//       return {
//         ...el,
//         x: newX,
//         y: newY,
//         width: newWidth,
//         height: newHeight,
//         fontSize: el.fontSize * scale,
//       };
//     } else if (el.type === "ellipse") {
//       return {
//         ...el,
//         x: newX,
//         y: newY,
//         width: newWidth,
//         height: newHeight,
//         strokeWidth: el.strokeWidth * scale,
//       };
//     }

//     return el; // Default return if the type is unrecognized
//   });

//   return resizedElements;
// }
// function resizeElementsToBoundingBox(
//   elements: Element[],
//   boundingBox: BoundingBox
// ): Element[] {
//   const {
//     x: targetX,
//     y: targetY,
//     w: targetWidth,
//     h: targetHeight,
//   } = boundingBox;

//   // Calculate the original bounding box of the elements
//   let minX = Infinity,
//     minY = Infinity,
//     maxX = -Infinity,
//     maxY = -Infinity;

//   elements.forEach((el) => {
//     minX = Math.min(minX, el.x);
//     minY = Math.min(minY, el.y);
//     maxX = Math.max(maxX, el.x + el.width);
//     maxY = Math.max(maxY, el.y + el.height);
//   });

//   const originalWidth = maxX - minX;
//   const originalHeight = maxY - minY;

//   // Calculate scaling factors
//   const scaleX = targetWidth / originalWidth;
//   const scaleY = targetHeight / originalHeight;

//   // Use the smaller scaling factor to maintain aspect ratio
//   const scale = Math.min(scaleX, scaleY);

//   // Calculate the offset to center the scaled elements in the target bounding box
//   // const offsetX =
//   //   targetX + (targetWidth - originalWidth * scale) / 2 - minX * scale;
//   // const offsetY =
//   //   targetY + (targetHeight - originalHeight * scale) / 2 - minY * scale;

//   // Apply scaling and maintain relative positioning
//   return elements.map((el) => {
//     const newX = el.x * scale; // + offsetX;
//     const newY = el.y * scale; // + offsetY;
//     const newWidth = el.width * scale;
//     const newHeight = el.height * scale;

//     if (el.type === "line") {
//       const scaledPoints = el.points.map(
//         ([px, py]) => [px * scale, py * scale] as Point
//       );

//       return {
//         ...el,
//         x: newX,
//         y: newY,
//         width: newWidth,
//         height: newHeight,
//         points: scaledPoints,
//       };
//     } else if (el.type === "text") {
//       return {
//         ...el,
//         x: newX,
//         y: newY,
//         width: newWidth,
//         height: newHeight,
//         fontSize: el.fontSize * scale,
//       };
//     } else if (el.type === "ellipse") {
//       return {
//         ...el,
//         x: newX,
//         y: newY,
//         width: newWidth,
//         height: newHeight,
//         strokeWidth: el.strokeWidth * scale,
//       };
//     }

//     console.log("scale?", scale);

//     return {
//       ...(el as Element),
//       x: newX,
//       y: newY,
//       width: newWidth,
//       height: newHeight,
//     };
//   });
// }

// Example usage
// const elements: Element[] = [
//   {
//     type: "line",
//     x: -301,
//     y: -148,
//     width: 168,
//     height: 224,
//     points: [
//       [0, 0],
//       [-81, -81],
//       [0, -163],
//       [40, -122],
//     ],
//   },
//   {
//     type: "text",
//     x: -422,
//     y: -110,
//     width: 241,
//     height: 76,
//     fontSize: 33.4,
//   },
//   {
//     type: "ellipse",
//     x: -42.7315,
//     y: 1166.6988,
//     width: 145.5584,
//     height: 145.5584,
//     strokeWidth: 1,
//     strokeStyle: "solid",
//     fillStyle: "solid",
//     strokeColor: "#000000",
//     backgroundColor: "#4285F4",
//   },
// ];

// const boundingBox: BoundingBox = { x: 0, y: 0, w: 500, h: 500 };
// const resizedElements = resizeElementsToBoundingBox(elements, boundingBox);

// console.log(resizedElements);

// export default resizeElementsToBoundingBox;

export function getBoundingBox(elements: Element[]): {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
} {
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;

  for (const element of elements) {
    if (element.type === "line") {
      element.points.forEach(([x, y]) => {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      });
    } else if (element.type === "text") {
      // Text bounding box based on element's x, y, width, and height
      minX = Math.min(minX, element.x);
      minY = Math.min(minY, element.y);
      maxX = Math.max(maxX, element.x + element.width);
      maxY = Math.max(maxY, element.y + element.height);
    }
  }

  return { minX, minY, maxX, maxY };
}

function calculateScalingFactor(
  original: { minX: number; minY: number; maxX: number; maxY: number },
  target: { x: number; y: number; w: number; h: number }
): number {
  const originalWidth = original.maxX - original.minX;
  const originalHeight = original.maxY - original.minY;
  const targetWidth = target.w;
  const targetHeight = target.h;

  // Find the scaling factor that preserves the aspect ratio
  const scaleX = targetWidth / originalWidth;
  const scaleY = targetHeight / originalHeight;
  return Math.min(scaleX, scaleY); // Scale uniformly
}

function scaleElement(
  element: Element,
  scale: number,
  offsetX: number,
  offsetY: number
) {
  if (element.type === "line") {
    element.points = element.points.map(([x, y]) => [
      (x - offsetX) * scale + offsetX,
      (y - offsetY) * scale + offsetY,
    ]);
  } else if (element.type === "text") {
    element.x = (element.x - offsetX) * scale + offsetX;
    element.y = (element.y - offsetY) * scale + offsetY;
    element.width *= scale;
    element.height *= scale;
    element.fontSize *= scale;
  }
}

function resizeElementsToBoundingBox(
  elements: Element[],
  target: { x: number; y: number; w: number; h: number }
) {
  // Step 1: Get the original bounding box of all elements
  const originalBoundingBox = getBoundingBox(elements);

  // Step 2: Calculate the scaling factor to fit the elements inside the target bounding box
  const scale = calculateScalingFactor(originalBoundingBox, target);

  // Step 3: Find the center of the original bounding box
  const originalCenterX =
    (originalBoundingBox.minX + originalBoundingBox.maxX) / 2;
  const originalCenterY =
    (originalBoundingBox.minY + originalBoundingBox.maxY) / 2;

  // Step 4: Find the center of the target bounding box
  const targetCenterX = target.x + target.w / 2;
  const targetCenterY = target.y + target.h / 2;

  // Step 5: Calculate the offsets (translation) to align the centers
  const offsetX = targetCenterX - originalCenterX;
  const offsetY = targetCenterY - originalCenterY;

  // Step 6: Scale and translate elements
  elements.forEach((element) => {
    // Step 6.1: Apply scaling based on the original bounding box center
    scaleElement(element, scale, originalCenterX, originalCenterY);

    // Step 6.2: Apply translation (offsets) to the scaled elements
    if (element.type === "line") {
      element.points = element.points.map(([x, y]) => [
        x * scale + offsetX, // Apply scaling and translation to each point's x-coordinate
        y * scale + offsetY, // Apply scaling and translation to each point's y-coordinate
      ]);
    } else if (element.type === "text") {
      // Apply scaling and translation to text element's x, y, width, height
      element.x = element.x * scale + offsetX;
      element.y = element.y * scale + offsetY;
      element.width *= scale;
      element.height *= scale;
      element.fontSize *= scale;
    }
  });

  // Return the scaled and translated elements
  return elements;
}

// const boundingBox = { x: 100, y: 100, w: 400, h: 300 };
// const elements = [
//   /* your array of elements */
// ];
// const scaledElements = fitElementsToBoundingBox(elements, boundingBox);
// console.log(scaledElements);

export default resizeElementsToBoundingBox;
