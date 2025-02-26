import {
  AppShell,
  Box,
  Burger,
  Button,
  Center,
  Checkbox,
  Group,
  LoadingOverlay,
  Modal,
  NavLink,
  NumberInput,
  ScrollArea,
  Stack,
  Text,
  Textarea,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ExcalidrawFrame from "../components/ExcalidrawFrame";
import { IconBrandGoogle, IconCode } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import TerraformFrame from "../components/TerraformFrame";
import askVertex, { type DiagramProposalInterface } from "../lib/vertex";
import ExampleMenu from "../components/ExampleMenu";

type MainComponentType = "diagram" | "terraform";

const Index = () => {
  const theme = useMantineTheme();
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const [requirements, setRequirements] = useState(
    "月1万ユーザーのECサイトを立ち上げたい"
  );
  const [isIncludeLoggingAndMonitoring, setIsIncludeLoggingAndMonitoring] =
    useState(true);
  const [budget, setBudget] = useState<string | number>("");
  const [visible, { close: hideLoading, open: showLoading }] =
    useDisclosure(false);
  const [generatedData, setGeneratedData] = useState<
    DiagramProposalInterface[]
  >([]);
  const [activeProposal, setActiveProposal] =
    useState<DiagramProposalInterface | null>(null);

  const [opened, { open, close }] = useDisclosure(false);

  const [mainComponent, setMainComponent] =
    useState<MainComponentType>("diagram");

  const generateDiagram = async () => {
    if (requirements.length > 0) {
      showLoading();
      const data = await askVertex({
        requirements: requirements,
        budget: typeof budget == "string" ? null : budget,
        isIncludeLoggingAndMonitoring: isIncludeLoggingAndMonitoring,
      });
      setGeneratedData(data);
      hideLoading();
      close();
    }
  };

  const generateDiagramWithExample = (data: DiagramProposalInterface[]) => {
    setGeneratedData(data);
  };

  useEffect(() => {
    console.log("generatedData", generatedData);
    if (generatedData.length > 0) {
      setActiveProposal(generatedData[0]);
    }
  }, [generatedData]);

  const proposalButton = (proposal: DiagramProposalInterface) => (
    <Button
      variant="default"
      style={{
        height: 70,
        background:
          proposal.title === activeProposal?.title
            ? theme.colors.blue[4]
            : "initial",
      }}
      onClick={() => setActiveProposal(proposal)}
    >
      <Text
        size="sm"
        style={{
          textWrap: "balance",
          color: proposal.title === activeProposal?.title ? "white" : "initial",
        }}
      >
        {proposal.title}
      </Text>
    </Button>
  );

  return (
    <>
      <Modal
        centered
        opened={opened}
        onClose={close}
        title="新いGoogle Cloudアーキテクチャ"
      >
        <LoadingOverlay
          visible={visible}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <Textarea
          placeholder="月1万ユーザーのECサイトを立ち上げたい"
          autosize
          label="要求"
          minRows={8}
          maxRows={20}
          value={requirements}
          onChange={(e) => setRequirements(e.currentTarget.value)}
        ></Textarea>
        <NumberInput
          mt={12}
          label="予算（毎月）"
          placeholder="任意"
          prefix="$"
          value={budget}
          onChange={(value) => setBudget(value)}
        />
        <Checkbox
          mt={20}
          mb={20}
          label="Cloud MonitoringとCloud Loggingをオンにする"
          checked={isIncludeLoggingAndMonitoring}
          onChange={(event) =>
            setIsIncludeLoggingAndMonitoring(event.currentTarget.checked)
          }
        />
        <Center>
          <Button
            mt={10}
            w={200}
            onClick={() => generateDiagram()}
            disabled={requirements.length === 0}
          >
            生成する
          </Button>
        </Center>
      </Modal>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        aside={{
          width: 300,
          breakpoint: "md",
          collapsed: { desktop: false, mobile: true },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              hiddenFrom="sm"
              size="sm"
            />
            <Burger
              opened={desktopOpened}
              onClick={toggleDesktop}
              visibleFrom="sm"
              size="sm"
            />
            <Title order={3}>CloudPrint AI</Title>
            <Button variant="outline" onClick={() => open()}>
              生成ツール
            </Button>
            <ExampleMenu
              generateDiagramWithExample={generateDiagramWithExample}
            />
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          <NavLink
            label="Diagram"
            onClick={() => setMainComponent("diagram")}
            leftSection={<IconBrandGoogle size={16} stroke={1.5} />}
          ></NavLink>
          <NavLink
            label="Terraform"
            onClick={() => setMainComponent("terraform")}
            leftSection={<IconCode size={16} stroke={1.5} />}
          ></NavLink>
        </AppShell.Navbar>

        <AppShell.Main>
          {mainComponent == "diagram" && activeProposal != null && (
            <ExcalidrawFrame mermaidSyntax={activeProposal.diagram} />
          )}
          {mainComponent == "terraform" && (
            <TerraformFrame codeString={activeProposal?.terraform ?? ""} />
          )}
        </AppShell.Main>
        <AppShell.Aside p="md">
          <Title mb={10} order={3}>
            提案
          </Title>
          <Stack>
            {generatedData[0] && proposalButton(generatedData[0])}
            {generatedData[1] && proposalButton(generatedData[1])}
            {generatedData[2] && proposalButton(generatedData[2])}
            {activeProposal && (
              <ScrollArea h={400}>
                <Text>{activeProposal.description}</Text>
              </ScrollArea>
            )}
            {activeProposal && (
              <Box mt={20}>
                <Title order={4}>見積もり</Title>
                <Text>{activeProposal.runningCost}</Text>
              </Box>
            )}
          </Stack>
        </AppShell.Aside>
      </AppShell>
    </>
  );
};

export default Index;
