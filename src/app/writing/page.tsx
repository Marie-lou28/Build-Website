import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "How I scope agent-based automation",
  description:
    "A working method for deciding what an agent should own, where a human stays in the loop, and what evidence justifies widening the scope.",
};

const contents = [
  { id: "the-wrong-first-question", label: "The wrong first question" },
  { id: "find-the-decision", label: "1. Find the decision, not the process" },
  { id: "two-axes", label: "2. Rate it on two axes" },
  { id: "place-the-human", label: "3. Place the human deliberately" },
  { id: "abstain-first", label: "4. Define abstaining before success" },
  { id: "case-set", label: "5. Build the case set before the agent" },
  { id: "one-page", label: "6. Write it on one page" },
  { id: "widening", label: "Widening the scope" },
  { id: "decline", label: "What I decline to automate" },
  { id: "worked-example", label: "A worked example" },
];

export default function WritingPage() {
  return (
    <>
      <PageHeader
        narrow
        eyebrow="Writing · 8 min read"
        title="How I scope agent-based automation"
        lead="Most automation projects that fail were mis-scoped before anyone wrote a line of code. This is the method I use instead, and the artefact it produces."
      />

      <Container narrow className="pb-20">
        {/* Table of contents */}
        <nav
          aria-label="Contents"
          className="mb-14 rounded-2xl border border-border bg-surface p-6"
        >
          <p className="eyebrow">Contents</p>
          <ol className="mt-4 flex flex-col gap-2">
            {contents.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-sm text-ink-muted transition-colors hover:text-accent"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="prose-custom">
          <p className="text-lg text-ink">
            An agent&apos;s scope is not a list of features. It is a claim about what the
            system is allowed to be wrong about. Once you say it that way, the scoping
            conversation gets much easier — and much less comfortable, which is the point.
          </p>

          <h2 id="the-wrong-first-question">The wrong first question</h2>
          <p>
            The question I get asked first is almost always{" "}
            <em>&ldquo;can a model do this?&rdquo;</em> It is the wrong place to start, because
            the answer is now usually yes, and yes tells you nothing about whether you should.
          </p>
          <p>
            The question I start with instead is: <strong>when this is wrong, who finds out,
            how long does it take, and what does it cost to undo?</strong> Three of those four
            are properties of the surrounding process, not of the model. That is why scoping is
            mostly an operations exercise that happens to involve an agent.
          </p>
          <blockquote>
            A capable model in a process with no detection path is more dangerous than a weak
            model in a process that catches its mistakes the same afternoon.
          </blockquote>

          <h2 id="find-the-decision">1. Find the decision, not the process</h2>
          <p>
            People describe work as processes — &ldquo;handling a claim&rdquo;, &ldquo;onboarding
            a supplier&rdquo;. Processes are the wrong unit to automate because they bundle a
            dozen decisions of wildly different risk into one noun.
          </p>
          <p>
            So the first thing I do is sit with whoever does the work and decompose it into
            individual decisions, each phrased as a question with a finite answer set:
          </p>
          <ul>
            <li>Which queue does this claim belong in? (12 possible answers)</li>
            <li>Is the attached document the one it claims to be? (yes / no / unclear)</li>
            <li>Does this claim exceed the fast-track threshold? (yes / no)</li>
            <li>How much do we pay out? (an amount — and immediately, obviously, not this one)</li>
          </ul>
          <p>
            This decomposition is most of the value of the exercise. It usually takes a couple
            of hours and it routinely surfaces two or three decisions nobody realised were
            being made at all, because the person making them has been making them by reflex
            for years.
          </p>

          <h2 id="two-axes">2. Rate it on two axes</h2>
          <p>
            For each decision I score two things, and deliberately not accuracy — accuracy is
            an output of the design, not an input to it.
          </p>
          <p>
            <strong>Reversibility.</strong> If this decision is wrong and we notice, what does
            it take to undo? Re-routing a ticket is free. Sending an email to a customer is
            not. Moving money is not. Deleting something is not.
          </p>
          <p>
            <strong>Detectability.</strong> If this decision is wrong, does anything downstream
            notice on its own? Some errors are self-announcing: route a claim to the wrong
            team and that team complains within the hour. Others are silent for a very long
            time — misclassify a contract clause and you find out at renewal, two years later.
          </p>
          <p>Those two axes give four quadrants, and they map cleanly onto four postures:</p>
          <ul>
            <li>
              <strong>Reversible + detectable</strong> — automate it fully. This is where the
              value is, and it is a bigger quadrant than most people assume.
            </li>
            <li>
              <strong>Reversible + silent</strong> — automate it, but you owe the process a
              detection mechanism you built on purpose: sampling, a reconciliation job, a
              second cheap check.
            </li>
            <li>
              <strong>Irreversible + detectable</strong> — the agent proposes, a human commits.
              The agent is doing real work here; it is just not the one pressing the button.
            </li>
            <li>
              <strong>Irreversible + silent</strong> — do not automate this. Automate the
              preparation around it so the human decides faster with better material.
            </li>
          </ul>
          <p>
            Frequency then modulates the answer. A decision made four hundred times a day in
            the first quadrant is a project. The same decision made twice a month is a
            distraction, however tractable it looks.
          </p>

          <h2 id="place-the-human">3. Place the human deliberately</h2>
          <p>
            &ldquo;Human in the loop&rdquo; is used as though it were a single design. It is at
            least three, and choosing between them is a scoping decision, not an implementation
            detail:
          </p>
          <ul>
            <li>
              <strong>Pre-approval.</strong> Every action waits for a person. Safe, and it caps
              your throughput at exactly the thing you were trying to relieve. Justified only
              for the irreversible quadrant.
            </li>
            <li>
              <strong>Post-review.</strong> The agent acts, a person reviews afterwards within a
              defined window. Requires that the window is shorter than the time to
              irreversibility — which is a real constraint you have to go and check, not
              assume.
            </li>
            <li>
              <strong>Sampled audit.</strong> A person reviews a random n% plus everything the
              agent flagged. This is the only one that scales, and it is the right default for
              the reversible quadrants.
            </li>
          </ul>
          <p>
            The failure I have seen most often is pre-approval applied to a high-volume
            reversible decision. The reviewer gets four hundred approvals a day, starts
            clicking through them, and now you have the throughput cost of a human and the
            error profile of an unsupervised agent. A rubber-stamp is worse than no review,
            because it manufactures a false record of oversight.
          </p>

          <h2 id="abstain-first">4. Define abstaining before you define success</h2>
          <p>
            I specify the hand-back path before the happy path. Concretely, for every agent I
            write down: what does it do when it is not confident, what does it pass to the
            human when it does that, and what rate of abstaining would mean this whole thing
            is not worth running?
          </p>
          <p>
            That last number matters. An agent abstaining on 20% of cases can be an excellent
            outcome. The same agent abstaining on 75% is a queue with extra steps, and you want
            to have agreed in advance which is which — before anyone is emotionally invested in
            the thing shipping.
          </p>
          <p>
            An abstention also has to be <em>useful</em>. &ldquo;I&apos;m not sure&rdquo; is not
            a hand-back; it is a shrug. The hand-back carries what the agent extracted, what it
            was weighing, and which specific thing it could not resolve, so the human starts
            from minute three rather than minute zero.
          </p>

          <h2 id="case-set">5. Build the case set before the agent</h2>
          <p>
            Before implementation I collect 100–200 real historical cases with known correct
            answers, including — insisting on this — the weird ones. Not a random sample: a
            random sample of operational work is 90% boring, and the boring cases are not where
            the scope decision lives.
          </p>
          <p>
            This does two things. It gives you a regression test, which is the difference
            between engineering and vibes when someone edits a prompt six months from now. And
            it kills bad projects early and cheaply: about a quarter of the time, labelling the
            case set reveals that two experienced humans disagree on 30% of them, which means
            there was never a stable rule to automate. That is a genuinely good outcome for two
            days of work.
          </p>

          <h2 id="one-page">6. Write it on one page</h2>
          <p>
            The artefact I hand over before anything is built is a single page, and it has the
            same eight fields every time:
          </p>
          <ol>
            <li>
              <strong>The decision</strong> — one sentence, with its finite answer set.
            </li>
            <li>
              <strong>Volume</strong> — how often, and the peak.
            </li>
            <li>
              <strong>Reversibility and detectability</strong> — the quadrant, with the reason.
            </li>
            <li>
              <strong>Out of scope</strong> — the adjacent decisions this agent must never make.
              Named explicitly, because scope creep enters through the adjacent decision.
            </li>
            <li>
              <strong>Abstain path</strong> — trigger, destination, payload.
            </li>
            <li>
              <strong>Human placement</strong> — pre-approval, post-review or sampled, with the
              rate.
            </li>
            <li>
              <strong>Success and kill criteria</strong> — the numbers at which we widen, and
              the numbers at which we turn it off.
            </li>
            <li>
              <strong>Instrumentation</strong> — which of those numbers is visible on a
              dashboard on day one.
            </li>
          </ol>
          <p>
            If I cannot fill in field four or field seven, the project is not ready and building
            it will not make it ready.
          </p>

          <h2 id="widening">Widening the scope</h2>
          <p>
            Scope should grow, and it should grow on evidence. The three numbers I watch are
            abstain rate, human-override rate, and time-to-decision. Override rate is the
            important one: if humans are overriding the agent on 15% of the cases it was
            confident about, its confidence is not calibrated and no amount of extra scope will
            fix that.
          </p>
          <p>
            Where those numbers hold steady for a few weeks, I take the next decision out of the
            decomposition — usually the one directly upstream — and run the same one-pager for
            it. Widening happens one decision at a time, never by relaxing a boundary that is
            already working.
          </p>
          <p>
            The corollary is that these numbers also tell you when a scope has gone stale. A
            drifting override rate means the world changed underneath the agent; the boundary
            you drew was right for a process that no longer exists.
          </p>

          <h2 id="decline">What I decline to automate</h2>
          <p>Three categories, consistently:</p>
          <ul>
            <li>
              <strong>Decisions with no ground truth.</strong> If nobody can tell you, after the
              fact, whether a decision was right, you cannot evaluate it and you are shipping
              something you will never be able to defend.
            </li>
            <li>
              <strong>Decisions a person is owed.</strong> Some outcomes require a human to have
              actually considered the case — the ones people appeal, and the ones affecting
              someone&apos;s employment, money or access. The system can prepare the material.
              It should not be the author of the outcome.
            </li>
            <li>
              <strong>Decisions being automated to avoid a conversation.</strong> Sometimes the
              proposal is really about not having to tell a team their process is broken.
              Automating that ratifies the broken process in code and makes it much harder to
              change later.
            </li>
          </ul>

          <h2 id="worked-example">A worked example</h2>
          <p>
            Inbound insurance claims arriving as free-text email. The ask, as it reached me, was
            &ldquo;automate claims handling&rdquo;.
          </p>
          <p>
            Decomposed, that turned out to be six decisions. Two were high-volume, reversible
            and loudly detectable — which queue does this go to, and is the required document
            attached. Both went to full automation with a 5% sampled audit. Two were reversible
            but silent — a duplicate-claim check and a completeness score — automated, with a
            nightly reconciliation job added specifically to make the silence detectable. One
            was irreversible but detectable, sending the acknowledgement to the customer, so the
            agent drafts and a human sends. And the payout decision was never on the table.
          </p>
          <p>
            The out-of-scope field ended up doing the heaviest lifting on that project. It said,
            in one line, that the agent must never infer a claim amount even when the amount is
            stated plainly in the email — because the moment it does, its routing decision
            starts being read as a financial assessment by everyone downstream. That was the
            single most important sentence in the document, and it was written before any code
            existed.
          </p>
          <p>
            The result was 78% of claims routed untouched and no mis-routes to the payout queue
            in the first quarter. But the number I would actually defend in an interview is a
            different one: the override rate held at 3% across the whole period, which is what
            told us the boundary was drawn in the right place.
          </p>

          <hr />
          <p className="text-sm">
            If you scope this kind of work too and you disagree with any of the above, I would
            genuinely like to hear it — that is the fastest way I improve the method.
          </p>
        </article>
      </Container>
    </>
  );
}
