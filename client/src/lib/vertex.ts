import { getVertexAI, getGenerativeModel, Schema } from "firebase/vertexai";
import example from "./examples";
import { labelMaps } from "./mapSvg";
import { replaceCaseInsensitive } from "../utils/string";
import firebaseApp from "./firebaseapp";

export interface DiagramProposalInterface {
  description: string;
  diagram: string;
  runningCost: string;
  terraform: string;
  title: string;
}

// Initialize the Vertex AI service
const vertexAI = getVertexAI(firebaseApp);

// Provide a JSON schema object using a standard format.
// Later, pass this schema object into `responseSchema` in the generation config.
const jsonSchema = Schema.object({
  properties: {
    proposals: Schema.array({
      items: Schema.object({
        properties: {
          title: Schema.string(),
          description: Schema.string(),
          diagram: Schema.string(),
          terraform: Schema.string(),
          runningCost: Schema.string(),
        },
      }),
    }),
  },
});

// Initialize the generative model with a model that supports your use case
const model = getGenerativeModel(vertexAI, {
  model: "gemini-2.0-flash-001",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: jsonSchema,
  },
});

const promptContext = `
    I would like to design a system architecture using Google Cloud services.
    The mermaid output should start with the diagram type,
    and DO NOT APPLY any style or STYLE keyword to google service objects.

    Mermaid and terraform has to be in English.
    Title, description, and running cost should be in Japanese.
    Also, give terraform code that would be deployable to Google Cloud, and estimate the running cost with a number in USD.

    For the output, I would like 3 proposed Mermaid diagrams.

    Order the proposals based on the best fit for the requirements.

    Here are the system requirements.
    
    \n
`;

const parseDiagram = (diagram: string) => {
  if (diagram.includes("graph")) {
    diagram = "graph" + diagram.split(/graph(.*)/s)[1];
  } else if (diagram.includes("flowchart")) {
    diagram = "flowchart" + diagram.split(/flowchart(.*)/s)[1];
  }

  diagram = replaceCaseInsensitive(diagram, "```", "");

  for (const key of Object.keys(labelMaps)) {
    if (diagram.toLowerCase().includes(key.toLowerCase())) {
      diagram = replaceCaseInsensitive(
        diagram,
        key,
        labelMaps[key] + "\nXXXXXXXXXXXXXXXXXX\nXXXXXXXXXXXXXXXXXX"
      );
    }
  }
  return diagram;

  // const regex = new RegExp(`\\b\\w*(${labels.join("|")})\\w*\\b`, "gi");

  // return diagram.replace(
  //   regex,
  //   (match) => `${match}\nXXXXXXXXXXXXXXXXXX\nXXXXXXXXXXXXXXXXXX`
  // );
};

const askVertex = async ({
  requirements,
  budget,
  isUseMockData,
}: {
  requirements: string;
  budget: number | null;
  isUseMockData?: boolean;
}): Promise<DiagramProposalInterface[]> => {
  let prompt = promptContext + requirements;
  if (budget != null) {
    prompt += `\n This is the monthly budget in USD: ${budget}`;
  }
  if (isUseMockData) {
    const exampleProposals = example.map((ex) => {
      return {
        ...ex,
        diagram: parseDiagram(ex.diagram),
      };
    });
    return exampleProposals;
  }

  const result = await model.generateContent(prompt);

  const response = result.response;
  const text = response.text();
  const data = JSON.parse(text);
  console.log(data["proposals"]);
  const proposals = data["proposals"].map(
    (proposal: DiagramProposalInterface) => {
      return {
        ...proposal,
        diagram: parseDiagram(proposal.diagram),
      };
    }
  );
  return proposals;
};

export default askVertex;
