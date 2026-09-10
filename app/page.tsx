import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Section } from "@/components/ui/section";
import { Stack } from "@/components/ui/stack";
import { Text } from "@/components/ui/text";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Section spacing="tight" className="border-b border-border">
        <Container>
          <Stack direction="row" align="center" justify="between">
            <Text size="small" tone="muted" className="font-mono">
              design system preview
            </Text>
            <ThemeToggle />
          </Stack>
        </Container>
      </Section>

      <Section>
        <Container>
          <Stack gap="lg">
            <Heading level={1}>Design system and UI foundation</Heading>
            <Text size="lead" tone="muted" className="max-w-2xl">
              The shared visual language for the portfolio. Every later page reuses these tokens and
              primitives, so the site stays consistent and fast to build.
            </Text>
            <Stack direction="row" gap="sm" align="center">
              <Button>Primary action</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
            </Stack>
          </Stack>
        </Container>
      </Section>

      <Section spacing="tight" className="border-t border-border">
        <Container>
          <Stack gap="md">
            <Heading level={2}>Type scale</Heading>
            <Heading level={3}>Heading level three</Heading>
            <Heading level={4}>Heading level four</Heading>
            <Text>Body copy renders with the body token.</Text>
            <Text size="small" tone="muted">
              Small muted copy for captions and metadata.
            </Text>
            <Text>
              A body link looks like <Link href="/">this one</Link> and stays keyboard reachable.
            </Text>
          </Stack>
        </Container>
      </Section>

      <Section spacing="tight" className="border-t border-border">
        <Container>
          <Stack direction="row" gap="sm" align="center">
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
            <Button variant="secondary" size="sm">
              Small
            </Button>
            <Button variant="secondary" size="lg">
              Large
            </Button>
          </Stack>
        </Container>
      </Section>
    </main>
  );
}
