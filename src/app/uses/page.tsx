import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function ToolsSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  )
}

function Tool({
  title,
  href,
  children,
}: {
  title: string
  href?: string
  children: React.ReactNode
}) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export const metadata = {
  title: 'Uses',
  description: 'Software I use, tools I rely on, and my go-to stack.',
}

export default function Uses() {
  return (
    <SimpleLayout
      title="Software I use, tools I rely on, and my go-to stack."
      intro="I get asked about my stack a lot. Here's what I use day-to-day to build, deploy, and maintain software."
    >
      <div className="space-y-20">
        <ToolsSection title="Languages & Frameworks">
          <Tool title="React / Next.js">
            My primary frontend framework. I build everything from static
            marketing sites to complex interactive applications with server
            components, streaming, and edge rendering.
          </Tool>
          <Tool title="TypeScript">
            Non-negotiable for any serious project. Catches bugs at compile time
            and makes refactoring fearless. I use strict mode on everything.
          </Tool>
          <Tool title="Node.js / Express">
            My backend runtime of choice. REST APIs, GraphQL, WebSocket servers
            — whatever the architecture needs.
          </Tool>
          <Tool title="WordPress / PHP">
            Still powers a huge chunk of the web. Custom themes, plugins,
            WooCommerce stores, and performance optimization.
          </Tool>
        </ToolsSection>

        <ToolsSection title="Infrastructure & DevOps">
          <Tool title="Docker">
            Everything runs in containers. Consistent environments from dev to
            production, easy scaling, clean deployments.
          </Tool>
          <Tool title="AWS / Cloud">
            EC2, S3, CloudFront, RDS, Lambda. I pick the right service for the
            job and keep costs reasonable.
          </Tool>
          <Tool title="CI/CD (GitHub Actions)">
            Automated testing, linting, building, and deployment on every push.
            No more "it works on my machine."
          </Tool>
          <Tool title="nginx">
            My go-to reverse proxy and static file server. Performance tuned
            with proper caching, compression, and security headers.
          </Tool>
        </ToolsSection>

        <ToolsSection title="Databases & Caching">
          <Tool title="PostgreSQL">
            The workhorse relational database. Complex queries, full-text
            search, JSON support — it handles everything.
          </Tool>
          <Tool title="Redis">
            Session storage, caching, rate limiting, queues. The Swiss army
            knife of in-memory data stores.
          </Tool>
        </ToolsSection>

        <ToolsSection title="Tools">
          <Tool title="VS Code">
            With Vim keybindings. Fast, extensible, and the TypeScript
            integration is unmatched.
          </Tool>
          <Tool title="Figma">
            For reviewing designs and extracting specs. I can go from Figma to
            pixel-perfect code.
          </Tool>
          <Tool title="Cloudflare">
            DNS, CDN, DDoS protection, and edge caching. The first line of
            defense for every site I deploy.
          </Tool>
        </ToolsSection>
      </div>
    </SimpleLayout>
  )
}
