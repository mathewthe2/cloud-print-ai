import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { duotoneSea } from "react-syntax-highlighter/dist/esm/styles/prism";

const TerraformFrame = ({ codeString }: { codeString: string }) => {
  return (
    <SyntaxHighlighter language="hcl" style={duotoneSea}>
      {codeString}
    </SyntaxHighlighter>
  );
};
export default TerraformFrame;
