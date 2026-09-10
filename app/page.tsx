import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Divider } from "@/components/ui/divider";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Section } from "@/components/ui/section";
import { Stack } from "@/components/ui/stack";
import { Text } from "@/components/ui/text";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const surfaces = [
  {
    tone: "default" as const,
    title: "Default card",
    body: "One step up from the canvas, for an ordinary content block.",
  },
  {
    tone: "raised" as const,
    title: "Raised card",
    body: "Two steps up, for a feature that should sit forward.",
  },
  {
    tone: "muted" as const,
    title: "Muted card",
    body: "A soft inset well for quiet supporting content.",
  },
];

const stack = ["Next.js", "React", "TypeScript", "Tailwind CSS"];

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-128 bg-radial-[at_top] from-glow/20 via-transparent to-transparent"
      />

      <Section spacing="tight" className="relative border-b border-border">
        <Container>
          <Stack direction="row" align="center" justify="between">
            <Stack direction="row" gap="sm" align="center">
              <span className="size-2.5 rounded-full bg-accent" aria-hidden />
              <Text size="small" tone="muted" className="font-mono uppercase">
                Juan Akbar Indrian
              </Text>
            </Stack>
            <ThemeToggle />
          </Stack>
        </Container>
      </Section>

      <Section className="relative">
        <Container>
          <Stack gap="lg" className="max-w-3xl">
            <Eyebrow>Design system · warm editorial</Eyebrow>
            <Heading level={1}>A warm, editorial foundation</Heading>
            <Text size="lead" tone="muted">
              Warm paper and ink, a single terracotta accent, and a display serif for headings.
              Every later page composes from these tokens and primitives.
            </Text>
            <Stack direction="row" gap="sm" align="center" className="flex-wrap pt-2">
              <Button size="lg">Get in touch</Button>
              <Button variant="secondary" size="lg">
                See the work
              </Button>
              <Button variant="ghost" size="lg">
                Read more
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Section>

      <Section className="relative border-t border-border">
        <Container>
          <Stack gap="lg">
            <Stack gap="sm">
              <Eyebrow>Typography</Eyebrow>
              <Heading level={2}>Type scale</Heading>
              <Text tone="muted" className="max-w-2xl">
                Fraunces drives every heading with optical sizing. Geist Sans carries the body and
                the interface text.
              </Text>
            </Stack>
            <Card padding="lg">
              <Stack gap="md">
                <Heading level={3}>Heading level three</Heading>
                <Heading level={4}>Heading level four</Heading>
                <Divider />
                <Text>
                  Body copy renders with the body token. A couple of sentences of running text show
                  the relaxed line height and the comfortable measure.
                </Text>
                <Text size="small" tone="muted">
                  Small muted copy for captions and metadata.
                </Text>
                <Text>
                  A body link looks like <Link href="/">this one</Link> and stays keyboard
                  reachable.
                </Text>
              </Stack>
            </Card>
          </Stack>
        </Container>
      </Section>

      <Section className="relative border-t border-border">
        <Container>
          <Stack gap="lg">
            <Stack gap="sm">
              <Eyebrow>Controls</Eyebrow>
              <Heading level={2}>Buttons and badges</Heading>
              <Text tone="muted" className="max-w-2xl">
                Three button variants, three sizes, and the full state set. Badges tag the tools and
                topics behind the work.
              </Text>
            </Stack>
            <Stack gap="md">
              <Stack direction="row" gap="sm" align="center" className="flex-wrap">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
              </Stack>
              <Stack direction="row" gap="sm" align="center" className="flex-wrap">
                <Button variant="secondary" size="sm">
                  Small
                </Button>
                <Button variant="secondary">Medium</Button>
                <Button variant="secondary" size="lg">
                  Large
                </Button>
              </Stack>
              <Stack direction="row" gap="sm" align="center" className="flex-wrap">
                {stack.map((name) => (
                  <Badge key={name}>{name}</Badge>
                ))}
                <Badge variant="outline">Outline</Badge>
                <Badge variant="accent">Accent</Badge>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Section>

      <Section className="relative border-t border-border">
        <Container>
          <Stack gap="lg">
            <Stack gap="sm">
              <Eyebrow>Depth</Eyebrow>
              <Heading level={2}>Surfaces and hairlines</Heading>
              <Text tone="muted" className="max-w-2xl">
                Depth comes from lightness steps and hairlines, never from box shadows.
              </Text>
            </Stack>
            <div className="grid gap-4 md:grid-cols-3">
              {surfaces.map((surface) => (
                <Card key={surface.title} tone={surface.tone} padding="lg">
                  <Stack gap="sm">
                    <Heading level={4}>{surface.title}</Heading>
                    <Text size="small" tone="muted">
                      {surface.body}
                    </Text>
                  </Stack>
                </Card>
              ))}
            </div>
            <Card interactive padding="lg">
              <Stack gap="sm">
                <Stack direction="row" gap="sm" align="center" justify="between">
                  <Heading level={4}>Interactive card</Heading>
                  <Badge variant="accent">Live</Badge>
                </Stack>
                <Text size="small" tone="muted">
                  Hover the card, or focus the link with the keyboard, to see the boundary shift.
                </Text>
                <Link href="/projects">Open the case study</Link>
              </Stack>
            </Card>
          </Stack>
        </Container>
      </Section>

      <Section spacing="tight" className="relative border-t border-border">
        <Container>
          <Stack direction="row" align="center" justify="between" gap="md" className="flex-wrap">
            <Text size="small" tone="muted">
              Design system preview. Replaced by the home and hero feature.
            </Text>
            <Text size="small" tone="muted" className="font-mono">
              v2 · warm editorial
            </Text>
          </Stack>
        </Container>
      </Section>
    </main>
  );
}
