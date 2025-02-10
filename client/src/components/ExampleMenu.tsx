import { Button, Menu } from "@mantine/core";
import { parseProposals, type DiagramProposalInterface } from "../lib/vertex";
import examples from "../lib/examples";

function ExampleMenu({
  generateDiagramWithExample,
}: {
  generateDiagramWithExample: (data: DiagramProposalInterface[]) => void;
}) {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button variant="light">サンプルを表示</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          onClick={() =>
            generateDiagramWithExample(parseProposals(examples.checkInSystem))
          }
        >
          勤怠システム
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default ExampleMenu;
