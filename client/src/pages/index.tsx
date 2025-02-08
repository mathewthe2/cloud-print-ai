import {
  AppShell,
  Burger,
  Button,
  Center,
  Group,
  Modal,
  NavLink,
  Textarea,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ExcalidrawFrame from "../components/ExaclidrawFrame";
import { IconBrandGoogle, IconCode } from "@tabler/icons-react";
import { useState } from "react";
import TerraformFrame from "../components/TerraformFrame";
import run from "../lib/vertex";

type MainComponentType = "diagram" | "terraform";

const Index = () => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  const [opened, { open, close }] = useDisclosure(false);

  const [mainComponent, setMainComponent] =
    useState<MainComponentType>("diagram");

  return (
    <>
      <Modal centered opened={opened} onClose={close} title="用件定義">
        <Textarea
          placeholder="月1万ユーザーのECサイトを立ち上げたい"
          autosize
          minRows={8}
          maxRows={20}
        ></Textarea>
        <Center>
          <Button mt={10} w={200}>
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
            <Title order={3}>Cloud Print AI</Title>
            <Button variant="outline" onClick={() => open()}>
              構成図を生成する
            </Button>
            <Button variant="outline" onClick={() => run()}>
              クリック
            </Button>
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
          {mainComponent == "diagram" && <ExcalidrawFrame />}
          {mainComponent == "terraform" && <TerraformFrame />}
        </AppShell.Main>
        <AppShell.Aside p="md">Actions</AppShell.Aside>
      </AppShell>
    </>
  );
};

export default Index;
